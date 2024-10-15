import { HeadingItem } from "@/data";
import React from "react";
import { Brygada_1918 } from "next/font/google";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const brygada = Brygada_1918({ subsets: ["latin"] });

function AddProjects() {
  return (
    <div className="h-full flex flex-col w-full text-primary_color items-center gap-12">
      <div className="flex flex-col items-center">
        {HeadingItem[1].items.map((item, index) => (
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
      <div className="h-full w-full flex flex-col">
        <div className="flex flex-col flex-grow text-a_black">
          <div>
            <Label className="">Project Name</Label>
            <Input
              placeholder="Business Analyst"
              className="bg-white border-p_border rounded-lg"
            />
          </div>
          <div className="flex-grow mt-4">
            <Label className="text-a_black">Resume</Label>
            <Textarea
              className="bg-white border-p_border rounded-lg resize-none h-[90%]"
              placeholder="Copy and paste your entire resume here"
            />
          </div>
        </div>
        <div className="w-full flex justify-center mt-4">
          <Button className="bg-[#FFB158] text-a_black border border-primary_color rounded-full font-bold hover:bg-primary_color px-5 py-2">
            Create project
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddProjects;
