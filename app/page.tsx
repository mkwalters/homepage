import { HeaderMenu } from "@/components/HeaderMenu";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col w-screen">
      <HeaderMenu />
      <Image
        aria-hidden
        src="/headshot.jpeg"
        alt="Globe icon"
        width={400}
        height={400}
        priority
      />
    </div>
  );
}
