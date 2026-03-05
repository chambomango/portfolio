import TechStackSection from "./techStackSection";

export default function TechStack() {
  return (
    <>
      <span className="font-mono text-2xl text-foreground">
        Technology Stack
      </span>
      <hr className="mt-2 mb-6" />
      <div className="flex flex-col gap-12">
        <TechStackSection
          title="Front-End"
          items={[
            "React",
            "TypeScript",
            "Redux",
            "Next.js",
            "HTML",
            "CSS",
            "Tailwind CSS",
            "Blazor",
            "Jest",
          ]}
        />
        <TechStackSection
          title="Back-End"
          items={[
            "C#",
            "Python",
            "Java",
            "Scala",
            "PostgreSQL",
            "SQL Server",
            "ASP.NET Core",
            "Node.js",
            "FastAPI",
            "PowerShell",
          ]}
        />
        <TechStackSection
          title="DevOps & Cloud"
          items={[
            "Amazon Web Services",
            "Azure DevOps",
            "GitHub Actions",
            "Vercel",
          ]}
        />
        <TechStackSection
          title="Tools"
          items={[
            "VS Code",
            "Docker",
            "Git",
            "GitHub",
            "GitHub Copilot",
            "Postman",
          ]}
        />
      </div>
    </>
  );
}
