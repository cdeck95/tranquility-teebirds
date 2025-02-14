import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function LostFoundPage() {
  return (
    <div className="container py-8 sm:py-12 px-4 sm:px-6">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4">Lost & Found</h1>
        <p className="text-base sm:text-lg text-muted-foreground">Find your lost discs with Disc Rescue Network</p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="relative w-full h-16 sm:h-20 mb-6">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo%20Transparent-oozlRNUhrxlINd6nbuQyz1fuM8Tcw1.png"
              alt="Disc Rescue Network Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <CardTitle>Disc Rescue Network</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Tranquility TeeBirds uses Disc Rescue Network for our lost and found system. If you've lost a disc during
            one of our events or at our courses, please check the Disc Rescue Network to see if it has been found.
          </p>
          <p>Visit the link below to search for your lost discs:</p>
          <Button asChild className="w-full sm:w-auto">
            <Link href="https://app.discrescuenetwork.com" target="_blank" rel="noopener noreferrer">
              Check Disc Rescue Network
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

