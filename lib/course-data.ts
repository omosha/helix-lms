export interface WeekData {
  semester: number;
  weekNumber: number;
  title: string;
  description: string;
  activities: string[];
  tools: string[];
}

export interface CourseData {
  slug: string;
  title: string;
  description: string;
  year: number;
  totalWeeks: number;
  weeks: WeekData[];
}

export const YEAR1_SEMESTER1_WEEKS: WeekData[] = [
  {
    semester: 1,
    weekNumber: 1,
    title: "Digital Safety & Google Account Basics",
    description:
      "Get started on your digital journey! Learn how to stay safe online and set up your very own Google Account — the key that unlocks all your digital tools.",
    activities: [
      "Talk about what 'online safety' means and why it matters",
      "Create or log into your Google Account with support from your instructor",
      "Practice making a strong password (use 3 random words + a number!)",
      "Explore your Google Account settings together",
      "Save your username and password somewhere safe (like a notebook)",
      "Reflect: Write or say one thing you learned about staying safe online",
    ],
    tools: ["Google Account", "Chrome Browser"],
  },
  {
    semester: 1,
    weekNumber: 2,
    title: "Me in Pictures",
    description:
      "Discover Pinterest — a magical place full of pictures, ideas, and inspiration. This week, you'll build your first board and start collecting images that feel like YOU.",
    activities: [
      "Create your Pinterest account using your Google login",
      "Browse Pinterest and find 10 pictures that you love or that feel like your style",
      "Create a board called 'This is Me' and save your pictures",
      "Share your board with your class — talk about why you chose each image",
      "Find 3 pictures of things you dream about doing someday",
      "Save your board link in your Google Drive folder",
    ],
    tools: ["Pinterest", "Google Drive"],
  },
  {
    semester: 1,
    weekNumber: 3,
    title: "Build My Avatar",
    description:
      "Create a digital version of yourself! An avatar is like a cartoon you — and you get to decide exactly what it looks like.",
    activities: [
      "Visit Avaturn and explore how it works",
      "Customize your avatar: skin tone, hair, eyes, clothes — make it YOU",
      "Take a screenshot of your finished avatar",
      "Save your avatar image to your Google Drive",
      "Write or say 3 words that describe your avatar (and yourself!)",
      "Share your avatar with the class and explain one choice you made",
    ],
    tools: ["Avaturn", "Google Drive", "Google Slides"],
  },
  {
    semester: 1,
    weekNumber: 4,
    title: "My Dream Day Story",
    description:
      "If you could design your perfect day — what would it look like? This week, you'll write your Dream Day Story using Google Docs!",
    activities: [
      "Open Google Docs and create a new document called 'My Dream Day'",
      "Write (or dictate) what your perfect day would look like from morning to night",
      "Add at least 3 details: Where are you? Who is with you? What are you doing?",
      "Use bold text for your favorite part of the day",
      "Read your story out loud to a partner",
      "Save your document and share it with your instructor",
    ],
    tools: ["Google Docs", "Google Drive"],
  },
  {
    semester: 1,
    weekNumber: 5,
    title: "Mood Mapping & Visual Reflection",
    description:
      "Explore your feelings through color and images! This week you'll create a Mood Map — a visual way to show how you feel about different parts of your life.",
    activities: [
      "Open Google Slides and create a new presentation called 'My Mood Map'",
      "Create 4 slides: Home, School/Program, Future, and Me Right Now",
      "On each slide, add colors and images that match how you FEEL about that area",
      "Add one sentence on each slide describing your mood",
      "Present your Mood Map to a partner",
      "Save and share with your instructor",
    ],
    tools: ["Google Slides", "Pinterest"],
  },
  {
    semester: 1,
    weekNumber: 6,
    title: "Vision Board",
    description:
      "A vision board is a powerful picture of your future! This week, you'll create yours using Google Slides — filling it with everything you hope, dream, and want for your life.",
    activities: [
      "Open Google Slides and start a new slide called 'My Vision Board'",
      "Search for images on Pinterest that represent your dreams and goals",
      "Add at least 8 images to your Vision Board slide",
      "Add your name and one big dream written in large, bold text",
      "Arrange everything so it looks like a collage you love",
      "Share your Vision Board with the class — explain one thing you put on it",
    ],
    tools: ["Google Slides", "Pinterest"],
  },
  {
    semester: 1,
    weekNumber: 7,
    title: "Mini Comic Creation",
    description:
      "Everyone has a story to tell — and this week you'll tell yours in comic form! Use Canva to create a 4-panel comic about a day in your life (real or imaginary).",
    activities: [
      "Open Canva and search for 'comic strip' templates",
      "Choose a template you like and add it to your design",
      "Fill in 4 panels: Panel 1 (morning), Panel 2 (something fun), Panel 3 (something hard), Panel 4 (how it ended)",
      "Add your own text to each panel — keep it short and punchy!",
      "Add colors and stickers to make it pop",
      "Download your comic and save it to Google Drive",
    ],
    tools: ["Canva", "Google Drive"],
  },
  {
    semester: 1,
    weekNumber: 8,
    title: "Dream Toolboxes",
    description:
      "Every dream needs tools! This week, you'll organize your Google Drive like a pro — creating folders for all the things you're building toward your future.",
    activities: [
      "Open Google Drive and explore what's already there",
      "Create these folders: 'Year 1 Portfolio', 'My Artwork', 'My Stories', 'My Ideas'",
      "Move all your work from previous weeks into the right folders",
      "Create a 'Dream Toolbox' Google Doc that lists 5 tools you want to learn this year",
      "Share your Google Drive with your instructor",
      "Practice finding any file in under 30 seconds",
    ],
    tools: ["Google Drive", "Google Docs"],
  },
  {
    semester: 1,
    weekNumber: 9,
    title: "Pinterest Vision Expansion",
    description:
      "Time to level up your Pinterest board! This week, you'll go deeper into your interests and discover new ones you didn't know about.",
    activities: [
      "Log into Pinterest and open your 'This is Me' board",
      "Create 2 new boards: 'Skills I Want to Learn' and 'Places I Want to Go'",
      "Add at least 8 pins to each new board",
      "Find 3 accounts on Pinterest that post about things you love — follow them",
      "Write a short description for each of your boards",
      "Share your newest discoveries with the class",
    ],
    tools: ["Pinterest"],
  },
  {
    semester: 1,
    weekNumber: 10,
    title: "Avatar Identity Refinement",
    description:
      "Your avatar grows as you grow! Go back to Avaturn and level up your digital self — this time with more detail and more intention about who you are becoming.",
    activities: [
      "Open Avaturn and load your original avatar",
      "Update your avatar to reflect who you are NOW — not just who you were in Week 3",
      "Write 5 words that describe the 'you' your avatar represents",
      "Take a new screenshot of your updated avatar",
      "Create a Google Slides slide: Old Avatar vs. New Avatar + what changed",
      "Add this slide to your Year 1 Portfolio folder",
    ],
    tools: ["Avaturn", "Google Slides", "Google Drive"],
  },
  {
    semester: 1,
    weekNumber: 11,
    title: "AI + Me",
    description:
      "Meet your new creative partner: AI! This week, you'll explore ChatGPT and learn how to have a real conversation with AI — asking it questions, getting ideas, and co-writing something cool.",
    activities: [
      "Visit ChatGPT and create an account (or log in with Google)",
      "Ask ChatGPT to help you write 3 ideas for your dream job",
      "Ask ChatGPT: 'What digital skills should I learn for [your dream job]?'",
      "Co-write a short paragraph about your future with ChatGPT's help",
      "Copy your favorite AI-assisted paragraph into a Google Doc",
      "Discuss: What was it like working with AI? What did it get right? Wrong?",
    ],
    tools: ["ChatGPT", "Google Docs"],
  },
  {
    semester: 1,
    weekNumber: 12,
    title: "Future World Builder (Capstone)",
    description:
      "This is YOUR moment! Pull together everything you've created this semester into one amazing capstone project — your first digital portfolio presentation. Show the world your Future World!",
    activities: [
      "Open Google Slides and create a new presentation: '[Your Name]'s Future World'",
      "Slide 1: Your Avatar + 5 words that describe you",
      "Slide 2: Your Dream Day (from Week 4)",
      "Slide 3: Your Vision Board highlights (top 3 images + captions)",
      "Slide 4: Your Mini Comic (or a panel from it)",
      "Slide 5: What you've learned this semester + one big goal for next semester",
      "Present your Future World to the class — minimum 3 minutes",
      "Celebrate! You completed Semester 1 of the Digital Pathways Program!",
    ],
    tools: ["Google Slides", "Google Drive", "Canva", "Pinterest", "Avaturn", "ChatGPT"],
  },
];

const SEMESTER2_PLACEHOLDER: WeekData[] = Array.from({ length: 12 }, (_, i) => ({
  semester: 2,
  weekNumber: i + 1,
  title: `Week ${i + 1}: Build What You Imagine`,
  description:
    "Semester 2 content is being developed. This semester shifts from imagination to production — you'll learn Google Docs formatting, Slides presentations, Canva basics, intro video editing, and AI as a workflow assistant.",
  activities: ["Content coming soon — check back next semester!"],
  tools: ["Google Docs", "Canva", "Google Slides"],
}));

const YEAR2_PLACEHOLDER: WeekData[] = [
  ...Array.from({ length: 12 }, (_, i) => ({
    semester: 3,
    weekNumber: i + 1,
    title: `Week ${i + 1}: Make It Real`,
    description:
      "Year 2, Semester 3 focuses on Applied Skill Building. Students begin selecting pathway clusters: Creative Media, Tech Support, Entrepreneurial, Digital Office Support, Content Creation, or Story & Game Design.",
    activities: ["Content coming soon."],
    tools: ["Google Workspace", "Canva"],
  })),
  ...Array.from({ length: 12 }, (_, i) => ({
    semester: 4,
    weekNumber: i + 1,
    title: `Week ${i + 1}: Collaborate & Present`,
    description:
      "Year 2, Semester 4 focuses on team projects, peer feedback, revision cycles, and deadline management. Students build a structured digital portfolio folder.",
    activities: ["Content coming soon."],
    tools: ["Google Workspace", "Canva"],
  })),
];

const YEAR3_PLACEHOLDER: WeekData[] = [
  ...Array.from({ length: 12 }, (_, i) => ({
    semester: 5,
    weekNumber: i + 1,
    title: `Week ${i + 1}: Practice the Real World`,
    description:
      "Year 3, Semester 5 focuses on Workforce Simulation. Students choose a focus track: Workforce Path (resume, mock interviews, role simulations) or Entrepreneur Path (micro-business planning, branding, market research).",
    activities: ["Content coming soon."],
    tools: ["Google Docs", "Canva", "ChatGPT"],
  })),
  ...Array.from({ length: 12 }, (_, i) => ({
    semester: 6,
    weekNumber: i + 1,
    title: `Week ${i + 1}: Professional Identity`,
    description:
      "Year 3, Semester 6 — Students produce: Resume OR Business Plan, Professional slide deck, and Capstone applied project.",
    activities: ["Content coming soon."],
    tools: ["Google Docs", "Canva", "ChatGPT"],
  })),
];

const YEAR4_PLACEHOLDER: WeekData[] = [
  ...Array.from({ length: 12 }, (_, i) => ({
    semester: 7,
    weekNumber: i + 1,
    title: `Week ${i + 1}: Prepare to Launch`,
    description:
      "Year 4, Semester 7 — Final portfolio, resume + cover letter, interview practice, and transition planning.",
    activities: ["Content coming soon."],
    tools: ["Google Docs", "Canva", "LinkedIn"],
  })),
  ...Array.from({ length: 12 }, (_, i) => ({
    semester: 8,
    weekNumber: i + 1,
    title: `Week ${i + 1}: Step Into Your Path`,
    description:
      "Year 4, Semester 8 — Public presentation, graduation, and launch into the next phase of your pathway.",
    activities: ["Content coming soon."],
    tools: ["Google Slides", "Portfolio"],
  })),
];

export const DIGITAL_PATHWAYS_COURSE: CourseData = {
  slug: "digital-pathways",
  title: "Digital Pathways Program",
  description:
    "A 4-year workforce and entrepreneurial readiness track built on 12-week modular semesters. Move through Vision → Skill → Practice → Portfolio → Pathway. Build digital literacy, creative confidence, and personal identity clarity — and graduate ready for the future you've imagined.",
  year: 1,
  totalWeeks: 96, // 4 years × 2 semesters × 12 weeks
  weeks: [
    ...YEAR1_SEMESTER1_WEEKS,
    ...SEMESTER2_PLACEHOLDER,
    ...YEAR2_PLACEHOLDER,
    ...YEAR3_PLACEHOLDER,
    ...YEAR4_PLACEHOLDER,
  ],
};

export const ALL_COURSES: CourseData[] = [DIGITAL_PATHWAYS_COURSE];

export const SEMESTER_NAMES: Record<number, string> = {
  1: "Envisioning Your Future",
  2: "Build What You Imagine",
  3: "Make It Real",
  4: "Collaborate & Present",
  5: "Practice the Real World",
  6: "Professional Identity",
  7: "Prepare to Launch",
  8: "Step Into Your Path",
};

export const YEAR_THEMES: Record<number, string> = {
  1: "Discovery & Digital Foundations",
  2: "Applied Skill Building",
  3: "Workforce Simulation & Entrepreneurial Pathways",
  4: "Transition & Launch",
};
