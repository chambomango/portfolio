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
            "Next.js",
            "Redux Toolkit",
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
            "ASP.NET Core",
            "Node.js",
            "PowerShell",
          ]}
        />
        <TechStackSection
          title="Databases"
          items={["SQL Server", "PostgreSQL"]}
        />
        <TechStackSection
          title="DevOps & Cloud"
          items={[
            "Amazon Web Services",
            "Azure DevOps",
            "Docker",
            "GitHub Actions",
          ]}
        />
        <TechStackSection
          title="Tools"
          items={[
            "Git",
            "GitHub",
            "GitLab",
            "VS Code",
            "Cursor",
            "GitHub Copilot",
            "Postman",
          ]}
        />
      </div>
    </>
  );
}
