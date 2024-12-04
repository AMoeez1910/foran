import { NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";

type SheetForm = {
  pickup: {
    name: string;
    phone_number: string;
    landmark: GeoApiProps;
    address: string;
  };
  dropoff: {
    name: string;
    phone_number: string;
    landmark: GeoApiProps;
    address: string;
  };
  total_delivery_cost: string;
};

const getCurrentWeekSheetName = (): string => {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), 0, 1);
  const daysInWeek = 7;
  const dayOfYear = Math.floor(
    (now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  const currentWeek = Math.floor(dayOfYear / daysInWeek) + 1;

  return `Week ${currentWeek}`;
};

const sendEmailNotification = async (
  pickup: SheetForm["pickup"],
  dropoff: SheetForm["dropoff"],
  total_delivery_cost: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: "New Delivery Order Received",
    text: `
      New delivery order has been placed:

      Pickup Details:
      Name: ${pickup.name}
      Phone: ${pickup.phone_number}
      Location: ${pickup.landmark.formatted}
      Sector: ${pickup.address}

      Dropoff Details:
      Name: ${dropoff.name}
      Phone: ${dropoff.phone_number}
      Location: ${dropoff.landmark.formatted}
      Sector: ${dropoff.address}

      Total Delivery Cost: ${total_delivery_cost}

      Date: ${new Date().toISOString()}
    `,
  };

  // Send the email
  return transporter.sendMail(mailOptions);
};

export const POST = async (req: Request) => {
  const { pickup, dropoff, total_delivery_cost } =
    (await req.json()) as SheetForm;

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_EMAIL,
        private_key: process.env.GOOGLE_SECRET_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const sheetName = getCurrentWeekSheetName();

    let sheetExists = false;
    try {
      const sheetResponse = await sheets.spreadsheets.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      });
      sheetExists =
        sheetResponse.data.sheets?.some(
          (sheet) => sheet.properties?.title === sheetName
        ) ?? false;
    } catch (error) {
      console.error("Error checking sheet existence:", error);
    }

    if (!sheetExists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: process.env.GOOGLE_SHEET_ID!,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: sheetName,
                },
              },
            },
          ],
        },
      });
    }

    // Append data to the sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID!,
      range: `${sheetName}!A3`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [
          [
            pickup.name,
            pickup.phone_number,
            pickup.landmark.formatted,
            pickup.address,
            dropoff.name,
            dropoff.phone_number,
            dropoff.landmark.formatted,
            dropoff.address,
            total_delivery_cost,
            new Date().toISOString(),
          ],
        ],
      },
    });

    // Send email notification
    await sendEmailNotification(pickup, dropoff, total_delivery_cost);

    return NextResponse.json(
      { message: "Data appended successfully and email sent." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error appending data or sending email:", error);
    return NextResponse.json(
      {
        message:
          error.message ||
          "Something went wrong while writing to Google Sheets or sending email",
      },
      { status: 500 }
    );
  }
};
