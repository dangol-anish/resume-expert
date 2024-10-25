"use client"
import React, { ChangeEvent, useRef, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { JobDataProps } from '@/types'
import { useToast } from '@/hooks/use-toast'
import { AddJobs } from '@/app/(protected)/projects/add-job/actions'
import { useParams } from 'next/navigation'


const AddJobForm = () => {
    const {id} = useParams();
    const {toast} = useToast()
    const formRef = useRef<HTMLFormElement>(null);
    const [pending, setPending] = useState(false);


    const [jobData, setJobData] = useState<JobDataProps>({
        jobName: "",
        jobDescription: "",
        projectId: id
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setJobData(prev => ({ ...prev, [name]: value }));
    }

    const handleFormSubmission = async (jobData: JobDataProps) =>{
        if(jobData.jobName.trim() === "" || jobData.jobDescription.trim() === "")
        {
            toast({
                variant: "destructive",
                title: "Invalid Input",
                description: "Job Name or Job Description cannot be empty"
            });
            return;
        }

        setPending(true);
        const result = await AddJobs(jobData);
        setPending(false);

        if (result?.error) {
            toast({
                variant: "destructive",
                title: "Error: Unable to add Job",
                description: result.error
            })
        }

        formRef.current?.reset();
        setJobData({ jobName: "", jobDescription: "", projectId: "" });

    }

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        await handleFormSubmission(jobData);
    }



return(
    <>
    <form ref={formRef} onSubmit={handleSubmit}  className="h-full w-full flex flex-col">
        <div className="flex flex-col flex-grow text-a_black">
          <div>
            <Label className="">What should we call it?</Label>
            <Input
              placeholder="Lockheed Martin - Business Analyst"
              className="bg-white border-p_border rounded-lg"
              type='text'
              name='jobName'
              value={jobData.jobName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex-grow mt-4">
            <Label className="text-a_black">Job Description</Label>
            <Textarea
              className="bg-white border-p_border rounded-lg resize-none h-[90%]"
              placeholder="Copy and paste the entire description"
              name="jobDescription"
              value={jobData.jobDescription}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="w-full flex justify-center mt-4">
          <Button className="bg-[#FFB158] text-a_black border border-primary_color rounded-full font-bold hover:bg-primary_color px-5 py-2">
          {pending ? "Processing Result..." : "Get the results"}
          </Button>
        </div>
      </form>
    </>
)
}

export default AddJobForm;