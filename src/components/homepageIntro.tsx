import Headlines from "./headlines";

export default function HomepageIntro() {
  return (
    <>
      <div className="mt-36 flex flex-col">
        <Headlines />
        <div className="text-foreground font-bold text-7xl mb-2">benjamin</div>
        <div className="text-muted-foreground dark:text-foreground font-bold text-7xl mb-8">
          chamberlain
        </div>
      </div>
      <p className="font-mono text-md leading-relaxed text-muted-foreground dark:text-zinc-300 max-w-102 dark:bg-background dark:rounded-xl">
        Hi, I’m Ben — welcome to my site. I use this space to experiment, build,
        and share projects I’m working on. The full source code for everything
        here is available on my GitHub.
      </p>
    </>
  );
}
