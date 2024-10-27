"use client"
import React, { useEffect, useState } from "react";
import { Brygada_1918 } from "next/font/google";
import Link from "next/link";
import { HeadingItem } from "@/data";
import { useParams } from "next/navigation";
import { getResults } from "../actions";

const brygada = Brygada_1918({ subsets: ["latin"] });

// Define the shape of your result data
interface JobResult {
  j_quick_summary: string;
  j_red_flags: string;
  j_interview_focus: string;
  j_tips_and_strategy: string;
  j_rtj_match: string;
  j_final_remarks: string;
}

function Results() {
  const [resultData, setResultData] = useState<JobResult[]>([]);
  const { id } = useParams<{ id: string }>(); // Specify the type for useParams

  const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

  const fetchData = async (maxAttempts: number = 10): Promise<void> => {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      const result = await getResults(id);
      if (result && Array.isArray(result) && result.length > 0) {
        setResultData(result);
        return; // Exit if we have data
      }
      await delay(2000); // Wait 2 seconds before retrying
    }
    // Optionally handle max attempts reached without data
    console.error("Max attempts reached, no data available.");
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  console.log(resultData);

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
         {
          resultData[0] ? 
           <div className="flex flex-col gap-6 max-h-[50vh] overflow-y-auto no-scrollbar ">
           <div className="flex gap-3 flex-col">
             <span className="text-sm font-bold result-subheading">
               Quick Summary
             </span>
             <p className="text-sm text-a_black">
               {resultData[0]?.j_quick_summary || "Loading..."}
             </p>
           </div>
           <div className="flex gap-3 flex-col">
             <span className="text-sm font-bold result-subheading ">
               Red Flags
             </span>
             <ul className="text-sm text-a_black">
               {resultData[0]?.j_red_flags ? resultData[0].j_red_flags.split(",").map((flag, index) => (
                 <li key={index}>{flag}</li>
               )) : "Loading..."}
             </ul>
           </div>
           <div className="flex gap-3 flex-col">
             <span className="text-sm font-bold result-subheading">
               Interview Focus
             </span>
             <ul className="text-sm text-a_black">
               {resultData[0]?.j_interview_focus ? resultData[0].j_interview_focus.split(",").map((focus, index) => (
                 <li key={index}>{focus}</li>
               )) : "Loading..."}
             </ul>
           </div>
           <div className="flex gap-3 flex-col">
             <span className="text-sm font-bold result-subheading">
               Quick Tips
             </span>
             <p className="text-sm text-a_black">
               {resultData[0]?.j_tips_and_strategy || "Loading..."}
             </p>
           </div>
           <div className="flex gap-3 flex-col">
             <span className="text-sm font-bold result-subheading">
               Resume to Job Match Ratio
             </span>
             <p className="text-sm text-a_black">
               {resultData[0]?.j_rtj_match || "Loading..."}
             </p>
           </div>
           <div className="flex gap-3 flex-col">
             <span className="text-sm font-bold result-subheading">
               Final Remarks
             </span>
             <p className="text-sm text-a_black">
               {resultData[0]?.j_final_remarks || "Loading..."}
             </p>
           </div>
         </div> : <div className="loading h-full w-full justify-center items-center">
  <div className="spinner"></div>
  <span className="pulse">Retrieving Results...</span>
</div>

         }
          <div className="w-full flex justify-center items-center flex-col gap-3">
            <Link
              href="/projects"
              className="flex justify-center items-center bg-[#FFB158] text-a_black border border-primary_color rounded-full font-bold hover:bg-primary_color px-5 py-2"
            >
              Back to projects
            </Link>
            <span className="text-xs text-a_black/80">
              Resume Checkup can make mistakes and is not professional advice.
              Proceed with caution.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Results;
