import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { Shot } from "./images";

export function Gallery({ shots }: { shots: Shot[] }) {
  const [open, setOpen] = useState<Shot | null>(null);
  return (
    <>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {shots.map((s) => (
          <li key={s.src}>
            <button
              type="button"
              onClick={() => setOpen(s)}
              className="group block w-full overflow-hidden border border-border bg-card text-left transition-colors hover:border-primary"
              aria-label={`Open larger: ${s.caption}`}
            >
              <img src={s.src} alt={s.alt} loading="lazy" className="aspect-video w-full object-cover transition-transform group-hover:scale-105 motion-reduce:transition-none" />
              <span className="block px-3 py-2 font-mono text-xs text-muted-foreground">{s.caption}</span>
            </button>
          </li>
        ))}
      </ul>
      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-5xl border-primary bg-card p-3">
          {open && (
            <figure>
              <img src={open.src} alt={open.alt} className="w-full" />
              <figcaption className="pt-3">
                <DialogTitle className="font-display text-lg">{open.caption}</DialogTitle>
                <DialogDescription>{open.alt}</DialogDescription>
              </figcaption>
            </figure>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
