import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
  theme: "light",
  setTheme: () => {},
  loaded: false,
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("light");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3001/settings/1")
      .then((res) => res.json())
      .then((data) => {
        if (data?.theme) setThemeState(data.theme);
      })
      .catch(() => {})
      .finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.body.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);

    fetch("http://localhost:3001/settings/1", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ theme: newTheme }),
    }).catch(() => {
      // ignore
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, loaded }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
