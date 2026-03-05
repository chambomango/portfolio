export default function TechStackSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="flex flex-col gap-4 items-baseline ">
      <h4 className="text-foreground font-medium font-base">{title}</h4>
      <ul className="flex flex-wrap items-baseline gap-2 gap-y-4 text-foreground  dark:bg-background dark:rounded-xl mb-2">
        {items.map((item) => (
          <li
            className="border dark:border-zinc-500 text-muted-foreground dark:text-zinc-300 rounded-lg px-3 py-1 font-mono"
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
