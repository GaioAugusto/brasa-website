import { findUser } from "../../services/googleSheetService.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const email = req.query.email;
  if (!email) {
    return res.status(400).json({ error: "Missing email query param" });
  }

  try {
    const user = await findUser(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    console.error("Error in GET /api/users:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
