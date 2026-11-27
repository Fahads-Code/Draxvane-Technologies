export type Project = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  overview: string;
  contributions: string[];
  tags: string[];
  image: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    slug: "precog-safety",
    title: "Precog Safety",
    category: "Web platform & AI",
    summary:
      "A UK health, safety, environment and wellbeing consultancy with a live AI Safety Suite for risk, RAMS, document review and safety planning.",
    overview:
      "Precog Safety is a UK consultancy supporting high-hazard industries with HSE advice, training, certification and wellbeing support. The site had to make a broad consulting offer easy to understand while giving the AI Safety Suite a clear place to live. We shaped the content structure around services, industries and insights, then built a responsive site that puts the four AI tools within reach of every visitor.",
    contributions: [
      "Site structure for the consultancy services, expertise areas and training",
      "AI Safety Suite pages: consultant, risk & RAMS, document review and safety plans",
      "Service, industry and insight content templates",
      "Responsive build with a UK-focused content layout",
    ],
    tags: ["Consultancy", "AI tools", "Website"],
    image: "/images/projects/real/precog-safety.webp",
    imageAlt: "Construction workers at an industrial site for Precog Safety",
  },
  {
    slug: "luxury-stay-hms",
    title: "Luxury Stay hotel management system",
    category: "Custom software",
    summary:
      "One platform for the whole property: rooms, reservations, guests, housekeeping, staff tasks, billing and reporting.",
    overview:
      "Running a hotel means keeping track of rooms, guests, bookings, housekeeping and money at the same time, often across separate tools. We built a single system that brings those parts together, so the team can see what is happening across the property and manage daily operations from one place.",
    contributions: [
      "Reservation, room availability and guest record management",
      "Check-in, check-out and housekeeping workflows",
      "Staff task assignment and daily operations view",
      "Billing, payments and operational reporting",
    ],
    tags: ["Hotel software", "Operations", "Dashboard"],
    image: "/images/projects/real/luxury-stay.webp",
    imageAlt: "Luxury hotel pool and terrace",
  },
  {
    slug: "munshi-ai",
    title: "Munshi AI",
    category: "AI & automation",
    summary:
      "A voice-first shop app: speak a sale, keep the whole register in order, and send the bill to the customer automatically.",
    overview:
      "Shopkeepers usually spend their day writing entries into a register and making bills by hand. Munshi AI replaces that with one app: the shopkeeper speaks an entry, the app records the sale, keeps the account and stock straight, generates the bill, and sends it straight to the customer's number. No manual register, no separate billing work.",
    contributions: [
      "Voice-based sales and expense entry",
      "Digital shop register with stock and account tracking",
      "Automatic bill generation from each sale",
      "Bill delivery to the customer's number",
    ],
    tags: ["AI", "Voice entry", "Billing"],
    image: "/images/projects/real/munshi-ai.webp",
    imageAlt: "Retail shop shelves with products on display",
  },
  {
    slug: "ride-booking",
    title: "Ride booking app",
    category: "Mobile app",
    summary:
      "A ride booking app that lets customers request a ride, see the fare, and follow the trip from pickup to drop-off.",
    overview:
      "Getting a ride often means switching between calls, messages and cash. This app puts booking, driver assignment and trip tracking in one place, so the customer knows who is coming and the driver knows where to go.",
    contributions: [
      "Customer flow for pickup, drop-off and ride requests",
      "Fare estimate and trip details before confirmation",
      "Live ride status from acceptance to drop-off",
      "Driver-side trip view and booking history",
    ],
    tags: ["Mobile app", "Booking", "Maps"],
    image: "/images/projects/real/ride-booking.webp",
    imageAlt: "Car on a city road for the ride booking app",
  },
  {
    slug: "ai-interview-report-generator",
    title: "AI Interview Report Generator",
    category: "AI tool",
    summary:
      "Turns interview notes and transcripts into a structured report that is ready to review and share.",
    overview:
      "Writing up interviews takes time, especially when the same points have to be pulled into a report every time. This tool takes the notes from an interview and shapes them into a consistent report, with the main findings, quotes and follow-ups in one document.",
    contributions: [
      "Upload or paste interview notes and transcripts",
      "Generate a report with key points and follow-ups",
      "Review and edit the report before sharing",
      "Export a ready-to-send summary",
    ],
    tags: ["AI", "Reports", "Web app"],
    image: "/images/projects/real/interview-report.webp",
    imageAlt: "Team in an interview meeting around a table",
  },
  {
    slug: "careerpath",
    title: "CareerPath",
    category: "Career planning",
    summary:
      "A simple way to map the skills you have, choose a direction, and see what to work on next.",
    overview:
      "Career advice is usually too general to act on. CareerPath helps people look at the skills they already have, pick a role they are aiming for, and break the gap between the two into clear next steps.",
    contributions: [
      "Profile of current skills and experience",
      "Role targets with the skills they need",
      "Skill gap view with suggested learning steps",
      "Saved plan that can be updated over time",
    ],
    tags: ["Web app", "Career", "Planning"],
    image: "/images/projects/real/careerpath-v2.webp",
    imageAlt: "Career planning notes and a laptop on a desk for CareerPath",
  },
  {
    slug: "sustainable-living-app",
    title: "Sustainable Living App",
    category: "Mobile app",
    summary:
      "Tracks everyday habits and shows the small changes that add up over time.",
    overview:
      "Sustainable living can feel like a lot of rules. This app keeps it practical: log the choices you already make, see the ones you can improve, and build better habits slowly instead of trying to track everything.",
    contributions: [
      "Daily logging for everyday activities",
      "Simple progress view across weeks and months",
      "Practical tips linked to the habits being tracked",
      "Weekly summary of the changes made",
    ],
    tags: ["Mobile app", "Habits", "Sustainability"],
    image: "/images/projects/real/sustainable-living.webp",
    imageAlt: "Green forest light for the Sustainable Living App",
  },
];
