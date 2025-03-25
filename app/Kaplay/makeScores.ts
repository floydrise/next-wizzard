import {KAPLAYCtx} from "kaplay";

export const makeScores = (k: KAPLAYCtx,playerScores: number[]) => {
    return k.scene("scores",() => {
        k.add([
            k.text("Last 5 Player Scores", { font: "press2p", size: 32 }),
            k.pos(k.center().x, k.center().y - 100),
            k.anchor("center"),
        ]);
        if (playerScores.length === 0) {
            k.add([
                k.text(`No scores yet, go compete`, { font: "press2p", size: 28 }),
                k.pos(k.center().x, k.center().y),
                k.anchor("center"),
            ]);
        } else {
            for (let i = 0; i < playerScores.length; i++) {
                k.add([
                    k.text(`${playerScores[i]}`, { font: "press2p", size: 28 }),
                    k.pos(k.center().x, k.center().y + (i * 50)),
                    k.anchor("center"),
                ]);
            }
        }
        k.onKeyPress("escape", () => {
            k.go("menu");
        })
    })
}