import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

const partners = [
  {
    name: "DiscMaster Pro",
    logo: "/placeholder.svg?height=100&width=200",
    description: "Leading manufacturer of professional-grade disc golf equipment.",
    website: "https://example.com/discmaster",
  },
  {
    name: "GreenField Parks",
    logo: "/placeholder.svg?height=100&width=200",
    description: "Our primary venue partner, providing top-notch disc golf courses.",
    website: "https://example.com/greenfield",
  },
  {
    name: "FlyHigh Apparel",
    logo: "/placeholder.svg?height=100&width=200",
    description: "Official clothing sponsor for the Tranquility TeeBirds.",
    website: "https://example.com/flyhigh",
  },
  {
    name: "Precision Putters",
    logo: "/placeholder.svg?height=100&width=200",
    description: "Specialized in high-accuracy disc golf putters.",
    website: "https://example.com/precision",
  },
]

export default function PartnersPage() {
  return (
    <div className="container py-8 sm:py-12 px-4 sm:px-6">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4">Our Partners</h1>
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
  )
}

