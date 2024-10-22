"use server"

import { ProjectDataProps } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function AddProjects(projectData: ProjectDataProps) {
    console.log('Received project data:', projectData); // Log input data

    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return {
            error: "User is not authenticated."
        };
    }

    const { projectName, resume } = projectData;

    // Validate that projectName and resume are not null, undefined, or empty
    if (!projectName?.trim() || !resume?.trim()) {
        console.error("Validation failed: Project name and resume cannot be empty.");
        return {
            error: "Project name and resume cannot be empty."
        };
    }

    const { data, error } = await supabase.from("projects").insert({
        project_name: projectName,
        user_id: user.id,
        resume: resume,
    });

    if (error) {
        console.error('Insert error:', error);
        return {
            error: error.message
        };
    }

    console.log('Inserted data:', data); // Log inserted data
    redirect("/projects");
}
