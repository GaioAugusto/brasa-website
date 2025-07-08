import { findUser } from "../../services/googleSheetService.js";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { email, password } = req.body;

  const user = await findUser(email);

  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: "Wrong password." });
  }

  return res.status(200).json({ message: "Login successful." });
}
