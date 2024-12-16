import React, { createContext, useContext, useState, useEffect } from "react";
import enUS from "../../resources/en-US.json";
import ptBR from "../../resources/pt-BR.json";
import { ModulesIdentifier } from "../../types/strings/ModulesIdentifier";

const dictionaries = {
  "en-US": enUS,
  "pt-BR": ptBR,
};

type Locale = "en-US" | "pt-BR";

interface LocaleContextType {
  locale: Locale;
  commonLocale: { get: (key: keyof ModulesIdentifier["common"]) => string };
  templatesLocale: {
    get: (key: keyof ModulesIdentifier["templates"]) => string;
  };
  changeLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState<Locale>("en-US");
  const [dictionary, setDictionary] = useState<ModulesIdentifier>(
    dictionaries["en-US"]
  );

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    setDictionary(dictionaries[newLocale]);
  };

  useEffect(() => {
    setDictionary(dictionaries[locale]);
  }, [locale]);

  const commonLocale = {
    get: (key: keyof ModulesIdentifier["common"]) => dictionary.common[key],
  };

  const templatesLocale = {
    get: (key: keyof ModulesIdentifier["templates"]) =>
      dictionary.templates[key],
  };

  return (
    <LocaleContext.Provider
      value={{ locale, commonLocale, templatesLocale, changeLocale }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};

export { LocaleProvider, useLocale };
