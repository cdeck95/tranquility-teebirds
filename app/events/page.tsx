"use client";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, CalendarIcon, CheckCircle } from "lucide-react";
import { AnimatedElement } from "@/components/animated-element";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";

// Generate recurring events for the current year
const today = new Date();
const currentYear = today.getFullYear();
const startDate = new Date(currentYear, today.getMonth(), today.getDate());
const endDate = new Date(currentYear, 11, 31);

// Helper: get first Thursday of the year
function getFirstThursday(year: number) {
  const d = new Date(year, 0, 1);
  while (d.getDay() !== 4) {
    d.setDate(d.getDate() + 1);
  }
  return d;
}

const firstThursday = getFirstThursday(currentYear);
const recurringThursdayEvents: Array<{
  title: string;
  date: Date;
  location: string;
  description: string;
}> = [];
const recurringMondayEvents: Array<{
  title: string;
  date: Date;
  location: string;
  description: string;
}> = [];
const iterationDate = new Date(startDate);

while (iterationDate <= endDate) {
  // Thursday events (day 4)
  if (iterationDate.getDay() === 4) {
    // Week index from first Thursday
    const weekIndex = Math.floor(
      (iterationDate.getTime() - firstThursday.getTime()) /
        (7 * 24 * 60 * 60 * 1000)
    );
    if (weekIndex % 4 === 3) {
      // Every 4th Thursday: Doubles
      recurringThursdayEvents.push({
        title: "Tranquility Doubles",
        date: new Date(iterationDate),
        location: "Tranquility Trails",
        description: `Doubles event placeholder`,
      });
    } else {
      // Otherwise: Tags event
      recurringThursdayEvents.push({
        title: "Tranquility Tags",
        date: new Date(iterationDate),
        location: "Local Disc Golf Course",
        description: `Tags event placeholder`,
      });
    }
  }
  // Monday events (day 1): Putting League
  if (iterationDate.getDay() === 1) {
    recurringMondayEvents.push({
      title: "Cosmic Disc Golf Putting League",
      date: new Date(iterationDate),
      location: "Cosmic Disc Golf",
      description: "Join the putting league hosted by Dickie DG.",
    });
  }
  iterationDate.setDate(iterationDate.getDate() + 1);
}

const allEvents = [...recurringThursdayEvents, ...recurringMondayEvents];
// Filter events: only today or later
const filteredEvents = allEvents.filter((event) => event.date >= today);
// Upcoming events: first 3 after sorting by date
const upcomingEvents = filteredEvents
  .sort((a, b) => a.date.getTime() - b.date.getTime())
  .slice(0, 3);

// Define bullet items for specific event types
const bulletListData: Record<string, string[]> = {
  "Tranquility Tags": [
    "$10 to play",
    "Cash Only",
    "Layout: Shorts",
    "CTP Prizes",
    "Check in on UDisc after Sign up",
    "Sign ups: 4:40-5:10 | Round Start: 5:15",
    "Be sure to check our tags standings: https://tags.discrescuenetwork.com",
  ],
  "Tranquility Doubles": [
    "$10 to play",
    "Cash Only",
    "Layout: Shorts",
    "CTP Prizes",
    "Check in on UDisc after Sign up",
    "Sign ups: 4:40-5:10 | Round Start: 5:15",
    "Tags Standings: https://tags.discrescuenetwork.com",
  ],
};

// Helper: Format event dates
const formatEventDate = (eventDate: Date): string => {
  const diffDays =
    (eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
  if (diffDays >= 0 && diffDays < 7) {
    return eventDate.toLocaleDateString(undefined, { weekday: "long" });
  }
  return eventDate.toLocaleDateString();
};

export default function EventsPage() {
  // Pagination state for table events
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Filtering: if a selected date is chosen, filter events for that date; otherwise use all filtered events.
  const filteredTableEvents = selectedDate
    ? filteredEvents.filter(
        (event) => event.date.toDateString() === selectedDate.toDateString()
      )
    : filteredEvents;
  const totalPages = Math.ceil(filteredTableEvents.length / itemsPerPage);
  const paginatedEvents = filteredTableEvents
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const calendarDisabled = (date: Date) =>
    !filteredEvents.some(
      (event) => event.date.toDateString() === date.toDateString()
    );
  return (
    <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6">
      <AnimatedElement>
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Events & Tournaments
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Stay up to date with our upcoming events and tournaments
          </p>
        </div>
      </AnimatedElement>

      <AnimatedElement delay={0.2}>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event, index) => {
              // Use bullet list if defined, otherwise fallback to splitting description by newline.
              const bulletItems = bulletListData[event.title]
                ? bulletListData[event.title]
                : event.description.split("\n").filter(Boolean);
              return (
                <Card key={index} className="bg-accent">
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                      <span>{formatEventDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                    <ul className="list-disc pl-5 space-y-1">
                      {bulletItems.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {item.toLowerCase().includes("tags standings") ? (
                            <span className="text-sm">
                              <a
                                href="https://tags.discrescuenetwork.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                              >
                                Tags Standings
                              </a>
                            </span>
                          ) : (
                            <span className="text-sm">{item}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </AnimatedElement>

      <AnimatedElement delay={0.4}>
        <section>
          <h2 className="text-2xl font-bold mb-6">Event Calendar</h2>
          <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
            <Card>
              <CardContent className="pt-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  disabled={calendarDisabled}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate
                    ? `Events on ${formatEventDate(selectedDate)}`
                    : "All Events"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>Location</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedEvents.map((event, index) => (
                      <TableRow key={index}>
                        <TableCell>{formatEventDate(event.date)}</TableCell>
                        <TableCell>{event.title}</TableCell>
                        <TableCell>{event.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 flex justify-center">
                  <Pagination>
                    {currentPage !== 1 && (
                      <PaginationPrevious
                        onClick={() => setCurrentPage(currentPage - 1)}
                      />
                    )}
                    <PaginationContent>
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            isActive={currentPage === i + 1}
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    </PaginationContent>
                    {currentPage !== totalPages && (
                      <PaginationNext
                        onClick={() => setCurrentPage(currentPage + 1)}
                      />
                    )}
                  </Pagination>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </AnimatedElement>
    </div>
  );
}
