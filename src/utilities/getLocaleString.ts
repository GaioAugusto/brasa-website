export const getLocaleString = <T extends Record<string, any>>(
  key: string | number | symbol,
  locale: T
): string => {
  if (typeof key === "string" && key in locale) {
    return locale[key];
  }
  return key.toString(); // Fallback to the raw key as a string
};
