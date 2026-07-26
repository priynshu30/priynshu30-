import React, { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, Code2, ArrowUpRight, Download, Sun, Moon, MessageCircle, Send, X, GraduationCap, Award, Phone, MapPin, Menu, Atom, FileCode2, Layers, Wind, Server, Zap, Database, KeyRound, Globe, FlaskConical, GitBranch, Rocket, Terminal as TerminalIcon, ExternalLink } from "lucide-react";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap";

function ScrollTimeline({ C, children }) {
  const ref = useRef(null);
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.5;
      const passed = vh * 0.75 - rect.top;
      const p = Math.max(0, Math.min(1, passed / total));
      setPct(p * 100);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative", paddingLeft: 24 }} className="scroll-timeline">
      <div style={{ position: "absolute", left: 0, top: 4, bottom: 4, width: 2, background: C.line, borderRadius: 2 }} />
      <div style={{
        position: "absolute", left: 0, top: 4, width: 2, borderRadius: 2, background: C.green,
        height: `calc(${pct}% - 4px)`, transition: "height 0.1s linear", boxShadow: `0 0 12px ${C.green}`,
      }} />
      {children}
    </div>
  );
}

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: `opacity 0.7s cubic-bezier(.2,.7,.3,1) ${delay}s, transform 0.7s cubic-bezier(.2,.7,.3,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Counter({ to, suffix = "", duration = 1400 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(Math.round(eased * to));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function Marquee({ items, C, mono }) {
  const row = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}`, padding: "20px 0" }}>
      <div className="marquee-track" style={{ display: "flex", width: "max-content" }}>
        {row.map((t, i) => (
          <span key={i} style={{ display: "flex", alignItems: "center", ...mono, fontSize: 15, color: C.textFaint, whiteSpace: "nowrap", padding: "0 28px" }}>
            {t} <span style={{ color: C.green, marginLeft: 28 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const DARK = {
  bg: "#0A0A0A",
  bgCard: "#131313",
  bgCard2: "#1A1A1A",
  green: "#2FE6A4",
  greenDim: "rgba(47,230,164,0.12)",
  text: "#F5F5F3",
  textSoft: "#A3A3A0",
  textFaint: "#68716C",
  line: "rgba(255,255,255,0.08)",
};

const LIGHT = {
  bg: "#F7F7F5",
  bgCard: "#FFFFFF",
  bgCard2: "#EFEFEC",
  green: "#0EAE76",
  greenDim: "rgba(14,174,118,0.10)",
  text: "#121212",
  textSoft: "#5C5C58",
  textFaint: "#8C8C86",
  line: "rgba(0,0,0,0.09)",
};

const SOCIAL_LINKS = {
  github: "https://github.com/priyanshu-kumar",
  linkedin: "https://linkedin.com/in/priyanshu-kumar",
  leetcode: "https://leetcode.com/u/priynshu30",
  email: "mailto:priyanshukumarr444@gmail.com",
  resume: "#",
};

const PROJECTS = [
  { name: "UrbanCart", category: "Frontend", desc: "Premium e-commerce SPA managing 100+ products with cart, wishlist, search & filter, plus localStorage-based auth and full Vitest test coverage.", long: "UrbanCart is a fully responsive e-commerce single-page app built to feel production-grade without a real backend. It manages a catalog of 100+ products with live search, category filters, a persistent cart and wishlist (via localStorage), and a simulated JWT auth flow. Rendering was optimized with Redux Toolkit selectors to avoid unnecessary re-renders, and the whole app carries full unit + component test coverage using Vitest and React Testing Library.", tags: ["React", "TypeScript", "Redux Toolkit", "Tailwind"], from: "#2FE6A4", to: "#0B3B2C", github: "https://github.com/priyanshu-kumar/urbancart", live: "https://urbancart.vercel.app" },
  { name: "DocCare", category: "Full-Stack", desc: "Full-stack doctor appointment platform with JWT auth, role-based access, and 10+ REST APIs for booking, reports, and history tracking.", long: "DocCare is a full-stack healthcare platform connecting patients and doctors. It supports secure JWT authentication with role-based access control, separate dashboards for patients and doctors, and profile management. On the backend, 10+ RESTful endpoints handle appointment booking, medical report uploads, and visit history — all built with Node.js, Express, and MongoDB, and wired to a React + Tailwind CSS frontend.", tags: ["React", "Node.js", "Express", "MongoDB"], from: "#8FA6FF", to: "#141633", github: "https://github.com/priyanshu-kumar/doccare", live: "https://doccare.vercel.app" },
  { name: "Entertainment App", category: "Full-Stack", desc: "Movie & TV platform integrated with TMDB API — real-time search, bookmarks, authentication, and global state via Redux Toolkit.", long: "A movie and TV series discovery app powered by the TMDB API, offering real-time search, trending content, and bookmarking. User authentication and global app state (bookmarks, search history, theme) are managed with Redux Toolkit, and the responsive UI — built with Tailwind CSS — adapts smoothly from mobile to desktop.", tags: ["React", "Node.js", "TMDB API", "Redux"], from: "#D9B36C", to: "#332B14", github: "https://github.com/priyanshu-kumar/entertainment-app", live: "https://entertainment-app.vercel.app" },
];

const EXPERIENCE = [
  { year: "Apr 2026 — Present", role: "MERN Stack Developer Intern", org: "Corporate Finance Institute (CFI)", desc: "Building full-stack features with React, Node, Express & MongoDB; developing REST APIs with JWT auth in an Agile team." },
  { year: "Mar 2025 — Jan 2026", role: "Peer Mentor — JavaScript & React", org: "AlmaBetter (Remote)", desc: "Mentored 20+ peers in JavaScript and React fundamentals, improving project completion rates by 30%." },
];

const SKILLS = [
  { name: "React.js", icon: Atom, color: "#61DAFB" },
  { name: "TypeScript", icon: FileCode2, color: "#3178C6" },
  { name: "Redux Toolkit", icon: Layers, color: "#764ABC" },
  { name: "Tailwind CSS", icon: Wind, color: "#38BDF8" },
  { name: "Node.js", icon: Server, color: "#8CC84B" },
  { name: "Express.js", icon: Zap, color: "#F5F5F3" },
  { name: "MongoDB", icon: Database, color: "#4DB33D" },
  { name: "JWT Auth", icon: KeyRound, color: "#E8B84B" },
  { name: "REST APIs", icon: Globe, color: "#2FE6A4" },
  { name: "Vitest", icon: FlaskConical, color: "#FCC72B" },
  { name: "Git", icon: GitBranch, color: "#F1502F" },
  { name: "Postman", icon: Rocket, color: "#FF6C37" },
];

const PROFICIENCY = [
  { subject: "React", value: 90 },
  { subject: "Node.js", value: 80 },
  { subject: "MongoDB", value: 78 },
  { subject: "TypeScript", value: 75 },
  { subject: "REST APIs", value: 85 },
  { subject: "DSA", value: 82 },
];

const EDUCATION = [
  { year: "2023 — 2026", degree: "Master of Computer Applications (MCA)", org: "Lovely Professional University (Distance)", detail: "CGPA: 7.10 · Full Stack Web Development, Database Management, Software Engineering" },
  { year: "2021 — 2023", degree: "B.Sc. — Physics, Statistics & Mathematics", org: "St. John's College, Agra", detail: "CGPA: 6.0 · Strong foundation in analytical thinking and quantitative problem-solving" },
];

const CERTIFICATIONS = ["Applied Full Stack Development — AlmaBetter", "DOEACC 'O' Level — NIELIT (Govt. recognized)"];
const AWARDS = ["Excellence in Web Development — Lovely Professional University, Nov 2024"];

function PageLoader({ C, display }) {
  const [done, setDone] = useState(false);
  const [hide, setHide] = useState(false);
  useEffect(() => {
    const t1 = setTimeout(() => setDone(true), 900);
    const t2 = setTimeout(() => setHide(true), 1450);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);
  if (hide) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999, background: C.bg,
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: done ? 0 : 1, transition: "opacity 0.55s ease",
      pointerEvents: done ? "none" : "auto",
    }}>
      <div style={{ textAlign: "center" }}>
        <p style={{ ...display, fontSize: 30, color: C.text, margin: 0, letterSpacing: "0.02em" }}>
          PRIYANSHU<span style={{ color: C.green }}>.</span>
        </p>
        <div style={{ width: 120, height: 2, background: C.line, marginTop: 16, borderRadius: 2, overflow: "hidden" }}>
          <div style={{ height: "100%", background: C.green, animation: "loaderBar 0.85s ease forwards" }} />
        </div>
      </div>
    </div>
  );
}

function ScrollProgress({ C }) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (scrolled / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 200, background: "transparent" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: C.green, transition: "width 0.1s linear" }} />
    </div>
  );
}

function CustomCursor({ C }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return undefined;
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
    const move = (e) => {
      mouseX = e.clientX; mouseY = e.clientY;
      if (dotRef.current) { dotRef.current.style.left = `${mouseX}px`; dotRef.current.style.top = `${mouseY}px`; }
      const target = e.target;
      const isInteractive = target.closest && target.closest("a, button, input, textarea");
      if (ringRef.current) ringRef.current.style.transform = `translate(-50%, -50%) scale(${isInteractive ? 1.8 : 1})`;
    };
    let raf;
    const tick = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) { ringRef.current.style.left = `${ringX}px`; ringRef.current.style.top = `${ringY}px`; }
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return null;
  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" style={{ background: C.green }} />
      <div ref={ringRef} className="custom-cursor-ring" style={{ borderColor: C.green }} />
    </>
  );
}

function CodingProfile({ C, mono, display }) {
  const [lc, setLc] = useState({ status: "loading", solved: null, ranking: null });

  useEffect(() => {
    let cancelled = false;
    fetch("https://leetcode-stats-api.herokuapp.com/priynshu30")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data && data.totalSolved) {
          setLc({ status: "ok", solved: data.totalSolved, ranking: data.ranking });
        } else {
          setLc({ status: "fallback", solved: 250, ranking: null });
        }
      })
      .catch(() => { if (!cancelled) setLc({ status: "fallback", solved: 250, ranking: null }); });
    return () => { cancelled = true; };
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
      <div style={{ background: C.bgCard, border: `1px solid ${C.line}`, borderRadius: 16, padding: 26 }}>
        <p style={{ ...mono, fontSize: 12, color: C.green, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>LeetCode</p>
        {lc.status === "loading" ? (
          <p style={{ color: C.textFaint, fontSize: 13 }}>Fetching live stats…</p>
        ) : (
          <>
            <p style={{ ...display, fontSize: 40, color: C.text, margin: "0 0 4px" }}>{lc.solved}+</p>
            <p style={{ color: C.textSoft, fontSize: 13, margin: 0 }}>
              Problems solved{lc.ranking ? ` · Global rank ${lc.ranking.toLocaleString()}` : ""}
            </p>
            <p style={{ color: C.textFaint, fontSize: 12, margin: "10px 0 0" }}>
              Arrays · Strings · Trees · DP · Graphs · Sliding Window
            </p>
          </>
        )}
        <a href="https://leetcode.com/u/priynshu30" target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 16, fontSize: 12, color: C.green, textDecoration: "none", borderBottom: `1px solid ${C.green}` }}>
          View profile →
        </a>
      </div>

      <div style={{ background: C.bgCard, border: `1px solid ${C.line}`, borderRadius: 16, padding: 26 }}>
        <p style={{ ...mono, fontSize: 12, color: C.green, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>GitHub</p>
        <img
          src="https://github-readme-stats.vercel.app/api?username=octocat&show_icons=true&theme=transparent&hide_border=true&title_color=2FE6A4&icon_color=2FE6A4&text_color=A3A3A0"
          alt="GitHub stats"
          style={{ width: "100%", maxWidth: 380, display: "block" }}
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <a href="https://github.com" target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 8, fontSize: 12, color: C.green, textDecoration: "none", borderBottom: `1px solid ${C.green}` }}>
          View GitHub →
        </a>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose, C, mono, display }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!project) return null;
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.6)",
        backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-pop"
        style={{
          background: C.bgCard, border: `1px solid ${C.line}`, borderRadius: 20,
          maxWidth: 560, width: "100%", maxHeight: "85vh", overflowY: "auto",
        }}
      >
        <div style={{
          height: 160, background: `linear-gradient(135deg, ${project.from} 0%, ${project.to} 100%)`,
          display: "flex", alignItems: "center", justifyContent: "space-between", padding: 24,
          borderRadius: "20px 20px 0 0",
        }}>
          <span style={{ ...display, fontSize: 40, color: "rgba(255,255,255,0.9)" }}>{project.name.slice(0, 2)}</span>
          <button onClick={onClose} aria-label="Close" style={{
            width: 36, height: 36, borderRadius: "50%", border: "none", background: "rgba(0,0,0,0.3)",
            color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
          }}>
            <X size={16} />
          </button>
        </div>
        <div style={{ padding: 28 }}>
          <span style={{ ...mono, fontSize: 11, color: C.green, background: C.greenDim, borderRadius: 999, padding: "5px 12px" }}>{project.category}</span>
          <h3 style={{ fontSize: 26, fontWeight: 600, margin: "16px 0 12px", color: C.text }}>{project.name}</h3>
          <p style={{ color: C.textSoft, fontSize: 14.5, lineHeight: 1.75, margin: "0 0 20px" }}>{project.long}</p>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {project.tags.map((t) => (
              <span key={t} style={{ ...mono, fontSize: 11, color: C.text, border: `1px solid ${C.line}`, borderRadius: 999, padding: "6px 12px" }}>{t}</span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <a href={project.github} target="_blank" rel="noreferrer" style={{
              display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500,
              border: `1px solid ${C.line}`, borderRadius: 999, padding: "10px 18px", color: C.text, textDecoration: "none",
            }}>
              <Github size={15} /> Source Code
            </a>
            <a href={project.live} target="_blank" rel="noreferrer" style={{
              display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600,
              background: C.green, borderRadius: 999, padding: "10px 18px", color: "#04231A", textDecoration: "none",
            }}>
              <ExternalLink size={15} /> Live Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function CodeMock() {
  return (
    <svg viewBox="0 0 520 420" width="100%" style={{ maxWidth: 520, overflow: "visible" }}>
      <defs>
        <linearGradient id="pedestal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#232323" />
          <stop offset="100%" stopColor="#0d0d0d" />
        </linearGradient>
        <linearGradient id="laptop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="100%" stopColor="#141414" />
        </linearGradient>
        <linearGradient id="scanGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2FE6A4" stopOpacity="0" />
          <stop offset="50%" stopColor="#2FE6A4" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#2FE6A4" stopOpacity="0" />
        </linearGradient>
        <clipPath id="panelClip">
          <rect x="0" y="0" width="340" height="230" rx="14" />
        </clipPath>
      </defs>
      <polygon points="60,340 460,340 520,410 0,410" fill="url(#pedestal)" />
      <polygon points="120,300 400,300 460,340 60,340" fill="url(#laptop)" />
      <rect x="120" y="292" width="280" height="10" rx="3" fill="#050505" />
      <g transform="translate(90,40)">
        <rect x="0" y="0" width="340" height="230" rx="14" fill="#111214" stroke="rgba(255,255,255,0.08)" />
        <g clipPath="url(#panelClip)">
          <rect className="scan-line" x="0" y="-60" width="340" height="60" fill="url(#scanGrad)" />
        </g>
        <circle cx="22" cy="22" r="5" fill="#F55" opacity="0.7" />
        <circle cx="40" cy="22" r="5" fill="#FB5" opacity="0.7" />
        <circle cx="58" cy="22" r="5" fill="#2FE6A4" opacity="0.9" />
        <g fontFamily="'JetBrains Mono', monospace" fontSize="11">
          <text x="22" y="52" fill="#7C7C7C">const</text>
          <text x="66" y="52" fill="#2FE6A4">App</text>
          <text x="98" y="52" fill="#7C7C7C">= () =&gt; {"{"}</text>
          <text x="38" y="72" fill="#8FA6FF">useState</text>
          <text x="100" y="72" fill="#7C7C7C">(true)</text>
          <text x="38" y="92" fill="#7C7C7C">return (</text>
          <text x="54" y="112" fill="#2FE6A4">&lt;div</text>
          <text x="90" y="112" fill="#D9B36C"> className</text>
          <text x="160" y="112" fill="#7C7C7C">=</text>
          <text x="168" y="112" fill="#E38C8C">"app"</text>
          <text x="70" y="132" fill="#2FE6A4">&lt;Header /&gt;</text>
          <text x="70" y="152" fill="#2FE6A4">&lt;Main /&gt;</text>
          <text x="54" y="172" fill="#2FE6A4">&lt;/div&gt;</text>
          <text x="38" y="192" fill="#7C7C7C">)</text>
          <text x="22" y="212" fill="#7C7C7C">{"}"}</text>
        </g>
        <rect x="22" y="222" width="2" height="14" fill="#2FE6A4" opacity="0.9" className="code-cursor" />
      </g>
    </svg>
  );
}

function botReply(input) {
  const q = input.toLowerCase();
  if (/(skill|tech|stack|know|use)/.test(q)) {
    return `I mainly work with ${SKILLS.slice(0, 7).map((s) => s.name).join(", ")} — the MERN stack end to end.`;
  }
  if (/(project|work|built|portfolio)/.test(q)) {
    return `A few things I've built: ${PROJECTS.map((p) => p.name).join(", ")}. Scroll down to Projects for details, or ask me about a specific one.`;
  }
  if (/(experience|worked|job|career|intern)/.test(q)) {
    return `I'm currently a ${EXPERIENCE[0].role} at ${EXPERIENCE[0].org}. I also mentored 20+ peers as a ${EXPERIENCE[1].role} at ${EXPERIENCE[1].org}.`;
  }
  if (/(education|degree|qualification|college|mca|study)/.test(q)) {
    return `I'm pursuing my ${EDUCATION[0].degree} from ${EDUCATION[0].org} (${EDUCATION[0].year}), and hold a ${EDUCATION[1].degree} from ${EDUCATION[1].org}.`;
  }
  if (/(certif|nielit|almabetter)/.test(q)) {
    return `Certifications: ${CERTIFICATIONS.join(" · ")}.`;
  }
  if (/(award|achievement|recognition)/.test(q)) {
    return `${AWARDS[0]}.`;
  }
  if (/(leetcode|dsa|coding|problem)/.test(q)) {
    return "I've solved 250+ problems on LeetCode across Arrays, Strings, Trees, DP, Graphs, and Sliding Window — check my profile via the LeetCode icon in Contact.";
  }
  if (/(contact|email|hire|reach|talk|connect|phone)/.test(q)) {
    return "You can reach me at priyanshukumarr444@gmail.com or +91-9012965152, or hit the Contact Me button up top.";
  }
  if (/(hi|hello|hey|hola)/.test(q)) {
    return "Hey! 👋 Ask me about my skills, projects, experience, or education — or just say hi to my resume.";
  }
  if (/(cv|resume|download)/.test(q)) {
    return "You can grab my resume from the 'Download CV' button in the top nav.";
  }
  if (/(thank|thanks)/.test(q)) {
    return "Anytime! Let me know if there's anything else you'd like to know.";
  }
  return "I'm a simple demo bot for now — try asking about skills, projects, experience, education, or how to get in touch.";
}

const TERMINAL_COMMANDS = {
  help: "Available commands: whoami, skills, projects, experience, education, contact, sudo hire-me, clear",
  whoami: "Priyanshu Kumar — MERN Stack Developer based in Agra, UP, India.",
  skills: SKILLS.map((s) => s.name).join(", "),
  projects: PROJECTS.map((p) => `${p.name} (${p.category})`).join(", "),
  experience: EXPERIENCE.map((e) => `${e.role} @ ${e.org}`).join(" | "),
  education: EDUCATION.map((e) => `${e.degree} — ${e.org}`).join(" | "),
  contact: "priyanshukumarr444@gmail.com · +91-9012965152 · Agra, UP, India",
  "sudo hire-me": "Permission granted. ✅ Opening contact form... scroll down to 'Contact Me' or email priyanshukumarr444@gmail.com",
  leetcode: "250+ problems solved. Profile: leetcode.com/u/priynshu30",
};

function Terminal({ C, mono, open, onClose }) {
  const [lines, setLines] = useState([
    { type: "out", text: "Welcome to priyanshu@portfolio ~ %  Type 'help' to get started." },
  ]);
  const [cmd, setCmd] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ block: "end" });
  }, [lines]);
  useEffect(() => {
    if (open && inputRef.current) setTimeout(() => inputRef.current.focus(), 100);
  }, [open]);

  const run = (raw) => {
    const key = raw.trim().toLowerCase();
    if (!key) return;
    let out;
    if (key === "clear") {
      setLines([]);
      return;
    } else if (TERMINAL_COMMANDS[key]) {
      out = TERMINAL_COMMANDS[key];
    } else {
      out = `command not found: ${key} — type 'help' for a list of commands`;
    }
    setLines((l) => [...l, { type: "in", text: raw }, { type: "out", text: out }]);
  };

  const handleKey = (e) => {
    if (e.key === "Enter") { run(cmd); setCmd(""); }
  };

  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.65)",
        backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-pop"
        style={{
          width: "100%", maxWidth: 640, height: 420, background: "#0D0F0E", borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden", display: "flex", flexDirection: "column",
          boxShadow: "0 40px 80px -20px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#F55" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#FB5" }} />
          <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#2FE6A4" }} />
          <span style={{ ...mono, fontSize: 12, color: "#8B8D89", marginLeft: 10 }}>priyanshu@portfolio — zsh</span>
        </div>
        <div
          onClick={() => inputRef.current && inputRef.current.focus()}
          style={{ flex: 1, overflowY: "auto", padding: "16px 18px", ...mono, fontSize: 13, lineHeight: 1.7 }}
        >
          {lines.map((l, i) => (
            <div key={i} style={{ color: l.type === "in" ? "#F5F5F3" : "#2FE6A4", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {l.type === "in" ? `❯ ${l.text}` : l.text}
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#F5F5F3" }}>
            <span style={{ color: "#2FE6A4" }}>❯</span>
            <input
              ref={inputRef}
              value={cmd}
              onChange={(e) => setCmd(e.target.value)}
              onKeyDown={handleKey}
              autoFocus
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                color: "#F5F5F3", ...mono, fontSize: 13,
              }}
            />
            <span className="code-cursor" style={{ width: 7, height: 14, background: "#2FE6A4", display: "inline-block" }} />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}

function ChatBot({ C, mono, display }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm Priyanshu's portfolio assistant. Ask me about skills, projects, experience, or education." },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing, open]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: botReply(text) }]);
      setTyping(false);
    }, 650);
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat"
        style={{
          position: "fixed", bottom: 26, right: 26, zIndex: 100,
          width: 56, height: 56, borderRadius: "50%", border: "none", cursor: "pointer",
          background: C.green, color: "#04231A",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 10px 30px -8px rgba(47,230,164,0.55)",
          transition: "transform 0.25s ease",
        }}
        className="chat-fab"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      <div
        style={{
          position: "fixed", bottom: 96, right: 26, zIndex: 100,
          width: 340, maxWidth: "calc(100vw - 40px)", height: 460, maxHeight: "calc(100vh - 140px)",
          background: C.bgCard, border: `1px solid ${C.line}`, borderRadius: 18,
          display: "flex", flexDirection: "column", overflow: "hidden",
          boxShadow: "0 30px 60px -20px rgba(0,0,0,0.5)",
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(16px) scale(0.96)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease, transform 0.25s ease",
        }}
      >
        <div style={{ padding: "16px 18px", borderBottom: `1px solid ${C.line}`, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: C.greenDim, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <MessageCircle size={15} style={{ color: C.green }} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: C.text }}>Portfolio Assistant</p>
            <p style={{ margin: 0, fontSize: 11, color: C.green }}>● Online</p>
          </div>
        </div>

        <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "16px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "80%", padding: "10px 14px", borderRadius: 14,
                borderBottomRightRadius: m.from === "user" ? 4 : 14,
                borderBottomLeftRadius: m.from === "bot" ? 4 : 14,
                background: m.from === "user" ? C.green : C.bgCard2,
                color: m.from === "user" ? "#04231A" : C.text,
                fontSize: 13.5, lineHeight: 1.5,
              }}>
                {m.text}
              </div>
            </div>
          ))}
          {typing && (
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <div style={{ padding: "10px 14px", borderRadius: 14, borderBottomLeftRadius: 4, background: C.bgCard2, display: "flex", gap: 4 }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} className="dot-bounce" style={{ width: 5, height: 5, borderRadius: "50%", background: C.textFaint, animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: 12, borderTop: `1px solid ${C.line}`, display: "flex", gap: 8 }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask something..."
            style={{
              flex: 1, background: C.bg, border: `1px solid ${C.line}`, borderRadius: 999,
              padding: "10px 16px", color: C.text, fontSize: 13, outline: "none",
            }}
          />
          <button
            onClick={send}
            aria-label="Send"
            style={{
              width: 38, height: 38, borderRadius: "50%", border: "none", cursor: "pointer",
              background: C.green, color: "#04231A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </>
  );
}

function ContactForm({ C, mono }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message can't be empty";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!validate()) return;
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/priyanshukumarr444@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `New portfolio message from ${form.name}`,
        }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  const fieldStyle = {
    width: "100%", background: C.bg, border: `1px solid ${C.line}`, borderRadius: 12,
    padding: "13px 16px", color: C.text, fontSize: 14, outline: "none",
    fontFamily: "inherit", transition: "border-color 0.25s ease",
  };

  if (status === "sent") {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <p style={{ fontSize: 32, marginBottom: 12 }}>✅</p>
        <h3 style={{ fontSize: 20, fontWeight: 600, margin: "0 0 8px" }}>Message sent!</h3>
        <p style={{ color: C.textSoft, fontSize: 14 }}>Thanks for reaching out — I'll get back to you soon.</p>
        <button
          onClick={() => setStatus("idle")}
          style={{ marginTop: 20, background: "transparent", border: `1px solid ${C.line}`, borderRadius: 999, padding: "10px 22px", color: C.text, fontSize: 13, cursor: "pointer" }}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }} noValidate>
      <div>
        <input
          placeholder="Your name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ ...fieldStyle, borderColor: errors.name ? "#E38C8C" : C.line }}
        />
        {errors.name && <p style={{ color: "#E38C8C", fontSize: 12, margin: "6px 0 0" }}>{errors.name}</p>}
      </div>
      <div>
        <input
          placeholder="Your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          style={{ ...fieldStyle, borderColor: errors.email ? "#E38C8C" : C.line }}
        />
        {errors.email && <p style={{ color: "#E38C8C", fontSize: 12, margin: "6px 0 0" }}>{errors.email}</p>}
      </div>
      <div>
        <textarea
          placeholder="Your message"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          style={{ ...fieldStyle, resize: "vertical", borderColor: errors.message ? "#E38C8C" : C.line }}
        />
        {errors.message && <p style={{ color: "#E38C8C", fontSize: 12, margin: "6px 0 0" }}>{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        style={{
          background: C.green, color: "#04231A", fontWeight: 600, fontSize: 14,
          padding: "14px 28px", borderRadius: 999, border: "none", cursor: status === "sending" ? "wait" : "pointer",
          opacity: status === "sending" ? 0.7 : 1, transition: "opacity 0.2s ease",
        }}
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
      {status === "error" && (
        <p style={{ color: "#E38C8C", fontSize: 13, textAlign: "center" }}>
          Something went wrong — please email me directly instead.
        </p>
      )}
    </form>
  );
}

export default function Portfolio2() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [heroIn, setHeroIn] = useState(false);
  const [theme, setTheme] = useState("dark");
  const C = theme === "dark" ? DARK : LIGHT;
  const [projectFilter, setProjectFilter] = useState("All");
  const [activeProject, setActiveProject] = useState(null);
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    document.title = "Priyanshu Kumar — MERN Stack Developer";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.name = "description"; document.head.appendChild(meta); }
    meta.content = "Priyanshu Kumar — MERN Stack Developer portfolio. React, Node.js, Express, MongoDB projects, experience & education.";
    const link = document.createElement("link");
    link.href = FONT_LINK;
    link.rel = "stylesheet";
    document.head.appendChild(link);
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setScrollY(y);
    };
    window.addEventListener("scroll", onScroll);
    const t = setTimeout(() => setHeroIn(true), 120);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); document.head.removeChild(link); };
  }, []);

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMockTilt = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 14 });
  };
  const resetMockTilt = () => setTilt({ x: 0, y: 0 });

  const handleCardTilt = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${py * -8}deg) rotateY(${px * 8}deg) translateY(-8px)`;
  };
  const resetCardTilt = (e) => {
    e.currentTarget.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  };

  const display = { fontFamily: "'Anton', sans-serif" };
  const mono = { fontFamily: "'JetBrains Mono', monospace" };
  const sans = { fontFamily: "'Inter', sans-serif" };

  const navLinks = ["About Me", "Experience", "Education", "Projects", "Contact Me"];

  return (
    <div className="portfolio-root" style={{ background: C.bg, color: C.text, minHeight: "100vh", transition: "background 0.35s ease, color 0.35s ease", ...sans }}>
      <PageLoader C={C} display={display} />
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", zIndex: -1, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", width: 420, height: 420, borderRadius: "50%",
          background: C.green, filter: "blur(120px)", opacity: 0.08,
          top: 200, left: "8%", transform: `translateY(${scrollY * 0.15}px)`,
        }} />
        <div style={{
          position: "absolute", width: 340, height: 340, borderRadius: "50%",
          background: "#8FA6FF", filter: "blur(110px)", opacity: 0.06,
          top: 1000, right: "5%", transform: `translateY(${scrollY * -0.1}px)`,
        }} />
        <div style={{
          position: "absolute", width: 380, height: 380, borderRadius: "50%",
          background: C.green, filter: "blur(130px)", opacity: 0.06,
          top: 2200, left: "15%", transform: `translateY(${scrollY * 0.08}px)`,
        }} />
      </div>
      <ScrollProgress C={C} />
      <CustomCursor C={C} />
      {/* NAV */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(10,10,10,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.line}` : "1px solid transparent",
        transition: "all 0.35s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "22px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#top" style={{ fontSize: 20, fontWeight: 700, color: C.text, textDecoration: "none" }}>Priyanshu<span style={{ color: C.green }}>.</span></a>
          <nav style={{ display: "none", gap: 32 }} className="dnav">
            {navLinks.map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/\s/g, "")}`} style={{ fontSize: 14, color: C.textSoft, textDecoration: "none" }}>{l}</a>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <button
              onClick={() => setTerminalOpen(true)}
              aria-label="Open terminal"
              title="Open terminal"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 38, height: 38, borderRadius: "50%", border: `1px solid ${C.line}`,
                background: "transparent", color: C.green, cursor: "pointer",
              }}
            >
              <TerminalIcon size={15} />
            </button>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 38, height: 38, borderRadius: "50%", border: `1px solid ${C.line}`,
                background: "transparent", color: C.text, cursor: "pointer",
              }}
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <a href="#" className="cta-desktop" style={{
              display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500,
              border: `1px solid ${C.line}`, borderRadius: 999, padding: "10px 20px", color: C.text, textDecoration: "none",
            }}>
              <Download size={14} /> Download CV
            </a>
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              className="hamburger-btn"
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 38, height: 38, borderRadius: "50%", border: `1px solid ${C.line}`,
                background: "transparent", color: C.text, cursor: "pointer",
              }}
            >
              {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>

        <div className="mobile-menu" style={{
          maxHeight: mobileMenuOpen ? 340 : 0,
          opacity: mobileMenuOpen ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease, opacity 0.3s ease",
          background: C.bg,
          borderTop: mobileMenuOpen ? `1px solid ${C.line}` : "1px solid transparent",
        }}>
          <nav style={{ display: "flex", flexDirection: "column", padding: "8px 32px 24px" }}>
            {navLinks.map((l, i) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/\s/g, "")}`}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  fontSize: 16, color: C.text, textDecoration: "none",
                  padding: "14px 0", borderBottom: i === navLinks.length - 1 ? "none" : `1px solid ${C.line}`,
                }}
              >
                {l}
              </a>
            ))}
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                fontSize: 14, fontWeight: 600, color: "#04231A", background: C.green,
                borderRadius: 999, padding: "13px 20px", textDecoration: "none", marginTop: 18,
              }}
            >
              <Download size={14} /> Download CV
            </a>
          </nav>
        </div>
      </header>

      <main>

      {/* HERO */}
      <section id="top" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 32px 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 80% 30%, ${C.greenDim}, transparent 45%)` }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr", gap: 40, position: "relative" }} className="hero-grid">
          <div style={{
            opacity: heroIn ? 1 : 0, transform: heroIn ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
          }}>
            <p style={{ color: C.green, fontSize: 15, fontWeight: 500, marginBottom: 18 }}>Hi, I am Priyanshu Kumar</p>
            <h1 style={{ ...display, fontSize: "clamp(38px, 6vw, 68px)", lineHeight: 1.02, letterSpacing: "0.01em", margin: "0 0 24px", textTransform: "uppercase" }}>
              MERN Stack<br /><span style={{ color: "#7C7C78" }}>Developer</span>
            </h1>
            <p style={{ color: C.textSoft, fontSize: 15, lineHeight: 1.7, maxWidth: 460, margin: "0 0 12px" }}>
              I build full-stack web apps with React, TypeScript, Node.js, Express &amp; MongoDB.
              Currently a MERN Stack Developer Intern at Corporate Finance Institute, and I've
              solved 250+ problems on LeetCode along the way.
            </p>
            <p style={{ ...mono, color: C.textFaint, fontSize: 12, margin: "0 0 32px", display: "flex", alignItems: "center", gap: 6 }}>
              <MapPin size={13} /> Agra, UP, India
            </p>
            <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <a href="#contactme" style={{
                background: C.green, color: "#04231A", fontWeight: 600, fontSize: 14,
                padding: "14px 28px", borderRadius: 999, textDecoration: "none",
              }}>Contact Me</a>
              <div style={{ display: "flex", gap: 14 }}>
                {[[Github, SOCIAL_LINKS.github], [Linkedin, SOCIAL_LINKS.linkedin], [Code2, SOCIAL_LINKS.leetcode]].map(([Icon, href], i) => (
                  <a key={i} href={href} target="_blank" rel="noreferrer" style={{ color: C.textSoft, border: `1px solid ${C.line}`, borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
            <button
              onClick={() => setTerminalOpen(true)}
              className="terminal-hint"
              style={{
                ...mono, fontSize: 12, color: C.textFaint, background: "transparent", border: "none",
                cursor: "pointer", marginTop: 22, display: "flex", alignItems: "center", gap: 6, padding: 0,
              }}
            >
              <TerminalIcon size={13} style={{ color: C.green }} /> psst — try my terminal <span style={{ color: C.green }}>❯_</span>
            </button>
          </div>
          <div style={{
            display: "flex", justifyContent: "center", alignItems: "center",
            opacity: heroIn ? 1 : 0, transform: heroIn ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1.1s ease 0.15s, transform 1.1s ease 0.15s",
          }}>
            <div
              onMouseMove={handleMockTilt}
              onMouseLeave={resetMockTilt}
              style={{
                opacity: Math.max(1 - scrollY / 480, 0),
                transform: `translateY(${scrollY * 0.35}px) scale(${Math.max(1 - scrollY / 2200, 0.85)}) rotate(${scrollY * 0.02}deg) perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: "transform 0.25s ease-out, opacity 0.05s linear",
                willChange: "transform, opacity",
              }}
            >
              <div className="float-mock" style={{ position: "relative" }}>
                <div className="glow-pulse" style={{
                  position: "absolute", inset: "10% 5%", background: C.green,
                  filter: "blur(60px)", opacity: 0.18, borderRadius: "50%", zIndex: -1,
                }} />
                <CodeMock />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Marquee items={["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Redux Toolkit", "Tailwind CSS", "JWT Auth", "REST APIs"]} C={C} mono={mono} />

      {/* ABOUT */}
      <section id="aboutme" style={{ padding: "100px 32px", borderTop: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr", gap: 48 }} className="about-grid">
          <Reveal>
          <div>
            <p style={{ color: C.green, fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>About Me</p>
            <h2 style={{ ...display, fontSize: "clamp(28px, 4vw, 40px)", textTransform: "uppercase", margin: "0 0 20px", lineHeight: 1.1 }}>
              Full-stack, <span style={{ color: C.green }}>from DB to UI</span>
            </h2>
            <p style={{ color: C.textSoft, fontSize: 15, lineHeight: 1.8, maxWidth: 520 }}>
              MERN Stack Developer with hands-on experience building 3+ full-stack web
              applications using React.js, TypeScript, Node.js, Express.js and MongoDB.
              Currently interning at Corporate Finance Institute (CFI), contributing to REST
              API development and responsive UI features. Proficient in JWT authentication,
              Redux Toolkit, and responsive UI development — with 250+ LeetCode problems
              solved along the way. Pursuing MCA from Lovely Professional University.
            </p>
            <div style={{ display: "flex", gap: 36, marginTop: 36, flexWrap: "wrap" }}>
              {[
                { to: 3, suffix: "+", label: "Projects shipped" },
                { to: 250, suffix: "+", label: "LeetCode solved" },
                { to: 20, suffix: "+", label: "Peers mentored" },
                { to: 10, suffix: "+", label: "REST APIs built" },
              ].map((s) => (
                <div key={s.label}>
                  <p style={{ ...display, fontSize: 34, color: C.green, margin: 0 }}>
                    <Counter to={s.to} suffix={s.suffix} />
                  </p>
                  <p style={{ ...mono, fontSize: 11, color: C.textFaint, margin: "4px 0 0" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          </Reveal>
          <Reveal delay={0.15}>
          <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 12, marginBottom: 32 }}>
            {SKILLS.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.name} className="skill-chip" style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                  background: C.bgCard, border: `1px solid ${C.line}`, borderRadius: 14, padding: "18px 10px",
                  textAlign: "center",
                }}>
                  <div className="skill-icon-wrap skill-idle" style={{
                    width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${s.color}1A`, animationDelay: `${(i % 6) * 0.25}s`,
                  }}>
                    <Icon size={19} className="skill-icon" style={{ color: s.color }} />
                  </div>
                  <span style={{ ...mono, fontSize: 11, color: C.textSoft, lineHeight: 1.3 }}>{s.name}</span>
                </div>
              );
            })}
          </div>
          <div style={{ background: C.bgCard, border: `1px solid ${C.line}`, borderRadius: 16, padding: "16px 8px" }}>
            <p style={{ ...mono, fontSize: 11, color: C.textFaint, textTransform: "uppercase", letterSpacing: "0.06em", padding: "0 16px", marginBottom: 4 }}>Proficiency</p>
            <ResponsiveContainer width="100%" height={230}>
              <RadarChart data={PROFICIENCY} outerRadius="70%">
                <PolarGrid stroke={C.line} />
                <PolarAngleAxis dataKey="subject" tick={{ fill: C.textSoft, fontSize: 11, fontFamily: "Inter" }} />
                <Radar dataKey="value" stroke={C.green} fill={C.green} fillOpacity={0.28} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          </div>
          </Reveal>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "100px 32px", background: C.bgCard, borderTop: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ color: C.green, fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Experience</p>
          <h2 style={{ ...display, fontSize: "clamp(28px, 4vw, 40px)", textTransform: "uppercase", margin: "0 0 48px" }}>Where I've worked</h2>
          <ScrollTimeline C={C}>
            {EXPERIENCE.map((e, i) => (
              <Reveal key={e.role} delay={i * 0.1}>
                <div style={{
                  position: "relative", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12,
                  padding: "26px 0 26px 20px", borderTop: i === 0 ? "none" : `1px solid ${C.line}`,
                }}>
                  <span style={{
                    position: "absolute", left: -30, top: 30, width: 10, height: 10, borderRadius: "50%",
                    background: C.green, boxShadow: `0 0 0 4px ${C.bgCard}`,
                  }} />
                  <div style={{ maxWidth: 560 }}>
                    <h3 style={{ fontSize: 19, fontWeight: 600, margin: 0 }}>{e.role}</h3>
                    <p style={{ color: C.green, fontSize: 13, margin: "4px 0 8px" }}>{e.org}</p>
                    <p style={{ color: C.textSoft, fontSize: 13.5, lineHeight: 1.6, margin: 0 }}>{e.desc}</p>
                  </div>
                  <span style={{ ...mono, fontSize: 12, color: C.textFaint, whiteSpace: "nowrap" }}>{e.year}</span>
                </div>
              </Reveal>
            ))}
          </ScrollTimeline>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" style={{ padding: "100px 32px", borderTop: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ color: C.green, fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Education</p>
          <h2 style={{ ...display, fontSize: "clamp(28px, 4vw, 40px)", textTransform: "uppercase", margin: "0 0 48px" }}>Qualification</h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20, marginBottom: 56 }}>
            {EDUCATION.map((ed, i) => (
              <Reveal key={ed.degree} delay={i * 0.1}>
                <div className="edu-card" onMouseMove={handleCardTilt} onMouseLeave={resetCardTilt} style={{
                  background: C.bgCard, border: `1px solid ${C.line}`, borderRadius: 16, padding: 26, height: "100%",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: C.greenDim, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <GraduationCap size={17} style={{ color: C.green }} />
                    </div>
                    <span style={{ ...mono, fontSize: 11, color: C.textFaint }}>{ed.year}</span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, margin: "0 0 6px", lineHeight: 1.3 }}>{ed.degree}</h3>
                  <p style={{ color: C.green, fontSize: 13, margin: "0 0 10px" }}>{ed.org}</p>
                  <p style={{ color: C.textSoft, fontSize: 13, lineHeight: 1.6, margin: 0 }}>{ed.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 40 }}>
            <Reveal delay={0.15}>
              <div>
                <p style={{ ...mono, fontSize: 12, color: C.green, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                  <Award size={14} /> Certifications
                </p>
                {CERTIFICATIONS.map((c) => (
                  <p key={c} style={{ color: C.textSoft, fontSize: 14, lineHeight: 1.8, margin: 0 }}>— {c}</p>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div>
                <p style={{ ...mono, fontSize: 12, color: C.green, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                  <Award size={14} /> Awards
                </p>
                {AWARDS.map((a) => (
                  <p key={a} style={{ color: C.textSoft, fontSize: 14, lineHeight: 1.8, margin: 0 }}>— {a}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "100px 32px", borderTop: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ color: C.green, fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Projects</p>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 36 }}>
            <h2 style={{ ...display, fontSize: "clamp(28px, 4vw, 40px)", textTransform: "uppercase", margin: 0 }}>Selected work</h2>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {["All", "Frontend", "Full-Stack"].map((f) => (
                <button
                  key={f}
                  onClick={() => setProjectFilter(f)}
                  style={{
                    ...mono, fontSize: 12, padding: "9px 18px", borderRadius: 999, cursor: "pointer",
                    border: `1px solid ${projectFilter === f ? C.green : C.line}`,
                    background: projectFilter === f ? C.greenDim : "transparent",
                    color: projectFilter === f ? C.green : C.textSoft,
                    transition: "all 0.25s ease",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {PROJECTS.filter((p) => projectFilter === "All" || p.category === projectFilter).map((p, i) => (
              <Reveal key={p.name} delay={i * 0.1}>
                <a href="#" className="proj-card" onMouseMove={handleCardTilt} onMouseLeave={resetCardTilt}
                  onClick={(e) => { e.preventDefault(); setActiveProject(p); }}
                  style={{
                  display: "block", background: C.bgCard, border: `1px solid ${C.line}`, borderRadius: 16,
                  overflow: "hidden", textDecoration: "none", color: C.text, position: "relative", cursor: "pointer",
                }}>
                  <div className="proj-banner" style={{
                    height: 140, background: `linear-gradient(135deg, ${p.from} 0%, ${p.to} 100%)`,
                    display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
                    overflow: "hidden",
                  }}>
                    <span className="proj-initials" style={{ ...display, fontSize: 44, color: "rgba(255,255,255,0.9)", textTransform: "uppercase" }}>
                      {p.name.slice(0, 2)}
                    </span>
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.12)" }} />
                    <span style={{ position: "absolute", top: 12, left: 12, ...mono, fontSize: 10, color: "#fff", background: "rgba(0,0,0,0.35)", borderRadius: 999, padding: "4px 10px" }}>{p.category}</span>
                    <div style={{ position: "absolute", top: 12, right: 12, display: "flex", gap: 8 }}>
                      <a
                        href={p.github} target="_blank" rel="noreferrer" aria-label="View on GitHub"
                        onClick={(e) => e.stopPropagation()}
                        style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}
                      >
                        <Github size={14} />
                      </a>
                      <a
                        href={p.live} target="_blank" rel="noreferrer" aria-label="View live demo"
                        onClick={(e) => e.stopPropagation()}
                        style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                  <div style={{ padding: 26 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                      <h3 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>{p.name}</h3>
                      <ArrowUpRight size={18} className="proj-arrow" style={{ color: C.green }} />
                    </div>
                    <p style={{ color: C.textSoft, fontSize: 14, lineHeight: 1.6, margin: "0 0 20px" }}>{p.desc}</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {p.tags.map((t) => (
                        <span key={t} style={{ ...mono, fontSize: 10, color: C.green, background: C.greenDim, borderRadius: 999, padding: "5px 10px" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CODING PROFILE */}
      <section id="coding" style={{ padding: "0 32px 100px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={{ color: C.green, fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Coding Profile</p>
          <h2 style={{ ...display, fontSize: "clamp(24px, 3.4vw, 34px)", textTransform: "uppercase", margin: "0 0 36px" }}>Stats &amp; problem solving</h2>
          <Reveal>
            <CodingProfile C={C} mono={mono} display={display} />
          </Reveal>
        </div>
      </section>



      {/* CONTACT */}
      <section id="contactme" style={{ padding: "120px 32px 60px", borderTop: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{ color: C.green, fontSize: 13, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Contact Me</p>
            <h2 style={{ ...display, fontSize: "clamp(32px, 6vw, 56px)", textTransform: "uppercase", margin: "0 0 24px" }}>
              Let's build<br /><span style={{ color: C.green }}>something great</span>
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 40 }} className="contact-grid">
            <Reveal>
              <div>
                <p style={{ color: C.textSoft, fontSize: 15, lineHeight: 1.8, marginBottom: 32, maxWidth: 380 }}>
                  Have a project in mind or just want to say hi? Fill out the form or reach me directly —
                  I usually reply within a day.
                </p>
                <a href="mailto:priyanshukumarr444@gmail.com" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: C.text, textDecoration: "none", marginBottom: 14 }}>
                  <Mail size={16} style={{ color: C.green }} /> priyanshukumarr444@gmail.com
                </a>
                <p style={{ ...mono, fontSize: 14, color: C.textSoft, display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <Phone size={16} style={{ color: C.green }} /> +91-9012965152
                </p>
                <p style={{ ...mono, fontSize: 14, color: C.textSoft, display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
                  <MapPin size={16} style={{ color: C.green }} /> Agra, UP, India
                </p>
                <div style={{ display: "flex", gap: 14 }}>
                  {[[Github, SOCIAL_LINKS.github], [Linkedin, SOCIAL_LINKS.linkedin], [Code2, SOCIAL_LINKS.leetcode]].map(([Icon, href], i) => (
                    <a key={i} href={href} target="_blank" rel="noreferrer" style={{ color: C.textSoft, border: `1px solid ${C.line}`, borderRadius: "50%", width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={17} />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div style={{ background: C.bgCard, border: `1px solid ${C.line}`, borderRadius: 18, padding: 32 }}>
                <ContactForm C={C} mono={mono} />
              </div>
            </Reveal>
          </div>

          <p style={{ ...mono, fontSize: 12, color: C.textFaint, marginTop: 80, textAlign: "center" }}>© 2026 Priyanshu Kumar — MERN Stack Developer</p>
        </div>
      </section>

      </main>

      <ChatBot C={C} mono={mono} display={display} />
      <Terminal C={C} mono={mono} open={terminalOpen} onClose={() => setTerminalOpen(false)} />
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} C={C} mono={mono} display={display} />

      <style>{`
        html { scroll-behavior: smooth; }
        section[id] { scroll-margin-top: 90px; }
        @keyframes loaderBar { from { width: 0%; } to { width: 100%; } }
        @keyframes modalPop { from { opacity: 0; transform: scale(0.94) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        .modal-pop { animation: modalPop 0.3s ease forwards; }

        .custom-cursor-dot {
          position: fixed; top: 0; left: 0; width: 6px; height: 6px; border-radius: 50%;
          transform: translate(-50%, -50%); pointer-events: none; z-index: 400;
        }
        .custom-cursor-ring {
          position: fixed; top: 0; left: 0; width: 32px; height: 32px; border-radius: 50%;
          border: 1px solid; transform: translate(-50%, -50%); pointer-events: none; z-index: 399;
          transition: transform 0.2s ease;
        }
        @media (pointer: coarse) {
          .custom-cursor-dot, .custom-cursor-ring { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
          .custom-cursor-dot, .custom-cursor-ring { display: none; }
        }

        .hamburger-btn { display: flex; }
        .cta-desktop { display: none; }
        .mobile-menu { display: block; }
        @media (min-width: 900px) {
          .dnav { display: flex !important; }
          .hamburger-btn { display: none !important; }
          .cta-desktop { display: flex !important; }
          .mobile-menu { display: none !important; }
          .hero-grid { grid-template-columns: 1.1fr 0.9fr !important; align-items: center; }
          .about-grid { grid-template-columns: 1fr 1fr !important; }
          .contact-grid { grid-template-columns: 0.9fr 1.1fr !important; align-items: start; }
        }
        .proj-card {
          transition: transform 0.25s ease-out, box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .proj-card:hover {
          border-color: rgba(47,230,164,0.5) !important;
          box-shadow: 0 20px 40px -20px rgba(47,230,164,0.25);
        }
        .proj-card::after, .edu-card::after {
          content: ""; position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(120deg, transparent 35%, rgba(255,255,255,0.16) 48%, transparent 62%);
          transform: translateX(-130%); transition: transform 0.7s ease;
        }
        .proj-card:hover::after, .edu-card:hover::after { transform: translateX(130%); }
        .proj-banner { transition: transform 0.5s ease; }
        .proj-card:hover .proj-banner { transform: scale(1.08); }
        .proj-initials { transition: transform 0.45s ease, opacity 0.45s ease; }
        .proj-card:hover .proj-initials { transform: scale(1.1) rotate(-2deg); }
        .proj-arrow { transition: transform 0.3s ease; }
        .proj-card:hover .proj-arrow { transform: translate(4px, -4px); }
        .edu-card { transition: transform 0.25s ease-out, border-color 0.3s ease, box-shadow 0.3s ease; }
        .edu-card:hover { border-color: rgba(47,230,164,0.4) !important; box-shadow: 0 16px 32px -18px rgba(47,230,164,0.2); }
        .float-mock { animation: floatBob 4.5s ease-in-out infinite; }
        @keyframes floatBob {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-14px) rotate(0.6deg); }
        }
        .code-cursor { animation: cursorBlink 1.1s step-end infinite; }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .glow-pulse { animation: glowPulse 4.5s ease-in-out infinite; }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.12; transform: scale(1); }
          50% { opacity: 0.24; transform: scale(1.08); }
        }
        .scan-line { animation: scanMove 3.2s ease-in-out infinite; }
        @keyframes scanMove {
          0% { transform: translateY(0); }
          100% { transform: translateY(290px); }
        }
        .skill-chip { transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease; }
        .skill-chip:hover { transform: translateY(-5px); border-color: rgba(47,230,164,0.45) !important; box-shadow: 0 12px 24px -14px rgba(47,230,164,0.3); }
        .skill-icon-wrap { transition: transform 0.4s cubic-bezier(.34,1.56,.64,1); }
        .skill-idle { animation: skillIdle 3.2s ease-in-out infinite; }
        .terminal-hint { transition: color 0.25s ease; }
        .terminal-hint:hover { color: #2FE6A4 !important; }
        .marquee-track { animation: marqueeScroll 22s linear infinite; }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track:hover { animation-play-state: paused; }
        @keyframes skillIdle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .skill-chip:hover .skill-icon-wrap { animation: none; transform: rotate(-14deg) scale(1.12); }
        .skill-icon { transition: transform 0.5s ease; }
        .skill-chip:hover .skill-icon { animation: skillBounce 0.6s ease; }
        @keyframes skillBounce {
          0%, 100% { transform: translateY(0) scale(1); }
          35% { transform: translateY(-3px) scale(1.15); }
          65% { transform: translateY(1px) scale(0.95); }
        }
        input:focus, textarea:focus { border-color: rgba(47,230,164,0.6) !important; box-shadow: 0 0 0 3px rgba(47,230,164,0.12); }
        button[type="submit"]:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 24px -10px rgba(47,230,164,0.5); }
        .chat-fab:hover { transform: scale(1.08); }
        .dot-bounce { display: inline-block; animation: dotBounce 1s infinite ease-in-out; }
        @keyframes dotBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        a { transition: opacity 0.2s ease; }
      `}</style>
    </div>
  );
}
