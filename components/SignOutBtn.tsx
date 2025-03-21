import { signOut } from "@/auth";
import {Button} from "@/components/ui/button";

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <Button type="submit" className={"hover:cursor-pointer"}>Sign Out</Button>
    </form>
  );
}
