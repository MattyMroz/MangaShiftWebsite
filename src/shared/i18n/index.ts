import en from "./en.json";

const dictionaries = { en } as const;

export type Locale = keyof typeof dictionaries;
export const defaultLocale: Locale = "en";

type Dict = typeof en;

export const t = (key: string, locale: Locale = defaultLocale): string => {
  const value = key.split(".").reduce<unknown>(
    (acc, k) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[k] : undefined),
    dictionaries[locale],
  );
  return typeof value === "string" ? value : key;
};

export const dict = (locale: Locale = defaultLocale): Dict => dictionaries[locale];
