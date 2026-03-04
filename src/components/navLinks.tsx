"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Route } from "next";
import React from "react";

const links: { id: string; label: string }[] = [
  { id: "about-me", label: "About" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
];

export default function NavLinks() {
  const sectionButonClicked = React.useCallback((sectionId: string) => {
    window.dispatchEvent(new CustomEvent("nav-link-scroll"));
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      {links.map(({ id: sectionId, label }) => {
        return (
          <li key={`nav-btn-${sectionId}`}>
            <Button
              variant="ghost"
              className={cn("text-foreground rounded-full")}
              onClick={() => sectionButonClicked(sectionId)}
            >
              {label}
            </Button>
          </li>
        );
      })}
    </>
  );
}
