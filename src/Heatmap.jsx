const CELL = 12;
const PITCH = 15; // cell + gap

// Full class names so Tailwind can see them at build time.
const FILL = {
  red: ["fill-red-0", "fill-red-1", "fill-red-2", "fill-red-3", "fill-red-4"],
  ink: ["fill-ink-0", "fill-ink-1", "fill-ink-2", "fill-ink-3", "fill-ink-4"],
};
const BG = {
  red: ["bg-red-0", "bg-red-1", "bg-red-2", "bg-red-3", "bg-red-4"],
  ink: ["bg-ink-0", "bg-ink-1", "bg-ink-2", "bg-ink-3", "bg-ink-4"],
};

// days: [{ date: "YYYY-MM-DD", count, level: 0-4 }] ascending. tone: "red" | "ink".
export function Heatmap({ days, tone = "red", label, unit = "contributions" }) {
  const offset = new Date(`${days[0].date}T00:00:00Z`).getUTCDay(); // Sunday start
  const weeks = Math.ceil((days.length + offset) / 7);

  return (
    <div className="overflow-x-auto">
      <svg
        className="block h-auto w-full min-w-[640px]"
        viewBox={`0 0 ${weeks * PITCH} ${7 * PITCH}`}
        role="img"
        aria-label={label}
      >
        {days.map((d, i) => {
          const idx = i + offset;
          return (
            <rect
              key={d.date}
              className={FILL[tone][d.level]}
              x={Math.floor(idx / 7) * PITCH}
              y={(idx % 7) * PITCH}
              width={CELL}
              height={CELL}
            >
              <title>{`${d.count} ${unit} on ${d.date}`}</title>
            </rect>
          );
        })}
      </svg>
    </div>
  );
}

export function Legend({ tone = "red" }) {
  return (
    <span className="flex items-center gap-[3px]">
      Less
      {BG[tone].map((c) => (
        <i key={c} className={`inline-block size-3 ${c}`} />
      ))}
      More
    </span>
  );
}
