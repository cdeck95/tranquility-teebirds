import { Facebook, Instagram, Globe } from "lucide-react";

// SocialIcons: Reusable component for displaying social media icons
export function SocialIcons() {
  return (
    <div className="flex flex-col items-center space-y-2">
      <h3 className="text-lg font-semibold">Follow Us</h3>
      <div className="flex space-x-4">
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
  );
}
