"use client";

import { useState } from "react";
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

const allEvents = [
  {
    title: "Spring Tournament",
    date: new Date(2025, 2, 15), // March 15, 2025
    location: "Tranquility Park",
    description:
      "Annual spring tournament featuring teams from across the region.",
  },
  {
    title: "Community Practice Day",
    date: new Date(2025, 3, 1), // April 1, 2025
    location: "Main Course",
    description:
      "Open practice session with team members and community players.",
  },
  {
    title: "Summer Championship",
    date: new Date(2025, 5, 20), // June 20, 2025
    location: "Championship Course",
    description: "Major championship event with professional division players.",
  },
  {
    title: "Disc Golf Clinic",
    date: new Date(2025, 7, 10), // August 10, 2025
    location: "Training Grounds",
    description:
      "Learn from the pros! Join us for a day of disc golf instruction.",
  },
  {
    title: "Fall Foliage Tournament",
    date: new Date(2025, 9, 5), // October 5, 2025
    location: "Autumn Ridge Course",
    description: "Experience disc golf amidst beautiful fall colors.",
  },
];

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const filteredEvents = selectedDate
    ? allEvents.filter(
        (event) => event.date.toDateString() === selectedDate.toDateString()
      )
    : allEvents;

  const eventDates = allEvents.map((event) => event.date);

  const upcomingEvents = allEvents
    .filter((event) => event.date > new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  return (
    <div className="container py-8 sm:py-12 px-4 sm:px-6">
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
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="bg-accent">
                <CardHeader>
                  <CardTitle>{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                    <span>{event.date.toDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  <p className="text-sm sm:text-base">{event.description}</p>
                </CardContent>
              </Card>
            ))}
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
                  disabled={(date) =>
                    // disabled if an event isnt on the day
                    !eventDates.some(
                      (eventDate) =>
                        eventDate.toDateString() === date.toDateString()
                    )
                  }
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>
                  {selectedDate
                    ? `Events on ${selectedDate.toDateString()}`
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
                    {filteredEvents.map((event, index) => (
                      <TableRow key={index}>
                        <TableCell>{event.date.toDateString()}</TableCell>
                        <TableCell>{event.title}</TableCell>
                        <TableCell>{event.location}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </section>
      </AnimatedElement>
    </div>
  );
}
