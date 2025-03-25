import { KAPLAYCtx } from "kaplay";
import { levelAtom, scoreAtom, store } from "@/lib/store";
import {
  initialiseAttack,
  playerMovementAnimation,
  playerMovementLogic,
} from "@/lib/gameLogic";
import { insertScore } from "@/lib/actions";

export default function makeCompete(k: KAPLAYCtx, user_id: number) {
  return k.scene("compete", () => {
    const music = k.play("combatMusic", { volume: 0.3, loop: true });

    k.add([
      k.pos(0, 0),
      k.sprite("competeBackground", { width: 1280, height: 720 }),
      k.scale(2),
    ]);

    k.add([
      k.pos(0, 0),
      k.rect(1280, 64),
      k.outline(4),
      k.color(k.Color.fromHex("#151d28")),
      k.z(10),
    ]);

    const score = k.add([
      k.text("Score: 0", { size: 32, font: "press2p" }),
      k.color(k.Color.fromHex("#e0f8fc")),
      k.pos(20, 20),
      k.z(10),
      { value: 0 },
    ]);

    const player = k.add([
      k.sprite("advancedWizard", { anim: "idle" }),
      k.pos(k.center().x, 700 - 64),
      k.body(),
      k.area(),
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
        k.sprite("competeEnemy", { anim: "idle" }),
        k.anchor("center"),
        k.area(),
        k.scale(3),
        {
          speed: 150,
          fireTimer: 0,
          fireTime: k.rand(100, 200),
        },
        "enemy",
      ]);
    };

    for (let i = 0; i < 6; i++) {
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

    k.onUpdate("enemy", (enemy) => {
      enemy.move(0, enemy.speed);
      enemy.fireTimer++;

      if (enemy.pos.y >= 720) {
        k.destroy(enemy);
        makeEnemy();
      }

      if (enemy.fireTimer >= enemy.fireTime) {
        k.play("wind", { volume: 0.5 });
        k.add([
          k.pos(enemy.pos.x, enemy.pos.y + 32),
          k.sprite("whirlwind", { anim: "attack" }),
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
      k.destroy(enemy);
      k.destroy(fire);
      score.value++;
      score.text = `Score: ${score.value}`;
      makeEnemy();
    });

    k.onCollide("player", "enemy", async (player, enemy) => {
      k.play("death");
      k.destroy(player);
      k.destroy(enemy);
      store.set(scoreAtom, score.value);
      store.set(levelAtom, "compete");
      await insertScore(score.value, user_id);
      music.stop();
      k.go("gameOver");
    });

    k.onCollide("player", "arrow", async (player, arrow) => {
      k.play("death");
      k.destroy(player);
      k.destroy(arrow);
      store.set(scoreAtom, score.value);
      store.set(levelAtom, "compete");
      await insertScore(score.value, user_id);
      music.stop();
      k.go("gameOver");
    });

    k.onKeyPress("escape", () => {
      music.stop();
      store.set(levelAtom, "lvl1");
      k.go("menu");
    });
  });
}
