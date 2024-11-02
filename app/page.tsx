"use client";
import { useCalendlyContext } from "@/context/CalendlyContext";
import Image from "next/image";
import { InlineWidget } from "react-calendly";

export default function Home() {
  const { isCalendlyModalOpen } = useCalendlyContext();
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
      <p className="text-white">{JSON.stringify(isCalendlyModalOpen)}</p>

      {isCalendlyModalOpen && (
        <div className="App">
          <InlineWidget url="https://calendly.com/mitchellkellywalters/30min" />
        </div>
      )}
    </div>
  );
}
