"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { usePsychadelicBackgroundContext } from "@/context/PsychadelicBackgroundContext";

export default function InterestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { isPsychadelic } = usePsychadelicBackgroundContext();
  return (
    <div
      className={`p-6 w-full ${isPsychadelic ? "psychedelic-light-show" : ""}`}
    >
      <div className="flex gap-1 mb-2">
        <button
          onClick={() => {
            router.push("/");
          }}
          className="bg-dark-moss-green p-2 rounded-full flex gap-1 items-center"
        >
          {React.createElement(ArrowLeftIcon, {
            strokeWidth: 2,
            className: "flex h-4 w-4",
          })}
          <p>Back</p>
        </button>
      </div>
      {children}
    </div>
  );
}
