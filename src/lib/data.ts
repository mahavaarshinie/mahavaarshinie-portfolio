// src/lib/data.ts

// 1. Define the Interface to fix the build errors
export interface Project {
  title: string;
  desc: string;
  tags: string[];
  image: string;
  repo?: string; // '?' makes this optional for projects without a link
}

export const USER_INFO = {
  name: "MAHA VAARSHINIE ARUPATHA RAJOO",
  title: "Data Scientist",
  about: "Data Science student at Multimedia University (MMU) specializing in end-to-end machine learning and predictive analytics. Developed a computer vision system for deepfake detection and dialect-aware NLP solutions for inclusive digital access. Experienced in full-stack web development, building production-ready MNC dashboards and robust backend systems with API integration. Proficient in front-end programming and advanced database management to transform complex data into actionable business intelligence.",
  email: "mahavaarshinie17@gmail.com",
  linkedin: "https://www.linkedin.com/in/maha-vaarshinie-arupatha-rajoo-068205238/",
  github: "https://github.com/mahavaarshinie"
};

export const SKILLS = [
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "FastAPI", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Power BI", logo: "https://cdn.jsdelivr.net/gh/microsoft/PowerBI-Icons@main/SVG/Power-BI.svg"},
  { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
  { name: "Flask", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
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
    ]
  }
];

export const COCURRICULAR = [
  { role: "Flood Cleanup Volunteer", organisation: "MMU Superheroes", category: "Social Services", date: null },
  { role: "Member of Business Operation Division", organisation: "Students' College Committee (MMU)", category: "Student Committee", date: "Jul 2023 – Dec 2023" },
  { role: "Assistant Head of Resident's Welfare Division", organisation: "Students' College Committee (MMU)", category: "Student Committee", date: "Jan 2024 – Dec 2024" }
];

// 2. Use the 'Project' type defined above for the array
export const PROJECTS: Project[] = [
  { 
    title: "Deepfake Detection Framework", 
    desc: "Achieved 98.05% accuracy using Dual-Stream Hybrid CNN with RNN, LSTM, and Transformers.", 
    tags: ["Computer Vision", "AI", "98.05% Accuracy"], 
    image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?q=80&w=1000",
    repo: "" 
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
    title: "Online Tutor Booking System", 
    desc: "Flask and SQLAlchemy prototype featuring real-time filtering and automated scheduling.", 
    tags: ["Flask", "SQLAlchemy", "Python"], 
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1000",
    repo: "https://github.com/mahavaarshinie/Online-Tutor-Finding-System"
  }
];

export const PUBLICATION = {
  title: "Deepfake Detection Using Machine Learning Models",
  details: "Proceedings of the Digital Futures International Congress (DIFCON), AIP Conference Proceedings, 2026."
};

export const CERTIFICATIONS = [
  "Microsoft Power BI Data Analyst Associate",
  "AWS Educate Machine Learning Foundations",
  "Huawei HCIA-Cloud Computing V5.5",
  "IBM MQ Developer Essentials",
  "Advanced NLP with Python for Machine Learning"
];
