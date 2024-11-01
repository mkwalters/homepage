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
      <Image
        aria-hidden
        src="/yoda.jpeg"
        alt="Globe icon"
        width={400}
        height={400}
        priority
        className="mx-auto"
      />
    </div>
  );
}
