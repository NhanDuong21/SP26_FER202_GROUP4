import { createContext, useContext, useEffect, useState } from "react";
import translations from "../i18n/translations";

const LanguageContext = createContext({
  language: "vi",
  setLanguage: () => {},
  t: (key) => key,
  loaded: false,
});

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("vi");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/settings/1")
      .then((res) => res.json())
      .then((data) => {
        if (data?.language) setLanguage(data.language);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  const updateLanguage = (lang) => {
    setLanguage(lang);

    // persist language to settings
    fetch("http://localhost:3001/settings/1", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language: lang }),
    }).catch(() => {
      // ignore
    });
  };

  const t = (key) => {
    if (!key) return key;
    if (language === "en") {
      return translations.en[key] ?? key;
    }
    // default to Vietnamese
    return translations.vi[key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: updateLanguage, t, loaded }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
