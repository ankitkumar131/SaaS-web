import type { ReactNode } from "react";
import DocsTopbar from "@/components/docs/docs-topbar";
import DocsSidebar from "@/components/docs/docs-sidebar";

export default function DocsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-ink-950">
      <div className="pointer-events-none fixed inset-0 -z-10 grid-bg opacity-[0.35] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <DocsTopbar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12">
          <DocsSidebar />
          <main className="min-w-0 py-10 lg:py-14">{children}</main>
        </div>
      </div>
    </div>
  );
}
