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
    image: "/images/projects/precog-safety.webp",
    imageAlt: "Industrial facility at dusk for Precog Safety",
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
    image: "/images/projects/luxury-stay.webp",
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
    image: "/images/projects/munshi-ai.webp",
    imageAlt: "Retail shop interior with products on display",
  },
];
