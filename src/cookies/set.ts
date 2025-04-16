import { THEME_COOKIE_NAME, THEME_COOKIE_MAX_AGE } from "@/constants/cookies.const";

import type { TTheme } from "@/types";

export function setTheme(theme: TTheme) {
  document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=${THEME_COOKIE_MAX_AGE}`;
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(theme);
}
