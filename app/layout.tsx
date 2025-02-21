import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";
import { cn } from "@/lib/utils";
import type React from "react"; // Added import for React
import Link from "next/link";
import { SocialIcons } from "@/components/SocialIcons";
// import { EventItem } from "./api/events/route";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tranquility Teebirds",
  description: "Official website of the Tranquility Teebirds Disc Golf Team",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // // Helper: Convert a Date to m/d/yyyy in EST
  // const convertDateToMDY = (date: Date): string => {
  //   return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  // };

  // // Fetch events from the API route (server action) using an absolute URL without caching
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  // const res = await fetch(new URL("/api/events", baseUrl), {
  //   next: { revalidate: 0 }, // disable caching to load new CSV updates immediately
  // });
  // console.log("response", res);
  // const data = await res.json();
  // console.log("data", data);
  // const events = data.events;
  // console.log("events", events);

  // // Compute today's date in EST
  // const currentDateInEST = new Date(
  //   new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
  // );
  // console.log("currentDateInEST", currentDateInEST);
  // const todayString = convertDateToMDY(currentDateInEST);
  // console.log("todayString", todayString);

  // // Check if any event is scheduled for today
  // const hasOngoingEvent = events.some(
  //   (event: { formattedDate: string }) => event.formattedDate === todayString
  // );
  // console.log("hasOngoingEvent", hasOngoingEvent);

  // // Determine the upcoming event within 3 days, if any
  // const upcomingEvent: EventItem = events.find(
  //   (event: { dateTimestamp: number }) => {
  //     const eventDate = new Date(event.dateTimestamp);
  //     const timeDifferenceInMilliseconds =
  //       eventDate.getTime() - currentDateInEST.getTime();
  //     const diffDays = timeDifferenceInMilliseconds / (1000 * 3600 * 24);
  //     return diffDays >= 0 && diffDays <= 3;
  //   }
  // );

  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.className, "min-h-full flex flex-col")}>
        <MainNav />

        <main className="flex-1">
          {/* {hasOngoingEvent && (
            <div
              style={{
                backgroundColor: "red",
                color: "white",
                padding: "8px",
                textAlign: "center",
              }}
            >
              <p className="text-xl font-semibold">
                Event in progress today, {todayString}
              </p>
            </div>
          )}
          {upcomingEvent && !hasOngoingEvent && (
            <div
              style={{
                backgroundColor: "yellow",
                color: "black",
                padding: "8px",
                textAlign: "center",
              }}
            >
              <p className="text-xl font-semibold">
                Upcoming event on {upcomingEvent.formattedDate}
              </p>
            </div>
          )} */}
          {children}
          <Analytics />
        </main>
        <footer className="bg-muted">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* About Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">About</h3>
                <p className="text-sm text-muted-foreground">
                  Official website of the Tranquility Teebirds Disc Golf Team.
                </p>
              </div>
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/events"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/team"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Our Team
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/partners"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Partners
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Contact Us */}
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 gap-2">
                  <h3 className="text-lg font-semibold">Contact Us</h3>
                  <p className="text-sm ">
                    Email:{" "}
                    <a
                      href="mailto:Tranquilityteebirds@gmail.com"
                      className="underline text-muted-foreground hover:text-primary"
                    >
                      Tranquilityteebirds@gmail.com
                    </a>
                  </p>
                  <p className="text-sm">
                    Address:{" "}
                    <a
                      href="https://www.google.com/maps/place/Tranquility+Trails/@39.7515332,-75.3313394,17z/data=!4m12!1m5!3m4!2zMznCsDQ1JzA1LjUiTiA3NcKwMTknNTIuOCJX!8m2!3d39.7515332!4d-75.3313394!3m5!1s0x89c6e0b83a157e81:0xd8de8ad70ce6596d!8m2!3d39.7504573!4d-75.3323336!16s%2Fg%2F11fxxz7kkq?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D"
                      className="underline text-muted-foreground hover:text-primary"
                    >
                      301-331 High Hill Rd, Woolwich Township, NJ 08085
                    </a>
                  </p>
                </div>
                <div className="flex space-x-4 mt-4">
                  <SocialIcons />
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-muted-foreground/10 text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Tranquility Teebirds. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
