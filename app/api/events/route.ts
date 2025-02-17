import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Define the event data structure
export interface EventItem {
  title: string;
  date: string; // ISO string
  location: string;
  description: string;
  registrationLink?: string;
}

export async function GET() {
  // Read the CSV file
  const csvPath = path.join(
    process.cwd(),
    "app",
    "events",
    "tags_doubles_schedule.csv"
  );
  const csvData = await fs.readFile(csvPath, "utf8");

  // Split CSV into lines and parse header
  const lines = csvData.split("\n").filter((line) => line.trim().length);
  const header = lines
    .shift()
    ?.split(",")
    .map((h) => h.trim());

  // Expected header: Date,Format,Layout,Location,Registration Link,Start Time,Sign up period
  const events: EventItem[] = [];
  const currentYear = new Date().getFullYear();

  // Process each CSV row
  for (const line of lines) {
    const parts = line.split(",").map((p) => p.trim());
    if (parts.length < 3) continue;
    const [dateStr, format, layout, location, regLink, startTime, signUp] =
      parts;
    const [month, day] = dateStr.split("/").map(Number);
    const dateObj = new Date(currentYear, month - 1, day);
    const title = layout !== "" ? `${format} - ${layout}` : format;
    const description = `Start Time: ${startTime || "TBD"}. Sign up period: ${
      signUp || "TBD"
    }.`;
    events.push({
      title,
      date: dateObj.toISOString(),
      location: location || "Tranquility Trails, Woolwich, NJ",
      description,
      registrationLink: regLink || undefined,
    });
  }
  return NextResponse.json({ events });
}
