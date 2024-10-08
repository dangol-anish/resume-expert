"use client";
import React, { useState } from "react";
import AddPrompt from "@/components/AddPrompt";
import ResumeReport from "@/components/ResumeReport";

export default function Home() {
  const [evaluations, setEvaluations] = useState<string[]>([]); // State to hold evaluation results

  return (
    <>
      <AddPrompt setEvaluations={setEvaluations} />
      <ResumeReport evaluations={evaluations} />{" "}
      {/* Pass evaluations as props */}
    </>
  );
}
