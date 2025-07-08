import { appendUser, findUser } from "../../services/googleSheetService.js";
import { hashPassword } from "../../utils/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password, firstName, lastName, studentId } = req.body || {};
  if (!email || !password || !firstName || !lastName || !studentId) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const existing = await findUser(email);
  if (existing) {
    return res.status(409).json({ error: "Email already registered" });
  }

  const hashed = await hashPassword(password);
  await appendUser(email, firstName, lastName, studentId, hashed);

  return res.status(201).json({ message: "User registered!" });
}
