"use server"

import { JobDataProps } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function AddProjects(jobData: JobDataProps) {

    console.log(jobData)

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return {
            error: "User is not authenticated."
        };
    }

    const { jobName, jobDescription } = jobData;

    // Validate that projectName and resume are not null, undefined, or empty
    if (!jobName?.trim() || !jobDescription?.trim()) {
        return {
            error: "Project name and resume cannot be empty."
        };
    }

    const { error } = await supabase.from("jobs").insert({
        job_name: jobName,
        user_id: user.id,
        job_description: jobDescription,
    });

    if (error) {
        return {
            error: error.message
        };
    }

    redirect("/results");

    return {
        message: "Successuly added new jobs"
    }

}
