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
  Cloud,
  LineChart,
  Workflow,
} from "lucide-react";

import { Reveal } from "@/components/Reveal";
import resonanceThumb from "@/assets/resonance-thumbnail.png";
import resonanceCad from "@/assets/resonance-cad.png";
import resonancePcb from "@/assets/resonance-pcb.png";
import irrigationThumb from "@/assets/proj-irrigation.jpg";
import irrigationTimerBoard from "@/assets/irrigation-timer-board.jpg";
import irrigationPcb from "@/assets/irrigation-pcb.png";
import rainsenseThumb from "@/assets/proj-rainsense.jpg";

// Optional rainsense imagery — files may not exist yet; resolves to undefined safely.
const rainsenseAssets = import.meta.glob("@/assets/rainsense-*", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;
const rainsenseHardware = rainsenseAssets["/src/assets/rainsense-hardware.jpg"];
const rainsenseApp = rainsenseAssets["/src/assets/rainsense-app.png"];


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
const PORTFOLIO_PDF = "/Karnan_Thamilchelvan_Engineering_Portfolio.pdf";

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
  steps?: {
    title: string;
    items: { label: string; title: string; body: string }[];
  };
};

type CaseStudy = {
  id: string;
  title: string;
  role: string;
  year: string;
  badges: string[];
  status?: string;
  inProgress?: boolean;
  planningBullets?: { title: string; body: string }[];
  additionalSections?: {
    kicker: string;
    title: string;
    icon?: React.ComponentType<{ className?: string }>;
    items: { title: string; body: string }[];
  }[];
  content?: CaseContent;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "lana-vision",
    title: "LANA Vision — Natural Language Guided Robot Navigation",
    role: "An autonomous mobile robot platform translating natural language instructions into physical path execution. Leading the low-level firmware integration and hardware architecture to bridge the sim-to-real gap.",
    year: "2026",
    status: "Capstone / In Progress",
    inProgress: true,
    badges: [
      "Hardware Integration",
      "Embedded Firmware",
      "Sensor Fusion",
      "Edge Computing",
      "Robotics",
    ],
    planningBullets: [
      {
        title: "Platform & Actuation",
        body: "Selecting and configuring the mechanical RC car chassis and designing low-level firmware for continuous motor and steering control.",
      },
      {
        title: "Sensor Fusion Pipeline",
        body: "Establishing data-acquisition and communication interfaces for onboard cameras and proximity sensors to provide clean visual streams to the AI agent.",
      },
      {
        title: "Power & Edge Compute Integration",
        body: "Engineering the power distribution networks and hardware layout required to securely host the onboard edge-computing unit on the physical platform.",
      },
    ],
    additionalSections: [
      {
        kicker: "03",
        title: "The Sim-to-Real Challenge",
        icon: Layers,
        items: [
          {
            title: "The Simulation Baseline",
            body: "Current Vision-Language Navigation (VLN) research heavily relies on photorealistic simulators where digital agents navigate abstract connectivity graphs by 'teleporting' between discrete, predefined viewpoints. These idealized settings ignore physical friction, momentum, and continuous tracking.",
          },
          {
            title: "Physical Implementation",
            body: "The core objective of LANA Vision is to transition these models out of virtual isolation and onto a continuous, physical RC car platform. This shifts the engineering task from simple node selection to real-time, physical path execution in un-mapped indoor environments.",
          },
        ],
      },
      {
        kicker: "04",
        title: "Hardware & Firmware Roadmap (Planning Phase)",
        icon: CircuitBoard,
        items: [
          {
            title: "Platform Actuation",
            body: "Configuring a small-scale mobile RC car chassis to handle low-level continuous steering and propulsion mechanisms. Firmware planning focuses on translating macro-level path updates from the AI agent into stable, real-time physical motor control loops.",
          },
          {
            title: "Perception & Compute Integration",
            body: "Structuring the physical vehicle layout and power distribution networks required to securely host onboard cameras, spatial sensors, and a dedicated edge-computing unit. This ensures the high-level vision-language model receives a continuous stream of egocentric visual data to map out a safe path and dynamically avoid obstacles.",
          },
        ],
      },
      {
        kicker: "05",
        title: "Target Applications & Audience",
        icon: Workflow,
        items: [
          {
            title: "Robotics Research & Academia",
            body: "Serving as an accessible, open-vocabulary hardware-in-the-loop validation platform for engineering researchers looking to test embodied AI models and spatial reasoning algorithms outside of pure simulation environments.",
          },
          {
            title: "Autonomous Service & Hospitality",
            body: "Providing companies developing indoor guide robots with a flexible framework capable of navigating unfamiliar commercial environments—such as airports, hotels, or hospitals—using natural human instructions without requiring upfront site mapping, GPS, or manual route programming.",
          },
          {
            title: "Logistics & Domestic Automation",
            body: "Laying the underlying firmware control and sensor integration baseline required to scale voice-guided navigation systems into household assistants, smart delivery rovers, and dynamic warehouse automation systems.",
          },
        ],
      },
    ],
  },
  {
    id: "mechatronic-resonance",
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
      github: "https://github.com/Karnan123/Mechatronic-Resonance-System",
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
    id: "smart-irrigation",
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
      github: "https://github.com/Karnan123/Smart-Irrigation-Controller",
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
          image: irrigationTimerBoard,
          text: "The MCU Timer Board: To coordinate complex scheduling without blocking core execution loops, a custom timing sub-module was built and rigorously validated. Integrating active operational amplifiers (Op-amps), logic ICs, integrated digital displays, tactile input switches, and discrete semiconductor components, all elements were hand-soldered onto a dedicated circuit matrix to ensure reliable signal processing and ruggedized field durability.",
        },
        {
          label: "Proteus Schematic & Multi-Layer Backplane Routing",
          heading: "EDA Design & Component Consolidation",
          sectionTitle: "PCB Design & Technical Deep-Dive",
          image: irrigationPcb,
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
    id: "rainsense",
    title: "RainSense: Smart Water Management System",
    role: "An end-to-end IoT and cloud-integrated environmental monitoring solution engineered to optimize agricultural irrigation efficiency and automate rainwater harvesting data pipelines.",
    year: "2025",
    badges: [
      "ESP32 MCU",
      "IoT Architecture",
      "REST APIs",
      "Wi-Fi Telemetry",
      "Mobile App Development",
      "Sensor Fusion",
    ],
    content: {
      subtitle:
        "An end-to-end IoT and cloud-integrated environmental monitoring solution engineered to optimize agricultural irrigation efficiency and automate rainwater harvesting data pipelines.",
      github: "https://github.com/Karnan123/RainSense-Smart-Water-Management",
      thumbnail: rainsenseThumb,
      problem:
        "Unpredictable localized climate shifts often force agricultural operations to rely on rigid, inefficient irrigation schedules, inflating utility costs and straining regional water resources. RainSense mitigates this by bridging physical IoT edge nodes with predictive meteorological web services, providing an automated, data-driven framework that cross-references atmospheric telemetry with cloud weather patterns to enable precise resource planning.",
      highlights: [
        {
          icon: Cpu,
          title: "Microcontroller Edge Processing",
          body: "Implemented an ESP32 SoC as the primary edge gateway, leveraging its native Wi-Fi stack to handle asynchronous cloud communication and environmental data parsing.",
        },
        {
          icon: Cloud,
          title: "Predictive Multi-Source Analysis",
          body: "Programmed automated REST API calls to retrieve high-fidelity, real-time localized forecasts, cross-referencing cloud-level predictive algorithms with physical microclimate sensory inputs.",
        },
        {
          icon: Activity,
          title: "Comprehensive Sensor Fusion Array",
          body: "Integrated a robust network of digital environmental sensors capturing real-time local ambient temperature, relative humidity, and barometric pressure data.",
        },
        {
          icon: Gauge,
          title: "Closed-Loop Volumetric Tracking",
          body: "Deployed ultra-precise non-contact time-of-flight distance sensors over a storage reservoir to calculate live, volumetric tank metrics and deliver zero-latency overfill or critical-low threshold alerts.",
        },
        {
          icon: LineChart,
          title: "Financial & Sustainability Analytics",
          body: "Developed software logic to estimate real-time water consumption trends, translating physical volume differentials into quantifiable utility cost savings data.",
        },
      ],
      blocks: [
        {
          label: "ESP32 Embedded Prototyping & Sensor Core Network",
          heading: "Edge Hardware Architecture",
          sectionTitle: "IoT Hardware Integration",
          image: rainsenseHardware,
          text: "The hardware ecosystem relies on an optimized low-power circuit built around the ESP32 microcontroller platform. This processing edge node manages real-time ingestion from localized temperature, humidity, and barometric pressure modules while continuously updating a dedicated physical distance transducer positioned over a localized rainwater harvesting system.",
        },
        {
          label: "Cross-Platform Mobile Management Dashboard UI",
          heading: "Full-Stack Software Architecture",
          sectionTitle: "Software Stack & User Interface",
          image: rainsenseApp,
          text: "The backend environment actively communicates via Wi-Fi protocols to parse JSON streams from a comprehensive weather API, enabling geo-specific forecast synchronization. The frontend ecosystem presents this data through an intuitive, real-time mobile dashboard application that exposes actionable push notifications, water-saving statistics, adaptive irrigation schedules, and predictive rain-harvesting countdown triggers directly to users.",
        },
      ],
      steps: {
        title: "How It Works",
        items: [
          {
            label: "Step 1",
            title: "Cloud Orchestration",
            body: "The system uses network sockets to automatically fetch localized real-time and multi-day forecasted meteorological metrics mapped to custom region coordinates.",
          },
          {
            label: "Step 2",
            title: "Edge Ingestion",
            body: "On-site physical sensor arrays run hardware sampling loops to extract precise immediate microclimate parameters alongside direct volumetric reservoir statuses.",
          },
          {
            label: "Step 3",
            title: "Predictive Decision Matrices",
            body: "The processing engine fuses predictive cloud data with active local parameters to automatically determine optimal watering windows and alert operators to imminent storms for preemptive rainwater collection.",
          },
          {
            label: "Step 4",
            title: "Actuation & Reporting",
            body: "Local telemetry logs compute water usage variables, dispatch automated status reports, and push zero-latency critical system warnings directly over the secure mobile infrastructure.",
          },
        ],
      },
    },
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
    <div className="relative min-h-screen overflow-x-hidden bg-transparent text-foreground">
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
            PORTFOLIO
          </div>
          <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
            Featured
            <br />
            <span className="text-gradient">Engineering Projects.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Showcase of my engineering projects featuring hardware development, firmware development, circuit design, and dynamic mechatronic systems.
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
            <Reveal key={c.id} threshold={0.08}>
              <CaseStudySection study={c} index={i} />
            </Reveal>
          ))}
        </div>

        {/* Footer download CTA */}
        <Reveal as="section" className="mt-24 overflow-hidden rounded-3xl border border-border bg-card/60 p-8 backdrop-blur md:p-12">
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
  return (
    <a
      href={PORTFOLIO_PDF}
      download="Karnan_Thamilchelvan_Engineering_Portfolio.pdf"
      className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-[1.02]"
    >
      <FileDown className="h-4 w-4" /> Download Full Engineering Portfolio (PDF)
    </a>
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
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
          <span className="h-px w-8 bg-primary/60" />
          Case Study · 0{index + 1}
          <span className="text-muted-foreground">/ {study.year}</span>
          {study.status && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-1 text-[10px] tracking-wider text-amber-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-glow rounded-full bg-amber-300 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-300" />
              </span>
              {study.status}
            </span>
          )}
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
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-slate-950">
            <img
              src={c.thumbnail}
              alt={`${study.title} — overview`}
              loading="lazy"
              className={
                c.thumbnail === irrigationThumb
                  ? "relative z-10 w-full h-full object-contain p-2"
                  : "h-full w-full object-cover"
              }
            />
          </div>
        </div>
      )}

      {study.inProgress && !c?.thumbnail && (
        <div className="border-b border-border bg-background/40 p-6 md:p-8">
          <div className="relative flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
            <div aria-hidden className="bg-grid absolute inset-0 opacity-[0.18]" />
            <div
              aria-hidden
              className="absolute -top-20 left-1/2 h-80 w-[110%] -translate-x-1/2 rounded-full"
              style={{ background: "var(--gradient-glow)" }}
            />
            <div className="relative flex flex-col items-center gap-3 text-cyan-300">
              <span className="grid h-16 w-16 place-items-center rounded-2xl border border-cyan-400/40 bg-cyan-500/10 backdrop-blur">
                <Cpu className="h-8 w-8 animate-pulse" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-200/80">
                IN PROGRESS
              </span>
            </div>
          </div>
        </div>
      )}

      {study.inProgress ? (
        <div className="space-y-10 p-8 md:p-12">
          <SubSection icon={Target} kicker="01" title="Problem & Scope">
            <p className="max-w-4xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {study.role}
            </p>
          </SubSection>
          {study.planningBullets && (
            <SubSection icon={Sparkles} kicker="02" title="Key Engineering Responsibilities (Planning Phase)">
              <ul className="grid gap-4 md:grid-cols-2">
                {study.planningBullets.map((b, i) => (
                  <li
                    key={b.title}
                    className="group relative flex items-start gap-4 rounded-xl border border-border bg-background/40 p-5 transition-colors hover:border-primary/40"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-amber-400/10 text-amber-300 transition-colors group-hover:bg-amber-400/20">
                      <Wrench className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-[10px] text-muted-foreground">
                          0{i + 1}
                        </span>
                        <h4 className="font-display text-base font-semibold">{b.title}</h4>
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {b.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </SubSection>
          )}
          {study.additionalSections?.map((section) => {
            const SectionIcon = section.icon ?? Layers;

            // Section 03 — Contrast Split View (sim vs physical)
            if (section.kicker === "03") {
              const [sim, phys] = section.items;
              return (
                <SubSection
                  key={section.kicker}
                  icon={SectionIcon}
                  kicker={section.kicker}
                  title={section.title}
                >
                  <div className="grid overflow-hidden rounded-2xl border border-border md:grid-cols-2">
                    {/* Left — Simulation Baseline (muted) */}
                    <div className="relative bg-muted/10 p-6 opacity-80 md:p-8">
                      <div className="mb-4 flex items-center gap-2">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                          Virtual / Baseline
                        </span>
                        <span className="h-px flex-1 bg-border" />
                      </div>
                      <h4 className="font-display text-lg font-semibold text-muted-foreground">
                        {sim?.title}
                      </h4>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground/80">
                        {sim?.body}
                      </p>
                    </div>
                    {/* Right — Physical Implementation (highlighted) */}
                    <div className="relative border-t border-primary/40 bg-primary/5 p-6 backdrop-blur-md ring-1 ring-inset ring-primary/30 md:border-l md:border-t-0 md:p-8">
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
                      <div className="relative">
                        <div className="mb-4 flex items-center gap-2">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                            Physical / Target
                          </span>
                          <span className="h-px flex-1 bg-primary/30" />
                        </div>
                        <h4 className="font-display text-lg font-semibold text-foreground">
                          {phys?.title}
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                          {phys?.body}
                        </p>
                      </div>
                    </div>
                  </div>
                </SubSection>
              );
            }

            // Section 04 — Vertical Timeline Track
            if (section.kicker === "04") {
              return (
                <SubSection
                  key={section.kicker}
                  icon={SectionIcon}
                  kicker={section.kicker}
                  title={section.title}
                >
                  <ol className="relative ml-3 space-y-8 border-l-2 border-dashed border-primary/40 pl-8">
                    {section.items.map((item, i) => (
                      <li key={item.title} className="relative">
                        <span className="absolute -left-[42px] grid h-8 w-8 place-items-center rounded-full border-2 border-primary/60 bg-background font-mono text-xs font-semibold text-primary">
                          {i + 1}
                        </span>
                        <div className="rounded-xl border border-border bg-background/40 p-5">
                          <div className="flex items-center gap-3">
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                              <SectionIcon className="h-4 w-4" />
                            </span>
                            <h4 className="font-display text-base font-semibold">{item.title}</h4>
                          </div>
                          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                            {item.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </SubSection>
              );
            }

            // Section 05 — Light 3-Column Row (borderless)
            if (section.kicker === "05") {
              return (
                <SubSection
                  key={section.kicker}
                  icon={SectionIcon}
                  kicker={section.kicker}
                  title={section.title}
                >
                  <div className="grid gap-10 md:grid-cols-3 md:gap-8">
                    {section.items.map((item, i) => (
                      <div key={item.title} className="space-y-3">
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                          0{i + 1}
                        </span>
                        <h4 className="font-display text-lg font-semibold leading-tight text-foreground">
                          {item.title}
                        </h4>
                        <div className="h-px w-10 bg-primary/50" />
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </SubSection>
              );
            }

            // Fallback — default 2-col grid
            return (
              <SubSection
                key={section.kicker}
                icon={SectionIcon}
                kicker={section.kicker}
                title={section.title}
              >
                <ul className="grid gap-4 md:grid-cols-2">
                  {section.items.map((item, i) => (
                    <li
                      key={item.title}
                      className="group relative flex items-start gap-4 rounded-xl border border-border bg-background/40 p-5 transition-colors hover:border-primary/40"
                    >
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                        <SectionIcon className="h-5 w-5" />
                      </span>
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-[10px] text-muted-foreground">
                            0{i + 1}
                          </span>
                          <h4 className="font-display text-base font-semibold">{item.title}</h4>
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </SubSection>
            );
          })}
          <div className="rounded-xl border border-amber-400/30 bg-amber-400/5 p-5 text-sm text-amber-200/90">
            Full case study coming soon — this project is currently in the active planning and hardware bring-up phase.
          </div>
        </div>
      ) : (
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

        {/* Image + Text blocks + optional specs table */}
        {c ? (
          (() => {
            const nodes: React.ReactNode[] = [];
            let kick = 3;
            const fmtKick = (n: number) => `0${n}`.slice(-2);
            c.blocks.forEach((block, i) => {
              const sectionTitle =
                block.sectionTitle ??
                (i === 0 ? "System Operation" : "PCB Design & Technical Deep-Dive");
              nodes.push(
                <SubSection
                  key={block.label}
                  icon={i === c.blocks.length - 1 ? CircuitBoard : Layers}
                  kicker={fmtKick(kick++)}
                  title={sectionTitle}
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
                </SubSection>,
              );
              // Insert specs after the first block
              if (i === 0 && c.specs) {
                nodes.push(
                  <SubSection
                    key="__specs"
                    icon={Droplets}
                    kicker={fmtKick(kick++)}
                    title={c.specs.title}
                  >
                    {c.specs.intro && (
                      <p className="mb-5 max-w-4xl text-base leading-relaxed text-muted-foreground md:text-lg">
                        {c.specs.intro}
                      </p>
                    )}
                    <div className="overflow-hidden rounded-xl border border-border bg-background/40">
                      <table className="w-full text-left">
                        <tbody>
                          {c.specs.rows.map((row, ri) => (
                            <tr
                              key={row.label}
                              className={
                                ri !== c.specs!.rows.length - 1
                                  ? "border-b border-border/60"
                                  : ""
                              }
                            >
                              <td className="px-5 py-4 align-top">
                                <div className="font-display text-sm font-semibold text-foreground md:text-base">
                                  {row.label}
                                </div>
                                {row.sub && (
                                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                                    {row.sub}
                                  </div>
                                )}
                              </td>
                              <td className="px-5 py-4 text-right align-top">
                                <span className="font-mono text-sm text-primary md:text-base">
                                  {row.value}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </SubSection>,
                );
              }
            });
            if (c.steps) {
              nodes.push(
                <SubSection
                  key="__steps"
                  icon={Workflow}
                  kicker={fmtKick(kick++)}
                  title={c.steps.title}
                >
                  <ol className="relative space-y-6 border-l border-border/70 pl-6 md:pl-8">
                    {c.steps.items.map((s, si) => (
                      <li key={s.title} className="relative">
                        <span className="absolute -left-[33px] grid h-7 w-7 place-items-center rounded-full border border-primary/40 bg-background text-primary md:-left-[37px]">
                          <span className="font-mono text-[10px]">{si + 1}</span>
                        </span>
                        <div className="rounded-xl border border-border bg-background/40 p-5 transition-colors hover:border-primary/40">
                          <div className="flex items-baseline gap-2">
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                              {s.label}
                            </span>
                            <h4 className="font-display text-base font-semibold md:text-lg">
                              {s.title}
                            </h4>
                          </div>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                            {s.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </SubSection>,
              );
            }
            return nodes;
          })()
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
      )}
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
      <figure className="group relative overflow-hidden rounded-xl border border-border bg-secondary/30 shadow-md">
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
