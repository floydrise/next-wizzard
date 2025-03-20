import { KaplayContext } from "@/app/Kaplay/KaplayContext";
import {SignOut} from "@/components/SignOutBtn";

export default async function Home() {
  return (
    <div className={"flex  w-full h-full"}>
      <KaplayContext />
      <canvas
        id={"game-container"}
        className={"w-full h-full relative"}
      ></canvas>
      <div className={"absolute top-6 right-5"}>
        <SignOut />
      </div>
    </div>
  );
}
