"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { smoothScroll } from "@/lib/smoothScroll";

import ThemeToggle from "./themeToggle";
import NavLinks from "./navLinks";
import { Button } from "@/components/ui/button";
import GitHubIcon from "./icons/GitHubIcon";
import LinkedInIcon from "./icons/LinkedInIcon";
import EmailIcon from "./icons/EmailIcon";
import React from "react";

const SCROLL_THRESHOLD = 50;

export default function NavBar() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const suppressHide = useRef(false);
  const suppressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < SCROLL_THRESHOLD) {
        setVisible(true);
      } else if (suppressHide.current) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    const handleNavLinkScroll = () => {
      //Forces navbar to remain visible for duration of scroll after clicking nav link
      suppressHide.current = true;
      setVisible(true);
      if (suppressTimer.current) clearTimeout(suppressTimer.current);
      suppressTimer.current = setTimeout(() => {
        suppressHide.current = false;
      }, 1500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("nav-link-scroll", handleNavLinkScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("nav-link-scroll", handleNavLinkScroll);
    };
  }, []);

  const homeLinkClicked = React.useCallback(() => {
    window.dispatchEvent(new CustomEvent("nav-link-scroll"));
    smoothScroll(0);
  }, []);

  return (
    <div className="sticky top-2 z-50 flex justify-center px-4 py-2 pointer-events-none">
      <nav
        className={cn(
          "flex items-center gap-1 px-3 py-1 border rounded-full bg-background/70 backdrop-blur-sm shadow-sm pointer-events-auto transition-all duration-300",
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none",
        )}
      >
        <button className="px-2 cursor-pointer" onClick={homeLinkClicked}>
          Ben Chamberlain
        </button>
        <span className="text-muted-foreground px-1">|</span>
        <ul className="flex flex-row items-center">
          <NavLinks />
        </ul>
        <span className="text-muted-foreground px-1">|</span>
        <ul className="flex flex-row items-center gap-0.5">
          <li>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <a href="https://www.linkedin.com/in/ben-chamberlain/">
                <LinkedInIcon className="h-4 w-4 text-foreground" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <a href="https://github.com/chambomango/">
                <GitHubIcon className="h-4 w-4 text-foreground" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
          </li>
          <li>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              asChild
            >
              <a href="mailto:bchamberlain888@gmail.com">
                <EmailIcon className="h-4 w-4 text-foreground" />
                <span className="sr-only">Email</span>
              </a>
            </Button>
          </li>
        </ul>
        <span className="text-muted-foreground px-1">|</span>
        <ul>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </nav>
    </div>
  );
}
