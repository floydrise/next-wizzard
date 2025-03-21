import { KAPLAYCtx } from "kaplay";
import { levelAtom, scoreAtom, store } from "@/lib/store";

export const makeGameOver = (k: KAPLAYCtx) => {
  return k.scene("gameOver", () => {
    const gameScore = store.get(scoreAtom);
    const music = k.play("bgMusic", { loop: true });
    k.add([
      k.text("You died", {
        size: 32,
        font: "press2p",
      }),
      k.pos(k.center().x, k.center().y),
      k.color(k.Color.fromHex("#e0f8cf")),
      k.anchor("center"),
    ]);
    k.add([
      k.text(`Score: ${gameScore}`, {
        size: 24,
        font: "press2p",
      }),
      k.pos(k.center().x, k.center().y + 64),
      k.color(k.Color.fromHex("#e0f8cf")),
      k.anchor("center"),
    ]);

    k.add([
      k.text("Press Enter to play or Esc to go to menu", {
        size: 24,
        font: "press2p",
      }),
      k.pos(k.center().x, k.center().y + 104),
      k.color(k.Color.fromHex("#e0f8cf")),
      k.anchor("center"),
    ]);

    k.onKeyPress("enter", () => {
      const lvl = store.get(levelAtom);
      music.stop();
      if (lvl === "lvl1") {
        k.go("game");
      } else if (lvl === "lvl2") {
        k.go("level2");
      }
    });

    k.onKeyPress("escape", () => {
      music.stop();
      store.set(levelAtom, "lvl1");
      k.go("menu");
    });
  });
};
