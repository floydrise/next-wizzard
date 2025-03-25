import { KaplayContext } from "@/app/Kaplay/KaplayContext";
import { SignOut } from "@/components/SignOutBtn";
import { auth } from "@/auth";
import { fetchPlayerScores } from "@/lib/actions";

export default async function Home() {
  const session = await auth();
  const result = await fetchPlayerScores(Number(session?.user?.id));
  const playerScores: number[] = result.flatMap((value) =>
    Object.values(value),
  );
  return (
    <div className={"flex  w-full h-full"}>
      <KaplayContext
        user={
          session?.user ?? {
            id: "",
            name: "",
            email: "",
            image: "",
          }
        }
        playerScores={playerScores}
      />
      <canvas
        id={"game-container"}
        className={"w-full h-full relative"}
      ></canvas>
      <div className={"absolute top-5 right-20"}>
        <SignOut />
      </div>
    </div>
  );
}
