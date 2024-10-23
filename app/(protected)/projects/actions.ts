"use server"
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function getProjectData(){
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return {
            error: "User is not authenticated."
        };
    }

    const { data, error } = await supabase.from("projects").select("project_id, project_name, no_of_jobs").eq("user_id", user.id)

    if (error) {
        return {
            error: error.message
        };
    }

    return{
        data: data
    }


}
