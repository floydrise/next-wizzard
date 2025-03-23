import { KAPLAYCtx } from "kaplay";
import {
  initialiseFireAttack,
  playerMovementAnimation,
  playerMovementLogic,
} from "@/lib/gameLogic";

export const makeBossLevel = (k: KAPLAYCtx) => {
  return k.scene("bossLevel", () => {
    const music = k.play("bossMusic", { volume: 0.5, loop: true });
    k.add([
      k.sprite("bossBackground", { width: 1280, height: 720 }),
      k.pos(0, 0),
    ]);
    k.add([
      k.rect(1280, 64),
      k.color(k.Color.fromHex("#950006")),
      k.outline(4),
      k.z(10),
    ]);
    const bossLife = k.add([
      k.pos(20, 20),
      k.color(k.Color.fromHex("#e0f8fc")),
      k.text("NecroEye: 150 / 150", {
        size: 32,
        font: "press2p",
      }),
      k.z(10),
      "bossLife",
      { value: 150 },
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

    k.add([
      k.pos(k.center().x, 140),
      k.sprite("boss", { anim: "idle" }),
      k.area(),
      k.anchor("center"),
      k.scale(5),
      {
        direction: 1,
        speed: 200,
        fireTimer: 0,
        fireTime: k.rand(150, 200),
      },
      "enemy",
    ]);

    playerMovementLogic(k, player);

    k.onKeyPress("space", () => {
      initialiseFireAttack(k, player);
    });
    k.onUpdate("fire", (fire) => {
      fire.move(0, -fire.speed);
    });

    k.onUpdate("bossAttack", (bossAttack) => {
      const direction = k
        .vec2(player.pos.x - bossAttack.pos.x, player.pos.y - bossAttack.pos.y)
        .unit();
      bossAttack.move(
        direction.x * bossAttack.speed,
        direction.y * bossAttack.speed,
      );
    });

    bossLife.onUpdate(() => {
      if (bossLife.value === 0) {

        k.go("wonScene");
        music.stop();
      }
    });

    k.onUpdate("enemy", (enemy) => {
      enemy.move(enemy.direction * enemy.speed, 0);
      if (enemy.pos.x >= 1150) {
        enemy.direction = -1;
      } else if (enemy.pos.x <= 120) {
        enemy.direction = 1;
      }

      enemy.fireTimer++;

      if (enemy.fireTimer >= enemy.fireTime) {
        k.play("arcaneAttack", { volume: 0.3 });
        k.add([
          k.pos(enemy.pos.x, enemy.pos.y + 56),
          k.sprite("bossAttack", { anim: "attack" }),
          k.area(),
          k.anchor("center"),
          k.offscreen({ destroy: true }),
          k.scale(0.3),
          {
            speed: 400,
          },
          "bossAttack",
        ]);
        enemy.fireTimer = 0;
      }
    });

    playerMovementAnimation(k, player);
    k.onCollide("fire", "bossAttack", (fire, bossAttack) => {
      fire.destroy();
      bossAttack.destroy();
    });

    k.onCollide("fire", "enemy", (fire, enemy) => {
      k.play("explosion", { volume: 0.6 });
      if (bossLife.value === 0) {
        k.destroy(enemy);
      }
      k.destroy(fire);
      bossLife.value -= 5;
      bossLife.text = `NecroEye: ${bossLife.value} / 150`;
    });

    k.onCollide("player", "enemy", (player, enemy) => {
      k.destroy(player);
      k.destroy(enemy);
      k.play("death");
      k.go("gameOver");
      music.stop();
    });

    k.onCollide("player", "bossAttack", (player, arrow) => {
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
