"use client";
import { CodeXml, ExternalLink } from "lucide-react";
import React from "react";

export default function Projects() {
  const stopPropagation = React.useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) =>
      event.stopPropagation(),
    [],
  );
  return (
    <>
      <span className="font-mono text-2xl text-foreground">
        Project Showcase
      </span>
      <hr className="mt-2 mb-6" />
      <div className="flex flex-col gap-12">
        <div className="bg-muted dark:bg-card p-8 rounded-xl">
          <div className="flex gap-22 items-center justify-center">
            <div>
              <a
                className="hover:underline hover:decoration-foreground"
                href="https://bc-pokedex.vercel.app/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex gap-2">
                  <h3 className="font-semibold text-foreground mb-3">
                    Pokédex App
                  </h3>
                </div>
              </a>
              <p className="text-muted-foreground">
                View Pokémon across all nine generations. Search for your
                favorite and filter by type/generation. Click on a Pokémon to
                learn more about it.
              </p>
              <br />
              <p className="text-muted-foreground mb-5">
                The technical patterns used in this project are described in
                more detail within the README.md of the source code linked
                below.
              </p>
              <div className="flex gap-3">
                <a
                  className="flex w-fit items-center gap-2 bg-foreground/4 text-foreground border px-3 py-1 rounded-md hover:bg-foreground/13"
                  href="https://bc-pokedex.vercel.app/"
                  onClick={stopPropagation}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ExternalLink className="size-4.5" />
                  <span>Live Site</span>
                </a>
                <a
                  className="flex w-fit items-center gap-2 bg-foreground/4 text-foreground border px-3 py-1 rounded-md hover:bg-foreground/13"
                  href="https://github.com/chambomango/pokedex"
                  onClick={stopPropagation}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <CodeXml className="size-5" />
                  <span>Source Code</span>
                </a>
              </div>
            </div>
            <div className="flex min-h-48 min-w-48 items-center justify-center">
              <img
                className="h-48 w-48 [image-rendering:pixelated]"
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/2.gif"
                alt="pokedex-img"
                loading="lazy"
                decoding="async"
                width={192}
                height={192}
              />
            </div>
          </div>
        </div>
        <div className="bg-muted dark:bg-card p-8 rounded-xl">
          <div className="flex gap-22 items-center justify-center">
            <div>
              <a
                className="hover:underline hover:decoration-foreground"
                href="https://bc-dealerportal.vercel.app"
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex gap-2">
                  <h3 className="font-semibold text-foreground mb-3">
                    Dealer Portal
                  </h3>
                </div>
              </a>
              <p className="text-muted-foreground mb-5">
                A performance and analytics portal modeled after a large
                national company, with dealers across the country. It displays
                monthly revenue trends, sales volume, and a ranked dealer
                leaderboard with growth and performance flags.
              </p>
              <br />
              <p className="text-muted-foreground mb-5">
                The source code includes the database schema I used to build the
                PostgreSQL database (hosted with Neon). I utilized data
                warehouse modeling techniques such as dimensional and fact
                tables, staging and mart views, and star-schema.
              </p>
              <div className="flex gap-3">
                <a
                  className="flex w-fit items-center gap-2 bg-foreground/4 text-foreground border px-3 py-1 rounded-md hover:bg-foreground/13"
                  href="https://bc-dealerportal.vercel.app"
                  onClick={stopPropagation}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ExternalLink className="size-4.5" />
                  <span>Live Site</span>
                </a>
                <a
                  className="flex w-fit items-center gap-2 bg-foreground/4 text-foreground border px-3 py-1 rounded-md hover:bg-foreground/13"
                  href="https://github.com/chambomango/dealer-portal"
                  onClick={stopPropagation}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <CodeXml className="size-5" />
                  <span>Source Code</span>
                </a>
              </div>
            </div>
            <div className="flex min-h-48 min-w-48 items-center justify-center">
              <img
                className="h-48 w-48 rounded-lg dark:hidden"
                src="/images/dealer-portal-preview.png"
                alt="dealer-portal-img"
                loading="lazy"
                decoding="async"
                width={192}
                height={192}
              />
              <img
                className="h-48 w-48 rounded-lg hidden dark:block"
                src="/images/dealer-portal-preview-dark.png"
                alt="dealer-portal-img"
                loading="lazy"
                decoding="async"
                width={192}
                height={192}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
