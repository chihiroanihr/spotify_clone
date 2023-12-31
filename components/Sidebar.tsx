"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";

import { twMerge } from "tailwind-merge";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import Box from "./Box";
import Library from "./Library";
import SidebarItem from "./SidebarItem";
import usePlayer from "@/hooks/usePlayer";
import { Song } from "@/types";

interface SideBarProps {
  songs: Song[]; // Array of Song type
  children: React.ReactNode;
}

const Sidebar: React.FC<SideBarProps> = ({ songs, children }) => {
  const pathname = usePathname();
  const player = usePlayer();

  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "Home",
        active: pathname !== "/search", // active only when current link is not "/search"
        href: "/",
      },
      {
        icon: BiSearch,
        label: "Search",
        href: "/search",
        active: pathname === "/search",
      },
    ],
    [pathname]
  );

  return (
    <div
      className={twMerge(
        "flex",
        "h-full",
        player.activeId && "h-[calc(100%-80px)]"
      )}
    >
      <div
        className={twMerge(
          "hidden", // Mobile
          "md:flex", // Desktop
          "flex-col gap-y-2",
          "w-[300px] h-full p-2",
          "bg-black"
        )}
      >
        {/* Home & Search */}
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>

        {/* Your Library */}
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>

      {/* Main Content */}
      {children}
    </div>
  );
};

export default Sidebar;
