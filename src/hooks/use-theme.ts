import { useCallback, useEffect, useState } from "react";

/**
 * Colour-mode choice for the site.
 *
 * Default (nothing stored): the site follows the device's light/dark setting,
 * handled in src/styles.css by the prefers-color-scheme block.
 * An explicit choice is remembered in localStorage and written to
 * <html data-theme="light|dark">, which the CSS rules for [data-theme] honour.
 */

export const THEME_STORAGE_KEY = "0xdefend-theme";
export type Theme = "light" | "dark";

/** Effective theme: an explicit choice wins, otherwise follow the device. */
export function resolveTheme(stored: Theme | null, systemPrefersDark: boolean): Theme {
  return stored ?? (systemPrefersDark ? "dark" : "light");
}

export function readStoredTheme(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

export function writeStoredTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage blocked (private mode, disabled cookies): the choice still applies
    // for this visit through the data-theme attribute.
  }
}

export function systemPrefersDark(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset["theme"] = theme;
}

/**
 * Browser-only theme state. `theme` is null until the first client render, so
 * server HTML and the client's first paint match.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(resolveTheme(readStoredTheme(), systemPrefersDark()));

    // While no choice is stored, the device setting keeps driving the site.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (!readStoredTheme()) setTheme(resolveTheme(null, mq.matches));
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    const current = theme ?? resolveTheme(readStoredTheme(), systemPrefersDark());
    const next: Theme = current === "dark" ? "light" : "dark";
    writeStoredTheme(next);
    applyTheme(next);
    setTheme(next);
  }, [theme]);

  return { theme, toggle };
}
