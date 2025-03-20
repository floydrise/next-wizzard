"use client"

import kaplay from "kaplay";
import {useEffect} from "react";
import {loadAssets} from "@/app/Kaplay/loadAssets";
import {makeMenu} from "@/app/Kaplay/makeMenu";
import {makeGame} from "@/app/Kaplay/makeGame";
import {makeGameOver} from "@/app/Kaplay/makeGameOver";
import {useAtomValue} from "jotai";
import {scoreAtom} from "@/lib/store";

export const KaplayContext = () => {
    const score = useAtomValue(scoreAtom)
    useEffect(() => {
        const k = kaplay({
            letterbox: true,
            width: 1280,
            height: 720,
            crisp: true,
            global: false,
            pixelDensity: devicePixelRatio,
            // @ts-expect-error element is declared
            canvas: document.getElementById("game-container"),
            background: "#071821",
        })

        loadAssets(k);
        makeMenu(k);
        makeGame(k);
        makeGameOver(k);
        k.go("menu");
    }, []);
    useEffect(() => {
        console.log(score)
    }, [score])
    return (
        <div></div>
    )
}