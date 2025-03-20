import {KAPLAYCtx} from "kaplay";

export const makeMenu = (k: KAPLAYCtx) => {
    return k.scene("menu", () => {

        const music = k.play("bgMusic", {volume: 0.1, loop: true})

        k.add([
            k.text("👾 Space to shoot", {
                size: 16,
                font: "press2p"
            }),
            k.anchor("center"),
            k.color(k.Color.fromHex("#e0f8c8")),
            k.pos(k.center().x, k.center().y + 128)
        ]);
        k.add([
            k.text("→ Arrow keys to move around", {
                size: 16,
                font: "press2p"
            }),
            k.anchor("center"),
            k.color(k.Color.fromHex("#e0f8c8")),
            k.pos(k.center().x, k.center().y + 148)
        ]);
        k.add([
            k.text("❌ Esc to exit", {
                size: 16,
                font: "press2p"
            }),
            k.anchor("center"),
            k.color(k.Color.fromHex("#e0f8c8")),
            k.pos(k.center().x, k.center().y + 168)
        ]);


        const startButton = k.add([
            k.rect(32 * 6, 16 * 4),
            k.pos(k.center().x, k.center().y),
            k.color(k.Color.fromHex("#306850")),
            k.anchor("center"),
            k.area(),
            k.layer("button"),
            "startButton"
        ]);

        startButton.add([
            k.text("Start", {size: 32, font: "press2p"}),
            k.anchor("center"),
            k.color(k.Color.fromHex("#071821"))
        ]);

        k.onHover("startButton", () => {
            startButton.color = k.Color.fromHex("#e0f8cf")
        });

        k.onHoverEnd("startButton", () => {
            startButton.color = k.Color.fromHex("#306850")
        });

        k.onClick("startButton", () => {
            k.go("game")
            music.stop()
        });

    })
}