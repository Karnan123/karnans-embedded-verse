import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
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
import heroBg from "@/assets/hero-bg.jpg";
import projJet from "@/assets/proj-jet.jpg";
import projRain from "@/assets/proj-rainsense.jpg";
import projIrrig from "@/assets/proj-irrigation.jpg";
import projReson from "@/assets/proj-resonance.jpg";
import projFpga from "@/assets/proj-fpga.jpg";
import projFallyx from "@/assets/proj-fallyx.jpg";

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

const EMAIL = "k3thamil@uwaterloo.ca";
const GITHUB = "https://drive.google.com/file/d/1xGZoO3jY5b8634wOs1cmYgjVwvwnlyT_/view?usp=sharing";
const LINKEDIN = "https://www.linkedin.com/in/karnan-thamilchelvan/";

function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.25]" />
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
        </nav>
        <a href="/resume.pdf" download
           className="hidden items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20 sm:inline-flex">
          <FileDown className="h-4 w-4" /> Resume
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 pb-24 md:pt-44 md:pb-32">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-30"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maskImage: "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />
      <div className="mx-auto max-w-7xl px-6">
        <div className="animate-float-up max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Available for Summer 2026 internships
          </div>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl">
            Karnan
            <br />
            <span className="text-gradient">Thamilchelvan</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Computer Engineering Student at the{" "}
            <span className="text-foreground">University of Waterloo</span>.
          </p>
          <p className="mt-3 font-mono text-sm text-primary/90 md:text-base">
            Embedded Systems · Robotics · PCB Design · FPGA · Industrial Automation
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="/resume.pdf" download
               className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]">
              <FileDown className="h-4 w-4" /> Resume
            </a>
            <a href={GITHUB} target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-primary">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer"
               className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-primary">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a href="#contact"
               className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-primary">
              <Mail className="h-4 w-4" /> Contact
            </a>
          </div>

          <div className="mt-16 grid max-w-2xl grid-cols-3 gap-6 border-t border-border pt-8">
            <Stat value="50+" label="PCBs designed" />
            <Stat value="3" label="Engineering co-ops" />
            <Stat value="220+" label="Hardware parts shipped" />
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
    <section id="about" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <SectionHeading kicker="About" title="Building reliable hardware that solves real problems." />
      <div className="grid gap-10 md:grid-cols-3">
        <p className="text-lg leading-relaxed text-muted-foreground md:col-span-2">
          I'm a Computer Engineering student who lives at the boundary of software and silicon —
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
            <div key={label} className="flex items-center gap-3 rounded-lg border border-border bg-card/40 p-3 text-sm">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">
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
    period: "2025",
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
    period: "2024",
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
    company: "Fallyx",
    period: "2023",
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
    <section id="experience" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <SectionHeading kicker="Experience" title="Engineering work, end to end.">
        Co-ops and roles where I owned hardware, firmware, or controls from concept to deployment.
      </SectionHeading>
      <ol className="relative space-y-6 border-l border-border pl-6 md:pl-10">
        {EXPERIENCE.map((e) => {
          const Icon = e.icon;
          return (
            <li key={e.company} className="relative">
              <span className="absolute -left-[34px] grid h-8 w-8 place-items-center rounded-full border border-border bg-card text-primary md:-left-[50px]">
                <Icon className="h-4 w-4" />
              </span>
              <article className="card-hover rounded-2xl border border-border bg-card/60 p-6 backdrop-blur md:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="font-display text-xl font-semibold md:text-2xl">{e.role}</h3>
                    <p className="mt-1 text-sm text-primary">{e.company}</p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">{e.period}</span>
                </div>
                <ul className="mt-5 space-y-2 text-sm leading-relaxed text-muted-foreground">
                  {e.bullets.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-2">
                  {e.tags.map((t) => (
                    <span key={t} className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 font-mono text-xs text-muted-foreground">
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

const PROJECTS = [
  {
    title: "RainSense — Smart Water Management",
    blurb:
      "ESP32-driven platform that monitors tank levels, integrates a weather API, and orchestrates rainwater harvesting and irrigation through a Flutter mobile app.",
    image: projRain,
    tags: ["ESP32", "Flutter", "Weather API", "Sensors", "IoT"],
  },
  {
    title: "Smart-Irrigation Controller",
    blurb:
      "STM32-based controller for vineyard irrigation: PWM pump control, servo-actuated valves, ultrasonic level sensing, UART telemetry, and a custom-designed PCB.",
    image: projIrrig,
    tags: ["STM32", "PCB Design", "PWM", "UART", "Ultrasonic"],
  },
  {
    title: "Mechatronic Resonance System",
    blurb:
      "Educational lab platform built around the Arduino UNO R4 WiFi with a custom PCB, motion and proximity sensors, and a fully modeled SolidWorks assembly.",
    image: projReson,
    tags: ["Arduino R4", "Custom PCB", "SolidWorks", "Sensors"],
  },
  {
    title: "FPGA & Digital Hardware",
    blurb:
      "RTL design exercises in SystemVerilog and VHDL targeting Quartus — finite-state machines, datapaths, and digital-hardware building blocks.",
    image: projFpga,
    tags: ["SystemVerilog", "VHDL", "Quartus", "RTL"],
  },
  {
    title: "Fallyx Wearable",
    blurb:
      "ESP32 + IMU fall-detection wearable with a 3D-printed enclosure and custom PCB, deployed in retirement-home pilots for live wireless monitoring.",
    image: projFallyx,
    tags: ["ESP32", "IMU", "Wearable", "PCB"],
  },
  {
    title: "Jet Automation Robot Cell",
    blurb:
      "Omron TM12 + Sysmac Studio packaging cell with PLC/HMI, vacuum end-effector, and 10–15 s cycle times — delivered through full FAT.",
    image: projJet,
    tags: ["Omron TM12", "TMFlow", "Sysmac", "PLC"],
  },
];

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <SectionHeading kicker="Projects" title="Selected work.">
        A mix of embedded, robotics, IoT, and digital-hardware projects I've designed and shipped.
      </SectionHeading>
      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p) => (
          <article key={p.title} className="card-hover group relative overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={p.image}
                alt={p.title}
                width={1280}
                height={800}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
            </div>
            <div className="p-6 md:p-7">
              <div className="flex items-start justify-between gap-4">
                <h3 className="font-display text-xl font-semibold md:text-2xl">{p.title}</h3>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 font-mono text-xs text-muted-foreground">
                    {t}
                  </span>
                ))}
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
    <section id="skills" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <SectionHeading kicker="Skills" title="The toolkit." />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="card-hover rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
              <span className="mb-5 grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {s.items.map((i) => (
                  <li key={i} className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 font-mono text-xs text-muted-foreground">
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
    <section id="education" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <SectionHeading kicker="Education" title="Academic background." />
      <div className="card-hover rounded-2xl border border-border bg-card/60 p-8 backdrop-blur md:p-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-2xl font-semibold">University of Waterloo</h3>
            <p className="mt-1 text-primary">Bachelor of Applied Science, Computer Engineering</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" /> Waterloo, Ontario, Canada
            </p>
          </div>
          <span className="font-mono text-sm text-muted-foreground">2022 — 2027</span>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card/60 p-8 backdrop-blur md:p-16">
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
            <a href={`mailto:${EMAIL}`}
               className="group flex items-center justify-between rounded-xl border border-border bg-background/40 px-5 py-4 transition-colors hover:border-primary/50">
              <span className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className="font-mono">{EMAIL}</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
            <a href={GITHUB} target="_blank" rel="noreferrer"
               className="group flex items-center justify-between rounded-xl border border-border bg-background/40 px-5 py-4 transition-colors hover:border-primary/50">
              <span className="flex items-center gap-3 text-sm">
                <Github className="h-4 w-4 text-primary" />
                <span className="font-mono">github.com/karnanthamilchelvan</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer"
               className="group flex items-center justify-between rounded-xl border border-border bg-background/40 px-5 py-4 transition-colors hover:border-primary/50">
              <span className="flex items-center gap-3 text-sm">
                <Linkedin className="h-4 w-4 text-primary" />
                <span className="font-mono">linkedin.com/in/karnan-thamilchelvan</span>
              </span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            </a>
            <a href="/resume.pdf" download
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
