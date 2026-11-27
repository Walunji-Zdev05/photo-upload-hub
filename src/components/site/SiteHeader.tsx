import { useRef, useState } from "react";
import { Contrast, Menu, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/hooks/use-theme";

const NAV = [
  ["home", "Home"], ["how-to-play", "How to play"], ["scrap", "Collect scrap"],
  ["player", "Meet the player"], ["enemies", "Meet the enemies"], ["explore", "Explore the game"],
  ["levels", "Levels and hazards"], ["video", "Video"], ["gallery", "Gallery"],
  ["team", "The team"], ["download", "Download"],
] as const;

export function SiteHeader() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const destination = useRef<string | null>(null);
  const label = theme === "dark" ? "Switch to light mode" : theme === "light" ? "Switch to dark mode" : "Choose light or dark mode";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center gap-3 px-5 py-3">
        <a href="#home" className="shrink-0 font-display text-xl font-bold"><span className="text-primary">0x</span>DEFEND</a>
        <ul className="ml-auto hidden items-center gap-1 text-sm text-muted-foreground min-[1320px]:flex">
          {NAV.slice(1).map(([id, name]) => <li key={id}><a href={`#${id}`} className="block px-1 py-2 hover:text-primary focus-visible:text-primary">{name}</a></li>)}
        </ul>
        <Button type="button" variant="outline" size="icon" onClick={toggle} aria-label={label} title={label} className="ml-auto min-h-11 min-w-11 shrink-0 rounded-sm bg-card text-foreground hover:bg-secondary hover:text-primary min-[1320px]:ml-0">
          {theme === "dark" ? <Sun /> : theme === "light" ? <Moon /> : <Contrast />}
        </Button>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Open menu" title="Open menu" className="min-h-11 min-w-11 shrink-0 rounded-sm min-[1320px]:hidden"><Menu /></Button>
          </SheetTrigger>
          <SheetContent className="w-full max-w-sm overflow-y-auto px-6 pb-8 pt-7" onCloseAutoFocus={(event) => {
            const id = destination.current;
            destination.current = null;
            if (!id) return;
            const section = document.getElementById(id);
            if (!section) return;
            event.preventDefault();
            section.focus({ preventScroll: true });
            section.scrollIntoView({ behavior: "instant", block: "start" });
          }}>
            <SheetTitle className="pr-14 font-display text-2xl"><span className="text-primary">0x</span>DEFEND</SheetTitle>
            <SheetDescription className="sr-only">Site navigation</SheetDescription>
            <nav aria-label="Section menu" className="mt-7">
              <ul className="space-y-1">
                {NAV.map(([id, name]) => <li key={id}><a href={`#${id}`} onClick={() => { destination.current = id; setOpen(false); }} className="block min-h-11 border-b border-border py-3 font-display text-lg hover:text-primary focus-visible:text-primary">{name}</a></li>)}
              </ul>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}