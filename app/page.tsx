import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
   <div className="flex items-center justify-center">
    <Link href="/dashboard">
    <Button >click me and go to /dashboard</Button>
      
    </Link>
   </div>
  );
}
