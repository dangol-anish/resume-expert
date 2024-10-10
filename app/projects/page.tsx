import { Button } from "@/components/ui/button";
import { HeadingItem } from "@/data";
import React from "react";
import { Brygada_1918 } from "next/font/google";

const brygada = Brygada_1918({ subsets: ["latin"] });

function Projects() {
  return (
    <div className="h-full flex flex-col w-full p-4 text-primary_color items-center">
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
              <h2 className="text-2xl font-semibold mb-1 ">
                {" "}
                {item.main_heading}
              </h2>
            )}
            {item.sub_heading && <p className="text-xs"> {item.sub_heading}</p>}
          </div>
        ))}
      </div>
      <div className="h-full w-full flex justify-center items-center">
        <Button className="justify-center items-center bg-[#FFB158] text-a_black border border-primary_color rounded-full font-bold">
          Create a project
        </Button>
      </div>
    </div>
  );
}

export default Projects;
