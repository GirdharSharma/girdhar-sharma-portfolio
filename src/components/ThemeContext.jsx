"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const ACCENTS = [
  { id: "green", label: "Green", hex: "#22c55e" },
  { id: "blue", label: "Blue", hex: "#3b82f6" },
  { id: "purple", label: "Purple", hex: "#a855f7" },
  { id: "orange", label: "Orange", hex: "#f97316" },
];

const ThemeContext = createContext(null);

/**
 * Wrap the app once (e.g. in app/layout.js) with <ThemeProvider>.
 * It owns persistence + applying data-theme / data-accent to <html>.
 * It renders nothing visible — the settings UI now lives in NavRail.
 */
export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("dark");
  const [accent, setAccentState] = useState("green");

  useEffect(() => {
    const savedTheme = localStorage.getItem("gs-theme") || "dark";
    const savedAccent = localStorage.getItem("gs-accent") || "green";
    document.documentElement.setAttribute("data-theme", savedTheme);
    document.documentElement.setAttribute("data-accent", savedAccent);
    setThemeState(savedTheme);
    setAccentState(savedAccent);
  }, []);

  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("gs-theme", t);
    setThemeState(t);
  }

  function setAccent(a) {
    document.documentElement.setAttribute("data-accent", a);
    localStorage.setItem("gs-accent", a);
    setAccentState(a);
  }

  function toggleTheme() {
    setTheme(theme === "dark" ? "light" : "dark");
  }

  return (
    <ThemeContext.Provider
      value={{ theme, accent, setTheme, setAccent, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
