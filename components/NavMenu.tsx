"use client";
import React from "react";
import { MenuItem } from "@material-tailwind/react";

import { useRouter } from "next/navigation";
import { Typography } from "./Typography";
import { Icon } from "./Icon";
import { DialogDefault } from "./CalendlyModal";

type NavListMenuItem = {
  title: string;
  description: string;
  icon: string;
  onClick?: () => void;
};

export function NavMenu() {
  const router = useRouter();
  const [calendlyModalOpen, setCalendlyModalOpen] = React.useState(false);

  const navListMenuItems: NavListMenuItem[] = [
    {
      title: "Chess",
      description: "Learn how we can help you achieve your goals.",
      icon: "chess_pawn",
      onClick: () => router.push("interests/chess"),
    },
    {
      title: "Puzzles",
      description: "Find the perfect solution for your needs.",
      icon: "toys_and_games",
      onClick: () => router.push(""),
    },
    {
      title: "Pictures",
      description: "Meet and learn about our dedication",
      icon: "photo_camera",
      onClick: () => router.push("interests/pets"),
    },
    {
      title: "Music",
      description: "Learn how we can help you achieve your goals.",
      icon: "music_note",
      onClick: () => router.push("interests/music"),
    },
    {
      title: "Resume",
      description: "Learn how we can help you achieve your goals.",
      icon: "work",
      onClick: () => router.push("interests/pets"),
    },
    {
      title: "Get in touch",
      description: "Learn how we can help you achieve your goals.",
      icon: "call",
      onClick: () => {
        setCalendlyModalOpen(true);
      },
    },
  ];
  const renderItems = navListMenuItems.map(({ icon, title, onClick }, key) => (
    <MenuItem
      className="flex items-center gap-2 rounded-lg hover:bg-pakistan-green cursor-pointer"
      onClick={onClick}
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
      <DialogDefault
        open={calendlyModalOpen}
        handleOpen={setCalendlyModalOpen}
      />
    </div>
  );
}
