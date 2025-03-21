import { KAPLAYCtx } from "kaplay";
import { scoreAtom, store } from "@/lib/store";

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
      music.stop();
      k.go("game");
    });

    k.onKeyPress("escape", () => {
      music.stop();
      k.go("menu");
    });
  });
};
