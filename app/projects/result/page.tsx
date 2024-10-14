import React from "react";
import { Brygada_1918 } from "next/font/google";
import Link from "next/link";
import { CardComponent, ListComponent } from "@/data";
import { HeadingItem } from "@/data";

const brygada = Brygada_1918({ subsets: ["latin"] });

function Results() {
  return (
    <>
      <div className="h-full flex flex-col w-full p-8 text-primary_color items-center gap-8">
        <div className="flex flex-col items-center">
          {HeadingItem[4].items.map((item, index) => (
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
      </div>
    </>
  );
}

export default Results;
