import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Cpu,
  FileDown,
  CircuitBoard,
  Layers,
  Target,
  Sparkles,
  Code2,
  Image as ImageIcon,
  Loader2,
  CheckCircle2,
  Github,
  Zap,
  Activity,
  Wrench,
  Package,
  ExternalLink,
  Droplets,
  Radio,
  Gauge,
  Clock,
  Cog,
} from "lucide-react";
import resonanceThumb from "@/assets/resonance-thumbnail.png";
import resonanceCad from "@/assets/resonance-cad.png";
import resonancePcb from "@/assets/resonance-pcb.png";
import irrigationThumb from "@/assets/proj-irrigation.jpg";


export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Engineering Portfolio — Karnan Thamilchelvan" },
      {
        name: "description",
        content:
          "Deep-dive case studies of embedded systems, PCB design, and robotics projects by Karnan Thamilchelvan.",
      },
      { property: "og:title", content: "Engineering Portfolio — Karnan Thamilchelvan" },
      {
        property: "og:description",
        content:
          "Deep-dive case studies of embedded systems, PCB design, and robotics projects by Karnan Thamilchelvan.",
      },
    ],
  }),
  component: PortfolioPage,
});

const RESUME_PDF = "/Karnan_Thamilchelvan_Resume.pdf";

type Highlight = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
};

type ImageBlock = {
  label: string;
  text: string;
  heading: string;
  image?: string;
  sectionTitle?: string;
};

type CaseContent = {
  subtitle: string;
  github?: string;
  thumbnail?: string;
  problem: string;
  highlights: Highlight[];
  blocks: ImageBlock[];
  specs?: {
    title: string;
    kicker: string;
    intro?: string;
    rows: { label: string; value: string; sub?: string }[];
  };
};

type CaseStudy = {
  id: string;
  title: string;
  role: string;
  year: string;
  badges: string[];
  content?: CaseContent;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "project-one",
    title: "Mechatronic Resonance System",
    role: "Mass-spring-damper platform developed for the University of Waterloo's ECE198 Dynamic Systems Lab.",
    year: "2025",
    badges: [
      "Arduino UNO R4 WiFi",
      "EasyEDA",
      "SolidWorks",
      "Embedded C++",
      "PCB Design",
      "3D Printing",
    ],
    content: {
      subtitle:
        "Mass-spring-damper platform developed for the University of Waterloo's ECE198 Dynamic Systems Lab.",
      github: "https://github.com/",
      thumbnail: resonanceThumb,
      problem:
        "The Mechatronic Resonance System is an integrated educational platform blending mechanical design, custom circuitry, and embedded firmware. Designed for the University of Waterloo's ECE198 Dynamic Systems Lab, this hardware-in-the-loop platform allows undergraduate engineering students to physically interact with and analyze complex concepts in resonance, harmonic oscillations, and damping behavior.",
      highlights: [
        {
          icon: Zap,
          title: "Deterministic Control",
          body: "Leveraged the Renesas-based Arduino UNO R4 WiFi microcontroller to achieve real-time motor actuation and high-frequency sensor data collection.",
        },
        {
          icon: CircuitBoard,
          title: "Custom Power & Signal Distribution",
          body: "Engineered a bespoke PCB using EasyEDA, translating breadboarded prototypes into a fabricated, hand-soldered production board to streamline routing.",
        },
        {
          icon: Activity,
          title: "Real-Time Data Acquisition",
          body: "Integrated high-precision motion and proximity sensors to capture dynamic oscillation data for live, high-fidelity laboratory demonstrations.",
        },
        {
          icon: Wrench,
          title: "Mechanical Engineering & DFMA",
          body: "Modeled a rigid structural frame in SolidWorks, executing the manufacturing of over 220+ custom 3D-printed and precision-machined parts—including low-friction bearing assemblies, structural mounts, and protective enclosures.",
        },
        {
          icon: Package,
          title: "Full Product Lifecycle Deployment",
          body: "Successfully fabricated, quality-tested, and assembled 40 fully operational, robust units deployed directly into the active curriculum.",
        },
      ],
      blocks: [
        {
          label: "System Setup & Hardware Assembly",
          heading: "System Dynamics & Feedback",
          image: resonanceCad,
          text: "The platform utilizes an automated motor assembly to excite a physical mass-spring-damper system across a spectrum of varying frequencies. As the system approaches its natural frequency, hardware sensors continuously sample the peak-to-peak displacement. This raw data is fed back to the central microcontroller to dynamically display resonance curves and phase changes in real-time.",
        },
        {
          label: "Custom EasyEDA PCB Layout",
          heading: "Electrical Integration & Durability",
          image: resonancePcb,
          text: "To withstand repeated handling in an undergraduate lab environment, the custom-routed PCB functions as the primary backplane connecting the MCU, motor drivers, and sensor arrays. Hand-soldering industrial-grade headers, precision potentiometers, and display peripherals drastically reduced point-of-failure wiring complexity while reinforcing structural integrity against physical harmonic vibrations.",
        },
      ],
    },
  },
  {
    id: "project-two",
    title: "Smart-Irrigation Controller",
    role: "An automated, sustainable embedded system engineered to optimize water resource allocation and energy efficiency in terraced agricultural landscapes.",
    year: "2024",
    badges: [
      "STM32 Nucleo",
      "Proteus Design Suite",
      "Embedded C",
      "UART/PWM",
      "Analog Electronics",
      "PCB Design",
    ],
    content: {
      subtitle:
        "An automated, sustainable embedded system engineered to optimize water resource allocation and energy efficiency in terraced agricultural landscapes.",
      github: "https://github.com/",
      thumbnail: irrigationThumb,
      problem:
        "Agriculture in complex, terraced topologies demands highly precise fluid dynamics and precise water management to eliminate resource waste. The Smart-Irrigation Controller addresses this critical sustainability challenge by combining a dedicated STM32 microcontroller framework with custom hardware peripherals to autonomously regulate multi-zone distribution pipelines based on real-time sensory feedback.",
      highlights: [
        {
          icon: Cpu,
          title: "Dual-Processor System Architecture",
          body: "Integrated an ARM Cortex-M based STM32 Nucleo development board as the central control unit, interfacing seamlessly with a secondary custom peripheral timing module.",
        },
        {
          icon: Gauge,
          title: "Dynamic Fluid Regulation",
          body: "Engineered a Pulse-Width Modulation (PWM) hardware control loop to modulate pump motor speed, delivering variable pressure profiles across distinct elevation head levels.",
        },
        {
          icon: Radio,
          title: "Closed-Loop Feedback & Telemetry",
          body: "Utilized non-contact ultrasonic transducers to measure volumetric reservoir levels via a localized hardware timer, streaming depth metrics continuously over a robust UART communication interface.",
        },
        {
          icon: Cog,
          title: "Actuation & Visual Signaling",
          body: "Implemented a high-torque servo mechanism to actuate directional fluid valves alongside an integrated RGB LED status system and multi-digit 7-segment display arrays for zero-latency monitoring.",
        },
        {
          icon: Clock,
          title: "Time-Scaled Operation Simulation",
          body: "Configured internal MCU hardware timers to execute simulated day/night scheduling cycles, enabling rapid validation of long-term field operations during bench testing.",
        },
      ],
      blocks: [
        {
          label: "Custom Analog & Digital Timer Subsystem Assembly",
          heading: "Hardware Timing System & Operations",
          sectionTitle: "Hardware Timing System & Operations",
          text: "The MCU Timer Board: To coordinate complex scheduling without blocking core execution loops, a custom timing sub-module was built and rigorously validated. Integrating active operational amplifiers (Op-amps), logic ICs, integrated digital displays, tactile input switches, and discrete semiconductor components, all elements were hand-soldered onto a dedicated circuit matrix to ensure reliable signal processing and ruggedized field durability.",
        },
        {
          label: "Proteus Schematic & Multi-Layer Backplane Routing",
          heading: "EDA Design & Component Consolidation",
          sectionTitle: "PCB Design & Technical Deep-Dive",
          text: "To transition the loose component network into a deployable industrial-grade product, a bespoke PCB layout was designed utilizing the Proteus PCB Design Tool. This layout seamlessly merges the STM32 processing core environment with the discrete Timer Board module into a dense, vibration-resistant form factor. This system integration successfully minimized interconnect wire paths, dramatically reducing parasitic trace noise, preventing electromagnetic interference, and maximizing overall operational efficiency.",
        },
      ],
      specs: {
        kicker: "04",
        title: "System Operation Specs",
        intro:
          "Reservoir Replenishment: Automated overnight inlet valve management utilizing high-torque servos and RGB status arrays. The hydraulic distribution matrix balances multi-zone flow against elevation head requirements:",
        rows: [
          {
            label: "Zone 1 — Low Elevation",
            value: "50,000 gal/day",
            sub: "25 ft fluid HEAD",
          },
          {
            label: "Zone 2 — Mid Elevation",
            value: "30,000 gal/day",
            sub: "50 ft fluid HEAD",
          },
          {
            label: "Zone 3 — High Elevation",
            value: "14,000 gal/day",
            sub: "60 ft fluid HEAD",
          },
          {
            label: "System Source Inlet",
            value: "40 ft gravity HEAD",
            sub: "Regulated baseline from upstream natural spring",
          },
        ],
      },
    },
  },
  {
    id: "project-three",
    title: "Project Three — Coming Soon",
    role: "Robotics & Controls",
    year: "2025",
    badges: ["Omron TM12", "Sysmac Studio", "TMFlow", "PLC", "HMI"],
  },
];


function PortfolioPage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-grid opacity-[0.25]" />
        <div
          className="absolute -top-40 left-1/2 h-[600px] w-[1200px] -translate-x-1/2 rounded-full"
          style={{ background: "var(--gradient-glow)" }}
        />
      </div>

      <PortfolioHeader scrolled={scrolled} />

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-32 md:pt-40">
        {/* Page hero */}
        <section className="animate-float-up mb-12 max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-8 bg-primary/60" />
            Engineering Portfolio
          </div>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Detailed case studies of <span className="text-gradient">hardware, embedded, and robotics</span> work.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A deep-dive into selected engineering projects — problem framing, system architecture,
            firmware internals, and the trade-offs behind every design decision.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <DownloadPortfolioButton />
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" /> Back to home
            </Link>
          </div>
        </section>

        {/* Quick nav / tabs */}
        <nav className="mb-16 flex flex-wrap gap-2 border-y border-border py-4">
          <span className="mr-2 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Jump to:
          </span>
          {CASE_STUDIES.map((c, i) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              className="rounded-md border border-border bg-secondary/60 px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              0{i + 1} · {c.title.split(" — ")[0]}
            </a>
          ))}
        </nav>

        {/* Case studies */}
        <div className="space-y-24">
          {CASE_STUDIES.map((c, i) => (
            <CaseStudySection key={c.id} study={c} index={i} />
          ))}
        </div>

        {/* Footer download CTA */}
        <section className="mt-24 overflow-hidden rounded-3xl border border-border bg-card/60 p-8 backdrop-blur md:p-12">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-semibold md:text-3xl">
                Want the complete engineering portfolio?
              </h2>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Download the full PDF for high-resolution schematics, PCB layouts, and detailed write-ups.
              </p>
            </div>
            <DownloadPortfolioButton />
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Karnan Thamilchelvan. All rights reserved.</p>
          <p className="font-mono text-xs">Designed & built with care.</p>
        </div>
      </footer>
    </div>
  );
}

function PortfolioHeader({ scrolled }: { scrolled: boolean }) {
  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-sm font-semibold tracking-tight"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary glow-ring">
            <Cpu className="h-4 w-4" />
          </span>
          <span>
            Karnan<span className="text-primary">.</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <a
            href="/#about"
            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            About
          </a>
          <a
            href="/#experience"
            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Experience
          </a>
          <Link
            to="/portfolio"
            className="rounded-md px-3 py-2 text-sm text-primary transition-colors hover:bg-secondary"
            activeProps={{ className: "rounded-md px-3 py-2 text-sm text-primary bg-secondary" }}
          >
            Portfolio
          </Link>
          <a
            href="/#skills"
            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Skills
          </a>
          <a
            href="/#contact"
            className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            Contact
          </a>
        </nav>
        <a
          href={RESUME_PDF}
          target="_blank"
          rel="noreferrer"
          download
          className="hidden items-center gap-2 rounded-md border border-primary/40 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition-all hover:bg-primary/20 sm:inline-flex"
        >
          <FileDown className="h-4 w-4" /> Resume
        </a>
      </div>
    </header>
  );
}

function DownloadPortfolioButton() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  const handleClick = () => {
    if (state !== "idle") return;
    setState("loading");
    // Trigger download via hidden anchor
    const a = document.createElement("a");
    a.href = RESUME_PDF;
    a.download = "Karnan_Thamilchelvan_Engineering_Portfolio.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => setState("done"), 900);
    setTimeout(() => setState("idle"), 2600);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={state === "loading"}
      className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02] disabled:opacity-90"
    >
      {state === "idle" && (
        <>
          <FileDown className="h-4 w-4" /> Download Full Engineering Portfolio (PDF)
        </>
      )}
      {state === "loading" && (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Preparing download…
        </>
      )}
      {state === "done" && (
        <>
          <CheckCircle2 className="h-4 w-4" /> Download started
        </>
      )}
    </button>
  );
}

const BADGE_TONES = [
  "border-primary/40 bg-primary/10 text-primary",
  "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  "border-sky-400/30 bg-sky-400/10 text-sky-300",
  "border-amber-400/30 bg-amber-400/10 text-amber-300",
  "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-300",
  "border-rose-400/30 bg-rose-400/10 text-rose-300",
];

function CaseStudySection({ study, index }: { study: CaseStudy; index: number }) {
  const c = study.content;
  return (
    <article
      id={study.id}
      className="scroll-mt-28 overflow-hidden rounded-3xl border border-border bg-card/40 backdrop-blur"
    >
      {/* Hero */}
      <header className="relative border-b border-border p-8 md:p-12">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-40"
          style={{ background: "var(--gradient-glow)" }}
        />
        <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
          <span className="h-px w-8 bg-primary/60" />
          Case Study · 0{index + 1}
          <span className="text-muted-foreground">/ {study.year}</span>
        </div>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-5xl">
          {study.title}
        </h2>
        <p className="mt-3 max-w-3xl text-base text-muted-foreground md:text-lg">
          {study.role}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {study.badges.map((b, i) => (
            <span
              key={b}
              className={`rounded-md border px-2.5 py-1 font-mono text-xs ${BADGE_TONES[i % BADGE_TONES.length]}`}
            >
              {b}
            </span>
          ))}
        </div>

        {c?.github && (
          <div className="mt-6">
            <a
              href={c.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-lg border border-border bg-background/60 px-4 py-2 text-sm font-medium text-foreground backdrop-blur transition-colors hover:border-primary/50 hover:text-primary"
            >
              <Github className="h-4 w-4" />
              View on GitHub
              <ExternalLink className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        )}
      </header>

      {c?.thumbnail && (
        <div className="border-b border-border bg-background/40 p-6 md:p-8">
          <div className="overflow-hidden rounded-2xl border border-border">
            <img
              src={c.thumbnail}
              alt={`${study.title} — overview`}
              loading="lazy"
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        </div>
      )}

      <div className="space-y-12 p-8 md:p-12">
        {/* Problem & Scope */}
        <SubSection icon={Target} kicker="01" title="Problem & Scope">
          {c ? (
            <p className="max-w-4xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {c.problem}
            </p>
          ) : (
            <SkeletonText lines={4} />
          )}
        </SubSection>

        {/* Key Highlights */}
        <SubSection icon={Sparkles} kicker="02" title="Key Highlights">
          {c ? (
            <ul className="grid gap-4 md:grid-cols-2">
              {c.highlights.map((h, i) => (
                <li
                  key={h.title}
                  className="group relative flex items-start gap-4 rounded-xl border border-border bg-background/40 p-5 transition-colors hover:border-primary/40"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                    <h.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        0{i + 1}
                      </span>
                      <h4 className="font-display text-base font-semibold">{h.title}</h4>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {h.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2">
              {[0, 1, 2, 3].map((i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-border bg-background/40 p-4"
                >
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-md bg-primary/10 font-mono text-xs text-primary">
                    0{i + 1}
                  </span>
                  <div className="w-full">
                    <SkeletonText lines={2} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </SubSection>

        {/* Image + Text blocks (System Operation, PCB) */}
        {c ? (
          c.blocks.map((block, i) => (
            <SubSection
              key={block.label}
              icon={i === 0 ? Layers : CircuitBoard}
              kicker={`0${3 + i}`}
              title={i === 0 ? "System Operation" : "PCB Design & Technical Deep-Dive"}
            >
              <div
                className={`grid gap-8 lg:grid-cols-2 lg:items-center ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <ImagePlaceholder label={block.label} src={block.image} />
                <div>
                  <h4 className="font-display text-lg font-semibold text-foreground md:text-xl">
                    {block.heading}
                  </h4>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                    {block.text}
                  </p>
                </div>
              </div>
            </SubSection>
          ))
        ) : (
          <>
            <SubSection icon={Layers} kicker="03" title="Interactive System Architecture">
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="space-y-4">
                  <SkeletonText lines={6} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <ImagePlaceholder label="System Block" />
                  <ImagePlaceholder label="PCB Layout" />
                  <ImagePlaceholder label="Breadboard" />
                  <ImagePlaceholder label="Enclosure" />
                </div>
              </div>
            </SubSection>

            <SubSection icon={Code2} kicker="04" title="Technical Deep-Dive / How It Works">
              <div className="space-y-4">
                <SkeletonText lines={3} />
                <div className="overflow-hidden rounded-xl border border-border bg-background/60">
                  <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-4 py-2 font-mono text-xs text-muted-foreground">
                    <span className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-primary/70" />
                      snippet.c
                    </span>
                    <span>placeholder</span>
                  </div>
                  <pre className="overflow-x-auto p-5 font-mono text-xs leading-relaxed text-muted-foreground">
{`// Code snippet placeholder
// Drop firmware excerpts, RTL, or pseudocode here.

void setup(void) {
    // initialize peripherals
}

void loop(void) {
    // main control loop
}`}
                  </pre>
                </div>
              </div>
            </SubSection>
          </>
        )}
      </div>
    </article>
  );
}


function SubSection({
  icon: Icon,
  kicker,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {kicker}
          </div>
          <h3 className="font-display text-xl font-semibold md:text-2xl">{title}</h3>
        </div>
      </div>
      {children}
    </section>
  );
}

function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3 rounded bg-secondary/60"
          style={{ width: `${85 - ((i * 13) % 35)}%` }}
        />
      ))}
    </div>
  );
}

function ImagePlaceholder({ label, src }: { label: string; src?: string }) {
  if (src) {
    return (
      <figure className="group relative overflow-hidden rounded-xl border border-border bg-secondary/30">
        <div className="flex max-h-[360px] min-h-[240px] items-center justify-center p-4">
          <img
            src={src}
            alt={label}
            loading="lazy"
            className="max-h-[320px] w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
        <figcaption className="border-t border-border bg-background/60 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </figcaption>
      </figure>
    );
  }
  return (
    <div className="group relative flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
      <ImageIcon className="h-6 w-6" />
      <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{label}</span>
    </div>
  );
}
