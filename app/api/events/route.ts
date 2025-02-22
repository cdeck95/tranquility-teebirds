"use server";

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Define the event data structure
export interface EventItem {
  title: string;
  dateTimestamp: number; // Unix timestamp computed from CSV date
  formattedDate: string; // Pre-formatted date in m/d/yyyy (EST)
  formattedCheckInPeriod?: string; // Pre-formatted check-in period in m/d/yyyy (EST)
  formattedStartTime?: string; // Pre-formatted start time in HH:MM AM/PM (EST)
  location: string;
  registrationLink?: string;
}

// Define the response structure
interface EventsResponse {
  events: EventItem[];
}

// Helper: Add minutes to a time string (e.g., "9:15 AM") and return a formatted time string.
function addMinutesToTime(
  originalTimeString: string,
  minutesToAdd: number
): string {
  const dateObject = new Date(`1970-01-01 ${originalTimeString}`);
  dateObject.setMinutes(dateObject.getMinutes() + minutesToAdd);
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  const period = hours >= 12 ? "PM" : "AM";
  const hours12 = hours % 12 || 12;
  return `${hours12}:${minutes < 10 ? "0" + minutes : minutes} ${period}`;
}

export async function GET(): Promise<NextResponse<EventsResponse>> {
  // Read the CSV file
  const csvPath = path.join(
    process.cwd(),
    "app",
    "events",
    "tags_doubles_schedule.csv"
  );
  const csvData = await fs.readFile(csvPath, "utf8");

  // Split CSV into lines and parse head (new header format)
  // Expected header: Date,Format,Layout,Location,Registration Link,Sign up period starts,Starts,Sunset Times
  const lines = csvData.split("\n").filter((line) => line.trim().length);
  const header = lines
    .shift()
    ?.split(",")
    .map((h) => h.trim());
  console.log(header);
  const events: EventItem[] = [];
  const currentYear = new Date().getFullYear();

  // Process each CSV row using new column indices:
  // parts[0]: Date, parts[1]: Format, parts[2]: Layout, parts[3]: Location,
  // parts[4]: Registration Link, parts[5]: Sign up period starts, parts[6]: Starts, parts[7]: Sunset Times
  for (const line of lines) {
    const parts = line.split(",").map((p) => p.trim());
    if (parts.length < 3) continue;
    const [dateStr, format, layout, location, regLink, signUpStarts, starts] =
      parts;
    const [month, day] = dateStr.split("/").map(Number);
    // Use Date.UTC so that the date is exactly the CSV date as EST (ignoring timezone issues)
    const dateObj = new Date(Date.UTC(currentYear, month - 1, day));
    // Pre-format date as m/d/yyyy (e.g., 3/8/2025)
    const formattedDate = `${month}/${day}/${dateObj.getUTCFullYear()}`;
    const timestamp = dateObj.getTime();

    // Compute check-in period: add 30 minutes to signUpStarts if available.
    let formattedCheckInPeriod: string | undefined = undefined;
    if (signUpStarts) {
      formattedCheckInPeriod = `${signUpStarts} - ${addMinutesToTime(
        signUpStarts,
        30
      )}`;
    }

    // Use starts for the event start time.
    const formattedStartTime = starts ? starts : undefined;

    const title = layout !== "" ? `${format} - ${layout}` : format;
    // Only insert non-empty values in the description.

    events.push({
      title,
      dateTimestamp: timestamp,
      formattedDate,
      formattedCheckInPeriod, // New property for check-in period
      formattedStartTime, // New property for start time
      location: location || "Tranquility Trails, Woolwich, NJ",
      registrationLink: regLink || undefined,
    });
  }
  return NextResponse.json({ events });
}
