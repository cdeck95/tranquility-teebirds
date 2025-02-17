import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { AnimatedElement } from "@/components/animated-element";

const bulletinPosts = [
  {
    title: "Team Victory at Regional Championship",
    date: "June 15, 2025",
    content:
      "The Tranquility Teebirds secured first place at the Regional Disc Golf Championship. Congratulations to all team members for their outstanding performance!",
  },
  {
    title: "New Practice Schedule Announced",
    date: "May 1, 2025",
    content:
      "We're excited to announce our new practice schedule for the summer season. Check the Events page for more details.",
  },
  {
    title: "Community Outreach Program Success",
    date: "April 20, 2025",
    content:
      "Our recent disc golf clinic for local youth was a huge success. Thank you to all volunteers and participants!",
  },
];

export default function BulletinPage() {
  return (
    <AnimatedElement>
      <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Bulletin Board
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Stay updated with the latest news and announcements from the
            Tranquility Teebirds
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bulletinPosts.map((post, index) => (
            <Card key={index} className="bg-accent shadow-md">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                  <span>{post.date}</span>
                </div>
                <p className="text-sm sm:text-base">{post.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedElement>
  );
}
