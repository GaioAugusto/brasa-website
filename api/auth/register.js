import crypto from "crypto";
import { hashPassword } from "../../utils/auth.js";
import { strings } from "../resources/strings.js";
import {
  findUser,
  appendUser,
  setVerifiedFalseIfNew,
} from "../../services/googleSheetService.js";
import {
  deleteTokensForEmail,
  insertToken,
} from "../../services/tokenSheetService.js";
import nodemailer from "nodemailer";

const endIf = (res, condition, status, message) => {
  if (condition) {
    res.status(status).json({ error: message });
    return true;
  }
  return false;
};

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { email, password, firstName, lastName, studentId } = req.body || {};

  // Validate basic fields
  if (
    endIf(
      res,
      !email || !password || !firstName || !lastName || !studentId,
      400,
      "Missing fields"
    )
  )
    return;

  // UofT email check
  if (
    endIf(
      res,
      !email.endsWith(strings.uoftEmailTerminology),
      400,
      "Please enter a UofT email"
    )
  )
    return;

  // Existing user
  const existing = await findUser(email);
  if (endIf(res, existing?.verified === true, 409, "Email already registered"))
    return;

  // Upsert as unverified
  const passwordHash = await hashPassword(password);
  if (!existing) {
    await appendUser({
      email,
      firstName,
      lastName,
      studentId,
      passwordHash,
      verified: false,
    });
  } else {
    await setVerifiedFalseIfNew({
      email,
      firstName,
      lastName,
      studentId,
      passwordHash,
    });
  }

  // Token
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30).toISOString(); // 30 min

  await deleteTokensForEmail(email);
  await insertToken({ email, tokenHash, expiresAt });

  const verifyUrl = `${process.env.APP_URL}/verify?token=${encodeURIComponent(
    rawToken
  )}`;

  // Send emails
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.VERIFICATION_EMAIL_USER,
      pass: process.env.VERIFICATION_EMAIL_PASS,
    },
  });

  // Notify BRASA inbox
  //   await transporter.sendMail({
  //     from: process.env.VERIFICATION_EMAIL_USER,
  //     to: process.env.RECIPIENT_EMAIL,
  //     subject: `New user tried to sign up: ${firstName} ${lastName}`,
  //     text: `From: ${firstName} ${lastName}
  // Email: ${email}
  // Student number: ${studentId}

  // A verification email was sent to the user.`,
  //   });

  // Send verification to the user
  await transporter.sendMail({
    from: process.env.VERIFICATION_EMAIL_USER,
    to: email,
    subject: "Verify your BRASA Card email",
    html: `
      <p>Hi ${firstName},</p>
      <p>Thanks for signing up for BRASA Card!</p>
      <p><a href="${verifyUrl}">Click here to verify your email</a></p>
      <p>This link expires in 30 minutes.</p>
      <p>- BRASA at UofT</p>
    `,
  });

  return res.status(200).json({ message: "Verification email sent." });
}
