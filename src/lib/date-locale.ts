import { enUS, ko, ja, zhCN, zhTW, de, fr, es, it, ptBR, pt, ru, nl, arSA, hi, th, vi, id as idLocale, sv, fi, da, nb, pl, cs, hu, tr } from "date-fns/locale";
import type { Locale } from "date-fns";

export const getDateLocale = (language: string): Locale => {
  switch (language) {
    // East Asian languages
    case "ko":
      return ko;
    case "ja":
      return ja;
    case "zh":
    case "zh-CN":
      return zhCN;
    case "zh-TW":
      return zhTW;

    // European languages
    case "de":
      return de;
    case "fr":
      return fr;
    case "es":
      return es;
    case "it":
      return it;
    case "pt":
      return pt;
    case "pt-BR":
      return ptBR;
    case "ru":
      return ru;
    case "nl":
      return nl;

    // Middle Eastern & South Asian
    case "ar":
    case "ar-SA":
      return arSA;
    case "hi":
      return hi;

    // Southeast Asian
    case "th":
      return th;
    case "vi":
      return vi;
    case "id":
      return idLocale;

    // Nordic
    case "sv":
      return sv;
    case "fi":
      return fi;
    case "da":
      return da;
    case "no":
    case "nb":
      return nb;

    // Eastern European
    case "pl":
      return pl;
    case "cs":
      return cs;
    case "hu":
      return hu;

    // Turkish
    case "tr":
      return tr;

    // Default
    case "en":
    default:
      return enUS;
  }
};

export const locales = {
  en: enUS,
  ko: ko,
  ja: ja,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  de: de,
  fr: fr,
  es: es,
  it: it,
  pt: pt,
  "pt-BR": ptBR,
  ru: ru,
  nl: nl,
  ar: arSA,
  hi: hi,
  th: th,
  vi: vi,
  id: idLocale,
  sv: sv,
  fi: fi,
  da: da,
  nb: nb,
  pl: pl,
  cs: cs,
  hu: hu,
  tr: tr,
};
