import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const teamMembers = {
  captains: ["Dan Kelly", "Chris Deck", "Dustin Patterson"],
  players: [
    "Cody Kulik",
    "Sean Peterson",
    "Steve Finger",
    "Zack Rofrano",
    "Sean Logue",
    "Matt Esteves",
    "Ben Riesenbach",
    "Alec Carrozza",
    "Jim Hunt",
    "Andrew Stocklin",
    "Christian Wilson",
    "Dan Cordle",
    "Jon Sjolander",
    "Chris Juergensen",
  ],
}

export default function TeamPage() {
  return (
    <div className="container py-8 sm:py-12 px-4 sm:px-6">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4">Our Team</h1>
        <p className="text-base sm:text-lg text-muted-foreground">Meet the Tranquility TeeBirds disc golf team</p>
      </div>

      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Team Captains</h2>
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.captains.map((captain) => (
            <Card key={captain}>
              <CardHeader>
                <CardTitle>{captain}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative mb-4">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt={captain}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <p className="text-sm text-muted-foreground">Team Captain</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Team Players</h2>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.players.map((player) => (
            <Card key={player}>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">{player}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative mb-4">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt={player}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <p className="text-sm text-muted-foreground">Team Player</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

