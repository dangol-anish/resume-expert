import React from "react";
import { Brygada_1918 } from "next/font/google";
import Link from "next/link";
import { CardComponent } from "@/data";
import Image from "next/image";
import card from "../../public/card.svg";
import { HeadingItem } from "@/data";

const brygada = Brygada_1918({ subsets: ["latin"] });

function ProjectList() {
  return (
    <>
      <div className="h-full flex flex-col w-full p-8 text-primary_color items-center gap-8">
        <div className="flex flex-col items-center">
          {HeadingItem[2].items.map((item, index) => (
            <div key={index}>
              {item.title && (
                <h3
                  className={`${brygada.className} text-sm font-bold text-center mb-4`}
                >
                  {item.title}
                </h3>
              )}
              {item.main_heading && (
                <h2 className="text-3xl font-semibold mb-1 tracking-tight">
                  {item.main_heading}
                </h2>
              )}
              {item.sub_heading && (
                <p className="text-sm text-primary_color/70 tracking-wide">
                  {item.sub_heading}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="h-full w-full flex flex-col justify-between bg-gray-500">
          <div className="w-full flex justify-center mt-4">
            <Link
              href="/projects/add"
              className="flex justify-center items-center bg-[#FFB158] text-a_black border border-primary_color rounded-full font-bold hover:bg-primary_color px-5 py-2"
            >
              Add new
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectList;
