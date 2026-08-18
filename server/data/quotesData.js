export const africanQuotes = [
  {
    id: "q-1",
    text: "The future of Africa is not in aid. It is in trade, investment, and the ingenuity of its people.",
    author: "Aliko Dangote",
    role: "President & CEO, Dangote Group",
    country: "Nigeria",
    category: "Trade & Growth"
  },
  {
    id: "q-2",
    text: "To build a successful business, you must start small and dream big.",
    author: "Aliko Dangote",
    role: "President & CEO, Dangote Group",
    country: "Nigeria",
    category: "Entrepreneurship"
  },
  {
    id: "q-3",
    text: "The future we all want for ourselves is one of our own making.",
    author: "Tony O. Elumelu",
    role: "Chairman, Heirs Holdings & Founder, TEF",
    country: "Nigeria",
    category: "Africapitalism"
  },
  {
    id: "q-4",
    text: "A vision on its own is not enough. Hard work is required.",
    author: "Strive Masiyiwa",
    role: "Founder & Executive Chairman, Econet Global",
    country: "Zimbabwe",
    category: "Vision & Execution"
  },
  {
    id: "q-5",
    text: "Don't be transactional. Be genuine — trust will grow.",
    author: "Strive Masiyiwa",
    role: "Founder & Executive Chairman, Econet Global",
    country: "Zimbabwe",
    category: "Leadership"
  },
  {
    id: "q-6",
    text: "Aim very high. Work very hard. Care very deeply.",
    author: "Odunayo Eweniyi",
    role: "Co-Founder & COO, PiggyVest",
    country: "Nigeria",
    category: "Fintech & Innovation"
  },
  {
    id: "q-7",
    text: "Constraints allow you to be innovative.",
    author: "Michael Jordaan",
    role: "Former CEO FNB & Founder, Montegray Capital",
    country: "South Africa",
    category: "Innovation"
  },
  {
    id: "q-8",
    text: "Businesses spoilt with capital make wrong decisions.",
    author: "Michael Jordaan",
    role: "Venture Capitalist & Former CEO FNB",
    country: "South Africa",
    category: "Capital Discipline"
  },
  {
    id: "q-9",
    text: "What are you fixing? What are you making? Who are you helping?",
    author: "Juliana Rotich",
    role: "Co-founder, Ushahidi & BRCK",
    country: "Kenya",
    category: "Tech for Good"
  },
  {
    id: "q-10",
    text: "Success depends on employees. Empower your team and they will empower the business.",
    author: "Divine Ndhlukula",
    role: "Founder & MD, SECURICO",
    country: "Zimbabwe",
    category: "Team & Culture"
  },
  {
    id: "q-11",
    text: "If you know how to operate in Africa, there are unbelievable opportunities.",
    author: "Nicky Oppenheimer",
    role: "Businessman & Philanthropist",
    country: "South Africa",
    category: "Opportunity"
  },
  {
    id: "q-12",
    text: "Have a vision and passion. Be courageous, focused and disciplined.",
    author: "Monica Musonda",
    role: "Founder & CEO, Java Foods",
    country: "Zambia",
    category: "Agribusiness"
  },
  {
    id: "q-13",
    text: "The harder you work, the luckier you get.",
    author: "Mike Adenuga",
    role: "Founder, Globacom & Conoil",
    country: "Nigeria",
    category: "Resilience"
  },
  {
    id: "q-14",
    text: "Done is better than perfect. Whatever you have in your hands, get going with it.",
    author: "Charles Igwe",
    role: "Nollywood Producer & Media Executive",
    country: "Nigeria",
    category: "Action"
  },
  {
    id: "q-15",
    text: "True success is about a passion to create a better world.",
    author: "Dr. Ola Orekunrin Brown",
    role: "Founder, Flying Doctors Healthcare Investment",
    country: "Nigeria",
    category: "Healthcare & Impact"
  },
  {
    id: "q-16",
    text: "Failure is an opportunity to learn and to do better next time.",
    author: "Khanyi Dhlomo",
    role: "Media Mogul & Entrepreneur",
    country: "South Africa",
    category: "Growth"
  },
  {
    id: "q-17",
    text: "Our problem in Africa is not skills but opportunities.",
    author: "Adewale Yusuf",
    role: "CEO & Founder, AltSchool Africa",
    country: "Nigeria",
    category: "Education & Skills"
  },
  {
    id: "q-18",
    text: "In Africa there is space for innovation.",
    author: "Sizwe Nzima",
    role: "Founder, Icy Hub & Courier Pioneer",
    country: "South Africa",
    category: "Logistics"
  },
  {
    id: "q-19",
    text: "Your dream must be profitable.",
    author: "Olivier Madiba",
    role: "Founder, Kiro'o Games",
    country: "Cameroon",
    category: "Creative Economy"
  },
  {
    id: "q-20",
    text: "With what you have, what can you do to achieve your goal?",
    author: "Heshan de Silva",
    role: "Venture Capitalist & Entrepreneur",
    country: "Kenya",
    category: "Strategy"
  }
];

export function getQuoteOfDay() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const dayOfYear = Math.floor((now - start) / 86400000);
  const idx = dayOfYear % africanQuotes.length;
  return africanQuotes[idx];
}
