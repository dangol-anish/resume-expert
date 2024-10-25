"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";

import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { generatePrompts } from "@/utils/openai";

export interface AddPromptProps {
  setEvaluations: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function AddPrompt({ setEvaluations }: AddPromptProps) {
  const [resumeDescription, setResumeDescription] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleResumeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeDescription(e.target.value);
  };

  const handleJobChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value);
  };

  const handleGenerate = async () => {
    if (!resumeDescription || !jobDescription) {
      alert("Please fill in both fields before generating.");
      return;
    }

    setLoading(true); // Start loading

    const userQuery = `What are the red flags on this resume based on the following job description? Resume: ${resumeDescription}. Job Description: ${jobDescription}`;

    try {
      const evaluation = await generatePrompts(userQuery);

      setEvaluations((prev) => [...prev, evaluation]);

      const focus = await generateFocus(
        evaluation,
        resumeDescription,
        jobDescription
      );
      setEvaluations((prev) => [...prev, focus]);

      const comprehensiveGuide = await generateComprehensiveGuide(focus);
      setEvaluations((prev) => [...prev, comprehensiveGuide]);

      const recommendations = await generateRecommendations(comprehensiveGuide);
      setEvaluations((prev) => [...prev, recommendations]);

      const candidateEvaluation = await generateCandidateEvaluation(
        recommendations
      );
      setEvaluations((prev) => [...prev, candidateEvaluation]);
    } catch (error) {
      console.error("Error generating evaluation:", error);
      alert(
        "An error occurred while generating the evaluation. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const generateFocus = async (
    evaluation: string,
    resume: string,
    job: string
  ) => {
    const focusQuery = `Based on the evaluation: "${evaluation}", resume: "${resume}", and job description: "${job}", what should be the focus?`;
    return await generatePrompts(focusQuery);
  };

  const generateComprehensiveGuide = async (focus: string) => {
    const guideQuery = `Provide a comprehensive guide based on the following focus: "${focus}".`;
    return await generatePrompts(guideQuery);
  };

  const generateRecommendations = async (guide: string) => {
    const recommendationsQuery = `Based on the comprehensive guide: "${guide}", what are some recommendations?`;
    return await generatePrompts(recommendationsQuery);
  };

  const generateCandidateEvaluation = async (recommendations: string) => {
    const evaluationQuery = `Evaluate the candidate based on the following recommendations: "${recommendations}".`;
    return await generatePrompts(evaluationQuery);
  };

  return (
    <div className="w-[50%] flex flex-col  justify-between p-10">
      <div className="flex flex-col gap-6">
        <div>
          <Label htmlFor="resume" className="font-semibold ">
            Add your resume here
          </Label>
          <Textarea
            id="resume"
            value={resumeDescription}
            onChange={handleResumeChange}
            placeholder="Business Analyst CV"
            rows={4}
            className="resize-none bg-input_background h-40"
          />
        </div>

        <div>
          <Label htmlFor="job" className="font-semibold">
            Paste the job postings here
          </Label>
          <Textarea
            id="job"
            value={jobDescription}
            onChange={handleJobChange}
            placeholder="Business Analyst Job Description"
            rows={4}
            className="resize-none bg-input_background h-40"
          />
        </div>
      </div>

      <Button
        onClick={handleGenerate}
        className="self-start w-full font-bold"
        disabled={loading} // Disable button while loading
      >
        {loading ? "Generating..." : "Generate Results"}
      </Button>
    </div>
  );
}
