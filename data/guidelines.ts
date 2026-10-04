// Quick Reference checklist entries.
// Written from Westbridge University's Digital Content Accessibility
// Guidelines (TLEU-ACC-2019-v2.4, Teaching and Learning Enhancement Unit).
// Each entry covers the section named in `section`, written for staff in plain,
// practical language (what to do and how). Keep the requirements faithful to
// that document; practical how-to steps are welcome.

export type ContentType =
  | "general"
  | "word"
  | "powerpoint"
  | "excel"
  | "pdf"
  | "video"
  | "audio"
  | "assessment"
  | "interactive";

export const CONTENT_TYPE_LABELS: Record<ContentType, string> = {
  general: "All content",
  word: "Word",
  powerpoint: "PowerPoint",
  excel: "Excel",
  pdf: "PDF",
  video: "Video",
  audio: "Audio",
  assessment: "Assessment",
  interactive: "Interactive",
};

export type ToolId = "contrast";

export interface Guideline {
  id: string; // unique kebab-case — used as the React key and checklist tick id
  title: string;
  summary: string;
  detail?: string;
  contentTypes: ContentType[];
  section: string; // section of the source document
  tools?: ToolId[];
}

export const guidelines: Guideline[] = [
  // §1.1 Technical standards
  {
    id: "colour-contrast",
    title: "Colour contrast",
    summary: "Make sure text stands out clearly from its background.",
    detail:
      "Normal text needs a contrast ratio of at least 4.5:1, and large text (18pt, or 14pt bold) at least 3:1. The contrast checker on this site will tell you if your colours pass. This includes slide colour schemes and anything visual in an assessment.",
    contentTypes: ["general", "powerpoint", "assessment"],
    section: "§1.1",
    tools: ["contrast"],
  },
  {
    id: "keyboard-access",
    title: "Keyboard access",
    summary: "Make sure everything works without a mouse.",
    detail:
      "Try it yourself: put the mouse to one side, press Tab to move around and Enter or Space to select. Every link, button and question should be reachable.",
    contentTypes: ["general", "interactive", "assessment"],
    section: "§1.1",
  },
  {
    id: "alt-text",
    title: "Alternative text",
    summary: "Describe images, charts and diagrams for learners who can't see them.",
    detail:
      "In Word, PowerPoint or Excel, right-click the image or chart and choose View Alt Text. Describe what it shows in a sentence or two.",
    contentTypes: ["general", "word", "powerpoint", "excel", "assessment"],
    section: "§1.1",
  },
  {
    id: "document-structure",
    title: "Headings and structure",
    summary: "Use real headings so learners can find their way around.",
    detail:
      "Screen readers use headings to jump between sections. In Word, pick Heading 1, Heading 2 and so on from the Styles box rather than making text bold or bigger.",
    contentTypes: ["general", "word"],
    section: "§1.1",
  },

  // §1.2 Assistive technology
  {
    id: "assistive-technology-testing",
    title: "Try it with assistive technology",
    summary: "Check your materials work with the tools disabled learners use.",
    detail:
      "Try your material with a screen reader such as NVDA (free to download), using only the keyboard, in high contrast mode, and zoomed in. Voice control software such as Dragon is worth testing too. Keep a quick note of what you checked.",
    contentTypes: ["general"],
    section: "§1.2",
  },

  // §2.1 Word
  {
    id: "word-heading-styles",
    title: "Heading styles in Word",
    summary: "Pick headings from the Styles box on the Home tab.",
    detail:
      "Select your heading text and choose Heading 1, Heading 2 and so on. Use them in order and don't skip a level. To check, open View > Navigation Pane: your headings should all appear there.",
    contentTypes: ["word"],
    section: "§2.1",
  },
  {
    id: "reading-order",
    title: "Reading order",
    summary: "Make sure content is read out in the right order.",
    detail:
      "Screen readers read content in the order it's stored, which isn't always the order you see. In PowerPoint, open Home > Arrange > Selection Pane. Items are read from the bottom of the list to the top, so drag them into the right order.",
    contentTypes: ["word", "powerpoint"],
    section: "§2.1",
  },
  {
    id: "link-text",
    title: "Clear link text",
    summary: "Make links say where they go.",
    detail:
      "Instead of ‘click here’, write something like ‘Read the assessment brief’. Many screen reader users skim a list of links, so each one needs to make sense on its own.",
    contentTypes: ["word"],
    section: "§2.1",
  },
  {
    id: "accessibility-checker",
    title: "Accessibility checker",
    summary: "Run the accessibility checker before you share a document.",
    detail:
      "Go to Review > Check Accessibility and work through what it finds. It only takes a minute and catches most common issues, so it's worth making part of your routine.",
    contentTypes: ["word"],
    section: "§2.1",
  },

  // §2.1 PowerPoint
  {
    id: "slide-titles",
    title: "Slide titles",
    summary: "Give every slide its own clear title.",
    detail:
      "Type titles into the title box on each slide rather than adding a separate text box. Make each one different, such as ‘Week 3: Research methods’, so learners can tell slides apart.",
    contentTypes: ["powerpoint"],
    section: "§2.1",
  },
  {
    id: "slide-fonts",
    title: "Slide fonts and sizes",
    summary: "Use a sans-serif font at 18pt or bigger on slides.",
    detail:
      "Sans-serif fonts such as Arial are easier to read on screen. The PowerPoint template from Develop Your Brand sets this up for you.",
    contentTypes: ["powerpoint"],
    section: "§2.1",
  },
  {
    id: "animations",
    title: "Animations and transitions",
    summary: "Keep animations and transitions simple, or leave them out.",
    detail: "They can get in the way of screen readers. If you do use them, make sure each slide still makes sense without them.",
    contentTypes: ["powerpoint"],
    section: "§2.1",
  },

  // §2.1 Excel
  {
    id: "sheet-names",
    title: "Sheet names",
    summary: "Give each worksheet a name that says what's on it.",
    detail: "Right-click the tab at the bottom and choose Rename, for example ‘Marks 2026’ instead of ‘Sheet1’.",
    contentTypes: ["excel"],
    section: "§2.1",
  },
  {
    id: "table-headers",
    title: "Table headers",
    summary: "Turn your data into a table with a header row.",
    detail: "Select your data, press Ctrl+T and tick ‘My table has headers’. Screen readers can then tell learners which column they're in.",
    contentTypes: ["excel"],
    section: "§2.1",
  },
  {
    id: "not-colour-alone",
    title: "Don't rely on colour alone",
    summary: "Don't use colour as the only way to show something.",
    detail: "If red means ‘late’, also add the word ‘Late’ or a symbol. Not everyone can tell colours apart.",
    contentTypes: ["excel"],
    section: "§2.1",
  },
  {
    id: "tab-order",
    title: "Tab order",
    summary: "Make sure forms in spreadsheets move in a sensible order.",
    detail: "If learners fill in cells or form controls, press Tab through them yourself to check they go in a logical order.",
    contentTypes: ["excel"],
    section: "§2.1",
  },
  {
    id: "merged-cells",
    title: "Merged cells",
    summary: "Avoid merging cells.",
    detail:
      "Merged cells confuse screen readers. To centre a title across columns, use Format Cells > Alignment > Center Across Selection instead.",
    contentTypes: ["excel"],
    section: "§2.1",
  },

  // §2.2 PDF, video and audio
  {
    id: "pdf-tagging",
    title: "Accessible PDFs",
    summary: "Make your PDF from an accessible Word or PowerPoint file.",
    detail:
      "Get the original file right first: headings, alt text and reading order. Then choose File > Save As > PDF, open Options and make sure ‘Document structure tags for accessibility’ is ticked. Check the finished PDF with Adobe Acrobat's accessibility check, and keep a note of what you checked.",
    contentTypes: ["pdf"],
    section: "§2.2",
  },
  {
    id: "alternative-formats",
    title: "Other formats on request",
    summary: "Be ready to share another format if a learner asks.",
    detail: "Keep your original Word file so you can quickly provide a Word, web page or large print version.",
    contentTypes: ["pdf", "general"],
    section: "§2.2",
  },
  {
    id: "captions",
    title: "Captions",
    summary: "Caption every video that has speech or important sound.",
    detail:
      "Captions should be accurate (at least 95%), in time with the audio, and say who's speaking when there's more than one person. Automatic captions are a good start but always need checking; professional captioning is recommended.",
    contentTypes: ["video"],
    section: "§2.2",
  },
  {
    id: "audio-description",
    title: "Describing visuals in video",
    summary: "Make sure important visuals are described out loud.",
    detail:
      "If something on screen matters and isn't said, add a spoken description. The easiest way is to describe it as you record, for example ‘as this graph shows, numbers doubled in March’.",
    contentTypes: ["video"],
    section: "§2.2",
  },
  {
    id: "transcripts",
    title: "Transcripts",
    summary: "Provide a transcript for audio recordings.",
    detail:
      "Write down what's said word for word, note who's speaking, and mention any sounds that matter. For long recordings, add timestamps so learners can find their place.",
    contentTypes: ["audio"],
    section: "§2.2",
  },

  // §3.1–3.2 Universal Design for Learning
  {
    id: "udl-representation",
    title: "Share information in more than one way",
    summary: "Give learners more than one way to take in information.",
    detail:
      "Pair text with a diagram, or a recording with a transcript. Add a glossary for technical words, start new topics with a short overview, and share data as a graph, a table and a sentence.",
    contentTypes: ["general"],
    section: "§3.1",
  },
  {
    id: "udl-engagement",
    title: "Keep learners motivated",
    summary: "Make learning relevant, offer choice and keep stress low.",
    detail:
      "Link topics to real situations, offer choices where you can, use discussion and group work, help learners set goals, build up the challenge gradually, and be clear about what you expect.",
    contentTypes: ["general"],
    section: "§3.1",
  },
  {
    id: "udl-action-expression",
    title: "Different ways to show learning",
    summary: "Let learners show what they know in different ways.",
    detail:
      "Where you can, offer a choice such as an essay, a presentation, a poster or a video. Break big tasks into stages with check-in points, and teach planning and referencing skills rather than assuming them.",
    contentTypes: ["general", "assessment"],
    section: "§3.1",
  },
  {
    id: "udl-assessment",
    title: "Flexible assessment",
    summary: "Build choice and flexibility into how learners are assessed.",
    detail:
      "Offer different formats where possible, allow flexible deadlines or more than one chance to submit, and check assessments work with screen readers. Keep a short record of what you've done and look over it regularly.",
    contentTypes: ["assessment"],
    section: "§3.2",
  },

  // §4.1 Digital assessment and interactive content
  {
    id: "accessible-assessment",
    title: "Accessible online assessments",
    summary: "Check online quizzes and tests work for every learner before you publish.",
    detail:
      "Try it using only the keyboard, set up extra time in the system so it applies automatically, add alt text to images, and check your colours with the contrast checker. Keep a quick note of what you tested.",
    contentTypes: ["assessment"],
    section: "§4.1",
  },
  {
    id: "interactive-content",
    title: "Labels and helpful error messages",
    summary: "Label everything clearly and make error messages easy to act on.",
    detail:
      "Every field and button needs a clear label. Keyboard users should always be able to see where they are on the page. When something goes wrong, say what happened and how to fix it.",
    contentTypes: ["interactive"],
    section: "§4.1",
  },
  {
    id: "time-limits",
    title: "Time limits",
    summary: "Avoid time limits where you can, or allow extra time.",
    detail: "Some learners need longer to read, think or respond. Where you can't remove a time limit, make extensions easy to apply.",
    contentTypes: ["interactive", "assessment"],
    section: "§4.1",
  },
];
