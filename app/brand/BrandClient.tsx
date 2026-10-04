"use client";

import { useCallback, useRef, useState } from "react";
import PageIntro from "@/components/ui/PageIntro";
import Stepper from "@/components/ui/Stepper";
import BrandGate from "@/components/brand/BrandGate";
import ColourStep from "@/components/brand/ColourStep";
import TypographyStep from "@/components/brand/TypographyStep";
import SummaryStep from "@/components/brand/SummaryStep";
import { brandSteps } from "@/data/brandSteps";
import { BrandState, INITIAL_BRAND } from "@/lib/brandState";
import { checkMagicWord } from "@/lib/magicWord";
import { useLeaveWarning } from "@/lib/useLeaveWarning";
import GuidelineNote from "@/components/notes/GuidelineNote";

export default function BrandClient() {
  // All state is in-memory: the magic word is required on every visit, and
  // leaving or reloading the page clears the walkthrough.
  const [unlocked, setUnlocked] = useState(false);
  const [brand, setBrand] = useState<BrandState>(INITIAL_BRAND);
  const [stepIndex, setStepIndex] = useState(0);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const update = useCallback((fn: (s: BrandState) => BrandState) => setBrand(fn), [setBrand]);

  // Nothing is saved, so warn before work is lost
  const dirty = brand !== INITIAL_BRAND;
  useLeaveWarning(dirty, "Your brand isn't saved. If you leave this page you'll lose your colours and type choices. Leave anyway?");

  const index = Math.min(Math.max(stepIndex, 0), brandSteps.length - 1);
  const step = brandSteps[index];

  const go = (i: number) => {
    setStepIndex(i);
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  const tryMagicWord = (input: string) => {
    const ok = checkMagicWord(input);
    if (ok) setUnlocked(true);
    return ok;
  };

  return (
    <>
      <PageIntro title="Develop Your Brand">
        <p>
          Three steps: choose your colours, choose your type, then get a brand sheet to print or download. Nothing is
          saved, so print or download your sheet before you leave.
        </p>
      </PageIntro>

      <div className="container-page py-8">
        {!unlocked ? (
          <BrandGate onMagicWord={tryMagicWord} />
        ) : (
          <>
            <Stepper label="Walkthrough progress" steps={brandSteps} current={index} maxReachable={brandSteps.length - 1} onSelect={go} />
            <GuidelineNote id="choice-and-progress" className="mt-4 max-w-3xl" />

            <section className="fade-in mt-8" key={step.id} aria-labelledby="step-heading">
              <p className="no-print text-sm">
                Step {index + 1} of {brandSteps.length}
              </p>
              <h2 id="step-heading" ref={headingRef} tabIndex={-1} className="mt-1 text-2xl font-bold text-westbridge">
                {step.title}
              </h2>
              <p className="no-print mt-2 max-w-[60ch] text-lg">{step.intro}</p>
              <div className="mt-6">
                {step.id === "colour" && <ColourStep state={brand} update={update} />}
                {step.id === "typography" && <TypographyStep state={brand} update={update} />}
                {step.id === "summary" && (
                  <SummaryStep
                    state={brand}
                    update={update}
                    onReset={() => {
                      setBrand(INITIAL_BRAND);
                      go(0);
                    }}
                  />
                )}
              </div>
            </section>

            <div className="no-print mt-10 flex justify-between gap-4 border-t border-ink/15 pt-6">
              <button type="button" className="btn-secondary" onClick={() => go(index - 1)} disabled={index === 0}>
                Previous step
              </button>
              {index < brandSteps.length - 1 && (
                <button type="button" className="btn-primary" onClick={() => go(index + 1)}>
                  Next: {brandSteps[index + 1].title.toLowerCase()}
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
