"use server"
import { createClient } from "@/utils/supabase/server";


export async function getJobData(project_id: string | string[]){
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

     if (!user) {
        return {
            error: "User is not authenticated."
        };
    }

const { data, error } = await supabase
.from('jobs')
.select(`
  job_id,
  job_name,
  created_at,
  job_results (j_rtj_match, j_final_remarks)
`).eq("project_id", project_id)

if (error) {
 return {
    error: error.message
 }
} 


return{
    data: data
}

}