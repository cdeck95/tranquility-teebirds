"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Users,
  Search,
  Handshake,
  Menu,
  Home,
  Info,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import TeeBirdLogo from "@/public/teebirds logo.png";
import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "About",
    href: "/course-information",
    icon: Info,
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
    href: "/lost-and-found",
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
];

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-2 md:px-0">
        <Link href="/" className="flex items-center mx-2 space-x-2">
          <Image
            src={TeeBirdLogo}
            alt="Tranquility Teebirds Logo"
            width={56}
            height={56}
            className="rounded-full cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:ml-auto md:flex md:gap-2">
          {navItems.map((item) => (
            <Button
              key={item.href}
              variant={pathname === item.href ? "secondary" : "ghost"}
              asChild
              onClick={() => router.push(item.href)}
            >
              {/* <Link href={item.href}> */}
              <div className="flex items-center gap-2">
                <item.icon className="h-4 w-4 mr-2" />
                {item.title}
              </div>
              {/* </Link>  */}
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
            <nav className="flex flex-col gap-2 mt-4">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="flex justify-start items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  onClick={() => {
                    setIsOpen(false);
                    router.push(item.href);
                  }}
                >
                  {/* <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                  > */}
                  <item.icon className="h-5 w-5" />
                  {item.title}
                  {/* </Link> */}
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
