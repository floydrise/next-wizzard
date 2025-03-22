import { KAPLAYCtx } from "kaplay";

export const loadAssets = (k: KAPLAYCtx) => {
  k.loadSprite("background", "/sprites/dark_green_grass_background.png");
  k.loadSprite("sandBackground", "/sprites/sandBackground.png");
  k.loadSprite("skeleton", "/sprites/skeletonRun.png", {
    sliceY: 1,
    sliceX: 4,
    anims: {
      run: { from: 0, to: 3, loop: true },
    },
  });
  k.loadSprite("pumpkinGuy", "/sprites/pumpkinGuyAnimation.png", {
    sliceY: 1,
    sliceX: 4,
    anims: {
      run: { from: 0, to: 3, loop: true },
    },
  });
  k.loadSprite("arrow", "/sprites/arrow.png");
  k.loadSprite("customCursor", "/sprites/pointer_c.png");
  k.loadSprite("advancedWizard", "/sprites/littleMageAnimation2.png", {
    sliceY: 2,
    sliceX: 6,
    anims: {
      idle: { from: 0, to: 5, loop: true },
      run: { from: 6, to: 11, loop: true },
    },
  });
  k.loadSprite("pumpkinAttack", "/sprites/pumpkinAttack.png", {
    sliceY: 1,
    sliceX: 2,
    anims: {
      attack: { from: 0, to: 1, loop: true },
    },
  });
  k.loadSprite("magic", "/sprites/magicBall.png", {
    sliceY: 1,
    sliceX: 30,
    anims: {
      fire: { from: 0, to: 29, loop: true },
    },
  });
  k.loadSprite("bonfire", "/sprites/bonfire.png", {
    sliceY: 1,
    sliceX: 4,
    anims: {
      running: { from: 0, to: 3, loop: true },
    },
  });
  k.loadSprite("fireball", "/sprites/fireball.png", {
    sliceY: 1,
    sliceX: 2,
    anims: {
      attack: { from: 0, to: 1, loop: true },
    },
  });

  k.loadFont("press2p", "/fonts/PixelOperator8.ttf");

  k.loadSound("fire", "/sounds/fire.mp3");
  k.loadSound("wind", "/sounds/wind.mp3");
  k.loadSound("explosion", "/sounds/explosion.mp3");
  k.loadSound("walk", "/sounds/walk.mp3");
  k.loadSound("arcaneAttack", "/sounds/arcaneAttack.wav");
  k.loadSound("wobbleAttack", "/sounds/wobbleAttack.wav");
  k.loadSound("death", "/sounds/death.mp3");

  k.loadMusic("bgMusic", "/music/bgMusic.mp3");
  k.loadMusic("battleMusic", "/music/battleMusic.mp3");
  k.loadMusic("desertMusic", "/music/desertMusic.mp3");
  k.loadMusic("bonfire", "/music/bonfire.mp3");
};
