"use client";

interface Props {
  steps: { id: string; title: string }[];
  current: number;
  /** Highest step index the user may jump to (inclusive). */
  maxReachable: number;
  onSelect: (index: number) => void;
  label: string;
}

/** Progress list shared by the tutorial and the brand walkthrough. */
export default function Stepper({ steps, current, maxReachable, onSelect, label }: Props) {
  return (
    <nav aria-label={label} className="no-print">
      <ol className="flex flex-wrap gap-2">
        {steps.map((step, i) => {
          const isCurrent = i === current;
          const reachable = i <= maxReachable;
          return (
            <li key={step.id}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                disabled={!reachable}
                aria-current={isCurrent ? "step" : undefined}
                className={`flex items-center gap-2 rounded-full border-2 px-3 py-1 text-sm disabled:cursor-not-allowed disabled:opacity-50 ${
                  isCurrent
                    ? "border-westbridge bg-westbridge font-bold text-white"
                    : "border-westbridge/40 bg-white text-westbridge hover:border-westbridge"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${
                    isCurrent ? "bg-amber text-ink" : "bg-mist"
                  }`}
                >
                  {i + 1}
                </span>
                <span>
                  <span className="sr-only">Step {i + 1} of {steps.length}: </span>
                  {step.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
