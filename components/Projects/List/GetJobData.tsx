
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import Link from "next/link";
import { ListComponent } from "@/data";
import { JobData } from '@/types';
import { getJobData } from '@/app/(protected)/projects/list/actions';
import { useToast } from '@/hooks/use-toast';
import { useParams } from 'next/navigation';
import { formatDate } from '@/utils/date-format';

const GetJobData = () => {
    const {id} = useParams();

    const {toast } = useToast();
    const [jobData, setJobData] = useState<JobData[]>([]);

    console.log(jobData)

    const fetchData = async () => {
        try {
            const response = await getJobData(id);      
        if (response.data) {
          const formattedData = response.data.map((item) => ({
            jobDate: item.created_at,
            jobId: item.job_id,
            jobName: item.job_name,
            jobScore: item.job_score,
            jobRemarks: item.job_remarks
          }));
          setJobData(formattedData);
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
    
 <div className="flex flex-col h-full justify-between w-full">
          {jobData.length > 0 ? (
            <div className="max-h-[50vh] overflow-y-auto w-full flex flex-col justify-between text-a_black ">
              <Table className="h-full text-a_black/80 ">
                <TableHeader className="">
                  <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead>Job</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead className="text-right">Remarks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="w-full">
                  {jobData.map((item) => (
                    <TableRow key={item.jobId}>
                      <TableCell className="font-medium w-[20%]">
                        {formatDate(item.jobDate)}
                      </TableCell>
                      <TableCell className='w-[50%]'>{item.jobName}</TableCell>
                      <TableCell className='w-[10%]'>{item.jobScore}</TableCell>
                      <TableCell className="text-right w-[20%]">
                        {item.jobRemarks}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="w-full h-full flex justify-center mt-4 items-center">
              <Link
                href={`/projects/add-job/${id}`}
                className="flex justify-center items-center bg-[#FFB158] text-a_black border border-primary_color rounded-full font-bold hover:bg-primary_color px-5 py-2"
              >
                Add new
              </Link>
            </div>
          )}

          {jobData.length === 0 ? null : (
            <div className="w-full flex justify-center mt-4 items-center ">
              <Link
                 href={`/projects/add-job/${id}`}
                className="flex justify-center items-center bg-[#FFB158] text-a_black border border-primary_color rounded-full font-bold hover:bg-primary_color px-5 py-2"
              >
                Add new
              </Link>
            </div>
          )}
        </div>
  )
}

export default GetJobData