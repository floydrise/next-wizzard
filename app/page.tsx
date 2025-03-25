import { KaplayContext } from "@/app/Kaplay/KaplayContext";
import { SignOut } from "@/components/SignOutBtn";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
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
