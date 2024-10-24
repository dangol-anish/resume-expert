"use server"
import { createClient } from "@/utils/supabase/server";


export async function getJobData(){
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

     if (!user) {
        return {
            error: "User is not authenticated."
        };
    }

    const { data, error } = await supabase
  .from("jobs")
  .select("job_id, created_at, job_name, job_score, job_remarks")
  .eq("user_id", user.id);

  if (error) {
    return {
        error: error.message
    };
}


return{
    data: data
}


}