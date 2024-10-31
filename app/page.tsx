import Chess from "@/components/Chess";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col w-screen">
      <Image
        aria-hidden
        src="/headshot.jpeg"
        alt="Globe icon"
        width={400}
        height={400}
        priority
        className="mx-auto"
      />

      <div className="w-96 h-w-96">
        <Chess />
      </div>
    </div>
  );
}
