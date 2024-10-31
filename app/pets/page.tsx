"use client";
import React from "react";
import Image from "next/image";

const Pets = () => {
  return (
    <div>
      <Image
        aria-hidden
        src="/demiAtThePark.jpg"
        alt="Globe icon"
        width={400}
        height={400}
        priority
        className="mx-auto"
      />
    </div>
  );
};

export default Pets;
