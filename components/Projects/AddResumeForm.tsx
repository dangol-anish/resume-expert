"use client"
import React, {ChangeEvent} from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useState } from 'react'

const AddResumeForm = () => {

    const [projectData, setProjectData] = useState({
        projectName: "",
        resumeDescription: ""
    })

    console.log(projectData)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;

        setProjectData((prev)=> (
            {
                ...prev,
                [name]: value
            }
        ))
    }


  return (
    <form className="h-full w-full flex flex-col">
        <div className="flex flex-col flex-grow text-a_black">
          <div>
            <Label className="">Project Name</Label>
            <Input
              placeholder="Business Analyst"
              className="bg-white border-p_border rounded-lg"
              type='text'
              name='projectName'
              value={projectData.projectName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex-grow mt-4">
            <Label className="text-a_black">Resume</Label>
            <Textarea
              className="bg-white border-p_border rounded-lg resize-none h-[90%]"
              placeholder="Copy and paste your entire resume here"
              name='resumeDescription'
              value={projectData.resumeDescription}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="w-full flex justify-center mt-4">
          <Button className="bg-[#FFB158] text-a_black border border-primary_color rounded-full font-bold hover:bg-primary_color px-5 py-2">
            Create project
          </Button>
        </div>
      </form>
  )
}

export default AddResumeForm
