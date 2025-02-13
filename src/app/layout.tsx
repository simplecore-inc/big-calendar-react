import "@/styles/globals.css";

import { inter, lexend, manrope } from "@/styles/fonts";

import { cn } from "@/utils/helpers/cn.helper";

import { getTheme } from "@/cookies/get";

import type { Viewport } from "next";
import { Header } from "@/components/layout/header";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode; dialog: React.ReactNode }) {
  const theme = getTheme();

  return (
    <html lang="pt-BR" className={cn(inter.variable, lexend.variable, manrope.variable, "bg-bg-primary text-t-primary", theme)}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
