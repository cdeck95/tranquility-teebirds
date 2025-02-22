import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Mail, Link as LinkIcon } from "lucide-react";
// import InteractiveUdiscFrame from "@/components/InteractiveUdiscFrame";
import { SocialIcons } from "@/components/SocialIcons"; // New import
import { AnimatedElement } from "@/components/animated-element";

export default function ContactPage() {
  return (
    <AnimatedElement>
      <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Get in touch with the Tranquility Teebirds team
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-1">
          <Card className="bg-accent shadow-md">
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <p>301-331 High Hill Rd, Woolwich Township, NJ 08085</p>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <p>Tranquilityteebirds@gmail.com</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-5 w-5 text-primary" />
                    <a
                      href="https://udisc.com/courses/tranquility-trails-dgc-2GZr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      UDisc Course Page
                    </a>
                  </div>
                </div>
                <div>
                  <SocialIcons />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>UDisc Course Page</CardTitle>
            </CardHeader>
            <CardContent>{/* <InteractiveUdiscFrame /> */}</CardContent>
          </Card>
        </div>
      </div>
    </AnimatedElement>
  );
}
