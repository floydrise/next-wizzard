"use client";

import kaplay from "kaplay";
import { useEffect } from "react";
import { loadAssets } from "@/app/Kaplay/loadAssets";
import { makeMenu } from "@/app/Kaplay/makeMenu";
import { makeGame } from "@/app/Kaplay/makeGame";
import { makeGameOver } from "@/app/Kaplay/makeGameOver";
import { useAtomValue } from "jotai";
import { scoreAtom } from "@/lib/store";
import makeLevel2 from "@/app/Kaplay/makeLevel2";
import makeWonScene from "@/app/Kaplay/makeWonScene";

export const KaplayContext = ({ user }: { user: string }) => {
  const score = useAtomValue(scoreAtom);
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
    });

    loadAssets(k);
    makeMenu(k, user);
    makeGame(k);
    makeWonScene(k);
    makeLevel2(k);
    makeGameOver(k);
    k.go("menu");
  }, [user]);
  useEffect(() => {}, [score]);
  return <div></div>;
};
