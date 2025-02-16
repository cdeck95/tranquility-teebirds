"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  Search,
  Handshake,
  Mail,
  Menu,
  Home,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import TeeBirdLogo from "@/public/teebirds logo.jpg";
import { useState } from "react";
import Image from "next/image";

const navItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Events",
    href: "/events",
    icon: Calendar,
  },
  {
    title: "Team",
    href: "/team",
    icon: Users,
  },
  {
    title: "Lost & Found",
    href: "/lost-found",
    icon: Search,
  },
  // {
  //   title: "Bulletin",
  //   href: "/bulletin",
  //   icon: Bell,
  // },
  {
    title: "Partners",
    href: "/partners",
    icon: Handshake,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: Mail,
  },
];

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center mx-2 space-x-2">
          <Image
            src={TeeBirdLogo}
            alt="Tranquility TeeBirds Logo"
            width={56}
            height={56}
            className="rounded-full cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:ml-auto md:flex md:gap-2">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" asChild>
              <Link href={item.href}>
                <item.icon className="h-4 w-4 mr-2" />
                {item.title}
              </Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden ml-auto">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-2 text-lg font-semibold",
                    "hover:text-primary transition-colors"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
