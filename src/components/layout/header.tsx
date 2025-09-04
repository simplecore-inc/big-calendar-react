import { ArrowUpRight, Calendar } from "lucide-react";

import { ToggleTheme } from "@/components/layout/change-theme";
import { LanguageSelector } from "@/components/language-selector";

export function Header() {
  return (
    <header className="mx-auto flex h-[88px] w-full max-w-screen-2xl items-center justify-center">
      <div className="my-3 flex h-14 w-full items-center justify-between px-8">
        <div className="flex items-center gap-3.5">
          <div className="flex size-12 items-center justify-center rounded-full border p-3">
            <Calendar className="size-6 text-foreground" />
          </div>

          <div className="space-y-1">
            <p className="text-lg font-medium leading-6">Big calendar</p>
          </div>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="https://github.com/simplecore-inc/big-calendar-react"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex gap-0.5 text-sm hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            View on GitHub
            <ArrowUpRight size={14} className="text-foreground" />
          </a>

          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ToggleTheme />
          </div>
        </div>
      </div>
    </header>
  );
}
