"use server";

import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Define the event data structure
export interface EventItem {
  title: string;
  dateTimestamp: number; // Unix timestamp computed from CSV date
  formattedDate: string; // Pre-formatted date in m/d/yyyy (EST)
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

    console.log("dateStr", dateStr);
    console.log("month", month);
    console.log("day", day);
    console.log("dateObj", dateObj);

    const title = layout !== "" ? `${format} - ${layout}` : format;
    // Only insert non-empty values in the description.
    const descriptionParts: string[] = [];
    if (signUpStarts) {
      descriptionParts.push(`Sign up period starts: ${signUpStarts}`);
    }
    if (starts) {
      descriptionParts.push(`Starts: ${starts}`);
    }
    const description =
      descriptionParts.join(". ") + (descriptionParts.length ? "." : "");
    events.push({
      title,
      dateTimestamp: timestamp,
      formattedDate,
      location: location || "Tranquility Trails, Woolwich, NJ",
      description,
      registrationLink: regLink || undefined,
    });
  }
  return NextResponse.json({ events });
}
