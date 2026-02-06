import { findUser } from "../../services/googleSheetService.js";
import { authenticateToken } from "../../utils/jwt.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Verify JWT token
  const decoded = authenticateToken(req);
  if (!decoded) {
    return res.status(401).json({ error: "Unauthorized - Invalid or missing token" });
  }

  // User can only fetch their own info (based on token)
  const requestedEmail = req.query.email;
  if (!requestedEmail) {
    return res.status(400).json({ error: "Missing email query param" });
  }

  // Ensure user can only access their own data
  if (decoded.email !== requestedEmail) {
    return res.status(403).json({ error: "Forbidden - Cannot access other user's data" });
  }

  try {
    const user = await findUser(requestedEmail);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return user info without sensitive data
    return res.status(200).json({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      studentId: user.studentId,
      verified: user.verified,
    });
  } catch (err) {
    console.error("Error in GET /api/users:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
