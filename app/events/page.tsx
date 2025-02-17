"use client";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, CalendarIcon } from "lucide-react";
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
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Helper: Format event dates (accepts a Date instance)
const formatEventDate = (eventDate: Date): string => {
  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  if (eventDate.toDateString() === todayStart.toDateString()) return "Today";
  return eventDate.toLocaleDateString();
};

// Helper: Generate pagination items with ellipsis
function getPaginationItems(
  currentPage: number,
  totalPages: number
): (number | string)[] {
  const pages: (number | string)[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 4) pages.push("...");
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    if (currentPage < totalPages - 3) pages.push("...");
    pages.push(totalPages);
  }
  return pages;
}

export default function EventsPage() {
  // Client state for events, selected date, and pagination
  const [events, setEvents] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch events from the API route on mount
  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        // Convert event.date strings back to Date objects
        const parsedEvents = data.events.map((ev: any) => ({
          ...ev,
          date: new Date(ev.date),
        }));
        setEvents(parsedEvents);
      });
  }, []);

  // Compute upcoming events: filter events with a date >= today (using today's start), sort them and then take the first 3
  const today = new Date();
  const todayStart = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );
  const upcomingEvents = events
    .filter((event) => event.date >= todayStart)
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  // Filter events based on selected date if available
  const filteredTableEvents = selectedDate
    ? events.filter(
        (event) => event.date.toDateString() === selectedDate.toDateString()
      )
    : events;
  const totalPages = Math.ceil(filteredTableEvents.length / itemsPerPage);
  const paginatedEvents = filteredTableEvents
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Disable dates where no event exists
  const calendarDisabled = (date: Date) =>
    !events.some((event) => event.date.toDateString() === date.toDateString());

  return (
    <div className="grid grid-cols-1 lg:container lg:mx-auto py-8 sm:py-12 px-4 sm:px-6">
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

      {/* Upcoming Events Section - shows only first 3 upcoming events */}
      <AnimatedElement delay={0.2}>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="bg-accent">
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                      <span>{formatEventDate(event.date)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-2">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{event.description}</p>
                  {event.registrationLink && (
                    <div className="mt-4">
                      <Button asChild variant="default" size="sm">
                        <Link href={event.registrationLink} target="_blank">
                          Register
                        </Link>
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </AnimatedElement>

      {/* Event Calendar & Events Table Section */}
      <AnimatedElement delay={0.4}>
        <section>
          <h2 className="text-2xl font-bold mb-6">Event Calendar</h2>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">
            <Card>
              <CardContent className="pt-6">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    setSelectedDate(date);
                    setCurrentPage(1); // reset pagination on new filter
                  }}
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
                <div className="grid grid-cols-1 mx-auto mt-4">
                  <Pagination>
                    {currentPage !== 1 && (
                      <PaginationPrevious
                        onClick={() => setCurrentPage(currentPage - 1)}
                      />
                    )}
                    <PaginationContent>
                      {getPaginationItems(currentPage, totalPages).map(
                        (item, idx) => (
                          <PaginationItem key={idx}>
                            {typeof item === "number" ? (
                              <PaginationLink
                                isActive={currentPage === item}
                                onClick={() => setCurrentPage(item)}
                              >
                                {item}
                              </PaginationLink>
                            ) : (
                              <span className="px-3 py-1">...</span>
                            )}
                          </PaginationItem>
                        )
                      )}
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
