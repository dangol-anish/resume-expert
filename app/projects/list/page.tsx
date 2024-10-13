import React from "react";
import { Brygada_1918 } from "next/font/google";
import Link from "next/link";
import { CardComponent, ListComponent } from "@/data";
import { HeadingItem } from "@/data";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

        <div className="flex flex-col h-full justify-between">
          {ListComponent.length > 0 ? (
            <div className="max-h-[50vh] overflow-y-auto w-full flex flex-col justify-between text-a_black no-scrollbar">
              <Table className="h-full  text-a_black/80">
                <TableHeader className="">
                  <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead>Job</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead className="text-right">Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ListComponent.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.date.toLocaleDateString()}
                      </TableCell>
                      <TableCell>{item.company_job}</TableCell>
                      <TableCell>{item.score}</TableCell>
                      <TableCell className="text-right">
                        {item.remarks}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="w-full flex justify-center mt-4 items-center">
              <Link
                href="/projects/add"
                className="flex justify-center items-center bg-[#FFB158] text-a_black border border-primary_color rounded-full font-bold hover:bg-primary_color px-5 py-2"
              >
                Add new
              </Link>
            </div>
          )}

          {ListComponent.length === 0 ? null : (
            <div className="w-full flex justify-center mt-4 items-center ">
              <Link
                href="/projects/add"
                className="flex justify-center items-center bg-[#FFB158] text-a_black border border-primary_color rounded-full font-bold hover:bg-primary_color px-5 py-2"
              >
                Add new
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProjectList;
