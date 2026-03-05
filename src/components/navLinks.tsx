"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { smoothScrollToElement } from "@/lib/smoothScroll";
import React from "react";

const links: { id: string; label: string }[] = [
  { id: "about-me", label: "About" },
  { id: "tech-stack", label: "Tech Stack" },
  { id: "projects", label: "Projects" },
];

export default function NavLinks() {
  const sectionButonClicked = React.useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    window.dispatchEvent(new CustomEvent("nav-link-scroll"));
    smoothScrollToElement(el);
  }, []);

  return (
    <>
      {links.map(({ id: sectionId, label }) => {
        return (
          <li key={`nav-btn-${sectionId}`}>
            <Button
              variant="ghost"
              className={cn("text-foreground rounded-full cursor-pointer")}
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
