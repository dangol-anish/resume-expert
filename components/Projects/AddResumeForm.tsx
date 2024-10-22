"use client"
import React, { ChangeEvent, useRef } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { useState } from 'react'
import { ProjectDataProps } from '@/types'
import { useToast } from '@/hooks/use-toast'

const AddResumeForm = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const [pending, setPending] = useState(false)
    const {toast} = useToast()

    const [projectData, setProjectData] = useState({
        projectName: "",
        resume: ""
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setProjectData((prev) => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    const handleFormSubmission = async (projectData: ProjectDataProps) => {
        setPending(true)
        const result = { error: false };
        setPending(false)
        if (result?.error) {
            toast({
                variant: "destructive",
                title: "Authentication Error",
                description: "Error while adding a new project"
            })
            return
        }
        formRef.current?.reset()
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await handleFormSubmission(projectData);
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="h-full w-full flex flex-col">
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
                        name='resume'  // Fixing the mismatch in name
                        value={projectData.resume}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="w-full flex justify-center mt-4">
                <Button
                    className="bg-[#FFB158] text-a_black border border-primary_color rounded-full font-bold hover:bg-primary_color px-5 py-2"
                    disabled={pending}
                >
                    {pending ? "Creating..." : "Create project"}
                </Button>
            </div>
        </form>
    )
}

export default AddResumeForm
