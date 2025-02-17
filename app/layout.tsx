import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNav } from "@/components/main-nav";
import { cn } from "@/lib/utils";
import type React from "react"; // Added import for React
import { Facebook, Instagram, Globe } from "lucide-react"; // added for icons
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tranquility Teebirds",
  description: "Official website of the Tranquility Teebirds Disc Golf Team",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(inter.className, "min-h-full flex flex-col")}>
        <MainNav />
        <main className="flex-1">{children}</main>
        <footer className="bg-muted">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* About Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  About Tranquility Teebirds
                </h3>
                <p className="text-sm text-muted-foreground">
                  Official website hosting Disc Golf Tournament Team information
                  and events.
                </p>
              </div>
              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/events"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/team"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Our Team
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/partners"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Partners
                    </Link>
                  </li>
                </ul>
              </div>
              {/* More Info */}
              <div>
                <h3 className="text-lg font-semibold mb-4">More Info</h3>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href="/course-information"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Course Information
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/bulletin"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Bulletin
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              {/* Contact Us */}
              <div className="space-y-2">
                <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                <p className="text-sm ">
                  Email:{" "}
                  <a
                    href="mailto:Tranquilityteebirds@gmail.com"
                    className="underline text-muted-foreground hover:text-primary"
                  >
                    Tranquilityteebirds@gmail.com
                  </a>
                </p>
                <p className="text-sm">
                  Address:{" "}
                  <a
                    href="https://www.google.com/maps/place/Tranquility+Trails/@39.7515332,-75.3313394,17z/data=!4m12!1m5!3m4!2zMznCsDQ1JzA1LjUiTiA3NcKwMTknNTIuOCJX!8m2!3d39.7515332!4d-75.3313394!3m5!1s0x89c6e0b83a157e81:0xd8de8ad70ce6596d!8m2!3d39.7504573!4d-75.3323336!16s%2Fg%2F11fxxz7kkq?entry=ttu&g_ep=EgoyMDI1MDIxMi4wIKXMDSoASAFQAw%3D%3D"
                    className="underline text-muted-foreground hover:text-primary"
                  >
                    301-331 High Hill Rd, Woolwich Township, NJ 08085
                  </a>
                </p>
                <div className="flex space-x-4 mt-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="sr-only">Facebook</span>
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Instagram className="h-5 w-5" />
                    <span className="sr-only">Instagram</span>
                  </a>
                  <a
                    href="https://udisc.com/courses/tranquility-trails-dgc-2GZr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">UDisc</span>
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-muted-foreground/10 text-center">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Tranquility Teebirds. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
