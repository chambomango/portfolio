"use client";
import React from "react";
import AboutMe from "@/components/aboutMe";
import TechStack from "@/components/techStack";
import Projects from "@/components/projects";
import HomepageIntro from "@/components/homepageIntro";

export default function Home() {
  const sectionAnimations = React.useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("animate-show", entry.isIntersecting);
      });
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center mx-auto mb-30">
      <section className="animate-show max-w-207 h-[100vh]">
        <HomepageIntro />
      </section>

      <section
        id="about-me"
        ref={sectionAnimations}
        className="scroll-mt-20 pt-10 mb-50 animate-hidden max-w-207 w-full"
      >
        <AboutMe />
      </section>

      <section
        id="tech-stack"
        ref={sectionAnimations}
        className="scroll-mt-20 pt-10 mb-50 animate-hidden max-w-207 w-full"
      >
        <TechStack />
      </section>

      <section
        id="projects"
        ref={sectionAnimations}
        className="scroll-mt-20 pt-10 mb-100 animate-hidden max-w-207 w-full"
      >
        <Projects />
      </section>
    </div>
  );
}
