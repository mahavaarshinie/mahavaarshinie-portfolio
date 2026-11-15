"use client";
import { motion, AnimatePresence, useScroll, useSpring, useInView, animate } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  USER_INFO, PROJECTS, EXPERIENCE, SKILL_GROUPS, CERTIFICATIONS, PUBLICATION, EDUCATION, COCURRICULAR,
  WORKSHOP, HACKATHONS, ACHIEVEMENTS, ROTATING_WORDS, HERO_STATS, Project, Skill,
} from "../lib/data";

/* ---------- motion presets ---------- */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};
const stagger = (i: number) => ({ ...fadeUp, transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } });

const CONTACTS = [
  { label: "WhatsApp", value: "Chat instantly", href: `https://wa.me/${USER_INFO.whatsapp}`, type: "whatsapp" },
  { label: "Email", value: USER_INFO.email, href: `mailto:${USER_INFO.email}`, type: "email" },
  { label: "LinkedIn", value: "Let's connect", href: USER_INFO.linkedin, type: "linkedin" },
];

const NAV = [
  ["about", "About"],
  ["experience", "Experience"],
  ["projects", "Projects"],
  ["recognition", "Recognition"],
  ["more", "Certifications"],
];

/* ---------- small building blocks ---------- */
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

const Arrow = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
);
const External = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
);
const Check = () => (
  <svg className="w-4 h-4 mt-0.5 shrink-0 text-[#D4AF37]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
);

function SectionHead({ eyebrow, title, action }: { eyebrow: string; title: string; action?: ReactNode }) {
  return (
    <motion.div {...fadeUp} className="mb-10 flex items-end justify-between gap-6">
      <div>
      <p className="text-[#D4AF37] uppercase tracking-[0.35em] text-[10px] font-bold mb-3 flex items-center gap-3">
        <span className="h-px w-8 bg-[#D4AF37]/60" />{eyebrow}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      </div>
      {action}
    </motion.div>
  );
}

function Counter({ to, decimals = 0, prefix = "", suffix = "" }: { to: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: setVal });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
}

function SkillChip({ skill, i }: { skill: Skill; i: number }) {
  const [failed, setFailed] = useState(false);
  const showLogo = skill.logo && !failed;
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
      transition={{ delay: i * 0.03, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ y: -3 }}
      className="group inline-flex items-center gap-2 bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/[0.06] rounded-full pl-2 pr-4 py-1.5 transition-colors cursor-default">
      <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center">
        {showLogo
          ? <img src={skill.logo} alt="" className="w-4 h-4 object-contain" onError={() => setFailed(true)} />
          : <span className="text-xs text-[#D4AF37]">{skill.glyph ?? "✦"}</span>}
      </span>
      <span className="text-xs text-gray-300 group-hover:text-white">{skill.name}</span>
    </motion.span>
  );
}

function RotatingWord() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(n => (n + 1) % ROTATING_WORDS.length), 2400);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="relative inline-flex h-[1.3em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span key={i}
          initial={{ y: "100%", opacity: 0 }} animate={{ y: "0%", opacity: 1 }} exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="text-[#D4AF37] font-semibold whitespace-nowrap">
          {ROTATING_WORDS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ---------- page ---------- */
export default function Portfolio() {
  const [contactOpen, setContactOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState<"certs" | "talks" | "lead">("certs");
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  // close contact dropdown on outside click
  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setContactOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(USER_INFO.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch { /* clipboard unavailable */ }
  };

  const tabs = [
    { id: "certs", label: "Certifications" },
    { id: "talks", label: "Knowledge Sharing" },
    { id: "lead", label: "Leadership" },
  ] as const;

  return (
    <main className="relative text-white selection:bg-[#D4AF37]/40 overflow-x-hidden font-sans"
      style={{ background: "radial-gradient(ellipse at 20% 0%, #1a1200 0%, #0a0a0a 40%, #000000 100%)" }}>

      {/* scroll progress */}
      <motion.div style={{ scaleX: progress }} className="fixed top-0 left-0 right-0 h-[2px] bg-[#D4AF37] origin-left z-[60]" />

      {/* ambient glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.06, 0.1, 0.06] }} transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-15%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#D4AF37] blur-[140px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-950/40 blur-[160px]" />
        <div className="absolute inset-0 opacity-[0.035]"
          style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
      </div>

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-white/5 bg-black/40">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#top" className="text-lg font-bold tracking-tight">
            Maha<span className="text-[#D4AF37]">.</span>
          </a>

          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} className="relative hover:text-white transition-colors group">
                {label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#D4AF37] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative" ref={dropdownRef}>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => setContactOpen(o => !o)}
                className="bg-[#D4AF37] text-black px-5 py-2 rounded-full text-sm font-bold hover:shadow-[0_0_24px_rgba(212,175,55,0.45)] transition-shadow">
                Let&apos;s Talk
              </motion.button>
              <AnimatePresence>
                {contactOpen && (
                  <motion.div initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full mt-3 w-64 bg-black/90 backdrop-blur-xl border border-[#D4AF37]/30 rounded-2xl p-2 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                    {CONTACTS.map(c => (
                      <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer" onClick={() => setContactOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#D4AF37]/10 transition-all group">
                        <span className="text-[#D4AF37]"><ContactIcon type={c.type} /></span>
                        <span className="min-w-0">
                          <span className="block text-white font-semibold text-sm group-hover:text-[#D4AF37] transition-colors">{c.label}</span>
                          <span className="block text-gray-500 text-xs truncate">{c.value}</span>
                        </span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button onClick={() => setMenuOpen(o => !o)} className="md:hidden p-2 text-gray-300" aria-label="Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" d={menuOpen ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} />
              </svg>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-white/5 bg-black/90">
              <div className="px-6 py-4 flex flex-col gap-3 text-sm text-gray-300">
                {NAV.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
                <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section id="top" className="min-h-[92vh] flex flex-col justify-center px-6 pt-24 pb-12">
        <div className="max-w-6xl mx-auto w-full">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-full px-4 py-1.5 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-xs text-gray-300">Junior Engineer, Data Analytics &amp; Visualizations @ <span className="text-white font-semibold">AT&amp;S</span></span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-6 bg-gradient-to-b from-white via-white/90 to-gray-500 bg-clip-text text-transparent">
            Maha<br />Vaarshinie
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 font-light mb-3">
            I turn production data into <RotatingWord />
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className="text-gray-500 max-w-xl mb-10">
            BI &amp; data analytics for semiconductor manufacturing, backed by award-winning AI research.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-3 mb-16">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-bold hover:bg-[#D4AF37] transition-colors">
              View Resume <Arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            {[["LinkedIn", USER_INFO.linkedin], ["GitHub", USER_INFO.github]].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/15 hover:border-[#D4AF37]/60 px-6 py-3 rounded-full text-sm font-semibold text-gray-300 hover:text-white transition-all">
                {label} <External />
              </a>
            ))}
          </motion.div>

          {/* stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            {HERO_STATS.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.08 }}
                className="bg-black/70 backdrop-blur px-5 py-5">
                <p className="text-2xl md:text-3xl font-black text-white">
                  <Counter to={s.value} decimals={s.decimals ?? 0} prefix={s.prefix ?? ""} suffix={s.suffix ?? ""} />
                </p>
                <p className="text-[11px] uppercase tracking-wider text-gray-500 mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT + EDUCATION */}
      <section id="about" className="py-20 px-6 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <SectionHead eyebrow="About" title="Data that drives the factory floor" />
          <div className="grid md:grid-cols-5 gap-8">
            <motion.p {...fadeUp} className="md:col-span-3 text-gray-300 leading-relaxed font-light text-[17px]">
              {USER_INFO.about}
            </motion.p>
            <div className="md:col-span-2 flex flex-col gap-4">
              {EDUCATION.map((edu, i) => (
                <motion.div key={i} {...stagger(i)} whileHover={{ x: 4 }}
                  className="bg-white/[0.02] border border-white/10 hover:border-[#D4AF37]/30 rounded-2xl p-5 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[10px] font-mono tracking-widest text-[#D4AF37] mb-1">{edu.date}</p>
                      <h3 className="font-semibold text-sm leading-snug">{edu.degree}</h3>
                      <p className="text-gray-500 text-xs mt-1">{edu.institution}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-2xl font-black text-white/90">{edu.cgpa}</p>
                      <p className="text-[9px] uppercase tracking-widest text-gray-600">CGPA</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* skills */}
          <div className="grid md:grid-cols-3 gap-4 mt-12">
            {SKILL_GROUPS.map((g, gi) => (
              <motion.div key={g.title} {...stagger(gi)} className="bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#D4AF37] font-bold mb-4">{g.title}</p>
                <div className="flex flex-wrap gap-2">
                  {g.skills.map((s, i) => <SkillChip key={s.name} skill={s} i={i} />)}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="py-20 px-6 border-t border-white/5 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <SectionHead eyebrow="Experience" title="Where I work" />
          <div className="relative pl-6 md:pl-8">
            <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-[#D4AF37]/70 via-white/10 to-transparent" />
            <div className="flex flex-col gap-6">
              {EXPERIENCE.map((exp, i) => (
                <motion.div key={exp.role} {...stagger(i)} className="relative">
                  <span className="absolute -left-6 md:-left-8 top-7 flex h-4 w-4 md:h-6 md:w-6 items-center justify-center">
                    {exp.current && <span className="absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-40 animate-ping" />}
                    <span className={`relative h-2.5 w-2.5 md:h-3 md:w-3 rounded-full ${exp.current ? "bg-[#D4AF37]" : "bg-gray-600"}`} />
                  </span>
                  <div className="bg-white/[0.02] border border-white/10 hover:border-[#D4AF37]/30 rounded-2xl p-6 md:p-8 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-5">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg md:text-xl font-bold">{exp.role}</h3>
                          {exp.current && <span className="text-[10px] font-bold uppercase tracking-wider bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 px-2 py-0.5 rounded-full">Current</span>}
                        </div>
                        <p className="text-gray-400 text-sm mt-1">{exp.company}</p>
                        <p className="text-gray-600 text-xs mt-0.5">{exp.location}</p>
                      </div>
                      <span className="text-xs font-mono text-gray-500 whitespace-nowrap">{exp.date}</span>
                    </div>
                    <ul className="grid md:grid-cols-2 gap-x-8 gap-y-2.5 mb-5">
                      {exp.tasks.map(t => (
                        <li key={t} className="flex gap-2.5 text-sm text-gray-400 leading-relaxed"><Check />{t}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.tools.map(t => (
                        <span key={t} className="text-[10px] font-semibold tracking-wider uppercase text-[#D4AF37] bg-[#D4AF37]/5 border border-[#D4AF37]/15 px-3 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                    {exp.images && exp.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-3 mt-6">
                        {exp.images.map((img, idx) => (
                          <div key={idx} className="overflow-hidden rounded-xl border border-white/10">
                            <img src={img} alt={`${exp.role} ${idx + 1}`} className="w-full h-24 md:h-36 object-cover hover:scale-110 transition-transform duration-500" />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-20 px-6 border-t border-white/5 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <SectionHead eyebrow="Projects" title="Selected work" action={
            <a href={USER_INFO.github} target="_blank" rel="noopener noreferrer"
              className="group hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#D4AF37] hover:text-white transition-colors">
              All on GitHub <Arrow className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          } />
          <div className="grid lg:grid-cols-2 gap-5">
            {PROJECTS.map((p: Project, i: number) => (
              <motion.a key={p.title} {...stagger(i)} href={p.repo} target="_blank" rel="noopener noreferrer"
                whileHover={{ y: -6 }}
                className="group flex flex-col sm:flex-row bg-white/[0.02] border border-white/10 hover:border-[#D4AF37]/40 rounded-2xl overflow-hidden transition-colors hover:shadow-[0_20px_50px_-20px_rgba(212,175,55,0.35)]">
                <div className="sm:w-2/5 h-40 sm:h-auto overflow-hidden">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                </div>
                <div className="sm:w-3/5 p-6 flex flex-col">
                  <h3 className="text-lg font-bold mb-2 group-hover:text-[#D4AF37] transition-colors">{p.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {p.tags.map(tag => (
                      <span key={tag} className="text-[10px] tracking-wide text-gray-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                  {p.repo && (
                    <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#D4AF37] transition-colors">
                      View repository <Arrow className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* RECOGNITION (bento) */}
      <section id="recognition" className="py-20 px-6 border-t border-white/5 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <SectionHead eyebrow="Recognition" title="Awards, research & hackathons" />
          <div className="grid md:grid-cols-3 gap-4">
            {/* iNVENTX */}
            {ACHIEVEMENTS[0] && (
              <motion.div {...stagger(0)}
                className="md:col-span-2 relative overflow-hidden bg-gradient-to-br from-[#D4AF37]/[0.12] to-transparent border border-[#D4AF37]/25 rounded-2xl p-7">
                <motion.div animate={{ y: [0, -6, 0], rotate: [0, 6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-6 right-6 text-5xl select-none" aria-hidden>🥈</motion.div>
                <span className="inline-block bg-[#D4AF37] text-black text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-4">{ACHIEVEMENTS[0].award}</span>
                <h3 className="text-xl md:text-2xl font-bold mb-1 pr-16">{ACHIEVEMENTS[0].title}</h3>
                <p className="text-[#D4AF37]/80 text-xs mb-4">{ACHIEVEMENTS[0].organisation} · {ACHIEVEMENTS[0].date}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{ACHIEVEMENTS[0].desc}</p>
                {ACHIEVEMENTS[0].link && (
                  <a href={ACHIEVEMENTS[0].link} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#D4AF37] font-bold text-xs tracking-wider uppercase hover:text-white transition-colors">
                    {ACHIEVEMENTS[0].linkLabel} <External />
                  </a>
                )}
              </motion.div>
            )}

            {/* Best Project */}
            {ACHIEVEMENTS[1] && (
              <motion.div {...stagger(1)} className="bg-white/[0.02] border border-white/10 rounded-2xl p-7 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-3">{ACHIEVEMENTS[1].award}</p>
                  <p className="text-6xl font-black tracking-tighter text-[#D4AF37]">Top <Counter to={5} /></p>
                  <p className="text-xs uppercase tracking-widest text-gray-500 mt-1">{ACHIEVEMENTS[1].stat?.label}</p>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mt-5">{ACHIEVEMENTS[1].desc}</p>
              </motion.div>
            )}

            {/* Publication */}
            <motion.div {...stagger(2)} className="md:col-span-2 bg-white/[0.02] border border-white/10 rounded-2xl p-7">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-3">Publication</p>
              <h3 className="text-lg md:text-xl font-bold italic mb-2">&ldquo;{PUBLICATION.title}&rdquo;</h3>
              <p className="text-gray-500 text-sm mb-5">{PUBLICATION.details}</p>
              <a href={PUBLICATION.certPdf} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#D4AF37] font-bold text-xs tracking-wider uppercase hover:text-white transition-colors">
                Presentation certificate <External />
              </a>
            </motion.div>

            {/* Hackathons */}
            <motion.div {...stagger(3)} className="bg-gradient-to-br from-[#111] to-black border border-white/10 rounded-2xl p-7">
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-bold mb-3">Hackathons</p>
              <h3 className="text-2xl font-bold italic tracking-tight mb-4">2x International Participant</h3>
              <div className="flex flex-col gap-2">
                {HACKATHONS.map(h => (
                  <a key={h.title} href={h.certPath} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-between text-xs font-semibold text-gray-300 hover:text-[#D4AF37] border border-white/10 hover:border-[#D4AF37]/40 rounded-lg px-3 py-2 transition-colors">
                    {h.title} <External />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* BEYOND WORK (tabs) */}
      <section id="more" className="py-20 px-6 border-t border-white/5 scroll-mt-16">
        <div className="max-w-6xl mx-auto">
          <SectionHead eyebrow="Credentials & Community" title="Beyond the dashboard" />

          <div className="inline-flex flex-wrap gap-1 bg-white/[0.03] border border-white/10 rounded-full p-1 mb-8">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`relative px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-colors ${tab === t.id ? "text-black" : "text-gray-400 hover:text-white"}`}>
                {tab === t.id && <motion.span layoutId="tab-pill" className="absolute inset-0 bg-[#D4AF37] rounded-full" transition={{ type: "spring", stiffness: 380, damping: 30 }} />}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}>
              {tab === "certs" && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {CERTIFICATIONS.map((c, i) => (
                    <motion.div key={c.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                      whileHover={{ y: -4 }}
                      className="group bg-white/[0.02] border border-white/10 hover:border-[#D4AF37]/40 rounded-2xl p-5 transition-colors flex flex-col">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-bold">{c.issuer}</span>
                        {c.date && <span className="text-[10px] font-mono text-gray-600">{c.date}</span>}
                      </div>
                      <h4 className="text-sm font-semibold leading-snug text-gray-200 group-hover:text-white mb-3">{c.name}</h4>
                      <div className="mt-auto flex items-center justify-between gap-2">
                        {c.credentialId && <span className="text-[10px] font-mono text-gray-600 truncate">ID {c.credentialId}</span>}
                        {c.url && (
                          <a href={c.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D4AF37] hover:text-white">
                            Verify <External className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {tab === "talks" && WORKSHOP.map(ws => (
                <div key={ws.title} className="grid md:grid-cols-5 gap-6 items-center bg-white/[0.02] border border-white/10 rounded-2xl p-6">
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-bold mb-1">{ws.title}</h3>
                    <p className="text-[#D4AF37]/80 text-xs mb-3">{ws.organisation} · {ws.date}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{ws.desc}</p>
                  </div>
                  <div className="md:col-span-3 grid grid-cols-3 gap-3">
                    {ws.images.map((img, idx) => (
                      <div key={idx} className="overflow-hidden rounded-xl">
                        <img src={img} alt={`Workshop ${idx + 1}`} className="w-full h-28 md:h-40 object-cover hover:scale-110 transition-transform duration-500" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {tab === "lead" && (
                <div className="grid md:grid-cols-3 gap-4">
                  {COCURRICULAR.map(item => (
                    <div key={item.role} className="group bg-white/[0.02] border border-white/10 hover:border-[#D4AF37]/30 rounded-2xl overflow-hidden transition-colors">
                      {item.images?.[0] && (
                        <div className="overflow-hidden">
                          <img src={item.images[0]} alt={item.role} className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      )}
                      <div className="p-5">
                        <span className="text-[9px] uppercase tracking-[0.25em] text-[#D4AF37]/70 font-bold">{item.category}</span>
                        <h4 className="text-sm font-bold mt-1 group-hover:text-[#D4AF37] transition-colors">{item.role}</h4>
                        <p className="text-gray-500 text-xs mt-1">{item.organisation}</p>
                        {item.date && <p className="text-[10px] font-mono text-gray-600 mt-2">{item.date}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-20 px-6 scroll-mt-16">
        <motion.div {...fadeUp} className="max-w-5xl mx-auto relative rounded-[2rem] p-px overflow-hidden">
          {/* rotating gold border */}
          <motion.div aria-hidden animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-[60%]"
            style={{ background: "conic-gradient(from 0deg, transparent 0deg, #D4AF37 60deg, transparent 120deg, transparent 360deg)" }} />
          <div className="relative rounded-[calc(2rem-1px)] bg-[#0b0b0b] p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[#D4AF37] uppercase tracking-[0.35em] text-[10px] font-bold mb-4">Get in touch</p>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
                Got data that needs a{" "}
                <span className="bg-gradient-to-r from-[#D4AF37] to-[#f5e1a4] bg-clip-text text-transparent">story?</span>
              </h2>
              <p className="text-gray-400 leading-relaxed">
                Open to collaborations, BI and analytics consulting, speaking and workshop invitations. Drop a message — I usually reply within a day.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {CONTACTS.map((c, i) => (
                <motion.div key={c.label} {...stagger(i)} className="relative">
                  <a href={c.href} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-4 bg-white/[0.03] border border-white/10 hover:border-[#D4AF37]/50 hover:bg-[#D4AF37]/[0.06] rounded-2xl px-4 py-3.5 transition-all">
                    <motion.span whileHover={{ rotate: [0, -12, 12, 0] }} transition={{ duration: 0.5 }}
                      className="w-10 h-10 rounded-xl bg-[#D4AF37]/10 text-[#D4AF37] flex items-center justify-center shrink-0">
                      <ContactIcon type={c.type} />
                    </motion.span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-sm group-hover:text-[#D4AF37] transition-colors">{c.label}</span>
                      <span className="block text-gray-500 text-xs truncate">{c.value}</span>
                    </span>
                    <Arrow className={`w-4 h-4 text-gray-600 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all ${c.type === "email" ? "mr-16" : ""}`} />
                  </a>
                  {c.type === "email" && (
                    <button onClick={copyEmail}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-wider text-gray-400 hover:text-black hover:bg-[#D4AF37] border border-white/10 rounded-lg px-2.5 py-1.5 transition-colors">
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span key={copied ? "y" : "n"} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="block">
                          {copied ? "Copied ✓" : "Copy"}
                        </motion.span>
                      </AnimatePresence>
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© 2026 Maha Vaarshinie Arupatha Rajoo</p>
          <a href="#top" className="group inline-flex items-center gap-1.5 hover:text-[#D4AF37] transition-colors">
            Back to top
            <svg className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
          </a>
        </div>
      </footer>
    </main>
  );
}
