import { cookies } from "next/headers";

import { THEMES_VALUES } from "@/constants/theme.const";
import { DEFAULT_VALUES } from "@/constants/cookies.const";
import { THEME_COOKIE_NAME } from "@/constants/cookies.const";

export type TTheme = (typeof THEMES_VALUES)[number];

export function getTheme(): TTheme {
  const cookieStore = cookies();
  const theme = cookieStore.get(THEME_COOKIE_NAME)?.value;
  if (!THEMES_VALUES.includes(theme as TTheme)) return DEFAULT_VALUES.theme as TTheme;
  return theme as TTheme;
}
