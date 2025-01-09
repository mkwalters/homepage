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

  // Icon name maps 1:1 with "Icon name" on https://fonts.google.com/icons
  // Icon name can be found at the bottom of the right sidebar
  const navListMenuItems: NavListMenuItem[] = [
    {
      title: "Chess",
      description: "",
      icon: "chess_pawn",
      onClick: () => router.push("interests/chess"),
    },
    {
      title: "Src",
      description: "",
      icon: "data_object",
      onClick: () => router.push("https://github.com/mkwalters/homepage"),
    },

    {
      title: "Pictures",
      description: "",
      icon: "photo_camera",
      onClick: () => router.push("interests/pictures"),
    },
    {
      title: "Music",
      description: "",
      icon: "music_note",
      onClick: () => router.push("interests/music"),
    },
    {
      title: "Resume",
      description: "",
      icon: "work",
      onClick: () => router.push("interests/resume"),
    },
    {
      title: "Get in touch",
      description: "",
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
