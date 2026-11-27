import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Contrast, Download, Mail, Monitor, Moon, Play, Smartphone, Sun } from "lucide-react";
import { CONFIG } from "@/lib/site-config";
import { useTheme } from "@/hooks/use-theme";
import { IMG, GALLERY, type Shot } from "@/components/site/images";
import { BinaryRain } from "@/components/site/BinaryRain";
import { Gallery } from "@/components/site/Gallery";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "0xDEFEND — Co-op antivirus platformer" },
      { name: "description", content: "Play an antivirus hero inside a computer. Collect scrap, fight malware and protect the Core Wall with up to 4 players." },
      { property: "og:title", content: "0xDEFEND — Protect. Collect. Survive." },
      { property: "og:description", content: "A co-op 3D action-adventure platformer and ICT academic project from UNIMA." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["home", "Home"], ["how-to-play", "How to play"], ["scrap", "Collect scrap"], ["player", "Meet the player"],
  ["enemies", "Meet the enemies"], ["explore", "Explore the game"], ["levels", "Levels and hazards"],
  ["video", "Video"], ["gallery", "Gallery"], ["team", "The team"], ["download", "Download"],
] as const;

function Section({ id, kicker, title, children, alt }: { id: string; kicker: string; title: string; children: ReactNode; alt?: boolean }) {
  return (
    <section id={id} className={`scroll-mt-20 px-5 py-20 ${alt ? "bg-muted/40" : ""}`}>
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{kicker}</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-primary md:text-4xl">{title}</h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

function Fig({ shot, className = "" }: { shot: Shot; className?: string }) {
  return (
    <figure className={`frame-corners border border-border bg-card ${className}`}>
      <img src={shot.src} alt={shot.alt} loading="lazy" className="aspect-video w-full object-cover" />
      <figcaption className="px-3 py-2 font-mono text-xs text-muted-foreground">{shot.caption}</figcaption>
    </figure>
  );
}

function DownloadCard({ icon, platform, url, version, sha }: { icon: ReactNode; platform: string; url: string; version: string; sha: string }) {
  return (
    <div className="frame-corners border border-border bg-card p-5">
      <div className="flex items-center gap-3">
        <span className="text-primary">{icon}</span>
        <h3 className="font-display text-xl font-bold">{platform}</h3>
      </div>
      {url ? (
        <>
          <a href={url} className="mt-4 inline-flex items-center gap-2 bg-primary px-4 py-2 font-semibold text-primary-foreground hover:bg-primary/90">
            <Download className="h-4 w-4" /> Download for {platform}{version ? ` · v${version}` : ""}
          </a>
          {sha && <p className="mt-2 break-all font-mono text-xs text-muted-foreground">SHA-256: {sha}</p>}
        </>
      ) : (
        <p className="mt-4 inline-block border border-dashed border-border px-4 py-2 font-mono text-sm text-muted-foreground">{platform} download coming soon</p>
      )}
    </div>
  );
}

const LOOP = [
  ["01", "Explore", "Travel from the Base on the ship and drop into the CPU level.", IMG.ship],
  ["02", "Collect", "Find glowing green scrap files. Press E to pick one up.", IMG.collectingScrap],
  ["03", "Fight", "Hold right click to aim and left click to shoot malware.", IMG.worms],
  ["04", "Defend", "When the alert sounds, secure the Core Wall before it falls.", IMG.underAttack],
  ["05", "Upgrade", "Spend scrap to reinforce the Core Wall between waves.", IMG.coreWall],
] as const;

const ENEMIES = [
  ["Phishing Spider", "Hides among scrap and attacks when you get close to collect it.", IMG.wallSide],
  ["Logic Bomb", "Waits in place and explodes when you come near.", IMG.logicBomb],
  ["Worm", "Makes copies of itself, so one worm can become a swarm.", IMG.worms],
  ["Data Miner", "Runs after you and can steal the scrap you are carrying.", null],
] as const;

const TEAM = [
  ["Walunji Kumwenda", "Project Leader", "Level design, physics and gravity, Base and CPU layouts, scrap drop physics, extraction zone, Core Wall upgrade logic, enemy AI"],
  ["Kondwani Padyera", "Project Manager", "Multiplayer and networking, combat, wave and aiming systems, optimisation"],
  ["Miriam Phiri", "Role to be confirmed", "HUD, menus and lobby, hazards and level dressing, tutorial, sound effects and music, visual effects"],
  ["Rosemary Nyirenda", "Role to be confirmed", "Android and Windows platform layer and shared controls, splash, boot, game-over and upgrade screens, spectator mode"],
  ["Paul Kabondo", "Role to be confirmed", "3D enemy, scrap and player models, animations, player movement, Data Miner AI, combat testing"],
] as const;

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const label =
    theme === "dark"
      ? "Switch to light mode"
      : theme === "light"
        ? "Switch to dark mode"
        : "Choose light or dark mode";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="ml-auto min-h-11 min-w-11 shrink-0 rounded-sm bg-card text-foreground hover:border-primary hover:bg-secondary hover:text-primary"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : theme === "light" ? <Moon className="h-4 w-4" /> : <Contrast className="h-4 w-4" />}
    </Button>
  );
}

function Index() {
  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">Skip to content</a>
      <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
        <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
          <a href="#home" className="shrink-0 font-display text-xl font-bold"><span className="text-primary">0x</span>DEFEND</a>
          <ul className="-m-1 flex min-w-0 flex-1 gap-1.5 overflow-x-auto whitespace-nowrap p-1 text-sm text-muted-foreground [scrollbar-width:none]">
            {NAV.slice(1).map(([id, label]) => (
              <li key={id}><a href={`#${id}`} className="block px-1 py-2 hover:text-primary focus-visible:text-primary">{label}</a></li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        <section id="home" className="relative overflow-hidden px-5 pb-20 pt-16">
          <BinaryRain />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">System nominal · Threat level rising</p>
              <h1 className="mt-3 font-display text-6xl font-bold md:text-7xl"><span className="text-primary">0x</span>DEFEND</h1>
              <p className="mt-2 font-display text-xl text-warning">Protect. Collect. Survive.</p>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                A co-op 3D action-adventure platformer. You are an antivirus hero inside a computer: team up with up to 3 friends, collect scrap, fight malware and protect the Core Wall.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[["Windows", CONFIG.windowsUrl, Monitor], ["Android", CONFIG.apkUrl, Smartphone]].map(([p, url, Icon]) => {
                  const I = Icon as typeof Monitor;
                  return url ? (
                    <a key={p as string} href={url as string} className="inline-flex items-center gap-2 bg-primary px-5 py-3 font-semibold text-primary-foreground hover:bg-primary/90"><I className="h-5 w-5" /> Download for {p as string}</a>
                  ) : (
                    <a key={p as string} href="#download" className="inline-flex items-center gap-2 border border-primary px-5 py-3 font-semibold text-primary hover:bg-primary/10"><I className="h-5 w-5" /> {p as string} · coming soon</a>
                  );
                })}
              </div>
              <p className="mt-6 text-sm text-muted-foreground">An ongoing ICT academic project by a student team at the University of Malawi (UNIMA). The game may change as development continues.</p>
            </div>
            <figure className="frame-corners border border-primary bg-card">
              <img src={IMG.baseLevel.src} alt={IMG.baseLevel.alt} fetchPriority="high" className="aspect-video w-full object-cover" />
            </figure>
          </div>
        </section>

        <Section id="how-to-play" kicker="The play loop" title="How to play" alt>
          <ol className="grid gap-5 md:grid-cols-5">
            {LOOP.map(([n, t, d, img]) => (
              <li key={t} className="border border-border bg-card">
                <img src={img.src} alt={img.alt} loading="lazy" className="aspect-video w-full object-cover" />
                <div className="p-4">
                  <span className="font-mono text-sm text-warning">{n}</span>
                  <h3 className="font-display text-lg font-bold text-warning">{t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="scrap" kicker="Collect and defend" title="Collect scrap">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-muted-foreground">
              <p>Scrap is glowing green files scattered across the CPU level. It comes in Standard, High-Value and Rare types.</p>
              <ul className="space-y-3 font-mono text-sm">
                <li><kbd className="border border-primary px-2 text-primary">E</kbd> Pick up scrap. You can carry up to 4.</li>
                <li><kbd className="border border-primary px-2 text-primary">G</kbd> Deposit your scrap on the ship platform.</li>
                <li><span className="text-warning">1,500</span> scrap reinforces the Core Wall in the first wave.</li>
              </ul>
              <p>Use the upgrade menu to spend scrap on the Core Wall's health. Waves get harder over time, so keep the scrap coming.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Fig shot={IMG.collectingScrap} />
              <Fig shot={IMG.shipTutorial} />
            </div>
          </div>
        </Section>

        <Section id="player" kicker="Your hero" title="Meet the player" alt>
          <div className="grid gap-8 lg:grid-cols-2">
            <Fig shot={IMG.ship} />
            <div className="space-y-4 text-muted-foreground">
              <p>You play a white antivirus robot armed with a blaster, sent from the Base into the computer's CPU to stop the infection.</p>
              <dl className="grid grid-cols-3 gap-3 font-mono">
                {[["Health", "500"], ["Stamina", "100"], ["Scrap slots", "4"]].map(([k, v]) => (
                  <div key={k} className="border border-border bg-card p-3">
                    <dt className="text-xs uppercase">{k}</dt>
                    <dd className="text-2xl text-accent">{v}</dd>
                  </div>
                ))}
              </dl>
              <p>Your HUD shows health, stamina, the current wave and a mission timer. If you fall, spectator mode follows your living teammates.</p>
              <Fig shot={IMG.hud} />
            </div>
          </div>
        </Section>

        <Section id="enemies" kicker="Threats detected" title="Meet the enemies">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ENEMIES.map(([name, d, img]) => (
              <li key={name} className="frame-corners border border-border bg-card">
                {img ? (
                  <img src={img.src} alt={img.alt} loading="lazy" className="aspect-video w-full object-cover" />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-muted font-mono text-sm text-muted-foreground">Image coming soon</div>
                )}
                <div className="p-4">
                  <p className="font-mono text-xs text-destructive">⚠ Hostile</p>
                  <h3 className="font-display text-lg font-bold text-warning">{name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="explore" kicker="Multiplayer" title="Explore the game" alt>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-muted-foreground">
              <p>Play together with up to 4 players. One player hosts, and the others join with an IP address or session code, or find the game with a LAN scan.</p>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li>Windows: multiplayer over a local network.</li>
                <li>Android: multiplayer is not available yet.</li>
                <li>Online play over the internet is not supported.</li>
              </ul>
              <Fig shot={IMG.lobby} />
            </div>
            <div className="grid gap-4">
              <Fig shot={IMG.gravityFall} />
              <Fig shot={IMG.coreWall} />
            </div>
          </div>
        </Section>

        <Section id="levels" kicker="Inside the machine" title="Levels and hazards">
          <div className="grid gap-4 md:grid-cols-3">
            {[["Base", "Where your mission starts. Board the ship to head for the CPU."], ["Ship platform", "Carries the team to the CPU. Deposit your scrap here."], ["CPU level", "A custom gravity system lets you walk on walls."]].map(([t, d]) => (
              <div key={t} className="border-l-2 border-primary bg-card p-4">
                <h3 className="font-display text-lg font-bold">{t}</h3>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Fig shot={IMG.wallClimb} />
            <Fig shot={IMG.wallSide} />
            <Fig shot={IMG.hazardZone} />
          </div>
          <p className="mt-6 text-muted-foreground"><span className="font-mono text-warning">HAZARD</span> zones are marked on the CPU floor. Exact effects will be described soon.</p>
          <h3 className="mt-10 font-display text-xl font-bold">Behind the scenes</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Fig shot={IMG.editorCpu} />
            <Fig shot={IMG.editorWalls} />
          </div>
        </Section>

        <Section id="video" kicker="Watch" title="Gameplay video" alt>
          {CONFIG.videoUrl ? (
            CONFIG.videoIsFile ? (
              <video controls preload="none" poster={IMG.baseLevel.src} className="w-full max-w-4xl border border-border"><source src={CONFIG.videoUrl} /></video>
            ) : (
              <a href={CONFIG.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary px-5 py-3 font-semibold text-primary-foreground"><Play className="h-5 w-5" /> Watch the gameplay video</a>
            )
          ) : (
            <div className="frame-corners relative max-w-4xl border border-border">
              <img src={IMG.mainMenu.src} alt="" loading="lazy" className="aspect-video w-full object-cover opacity-40" />
              <p className="absolute inset-0 flex items-center justify-center px-4 text-center font-display text-xl"><span className="inline-flex items-center gap-2 bg-background px-4 py-3 text-foreground"><Play className="h-6 w-6 shrink-0 text-primary" /> Gameplay video coming soon</span></p>
            </div>
          )}
        </Section>

        <Section id="gallery" kicker="Screenshots" title="Gallery">
          <Gallery shots={GALLERY} />
        </Section>

        <Section id="team" kicker="The MetaSploitables (proposed name)" title="The team" alt>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TEAM.map(([n, r, c]) => (
              <li key={n} className="frame-corners border border-border bg-card p-5">
                <h3 className="font-display text-lg font-bold">{n}</h3>
                <p className="font-mono text-sm text-accent">{r}</p>
                <p className="mt-2 text-sm text-muted-foreground">{c}</p>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="download" kicker="Get the game" title="Download and contact">
          <div className="grid gap-5 md:grid-cols-2">
            <DownloadCard icon={<Monitor className="h-6 w-6" />} platform="Windows" url={CONFIG.windowsUrl} version={CONFIG.windowsVersion} sha={CONFIG.windowsSha256} />
            <DownloadCard icon={<Smartphone className="h-6 w-6" />} platform="Android" url={CONFIG.apkUrl} version={CONFIG.apkVersion} sha={CONFIG.apkSha256} />
          </div>
          <div className="mt-6 grid gap-5 text-sm text-muted-foreground md:grid-cols-2">
            <p><strong className="text-foreground">Windows note:</strong> the build isn't signed yet, so Windows SmartScreen may show a warning. Choose "More info" then "Run anyway" if you trust the download.</p>
            <div>
              <strong className="text-foreground">Android install:</strong>
              <ol className="mt-1 list-decimal pl-5">
                <li>Download the APK file.</li>
                <li>Open it from your browser or file manager.</li>
                <li>When asked, allow installs from that app, then tap Install.</li>
              </ol>
            </div>
          </div>
          <div className="mt-8 border border-border bg-card p-5">
            <h3 className="font-display text-lg font-bold">System requirements</h3>
            <p className="mt-1 text-sm text-muted-foreground">Being tested on real devices. Windows uses keyboard and mouse; Android uses touch controls. Full figures coming soon.</p>
          </div>
          <p className="mt-6 flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" /> Contact: {CONFIG.contactUrl ? <a href={CONFIG.contactUrl} className="text-primary underline">get in touch</a> : "coming soon"}
          </p>
        </Section>
      </main>

      <footer className="border-t border-border px-5 py-10 text-sm text-muted-foreground">
        <div className="mx-auto max-w-6xl space-y-2">
          <p className="font-display text-lg text-foreground"><span className="text-primary">0x</span>DEFEND</p>
          <p>0xDEFEND is an ICT academic project developed by The MetaSploitables at the University of Malawi (UNIMA). Project credits and rights are subject to the applicable university requirements, team agreements and third-party licences.</p>
          <p>Built in Godot. This site uses no cookies, analytics or sign-in. {CONFIG.licenceUrl && <a href={CONFIG.licenceUrl} className="text-primary underline">Licence</a>}</p>
        </div>
      </footer>
    </div>
  );
}
