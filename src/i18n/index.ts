import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import en from "@/i18n/locales/en.json";
import ko from "@/i18n/locales/ko.json";
import ja from "@/i18n/locales/ja.json";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,

    resources: {
      en: {
        translation: en,
      },
      ko: {
        translation: ko,
      },
      ja: {
        translation: ja,
      },
    },

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ["localStorage", "cookie", "navigator", "htmlTag"],
      caches: ["localStorage", "cookie"],
    },
  });

export default i18n;
