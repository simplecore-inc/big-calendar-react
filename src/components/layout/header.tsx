import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";

import { ToggleTheme } from "@/components/layout/change-theme";

export function Header() {
  return (
    <header className="mx-auto flex h-[88px] w-full max-w-screen-2xl items-center justify-center">
      <div className="my-3 flex h-14 w-full items-center justify-between px-8">
        <div className="flex items-center gap-3.5">
          <div className="flex size-12 items-center justify-center rounded-full border p-3">
            <Calendar className="size-6 text-t-secondary" />
          </div>

          <div className="space-y-1">
            <p className="text-lg font-medium leading-6">Big calendar</p>
            <p className="text-sm text-t-secondary">
              Built with Next.js and Tailwind by{" "}
              <Link href="https://github.com/lramos33" target="_blank" className="inline-flex gap-0.5 text-sm underline">
                lramos33
                <ArrowUpRight size={12} className="text-t-tertiary" />
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link href="https://github.com/lramos33/beautiful-calendar" target="_blank" className="inline-flex gap-0.5 text-sm hover:underline">
            View on GitHub
            <ArrowUpRight size={14} className="text-t-tertiary" />
          </Link>

          <ToggleTheme />
        </div>
      </div>
    </header>
  );
}
