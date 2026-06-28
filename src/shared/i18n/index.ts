import en from "./en.json";

// Dodanie języka = 1 krok: skopiuj en.json -> <kod>.json, przetłumacz wartości,
// zaimportuj i dopisz tutaj. Switcher i t() podchwycą go automatycznie
// (LanguageSwitcher filtruje katalog przez availableLocales).
// Brakujące klucze w nowym języku spadają na EN (fallback w t()).
const dictionaries = { en } as const;

export type Locale = keyof typeof dictionaries;
export const defaultLocale: Locale = "en";

export const LOCALE_STORAGE_KEY = "locale";

export const availableLocales = Object.keys(dictionaries) as Locale[];

type Dict = typeof en;

const isLocale = (value: string | null): value is Locale =>
  value !== null && value in dictionaries;

const activeLocale = (): Locale => {
  if (typeof window === "undefined") return defaultLocale;
  const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
  return isLocale(stored) ? stored : defaultLocale;
};

const lookup = (key: string, locale: Locale): string | undefined => {
  const value = key.split(".").reduce<unknown>(
    (acc, k) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[k] : undefined),
    dictionaries[locale],
  );
  return typeof value === "string" ? value : undefined;
};

export const t = (key: string, locale: Locale = activeLocale()): string =>
  lookup(key, locale) ?? lookup(key, defaultLocale) ?? key;

export const dict = (locale: Locale = activeLocale()): Dict => dictionaries[locale];
