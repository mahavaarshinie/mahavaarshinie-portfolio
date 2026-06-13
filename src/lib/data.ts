// Add this interface at the top of your lib/data.ts
export interface Project {
  title: string;
  desc: string;
  tags: string[];
  image: string;
  repo?: string; // The '?' makes this field optional
}

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

// Keep your existing USER_INFO, SKILLS, EDUCATION, etc., below this...
