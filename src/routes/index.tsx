import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import {
  ArrowUpRight,
  ArrowRight,
  Circle,
  Cpu,
  Github,
  Linkedin,
  Mail,
  FileDown,
  MapPin,
  Wrench,
  Bot,
  Radio,
  CircuitBoard,
  Code2,
  Settings2,
} from "lucide-react";

import projJet from "@/assets/jet-automation-thumbnail.jpg";
import projRain from "@/assets/proj-rainsense.jpg";
import projIrrig from "@/assets/irrigation-thumbnail.jpg";
import projReson from "@/assets/resonance-pcb-green-thumbnail.jpg";
import projFpga from "@/assets/fpga-digital-design-thumbnail.jpg";
import projFallyx from "@/assets/fallyx-hardware-thumbnail.jpg";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

const PORTFOLIO_PATH = "/portfolio";


const EMAIL = "k3thamil@uwaterloo.ca";
const GITHUB = "https://drive.google.com/file/d/1xGZoO3jY5b8634wOs1cmYgjVwvwnlyT_/view?usp=sharing";
const LINKEDIN = "https://www.linkedin.com/in/karnan-thamilchelvan-594a0422b";

function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent text-foreground">
      {/* Ambient hero glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[1200px] -translate-x-1/2 rounded-full"
             style={{ background: "var(--gradient-glow)" }} />
      </div>


      <Header scrolled={scrolled} />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}

function Header({ scrolled }: { scrolled: boolean }) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-sm font-semibold tracking-tight">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary glow-ring">
            <Cpu className="h-4 w-4" />
          </span>
          <span>Karnan<span className="text-primary">.</span></span>
        </a>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`}
               className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
              {n.label}
            </a>
          ))}
          <Link to={PORTFOLIO_PATH}
             className="rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-secondary">
            Portfolio
          </Link>
        </nav>
        <a href="/Karnan_Thamilchelvan_Resume.pdf" target="_blank" rel="noreferrer" download
           className="hidden items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20 sm:inline-flex">

          <FileDown className="h-4 w-4" /> Resume
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden bg-transparent pt-32 pb-24 md:pt-44 md:pb-32">
      <div className="relative z-20 mx-auto max-w-7xl px-6">
        <div className="max-w-4xl">
          <div className="animate-slide-up mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for Fall 2026 internships
          </div>
          <h1 className="animate-nebula-shimmer relative font-display text-5xl font-semibold leading-[1.05] md:text-7xl lg:text-8xl">
            <svg
              aria-hidden="true"
              viewBox="0 0 800 220"
              preserveAspectRatio="none"
              className="pointer-events-none absolute -left-12 inset-y-0 z-0 h-full w-[calc(100%+3.5rem)] overflow-visible mix-blend-screen"
            >
              <defs>
                <linearGradient id="rocket-fire" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="6%"   stopColor="#fff7d0" stopOpacity="0.95" />
                  <stop offset="18%"  stopColor="#ffd24a" stopOpacity="0.9" />
                  <stop offset="38%"  stopColor="#ff8a1f" stopOpacity="0.8" />
                  <stop offset="58%"  stopColor="#ff6a00" stopOpacity="0.55" />
                  <stop offset="80%"  stopColor="#a01818" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#3a0606" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="rocket-fire-soft" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.5" />
                  <stop offset="18%"  stopColor="#ffd24a" stopOpacity="0.45" />
                  <stop offset="38%"  stopColor="#ff8a1f" stopOpacity="0.4" />
                  <stop offset="58%"  stopColor="#ff6a00" stopOpacity="0.27" />
                  <stop offset="100%" stopColor="#3a0606" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="nozzle-metal" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%"   stopColor="#475569" />
                  <stop offset="45%"  stopColor="#1e293b" />
                  <stop offset="70%"  stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
                <linearGradient id="raptor-alloy" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%"   stopColor="#64748b" />
                  <stop offset="35%"  stopColor="#1e293b" />
                  <stop offset="65%"  stopColor="#0b1220" />
                  <stop offset="100%" stopColor="#334155" />
                </linearGradient>
                <radialGradient id="raptor-copper" cx="50%" cy="50%" r="55%">
                  <stop offset="0%"   stopColor="#b45309" />
                  <stop offset="60%"  stopColor="#7c2d12" />
                  <stop offset="100%" stopColor="#1c0a05" />
                </radialGradient>
                <linearGradient id="raptor-shadow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#000000" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="manifold-pipe" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%"   stopColor="#94a3b8" />
                  <stop offset="50%"  stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
                <radialGradient id="turbopump-dome" cx="40%" cy="35%" r="65%">
                  <stop offset="0%"   stopColor="#64748b" />
                  <stop offset="55%"  stopColor="#334155" />
                  <stop offset="100%" stopColor="#0b1220" />
                </radialGradient>
                <filter id="exhaust-turbulence" x="-10%" y="-50%" width="120%" height="200%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.018 0.032"
                                numOctaves="2" seed="7" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="8"
                                     xChannelSelector="R" yChannelSelector="G" />
                </filter>
                <filter id="spark-jitter" x="-10%" y="-50%" width="120%" height="200%">
                  <feTurbulence type="fractalNoise" baseFrequency="0.04 0.06"
                                numOctaves="2" seed="11" result="snoise" />
                  <feDisplacementMap in="SourceGraphic" in2="snoise" scale="3"
                                     xChannelSelector="R" yChannelSelector="G" />
                </filter>
                <filter id="bloom" x="-20%" y="-50%" width="140%" height="200%">
                  <feGaussianBlur stdDeviation="8" />
                </filter>
              </defs>

              <g className="plume-group">
              {/* Atmospheric bloom underlay */}
              <g filter="url(#bloom)">
                <path
                  d="M 52 110 C 200 30, 420 18, 620 60 C 720 82, 780 100, 800 110 L 800 116 C 600 104, 360 96, 160 116 Z"
                  fill="url(#rocket-fire-soft)"
                  className="plume plume-bloom"
                />
                <path
                  d="M 52 110 C 200 190, 420 202, 620 160 C 720 138, 780 120, 800 112 L 800 106 C 600 118, 360 124, 160 104 Z"
                  fill="url(#rocket-fire-soft)"
                  className="plume plume-bloom"
                />
              </g>

              {/* Upper plume — over ascenders */}
              <path
                d="M 52 102 C 180 30, 380 28, 580 60 C 680 78, 760 92, 800 100 L 800 116 C 600 104, 340 94, 160 114 Z"
                fill="url(#rocket-fire)"
                filter="url(#exhaust-turbulence)"
                className="plume plume-upper"
              />
              {/* Lower plume — under descenders */}
              <path
                d="M 52 118 C 180 190, 380 192, 580 160 C 680 142, 760 128, 800 120 L 800 104 C 600 116, 340 126, 160 106 Z"
                fill="url(#rocket-fire)"
                filter="url(#exhaust-turbulence)"
                className="plume plume-lower"
              />
              {/* Merged hot core through the centerline */}
              <path
                d="M 52 108 C 220 92, 480 96, 760 108 L 760 114 C 480 122, 220 124, 52 116 Z"
                fill="url(#rocket-fire)"
                filter="url(#exhaust-turbulence)"
                className="plume plume-core"
              />

              {/* Spark licks crossing in front of letters */}
              <path
                d="M 80 110 C 220 96, 420 100, 680 108"
                stroke="#fff7d0" strokeWidth="1.2" fill="none" opacity="0.55"
                filter="url(#spark-jitter)"
                className="plume plume-spark"
              />

              {/* Throat flashes */}
              <circle cx="42" cy="101" r="6" fill="#ffffff" className="throat-flash" />
              <circle cx="42" cy="119" r="6" fill="#ffffff" className="throat-flash throat-flash-b" />
              </g>

              {/* Raptor 3 — single detailed engine silhouette */}
              <g className="nozzle raptor3">
                {/* L1: test-stand struts */}
                <rect x="2" y="54" width="10" height="4" fill="url(#nozzle-metal)" />
                <rect x="2" y="156" width="10" height="4" fill="url(#nozzle-metal)" />
                <line x1="2" y1="58" x2="14" y2="72" stroke="#475569" strokeWidth="1" />
                <line x1="2" y1="156" x2="14" y2="142" stroke="#475569" strokeWidth="1" />

                {/* L2: turbopump dome cluster */}
                <ellipse cx="22" cy="78" rx="14" ry="10" fill="url(#turbopump-dome)" stroke="#94a3b8" strokeWidth="0.8" />
                <ellipse cx="14" cy="92" rx="7" ry="6" fill="url(#turbopump-dome)" stroke="#94a3b8" strokeWidth="0.6" />
                <circle cx="22" cy="70" r="0.9" fill="#cbd5e1" />
                <circle cx="32" cy="78" r="0.9" fill="#cbd5e1" />
                <circle cx="14" cy="80" r="0.9" fill="#cbd5e1" />

                {/* L3: powerhead block */}
                <path
                  d="M 10 84 L 38 80 L 44 96 L 44 124 L 38 140 L 10 136 Z"
                  fill="url(#raptor-alloy)" stroke="#94a3b8" strokeWidth="1" strokeLinejoin="round"
                />
                <path
                  d="M 12 86 L 38 82 L 42 96 L 42 124 L 38 138 L 12 134 Z"
                  fill="url(#raptor-shadow)" opacity="0.5"
                />

                {/* L4: curved propellant manifold loop */}
                <path
                  d="M 8 88 C -4 102, -4 118, 8 132 L 14 128 C 6 118, 6 102, 14 92 Z"
                  fill="url(#manifold-pipe)" stroke="#0f172a" strokeWidth="0.8"
                />
                <path
                  d="M 16 86 C 26 70, 40 70, 46 88"
                  stroke="url(#manifold-pipe)" strokeWidth="4" fill="none" strokeLinecap="round"
                />
                <rect x="14" y="84" width="4" height="6" fill="url(#nozzle-metal)" />
                <rect x="44" y="84" width="4" height="6" fill="url(#nozzle-metal)" />

                {/* L5: regen-cooled flared bell */}
                <path
                  d="M 38 82 C 48 86, 58 94, 64 110 C 58 126, 48 134, 38 138 Z"
                  fill="url(#raptor-alloy)" stroke="#cbd5e1" strokeWidth="1.2" strokeLinejoin="round"
                />
                {/* regen channel ribs */}
                <line x1="44" y1="88" x2="44" y2="132" stroke="#0b1220" strokeWidth="0.5" opacity="0.6" />
                <line x1="48" y1="89" x2="48" y2="131" stroke="#0b1220" strokeWidth="0.5" opacity="0.6" />
                <line x1="52" y1="92" x2="52" y2="128" stroke="#0b1220" strokeWidth="0.5" opacity="0.6" />
                <line x1="56" y1="96" x2="56" y2="124" stroke="#0b1220" strokeWidth="0.5" opacity="0.6" />
                <line x1="60" y1="102" x2="60" y2="118" stroke="#0b1220" strokeWidth="0.5" opacity="0.6" />
                {/* hot inner lip */}
                <path
                  d="M 50 96 C 58 102, 62 110, 58 122 C 54 126, 50 124, 48 118 C 50 110, 50 102, 50 96 Z"
                  fill="url(#raptor-copper)" opacity="0.75"
                />
                {/* throat aperture */}
                <ellipse cx="42" cy="110" rx="3" ry="22" fill="#020617" />
                {/* L6: alloy rim specular */}
                <path
                  d="M 38 82 C 48 86, 58 94, 64 110 C 58 126, 48 134, 38 138"
                  fill="none" stroke="#e2e8f0" strokeWidth="0.6" opacity="0.7"
                />
              </g>

            </svg>
            <span className="name-heat-sync block">
              <span className="relative block overflow-hidden">
                <span className="inline-block animate-name-expand">Karnan</span>
              </span>
              <span className="relative block overflow-hidden">
                <span className="text-gradient inline-block animate-name-draw anim-delay-200">Thamilchelvan</span>
              </span>
            </span>
          </h1>
          <p className="animate-slide-up anim-delay-300 mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            4th Year Computer Engineering Student at the{" "}
            <span className="text-foreground">University of Waterloo</span>.
          </p>
          <p className="animate-slide-up anim-delay-450 mt-3 font-mono text-sm text-primary/90 md:text-base">
            Embedded Systems · Robotics · PCB Design · FPGA · Industrial Automation
          </p>
          <div className="animate-slide-up anim-delay-600 mt-10 flex flex-wrap gap-3">
            <a href="/Karnan_Thamilchelvan_Resume.pdf" target="_blank" rel="noreferrer" download
               className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all duration-300 ease-out hover:scale-105 hover:bg-cyan-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.95)]">
              <FileDown className="h-4 w-4" /> Resume
            </a>
            <Link to={PORTFOLIO_PATH}
               className="group inline-flex items-center gap-2 rounded-xl border border-cyan-400/50 bg-slate-900 px-5 py-3 text-sm font-semibold text-cyan-300 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-cyan-300 hover:text-cyan-200 hover:shadow-[0_0_25px_rgba(59,130,246,0.75)]">
              View Portfolio
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
            </Link>
            <a href={LINKEDIN} target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/40 px-5 py-3 text-sm font-medium text-slate-300 backdrop-blur transition-all duration-300 ease-out hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-200">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a href="#contact"
               className="inline-flex items-center gap-2 rounded-xl border border-slate-700/60 bg-slate-900/40 px-5 py-3 text-sm font-medium text-slate-300 backdrop-blur transition-all duration-300 ease-out hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-200">
              <Mail className="h-4 w-4" /> Contact
            </a>
          </div>

          <div className="animate-slide-up anim-delay-600 mt-16 max-w-2xl rounded-2xl border border-white/10 bg-slate-950/40 p-6 backdrop-blur-md">
            <div className="grid grid-cols-3 gap-6">
              <Stat value="50+" label="PCBs designed/fabricated" />
              <Stat value="5" label="Engineering co-ops" />
              <Stat value="40+" label="Custom Mechatronic Units Assembled" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-semibold text-foreground md:text-4xl">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground md:text-sm">{label}</div>
    </div>
  );
}

function SectionHeading({ kicker, title, children }: { kicker: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-14 max-w-3xl">
      <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
        <span className="h-px w-8 bg-primary/60" />
        {kicker}
      </div>
      <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-lg text-muted-foreground">{children}</p>}
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl scroll-mt-24 bg-transparent px-6 py-24">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <SectionHeading kicker="About" title="Building reliable hardware that solves real problems." />
      <div className="grid gap-10 md:grid-cols-3">
        <p className="text-lg leading-relaxed text-slate-300 md:col-span-2">
          I'm a 4th year Computer Engineering student who lives at the boundary of software and silicon —
          designing PCBs, writing firmware, integrating sensors, and bringing up systems
          end-to-end. From embedded medical wearables and IoT water-management platforms to
          industrial robot cells and FPGA digital hardware, I focus on engineering that ships:
          tested, documented, and built to survive the field. I move comfortably between
          STM32 and ESP32 firmware, EasyEDA and KiCad PCB layout, SolidWorks mechanical CAD,
          and Sysmac Studio / TMFlow for industrial automation.
        </p>
        <div className="space-y-3">
          {[
            { icon: CircuitBoard, label: "Embedded firmware & PCB design" },
            { icon: Bot, label: "Robotics & industrial automation" },
            { icon: Radio, label: "IoT systems & wireless protocols" },
            { icon: Cpu, label: "FPGA & digital hardware design" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 rounded-lg border border-slate-800/80 bg-slate-900/50 p-3 text-sm text-slate-200 backdrop-blur-md">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-cyan-500/10 text-cyan-300">
                <Icon className="h-4 w-4" />
              </span>
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const EXPERIENCE = [
  {
    role: "Robotics & Controls Designer",
    company: "Jet Automation",
    period: "2026",
    icon: Bot,
    bullets: [
      "Programmed an Omron TM12 collaborative robot in TMFlow for an automated packaging cell.",
      "Integrated PLC + HMI logic in Sysmac Studio, coordinating 4 sensors, robot I/O, and vacuum suction.",
      "Hit 10–15 second cycle times and led FAT testing, troubleshooting, and customer hand-off.",
    ],
    tags: ["Omron TM12", "TMFlow", "Sysmac Studio", "PLC/HMI"],
  },
  {
    role: "Hardware & Embedded Systems Intern",
    company: "University of Waterloo — IDEAs Clinic",
    period: "2025",
    icon: CircuitBoard,
    bullets: [
      "Designed the Mechatronic Resonance System around an Arduino UNO R4 WiFi for engineering education.",
      "Designed and assembled 50+ custom PCBs in EasyEDA — schematic, layout, sourcing, soldering, and bring-up.",
      "Modeled 220+ mechanical parts in SolidWorks and shipped 40 fully assembled lab units.",
      "Built FPGA exercises in Quartus to support digital-logic curriculum.",
    ],
    tags: ["Arduino", "EasyEDA", "SolidWorks", "Quartus"],
  },
  {
    role: "Hardware Engineer",
    company: "Ascenix (Formerly Fallyx)",
    period: "2024",
    icon: Radio,
    bullets: [
      "Developed ESP32-based fall-detection hardware for an IoT medical wearable.",
      "Integrated IMU sensors and designed custom PCBs for low-power wireless monitoring.",
      "Modeled the device enclosure in SolidWorks; deployed in retirement-home pilot trials.",
    ],
    tags: ["ESP32", "IMU", "PCB Design", "SolidWorks"],
  },
];

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-7xl scroll-mt-24 bg-transparent px-6 py-24">
      <SectionHeading kicker="Experience" title="Engineering work, end to end.">
        Co-ops and roles where I owned hardware, firmware, or controls from concept to deployment.
      </SectionHeading>
      <ol className="relative space-y-6 border-l border-border pl-6 md:pl-10">
        {EXPERIENCE.map((e) => {
          const Icon = e.icon;
          return (
            <li key={e.company} className="relative">
              <span className="absolute -left-[34px] grid h-8 w-8 place-items-center rounded-full border border-slate-800/80 bg-slate-900 text-cyan-300 md:-left-[50px]">
                <Icon className="h-4 w-4" />
              </span>
              <article className="card-hover rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-md md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-slate-50 md:text-2xl">{e.role}</h3>
                    <p className="mt-1 text-sm text-cyan-300">{e.company}</p>
                  </div>
                  <span className="font-mono text-xs text-slate-400">{e.period}</span>
                </div>
                <ul className="mt-5 space-y-2 text-sm leading-relaxed text-slate-300">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-cyan-400" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {e.tags.map((t) => (
                    <span key={t} className="rounded-md border border-slate-800/80 bg-slate-950/60 px-2.5 py-1 font-mono text-xs text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

const PROJECTS: {
  title: string;
  blurb: string;
  image?: string;
  tags: string[];
  link?: string;
  status?: string;
  inProgress?: boolean;
}[] = [
  {
    title: "LANA Vision — Natural Language Guided Robot Navigation",
    blurb:
      "An autonomous mobile robot platform translating natural language instructions into physical path execution. Leading the low-level firmware integration and hardware architecture to bridge the sim-to-real gap.",
    tags: ["Hardware Integration", "Embedded Firmware", "Sensor Fusion", "Edge Computing", "Robotics"],
    status: "Capstone / In Progress",
    inProgress: true,
  },
  {
    title: "Mechatronic Resonance System",
    blurb:
      "Educational lab platform built around the Arduino UNO R4 WiFi with a custom PCB, motion and proximity sensors, and a fully modeled SolidWorks assembly.",
    image: projReson,
    tags: ["Arduino R4", "Custom PCB", "SolidWorks", "Sensors"],
    link: "https://github.com/Karnan123/Mechatronic-Resonance-System",
  },
  {
    title: "Smart-Irrigation Controller",
    blurb:
      "STM32-based controller for vineyard irrigation: PWM pump control, servo-actuated valves, ultrasonic level sensing, UART telemetry, and a custom-designed PCB.",
    image: projIrrig,
    tags: ["STM32", "PCB Design", "PWM", "UART", "Ultrasonic"],
    link: "https://github.com/Karnan123/Smart-Irrigation-Controller",
  },
  {
    title: "RainSense — Smart Water Management",
    blurb:
      "ESP32-driven platform that monitors tank levels, integrates a weather API, and orchestrates rainwater harvesting and irrigation through a Flutter mobile app.",
    image: projRain,
    tags: ["ESP32", "Flutter", "Weather API", "Sensors", "IoT"],
    link: "https://github.com/Karnan123/RainSense-Smart-Water-Management",
  },
  {
    title: "Jet Automation - Automated Packaging Robot Cell",
    blurb:
      "Omron TM12 + Sysmac Studio packaging cell with PLC/HMI, vacuum end-effector, and 10–15 s cycle times — delivered through full FAT.",
    image: projJet,
    tags: ["Omron TM12", "TMFlow", "Sysmac", "PLC"],
  },
  {
    title: "Ascenix - Fall-Detection Wearable",
    blurb:
      "ESP32 + IMU fall-detection wearable with a 3D-printed enclosure and custom PCB, deployed in retirement-home pilots for live wireless monitoring.",
    image: projFallyx,
    tags: ["ESP32", "IMU", "Wearable", "PCB"],
  },
  {
    title: "FPGA & Digital Hardware",
    blurb:
      "RTL design exercises in SystemVerilog and VHDL targeting Quartus — finite-state machines, datapaths, and digital-hardware building blocks.",
    image: projFpga,
    tags: ["SystemVerilog", "VHDL", "Quartus", "RTL"],
  },
];

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl scroll-mt-24 bg-transparent px-6 py-24">
      <SectionHeading kicker="Projects" title="Selected work.">
        A mix of embedded, robotics, IoT, and digital-hardware projects I've designed and shipped.
      </SectionHeading>
      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <article
            key={p.title}
            className="card-hover group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-md"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
              {p.image ? (
                <img
                  src={p.image}
                  alt={p.title}
                  width={1280}
                  height={800}
                  loading="lazy"
                  className={
                    p.image === projIrrig
                      ? "relative z-10 w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-105"
                      : p.image === projFallyx || p.image === projJet || p.image === projReson
                        ? "object-cover w-full h-full rounded-xl transition-transform duration-700 group-hover:scale-105"
                        : "h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  }
                />
              ) : (
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
                  <div aria-hidden className="bg-grid absolute inset-0 opacity-[0.18]" />
                  <div aria-hidden className="absolute -top-20 left-1/2 h-72 w-[120%] -translate-x-1/2 rounded-full" style={{ background: "var(--gradient-glow)" }} />
                  <div className="relative flex flex-col items-center gap-3 text-cyan-300">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl border border-cyan-400/40 bg-cyan-500/10 backdrop-blur">
                      <Bot className="h-7 w-7" />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-200/80">
                      Concept · Planning
                    </span>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />
            </div>

            <div className={`flex flex-1 flex-col p-6 md:p-7 ${p.inProgress ? "bg-slate-950/60 backdrop-blur-md" : ""}`}>
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold text-slate-50 md:text-2xl">{p.title}</h3>
                  <Circle className="h-5 w-5 shrink-0 text-slate-500 transition-colors group-hover:text-cyan-300" />
                </div>
                {p.status && (
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-wider text-amber-300">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-amber-300 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-300" />
                      </span>
                      {p.status}
                    </span>
                  </div>
                )}
                <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-300">{p.blurb}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md border border-slate-800/80 bg-slate-950/60 px-2.5 py-1 font-mono text-xs text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
                {p.inProgress && (
                  <Link
                    to={PORTFOLIO_PATH}
                    hash="lana-vision"
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
                  >
                    View Project Brief <ArrowUpRight className="h-4 w-4" />
                  </Link>
                )}
                {!p.inProgress &&
                  p.title !== "Ascenix - Fall-Detection Wearable" &&
                  p.title !== "Jet Automation - Automated Packaging Robot Cell" &&
                  p.title !== "FPGA & Digital Hardware" && (
                    <Link
                      to={PORTFOLIO_PATH}
                      className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
                    >
                      View Full Case Study <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  )}
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <Github className="h-4 w-4" /> GitHub
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


const SKILLS = [
  {
    icon: Code2,
    title: "Programming",
    items: ["C++", "C", "Java", "Python", "SystemVerilog", "VHDL", "MATLAB", "SQL"],
  },
  {
    icon: CircuitBoard,
    title: "Hardware",
    items: ["STM32", "ESP32", "PCB Design", "Soldering", "FPGA"],
  },
  {
    icon: Wrench,
    title: "Tools",
    items: ["EasyEDA", "KiCad", "SolidWorks", "STM32CubeIDE", "Quartus", "Flutter", "VSCode"],
  },
  {
    icon: Settings2,
    title: "Automation",
    items: ["Omron Sysmac Studio", "TMFlow", "PLC / HMI"],
  },
];

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-7xl scroll-mt-24 bg-transparent px-6 py-24">
      <SectionHeading kicker="Skills" title="The toolkit." />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="card-hover rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-md">
              <span className="mb-5 grid h-10 w-10 place-items-center rounded-lg bg-cyan-500/10 text-cyan-300">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-semibold text-slate-50">{s.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <li key={i} className="rounded-md border border-slate-800/80 bg-slate-950/60 px-2.5 py-1 font-mono text-xs text-slate-300">
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="mx-auto max-w-7xl scroll-mt-24 bg-transparent px-6 py-24">
      <SectionHeading kicker="Education" title="Academic background." />
      <div className="card-hover rounded-2xl border border-slate-800/80 bg-slate-900/50 p-8 backdrop-blur-md md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-semibold text-slate-50">University of Waterloo</h3>
            <p className="mt-1 text-cyan-300">Bachelor of Applied Science, Computer Engineering</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-slate-400">
              <MapPin className="h-4 w-4" /> Waterloo, Ontario, Canada
            </p>
          </div>
          <span className="font-mono text-sm text-slate-400">2022 — 2027</span>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };
  return (
    <section id="contact" className="mx-auto max-w-7xl scroll-mt-24 bg-transparent px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-slate-800/80 bg-slate-900/50 p-8 backdrop-blur-md md:p-16">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-60"
          style={{ background: "var(--gradient-glow)" }}
        />
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
              <span className="h-px w-8 bg-primary/60" /> Contact
            </div>
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
              Let's build something.
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Open to embedded, hardware, robotics, and FPGA roles. The fastest way to reach me is email.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <button type="button"
               onClick={handleCopyEmail}
               className="group flex w-full items-center justify-between rounded-xl border border-border bg-background/40 px-5 py-4 text-left transition-colors hover:border-primary/50">
              <span className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className="font-mono">{EMAIL}</span>
              </span>
              <span className="font-mono text-xs text-muted-foreground transition-colors group-hover:text-primary">
                {copied ? "Copied!" : "Copy"}
              </span>
            </button>
            <a href={GITHUB} target="_blank" rel="noreferrer"
               className="group flex items-center justify-between rounded-xl border border-border bg-background/40 px-5 py-4 transition-colors hover:border-primary/50">
              <span className="flex items-center gap-3 text-sm">
                <FileDown className="h-4 w-4 text-primary" />
                <span className="font-mono">View Portfolio</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer"
               className="group flex items-center justify-between rounded-xl border border-border bg-background/40 px-5 py-4 transition-colors hover:border-primary/50">
              <span className="flex items-center gap-3 text-sm">
                <Linkedin className="h-4 w-4 text-primary" />
                <span className="font-mono">linkedin.com/in/karnan-thamilchelvan-594a0422b</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
            <a href="/Karnan_Thamilchelvan_Resume.pdf" target="_blank" rel="noreferrer" download
               className="group flex items-center justify-between rounded-xl bg-primary px-5 py-4 text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.01]">
              <span className="flex items-center gap-3 text-sm font-semibold">
                <FileDown className="h-4 w-4" /> Download Resume (PDF)
              </span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground md:flex-row">
        <p>© {new Date().getFullYear()} Karnan Thamilchelvan. All rights reserved.</p>
        <p className="font-mono text-xs">Designed & built with care.</p>
      </div>
    </footer>
  );
}
