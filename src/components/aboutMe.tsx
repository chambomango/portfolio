import GraduationCapIcon from "@/components/icons/GraduationCapIcon";
import MapPinIcon from "@/components/icons/MapPinIcon";
export default function AboutMe() {
  return (
    <>
      <span className="font-mono text-2xl text-foreground">About Me</span>
      <hr className="mt-2 mb-6" />
      <div className=" dark:bg-background dark:rounded-xl">
        <p className="text-justify mb-8 text-muted-foreground">
          I build modern user interfaces with React, TypeScript, Next.js, Redux,
          and Tailwind CSS to ship reliable features. I design and implement
          RESTful APIs and backend services in C# and Python. Using SQL, I
          extract, transform, and analyze data to uncover trends and key
          metrics. My work has contributed to applications and and tools used by
          organizations ranging from Fortune 500 companies to local businesses.
        </p>
        <p className="text-justify mb-8 text-muted-foreground">
          I take continuous improvement seriously. This field evolves rapidly
          and studying new tools, evolving frameworks, and changes to the
          development process keeps me sharp and ready. Recently, I’ve been
          refining my workflow and exploring AI tools such as Claude and Github
          Copilot where they add value. I see these tools as useful complements
          to strong fundamentals, and I place a high bar on understanding the
          underlying technologies myself and maintaining code quality through
          thoughtful review.
        </p>
        <p className="text-justify mb-8 text-muted-foreground">
          I enjoy collaborating closely with teammates to learn from each other,
          share ideas, and ship products that make a meaningful impact. If you
          would like to collaborate, you can reach me by LinkedIn or email -
          both linked in the navigation bar.
        </p>
      </div>

      <div className="mt-4 mx-4 flex gap-18 justify-between">
        <div className="bg-card rounded-xl py-4 flex flex-col items-center flex-1">
          <h1 className="h-22 content-center text-muted-foreground dark:text-zinc-300">
            5+
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            Years of Professional
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Experience
          </p>
        </div>
        <div className="bg-card rounded-xl py-4 flex flex-col items-center flex-1">
          <div className="h-22 content-center">
            <GraduationCapIcon className="w-16 h-16 text-muted-foreground dark:text-zinc-300" />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            B.S. Computer Science
            <br />
            University of New Hampshire
          </p>
        </div>
        <div className="bg-card rounded-xl py-4 flex flex-col items-center flex-1">
          <div className="h-22 content-center">
            <MapPinIcon className="w-15 h-15 text-muted-foreground dark:text-zinc-300" />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-2">
            Barrington,
            <br />
            New Hampshire
          </p>
        </div>
      </div>
    </>
  );
}
