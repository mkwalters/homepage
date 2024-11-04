"use client";
import React from "react";
import { MenuItem } from "@material-tailwind/react";

import { useRouter } from "next/navigation";
import { Typography } from "./Typography";
import { Icon } from "./Icon";

const navListMenuItems = [
  {
    title: "Chess",
    description: "Learn how we can help you achieve your goals.",
    icon: "chess_pawn",
    route: "interests/chess",
  },
  {
    title: "Puzzles",
    description: "Find the perfect solution for your needs.",
    icon: "toys_and_games",
    route: "",
  },
  {
    title: "Pets",
    description: "Meet and learn about our dedication",
    icon: "pets",
    route: "interests/pets",
  },
  {
    title: "Music",
    description: "Learn how we can help you achieve your goals.",
    icon: "music_note",
    route: "interests/music",
  },
  {
    title: "Flowers",
    description: "Learn how we can help you achieve your goals.",
    icon: "deceased",
    route: "interests/pets",
  },
  {
    title: "Books",
    description: "Learn how we can help you achieve your goals.",
    icon: "book_2",
    route: "interests/pets",
  },
];

export function NavMenu() {
  const router = useRouter();

  const renderItems = navListMenuItems.map(({ icon, title, route }, key) => (
    <MenuItem
      className="flex items-center gap-2 rounded-lg hover:bg-pakistan-green cursor-pointer"
      onClick={() => {
        router.push(route || "/");
      }}
      key={key}
    >
      <div className="flex items-center justify-center bg-blue-gray-50 p-1  rounded-lg">
        <Icon iconName={icon} styles={"text-pakistan-green"} />
      </div>
      <div>
        <Typography>{title}</Typography>
      </div>
    </MenuItem>
  ));

  return (
    <div className="rounded-xl bg-dark-moss-green p-2">
      <ul className="grid grid-cols-3 gap-y-2 outline-none">{renderItems}</ul>
    </div>
  );
}
