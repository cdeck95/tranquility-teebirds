import { EventItem } from "@/app/api/events/route";
import React from "react";

// Helper function: convert a Date to m/d/yyyy in EST
function convertDateToMDY(dateObj: Date): string {
  return `${
    dateObj.getMonth() + 1
  }/${dateObj.getDate()}/${dateObj.getFullYear()}`;
}

// Server action: fetch events from the API
async function fetchTeamEvents(): Promise<any> {
  // Construct base URL from environment or fallback
  const baseUrl: string =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  // Fetch events with caching revalidation set to 60 seconds
  const response = await fetch(new URL("/api/events", baseUrl), {
    next: { revalidate: 60 },
  });
  // Debug: log response status if needed
  // console.log("response", response);
  return response.json();
}

// UpcomingEventBanner component to display upcoming events for Tranquility Teebirds
export default async function UpcomingEventBanner() {
  // Retrieve events using the server action
  const eventData = await fetchTeamEvents();
  // Debug: log received data if needed
  // console.log("eventData", eventData);
  const teamEvents = eventData.events;

  // Compute today's date in EST using verbose naming
  const currentDateInEST: Date = new Date(
    new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
  );
  const todayDateString: string = convertDateToMDY(currentDateInEST);

  // Determine if there is any ongoing event today
  const isEventOngoingToday = teamEvents.some(
    (event: { formattedDate: string }) =>
      event.formattedDate === todayDateString
  );

  // Find the upcoming event within the next 3 days
  const upcomingTeamEvent = teamEvents.find(
    (event: { dateTimestamp: number; formattedDate: string }) => {
      const eventScheduledDate = new Date(event.dateTimestamp);
      const timeDifferenceInMilliseconds =
        eventScheduledDate.getTime() - currentDateInEST.getTime();
      const differenceInDays =
        timeDifferenceInMilliseconds / (1000 * 3600 * 24);
      return differenceInDays >= 0 && differenceInDays <= 3;
    }
  );

  return (
    <div>
      {/* Show banner if an event is ongoing today */}
      {isEventOngoingToday && (
        <div
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "8px",
            textAlign: "center",
          }}
        >
          <p className="text-xl font-semibold">
            Event in progress today, {todayDateString}
          </p>
        </div>
      )}
      {/* Show banner for upcoming event if no event is currently ongoing */}
      {upcomingTeamEvent && !isEventOngoingToday && (
        <div
          style={{
            backgroundColor: "yellow",
            color: "black",
            padding: "8px",
            textAlign: "center",
          }}
        >
          <p className="text-xl font-semibold">
            Upcoming event on {upcomingTeamEvent.formattedDate}
          </p>
        </div>
      )}
    </div>
  );
}
