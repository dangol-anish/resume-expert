"use server"

import { JobDataProps } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { generatePrompts } from "@/utils/openai";
import {  getDetails } from "../results/actions";

export async function AddJobs(jobData: JobDataProps) {

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return {
            error: "User is not authenticated."
        };
    }

    const { jobName, jobDescription, projectId } = jobData;

    if (!jobName?.trim() || !jobDescription?.trim()) {
        return {
            error: "Project name and resume cannot be empty."
        };
    }

    const { data, error } = await supabase
  .from("jobs")
  .insert({
    job_name: jobName,
    user_id: user.id,
    job_description: jobDescription,
    project_id: projectId
  })
  .select('job_id');

    if (error) {
        return {
            error: error.message
        };
    }

    const jobId = data[0].job_id;


    getDetails(jobDescription, projectId, jobId);
    redirect("/projects/results");

    

    return {
        message: "Successuly added new jobs"
    }

}


