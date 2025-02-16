import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import birdieLogo from "/public/birdie.jpg";
import dickieLogo from "/public/dickieDG.png";
const partners = [
  {
    name: "Birdie Disc Golf Supply Co.",
    // Assumed logo image in the public folder
    logo: birdieLogo,
    description:
      "Main involvement will be prize donations and providing tournament player packs.",
    website: "https://birdiediscgolfsupply.com/",
  },
  {
    name: "DickieDG",
    // Assumed logo image in the public folder
    logo: dickieLogo,
    description:
      "Featuring events and player accomplishments. Follow on Instagram.",
    website: "https://www.instagram.com/dickie.dg?igsh=MWVxbnJ2eG02YXkxbQ==",
  },
  {
    name: "Disc Rescue Network",
    // Using logo and details from the Lost & Found page
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Transparent-oozlRNUhrxlINd6nbuQyz1fuM8Tcw1.png",
    description:
      "Tranquility TeeBirds uses Disc Rescue Network for our lost and found system.",
    website: "https://app.discrescuenetwork.com",
  },
];

export default function PartnersPage() {
  return (
    <div className="container py-8 sm:py-12 px-4 sm:px-6">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          Our Partners
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          Meet the amazing organizations that support the Tranquility TeeBirds
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {partners.map((partner, index) => (
          <Card key={index} className="bg-accent">
            <CardHeader>
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={`${partner.name} logo`}
                width={200}
                height={100}
                className="mb-4"
              />
              <CardTitle>{partner.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base mb-4">{partner.description}</p>
              <Link
                href={partner.website}
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Website
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
