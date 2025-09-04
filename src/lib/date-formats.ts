import { format as dateFnsFormat } from "date-fns";
import type { Locale } from "date-fns";

// Locale-specific date format patterns
export const dateFormats = {
  // East Asian languages
  ko: {
    // Korean formats
    monthYear: "yyyy년 M월",
    fullDate: "yyyy년 M월 d일",
    dateRange: "yyyy년 M월 d일",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "M월 d일",
    time12h: "a h:mm",
    time24h: "HH:mm",
    dateTime: "yyyy년 M월 d일 EEEE",
    dateTimeWithTime: "yyyy년 M월 d일 a h:mm",
    yearRange: "yyyy년",
    monthDay: "M월 d일",
    dayOfWeek: "EEE요일",
  },
  ja: {
    // Japanese formats - Official format: yyyy年M月 (2025年9月)
    monthYear: "yyyy年M月",
    fullDate: "yyyy年M月d日",
    dateRange: "yyyy年M月d日",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "M月d日",
    time12h: "HH:mm",
    time24h: "HH:mm",
    dateTime: "yyyy年M月d日(EEEE)",
    dateTimeWithTime: "yyyy年M月d日 HH:mm",
    yearRange: "yyyy年",
    monthDay: "M月d日",
    dayOfWeek: "EEE曜日",
  },
  zh: {
    // Chinese (Simplified & Traditional) formats
    monthYear: "yyyy年M月",
    fullDate: "yyyy年M月d日",
    dateRange: "yyyy年M月d日",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "M月d日",
    time12h: "HH:mm",
    time24h: "HH:mm",
    dateTime: "yyyy年M月d日 EEEE",
    dateTimeWithTime: "yyyy年M月d日 HH:mm",
    yearRange: "yyyy年",
    monthDay: "M月d日",
    dayOfWeek: "EEEE",
  },

  // European languages
  de: {
    // German formats
    monthYear: "MMMM yyyy",
    fullDate: "d. MMMM yyyy",
    dateRange: "d. MMM yyyy",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "d. MMM",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "EEEE, d. MMMM yyyy",
    dateTimeWithTime: "d. MMMM yyyy, HH:mm",
    yearRange: "yyyy",
    monthDay: "d. MMM",
    dayOfWeek: "EEE",
  },
  fr: {
    // French formats
    monthYear: "MMMM yyyy",
    fullDate: "d MMMM yyyy",
    dateRange: "d MMM yyyy",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "d MMM",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "EEEE d MMMM yyyy",
    dateTimeWithTime: "d MMMM yyyy à HH:mm",
    yearRange: "yyyy",
    monthDay: "d MMM",
    dayOfWeek: "EEE",
  },
  es: {
    // Spanish formats
    monthYear: "MMMM 'de' yyyy",
    fullDate: "d 'de' MMMM 'de' yyyy",
    dateRange: "d MMM yyyy",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "d 'de' MMM",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "EEEE, d 'de' MMMM 'de' yyyy",
    dateTimeWithTime: "d 'de' MMMM 'de' yyyy, HH:mm",
    yearRange: "yyyy",
    monthDay: "d MMM",
    dayOfWeek: "EEE",
  },
  it: {
    // Italian formats
    monthYear: "MMMM yyyy",
    fullDate: "d MMMM yyyy",
    dateRange: "d MMM yyyy",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "d MMM",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "EEEE d MMMM yyyy",
    dateTimeWithTime: "d MMMM yyyy, HH:mm",
    yearRange: "yyyy",
    monthDay: "d MMM",
    dayOfWeek: "EEE",
  },
  pt: {
    // Portuguese formats
    monthYear: "MMMM 'de' yyyy",
    fullDate: "d 'de' MMMM 'de' yyyy",
    dateRange: "d 'de' MMM 'de' yyyy",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "d 'de' MMM",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "EEEE, d 'de' MMMM 'de' yyyy",
    dateTimeWithTime: "d 'de' MMMM 'de' yyyy às HH:mm",
    yearRange: "yyyy",
    monthDay: "d 'de' MMM",
    dayOfWeek: "EEE",
  },
  ru: {
    // Russian formats
    monthYear: "LLLL yyyy",
    fullDate: "d MMMM yyyy",
    dateRange: "d MMM yyyy",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "d MMM",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "EEEE, d MMMM yyyy",
    dateTimeWithTime: "d MMMM yyyy, HH:mm",
    yearRange: "yyyy",
    monthDay: "d MMM",
    dayOfWeek: "EEE",
  },
  nl: {
    // Dutch formats
    monthYear: "MMMM yyyy",
    fullDate: "d MMMM yyyy",
    dateRange: "d MMM yyyy",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "d MMM",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "EEEE d MMMM yyyy",
    dateTimeWithTime: "d MMMM yyyy, HH:mm",
    yearRange: "yyyy",
    monthDay: "d MMM",
    dayOfWeek: "EEE",
  },

  // Middle Eastern & South Asian languages
  ar: {
    // Arabic formats
    monthYear: "MMMM yyyy",
    fullDate: "d MMMM yyyy",
    dateRange: "d MMM yyyy",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "d MMM",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "EEEE، d MMMM yyyy",
    dateTimeWithTime: "d MMMM yyyy، HH:mm",
    yearRange: "yyyy",
    monthDay: "d MMM",
    dayOfWeek: "EEE",
  },
  hi: {
    // Hindi formats
    monthYear: "MMMM yyyy",
    fullDate: "d MMMM yyyy",
    dateRange: "d MMM yyyy",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "d MMM",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "EEEE, d MMMM yyyy",
    dateTimeWithTime: "d MMMM yyyy, HH:mm",
    yearRange: "yyyy",
    monthDay: "d MMM",
    dayOfWeek: "EEE",
  },

  // Southeast Asian languages
  th: {
    // Thai formats
    monthYear: "MMMM yyyy",
    fullDate: "d MMMM yyyy",
    dateRange: "d MMM yyyy",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "d MMM",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "EEEEที่ d MMMM yyyy",
    dateTimeWithTime: "d MMMM yyyy, HH:mm",
    yearRange: "yyyy",
    monthDay: "d MMM",
    dayOfWeek: "EEE",
  },
  vi: {
    // Vietnamese formats
    monthYear: "'Tháng' M 'năm' yyyy",
    fullDate: "'Ngày' d 'tháng' M 'năm' yyyy",
    dateRange: "d MMM yyyy",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "'Ngày' d 'tháng' M",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "EEEE, 'ngày' d 'tháng' M 'năm' yyyy",
    dateTimeWithTime: "'Ngày' d 'tháng' M 'năm' yyyy, HH:mm",
    yearRange: "'Năm' yyyy",
    monthDay: "d MMM",
    dayOfWeek: "EEE",
  },
  id: {
    // Indonesian formats
    monthYear: "MMMM yyyy",
    fullDate: "d MMMM yyyy",
    dateRange: "d MMM yyyy",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "d MMM",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "EEEE, d MMMM yyyy",
    dateTimeWithTime: "d MMMM yyyy, HH:mm",
    yearRange: "yyyy",
    monthDay: "d MMM",
    dayOfWeek: "EEE",
  },

  // Nordic languages
  sv: {
    // Swedish formats
    monthYear: "MMMM yyyy",
    fullDate: "d MMMM yyyy",
    dateRange: "d MMM yyyy",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "d MMM",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "EEEE d MMMM yyyy",
    dateTimeWithTime: "d MMMM yyyy, HH:mm",
    yearRange: "yyyy",
    monthDay: "d MMM",
    dayOfWeek: "EEE",
  },
  fi: {
    // Finnish formats
    monthYear: "MMMM yyyy",
    fullDate: "d. MMMM'ta' yyyy",
    dateRange: "d. MMM yyyy",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "d. MMM",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "EEEE d. MMMM'ta' yyyy",
    dateTimeWithTime: "d. MMMM'ta' yyyy 'klo' HH:mm",
    yearRange: "yyyy",
    monthDay: "d. MMM",
    dayOfWeek: "EEE",
  },
  da: {
    // Danish formats
    monthYear: "MMMM yyyy",
    fullDate: "d. MMMM yyyy",
    dateRange: "d. MMM yyyy",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "d. MMM",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "EEEE 'd.' d. MMMM yyyy",
    dateTimeWithTime: "d. MMMM yyyy 'kl.' HH:mm",
    yearRange: "yyyy",
    monthDay: "d. MMM",
    dayOfWeek: "EEE",
  },
  no: {
    // Norwegian formats
    monthYear: "MMMM yyyy",
    fullDate: "d. MMMM yyyy",
    dateRange: "d. MMM yyyy",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "d. MMM",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "EEEE d. MMMM yyyy",
    dateTimeWithTime: "d. MMMM yyyy, HH:mm",
    yearRange: "yyyy",
    monthDay: "d. MMM",
    dayOfWeek: "EEE",
  },

  // Eastern European languages
  pl: {
    // Polish formats
    monthYear: "LLLL yyyy",
    fullDate: "d MMMM yyyy",
    dateRange: "d MMM yyyy",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "d MMM",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "EEEE, d MMMM yyyy",
    dateTimeWithTime: "d MMMM yyyy, HH:mm",
    yearRange: "yyyy",
    monthDay: "d MMM",
    dayOfWeek: "EEE",
  },
  cs: {
    // Czech formats
    monthYear: "LLLL yyyy",
    fullDate: "d. MMMM yyyy",
    dateRange: "d. M. yyyy",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "d. MMM",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "EEEE d. MMMM yyyy",
    dateTimeWithTime: "d. MMMM yyyy, HH:mm",
    yearRange: "yyyy",
    monthDay: "d. MMM",
    dayOfWeek: "EEE",
  },
  hu: {
    // Hungarian formats
    monthYear: "yyyy. MMMM",
    fullDate: "yyyy. MMMM d.",
    dateRange: "yyyy. MMM d.",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "MMM d.",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "yyyy. MMMM d., EEEE",
    dateTimeWithTime: "yyyy. MMMM d., HH:mm",
    yearRange: "yyyy",
    monthDay: "MMM d.",
    dayOfWeek: "EEE",
  },

  // Turkish
  tr: {
    // Turkish formats
    monthYear: "MMMM yyyy",
    fullDate: "d MMMM yyyy",
    dateRange: "d MMM yyyy",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "d MMM",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "d MMMM yyyy EEEE",
    dateTimeWithTime: "d MMMM yyyy, HH:mm",
    yearRange: "yyyy",
    monthDay: "d MMM",
    dayOfWeek: "EEE",
  },

  // English (default)
  en: {
    // English formats
    monthYear: "MMMM yyyy",
    fullDate: "MMMM d, yyyy",
    dateRange: "MMM d, yyyy",
    weekday: "EEEE",
    weekdayShort: "EEE",
    dayMonth: "MMM d",
    time12h: "h:mm a",
    time24h: "HH:mm",
    dateTime: "EEEE, MMMM d, yyyy",
    dateTimeWithTime: "MMMM d, yyyy h:mm a",
    yearRange: "yyyy",
    monthDay: "MMM d",
    dayOfWeek: "EEE",
  },
};

export type DateFormatKey = keyof typeof dateFormats.en;
export type SupportedLanguage = keyof typeof dateFormats;

/**
 * Get localized date format pattern
 */
export function getDateFormat(language: string, formatKey: DateFormatKey): string {
  // Check if we have specific formats for this language
  const langKey = language.split("-")[0]; // Handle language variants like zh-CN, pt-BR

  // Type guard to check if langKey is a supported language
  if (langKey in dateFormats) {
    const typedLangKey = langKey as SupportedLanguage;
    return dateFormats[typedLangKey][formatKey];
  }

  // Default to English formats
  return dateFormats.en[formatKey];
}

/**
 * Format date with locale-specific pattern
 */
export function formatDate(date: Date, formatKey: DateFormatKey, language: string, locale: Locale): string {
  const formatPattern = getDateFormat(language, formatKey);
  return dateFnsFormat(date, formatPattern, { locale });
}

/**
 * Format date range with locale-specific pattern
 */
export function formatDateRange(startDate: Date, endDate: Date, language: string, locale: Locale): string {
  const formatPattern = getDateFormat(language, "dateRange");
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();
  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();

  // Special handling for specific languages
  if (language === "ko") {
    // Korean style: "2025년 9월 1일 - 9월 30일" (if same year)
    if (startYear === endYear) {
      if (startMonth === endMonth) {
        return `${dateFnsFormat(startDate, "yyyy년 M월 d일", { locale })} - ${dateFnsFormat(endDate, "d일", { locale })}`;
      } else {
        return `${dateFnsFormat(startDate, "yyyy년 M월 d일", { locale })} - ${dateFnsFormat(endDate, "M월 d일", { locale })}`;
      }
    }
    return `${dateFnsFormat(startDate, formatPattern, { locale })} - ${dateFnsFormat(endDate, formatPattern, { locale })}`;
  }

  if (language === "ja") {
    // Japanese style with wave dash (～)
    if (startYear === endYear) {
      if (startMonth === endMonth) {
        return `${dateFnsFormat(startDate, "yyyy年M月d日", { locale })}～${dateFnsFormat(endDate, "d日", { locale })}`;
      } else {
        return `${dateFnsFormat(startDate, "yyyy年M月d日", { locale })}～${dateFnsFormat(endDate, "M月d日", { locale })}`;
      }
    }
    return `${dateFnsFormat(startDate, formatPattern, { locale })}～${dateFnsFormat(endDate, formatPattern, { locale })}`;
  }

  if (language === "zh" || language === "zh-CN" || language === "zh-TW") {
    // Chinese style with dash (-)
    if (startYear === endYear) {
      if (startMonth === endMonth) {
        return `${dateFnsFormat(startDate, "yyyy年M月d日", { locale })}-${dateFnsFormat(endDate, "d日", { locale })}`;
      } else {
        return `${dateFnsFormat(startDate, "yyyy年M月d日", { locale })}-${dateFnsFormat(endDate, "M月d日", { locale })}`;
      }
    }
    return `${dateFnsFormat(startDate, formatPattern, { locale })}-${dateFnsFormat(endDate, formatPattern, { locale })}`;
  }

  if (language === "de" || language === "nl" || language === "da" || language === "no" || language === "nb") {
    // German/Dutch/Danish/Norwegian style with dash
    const separator = language === "de" ? " – " : " - ";
    if (startYear === endYear) {
      if (startMonth === endMonth) {
        return `${dateFnsFormat(startDate, "d.", { locale })}${separator}${dateFnsFormat(endDate, "d. MMMM yyyy", { locale })}`;
      }
      return `${dateFnsFormat(startDate, "d. MMM", { locale })}${separator}${dateFnsFormat(endDate, "d. MMM yyyy", { locale })}`;
    }
    return `${dateFnsFormat(startDate, formatPattern, { locale })}${separator}${dateFnsFormat(endDate, formatPattern, { locale })}`;
  }

  if (language === "fr") {
    // French style with "au"
    if (startYear === endYear && startMonth === endMonth) {
      return `Du ${dateFnsFormat(startDate, "d", { locale })} au ${dateFnsFormat(endDate, "d MMMM yyyy", { locale })}`;
    }
    return `Du ${dateFnsFormat(startDate, formatPattern, { locale })} au ${dateFnsFormat(endDate, formatPattern, { locale })}`;
  }

  if (language === "es" || language === "it") {
    // Spanish/Italian style
    const separator = language === "es" ? " al " : " al ";
    if (startYear === endYear && startMonth === endMonth) {
      return `${dateFnsFormat(startDate, "d", { locale })}${separator}${dateFnsFormat(endDate, "d 'de' MMMM 'de' yyyy", { locale })}`;
    }
    return `${dateFnsFormat(startDate, formatPattern, { locale })}${separator}${dateFnsFormat(endDate, formatPattern, { locale })}`;
  }

  if (language === "pt" || language === "pt-BR") {
    // Portuguese style
    if (startYear === endYear && startMonth === endMonth) {
      return `${dateFnsFormat(startDate, "d", { locale })} a ${dateFnsFormat(endDate, "d 'de' MMMM 'de' yyyy", { locale })}`;
    }
    return `${dateFnsFormat(startDate, formatPattern, { locale })} a ${dateFnsFormat(endDate, formatPattern, { locale })}`;
  }

  if (language === "ru" || language === "pl" || language === "cs") {
    // Russian/Polish/Czech style
    const separator = " – ";
    if (startYear === endYear && startMonth === endMonth) {
      return `${dateFnsFormat(startDate, "d", { locale })}${separator}${dateFnsFormat(endDate, "d MMMM yyyy", { locale })}`;
    }
    return `${dateFnsFormat(startDate, formatPattern, { locale })}${separator}${dateFnsFormat(endDate, formatPattern, { locale })}`;
  }

  if (language === "hu") {
    // Hungarian style
    if (startYear === endYear && startMonth === endMonth) {
      return `${dateFnsFormat(startDate, "yyyy. MMM d.", { locale })}-${dateFnsFormat(endDate, "d.", { locale })}`;
    }
    return `${dateFnsFormat(startDate, formatPattern, { locale })} – ${dateFnsFormat(endDate, formatPattern, { locale })}`;
  }

  // Default English style
  if (startYear === endYear) {
    if (startMonth === endMonth) {
      return `${dateFnsFormat(startDate, "MMM d", { locale })} - ${dateFnsFormat(endDate, "d, yyyy", { locale })}`;
    }
    return `${dateFnsFormat(startDate, "MMM d", { locale })} - ${dateFnsFormat(endDate, "MMM d, yyyy", { locale })}`;
  }
  return `${dateFnsFormat(startDate, formatPattern, { locale })} - ${dateFnsFormat(endDate, formatPattern, { locale })}`;
}

/**
 * Format time with locale-specific pattern
 */
export function formatTime(date: Date, language: string, locale: Locale, use24Hour: boolean = false): string {
  const langKey = language.split("-")[0];

  // Most European and Asian languages prefer 24-hour format
  const prefer24Hour = [
    "ja",
    "zh",
    "ko",
    "de",
    "fr",
    "es",
    "it",
    "pt",
    "ru",
    "nl",
    "pl",
    "cs",
    "hu",
    "tr",
    "sv",
    "fi",
    "da",
    "no",
    "nb",
    "th",
    "vi",
    "id",
  ].includes(langKey);

  const actualUse24Hour = use24Hour || prefer24Hour;
  const formatKey = actualUse24Hour ? "time24h" : "time12h";
  const formatPattern = getDateFormat(language, formatKey);

  // Special handling for Korean (오전/오후 before time)
  if (langKey === "ko" && !actualUse24Hour) {
    return dateFnsFormat(date, "a h:mm", { locale });
  }

  return dateFnsFormat(date, formatPattern, { locale });
}

/**
 * Format time range with locale-specific pattern
 */
export function formatTimeRange(startDate: Date, endDate: Date, language: string, locale: Locale, use24Hour: boolean = false): string {
  const startTime = formatTime(startDate, language, locale, use24Hour);
  const endTime = formatTime(endDate, language, locale, use24Hour);
  const langKey = language.split("-")[0];

  // Language-specific separators
  if (langKey === "ja") {
    return `${startTime}～${endTime}`; // Wave dash
  }
  if (langKey === "zh") {
    return `${startTime}-${endTime}`; // Hyphen
  }
  if (langKey === "de" || langKey === "ru" || langKey === "pl" || langKey === "cs") {
    return `${startTime} – ${endTime}`; // En dash
  }
  if (langKey === "fr") {
    return `${startTime} à ${endTime}`; // "à" (to)
  }
  if (langKey === "es" || langKey === "it") {
    return `${startTime} a ${endTime}`; // "a" (to)
  }
  if (langKey === "pt") {
    return `${startTime} às ${endTime}`; // "às" (at/to)
  }

  // Default dash separator
  return `${startTime} - ${endTime}`;
}
