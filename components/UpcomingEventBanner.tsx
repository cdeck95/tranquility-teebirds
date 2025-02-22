"use client";

import { EventItem } from "@/app/api/events/route";
import React, { useState, useEffect } from "react";

// Helper function: convert a Date to m/d/yyyy in EST
function convertDateToMDY(dateObj: Date): string {
  return `${
    dateObj.getMonth() + 1
  }/${dateObj.getDate()}/${dateObj.getFullYear()}`;
}

// Client-side fetch function
const fetchTeamEvents = async (): Promise<EventItem[]> => {
  const baseUrl: string =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const response = await fetch(new URL("/api/events", baseUrl), {
    next: { revalidate: 60 },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  const responseJson = await response.json();
  return responseJson.events;
};

export default function UpcomingEventBanner() {
  const [teamEvents, setTeamEvents] = useState<EventItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDateInEST] = useState(
    new Date(
      new Date().toLocaleString("en-US", { timeZone: "America/New_York" })
    )
  );

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true);
        const events = await fetchTeamEvents();
        setTeamEvents(events);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []); // Empty dependency array means this runs once on mount

  if (isLoading) {
    return <div className="text-center p-4">Loading events...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  const todayDateString: string = convertDateToMDY(currentDateInEST);

  // Determine if there is any ongoing event today
  const isEventOngoingToday = teamEvents.some(
    (event) => event.formattedDate === todayDateString
  );

  // Find the upcoming event within the next 3 days
  const upcomingTeamEvent = teamEvents.find((event) => {
    const eventScheduledDate = new Date(event.dateTimestamp);
    const timeDifferenceInMilliseconds =
      eventScheduledDate.getTime() - currentDateInEST.getTime();
    const differenceInDays = timeDifferenceInMilliseconds / (1000 * 3600 * 24);
    return differenceInDays >= 0 && differenceInDays <= 3;
  });

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
