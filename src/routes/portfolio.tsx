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
} from "lucide-react";

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

type CaseStudy = {
  id: string;
  title: string;
  role: string;
  year: string;
  badges: string[];
};

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "project-one",
    title: "Project One — Coming Soon",
    role: "Lead Hardware & Firmware Engineer",
    year: "2025",
    badges: ["STM32", "Custom PCB", "EasyEDA", "C/C++", "FreeRTOS"],
  },
  {
    id: "project-two",
    title: "Project Two — Coming Soon",
    role: "Embedded Systems Designer",
    year: "2024",
    badges: ["ESP32", "IMU", "SolidWorks", "BLE", "Low-Power"],
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

function CaseStudySection({ study, index }: { study: CaseStudy; index: number }) {
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
        <p className="mt-3 text-primary">{study.role}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {study.badges.map((b) => (
            <span
              key={b}
              className="rounded-md border border-border bg-secondary/60 px-2.5 py-1 font-mono text-xs text-muted-foreground"
            >
              {b}
            </span>
          ))}
        </div>
      </header>

      <div className="space-y-12 p-8 md:p-12">
        {/* Problem & Scope */}
        <SubSection icon={Target} kicker="01" title="Problem & Scope">
          <SkeletonText lines={4} />
        </SubSection>

        {/* System Architecture */}
        <SubSection icon={Layers} kicker="02" title="Interactive System Architecture">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-4">
              <SkeletonText lines={6} />
              <div className="space-y-2">
                {["Block A", "Block B", "Block C"].map((b) => (
                  <div
                    key={b}
                    className="flex items-center justify-between rounded-lg border border-border bg-background/40 px-4 py-3 text-sm"
                  >
                    <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      <CircuitBoard className="h-4 w-4 text-primary" />
                      {b}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground/60">—</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ImagePlaceholder label="System Block" />
              <ImagePlaceholder label="PCB Layout" />
              <ImagePlaceholder label="Breadboard" />
              <ImagePlaceholder label="Enclosure" />
            </div>
          </div>
        </SubSection>

        {/* Key Highlights */}
        <SubSection icon={Sparkles} kicker="03" title="Key Highlights">
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
        </SubSection>

        {/* Technical Deep-Dive */}
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

            <ol className="mt-4 space-y-3 border-l border-border pl-6">
              {[1, 2, 3].map((step) => (
                <li key={step} className="relative">
                  <span className="absolute -left-[31px] grid h-6 w-6 place-items-center rounded-full border border-border bg-card font-mono text-xs text-primary">
                    {step}
                  </span>
                  <div className="rounded-lg border border-border bg-background/40 p-4">
                    <SkeletonText lines={2} />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </SubSection>
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

function ImagePlaceholder({ label }: { label: string }) {
  return (
    <div className="group relative flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-background/40 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary">
      <ImageIcon className="h-6 w-6" />
      <span className="font-mono text-[10px] uppercase tracking-[0.2em]">{label}</span>
    </div>
  );
}
