import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Button>
        <Link href={"/users"}>Users</Link>
      </Button>
      <Button>
        <Link href={"/projects"}>Projects</Link>
      </Button>
      <Button>
        <Link href={"/roles"}>Roles</Link>
      </Button>
    </div>
  );
}
