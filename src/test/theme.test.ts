import { describe, expect, it } from "vitest";
import { applyTheme, resolveTheme, THEME_STORAGE_KEY, writeStoredTheme } from "@/hooks/use-theme";

describe("colour-mode choice", () => {
  it("defaults to the device setting when nothing is stored", () => {
    expect(resolveTheme(null, true)).toBe("dark");
    expect(resolveTheme(null, false)).toBe("light");
  });

  it("keeps an explicit choice ahead of the device setting", () => {
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });

  it("remembers the choice and marks the page with it", () => {
    expect(THEME_STORAGE_KEY).toBe("0xdefend-theme");
    writeStoredTheme("light");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    applyTheme("light");
    expect(document.documentElement.dataset["theme"]).toBe("light");
  });
});
