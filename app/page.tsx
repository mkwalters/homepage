"use client";
import { NavMenu } from "@/components/NavMenu";
import { Typography } from "@/components/Typography";
import { useCalendlyContext } from "@/context/CalendlyContext";
import Image from "next/image";
import { InlineWidget } from "react-calendly";

export default function Home() {
  const { isCalendlyModalOpen } = useCalendlyContext();
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <Image
        aria-hidden
        src="/headshot.jpeg"
        alt="Globe icon"
        width={400}
        height={400}
        priority
        className="mx-auto rounded-xl"
      />
      <div className="flex max-w-80 bg-dark-moss-green p-2 rounded-xl">
        <Typography>
          Hi, I&apos;m Mitchell Walters. Thanks for taking the time to visit my
          page. I have some fun links below to help you get to know me better.
          Hope you have a nice day ✌️
        </Typography>
      </div>
      <NavMenu />

      {isCalendlyModalOpen && (
        <div className="App">
          <InlineWidget url="https://calendly.com/mitchellkellywalters/30min" />
        </div>
      )}
    </div>
  );
}
