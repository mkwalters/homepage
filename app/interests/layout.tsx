"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function InterestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="p-6">
      <div className="flex gap-1">
        <button
          onClick={() => {
            router.push("/");
          }}
          className="bg-green-500 p-2 rounded-full flex gap-1"
        >
          {React.createElement(ArrowLeftIcon, {
            strokeWidth: 2,
            className: " flex h-6 w-4",
          })}
          <p>Home</p>
        </button>
      </div>
      {children}
    </div>
  );
}
