import {KaplayContext} from "@/app/Kaplay/KaplayContext";

export default function Home() {
    return (
        <div className={"flex items-center justify-center w-full h-full"}>
            <KaplayContext/>
            <canvas id={"game-container"} className={"w-full h-full"}></canvas>
        </div>
    );
}
