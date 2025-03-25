import { KAPLAYCtx } from "kaplay";
import { levelAtom, store } from "@/lib/store";
import {
  initialiseAttack,
  playerMovementAnimation,
  playerMovementLogic,
  initialiseFireAttack,
} from "@/lib/gameLogic";

export default function makeLevel2(k: KAPLAYCtx) {
  return k.scene("level2", () => {
    let hasCollided = false;
    const music = k.play("desertMusic", { volume: 0.3, loop: true });

    k.add([
      k.pos(0, 0),
      k.sprite("sandBackground", { width: 1280, height: 720 }),
      k.scale(2),
    ]);

    k.add([
      k.pos(0, 0),
      k.rect(1280, 64),
      k.outline(4),
      k.color(k.Color.fromHex("#FFA952")),
      k.z(10),
    ]);

    const score = k.add([
      k.text("Score: 0 / 40", { size: 32, font: "press2p" }),
      k.color(k.Color.fromHex("#e0f8fc")),
      k.pos(20, 20),
      k.z(10),
      { value: 0 },
    ]);

    score.onUpdate(() => {
      if (score.value === 40) {
        store.set(levelAtom, "lvl3");
        k.go("wonScene");
        music.stop();
      }
    });

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
        k.sprite("skeleton", { anim: "run" }),
        k.anchor("center"),
        k.area(),
        k.scale(4),
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
      if (hasCollided) {
        initialiseFireAttack(k, player);
      } else {
        initialiseAttack(k, player);
      }
    });

    k.wait(5, () => {
      k.add([
        k.sprite("fireball", { anim: "attack" }),
        k.pos(k.rand(k.vec2(k.width(), 0))),
        k.anchor("center"),
        k.area(),
        k.rotate(90),
        k.scale(2),
        k.offscreen({ destroy: true }),
        { speed: 50 },
        "bonus",
      ]);
    });

    k.onUpdate("bonus", (bonus) => {
      bonus.move(0, bonus.speed);
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
          k.sprite("arrow"),
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

    k.onCollide("player", "bonus", (player, bonus) => {
      bonus.destroy();
      hasCollided = true;
    });

    k.onCollide("fire", "arrow", (fire, arrow) => {
      if (hasCollided) {
        k.destroy(fire);
        k.destroy(arrow);
        score.value++;
        score.text = `Score: ${score.value} / 40`;
      }
    });

    k.onCollide("fire", "enemy", (fire, enemy) => {
      k.play("explosion", { volume: 0.6 });
      k.destroy(enemy);
      k.destroy(fire);
      score.value++;
      score.text = `Score: ${score.value} / 40`;
      makeEnemy();
    });

    k.onCollide("player", "enemy", (player, enemy) => {
      k.play("death");
      k.destroy(player);
      k.destroy(enemy);
      music.stop();
      k.go("gameOver");
    });

    k.onCollide("player", "arrow", (player, arrow) => {
      k.play("death");
      k.destroy(player);
      k.destroy(arrow);
      music.stop();
      k.go("gameOver");
    });

    k.onKeyPress("escape", () => {
      music.stop();
      k.go("menu");
    });
  });
}
