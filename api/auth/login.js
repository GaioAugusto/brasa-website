import { findUser } from "../../services/googleSheetService.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed." });
    }

    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "Missing email or password." });
    }

    const user = await findUser(email);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    if (!user.verified) {
      return res.status(403).json({
        error:
          "Email not verified. Please check your inbox or resend the verification link.",
      });
    }

    const hashed = user.passwordHash ?? user.password;
    if (!hashed) {
      return res.status(500).json({ error: "User password not set." });
    }

    const ok = await bcrypt.compare(password, hashed);
    if (!ok) {
      return res.status(401).json({ error: "Wrong password." });
    }

    // Generate JWT token with user information
    const token = generateToken({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      studentId: user.studentId,
    });

    // Return token and user info
    return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        studentId: user.studentId,
        verified: user.verified,
      },
    });
  } catch (err) {
    console.error("LOGIN_ERROR", err);
    return res.status(500).json({ error: "Internal error." });
  }
}
