// src/lib/data.ts

export interface Project {
  title: string;
  desc: string;
  tags: string[];
  image: string;
  repo?: string;
}

export interface Workshop {
  title: string;
  organisation: string;
  date: string;
  desc: string;
  images: string[];
}

export interface Achievement {
  award: string;
  title: string;
  organisation: string;
  date: string;
  desc: string;
  certImage?: string;
  link?: string;
  linkLabel?: string;
  stat?: { value: string; label: string };
}

export interface Skill {
  name: string;
  logo?: string;
  glyph?: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  date: string;
  current?: boolean;
  tasks: string[];
  tools: string[];
  images?: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
  credentialId?: string;
  url?: string; // paste the "Show credential" link here to show a Verify button
}

export const USER_INFO = {
  name: "MAHA VAARSHINIE ARUPATHA RAJOO",
  title: "Junior Engineer — Data Analytics & Visualizations",
  company: "AT&S",
  about:
    "Junior Engineer at AT&S specialising in data analytics and BI development for the semiconductor and manufacturing industry, turning large-scale production data from MES and QIS into Power BI dashboards for OEE, yield, WIP and operational KPIs. Backed by a Computer Science (Data Science) degree from Multimedia University, with expertise in deep learning, computer vision, NLP and agentic AI using MCP. Presented award-winning digital media forensics research at the Digital Futures International Congress (DIFCON) 2026, earning a Silver Medal at iNVENTX and a Top 5 finish for the MMU Best Project Award. Experienced in deploying full-stack applications and hosting hands-on Power BI workshops for students.",
  email: "mahavaarshinie17@gmail.com",
  whatsapp: "60164504068",
  linkedin: "https://www.linkedin.com/in/maha-vaarshinie-arupatha-rajoo-068205238/",
  github: "https://github.com/mahavaarshinie",
};

// Cycles in the hero: "I turn production data into ___"
export const ROTATING_WORDS = ["Power BI dashboards", "OEE insights", "automated reports", "ML models", "business decisions"];

export const HERO_STATS: { value: number; decimals?: number; prefix?: string; suffix?: string; label: string }[] = [
  { value: 98.05, decimals: 2, suffix: "%", label: "Deepfake model accuracy" },
  { value: 5, prefix: "Top ", label: "of 279 final-year projects" },
  { value: 5, label: "Professional certifications" },
  { value: 2, suffix: "x", label: "International hackathons" },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Analytics & BI",
    skills: [
      { name: "Power BI", logo: "https://cdn.jsdelivr.net/gh/microsoft/PowerBI-Icons@main/SVG/Power-BI.svg" },
      { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Power Automate", glyph: "⚡" },
      { name: "Excel VBA", glyph: "▤" },
      { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
      { name: "Tableau", glyph: "▦" },
      { name: "D3.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg" },
    ],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
      { name: "Scikit-learn", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
      { name: "Computer Vision", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
      { name: "NLP", glyph: "¶" },
      { name: "Agentic AI", glyph: "✦" },
      { name: "MCP", logo: "https://cdn.simpleicons.org/modelcontextprotocol/white", glyph: "⬡" },
      { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/white", glyph: "∞" },
      { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface", glyph: "◈" },
    ],
  },
  {
    title: "Engineering & Cloud",
    skills: [
      { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
      { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
      { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "n8n", logo: "https://cdn.simpleicons.org/n8n", glyph: "⬢" },
      { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
      { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    ],
  },
];

export const EDUCATION = [
  { institution: "Multimedia University (MMU)", degree: "Bachelor of Computer Science (Hons) — Data Science", cgpa: "3.59", date: "2023 – 2026", location: "Cyberjaya, Malaysia" },
  { institution: "Multimedia University (MMU)", degree: "Foundation in Information Technology", cgpa: "3.52", date: "2022 – 2023", location: "Cyberjaya, Malaysia" },
];

export const EXPERIENCE: Experience[] = [
  {
    role: "Junior Engineer — Data Analytics & Visualizations",
    company: "AT&S Austria Technologie & Systemtechnik (Malaysia)",
    location: "Kulim, Kedah · Operations",
    date: "2026 – Present",
    current: true,
    tasks: [
      "Develop and maintain plant-wide Power BI dashboards — OEE, output, yield, WIP and operational KPIs for AT&S Kulim",
      "Integrate data from MES, QIS and other IT systems using SQL and Python",
      "Automate reporting and data workflows with Microsoft Power Automate",
      "Ensure data accuracy, security and performance optimisation across reports",
      "Partner with Operations, Engineering, Planning and Quality to turn requirements into dashboards",
      "Train end-users and document solutions from concept through retirement",
    ],
    tools: ["Power BI", "DAX", "SQL", "Python", "Power Automate", "MES / QIS"],
  },
  {
    role: "IT Intern — Operations",
    company: "AT&S Austria Technologie & Systemtechnik (Malaysia)",
    location: "Kulim, Kedah · Operations",
    date: "Jul 2025 – Oct 2025",
    tasks: [
      "Built production-ready Power BI dashboards (DAX & Power Query M) for operations and management KPIs",
      "Integrated MES and QIS data sources and queried SQL databases for analysis and reporting",
      "Automated Excel reporting workflows and built reusable templates with VBA",
      "Worked with Operations and Engineering teams to gather requirements and refine reports",
    ],
    tools: ["Power BI", "DAX", "Power Query M", "SQL", "Excel VBA"],
    images: ["/intern-2.jpg", "/intern-1.jpg", "/intern-3.jpg"],
  },
];

export const COCURRICULAR = [
  { role: "Flood Cleanup Volunteer", organisation: "MMU Superheroes", category: "Social Services", date: null, images: ["/scc-3.jpg"] },
  { role: "Member, Business Operation Division", organisation: "Students' College Committee (MMU)", category: "Student Committee", date: "Jul 2023 – Dec 2023", images: ["/scc-2.jpg"] },
  { role: "Assistant Head, Residents' Welfare Division", organisation: "Students' College Committee (MMU)", category: "Student Committee", date: "Jan 2024 – Dec 2024", images: ["/scc-1.jpg"] },
];

export const PROJECTS: Project[] = [
  {
    title: "Deepfake Detection Framework",
    desc: "Dual-Stream Hybrid CNN combining Xception and ResNet50 features to flag manipulated media with 98.05% accuracy.",
    tags: ["Computer Vision", "Deep Learning", "98.05% Acc"],
    image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=1000",
    repo: "https://github.com/mahavaarshinie/Deepfake-Detection",
  },
  {
    title: "SmartStock AI",
    desc: "Decision support system for SME inventory optimisation using AI-driven demand forecasting.",
    tags: ["FastAPI", "React", "Forecasting"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000",
    repo: "https://github.com/mahavaarshinie/SmartStock-AI",
  },
  {
    title: "The Inclusive Citizen",
    desc: "Multilingual NLP app for ASEAN dialects built on SEA-LION, making public services more accessible.",
    tags: ["NLP", "SEA-LION", "FastAPI"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
    repo: "https://github.com/mahavaarshinie/The-Inclusive-Citizen-Multilingual-AI-for-Public-Services",
  },
  {
    title: "Any-Object Any-Time Vision",
    desc: "In-browser industrial defect detection via on-the-fly deep spatial feature tracking.",
    tags: ["Next.js", "ONNX Runtime", "Computer Vision"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    repo: "https://github.com/mahavaarshinie/ANY-OBJECT-ANY-TIME-VISION-APP",
  },
];

export const WORKSHOP: Workshop[] = [
  {
    title: "Power BI Workshop: Knowledge Sharing",
    organisation: "DATAi Community, Multimedia University",
    date: "2026",
    desc: "Led a hands-on session guiding students through data visualisation best practices, DAX calculations and interactive dashboard design.",
    images: ["/workshop-1.jpg", "/workshop-2.jpg", "/workshop-3.jpg"],
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    award: "Silver Medal",
    title: "iNVENTX Invention Competition 2026",
    organisation: "Multimedia University, Cyberjaya",
    date: "July 2026",
    desc: "Recognised for \"Leveraging Machine Learning Architectures for the Robust Identification of Deepfake Content\", a Dual-Stream Hybrid CNN fusing Xception's micro-textural analysis with ResNet50's macro-structural mapping, reaching 98.05% accuracy and a 98.83% F1-score on FaceForensics++.",
    link: "https://inventx.mmu.edu.my/booth.html?#A133",
    linkLabel: "Visit Virtual Booth",
  },
  {
    award: "Best Project Award — 5th Place",
    title: "Deepfake Detection Using Machine Learning Models",
    organisation: "Final Year Project, Multimedia University",
    date: "2026",
    desc: "Ranked 5th for the Best Project Award across the entire Data Science cohort.",
    stat: { value: "Top 5", label: "of 279 projects" },
  },
];

export const PUBLICATION = {
  title: "Deepfake Detection Using Machine Learning Models",
  details: "Digital Futures International Congress (DIFCON) 2026 · AIP Conference Proceedings",
  certPdf: "/difcon.pdf",
};

export const HACKATHONS = [
  { title: "UMHackathon 2026", certPath: "/umhack.jpg" },
  { title: "Varsity Hackathon 2026", certPath: "/vhack.pdf" },
];

export const CERTIFICATIONS: Certification[] = [
  { name: "Microsoft Certified: Power BI Data Analyst Associate", issuer: "Microsoft" },
  { name: "Google Advanced Data Analytics Professional Certificate", issuer: "Google", date: "Oct 2026", credentialId: "8JJYH3BJ5ZGN" },
  { name: "IBM RAG and Agentic AI Professional Certificate", issuer: "IBM", date: "Oct 2026", credentialId: "J2Y99JVCZ2ON" },
  { name: "Graduate Technologist", issuer: "Malaysia Board of Technologists (MBOT)", date: "Oct 2026", credentialId: "GT26101025" },
  { name: "Google Project Management Professional Certificate", issuer: "Google", date: "Sep 2026", credentialId: "QTYGX8VHZX8W" },
];
