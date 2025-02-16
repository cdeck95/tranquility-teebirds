# Project Overview

Provide a high-level description of the project, covering:

- A NextJS application using the App Router.
- Integration of the ShadCN UI library.
- Tranquility Teebirds Disc Golf Tournament Team Website. Hosts information about the team and events.

# Instructions for Server Actions

- Use server actions for all API interactions.
- Place heavy code and long interactions on the server side.
- Maintain clear comments to explain the need and functionality of each server action.

# Standard Design Principles

- Code should always include comments detailing the purpose and functionality of functions.
- Use tabs for indentation.
- Use verbose variable names to enhance readability.
- Prefer central hook or context provider management for shared state.
- Keep any heavy or long-running operations on the server side.

# NextJS App Router & ShadCN UI Configuration Snippets

- For NextJS App Router initialization:

```typescript
// filepath: c:\Users\deckc\VS Code Projects\filament-tracking\app\layout.tsx
// ...existing code...
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // NextJS App Router layout with required configurations
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Example ShadCN Components Usage:

```typescript
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CardWithForm() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
```
