"use client";
import { motion } from "framer-motion";
import { PROJECTS, EXPERIENCE } from "@/lib/data";

export default function Portfolio() {
  return (
    <main className="bg-[#050505] text-white min-h-screen selection:bg-gold-500/30">
      
      <section className="h-screen flex flex-col justify-center px-10 md:px-24">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-gold-500 uppercase tracking-[0.3em] text-sm mb-4"
        >
          Data Scientist
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl md:text-8xl font-serif font-bold leading-tight"
        >
          MAHA VAARSHINIE <br /> ARUPATHA RAJOO
        </motion.h1>
      </section>

      
      <section id="work" className="py-24 px-10 md:px-24">
        <h2 className="text-3xl font-bold mb-12 border-b border-white/10 pb-4">Featured Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
            >
              <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
              <p className="text-gray-400 mb-6">{project.desc}</p>
              <div className="flex gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-1 bg-gold-500/10 text-gold-500 rounded-full border border-gold-500/20">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      
      <section className="py-24 px-10 md:px-24 bg-white/[0.02]">
        <h2 className="text-3xl font-bold mb-12">Professional Journey</h2>
        {EXPERIENCE.map((exp, i) => (
          <div key={i} className="relative pl-8 border-l border-gold-500/30 py-8">
            <div className="absolute w-3 h-3 bg-gold-500 rounded-full -left-[6.5px] top-10 shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
            <span className="text-sm text-gold-500 font-mono">{exp.date}</span>
            <h3 className="text-2xl font-bold mt-2">{exp.role}</h3>
            <p className="text-xl text-gray-300 mb-4">{exp.company}</p>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              {exp.tasks.map(t => <li key={t}>{t}</li>)}
            </ul>
          </div>
        ))}
      </section>
    </main>
  );
}