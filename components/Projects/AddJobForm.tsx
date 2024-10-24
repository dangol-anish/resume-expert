"use client"
import React, { ChangeEvent, useRef, useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { JobDataProps, ProjectDataProps } from '@/types'
import { AddProjects } from '@/app/(protected)/projects/add-resume/actions'
import { useToast } from '@/hooks/use-toast'


const AddJobForm = () => {
    const {toast} = useToast()
    const formRef = useRef<HTMLFormElement>(null);
    const [pending, setPending] = useState(false);

    const [jobData, setJobData] = useState<JobDataProps>({
        jobName: "",
        jobDescription: ""
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setJobData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = ()=>{}



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