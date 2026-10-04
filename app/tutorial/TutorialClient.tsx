"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import PageIntro from "@/components/ui/PageIntro";
import Stepper from "@/components/ui/Stepper";
import GuidelineNote from "@/components/notes/GuidelineNote";
import LessonQuiz from "@/components/tutorial/LessonQuiz";
import { tutorialLessons } from "@/data/tutorial";
import { MAGIC_WORD } from "@/lib/siteConfig";

// The final "complete" screen sits after the last lesson
const STEPS = [...tutorialLessons.map((l) => ({ id: l.id, title: l.title })), { id: "complete", title: "Complete" }];
const COMPLETE_INDEX = STEPS.length - 1;
const LESSON_COUNT = tutorialLessons.length;
const HAS_QUIZZES = tutorialLessons.some((l) => l.quiz?.length);

// Only promise a time if every lesson has an estimate (UDL: clear expectations, §3.1)
const TOTAL_MINUTES = tutorialLessons.every((l) => l.minutes)
  ? tutorialLessons.reduce((sum, l) => sum + (l.minutes ?? 0), 0)
  : null;

// Progress is in-memory only — leaving or reloading the page starts again.
export default function TutorialClient() {
  const [index, setIndex] = useState(0);
  const [furthest, setFurthest] = useState(0);
  // Lessons whose quiz has been passed, so going back doesn't lock them again (in-memory)
  const [passed, setPassed] = useState<string[]>([]);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const lesson = tutorialLessons[index];
  const isComplete = index === COMPLETE_INDEX;
  const hasQuiz = !isComplete && !!lesson.quiz?.length;
  const canContinue = !hasQuiz || passed.includes(lesson.id);

  const lessonId = lesson?.id;
  const onQuizResult = useCallback(
    (allCorrect: boolean) => {
      if (allCorrect && lessonId) setPassed((p) => (p.includes(lessonId) ? p : [...p, lessonId]));
    },
    [lessonId]
  );

  const go = (i: number) => {
    setIndex(i);
    setFurthest((f) => Math.max(f, i));
    // Move focus to the new heading so screen-reader and keyboard users land on the new content
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  return (
    <>
      <PageIntro title="Accessibility tutorial" after={<GuidelineNote id="no-time-limits" />}>
        <p>
          {LESSON_COUNT} short lessons{TOTAL_MINUTES ? `, about ${TOTAL_MINUTES} minutes in total` : ""}
          {HAS_QUIZZES && ", with a quick check at the end of some lessons"}. At the end
          you&rsquo;ll get the magic word that opens Develop Your Brand.
        </p>
      </PageIntro>

      <div className="container-page py-8">
        <Stepper label="Tutorial progress" steps={STEPS} current={index} maxReachable={furthest} onSelect={go} />
        <GuidelineNote id="choice-and-progress" className="mt-4 max-w-3xl" />

        <article className="fade-in mt-10 max-w-[65ch]" key={index}>
          {isComplete ? (
            <>
              <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-westbridge">
                Tutorial complete
              </h2>
              <p className="mt-4 text-lg">You need this word to open Develop Your Brand. It asks for it every time.</p>
              <p className="mt-6 inline-block rounded-md border-2 border-amber bg-amber/20 px-5 py-3">
                <span className="block text-sm font-bold">Magic word</span>
                <span className="font-mono text-2xl font-bold text-westbridge">{MAGIC_WORD}</span>
              </p>
              <div className="mt-8">
                <Link href="/brand/" className="btn-primary">
                  Open Develop Your Brand
                </Link>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm">
                Lesson {index + 1} of {LESSON_COUNT}
                {lesson.sectionRef && <>. Based on guidelines {lesson.sectionRef}</>}
              </p>
              <h2 ref={headingRef} tabIndex={-1} className="mt-1 text-2xl font-bold text-westbridge">
                {lesson.title}
              </h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed">
                {lesson.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              {hasQuiz && (
                <>
                  <LessonQuiz key={lesson.id} questions={lesson.quiz!} onAllCorrect={onQuizResult} />
                  {canContinue && (
                    <p className="mt-4 font-bold text-growth-dark">
                      <span aria-hidden="true">✓ </span>You&rsquo;ve passed this check, so you can move on.
                    </p>
                  )}
                  <GuidelineNote id="quiz-feedback" className="mt-6" />
                </>
              )}
            </>
          )}
        </article>

        <div className="no-print mt-10 flex max-w-[65ch] justify-between gap-4 border-t border-ink/15 pt-6">
          <button type="button" className="btn-secondary" onClick={() => go(index - 1)} disabled={index === 0}>
            Previous lesson
          </button>
          {!isComplete && (
            <div className="flex flex-col items-end gap-2">
              {/* aria-disabled (not disabled) keeps the button focusable so its reason is announced */}
              <button
                type="button"
                className="btn-primary aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
                aria-disabled={!canContinue}
                aria-describedby={canContinue ? undefined : "continue-reason"}
                onClick={() => canContinue && go(index + 1)}
              >
                {index === COMPLETE_INDEX - 1 ? "Finish tutorial" : "Next lesson"}
              </button>
              {!canContinue && (
                <p id="continue-reason" className="text-sm">
                  Answer every question correctly to continue.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
