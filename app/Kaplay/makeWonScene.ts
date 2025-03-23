import { KAPLAYCtx } from "kaplay";
import {levelAtom, store} from "@/lib/store";

export default function makeWonScene(k: KAPLAYCtx) {
  return k.scene("wonScene", () => {
    const music = k.play("bonfire", { loop: true, volume: 0.5 });
    k.add([
      k.sprite("bonfire", { anim: "running" }),
      k.anchor("center"),
      k.pos(k.center().x, k.center().y - 170),
      k.scale(6),
    ]);
    k.add([
      k.text("You won this round!", { font: "press2p", size: 32 }),
      k.pos(k.center()),
      k.anchor("center"),
    ]);
    k.add([
      k.text("Rest a little and press 'Enter' to continue", {
        font: "press2p",
        size: 18,
      }),
      k.pos(k.center().x, k.center().y + 50),
      k.anchor("center"),
    ]);
    k.onKeyPress("enter", () => {
      const lvl = store.get(levelAtom);
      music.stop();
      k.destroyAll("bonfire");
      if (lvl === "lvl2") {
        k.go("level2");
      } else if (lvl === "lvl3") {
        k.go("bossLevel");
      }
    });
    k.onKeyPress("escape", () => {
      music.stop();
      k.destroyAll("bonfire");
      k.go("menu");
    });
  });
}
