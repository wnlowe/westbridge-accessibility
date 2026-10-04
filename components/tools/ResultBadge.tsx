interface Props {
  pass: boolean;
  label: string;
  threshold: number;
}

/** Pass/fail shown with icon + text, never colour alone. */
export default function ResultBadge({ pass, label, threshold }: Props) {
  return (
    <div
      className={`flex items-center gap-2 rounded-md border-2 px-3 py-2 ${
        pass ? "border-growth-dark bg-white text-growth-dark" : "border-alert bg-white text-alert"
      }`}
    >
      <span aria-hidden="true" className="text-lg font-bold">
        {pass ? "✓" : "✕"}
      </span>
      <span>
        {label}: <span className="font-bold">{pass ? "passes" : "fails"}</span>{" "}
        <span className="whitespace-nowrap">(needs {threshold}:1)</span>
      </span>
    </div>
  );
}
