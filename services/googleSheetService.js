import { google } from "googleapis";
import { readFileSync } from "fs";
import path from "path";

const credentials = JSON.parse(
  readFileSync(
    path.join(process.cwd(), "credentials/google-credentials.json"),
    "utf-8"
  )
);

// const credentials = JSON.parse(process.env.GOOGLE_SA_KEY);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });
const USERS_RANGE = "Users!A:F"; // A=email, B=first, C=last, D=studentId, E=passwordHash, F=verified

function toBool(v) {
  if (typeof v === "boolean") return v;
  if (v == null) return false;
  const s = String(v).trim().toLowerCase();
  return s === "true" || s === "1" || s === "yes";
}
function hasHeader(rows) {
  return rows?.length && rows[0]?.[0]?.toLowerCase() === "email";
}
function headerOffset(rows) {
  return hasHeader(rows) ? 1 : 0;
}
function withNoHeader(rows) {
  return hasHeader(rows) ? rows.slice(1) : rows;
}

export async function appendUser(user) {
  const { email, firstName, lastName, studentId, passwordHash, verified } =
    user;
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: USERS_RANGE,
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          email,
          firstName,
          lastName,
          studentId,
          passwordHash,
          verified ? "TRUE" : "FALSE",
        ],
      ],
    },
  });
}

export async function readAllUsers() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: USERS_RANGE,
  });
  const rows = res.data.values || [];
  const off = headerOffset(rows);
  const dataRows = withNoHeader(rows);

  return dataRows.map((row, idx) => {
    const [email, firstName, lastName, studentId, passwordHash, verified] = row;
    return {
      rowIndex: off + idx + 1, // 1-based index in the sheet
      email: email || "",
      firstName: firstName || "",
      lastName: lastName || "",
      studentId: studentId || "",
      passwordHash: passwordHash || "",
      verified: toBool(verified),
    };
  });
}

export async function findUser(email) {
  const all = await readAllUsers();
  return all.find((u) => u.email === email) || null;
}

async function updateUserRow(rowIndex, user) {
  const { email, firstName, lastName, studentId, passwordHash, verified } =
    user;
  const range = `Users!A${rowIndex}:F${rowIndex}`;
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          email,
          firstName,
          lastName,
          studentId,
          passwordHash,
          verified ? "TRUE" : "FALSE",
        ],
      ],
    },
  });
}

export async function setVerifiedFalseIfNew(user) {
  const existing = await findUser(user.email);
  if (!existing) {
    await appendUser({ ...user, verified: false });
    return;
  }
  if (!existing.verified) {
    await updateUserRow(existing.rowIndex, {
      email: user.email,
      firstName: user.firstName ?? existing.firstName,
      lastName: user.lastName ?? existing.lastName,
      studentId: user.studentId ?? existing.studentId,
      passwordHash: user.passwordHash ?? existing.passwordHash,
      verified: false,
    });
  }
}

export async function markUserVerified(email) {
  const existing = await findUser(email);
  if (!existing) return false;
  await updateUserRow(existing.rowIndex, { ...existing, verified: true });
  return true;
}
