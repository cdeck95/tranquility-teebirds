import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { AnimatedElement } from "@/components/animated-element";
import logo from "@/public/teebirds logo.jpg";
import { Card } from "@/components/ui/card";

export default function Home() {
  return (
    <>
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-background z-10" />
        <div className="container mx-auto relative z-20 py-12 md:py-24 lg:py-32 flex flex-col items-center text-center">
          <AnimatedElement>
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mb-6 sm:mb-8">
              <Image
                src={logo}
                alt="Tranquility Teebirds Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </AnimatedElement>
          <AnimatedElement delay={0.2}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter">
              Tranquility Teebirds
            </h1>
          </AnimatedElement>
          <AnimatedElement delay={0.4}>
            <p className="mt-4 max-w-[700px] text-base sm:text-lg md:text-xl text-muted-foreground px-4">
              Soaring to new heights in disc golf excellence
            </p>
          </AnimatedElement>
          <AnimatedElement delay={0.6}>
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/events">Upcoming Events</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="/team">Meet the Team</Link>
              </Button>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <section className="container mx-auto py-8 sm:py-12 md:py-24 px-4 sm:px-6">
        <div className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatedElement delay={0.2}>
            <Card className="flex flex-col justify-between items-center text-center p-4 sm:p-6 bg-accent rounded-lg h-42">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                  Lost & Found
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  Lost something on the course? Check our lost & found.
                </p>
              </div>
              <Button asChild variant="secondary" className="w-full sm:w-auto">
                <Link href="/lost-and-found">View More</Link>
              </Button>
            </Card>
          </AnimatedElement>
          <AnimatedElement delay={0.4}>
            <Card className="flex flex-col justify-between items-center text-center p-4 sm:p-6 bg-accent rounded-lg h-42">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Partners</h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  Learn more about our sponsors and partners.
                </p>
              </div>
              <Button asChild variant="secondary" className="w-full sm:w-auto">
                <Link href="/partners">View More</Link>
              </Button>
            </Card>
          </AnimatedElement>
          <AnimatedElement delay={0.6}>
            <Card className="flex flex-col justify-between items-center text-center p-4 sm:p-6 bg-accent rounded-lg h-42">
              <div className="flex flex-col items-center text-center">
                <h3 className="text-xl sm:text-2xl font-bold mb-2">
                  Get In Touch
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">
                  Have questions? Contact us for more information.
                </p>
              </div>
              <Button asChild variant="secondary" className="w-full sm:w-auto">
                <Link href="/course-information">Contact Us</Link>
              </Button>
            </Card>
          </AnimatedElement>
        </div>
      </section>
    </>
  );
}
