import { NextResponse } from "next/server";
import { google } from "googleapis";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "Missing ID parameter" },
      { status: 400 }
    );
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_EMAIL,
      private_key: process.env.GOOGLE_SECRET_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: `${getCurrentWeekSheetName()}!A:Z`,
    });

    const rows = response.data.values || [];
    const matchingRow = rows.find((row) => row[0] === id);

    if (!matchingRow) {
      return NextResponse.json(
        { error: "ID not found in the sheet" },
        { status: 404 }
      );
    }

    return NextResponse.json({ row: matchingRow });
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

// Helper functions
function getCurrentWeekSheetName() {
  const currentDate = new Date();
  const weekNumber = getWeekNumber(currentDate);
  return `Week ${weekNumber}`;
}

function getWeekNumber(date: Date) {
  const startDate = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - startDate.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return Math.ceil(dayOfYear / 7);
}
