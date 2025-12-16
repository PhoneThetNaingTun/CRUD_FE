import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="p-5 md:p-30">
      <Button>
        <Link href={"/users"}>Users</Link>
      </Button>
    </div>
  );
}
