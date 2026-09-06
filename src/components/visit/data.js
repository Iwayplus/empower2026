import hero from "../../assets/page-banners/people-in-lhc.JPG";
import handcycle from "../../assets/page-banners/Picture2.jpg";
import mobility_stall from "../../assets/page-banners/exhibition.JPG";
import attendees_arrival from "../../assets/page-banners/Picture1.jpg";
import at_devices from "../../assets/page-banners/at-products.JPG";


export const heroContent = {
  heading: "Visit the EMPOWER 2026 Exhibition",
  tagline: "Assistive technology is for everyone. So is this exhibition.",
  intro:
    "AT Exhibition at EMPOWER 2026 will be a rare three-day opportunity for visitors to directly experience the newest assistive technologies being developed by startups, explore programmes of leading organisations working across various disabilities, and engage with major distributors who bring these solutions to users at scale.",
  freeAdmissionNote:
    "The exhibition is completely free for all visitors. You only need to complete a simple registration so that we can plan better and ensure a smooth, meaningful experience for you.",
  primaryButton: { label: "Visitor Registration", link: "https://forms.gle/GAWGPNz29qPv8egc8" },
  primaryButtonNote:
    "Please note that this registration allows you to visit and experience the exhibition only; it does not provide access to the conference sessions. If you wish to attend the conference, you will need to complete a conference registration.",
  secondaryLink: { label: "Interested in exhibiting?", link: "/exhibit" },
  heroImage: {
    src: hero,
    alt: "A group of students and visitors gathering around an assistive technology demonstration at the EMPOWER exhibition.",
  },
};

export const eventStrip = [
  { label: "DATES", value: "2–4 October 2026" },
  { label: "TIME", value: "10:00 AM–5:00 PM" },
  { label: "VENUE", value: "Lecture Hall Complex, IIT Delhi" },
];

export const welcomeSection = {
  heading: "Everyone Is Welcome",
  paragraphs: [
    "AT exhibition at EMPOWER is a place to see how technology can support access, independence, learning, communication and work.",
    "You may be looking for a solution for yourself, a family member, a student, an employee, a client or your organisation. You may also simply want to explore. You are welcome to visit.",
  ],
  whoCanVisitHeading: "Who Can Visit",
  whoCanVisit: [
    "Persons with disabilities",
    "Families, caregivers and support persons",
    "Students, teachers and special educators",
    "Therapists and rehabilitation professionals",
    "Employers and HR, DEI, CSR and accessibility teams",
    "Government departments, NGOs and disabled persons\u2019 organisations",
    "Researchers, designers, startups and innovators",
    "Institutional buyers and procurement teams",
    "Anyone interested in accessibility and inclusive technology",
  ],
};

export const exploreSection = {
  heading: "What Visitors Can Explore",
  intro: "Meet exhibitors and discover solutions across areas such as:",
  areas: [
    "Mobility and independent living",
    "Communication and alternative communication",
    "Accessible education and learning",
    "Vision and hearing accessibility",
    "Digital accessibility",
    "Inclusive workplaces",
    "Rehabilitation and therapy",
    "Smart tools for daily living",
    "Research and emerging technology",
  ],
};

export const doSection = {
  heading: "What Visitors Can Do",
  items: [
    "See live product demonstrations.",
    "Speak directly with exhibitors and product teams.",
    "Try suitable products after asking the exhibitor.",
    "Compare solutions and ask practical questions.",
    "Buy selected products directly from exhibitor stalls.",
  ],
};

// Photo guide images — synced to the 3 images specified in the finalized content doc
export const photoGuide = [
  { src: handcycle, alt: "A visitor testing an accessible handcycle while exhibitors explain the product." },
  { src: mobility_stall, alt: "Wheelchair users and visitors exploring mobility products at an exhibition stall." },
  { src: attendees_arrival, alt: "A diverse group of attendees arriving together at the EMPOWER venue." },
  { src: at_devices, alt: "A variety of assistive technology devices for visually impaired individuals such as braille slate, white cane and more on display." }
];

export const planYourVisit = {
  heading: "Plan Your Visit",
  text: "Plan enough time to explore the stalls, speak with exhibitors and attend demonstrations that interest you.",
  visitDetailsHeading: "Visit Details",
  visitDetails: [
    "Dates: 2\u20134 October 2026",
    "Exhibition hours: 10:00 AM\u20135:00 PM daily",
    "Venue: Lecture Hall Complex, IIT Delhi, New Delhi",
    "Suggested visit time: keep 2\u20133 hours for the exhibition",
    "Register before visiting",
  ],
  usefulLinksHeading: "Useful Links",
  usefulLinks: [
    { label: "Visitor registration", link: "https://forms.gle/GAWGPNz29qPv8egc8" },
    { label: "Exhibitors at the conference", link: "/exhibit" },
  ],
};

export const accessibilitySection = {
  heading: "Accessibility and Visitor Support",
  paragraphs: [
    "If you have an access requirement or need visitor support, please tell the organizing team before your visit. This will help the team guide you correctly.",
    "If you plan to visit with a support person, include this in your registration.",
  ],
  email: "info@empowerconference.in",
};

export const registrationSection = {
  heading: "Visitor Registration",
  text: "The exhibition is open to everyone. Complete the visitor registration form before your visit.",
  note: "Note: Conference sessions and workshops require separate delegate registration.",
  buttonNote: "Button opens the Google Form in a new tab.",
  button: { label: "Visitor Registration", link: "https://forms.gle/GAWGPNz29qPv8egc8" },
};

export const courtesySection = {
  heading: "Visitor Courtesy",
  items: [
    "Ask before taking photographs or recording people.",
    "Ask the exhibitor before handling or trying a product.",
    "Keep corridors and access paths clear.",
    "Respect different communication and sensory needs.",
    "Children should remain with an accompanying adult.",
  ],
};

export const faqs = [
  {
    q: "Is the exhibition open to the public?",
    a: "Yes. Everyone is welcome to visit the exhibition.",
  },
  {
    q: "Do I need a technical background?",
    a: "No. Exhibitors can explain their products and answer practical questions.",
  },
  {
    q: "How do I register?",
    a: "Complete the visitor registration form using the \u201cVisitor Registration\u201d button on this page.",
  },
  {
    q: "Does visitor entry include conference sessions?",
    a: "Conference sessions and workshops may require separate delegate registration. Please check the programme and registration details before planning your day.",
  },
  {
    q: "Can schools, colleges or organisations visit as a group?",
    a: "Yes. Please contact the organizing team in advance so the team can guide your group.",
  },
  {
    q: "Can I visit with a support person?",
    a: "Yes. Include the support person\u2019s details in the visitor registration process or contact the organizing team for guidance.",
  },
  {
    q: "Can I buy products at the exhibition?",
    a: "Selected exhibitors may sell products from their stalls. Confirm the price, warranty, delivery and payment terms directly with the exhibitor.",
  },
  {
    q: "Whom should I contact about accessibility support?",
    a: "Email info@empowerconference.in or call +91 81688 79994 before your visit.",
  },
];

export const finalCta = {
  visitorMessage: {
    heading: "Ready to visit EMPOWER 2026?",
    text: "Register now and plan your visit to the exhibition at IIT Delhi.",
    button: { label: "Visitor Registration", link: "https://forms.gle/GAWGPNz29qPv8egc8" },
  },
  exhibitorMessage: {
    heading: "Want to exhibit at EMPOWER 2026?",
    button: { label: "View Exhibitor Information", link: "/exhibit" },
  },
};