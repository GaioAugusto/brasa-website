// services/tokenSheetService.js
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

const TOKENS_RANGE = "VerificationTokens!A:C"; // A=email | B=token_hash | C=expires_at (ISO)

function hasHeader(rows) {
  return rows?.length && String(rows[0]?.[0]).toLowerCase() === "email";
}
function withNoHeader(rows) {
  return hasHeader(rows) ? rows.slice(1) : rows;
}
function headerOffset(rows) {
  return hasHeader(rows) ? 1 : 0;
}

export async function insertToken({ email, tokenHash, expiresAt }) {
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: TOKENS_RANGE,
    valueInputOption: "RAW",
    requestBody: { values: [[email, tokenHash, expiresAt]] },
  });
}

export async function deleteTokensForEmail(email) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: TOKENS_RANGE,
  });
  const rows = res.data.values || [];
  const off = headerOffset(rows);
  const data = withNoHeader(rows);

  const toClear = [];
  data.forEach((row, idx) => {
    const rowEmail = row[0];
    if (rowEmail === email) {
      const rowIndex = off + idx + 1;
      toClear.push(rowIndex);
    }
  });

  for (const r of toClear) {
    const range = `VerificationTokens!A${r}:C${r}`;
    await sheets.spreadsheets.values.clear({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
    });
  }
}

export async function findTokenByHash(tokenHash) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: TOKENS_RANGE,
  });
  const rows = res.data.values || [];
  const off = headerOffset(rows);
  const data = withNoHeader(rows);

  for (let idx = 0; idx < data.length; idx++) {
    const [email, hash, expiresAt] = data[idx];
    if (hash === tokenHash) {
      return {
        rowIndex: off + idx + 1,
        email,
        tokenHash: hash,
        expiresAt,
      };
    }
  }
  return null;
}

export async function clearTokenRow(rowIndex) {
  const range = `VerificationTokens!A${rowIndex}:C${rowIndex}`;
  await sheets.spreadsheets.values.clear({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range,
  });
}
