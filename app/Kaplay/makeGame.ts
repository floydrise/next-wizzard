import { KAPLAYCtx } from "kaplay";
import { levelAtom, store } from "@/lib/store";
import {
  initialiseAttack,
  playerMovementAnimation,
  playerMovementLogic,
} from "@/lib/gameLogic";

export const makeGame = (k: KAPLAYCtx) => {
  return k.scene("game", () => {
    const music = k.play("battleMusic", { volume: 0.5, loop: true });
    k.add([
      k.pos(0, 0),
      k.sprite("background", { width: 1280, height: 720 }),
      k.scale(4),
    ]);

    k.add([
      k.pos(0, 0),
      k.rect(1280, 64),
      k.outline(4),
      k.color(k.Color.fromHex("#071821")),
      k.z(10),
    ]);

    const score = k.add([
      k.pos(20, 20),
      k.color(k.Color.fromHex("#e0f8fc")),
      k.text("Score: 0 / 20", {
        size: 32,
        font: "press2p",
      }),
      k.z(10),
      "score",
      { value: 0 },
    ]);

    const player = k.add([
      k.pos(k.center().x, 700 - 64),
      k.sprite("advancedWizard", { anim: "idle" }),
      k.area(),
      k.body(),
      k.anchor("center"),
      k.scale(4),
      {
        direction: k.vec2(0, 0),
        speed: 800,
      },
      "player",
    ]);

    const makeEnemy = () => {
      return k.add([
        k.pos(k.rand(k.vec2(k.width(), 0))),
        k.sprite("pumpkinGuy", { anim: "run" }),
        k.area(),
        k.anchor("center"),
        k.scale(3),
        {
          speed: 100,
          fireTimer: 0,
          fireTime: k.rand(150, 200),
        },
        "enemy",
      ]);
    };

    for (let i = 0; i < 5; i++) {
      makeEnemy();
    }

    playerMovementLogic(k, player);

    k.onKeyPress("space", () => {
      initialiseAttack(k, player);
    });

    k.onUpdate("fire", (fire) => {
      fire.move(0, -fire.speed);
    });

    k.onUpdate("arrow", (arrow) => {
      arrow.move(0, arrow.speed);
    });

    score.onUpdate(() => {
      if (score.value === 20) {
        store.set(levelAtom, "lvl2");
        k.go("wonScene");
        music.stop();
      }
    });

    k.onUpdate("enemy", (enemy) => {
      enemy.move(0, enemy.speed);
      enemy.fireTimer++;

      if (enemy.pos.y >= 784) {
        k.destroy(enemy);
        makeEnemy();
      }
      if (enemy.fireTimer >= enemy.fireTime) {
        k.play("wobbleAttack", { volume: 0.3 });
        k.add([
          k.pos(enemy.pos.x, enemy.pos.y + 32),
          k.sprite("pumpkinAttack", { anim: "attack" }),
          k.rotate(180),
          k.area(),
          k.anchor("center"),
          k.offscreen({ destroy: true }),
          k.scale(2),
          { speed: 500 },
          "arrow",
        ]);
        enemy.fireTimer = 0;
      }
    });

    playerMovementAnimation(k, player);

    k.onCollide("fire", "enemy", (fire, enemy) => {
      k.play("explosion", { volume: 0.6 });
      score.value++;
      score.text = `Score: ${score.value} / 20`;
      k.destroy(enemy);
      k.destroy(fire);
      makeEnemy();
    });

    k.onCollide("player", "enemy", (player, enemy) => {
      k.destroy(player);
      k.destroy(enemy);
      k.play("death");
      k.go("gameOver");
      music.stop();
    });

    k.onCollide("player", "arrow", (player, arrow) => {
      k.destroy(player);
      k.destroy(arrow);
      k.play("death");
      k.go("gameOver");
      music.stop();
    });

    k.onKeyPress("escape", () => {
      k.go("menu");
      music.stop();
    });
  });
};
