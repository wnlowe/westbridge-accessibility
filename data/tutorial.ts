// Tutorial lessons shown on /tutorial before Develop Your Brand.
// Lessons 2–8 are drafted from the Digital Content Accessibility Guidelines (TLEU-ACC-2019-v2.4),
// written to match the voice of lessons 1 and 9: warm, plain and practical, speaking to staff about their learners.
// Each paragraph in `body` renders as its own <p>.

/** A "choose all that apply" question. See docs/westbrigeSite/05-building-the-tutorial.md. */
export interface QuizQuestion {
  id: string; // unique within the lesson
  question: string;
  options: string[]; // shown in this order
  correct: number[]; // indexes into options (0 = first) — at least one
  explanation?: string; // shown once answered correctly
  hint?: string; // shown after a wrong attempt
}

export interface TutorialLesson {
  id: string;
  title: string;
  body: string[];
  /** Section of the guidelines this lesson draws on, e.g. "§1.1" */
  sectionRef?: string;
  /** Estimated reading time. If every lesson has one, the total is shown at the start. */
  minutes?: number;
  /** Optional quiz at the end of the lesson. Every question must be answered correctly to move on. */
  quiz?: QuizQuestion[];
}

export const tutorialLessons: TutorialLesson[] = [
  {
    id: "why-accessibility",
    title: "Why accessibility matters",
    body: [
        "At Westbridge University, accessibility is core to supporting out learners and providing them what they need to succeed. By making courses accessible for those who need it, we make it easier for everyone.",
        "By following the guide on this site and the supported tools by the university, a lot of the compatibility and base accessibility requirements are taken care of for you. Should you want to use different tools, please reach out for toolkits to ensure compatibility.",
        "At the end of this process you will have fonts and colors for your course that meet Westbridge University's accessability requirements along with Microsoft Word and Powerpoint Templates to get you started!"
    ],
    sectionRef: "Introduction and Legal Context",
    minutes: 5,
    quiz: [
      {
        id: "why-accessibility",
        question: "What will you have at the end of this process?",
        options: [
          "Fonts and colours for your course that meet Westbridge's accessibility requirements",
          "A qualification in accessibility law",
          "Word and PowerPoint templates to get you started",
        ],
        correct: [0, 2],
        explanation:
          "You'll finish with accessible fonts and colours for your course, plus templates to get you started.",
        hint: "Look back at the last paragraph of this lesson.",
      }
    ]
  },
  {
    id: "using-headings",
    title: "Using Headings in Documents",
    body: [
      "Headings help everyone find their way around a document. They are especially important for learners using screen readers, who use headings to jump straight to the section they need.",
      "In Word, select your heading and pick Heading 1, Heading 2 and so on from the Styles box on the Home tab. Making text bold or bigger might look like a heading, but a screen reader won't recognise it as one.",
      "Use your headings in order, with Heading 1 for main sections and Heading 2 for the parts inside them. A quick way to check: open View > Navigation Pane. If your headings show up there, you're all set!",
    ],
    sectionRef: "§2.1",
    quiz: [
      {
        id: "heading-styles",
        question: "Which of these help learners using screen readers find their way around a Word document?",
        options: [
          "Picking Heading 1 and Heading 2 from the Styles box",
          "Making text bold and bigger so it looks like a heading",
          "Using headings in order, with Heading 1 for main sections",
        ],
        correct: [0, 2],
        explanation: "Screen readers recognise real heading styles used in order. Text that only looks like a heading isn't picked up.",
        hint: "A screen reader can't see what text looks like, only how it's set up.",
      },
    ],
  },
  {
    id: "universal-design-0",
    title: "Universal Design",
    body: [
      "Universal Design for Learning (UDL) is about planning your course for the many different ways our learners learn, right from the start.",
      "Building choice and flexibility into your materials as you create them means fewer changes later on, for you and for your learners.",
      "UDL has three main ideas, which we'll cover over the next few lessons: sharing information in more than one way, keeping learners motivated, and giving learners different ways to show what they know.",
      "You can learn more about UDL at: https://udlguidelines.cast.org/"
    ],
    sectionRef: "§3.1",
    quiz: [
      {
        id: "udl-principles",
        question: "Which of these are the three main ideas of UDL?",
        options: [
          "Sharing information in more than one way",
          "Keeping learners motivated",
          "Giving learners different ways to show what they know",
          "Using the same format for every learner",
        ],
        correct: [0, 1, 2],
        explanation: "UDL is about offering more than one way in: to the information, to staying motivated, and to showing what you've learned.",
        hint: "UDL is about variety, not one approach for everyone.",
      },
    ],
  },
  {
    id: "udl-1",
    title: "Multimodal Design",
    body: [
      "Sharing information in more than one way means every learner can find an approach that works for them. For example, you might pair a written explanation with a diagram, or a recording with a transcript.",
      "Adding a glossary for technical words, and starting new topics with a short overview or concept map, helps learners connect new ideas to what they already know.",
      "Try to keep your language clear and simple, and break bigger ideas into smaller steps. When sharing numbers or data, a graph, a table and a sentence explaining what it means will reach more of your learners than any one of them alone.",
    ],
    sectionRef: "§3.1",
    quiz: [
      {
        id: "representation-examples",
        question: "Which of these share information in more than one way?",
        options: [
          "A glossary for technical words",
          "Putting everything in one long block of text",
          "A concept map at the start of a new topic",
          "Showing data as a graph, a table and a sentence",
        ],
        correct: [0, 2, 3],
        explanation: "Glossaries, concept maps and showing data several ways all help different learners reach the same information.",
        hint: "Look for the options that add another way to understand the content.",
      },
    ],
  },
  {
    id: "udl-2",
    title: "Engaging Design",
    body: [
      "Every learner is motivated by different things, depending on their interests, background and past experiences of education.",
      "Connecting topics to real situations and to learners' own goals makes learning feel worthwhile. Where you can, give learners a choice of topic, tool or route through the material.",
      "Discussion boards and group work let learners support each other, and helping them set goals and track their progress keeps them on course.",
      "Start with easier tasks and build up the challenge over time. Being clear about what you expect, and giving supportive feedback, goes a long way to keeping stress low.",
    ],
    sectionRef: "§3.1",
    quiz: [
      {
        id: "engagement-examples",
        question: "Which of these help keep learners motivated?",
        options: [
          "Connecting topics to real situations and learners' goals",
          "Giving learners a choice of topic or tool where you can",
          "Surprise high-stakes tests",
          "Being clear about what you expect and giving supportive feedback",
        ],
        correct: [0, 1, 3],
        explanation: "Relevance, choice and clear, supportive expectations all help. Surprise high-stakes tests add stress instead.",
        hint: "One option would make learners more stressed, not less.",
      },
    ],
  },
  {
    id: "udl-3",
    title: "Dynamic Assessments",
    body: [
      "Learners show what they know in different ways. Where you can, offer a choice in how an assessment is completed, such as an essay, a presentation, a poster or a video.",
      "It's also worth thinking about how learners will take part. Not everyone uses a mouse or finds typing easy.",
      "Breaking big tasks into stages with check-in points helps learners manage their work. So does teaching skills like planning, time management, research and referencing, rather than assuming learners already have them.",
    ],
    sectionRef: "§3.1",
    quiz: [
      {
        id: "expression-formats",
        question: "Which of these are ways you could let learners show what they know?",
        options: [
          "An essay",
          "A presentation",
          "A timed exam as the only option",
          "A video",
        ],
        correct: [0, 1, 3],
        explanation: "Offering a choice of formats lets each learner show what they know in the way that suits them best.",
        hint: "Look for the options that give learners a choice.",
      },
    ],
  },
  {
    id: "udl-4",
    title: "Quality Assurance",
    body: [
      "Where you can, give learners more than one way to be assessed, such as an exam, a portfolio, a presentation or a project. Flexible deadlines and more than one chance to submit can make a big difference.",
      "Before learners need them, check that your assessments work with tools like screen readers.",
      "Keeping a short record of how you've built these ideas into your course, and looking over your materials regularly, makes it much easier to keep things accessible. If you would like support with any of this, please reach out to the learning hub.",
    ],
    sectionRef: "§3.2",
    quiz: [
      {
        id: "quality-assurance",
        question: "Which of these are good habits for keeping your course accessible?",
        options: [
          "Looking over your materials regularly",
          "Keeping a short record of what you've done",
          "Only reviewing materials after a learner complains",
        ],
        correct: [0, 1],
        explanation: "Regular check-ins and a simple record make it easy to keep your course accessible over time.",
        hint: "Good habits happen before problems, not after.",
      },
    ],
  },
  {
    id: "assessment-accessibility",
    title: "Assessment Accessibility",
    body: [
      "Online quizzes and tests need to work for every learner, including those using screen readers and those who can't use a mouse.",
      "Before you publish, try your assessment using only the keyboard: press Tab to move through it and Enter or Space to answer. If you get stuck, some of your learners will too.",
      "Setting up extra time in the system means learners who need it get it automatically, without having to ask each time.",
      "Remember to add alternative text to images, charts and diagrams, and make sure text stands out clearly from its background. The contrast checker on this site can help with that!",
      "Finally, keep a quick note of what you tested and when.",
    ],
    sectionRef: "§4.1",
    quiz: [
      {
        id: "accessible-quiz",
        question: "Which of these should an online quiz do?",
        options: [
          "Work using only the keyboard",
          "Give extra time automatically to learners who need it",
          "Need a mouse to drag and drop answers",
          "Have alternative text on images",
        ],
        correct: [0, 1, 3],
        explanation: "Keyboard access, automatic extra time and alternative text mean every learner can take the quiz.",
        hint: "One option would shut out learners who can't use a mouse.",
      },
    ],
  },
  {
    id: "custom-digital-assessment",
    title: "Custom Digital Assessment",
    body: [
        "Like mentioned earlier, if you wish to use any digital tools not provided by Westbridge University, please consult with the learning hub or accessibility office about the tools you are selecting.",
        "For more information on what would be required please reference: https://docs.google.com/document/d/16OHcN_S8zVUr14XeP5fxDd8RM4T7XiM9/edit"
    ],
    sectionRef: "§4.1",
    quiz: [
      {
        id: "external-tools",
        question: "You want to use a digital tool that Westbridge doesn't provide. What should you do first?",
        options: [
          "Consult the learning hub or accessibility office about the tool",
          "Use it straight away if students like it",
          "Wait for a student to report an accessibility problem",
        ],
        correct: [0],
        explanation: "Checking with the learning hub or accessibility office first helps make sure the tool meets the accessibility requirements.",
        hint: "Look back at the first paragraph of this lesson.",
      },
    ],
  },
];
