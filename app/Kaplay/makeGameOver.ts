import {KAPLAYCtx} from "kaplay";

export const makeGameOver = (k: KAPLAYCtx) => {
    return k.scene("gameOver", () => {
        const music = k.play("bgMusic", {volume: 0.3})
        k.add([
            k.text("Game Over", {
                size: 32,
                font: "press2p",
            }),
            k.pos(k.center().x, k.center().y),
            k.color(k.Color.fromHex("#e0f8cf")),
            k.anchor("center")
        ])
        k.add([
            k.text("Press enter to play again", {
                size: 24,
                font: "press2p",
            }),
            k.pos(k.center().x, k.center().y + 64),
            k.color(k.Color.fromHex("#e0f8cf")),
            k.anchor("center")
        ])

        k.onKeyPress("enter", () => {
            music.stop()
            k.go("game")
        })

        k.onKeyPress("escape", () => {
            music.stop()
            k.go("menu")
        })
    })
}