import React from "react";
import { Brygada_1918 } from "next/font/google";
import Link from "next/link";
import { CardComponent, ListComponent, ResultExample } from "@/data";
import { HeadingItem } from "@/data";
import { Button } from "@/components/ui/button";

const brygada = Brygada_1918({ subsets: ["latin"] });

function Results() {
  return (
    <>
      <div className="flex flex-col gap-8 h-full">
        <div className="flex flex-col items-center text-primary_color">
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

        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-6 max-h-[50vh] overflow-y-auto no-scrollbar">
            <div className="flex gap-3 flex-col">
              <span className="text-sm font-bold result-subheading">
                Quick Summary
              </span>
              <p className="text-sm text-a_black">
            
              </p>
            </div>
            <div className="flex gap-3 flex-col">
              <span className="text-sm font-bold result-subheading ">
                Red Flags
              </span>
              <ul className="text-sm text-a_black">
                
              </ul>
            </div>
            <div className="flex gap-3 flex-col">
              <span className="text-sm font-bold result-subheading">
                Interview Focus
              </span>
              <ul className="text-sm text-a_black">
                
              </ul>
            </div>
            <div className="flex gap-3 flex-col">
              <span className="text-sm font-bold result-subheading">
                Quick Tips
              </span>
              <p className="text-sm text-a_black"></p>
            </div>
            <div className="flex gap-3 flex-col">
              <span className="text-sm font-bold result-subheading">
                Resume to Job Match Ratio
              </span>
              <p className="text-sm text-a_black">
              
              </p>
            </div>
            <div className="flex gap-3 flex-col">
              <span className="text-sm font-bold result-subheading">
                Final Remarks
              </span>
              <p className="text-sm text-a_black">
          
              </p>
            </div>
          </div>
          <div className="w-full flex justify-center items-center  flex-col gap-3">
            <Link
              href="/projects/list"
              className="flex justify-center items-center bg-[#FFB158] text-a_black border border-primary_color rounded-full font-bold hover:bg-primary_color px-5 py-2"
            >
              Back to projects
            </Link>
            <span className="text-xs text-a_black/80">
              Resume Checkup can make mistakes and is not professional advice.
              Proceed with caution .
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Results;
