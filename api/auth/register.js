import { appendUser } from "../../services/googleSheetService.js";
import { hashPassword } from "../../utils/auth.js";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Missing fields" });

  const hashed = await hashPassword(password);
  await appendUser(username, hashed);

  res.status(201).json({ message: "User registered!" });
}
