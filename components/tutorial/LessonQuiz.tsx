"use client";

import { useEffect, useId, useState } from "react";
import type { QuizQuestion } from "@/data/tutorial";
import { QuizScore, scoreAnswer } from "@/lib/quiz";

interface Props {
  questions: QuizQuestion[];
  /** Called whenever "every question is answered correctly" changes */
  onAllCorrect: (allCorrect: boolean) => void;
}

type Result = QuizScore | "empty" | null;

/**
 * "Choose all that apply" questions at the end of a lesson. Remount with a
 * new key per lesson to reset. Feedback is written out (not colour alone),
 * announced to screen readers, and never timed.
 */
export default function LessonQuiz({ questions, onAllCorrect }: Props) {
  const [chosen, setChosen] = useState<Record<string, number[]>>({});
  const [results, setResults] = useState<Record<string, Result>>({});

  const allCorrect = questions.every((q) => {
    const r = results[q.id];
    return r && r !== "empty" && r.correct;
  });

  useEffect(() => onAllCorrect(allCorrect), [allCorrect, onAllCorrect]);

  const toggle = (q: QuizQuestion, option: number) => {
    setChosen((c) => {
      const current = c[q.id] ?? [];
      return { ...c, [q.id]: current.includes(option) ? current.filter((i) => i !== option) : [...current, option] };
    });
    // Changing an answer clears the old result so it can be checked again
    setResults((r) => ({ ...r, [q.id]: null }));
  };

  const check = (q: QuizQuestion) => {
    const picks = chosen[q.id] ?? [];
    setResults((r) => ({ ...r, [q.id]: picks.length === 0 ? "empty" : scoreAnswer(picks, q.correct) }));
  };

  return (
    <section aria-labelledby="quiz-heading" className="mt-10 border-t-2 border-westbridge pt-6">
      <h3 id="quiz-heading" className="text-xl font-bold text-westbridge">
        Check your understanding
      </h3>
      <p className="mt-1">
        Answer {questions.length === 1 ? "this question" : `all ${questions.length} questions`} correctly to continue.
        You can try as many times as you like.
      </p>
      <div className="mt-6 space-y-8">
        {questions.map((q, i) => (
          <Question
            key={q.id}
            question={q}
            number={questions.length > 1 ? i + 1 : undefined}
            chosen={chosen[q.id] ?? []}
            result={results[q.id] ?? null}
            onToggle={(option) => toggle(q, option)}
            onCheck={() => check(q)}
          />
        ))}
      </div>
    </section>
  );
}

function Question({
  question: q,
  number,
  chosen,
  result,
  onToggle,
  onCheck,
}: {
  question: QuizQuestion;
  number?: number;
  chosen: number[];
  result: Result;
  onToggle: (option: number) => void;
  onCheck: () => void;
}) {
  const id = useId();

  return (
    <fieldset>
      <legend className="font-bold">
        {number && <>Question {number}. </>}
        {q.question} <span className="font-normal">Choose all that apply.</span>
      </legend>
      <ul className="mt-3 space-y-2">
        {q.options.map((option, i) => (
          <li key={i} className="flex items-start gap-3">
            <input
              id={`${id}-${i}`}
              type="checkbox"
              checked={chosen.includes(i)}
              onChange={() => onToggle(i)}
              className="mt-1 h-5 w-5 flex-none accent-westbridge"
            />
            <label htmlFor={`${id}-${i}`} className="cursor-pointer">
              {option}
            </label>
          </li>
        ))}
      </ul>
      <button type="button" className="btn-secondary mt-4" onClick={onCheck}>
        Check answer
      </button>

      <div aria-live="polite" className="mt-3">
        {result === "empty" && <p className="font-bold text-alert">Choose at least one answer, then check.</p>}
        {result && result !== "empty" && result.correct && (
          <div className="border-l-4 border-growth-dark pl-3">
            <p className="font-bold text-growth-dark">
              <span aria-hidden="true">✓ </span>Correct.
            </p>
            {q.explanation && <p className="mt-1">{q.explanation}</p>}
          </div>
        )}
        {result && result !== "empty" && !result.correct && (
          <div className="border-l-4 border-alert pl-3">
            <p className="font-bold text-alert">
              <span aria-hidden="true">✕ </span>Not quite. You chose {result.hits} of {result.total} correct{" "}
              {result.total === 1 ? "answer" : "answers"}
              {result.extras > 0 && (
                <>
                  {" "}
                  and {result.extras} that {result.extras === 1 ? "doesn’t" : "don’t"} apply
                </>
              )}
              .
            </p>
            {q.hint && <p className="mt-1">{q.hint}</p>}
            <p className="mt-1">Change your answer and check again.</p>
          </div>
        )}
      </div>
    </fieldset>
  );
}
