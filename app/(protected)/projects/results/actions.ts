import { generatePrompts } from "@/utils/openai";
import { createClient } from "@/utils/supabase/server";

export async function getDetails(jobDescription: string, projectId: string | string[]) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

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
    return await generateQuickSummary(jobDescription, resume);
}

export async function generateQuickSummary(jobDescription: string, resume: string) {
    const quickSummaryQuery = `Provide me a quick summary on this likelihood of getting the job based on the following job description and resume? Resume: ${resume}. Job Description: ${jobDescription}. The summary must not be long. It should be a single paragraph.`;

    const quickSummaryResult = await generatePrompts(quickSummaryQuery);

    await generateRedFlags(jobDescription, resume, quickSummaryResult);
    console.log(quickSummaryResult)
    return quickSummaryResult;
}

export const generateRedFlags = async (jobDescription: string, resume: string, quickSummaryResult: string) => {
    const redFlagQuery = `What are the red flags of the candidate based on the provided "${quickSummaryResult}", resume: "${resume}", and job description: "${jobDescription}". Explain the red flags in bullet points. It must not exceed 5 points.`;

    const redFlagResult = await generatePrompts(redFlagQuery);
    
    await generateInterviewFocus(redFlagResult, resume, redFlagResult);
    console.log(redFlagResult)
    return redFlagResult;
};

export const generateInterviewFocus = async (jobDescription: string, resume: string, focusResult: string) => {
    const interviewFocusQuery = `Provide a comprehensive interview focus guide based on the following focus: "${focusResult}" of resume: ${resume} and job description: ${jobDescription}. Explain the interview focus in bullet points. It must not exceed 5 points.`;
    const interviewFocusResult = await generatePrompts(interviewFocusQuery);

   await generateQuickTipsAndStrategy(jobDescription, resume, interviewFocusResult);
    console.log(interviewFocusResult)
   return interviewFocusResult;
};

export const generateQuickTipsAndStrategy = async (jobDescription: string, resume: string, interviewFocusResult: string) => {
    const quickTipsAndStrategyQuery = `Based on the interview focus result: "${interviewFocusResult}", what are some quick tips and strategy for improvement? The quick tips and strategy must not be long. It should be a single paragraph.`;
    const quickTipsAndStrategyResult = await generatePrompts(quickTipsAndStrategyQuery);
    
    await generateResumeToJobMatchRatio(jobDescription, resume, quickTipsAndStrategyResult);
    console.log(quickTipsAndStrategyResult)
    return quickTipsAndStrategyResult;
};

export const generateResumeToJobMatchRatio = async (jobDescription: string, resume: string, quickTipsAndStrategyResult: string) => {
    const resumeToJobMatchQuery = `Evaluate the resume to job match ratio of the candidate based on the "${quickTipsAndStrategyResult}" for the following resume ${resume} and jobDescription: ${jobDescription}. The answer should be in percentage but only provide the whole number. No words, only number`;
    const resumeToJobMatchResult = await generatePrompts(resumeToJobMatchQuery);

    await generateFinalRemarks(jobDescription, resume, resumeToJobMatchResult);
    console.log(resumeToJobMatchResult)
    return resumeToJobMatchResult;
};

export const generateFinalRemarks = async (jobDescription: string, resume: string, resumeToJobMatchResult: string) => {
    const finalRemarksQuery = `Evaluate the final remarks to job match ratio of the candidate based on the "${resumeToJobMatchResult}" for the following resume ${resume} and jobDescription: ${jobDescription}. The answer should be in one word, for example: apply, don't apply, and more etc.`;

    const finalRemarksResult = await generatePrompts(finalRemarksQuery);
    console.log(finalRemarksResult)
    return finalRemarksResult;
};
