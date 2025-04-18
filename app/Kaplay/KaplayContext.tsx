"use client";

import kaplay from "kaplay";
import { useEffect } from "react";
import { loadAssets } from "@/app/Kaplay/loadAssets";
import { makeMenu } from "@/app/Kaplay/makeMenu";
import { makeGame } from "@/app/Kaplay/makeGame";
import { makeGameOver } from "@/app/Kaplay/makeGameOver";
import makeLevel2 from "@/app/Kaplay/makeLevel2";
import makeWonScene from "@/app/Kaplay/makeWonScene";
import { makeBossLevel } from "@/app/Kaplay/makeBossLevel";
import makeCompete from "@/app/Kaplay/makeCompete";
import { User } from "next-auth";
import { makeScores } from "@/app/Kaplay/makeScores";

export const KaplayContext = ({
  user,
}: {
  user: User;
}) => {
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
    makeMenu(k, user.name ?? "Player");
    makeGame(k);
    makeWonScene(k);
    makeLevel2(k);
    makeBossLevel(k);
    makeCompete(k, Number(user.id));
    makeScores(k, Number(user.id));
    makeGameOver(k);
    k.go("menu");
  }, [user]);
  return <div></div>;
};
