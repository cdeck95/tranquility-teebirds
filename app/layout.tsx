import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { MainNav } from "@/components/main-nav"
import { cn } from "@/lib/utils"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tranquility TeeBirds",
  description: "Official website of the Tranquility TeeBirds Disc Golf Team",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.className, "min-h-full flex flex-col")}>
        <MainNav />
        <main className="flex-1">{children}</main>
        <footer className="border-t py-6 md:py-8">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                © 2025 Tranquility TeeBirds. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}

