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

export const USER_INFO = {
  name: "MAHA VAARSHINIE ARUPATHA RAJOO",
  title: "Data Scientist",
  about: "Data Scientist and AI Engineer, and a fresh Data Science graduate from Multimedia University (MMU), specializing in end-to-end machine learning, deep learning, and predictive analytics. Built an award-winning deepfake detection system achieving 98.05% accuracy with a Dual-Stream Hybrid CNN — published at DIFCON and awarded a Silver Medal at iNVENTX 2026 — alongside dialect-aware NLP solutions for inclusive digital access across ASEAN languages. Experienced in building agentic AI systems with MCP and LLM integrations, automating workflows with n8n, and full-stack development of production-ready MNC dashboards and robust backend systems with API integration. Proficient in advanced database management, data visualization, and transforming complex data into actionable business intelligence that drives real-world impact.",
  email: "mahavaarshinie17@gmail.com",
  whatsapp: "60164504068",
  linkedin: "https://www.linkedin.com/in/maha-vaarshinie-arupatha-rajoo-068205238/",
  github: "https://github.com/mahavaarshinie"
};

export const SKILLS: Skill[] = [
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "Agentic AI", glyph: "✦" },
  { name: "MCP", logo: "https://cdn.simpleicons.org/modelcontextprotocol/white", glyph: "⬡" },
  { name: "Computer Vision", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
  { name: "NLP", glyph: "¶" },
  { name: "LangChain", logo: "https://cdn.simpleicons.org/langchain/white", glyph: "∞" },
  { name: "Hugging Face", logo: "https://cdn.simpleicons.org/huggingface", glyph: "◈" },
  { name: "Scikit-learn", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scikitlearn/scikitlearn-original.svg" },
  { name: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { name: "n8n", logo: "https://cdn.simpleicons.org/n8n", glyph: "⬢" },
  { name: "D3.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/d3js/d3js-original.svg" },
  { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Power BI", logo: "https://cdn.jsdelivr.net/gh/microsoft/PowerBI-Icons@main/SVG/Power-BI.svg" },
  { name: "Tableau", glyph: "▦" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
];

export const EDUCATION = [
  { institution: "Multimedia University (MMU)", degree: "Bachelor of Computer Science (Honours) — Data Science", cgpa: "3.52", date: "08/2023 – 07/2026", location: "Cyberjaya, Malaysia" },
  { institution: "Multimedia University (MMU)", degree: "Foundation in IT — Information Technology", cgpa: "3.52", date: "08/2022 – 07/2023", location: "Cyberjaya, Malaysia" }
];

export const EXPERIENCE = [
  {
    company: "AT&S Austria Technologie & Systemtechnik (Malaysia)",
    role: "IT Intern - Operations",
    date: "07/2025 - 10/2025",
    tasks: [
      "Built production-ready dashboards using Power BI (DAX & M code)",
      "Automated tasks and developed templates using Excel VBA",
      "Managed and queried SQL databases for data analysis and reporting"
    ],
    // Images moved out of the tasks array
    images: ["/intern-2.jpg", "/intern-1.jpg", "/intern-3.jpg"]
  }
];

export const COCURRICULAR = [
  {
    role: "Flood Cleanup Volunteer",
    organisation: "MMU Superheroes",
    category: "Social Services",
    date: null,
    images: ["/scc-3.jpg"]
  },
  {
    role: "Member of Business Operation Division",
    organisation: "Students' College Committee (MMU)",
    category: "Student Committee",
    date: "Jul 2023 – Dec 2023",
    images: ["/scc-2.jpg"]
  },
  {
    role: "Assistant Head of Resident's Welfare Division",
    organisation: "Students' College Committee (MMU)",
    category: "Student Committee",
    date: "Jan 2024 – Dec 2024",
    images: ["/scc-1.jpg"]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Deepfake Detection Framework",
    desc: "Achieved 98.05% accuracy using Dual-Stream Hybrid CNN with RNN, LSTM, and Transformers.",
    tags: ["Computer Vision", "AI", "98.05% Accuracy"],
    image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=1000",
    repo: "https://github.com/mahavaarshinie/Deepfake-Detection"
  },
  {
    title: "SmartStock AI",
    desc: "Decision support system for SME inventory optimization using AI-driven demand forecasting.",
    tags: ["FastAPI", "React.js", "Forecasting"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000",
    repo: "https://github.com/mahavaarshinie/SmartStock-AI"
  },
  {
    title: "The Inclusive Citizen",
    desc: "Multilingual NLP app for ASEAN dialects using the SEA-LION dataset and FastAPI.",
    tags: ["NLP", "SEA-LION", "FastAPI"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000",
    repo: "https://github.com/mahavaarshinie/The-Inclusive-Citizen-Multilingual-AI-for-Public-Services"
  },
  {
    title: "ANY-OBJECT ANY-TIME VISION APP",
    desc: "Industrial defect detection pipeline via on-the-fly deep spatial feature tracking.",
    // Corrected image path assumed to be in your public directory
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000",
    tags: ["Next.js 14", "TypeScript", "ONNX Runtime", "Computer Vision", "Tailwind CSS"],
    repo: "https://github.com/mahavaarshinie/ANY-OBJECT-ANY-TIME-VISION-APP"
  },
];

export const WORKSHOP: Workshop[] = [
  {
    title: "Power BI Workshop: Knowledge Sharing",
    organisation: "DATAi Community, Multimedia University",
    date: "2026",
    desc: "Conducted a hands-on session guiding students through data visualization best practices, DAX calculations, and interactive dashboard design.",
    images: ["/workshop-1.jpg", "/workshop-2.jpg", "/workshop-3.jpg"]
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    award: "Silver Medal",
    title: "iNVENTX Invention Competition 2026",
    organisation: "Multimedia University, Cyberjaya",
    date: "July 2026",
    desc: "Awarded the Silver Medal for the research project \"Leveraging Machine Learning Architectures for the Robust Identification of Deepfake Content\" — a Dual-Stream Hybrid CNN fusing Xception's micro-textural analysis with ResNet50's macro-structural mapping, achieving 98.05% accuracy and a 98.83% F1-Score on FaceForensics++.",
    certImage: "/inventx.png",
    link: "https://inventx.mmu.edu.my/booth.html?#A133",
    linkLabel: "Visit Virtual Booth"
  },
  {
    award: "Best Project Award — 5th Place",
    title: "Deepfake Detection Using Machine Learning Models",
    organisation: "Final Year Project, Multimedia University",
    date: "2026",
    desc: "Final year project ranked 5th for the Best Project Award, competing against the entire Data Science cohort's final year projects.",
    stat: { value: "Top 5", label: "of 279 Data Science Projects" }
  }
];

export const PUBLICATION = {
  title: "Deepfake Detection Using Machine Learning Models",
  details: "Proceedings of the Digital Futures International Congress (DIFCON), AIP Conference Proceedings, 2026.",
  certPdf: "/difcon.pdf" // Add this line
};

// Add this to src/lib/data.ts
export const HACKATHONS = [
  { title: "UMHackathon 2026", certPath: "/umhack.jpg" },
  { title: "Varsity Hackathon 2026", certPath: "/vhack.pdf" }
];

export const CERTIFICATIONS = [
  "Microsoft Power BI Data Analyst Associate",
  "AWS Educate Machine Learning Foundations",
  "Huawei HCIA-Cloud Computing V5.5",
  "IBM MQ Developer Essentials",
  "Advanced NLP with Python for Machine Learning"
];
