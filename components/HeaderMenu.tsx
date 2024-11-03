"use client";
import React from "react";
import { Typography, MenuItem } from "@material-tailwind/react";
import {
  SquaresPlusIcon,
  SunIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

const navListMenuItems = [
  {
    title: "Chess",
    description: "Learn how we can help you achieve your goals.",
    icon: SunIcon,
    route: "interests/chess",
  },
  {
    title: "Puzzles",
    description: "Find the perfect solution for your needs.",
    icon: SquaresPlusIcon,
    route: "",
  },
  {
    title: "Pets",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
    route: "interests/pets",
  },
  {
    title: "My Music",
    description: "Learn how we can help you achieve your goals.",
    icon: SunIcon,
    route: "interests/pets",
  },
  {
    title: "Gardening",
    description: "Learn how we can help you achieve your goals.",
    icon: SunIcon,
    route: "interests/pets",
  },
];

export function NavListMenu() {
  const router = useRouter();

  const renderItems = navListMenuItems.map(({ icon, title, route }, key) => (
    <MenuItem
      className="flex items-center gap-2 rounded-lg"
      onClick={() => {
        router.push(route || "/");
      }}
      key={key}
    >
      <div className="flex items-center justify-center bg-blue-gray-50 p-1  rounded-lg">
        {React.createElement(icon, {
          strokeWidth: 2,
          className: "h-6 text-earth-yellow w-6",
        })}
      </div>
      <div>
        <Typography
          variant="h6"
          color="blue-gray"
          className="flex items-center text-sm font-bold text-cornsilk"
        >
          {title}
        </Typography>
      </div>
    </MenuItem>
  ));

  return (
    <div className="rounded-xl bg-dark-moss-green p-2">
      <ul className="grid grid-cols-3 gap-y-2 outline-none">{renderItems}</ul>
    </div>
  );
}
