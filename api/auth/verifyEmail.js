import crypto from "crypto";
import {
  findTokenByHash,
  deleteTokensForEmail,
} from "../../services/tokenSheetService.js";
import { markUserVerified } from "../../services/googleSheetService.js";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { token } = req.body || {};
  if (!token) return res.status(400).json({ error: "Missing token" });

  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const record = await findTokenByHash(tokenHash);
  if (!record)
    return res.status(400).json({ error: "Invalid or already used token" });

  if (new Date(record.expiresAt).getTime() < Date.now()) {
    return res.status(400).json({ error: "Token expired" });
  }

  await markUserVerified(record.email);
  await deleteTokensForEmail(record.email);

  return res.status(200).json({ message: "Email verified" });
}
