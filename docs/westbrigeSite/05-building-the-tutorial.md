# 05 — Building the tutorial

The tutorial is driven entirely by one data file: **`data/tutorial.ts`**. You don't need to touch any page or component code to write lessons.

## 1. Run the site locally
```bash
cd C:\Users\willi\Documents\_Code\westbridge-accessibility
npm run dev
```
Open http://localhost:3000/tutorial/. Edits to `data/tutorial.ts` appear as soon as you save.

## 2. Edit a lesson
Each lesson is one object in the `tutorialLessons` array:

```ts
{
  id: "colour-contrast",       // unique, kebab-case; not shown to users
  title: "Colour and contrast",  // lesson heading + stepper label
  sectionRef: "§1.1",          // optional — shown as "Lesson 1 of 4. Based on guidelines §1.1" above the title
  minutes: 3,                  // optional — if every lesson has one, the total is shown at the start
  body: [
    "First paragraph.",
    "Second paragraph.",
  ],                           // each string becomes one paragraph
},
```

- **Order** — lessons appear in array order. Drag objects up/down to reorder.
- **Add a lesson** — copy an existing object, give it a new `id`.
- **Remove a lesson** — delete its object.
- **Completion screen** — added automatically after the last lesson; it shows the magic word (`MAGIC_WORD` in `lib/siteConfig.ts`). Its text lives in `app/tutorial/TutorialClient.tsx`.

## 3. Add a quiz (optional)
Any lesson can end with a short "choose all that apply" quiz. Add a `quiz` array to the lesson:

```ts
{
  id: "colour-contrast",
  title: "Colour and contrast",
  body: ["…"],
  quiz: [
    {
      id: "pairs-that-pass",     // unique within this lesson
      question: "Which of these colour pairings meet 4.5:1 for normal text?",
      options: [
        "Navy #104862 on white",   // 0
        "Amber #FEC024 on white",  // 1
        "Ink #14202B on light grey", // 2
      ],
      correct: [0, 2],           // positions of the right options, counting from 0
      explanation: "Shown once answered correctly. Say why the answer is right.",
      hint: "Shown after a wrong attempt. Point them back to the lesson without giving the answer.",
    },
  ],
},
```

How it behaves:
- The quiz appears under the lesson text with the heading "Check your understanding".
- **Next lesson / Finish tutorial stays unavailable until every question is answered correctly.** The button says why, and screen readers announce the reason.
- An answer is correct only if the learner ticks **exactly** the options in `correct`, no more and no fewer.
- A wrong answer says how many correct options were chosen and how many don't apply, without revealing which ones. It then shows the `hint`. Retries are unlimited and there's no timer.
- Once passed, a lesson stays passed while the learner is on the page, so going back doesn't lock it again. Reloading the page starts over (nothing is saved).
- `options` are shown in the order you write them. Count from **0** when filling in `correct`.

Writing good questions:
- 3–5 options per question, with at least one correct.
- 1–3 questions per lesson keeps it quick.
- Every question must be answerable from that lesson's own text alone. Test what the lesson taught, in its words: no legislation or background knowledge the lesson doesn't cover. Avoid trick wording and "all of the above".
- Always write an `explanation`; it's where the learning sticks.

Every lesson in `data/tutorial.ts` now has a quiz drawn from its section of the guidelines. Edit or delete them as you like.

## 4. Writing tips
- Write like lessons 1 and 9: warm, plain English, speaking to staff about "your learners" and "your course".
- Make it practical: say what to do and where (e.g. "pick Heading 1 from the Styles box on the Home tab"), not what the document requires.
- Avoid jargon and phrases like "the guidelines ask…"; `sectionRef` already links the lesson to the document.
- Keep each lesson short — one idea per lesson; the stepper shows every title, so keep titles to a few words.
- Use `sectionRef` to point back to the source guidelines (TLEU-ACC-2019-v2.4) so staff can follow up.
- Plain text only for now — quotes and apostrophes are fine inside the `"..."` strings, but a straight double quote inside must be escaped as `\"` (or use curly quotes “ ”).

## 5. Check your work
```bash
npm run build
```
A TypeScript error here usually means a missing comma, bracket or quote in `data/tutorial.ts` — the message gives the line number.

## Current limits of the lesson format
Lesson text supports **paragraphs only**, plus the optional quiz above. There is currently no support for headings within a lesson, bullet lists, images, video embeds, links, or other question types (single choice, free text). If you need any of these, the lesson type (`TutorialLesson` in `data/tutorial.ts`) and its renderer (`app/tutorial/TutorialClient.tsx`) need extending first.
