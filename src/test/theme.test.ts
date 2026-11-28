import { describe, expect, it } from "vitest";
import { applyTheme, resolveTheme, THEME_STORAGE_KEY, writeStoredTheme } from "@/hooks/use-theme";

describe("colour-mode choice", () => {
  it("defaults to dark when nothing is stored", () => {
    expect(resolveTheme(null)).toBe("dark");
  });

  it("keeps an explicit light or dark choice", () => {
    expect(resolveTheme("light")).toBe("light");
    expect(resolveTheme("dark")).toBe("dark");
  });

  it("remembers the choice and marks the page with it", () => {
    expect(THEME_STORAGE_KEY).toBe("0xdefend-theme");
    writeStoredTheme("light");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    applyTheme("light");
    expect(document.documentElement.dataset["theme"]).toBe("light");
  });
});
