import { KAPLAYCtx } from "kaplay";
import { fetchPlayerScores } from "@/lib/actions";

export const makeScores = async (k: KAPLAYCtx, userId: number) => {
  return k.scene("scores", async () => {
    k.add([
      k.text("Last 5 Player Scores", { font: "press2p", size: 32 }),
      k.pos(k.center().x, k.center().y - 100),
      k.anchor("center"),
    ]);
    const loading = k.add([
      k.text("Loading ...", { font: "press2p", size: 28 }),
      k.pos(k.center()),
      k.anchor("center"),
      "loading",
    ]);
    const result = await fetchPlayerScores(userId);
    k.destroy(loading);
    if (result.length === 0) {
      k.add([
        k.text(`No scores yet, go compete`, { font: "press2p", size: 28 }),
        k.pos(k.center().x, k.center().y),
        k.anchor("center"),
      ]);
    } else {
      for (let i = 0; i < result.length; i++) {
        k.add([
          k.text(
            `${i + 1 === 1 ? "🥇" : i + 1 === 2 ? "🥈" : i + 1 === 3 ? "🥉" : i + 1}: ${result[i].score} - ${result[i].created_at.toISOString().split("T")[0].split("-").reverse().join(".")}`,
            {
              font: "press2p",
              size: 28,
            },
          ),
          k.pos(k.center().x, k.center().y + i * 50),
          k.anchor("center"),
        ]);
      }
    }
    k.onKeyPress("escape", () => {
      k.go("menu");
    });
  });
};
