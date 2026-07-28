"use client";
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from "framer-motion";
import { useEffect, useRef, useState, ReactNode } from "react";
import { USER_INFO, PROJECTS, EXPERIENCE, SKILLS, CERTIFICATIONS, PUBLICATION, EDUCATION, COCURRICULAR, WORKSHOP, Project, Workshop, Skill, HACKATHONS, ACHIEVEMENTS, Achievement } from "../lib/data";

const fadeUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.8 } };
const stagger = (i: number) => ({ ...fadeUp, transition: { duration: 0.6, delay: i * 0.1 } });

const CONTACTS = [
  { label: "WhatsApp", value: "Chat instantly", href: `https://wa.me/${USER_INFO.whatsapp}`, type: "whatsapp" },
  { label: "Email", value: USER_INFO.email, href: `mailto:${USER_INFO.email}`, type: "email" },
  { label: "LinkedIn", value: "Let's connect", href: USER_INFO.linkedin, type: "linkedin" },
];

// Thin-stroke gold line icons to match the site's existing SVG style
function ContactIcon({ type, className = "w-5 h-5" }: { type: string; className?: string }) {
  if (type === "whatsapp") return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01M21 12c0 4.418-4.03 8-9 8a9.9 9.9 0 01-4.26-.95L3 20l1.4-3.72A7.4 7.4 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
  if (type === "email") return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

/**
 * Card-stack scrolling: each section is sticky so it pins in place once fully
 * scrolled, and the next section slides in over it while the pinned one
 * shrinks and dims underneath — like cards being stacked on a deck.
 * Sections taller than the viewport pin at `top: viewport - height` so all
 * their content stays reachable.
 */
function StackSection({ id, z, className = "", bare = false, children }: { id?: string; z: number; className?: string; bare?: boolean; children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const [top, setTop] = useState(0);
  // scrollY window during which the next section slides over this one
  const [range, setRange] = useState<[number, number]>([0, 1]);

  const { scrollY } = useScroll();
  // The covered card visibly recedes: slides up with parallax, shrinks and dims
  // while the next card passes over it — readable in both scroll directions.
  const scale = useTransform(scrollY, range, [1, 0.86]);
  const y = useTransform(scrollY, range, [0, -120]);
  const brightness = useTransform(scrollY, range, [1, 0.3]);
  const filter = useMotionTemplate`brightness(${brightness})`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const vh = window.innerHeight;
      const h = el.offsetHeight;
      setTop(Math.min(0, vh - h));
      const start = el.offsetTop + Math.max(h - vh, 0);
      const end = el.offsetTop + h;
      setRange(end > start ? [start, end] : [start, start + 1]);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    ro.observe(document.body);
    window.addEventListener("resize", update);
    return () => { ro.disconnect(); window.removeEventListener("resize", update); };
  }, []);

  return (
    <motion.section ref={ref} id={id}
      style={{ position: "sticky", top, zIndex: z, scale, y, filter, transformOrigin: "center top" }}
      className={`${bare ? "" : "bg-[#0a0a0a] border-t border-[#D4AF37]/15 rounded-t-[3rem] shadow-[0_-40px_100px_rgba(0,0,0,0.95)]"} ${className}`}>
      {children}
    </motion.section>
  );
}

export default function Portfolio() {
  const [hireOpen, setHireOpen] = useState(false);

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
            {["about", "education", "experience", "achievements", "projects", "activities"].map(s => (
              <a key={s} href={`#${s}`} className="hover:text-white transition-colors capitalize">{s}</a>
            ))}

            {/* Hire Me dropdown */}
            <div className="relative">
              <button onClick={() => setHireOpen(o => !o)}
                className="bg-[#D4AF37] text-black px-6 py-2 rounded-lg font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                Hire Me
              </button>
              {hireOpen && (
                <div className="absolute right-0 top-full mt-4 w-64 bg-black/90 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-3 flex flex-col gap-1 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                  {CONTACTS.map(c => (
                    <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer"
                      onClick={() => setHireOpen(false)}
                      className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-[#D4AF37]/10 transition-all group">
                      <span className="text-[#D4AF37]"><ContactIcon type={c.type} /></span>
                      <span>
                        <span className="block text-white font-bold text-sm group-hover:text-[#D4AF37] transition-colors">{c.label}</span>
                        <span className="block text-gray-500 text-xs">{c.value}</span>
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </nav>

      {/* HERO — bottom of the card stack; About slides in over it */}
      <StackSection z={1} bare className="h-screen flex flex-col justify-center items-center text-center px-6 pt-20">
        <div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-[#D4AF37]/60 font-mono tracking-[0.5em] text-[10px] uppercase mb-8">Data Scientist · AI Engineer · Data Analyst</motion.p>
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
        </div>
      </StackSection>

      {/* ABOUT */}
      <StackSection id="about" z={2} className="py-32 px-10 min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-10">About Me</p>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed font-light">{USER_INFO.about}</p>
          <a href={`mailto:${USER_INFO.email}`}
            className="inline-block mt-10 border border-white/10 hover:border-[#D4AF37]/50 px-8 py-3 rounded-full text-xs tracking-widest uppercase text-gray-400 hover:text-white transition-all">
            {USER_INFO.email}
          </a>
        </div>
      </StackSection>

      {/* SKILLS */}
      <StackSection z={3} className="py-24 px-10">
        <div className="max-w-6xl mx-auto bg-white/[0.02] border border-white/10 rounded-[3rem] p-16 backdrop-blur-3xl">
          <p className="text-center text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-16">Technical Arsenal</p>
          <div className="flex flex-wrap justify-center gap-10">
            {SKILLS.map((skill: Skill, i: number) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center gap-4 group">
                <div className="w-20 h-20 flex items-center justify-center bg-white/[0.03] border border-white/10 rounded-2xl group-hover:border-[#D4AF37]/50 transition-all">
                  {skill.logo ? (
                    <img src={skill.logo} alt={skill.name} className="w-10 h-10 object-contain grayscale group-hover:grayscale-0 transition-all"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const fb = e.currentTarget.nextElementSibling as HTMLElement | null;
                        if (fb) fb.style.display = "block";
                      }} />
                  ) : null}
                  <span className="text-3xl text-gray-400 group-hover:text-[#D4AF37] transition-colors"
                    style={{ display: skill.logo ? "none" : "block" }}>{skill.glyph ?? "✦"}</span>
                </div>
                <span className="font-bold text-gray-500 group-hover:text-white text-[10px] uppercase tracking-widest">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </StackSection>

      {/* EDUCATION */}
      <StackSection id="education" z={4} className="py-32 px-10">
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
      </StackSection>

      {/* EXPERIENCE */}
      <StackSection id="experience" z={5} className="py-40 px-6">
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
      </StackSection>

      {/* PUBLICATION */}
      <StackSection z={6} className="py-28 px-10">
        <div className="max-w-5xl mx-auto text-center mb-6">
          <p className="text-[#D4AF37] uppercase tracking-widest text-[10px] font-bold">Selected Publication</p>
        </div>
        <div className="max-w-5xl mx-auto p-14 bg-gradient-to-r from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 rounded-[3rem]">
          <h3 className="text-3xl font-bold mb-5 italic leading-tight">"{PUBLICATION.title}"</h3>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">{PUBLICATION.details}</p>

          {/* Certificate Link */}
          <a
            href={PUBLICATION.certPdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#D4AF37] font-bold text-sm tracking-widest uppercase border-b border-[#D4AF37] pb-1 hover:text-white transition-colors"
          >
            <span>View Presentation Certificate</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
        </div>
      </StackSection>

      {/* ACHIEVEMENTS */}
      <StackSection id="achievements" z={7} className="py-32 px-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-20">Awards & Achievements</p>
          <div className="flex flex-col gap-10">
            {ACHIEVEMENTS.map((item: Achievement, i: number) => (
              <motion.div key={i} {...stagger(i)}
                className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center bg-gradient-to-r from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 rounded-[3rem] p-14">
                <div className={item.certImage ? "md:col-span-3" : "md:col-span-4"}>
                  <span className="inline-block bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full mb-6 shadow-[0_0_20px_rgba(212,175,55,0.3)]">{item.award}</span>
                  <h3 className="text-3xl font-bold mb-2 leading-tight">{item.title}</h3>
                  <p className="text-[#D4AF37] text-sm mb-6">{item.organisation} • {item.date}</p>
                  <p className="text-gray-400 leading-relaxed text-lg mb-8">{item.desc}</p>
                  {item.link && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#D4AF37] font-bold text-sm tracking-widest uppercase border-b border-[#D4AF37] pb-1 hover:text-white transition-colors">
                      <span>{item.linkLabel}</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                  )}
                </div>

                {/* Certificate Image */}
                {item.certImage && (
                  <a href={item.certImage} target="_blank" rel="noopener noreferrer" className="md:col-span-2 block">
                    <img src={item.certImage} alt={`${item.title} certificate`}
                      className="rounded-2xl w-full border border-white/10 hover:scale-[1.02] hover:border-[#D4AF37]/40 transition-all duration-300" />
                  </a>
                )}

                {/* Ranking Stat */}
                {item.stat && (
                  <div className="md:col-span-1 text-center md:text-right">
                    <p className="text-6xl font-black text-[#D4AF37] tracking-tighter mb-2">{item.stat.value}</p>
                    <p className="text-[10px] uppercase tracking-widest text-gray-500">{item.stat.label}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </StackSection>

      {/* KNOWLEDGE SHARING (WORKSHOPS) */}
      <StackSection id="workshops" z={8} className="py-28 px-10">
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
      </StackSection>

      {/* PROJECTS */}
      <StackSection id="projects" z={9} className="py-32 px-10">
        <div className="max-w-7xl mx-auto">
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

          {/* View All Projects */}
          <motion.div {...fadeUp} className="text-center mt-24">
            <a href={USER_INFO.github} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-[#D4AF37]/40 hover:bg-[#D4AF37]/10 px-10 py-4 rounded-full text-sm font-bold tracking-[0.2em] uppercase text-[#D4AF37] transition-all hover:scale-105">
              <span>View All Projects on GitHub</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          </motion.div>
        </div>
      </StackSection>

      {/* CO-CURRICULAR */}
      <StackSection id="activities" z={10} className="py-32 px-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-20">Leadership & Volunteering</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COCURRICULAR.map((item, i) => (
              <motion.div key={i} {...stagger(i)} className="group bg-white/[0.02] border border-white/10 rounded-3xl p-10 hover:border-[#D4AF37]/30 transition-all flex flex-col h-full">
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37]/60 font-bold mb-3 block">{item.category}</span>
                <h3 className="text-base font-bold text-white/90 mb-2 group-hover:text-[#D4AF37] transition-colors">{item.role}</h3>
                <p className="text-gray-500 text-sm italic mb-3">{item.organisation}</p>
                {item.date && <span className="text-[10px] font-mono tracking-widest text-gray-600 uppercase mb-6">{item.date}</span>}

                {/* Image Section */}
                {item.images && item.images.length > 0 && (
                  <div className="mt-auto pt-4">
                    {item.images.map((img, idx) => (
                      <img key={idx} src={img} alt={item.role} className="rounded-xl w-full h-48 object-cover border border-white/5" />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </StackSection>

      {/* CERTS + HACKATHON */}
      <StackSection z={11} className="py-32 px-10">
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
            <p className="text-gray-500 leading-relaxed text-xl mb-10">Rapid prototyping and predictive analytics applied to global challenges under intense timelines.</p>

            <div className="flex flex-col gap-4">
              {HACKATHONS.map((h, i) => (
                <a key={i} href={h.certPath} target="_blank" rel="noopener noreferrer"
                   className="text-[#D4AF37] border border border-[#D4AF37]/30 px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[#D4AF37]/10 transition-all text-center">
                  View {h.title} Certificate
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </StackSection>

      {/* HIRE ME */}
      <StackSection id="hire" z={12} className="py-40 px-10 min-h-screen flex items-center"
      >
        <div className="max-w-5xl mx-auto text-center w-full">
          <p className="text-[#D4AF37] uppercase tracking-[0.4em] text-[10px] font-bold mb-10">Open To Opportunities</p>
          <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-none mb-10 bg-gradient-to-b from-white via-white/90 to-gray-600 bg-clip-text text-transparent">
            LET'S WORK<br />TOGETHER
          </h2>
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-16 font-light">
            Looking for a Data Scientist, AI Engineer, or Data Analyst? I'm open to full-time roles, freelance projects, and collaborations — let's talk.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONTACTS.map((c, i) => (
              <motion.a key={c.label} {...stagger(i)} href={c.href} target="_blank" rel="noopener noreferrer"
                className="group bg-white/[0.02] border border-white/10 hover:border-[#D4AF37]/50 rounded-[2rem] p-10 transition-all hover:scale-[1.03]">
                <span className="flex justify-center text-[#D4AF37]/80 group-hover:text-[#D4AF37] transition-colors mb-6"><ContactIcon type={c.type} className="w-10 h-10" /></span>
                <span className="block text-xl font-bold mb-1 group-hover:text-[#D4AF37] transition-colors">{c.label}</span>
                <span className="block text-gray-500 text-sm break-all">{c.value}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </StackSection>

      <footer className="relative py-20 text-center text-gray-800 text-[11px] tracking-[1.5em] uppercase border-t border-white/5 bg-[#0a0a0a]" style={{ zIndex: 13 }}>
        MAHA VAARSHINIE RAJOO • 2026
      </footer>
    </main>
  );
}
