"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { generatePrompts } from "@/utils/openai"; // Ensure this is correctly imported

export interface AddPromptProps {
  setEvaluations: React.Dispatch<React.SetStateAction<string[]>>; // Updated prop type
}

export default function AddPrompt({ setEvaluations }: AddPromptProps) {
  const [resumeDescription, setResumeDescription] = useState<string>("");
  const [jobDescription, setJobDescription] = useState<string>("");

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

    const userQuery = `What are the red flags on this resume based on the following job description? Resume: ${resumeDescription}. Job Description: ${jobDescription}`;

    try {
      const evaluation = await generatePrompts(
        "gpt-3.5-turbo-instruct",
        userQuery
      );

      // Update evaluations immediately
      setEvaluations((prev) => [...prev, evaluation]);

      // Generate further evaluations one after the other
      const focus = await generateFocus(
        evaluation,
        resumeDescription,
        jobDescription
      );
      setEvaluations((prev) => [...prev, focus]); // Update evaluations immediately

      const comprehensiveGuide = await generateComprehensiveGuide(focus);
      setEvaluations((prev) => [...prev, comprehensiveGuide]); // Update evaluations immediately

      const recommendations = await generateRecommendations(comprehensiveGuide);
      setEvaluations((prev) => [...prev, recommendations]); // Update evaluations immediately

      const candidateEvaluation = await generateCandidateEvaluation(
        recommendations
      );
      setEvaluations((prev) => [...prev, candidateEvaluation]); // Update evaluations immediately
    } catch (error) {
      console.error("Error generating evaluation:", error);
      alert(
        "An error occurred while generating the evaluation. Please try again."
      );
    }
  };

  const generateFocus = async (
    evaluation: string,
    resume: string,
    job: string
  ) => {
    const focusQuery = `Based on the evaluation: "${evaluation}", resume: "${resume}", and job description: "${job}", what should be the focus?`;
    return await generatePrompts("gpt-3.5-turbo-instruct", focusQuery);
  };

  const generateComprehensiveGuide = async (focus: string) => {
    const guideQuery = `Provide a comprehensive guide based on the following focus: "${focus}".`;
    return await generatePrompts("gpt-3.5-turbo-instruct", guideQuery);
  };

  const generateRecommendations = async (guide: string) => {
    const recommendationsQuery = `Based on the comprehensive guide: "${guide}", what are some recommendations?`;
    return await generatePrompts(
      "gpt-3.5-turbo-instruct",
      recommendationsQuery
    );
  };

  const generateCandidateEvaluation = async (recommendations: string) => {
    const evaluationQuery = `Evaluate the candidate based on the following recommendations: "${recommendations}".`;
    return await generatePrompts("gpt-3.5-turbo-instruct", evaluationQuery);
  };

  return (
    <main className="flex justify-center items-center p-10">
      <Dialog>
        <DialogTrigger className="border px-3 py-2 rounded-lg hover:bg-gray-100 transition">
          Add
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resume Expert</DialogTitle>
            <DialogDescription>
              Enter your resume and job description to get tailored feedback.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-5">
            <div>
              <Label htmlFor="resume">Enter your resume</Label>
              <Textarea
                id="resume"
                value={resumeDescription}
                onChange={handleResumeChange}
                placeholder="Type your resume here."
                rows={4}
                className="resize-none"
              />
            </div>

            <div>
              <Label htmlFor="job">Enter the job description</Label>
              <Textarea
                id="job"
                value={jobDescription}
                onChange={handleJobChange}
                placeholder="Type the job description here."
                rows={4}
                className="resize-none"
              />
            </div>

            <Button onClick={handleGenerate} className="self-start">
              Generate
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
