import { KAPLAYCtx } from "kaplay";

export const loadAssets = (k: KAPLAYCtx) => {
  k.loadSprite("wizard", "/sprites/wizzard_m_idle_anim_f0.png");
  k.loadSprite("skeleton", "/sprites/skelet_idle_anim_f0.png");
  k.loadSprite("pumpkinGuy", "/sprites/pumpkin_dude_idle_anim_f0.png")
  k.loadSprite("magic", "/sprites/fireball.gif");
  k.loadSprite("arrow", "/sprites/arrow.png");
  k.loadSprite("background", "/sprites/dark_green_grass_background.png");

  k.loadFont("press2p", "/fonts/PixelOperator8.ttf");

  k.loadSound("fire", "/sounds/fire.wav");
  k.loadSound("wind", "/sounds/wind.wav");
  k.loadSound("explosion", "/sounds/explosion.wav");
  k.loadSound("walk", "/sounds/walk.wav")

  k.loadMusic("bgMusic", "/music/bgMusic.mp3")
  k.loadMusic("battleMusic", "/music/battleMusic.wav")
};
