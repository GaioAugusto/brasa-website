import { google } from "googleapis";
import { readFileSync } from "fs";
import path from "path";

// Load from file, not from env var
const credentials = JSON.parse(
  readFileSync(
    path.join(process.cwd(), "credentials/google-credentials.json"),
    "utf-8"
  )
);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

export const appendUser = async (username, hashedPassword) => {
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Users!A:B",
    valueInputOption: "RAW",
    requestBody: {
      values: [[username, hashedPassword]],
    },
  });
};

export const findUser = async (username) => {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Users!A:B",
  });

  const rows = res.data.values || [];
  const user = rows.find((row) => row[0] === username);

  if (!user) return null;
  return { username: user[0], password: user[1] };
};
