import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useThemeStore } from "@/stores/theme-store";

export function ToggleTheme() {
  const { theme, toggleTheme, applyTheme } = useThemeStore();

  // Apply theme on mount to ensure consistency
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // Show skeleton during hydration to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <Skeleton className="size-9" />;

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      {theme === "light" && <Sun />}
      {theme === "dark" && <Moon />}
    </Button>
  );
}
