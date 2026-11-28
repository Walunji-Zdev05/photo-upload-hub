import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Compass, Crosshair, Download, Files, Mail, Monitor, Play, ShieldPlus, Smartphone, Wrench } from "lucide-react";
import { CONFIG } from "@/lib/site-config";
import { IMG, GALLERY, type Shot } from "@/components/site/images";
import { BinaryRain } from "@/components/site/BinaryRain";
import { Gallery } from "@/components/site/Gallery";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site/SiteHeader";

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

function Section({ id, kicker, title, children, alt }: { id: string; kicker: string; title: string; children: ReactNode; alt?: boolean }) {
  return (
    <section id={id} tabIndex={-1} className={`reveal-section scroll-mt-20 px-5 py-14 md:py-20 ${alt ? "bg-muted/40" : ""}`}>
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
    <figure className={`frame-corners group self-start overflow-hidden border border-border bg-card transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-primary motion-reduce:transition-none ${className}`}>
      <img src={shot.src} alt={shot.alt} loading="lazy" className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.025] motion-reduce:transition-none" />
      <figcaption className="px-3 py-2 font-mono text-xs text-muted-foreground">{shot.caption}</figcaption>
    </figure>
  );
}

function DownloadCard({ icon, platform, url, version, sha }: { icon: ReactNode; platform: string; url: string; version: string; sha: string }) {
  return (
    <div className="frame-corners border border-border bg-card p-5 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-primary motion-reduce:transition-none">
      <div className="flex items-center gap-3">
        <span className="text-primary">{icon}</span>
        <h3 className="font-display text-xl font-bold">{platform}</h3>
      </div>
      {url ? (
        <>
          <Button asChild className="mt-4 h-auto min-h-11 whitespace-normal rounded-sm">
          <a href={url}>
            <Download className="h-4 w-4" /> Download for {platform}{version ? ` · v${version}` : ""}
          </a>
          </Button>
          {sha && <p className="mt-2 break-all font-mono text-xs text-muted-foreground">SHA-256: {sha}</p>}
        </>
      ) : (
        <p className="mt-3 text-sm text-muted-foreground">Download coming soon</p>
      )}
    </div>
  );
}

const LOOP = [
  ["01", "Explore", "Board the ship and jump from the Base into the CPU.", Compass],
  ["02", "Collect", "Find glowing green scrap. Press E to pick it up.", Files],
  ["03", "Fight", "Hold right click to aim. Left click fires your blaster.", Crosshair],
  ["04", "Defend", "When the alert sounds, get back to the Core Wall.", ShieldPlus],
  ["05", "Upgrade", "Spend your scrap to strengthen the wall. Face the next wave.", Wrench],
] as const;

const ENEMIES = [
  ["Phishing Spider", "Hides among scrap and attacks when you get close to collect it.", IMG.phishingSpider],
  ["Logic Bomb", "Waits in place and explodes when you come near.", null],
  ["Worm", "Makes copies of itself, so one worm can become a swarm.", IMG.worms],
  ["Data Miner", "Runs after you and can steal the scrap you are carrying.", IMG.dataMiner],
] as const;

const TEAM = [
  ["Walunji Kumwenda", "Project Leader", "Built the Base and CPU layouts, custom gravity, scrap drop physics, extraction zone, Core Wall upgrades and enemy AI."],
  ["Kondwani Padyera", "Project Manager", "Built multiplayer, networking, combat, wave and aiming systems. Leads game optimisation."],
  ["Miriam Phiri", "Role to be confirmed", "Created the HUD, menus and lobby, tutorial, hazards and level dressing, sound, music and visual effects."],
  ["Rosemary Nyirenda", "Role to be confirmed", "Worked on Windows and Android support, shared controls, game screens and spectator mode."],
  ["Paul Kabondo", "Role to be confirmed", "Created 3D models and animations, player movement and Data Miner AI. Tested combat."],
] as const;

function Index() {
  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground">Skip to content</a>
      <BinaryRain />
      <div className="relative z-10">
      <SiteHeader />

      <main id="main" tabIndex={-1}>
        <section id="home" tabIndex={-1} className="relative scroll-mt-20 overflow-hidden px-5 pb-12 pt-10 md:pb-16 md:pt-16">
          <div className="relative mx-auto grid max-w-6xl lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-12">
            <div className="hero-enter">
              <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-accent"><span className="h-2 w-2 animate-pulse rounded-full bg-accent motion-reduce:animate-none" aria-hidden="true" />Antivirus system active</p>
              <h1 className="mt-3 font-display text-5xl font-bold md:text-7xl"><span className="text-primary">0x</span>DEFEND</h1>
              <p className="mt-2 font-display text-xl text-primary">Protect. Collect. Survive.</p>
              <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
                Jump into a computer under attack. Collect scrap, blast malware and protect the Core Wall—alone or with friends.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild size="lg" className="min-h-11 rounded-sm"><a href="#how-to-play"><Compass /> Explore the game</a></Button>
                {(CONFIG.windowsUrl || CONFIG.apkUrl) && <Button asChild variant="outline" size="lg" className="min-h-11 rounded-sm"><a href="#download"><Download /> Download</a></Button>}
              </div>
              <p className="mt-4 font-mono text-xs text-muted-foreground">3D co-op platformer · Windows & Android · In development</p>
            </div>
            <figure className="frame-corners hero-enter hero-enter-delay group mt-8 overflow-hidden border border-primary bg-card lg:mt-0">
              <img src={IMG.baseLevel.src} alt={IMG.baseLevel.alt} fetchPriority="high" className="max-h-[58svh] w-full object-contain transition-transform duration-700 group-hover:scale-[1.015] motion-reduce:transition-none" />
            </figure>
          </div>
        </section>

        <Section id="how-to-play" kicker="The play loop" title="How to play" alt>
          <p className="mb-6 text-muted-foreground">Five steps. One Core Wall to keep alive.</p>
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {LOOP.map(([n, t, d, Icon]) => (
              <li key={t} className="group border-t border-border pt-4 transition-colors duration-300 hover:border-primary">
                <div className="mb-4 flex items-center justify-between"><span className="font-mono text-sm text-accent">{n}</span><Icon className="h-6 w-6 text-primary transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none" aria-hidden="true" /></div>
                <div>
                  <h3 className="font-display text-lg font-bold text-primary">{t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="scrap" kicker="Collect and defend" title="Collect scrap">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-muted-foreground">
              <p>Scrap keeps the Core Wall alive. Look for glowing green files on the circuits, carry them home and spend them wisely.</p>
              <p className="text-sm">Find Standard, High-Value and Rare scrap as you explore.</p>
              <ul className="space-y-3 font-mono text-sm">
                <li><kbd className="border border-primary px-2 text-primary">E</kbd> Pick up scrap. You can carry up to 4.</li>
                <li><kbd className="border border-primary px-2 text-primary">G</kbd> Deposit your scrap on the ship platform.</li>
                <li><span className="text-primary">1,500</span> scrap reinforces the Core Wall in the first wave.</li>
              </ul>
              <p>Each wave is harder than the last. Strengthen the Core Wall before the next one arrives.</p>
            </div>
            <div className="grid gap-4">
              <Fig shot={IMG.collectingScrap} />
            </div>
          </div>
        </Section>

        <Section id="player" kicker="Your hero" title="Meet the player" alt>
          <div className="grid gap-8 lg:grid-cols-2">
            <Fig shot={IMG.ship} />
            <div className="space-y-4 text-muted-foreground">
              <p>You are the antivirus hero: a white robot with a blaster and a computer to save. Head from the Base into the CPU and stop the infection.</p>
              <dl className="grid grid-cols-3 gap-3 font-mono">
                {[["Health", "500"], ["Stamina", "100"], ["Scrap slots", "4"]].map(([k, v]) => (
                  <div key={k} className="border border-border bg-card p-3">
                    <dt className="text-xs uppercase">{k}</dt>
                    <dd className="text-2xl text-accent">{v}</dd>
                  </div>
                ))}
              </dl>
              <p>Keep an eye on your health, stamina, wave number and mission timer. If you fall, watch your surviving teammates in spectator mode.</p>
              <Fig shot={IMG.hud} />
            </div>
          </div>
        </Section>

        <Section id="enemies" kicker="Threats detected" title="Meet the enemies">
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ENEMIES.map(([name, d, img]) => (
              <li key={name} className="frame-corners overflow-hidden border border-border bg-card transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-primary motion-reduce:transition-none">
                {img ? (
                  <img src={img.src} alt={img.alt} loading="lazy" className="aspect-video w-full object-cover" />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-muted font-mono text-sm text-muted-foreground">Image coming soon</div>
                )}
                <div className="p-4">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">Hostile process</p>
                  <h3 className="font-display text-lg font-bold text-primary">{name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="explore" kicker="Multiplayer" title="Explore the game" alt>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 text-muted-foreground">
              <p>Bring a team of up to four. One player hosts; the others join by IP address, session code or a LAN scan.</p>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li>Windows: multiplayer over a local network.</li>
                <li>Android: multiplayer is not available yet.</li>
                <li>Online play over the internet is not supported.</li>
              </ul>
              <p className="pt-3 font-display text-xl text-primary">Gravity has other plans.</p>
              <p>Walk along walls and across circuit boards. In the CPU, down is not always where you expect.</p>
              <Fig shot={IMG.coreWall} />
            </div>
            <div className="grid gap-4">
              <Fig shot={IMG.gravityFall} />
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
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Fig shot={IMG.wallClimb} />
            <Fig shot={IMG.hazardZone} />
          </div>
          <p className="mt-6 text-muted-foreground">Look in every direction: the CPU stacks circuit boards above and below you. <span className="font-mono text-primary">HAZARD</span> zones mark the floor; exact effects are still to be confirmed.</p>
          <details className="mt-8 border-t border-border pt-4">
          <summary className="w-fit cursor-pointer font-display text-xl font-bold text-primary">Behind the scenes</summary>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Fig shot={IMG.editorCpu} />
            <Fig shot={IMG.editorWalls} />
          </div>
          </details>
        </Section>

        <Section id="video" kicker="Watch" title="Gameplay video" alt>
          {CONFIG.videoUrl ? (
            CONFIG.videoIsFile ? (
              <video controls preload="none" poster={IMG.baseLevel.src} className="w-full max-w-4xl border border-border"><source src={CONFIG.videoUrl} /></video>
            ) : (
              <a href={CONFIG.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary px-5 py-3 font-semibold text-primary-foreground"><Play className="h-5 w-5" /> Watch the gameplay video</a>
            )
          ) : (
            <div className="flex items-start gap-4 border-l-2 border-primary pl-5">
              <Play className="mt-1 h-7 w-7 shrink-0 text-primary" aria-hidden="true" />
              <div><p className="font-display text-xl">Gameplay video coming soon</p><p className="mt-2 text-sm text-muted-foreground">For now, take a look inside the game in the gallery.</p></div>
            </div>
          )}
        </Section>

        <Section id="gallery" kicker="Screenshots" title="Gallery">
          <Gallery shots={GALLERY} />
        </Section>

        <Section id="team" kicker="The MetaSploitables (proposed name)" title="The team" alt>
          <p className="mb-6 max-w-2xl text-muted-foreground">Built by a student team at the University of Malawi. 0xDEFEND is an ongoing ICT academic project, with more improvements to come.</p>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {TEAM.map(([n, r, c]) => (
              <li key={n} className="frame-corners border border-border bg-card p-5 transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-primary motion-reduce:transition-none">
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
    </div>
  );
}
