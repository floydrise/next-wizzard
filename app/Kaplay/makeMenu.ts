import { KAPLAYCtx } from "kaplay";
import { levelAtom, store } from "@/lib/store";

export const makeMenu = (k: KAPLAYCtx, user: string) => {
  return k.scene("menu", () => {
    k.add([
      k.text(`Welcome ${user}`, {
        size: 32,
        font: "press2p",
      }),
      k.anchor("center"),
      k.color(k.Color.fromHex("#e0f8c8")),
      k.pos(k.center().x, k.center().y - 68),
    ]);
    k.add([
      k.text("🧙🏼‍♂️ Space to shoot", {
        size: 16,
        font: "press2p",
      }),
      k.anchor("center"),
      k.color(k.Color.fromHex("#e0f8c8")),
      k.pos(k.center().x, k.center().y + 68),
    ]);
    k.add([
      k.text("🧌 Arrow keys to move around", {
        size: 16,
        font: "press2p",
      }),
      k.anchor("center"),
      k.color(k.Color.fromHex("#e0f8c8")),
      k.pos(k.center().x, k.center().y + 88),
    ]);
    k.add([
      k.text("🧝🏼‍♀️ Esc to exit", {
        size: 16,
        font: "press2p",
      }),
      k.anchor("center"),
      k.color(k.Color.fromHex("#e0f8c8")),
      k.pos(k.center().x, k.center().y + 108),
    ]);

    const startButton = k.add([
      k.rect(32 * 6, 16 * 4),
      k.pos(k.center().x, k.center().y),
      k.color(k.Color.fromHex("#306850")),
      k.anchor("center"),
      k.area(),
      k.layer("button"),
      "startButton",
    ]);
    startButton.add([
      k.text("Start", { size: 32, font: "press2p" }),
      k.anchor("center"),
      k.color(k.Color.fromHex("#071821")),
    ]);

    const competeButton = k.add([
      k.rect(32 * 6, 16 * 4),
      k.pos(k.center().x - 300, k.center().y),
      k.color(k.Color.fromHex("#306850")),
      k.anchor("center"),
      k.area(),
      k.layer("button"),
      "competeButton",
    ]);
    competeButton.add([
      k.text("Compete", { size: 30, font: "press2p" }),
      k.anchor("center"),
      k.color(k.Color.fromHex("#071821")),
    ]);

    const statsButton = k.add([
      k.rect(32 * 6, 16 * 4),
      k.pos(k.center().x + 300, k.center().y),
      k.color(k.Color.fromHex("#306850")),
      k.anchor("center"),
      k.area(),
      k.layer("button"),
      "statsButton",
    ]);
    statsButton.add([
      k.text("Stats", { size: 32, font: "press2p" }),
      k.anchor("center"),
      k.color(k.Color.fromHex("#071821")),
    ]);

    k.onHover("startButton", () => {
      startButton.color = k.Color.fromHex("#e0f8cf");
      k.setCursor("pointer");
    });
    k.onHoverEnd("startButton", () => {
      startButton.color = k.Color.fromHex("#306850");
      k.setCursor("default");
    });

    k.onHover("statsButton", () => {
      statsButton.color = k.Color.fromHex("#e0f8cf");
      k.setCursor("pointer");
    });
    k.onHoverEnd("statsButton", () => {
      statsButton.color = k.Color.fromHex("#306850");
      k.setCursor("default");
    });

    k.onHover("competeButton", () => {
      competeButton.color = k.Color.fromHex("#e0f8cf");
      k.setCursor("pointer");
    });
    k.onHoverEnd("competeButton", () => {
      competeButton.color = k.Color.fromHex("#306850");
      k.setCursor("default");
    });

    k.onClick("startButton", () => {
      k.setCursor("default");
      if (store.get(levelAtom) === "lvl1") {
        k.go("game");
      } else if (store.get(levelAtom) === "lvl2") {
        k.go("level2");
      } else if (store.get(levelAtom) === "lvl3") {
        k.go("bossLevel");
      }
    });
    k.onClick("competeButton", () => {
      k.setCursor("default");
      k.go("compete");
    })
  });
};
