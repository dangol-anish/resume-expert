"use server"
import { ResumeResult, User } from "@/types";
import { generatePrompts } from "@/utils/openai";
import { createClient } from "@/utils/supabase/server";

export async function getDetails(jobDescription: string, projectId: string | string[], jobId: string | string[]): Promise<{ success?: string; error?: string }> {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser() as { data: { user: User | null } };

    if (!user) {
        return { error: "User is not authenticated." };
    }

    const { data, error } = await supabase
        .from("projects")
        .select("resume")
        .eq("user_id", user.id)
        .eq("project_id", projectId);

    if (error || !data.length) {
        return { error: "No resume found or error fetching resume." };
    }

    const resume = data[0]?.resume;

    // Initialize an object to store all results
    const results: ResumeResult = {
        quickSummary: null,
        redFlags: null,
        interviewFocus: null,
        quickTipsAndStrategy: null,
        resumeToJobMatch: null,
        finalRemarks: null,
    };

    // Retry logic for job ID retrieval
    const maxRetries = 5; // Maximum number of retries
    const delay = 2000; // Delay in milliseconds (2 seconds)

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        // Check if jobId exists
        const { data: jobData, error: jobError } = await supabase
            .from("jobs") // Assume this is your target table
            .select("*")
            .eq("job_id", jobId);

        if (jobError || !jobData.length) {
            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, delay)); // Wait before retrying
                continue; // Retry fetching the job data
            } else {
               console.log("Job Id doesn't exist")
            }
        }

        // If job ID exists, proceed with calculations
        results.quickSummary = await generateQuickSummary(jobDescription, resume);
        results.redFlags = await generateRedFlags(jobDescription, resume, results.quickSummary);
        results.interviewFocus = await generateInterviewFocus(jobDescription, resume, results.redFlags);
        results.quickTipsAndStrategy = await generateQuickTipsAndStrategy(jobDescription, resume, results.interviewFocus);
        results.resumeToJobMatch = await generateResumeToJobMatchRatio(jobDescription, resume, results.quickTipsAndStrategy);
        results.finalRemarks = await generateFinalRemarks(jobDescription, resume, results.resumeToJobMatch);

        console.log(results);

        // Save all results to the database
        const { error: insertError } = await supabase
            .from("job_results")
            .insert([{ 
                j_quick_summary: results.quickSummary, 
                j_red_flags: results.redFlags, 
                j_interview_focus: results.interviewFocus, 
                j_tips_and_strategy: results.quickTipsAndStrategy, 
                j_rtj_match: results.resumeToJobMatch, 
                j_final_remarks: results.finalRemarks, 
                job_id: jobId,
                project_id: projectId
            }]);

        if (insertError) {
            return { error: "Failed to save results." };
        }

        return { success: "Results saved successfully." };
    }

    return { error: "Job ID does not exist." }; // In case of no successful attempts
}

export async function generateQuickSummary(jobDescription: string, resume: string): Promise<string> {
    const quickSummaryQuery = `Provide me a quick summary on this likelihood of getting the job based on the following job description and resume? Resume: ${resume}. Job Description: ${jobDescription}. The summary must not be long. It should be a single paragraph.`;

    const quickSummaryResult = await generatePrompts(quickSummaryQuery);
    return quickSummaryResult;
}

export const generateRedFlags = async (jobDescription: string, resume: string, quickSummaryResult: string): Promise<string> => {
    const redFlagQuery = `What are the red flags of the candidate based on the provided "${quickSummaryResult}", resume: "${resume}", and job description: "${jobDescription}". Explain the red flags in bullet points. It must not exceed 5 points.`;

    const redFlagResult = await generatePrompts(redFlagQuery);
    return redFlagResult;
};

export const generateInterviewFocus = async (jobDescription: string, resume: string, focusResult: string): Promise<string> => {
    const interviewFocusQuery = `Provide a comprehensive interview focus guide based on the following focus: "${focusResult}" of resume: ${resume} and job description: ${jobDescription}. Explain the interview focus in bullet points. It must not exceed 5 points.`;
    const interviewFocusResult = await generatePrompts(interviewFocusQuery);
    return interviewFocusResult;
};

export const generateQuickTipsAndStrategy = async (jobDescription: string, resume: string, interviewFocusResult: string): Promise<string> => {
    const quickTipsAndStrategyQuery = `Based on the interview focus result: "${interviewFocusResult}", what are some quick tips and strategy for improvement? The quick tips and strategy must not be long. It should be a single paragraph.`;
    const quickTipsAndStrategyResult = await generatePrompts(quickTipsAndStrategyQuery);
    return quickTipsAndStrategyResult;
};

export const generateResumeToJobMatchRatio = async (jobDescription: string, resume: string, quickTipsAndStrategyResult: string): Promise<string> => {
    const resumeToJobMatchQuery = `Evaluate the resume to job match ratio of the candidate based on the "${quickTipsAndStrategyResult}" for the following resume ${resume} and jobDescription: ${jobDescription}. The answer should be in percentage but only provide the whole number. No words.`;
    const resumeToJobMatchResult = await generatePrompts(resumeToJobMatchQuery);
    return resumeToJobMatchResult;
};

export const generateFinalRemarks = async (jobDescription: string, resume: string, resumeToJobMatchResult: string): Promise<string> => {
    const finalRemarksQuery = `Evaluate the final remarks to job match ratio of the candidate based on the "${resumeToJobMatchResult}" for the following resume ${resume} and jobDescription: ${jobDescription}. The answer should be in one word, for example: apply, don't apply, and more etc.`;

    const finalRemarksResult = await generatePrompts(finalRemarksQuery);
    return finalRemarksResult;
};


export async function getResults(id: string | string[]){

    const supabase = createClient();
    
    const {data, error } = await supabase.from("job_results").select("j_quick_summary, j_red_flags, j_interview_focus, j_tips_and_strategy, j_rtj_match, j_final_remarks").eq("job_id", id);

    if (error) {
      
        return {
            error: error.message
        }
    }

    return data;

}