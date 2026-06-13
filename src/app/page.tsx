"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { USER_INFO, PROJECTS, EXPERIENCE, SKILLS, CERTIFICATIONS, PUBLICATION, EDUCATION, COCURRICULAR, WORKSHOP, Project, Workshop } from "../lib/data";

const fadeUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8 } };
const stagger = (i: number) => ({ ...fadeUp, transition: { duration: 0.6, delay: i * 0.1 } });

export default function Portfolio() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="relative text-white selection:bg-[#D4AF37]/40 scroll-smooth overflow-x-hidden font-sans"
      style={{ background: "radial-gradient(ellipse at 20% 0%, #1a1200 0%, #0a0a0a 40%, #000000 100%)" }}>

      {/* Ambient glow orbs */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.1, 0.06] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#D4AF37] blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-950/40 blur-[160px]" />
      </div>

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-black/30">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-xl font-bold tracking-tighter">Maha Vaarshinie</motion.span>
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="hidden md:flex items-center gap-10 text-sm font-medium text-gray-400">
            {["about", "education", "experience", "projects", "activities"].map(s => (
              <a key={s} href={`#${s}`} className="hover:text-white transition-colors capitalize">{s}</a>
            ))}
            <a href={USER_INFO.linkedin} target="_blank"
              className="bg-[#D4AF37] text-black px-6 py-2 rounded-lg font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              LinkedIn
            </a>
          </motion.div>
        </div>
      </nav>

      {/* HERO */}
      <section ref={heroRef} className="h-screen flex flex-col justify-center items-center text-center px-6 pt-20">
        <motion.div style={{ y: heroY, opacity: heroOpacity }}>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-[#D4AF37]/60 font-mono tracking-[0.5em] text-[10px] uppercase mb-8">Data Scientist · MMU · 2026</motion.p>
          <motion.h1 initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }}
            className="text-7xl md:text-[11rem] font-black tracking-tighter leading-none mb-8 bg-gradient-to-b from-white via-white/90 to-gray-600 bg-clip-text text-transparent">
            MAHA <br /> VAARSHINIE
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            className="flex gap-12 justify-center">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
              className="text-gray-500 hover:text-white transition-all text-sm font-bold tracking-widest border-b border-white/10 hover:border-[#D4AF37] pb-1">RESUME</a>
            {[["LINKEDIN", USER_INFO.linkedin], ["GITHUB", USER_INFO.github]].map(([label, href]) => (
              <a key={label} href={href} target="_blank"
                className="text-gray-500 hover:text-white transition-all text-sm font-bold tracking-widest border-b border-white/10 hover:border-[#D4AF37] pb-1">{label}</a>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ABOUT */}
      <motion.section id="about" {...fadeUp} className="py-32 px-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-10">About Me</p>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">{USER_INFO.about}</p>
          <a href={`mailto:${USER_INFO.email}`}
            className="inline-block mt-10 border border-white/10 hover:border-[#D4AF37]/50 px-8 py-3 rounded-full text-xs tracking-widest uppercase text-gray-400 hover:text-white transition-all">
            {USER_INFO.email}
          </a>
        </div>
      </motion.section>

      {/* SKILLS */}
      <motion.section {...fadeUp} className="py-24 px-10">
        <div className="max-w-6xl mx-auto bg-white/[0.02] border border-white/10 rounded-[3rem] p-16 backdrop-blur-3xl">
          <p className="text-center text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-16">Technical Arsenal</p>
          <div className="flex flex-wrap justify-center gap-10">
            {SKILLS.map((skill, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="flex flex-col items-center gap-4 group">
                <div className="w-20 h-20 flex items-center justify-center bg-white/[0.03] border border-white/10 rounded-2xl group-hover:border-[#D4AF37]/50 transition-all">
                  <img src={skill.logo} alt={skill.name} className="w-10 h-10 object-contain grayscale group-hover:grayscale-0 transition-all"
                    onError={(e) => { e.currentTarget.style.display = "none"; }} />
                </div>
                <span className="font-bold text-gray-500 group-hover:text-white text-[10px] uppercase tracking-widest">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* EDUCATION */}
      <motion.section id="education" {...fadeUp} className="py-32 px-10 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-20">Academic Background</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EDUCATION.map((edu, i) => (
              <motion.div key={i} {...stagger(i)}
                className="relative bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-12 hover:border-[#D4AF37]/30 transition-all group overflow-hidden">
                <div className="absolute top-0 right-0 w-28 h-28 bg-[#D4AF37]/5 rounded-bl-[2.5rem] group-hover:bg-[#D4AF37]/10 transition-all" />
                <span className="text-[#D4AF37] font-mono text-[10px] tracking-[0.3em] uppercase mb-5 block">{edu.date}</span>
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#D4AF37] transition-colors">{edu.degree}</h3>
                <p className="text-gray-500 italic mb-8">{edu.institution}</p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-600 mb-1">CGPA</p>
                    <p className="text-5xl font-black text-white/80">{edu.cgpa}</p>
                  </div>
                  <p className="text-gray-600 text-xs tracking-widest uppercase">{edu.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* EXPERIENCE */}
      <motion.section id="experience" {...fadeUp} className="py-40 px-6 border-b border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-20">Professional Journey</p>
          
          {EXPERIENCE.map((exp, i) => (
            <div key={i}>
              <motion.span {...fadeUp} className="text-gray-600 font-mono text-sm tracking-[0.3em] uppercase mb-6 block">{exp.date}</motion.span>
              <motion.h3 {...fadeUp} className="text-5xl md:text-[7rem] font-bold mb-4 leading-none tracking-tighter uppercase">{exp.role}</motion.h3>
              <motion.p {...fadeUp} className="text-xl text-gray-500 mb-14 italic uppercase">{exp.company}</motion.p>
              
              {/* Task Pills */}
              <div className="flex flex-wrap justify-center gap-5 max-w-4xl mx-auto mb-16">
                {exp.tasks.map((task, idx) => (
                  <motion.span key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                    className="bg-white/5 border border-white/10 px-7 py-3 rounded-full text-xs text-gray-400">{task}</motion.span>
                ))}
              </div>

              {/* Internship Images Gallery */}
              <motion.div {...fadeUp} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10">
                {exp.images.map((img, idx) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt={`Internship ${idx + 1}`} 
                    className="rounded-2xl w-full h-64 object-cover hover:scale-[1.02] transition-transform duration-300 border border-white/10" 
                  />
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* PUBLICATION */}
      <motion.section {...fadeUp} className="py-28 px-10">
        <div className="max-w-5xl mx-auto text-center mb-6">
          <p className="text-[#D4AF37] uppercase tracking-widest text-[10px] font-bold">Selected Publication</p>
        </div>
        <div className="max-w-5xl mx-auto p-14 bg-gradient-to-r from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 rounded-[3rem]">
          <h3 className="text-3xl font-bold mb-5 italic leading-tight">"{PUBLICATION.title}"</h3>
          <p className="text-gray-400 text-lg leading-relaxed">{PUBLICATION.details}</p>
        </div>
      </motion.section>

      {/* KNOWLEDGE SHARING (WORKSHOPS) */}
      <motion.section id="workshops" {...fadeUp} className="py-28 px-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <p className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold">Knowledge Sharing</p>
        </div>
        
        <div className="max-w-5xl mx-auto p-14 bg-gradient-to-r from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 rounded-[3rem]">
          {WORKSHOP.map((ws: Workshop, i: number) => (
            <div key={i} className="flex flex-col gap-10 text-center">
              {/* Text Content - Center Aligned */}
              <div>
                <h3 className="text-3xl font-bold mb-2">{ws.title}</h3>
                <p className="text-[#D4AF37] text-sm mb-6">{ws.organisation} • {ws.date}</p>
                <p className="text-gray-400 leading-relaxed text-lg max-w-2xl mx-auto">{ws.desc}</p>
              </div>

              {/* Images Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {ws.images.map((img: string, idx: number) => (
                  <img 
                    key={idx} 
                    src={img} 
                    alt={`Workshop ${idx + 1}`} 
                    className="rounded-2xl w-full h-64 object-cover hover:scale-[1.02] transition-transform duration-300" 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* PROJECTS */}
      <section id="projects" className="py-32 px-10 max-w-7xl mx-auto">
        <motion.p {...fadeUp} className="text-center text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-24">Intelligence Registry</motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {PROJECTS.map((project: Project, i: number) => (
            <motion.div key={i} {...stagger(i)} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}
              className="group bg-white/[0.02] border border-white/10 rounded-[3rem] overflow-hidden hover:border-[#D4AF37]/30 transition-all">
              <div className="h-[380px] overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" />
              </div>
              <div className="p-12">
                <h4 className="text-3xl font-bold mb-4 group-hover:text-[#D4AF37] transition-colors uppercase">{project.title}</h4>
                <p className="text-gray-500 leading-relaxed mb-8">{project.desc}</p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4AF37] bg-[#D4AF37]/5 px-5 py-2 rounded-xl border border-[#D4AF37]/10">{tag}</span>
                  ))}
                </div>
                {/* Repo Link - only shows if it exists in data.ts */}
                {project.repo && project.repo.length > 0 && (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white border-b border-[#D4AF37] pb-1 hover:text-[#D4AF37] transition-colors">
                    VIEW REPOSITORY
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CO-CURRICULAR */}
      <motion.section id="activities" {...fadeUp} className="py-32 px-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-20">Leadership & Volunteering</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COCURRICULAR.map((item, i) => (
              <motion.div key={i} {...stagger(i)} whileHover={{ scale: 1.02 }}
                className="group bg-white/[0.02] border border-white/10 rounded-3xl p-10 hover:border-[#D4AF37]/30 transition-all">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37]/60 font-bold mb-3 block">{item.category}</span>
                <h3 className="text-base font-bold text-white/90 mb-2 group-hover:text-[#D4AF37] transition-colors">{item.role}</h3>
                <p className="text-gray-500 text-sm italic mb-3">{item.organisation}</p>
                {item.date && <span className="text-[10px] font-mono tracking-widest text-gray-600 uppercase">{item.date}</span>}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CERTS + HACKATHON */}
      <motion.section {...fadeUp} className="py-32 px-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="bg-white/[0.02] p-16 rounded-[3rem] border border-white/5">
            <p className="text-[#D4AF37] uppercase tracking-widest text-[10px] font-bold mb-12">Certification Registry</p>
            <div className="space-y-8">
              {CERTIFICATIONS.map((cert, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-8 group">
                  <div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full shrink-0 group-hover:scale-[15] transition-all duration-500" />
                  <p className="text-gray-400 group-hover:text-white transition-colors">{cert}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.01 }}
            className="bg-gradient-to-br from-[#111] to-black p-16 rounded-[3rem] border border-white/5 flex flex-col justify-center">
            <p className="text-[#D4AF37] uppercase tracking-widest text-[10px] mb-8 font-bold">Hackathon Presence</p>
            <h3 className="text-5xl font-bold mb-8 italic tracking-tighter">2x International Participant</h3>
            <p className="text-gray-500 leading-relaxed text-xl">Rapid prototyping and predictive analytics applied to global challenges under intense timelines.</p>
          </motion.div>
        </div>
      </motion.section>

      <footer className="py-20 text-center text-gray-800 text-[11px] tracking-[1.5em] uppercase border-t border-white/5">
        MAHA VAARSHINIE RAJOO • 2026
      </footer>
    </main>
  );
}
