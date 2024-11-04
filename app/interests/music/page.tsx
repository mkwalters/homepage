"use client";
import React from "react";
import Card from "@/components/TypographyCard";
import { Typography } from "@/components/Typography";

const Music = () => {
  return (
    <div className="flex justify-center">
      <Card styles="p-6">
        <div className="flex flex-col mx-auto gap-6 items-center">
          {/* <Card styles="bg-earth-yellow p-4 "> */}
          <Typography styles="text-center max-w-96">
            I recorded the following videos during Fall 2020. I play the lead
            electric guitar on some of my favorite songs.
          </Typography>
          {/* </Card> */}
          {/* Hotel California */}
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/uv0Z3ag6vtw?si=idjSyRq9G4dnta-m"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          {/* Stairway to Heaven */}
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/sa-SS6do9x4?si=gXa8k3n7KjhwKSQp"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          {/* Time */}
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/mfUWwpK54oI?si=ZpYI2yBlhE5jTrPJ"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          {/* Another Brick In The Wall */}
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/QBK3Lj7iu4k?si=Xb4qHSY4V3OC-6EG"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          {/* Freedom */}
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/826U9SJD7uw?si=Wpn4O742-V7duYxk"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </Card>
    </div>
  );
};

export default Music;
