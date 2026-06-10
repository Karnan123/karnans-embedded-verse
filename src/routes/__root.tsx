import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";

import appCss from "../styles.css?url";
import globalSpaceBg from "@/assets/global-space-bg.jpg";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Karnan Thamilchelvan — Computer Engineering Portfolio" },
      { name: "description", content: "Computer Engineering student at the University of Waterloo specializing in embedded systems, robotics, PCB design, FPGA, and industrial automation." },
      { name: "author", content: "Karnan Thamilchelvan" },
      { property: "og:title", content: "Karnan Thamilchelvan — Computer Engineering Portfolio" },
      { property: "og:description", content: "Computer Engineering student at the University of Waterloo specializing in embedded systems, robotics, PCB design, FPGA, and industrial automation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Karnan Thamilchelvan — Computer Engineering Portfolio" },
      { name: "twitter:description", content: "Computer Engineering student at the University of Waterloo specializing in embedded systems, robotics, PCB design, FPGA, and industrial automation." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0a06e26f-0bcc-4786-af46-f86ff7c78748/id-preview-e6275be8--2e1e648c-0eae-42fe-a8c0-f30a7d98429c.lovable.app-1779054151148.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0a06e26f-0bcc-4786-af46-f86ff7c78748/id-preview-e6275be8--2e1e648c-0eae-42fe-a8c0-f30a7d98429c.lovable.app-1779054151148.png" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const parallaxScale = 1 + Math.min(scrollY / 4000, 0.08);
  const parallaxY = Math.min(scrollY * 0.15, 120);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative min-h-screen">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 will-change-transform"
          style={{
            backgroundImage: `url(${globalSpaceBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#03030d",
            transform: `translate3d(0, ${parallaxY}px, 0) scale(${parallaxScale})`,
            transition: "transform 0.1s linear",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
        />
        <div className="relative z-10">
          <Outlet />
        </div>
      </div>
    </QueryClientProvider>
  );
}
