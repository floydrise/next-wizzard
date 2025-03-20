import { KAPLAYCtx } from "kaplay";

export const loadAssets = (k: KAPLAYCtx) => {
  k.loadSprite("wizard", "/sprites/wizzard_m_idle_anim_f0.png");
  k.loadSprite("skeleton", "/sprites/skelet_idle_anim_f0.png");
  k.loadSprite("pumpkinGuy", "/sprites/pumpkinGuyAnimation.png", {
    sliceY: 1,
    sliceX: 4,
    anims: {
      run: {from: 0, to: 3, loop: true}
    }
  });
  k.loadSprite("magic", "/sprites/fireball.gif");
  k.loadSprite("arrow", "/sprites/arrow.png");
  k.loadSprite("background", "/sprites/dark_green_grass_background.png");
  k.loadSprite("customCursor", "/sprites/pointer_c.png");
  k.loadSprite("advancedWizard", "/sprites/littleMageAnimation2.png", {
    sliceY: 2,
    sliceX: 6,
    anims: {
      idle: { from: 0, to: 5, loop: true },
      run: { from: 6, to: 11, loop: true },
    },
  });

  k.loadFont("press2p", "/fonts/PixelOperator8.ttf");

  k.loadSound("fire", "/sounds/fire.wav");
  k.loadSound("wind", "/sounds/wind.wav");
  k.loadSound("explosion", "/sounds/explosion.wav");
  k.loadSound("walk", "/sounds/walk.wav");

  k.loadMusic("bgMusic", "/music/bgMusic.mp3");
  k.loadMusic("battleMusic", "/music/battleMusic.wav");
};
