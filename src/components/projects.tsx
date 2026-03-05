"use client";
import { CodeXml } from "lucide-react";
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
              View Pokémon across all nine generations. Search for your favorite
              and filter by type/generation. Click on a Pokémon to learn more
              about it.
            </p>
            <br />
            <p className="text-muted-foreground mb-5">
              The technical patterns used in this project are described in more
              detail within the README.md of the source code linked below.
            </p>
            <div className="source-code">
              <a
                className="flex w-fit gap-2 text-foreground font-semibold border px-3 py-1 rounded-md"
                href="https://github.com/chambomango/pokedex"
                onClick={stopPropagation}
                rel="noopener noreferrer"
                target="_blank"
              >
                <CodeXml />
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
    </>
  );
}
