"use client";
import React from "react";
import Card from "@/components/TypographyCard";
import { Typography } from "@/components/Typography";
import Image from "next/image";
import { usePsychadelicBackgroundContext } from "@/context/PsychadelicBackgroundContext";

const Music = () => {
  const { toggleIsPsychadelic } = usePsychadelicBackgroundContext();
  return (
    <div className="flex justify-center">
      <Card styles="p-4 sm:p-6 w-full max-w-lg">
        <div className="flex flex-col gap-4 items-center">
          <Typography styles="text-center max-w-full sm:max-w-96">
            I recorded the following videos during Fall 2020. I play lead
            electric guitar on some of my favorite songs.
          </Typography>

          {/* Responsive Iframe Wrapper */}
          {[
            "uv0Z3ag6vtw?si=idjSyRq9G4dnta-m",
            "sa-SS6do9x4?si=gXa8k3n7KjhwKSQp",
            "mfUWwpK54oI?si=ZpYI2yBlhE5jTrPJ",
            "QBK3Lj7iu4k?si=Xb4qHSY4V3OC-6EG",
            "826U9SJD7uw?si=Wpn4O742-V7duYxk",
          ].map((videoId, index) => (
            <div key={index} className="w-full">
              <div className="relative pb-[56.25%] h-0 overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`YouTube video player ${index + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Image
        src="/ledZeppelin.jpg"
        alt="Led Zeppelin Icon"
        width={130}
        height={130}
        className="fixed bottom-8 right-8 rounded-md  cursor-pointer w-[80px] h-[100px] sm:w-[200px] sm:h-[200px]"
        onClick={toggleIsPsychadelic}
      />
      <Image
        src="/gratefulDead.jpg"
        alt="Grateful Dead Icon"
        width={130}
        height={130}
        className="fixed bottom-8 left-8 rounded-md  cursor-pointer w-[80px] h-[80px] sm:w-[130px] sm:h-[130px]"
        onClick={toggleIsPsychadelic}
      />
    </div>
  );
};

export default Music;
