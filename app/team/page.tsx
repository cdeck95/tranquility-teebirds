import fs from "fs/promises";
import path from "path";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TeamMember {
  name: string;
  pdga: string;
}

export default async function TeamPage() {
  // Read and parse teamData.csv
  const csvPath = path.join(process.cwd(), "app", "team", "teamData.csv");
  const csvData = await fs.readFile(csvPath, "utf8");
  const lines = csvData.split("\n").filter((line) => line.trim().length);
  lines.shift(); // remove header line
  const teamMembers: TeamMember[] = lines.map((line) => {
    const [name, pdga] = line.split(",");
    return { name: name.trim(), pdga: pdga.trim() };
  });

  const captainNames = new Set(["Dan Kelly", "Chris Deck", "Dustin Patterson"]);
  const captains = teamMembers.filter((member) =>
    captainNames.has(member.name)
  );
  const players = teamMembers.filter(
    (member) => !captainNames.has(member.name)
  );

  return (
    <div className="container py-8 sm:py-12 px-4 sm:px-6">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          Our Team
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground">
          Meet the Tranquility TeeBirds disc golf team
        </p>
      </div>

      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Team Captains
        </h2>
        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {captains.map(({ name, pdga }) => (
            <Card key={name}>
              <CardHeader>
                <CardTitle>
                  <a
                    href={`https://www.pdga.com/player/${pdga}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {name}
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative mb-4">
                  <Image
                    // Use the player's full name from the public folder with .jpg extension.
                    src={`/${name}.jpg`}
                    alt={name}
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
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
          Team Players
        </h2>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {players.map(({ name, pdga }) => (
            <Card key={name}>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">
                  <a
                    href={`https://www.pdga.com/player/${pdga}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {name}
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-square relative mb-4">
                  <Image
                    // Use the player's full name from the public folder with .jpg extension.
                    src={`/${name}.jpg`}
                    alt={name}
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
  );
}
