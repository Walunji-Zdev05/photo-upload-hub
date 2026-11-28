import { useCallback, useEffect, useState } from "react";

/**
 * Colour-mode choice for the site.
 *
 * Dark is the default. An explicit light or dark choice is remembered in
 * localStorage and written to <html data-theme="light|dark">.
 */

export const THEME_STORAGE_KEY = "0xdefend-theme";
export type Theme = "light" | "dark";

/** Dark unless the visitor explicitly chose light. */
export function resolveTheme(stored: Theme | null): Theme {
  return stored ?? "dark";
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
    setTheme(resolveTheme(readStoredTheme()));
  }, []);

  const toggle = useCallback(() => {
    const current = theme ?? resolveTheme(readStoredTheme());
    const next: Theme = current === "dark" ? "light" : "dark";
    writeStoredTheme(next);
    applyTheme(next);
    setTheme(next);
  }, [theme]);

  return { theme, toggle };
}
