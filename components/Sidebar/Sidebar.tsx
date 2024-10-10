"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { SidebarList } from "./SidebarItem";

function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-3 py-16 flex-end ">
      {SidebarList.map((item) => {
        const isActive = (link: string) =>
          pathname === link || pathname.startsWith(link);

        return (
          <Link
            key={item.link}
            className={`self-end px-2 py-1 rounded-full transition duration-300 ${
              isActive(item.link)
                ? "text-primary_color bg-button_bg border-2 border-p_border opacity-100"
                : "text-primary_color bg-button_bg border-2 border-transparent opacity-50"
            }`}
            href={item.link}
          >
            {item.text}
          </Link>
        );
      })}
    </div>
  );
}

export default Sidebar;
