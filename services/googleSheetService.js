import { google } from "googleapis";
import { readFileSync } from "fs";
import path from "path";

// const credentials = JSON.parse(
//   readFileSync(
//     path.join(process.cwd(), "credentials/google-credentials.json"),
//     "utf-8"
//   )
// );
const credentials = JSON.parse(process.env.GOOGLE_SA_KEY);

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

export const appendUser = async (
  email,
  firstName,
  lastName,
  hashedPassword
) => {
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Users!A:D", // A=email, B=first, C=last, D=hash
    valueInputOption: "RAW",
    requestBody: {
      values: [[email, firstName, lastName, hashedPassword]],
    },
  });
};

export const findUser = async (email) => {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Users!A:D",
  });

  const rows = res.data.values || [];
  const dataRows = rows[0]?.[0] === "email" ? rows.slice(1) : rows;

  const match = dataRows.find((row) => row[0] === email);
  if (!match) return null;

  const [e, firstName, lastName, password] = match;
  return { email: e, firstName, lastName, password };
};
