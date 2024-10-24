"use server"

import { ProjectDataProps } from "@/types";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function AddProjects(projectData: ProjectDataProps) {


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
        return {
            error: "Project name and resume cannot be empty."
        };
    }

    const { error } = await supabase.from("projects").insert({
        project_name: projectName,
        user_id: user.id,
        resume: resume,
    });

    if (error) {
        return {
            error: error.message
        };
    }

    redirect("/projects");

    return {
        message: "Successuly added new project"
    }

}
