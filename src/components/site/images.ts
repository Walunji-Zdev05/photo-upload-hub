import main_menu from "@/assets/game/main_menu.jpg.asset.json";
import multiplayer from "@/assets/game/multiplayer.jpg.asset.json";
import lobby from "@/assets/game/lobby.jpg.asset.json";
import core_wall from "@/assets/game/core_wall.jpg.asset.json";
import under_attack from "@/assets/game/under_attack.jpg.asset.json";
import game_over from "@/assets/game/game_over.jpg.asset.json";
import base_level from "@/assets/game/base_level.jpg.asset.json";
import ship from "@/assets/game/ship.jpg.asset.json";
import ship_tutorial from "@/assets/game/ship_tutorial.jpg.asset.json";
import hud from "@/assets/game/hud.jpg.asset.json";
import collecting_scrap from "@/assets/game/collecting_scrap.jpg.asset.json";
import wall_climb from "@/assets/game/wall_climb.jpg.asset.json";
import wall_side from "@/assets/game/wall_side.jpg.asset.json";
import gravity_fall from "@/assets/game/gravity_fall.jpg.asset.json";
import hazard_zone from "@/assets/game/hazard_zone.jpg.asset.json";
import worms from "@/assets/game/worms.jpg.asset.json";
import logic_bomb from "@/assets/game/logic_bomb.jpg.asset.json";
import glitch from "@/assets/game/glitch.jpg.asset.json";
import editor_cpu from "@/assets/game/editor_cpu.jpg.asset.json";
import editor_walls from "@/assets/game/editor_walls.jpg.asset.json";

export type Shot = { src: string; alt: string; caption: string };
const s = (a: { url: string }, alt: string, caption: string): Shot => ({ src: a.url, alt, caption });

export const IMG = {
  mainMenu: s(main_menu, "0xDEFEND main menu with Start Game, Settings, How to Play and Quit.", "Main menu"),
  multiplayer: s(multiplayer, "Multiplayer screen with host and join options.", "Multiplayer: host, join or scan the LAN"),
  lobby: s(lobby, "Lobby with four player slots and a chat box.", "Lobby with four player slots"),
  coreWall: s(core_wall, "Core Wall reinforcement progress screen.", "Core Wall reinforcement"),
  underAttack: s(under_attack, "Under attack alert asking the player to secure the Core Wall, with 0 of 1,500 scrap collected.", "Under attack alert"),
  gameOver: s(game_over, "Game over screen with Restart and Quit.", "Game over"),
  baseLevel: s(base_level, "The player, a white antivirus robot holding a blaster, in the base level.", "The Base level"),
  ship: s(ship, "The antivirus hero next to the ship that travels to the CPU.", "The ship to the CPU"),
  shipTutorial: s(ship_tutorial, "Inside the ship with an Extraction Protocol tutorial box in the top right.", "Extraction Protocol tutorial"),
  hud: s(hud, "Health and stamina bars and wave number at the top left of the game screen.", "HUD close-up"),
  collectingScrap: s(collecting_scrap, "The player carrying a green scrap file, with a tutorial box explaining how to collect and deposit scrap.", "Collecting scrap"),
  wallClimb: s(wall_climb, "The player clinging to a tall yellow wall above the CPU level.", "Walking up a wall"),
  wallSide: s(wall_side, "The player turned sideways along a cyan block, with two Phishing Spider warnings on screen.", "Moving along a wall"),
  gravityFall: s(gravity_fall, "Player falling along the side of a circuit board.", "Custom gravity"),
  hazardZone: s(hazard_zone, "A glowing yellow HAZARD zone on the CPU level floor with hostile virus markers on screen.", "Hazard zone ahead"),
  worms: s(worms, "Two worms close in on the player on a circuit board.", "Worms closing in"),
  logicBomb: s(logic_bomb, "A Logic Bomb warning marker and a hazard tag on the CPU level.", "Logic Bomb warning"),
  glitch: s(glitch, "Screen glitch effect near a Logic Bomb.", "Glitch effect"),
  editorCpu: s(editor_cpu, "The CPU level in the game editor, shown as a wireframe with platforms and coloured zones.", "CPU level in the editor"),
  editorWalls: s(editor_walls, "The level’s walls and platforms seen in the game editor.", "Walls and platforms in the editor"),
};

export const GALLERY: Shot[] = [
  IMG.mainMenu, IMG.multiplayer, IMG.lobby, IMG.coreWall, IMG.gameOver, IMG.ship,
  IMG.collectingScrap, IMG.wallClimb, IMG.gravityFall, IMG.glitch,
];
