"use client"
import { HeadingItem } from "@/data";
import React, { useEffect, useState } from "react";
import { Brygada_1918 } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import card from "../../../public/card.svg";
import { Button } from "@/components/ui/button";
import { getProjectData } from "./actions";

import { useToast } from "@/hooks/use-toast";
import { UUID } from "crypto";
import { TextLimit } from "@/utils/text-limit";
import { ProjectData } from "@/types";



const brygada = Brygada_1918({ subsets: ["latin"] });

function Projects() {
  const { toast } = useToast();

  const [projectData, setProjectData] = useState<ProjectData[]>([]);

  const fetchData = async () => {
    try {
      const response = await getProjectData();
      console.log(response)

      if (response.data) {
        const formattedData = response.data.map((item) => ({
          projectId: item.project_id,
          projectName: item.project_name,
          numberOfJobs: item.no_of_jobs,
        }));
        setProjectData(formattedData);
      } else if (response.error) {
        toast({
          variant: "destructive",
          description: response.error,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Error",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



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
          {projectData.length > 0 ? (
            <div className="flex-grow px-8 py-4 grid grid-cols-3 gap-4 max-h-[50vh] overflow-y-auto no-scrollbar justify-start items-start">
              {projectData.map((item) => (
                <Link
                  href={`/projects/list/${item.projectId}`}
                  key={item.projectId}
                  className="flex flex-col items-center text-a_black hover:bg-[#FFF1EA] p-2 rounded-lg justify-center"
                >
                  <Image src={card} alt="Card" />
                  <p className="text-sm line-clamp-1">{TextLimit(item.projectName, 20)}</p>
                  <p className="text-xs text-a_black/70">
                    {item.numberOfJobs} Jobs
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="w-full flex justify-center items-center mt-4 h-full">
              <Link
                href="/projects/add-resume"
                className="flex justify-center items-center bg-[#FFB158] text-a_black border border-primary_color rounded-full font-bold hover:bg-primary_color px-5 py-2"
              >
                Create a project
              </Link>
            </div>
          )}
        </div>

        {projectData.length === 0 ? null : (
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
