import {KAPLAYCtx} from "kaplay";
import {scoreAtom, store} from "@/lib/store";



export const makeGame = (k: KAPLAYCtx) => {
    return k.scene("game", () => {
        const music = k.play("battleMusic", {volume: 0.5, loop: true})
        k.add([
            k.pos(0, 0),
            k.sprite("background", {width: 1280, height: 720}),
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
            k.text("Score: 0", {
                size: 32,
                font: "press2p",
            }),
            k.z(10),
            {value: 0},
        ]);

        const player = k.add([
            k.pos(k.center().x, 700 - 64),
            k.sprite("wizard"),
            k.area(),
            k.body(),
            k.anchor("center"),
            k.scale(4),
            {
                speed: 800,
            },
            "player",
        ]);

        const makeEnemy = () => {
            return k.add([
                k.pos(k.rand(k.vec2(k.width(), 0))),
                k.sprite("pumpkinGuy"),
                k.area(),
                k.anchor("center"),
                k.scale(4),
                {
                    speed: 100,
                    fireTimer: 0,
                    fireTime: k.rand(100, 200),
                },
                "enemy",
            ]);
        };

        for (let i = 0; i < 6; i++) {
            makeEnemy();
        }

        k.onKeyDown("left", () => {
            player.move(-player.speed, 0);
            if (player.pos.x <= 32) {
                player.pos.x = 32;
            }
        });

        k.onKeyDown("right", () => {
            player.move(player.speed, 0);
            if (player.pos.x >= 1280 - 32) {
                player.pos.x = 1280 - 32;
            }
        });

        k.onKeyDown("up", () => {
            player.move(0, -player.speed);
            if (player.pos.y <= 96) {
                player.pos.y = 96;
            }
        });

        k.onKeyDown("down", () => {
            player.move(0, player.speed);
            if (player.pos.y >= 720 - 64) {
                player.pos.y = 720 - 64;
            }
        });

        k.onKeyPress("left", () => {
            k.play("walk", {volume: 0.5});
        });

        k.onKeyPress("right", () => {
            k.play("walk", {volume: 0.5});
        });

        k.onKeyPress("up", () => {
            k.play("walk", {volume: 0.5});
        });

        k.onKeyPress("down", () => {
            k.play("walk", {volume: 0.5});
        });

        k.onKeyPress("space", () => {
            k.play("fire", {volume: 0.5});
            k.add([
                k.pos(player.pos.x, player.pos.y - 64),
                k.sprite("magic"),
                k.area(),
                k.anchor("center"),
                k.offscreen({destroy: true}),
                {
                    speed: 800,
                },
                "fire",
            ]);
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

            if (enemy.pos.y >= 784) {
                k.destroy(enemy);
                makeEnemy();
            }
            if (enemy.fireTimer >= enemy.fireTime) {
                k.play("wind", {volume: 0.3});
                const arrow = k.add([
                    k.pos(enemy.pos.x, enemy.pos.y + 32),
                    k.sprite("arrow"),
                    k.rotate(),
                    k.area(),
                    k.anchor("center"),
                    k.offscreen({destroy: true}),
                    k.scale(2),
                    {
                        speed: 500,
                    },
                    "arrow",
                ]);
                arrow.angle = 180;
                enemy.fireTimer = 0;
            }
        });

        k.onCollide("fire", "enemy", (fire, enemy) => {
            k.play("explosion", {volume: 0.6});
            score.value += 1;
            score.text = `Score: ${score.value}`;
            k.destroy(enemy);
            k.destroy(fire);
            makeEnemy()
        })

        k.onCollide("player", "enemy", (player, enemy) => {
            k.destroy(player);
            k.destroy(enemy);
            k.play("explosion");
            store.set(scoreAtom, score.value);
            k.go("gameOver")
            music.stop();
        })

        k.onCollide("player", "arrow", (player, arrow) => {
            k.destroy(player);
            k.destroy(arrow);
            k.play("explosion");
            store.set(scoreAtom, score.value);
            k.go("gameOver");
            music.stop();
        })

        k.onKeyPress("escape", () => {
            k.go("menu")
            music.stop()
        })
    });
};
