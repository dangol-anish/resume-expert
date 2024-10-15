import { HeadingItem } from "@/data";
import React from "react";
import { Brygada_1918 } from "next/font/google";
import Link from "next/link";
import { CardComponent } from "@/data";
import Image from "next/image";
import card from "../../public/card.svg";
import { Button } from "@/components/ui/button";

const brygada = Brygada_1918({ subsets: ["latin"] });

function Projects() {
  return (
    <div className="h-full flex  flex-col gap-8 items-center text-primary_color">
      <div className="flex flex-col items-center ">
        {HeadingItem[0].items.map((item, index) => (
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

      <div className="w-full flex flex-col items-center h-full">
        <div className="h-full w-full flex flex-col ">
          {CardComponent.length > 0 ? (
            <div className="flex-grow px-8 py-4 grid grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto no-scrollbar">
              {CardComponent.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col items-center text-a_black hover:bg-[#FFF1EA] p-2 rounded-lg"
                >
                  <Image src={card} alt="Card" />{" "}
                  <p className="text-sm">{item.job_title}</p>
                  <p className="text-xs text-a_black/70">
                    {item.no_of_jobs} Jobs
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full flex justify-center items-center mt-4 h-full">
              <Link
                href="/projects/add"
                className="flex justify-center items-center bg-[#FFB158] text-a_black border border-primary_color rounded-full font-bold hover:bg-primary_color px-5 py-2"
              >
                Create a project
              </Link>
            </div>
          )}
        </div>

        {CardComponent.length === 0 ? null : (
          <Button className="bg-[#FFB158] text-a_black border border-primary_color rounded-full font-bold hover:bg-primary_color px-5 py-2  ">
            <Link href="/projects/add-resume" className="">
              Create a project
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default Projects;
