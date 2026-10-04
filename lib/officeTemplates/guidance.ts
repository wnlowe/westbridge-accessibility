// Guidance text written into each template. Each line paraphrases the
// matching paragraph of the Digital Content Accessibility Guidelines,
// §2.1 Microsoft Office Accessibility Compliance (TLEU-ACC-2019-v2.4).
// Edit here if the guidelines change — keep it to what the document says.

export const GUIDANCE_SOURCE =
  "Based on Westbridge University's Digital Content Accessibility Guidelines, §2.1 (TLEU-ACC-2019-v2.4).";

export const POWERPOINT_GUIDANCE = [
  "Give every slide a unique, descriptive title, using the title placeholder.",
  "Add alternative text to images, charts and other visuals.",
  "Check the reading order of each slide in the Selection Pane.",
  "Keep to this template's colours: they meet the minimum contrast ratio.",
  "Use sans-serif fonts at 18pt or larger.",
  "Use animations and transitions with care so they don't get in the way of assistive technology.",
];

export const WORD_GUIDANCE = [
  "Use the built-in heading styles (Heading 1, Heading 2 and so on) to structure your document.",
  "Add alternative text to images, charts and other visuals.",
  "Keep a logical reading order, with content in sequence.",
  "Write descriptive link text instead of generic phrases like ‘click here’.",
  "Run the Accessibility Checker (Review > Check Accessibility) before you finish.",
];

export const EXCEL_GUIDANCE = [
  "Give every sheet a descriptive name (right-click the tab, then Rename).",
  "Identify table headers: keep data in an Excel table with a header row, like the Data sheet.",
  "Use cell formatting and text to show meaning, not colour alone.",
  "Add alternative text to charts and other visuals.",
  "Keep a logical tab order for any form fields or interactive content.",
  "Avoid merged cells: they get in the way of screen reader navigation.",
];
