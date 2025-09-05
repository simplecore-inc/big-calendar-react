import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import enCalendar from "@/i18n/locales/en/calendar.json";
import koCalendar from "@/i18n/locales/ko/calendar.json";
import jaCalendar from "@/i18n/locales/ja/calendar.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        calendar: enCalendar,
      },
      ko: {
        calendar: koCalendar,
      },
      ja: {
        calendar: jaCalendar,
      },
    },
    defaultNS: "calendar",
    ns: ["calendar"],
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "language",
      caches: ["localStorage"],
    },
  });

export default i18n;
