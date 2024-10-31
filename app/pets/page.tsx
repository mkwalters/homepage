"use client";
import React from "react";
import { Gallery } from "@/components/Gallery";

const Pets = () => {
  return (
    <div>
      <Gallery images={["/demiAtThePark.jpg", "/yoda.jpeg"]} />
    </div>
  );
};

export default Pets;
