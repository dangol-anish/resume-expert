import { HeadingItem } from "@/data";
import React from "react";
import { Brygada_1918 } from "next/font/google";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AddJobForm from "@/components/Projects/AddJobForm";

const brygada = Brygada_1918({ subsets: ["latin"] });

function AddJobs() {
  return (
    <div className="h-full flex flex-col w-full text-primary_color items-center gap-12">
      <div className="flex flex-col items-center">
        {HeadingItem[3].items.map((item, index) => (
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
      <AddJobForm/>
    </div>
  );
}

export default AddJobs;
