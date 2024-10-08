"use client";
import React, { useState } from "react";
import AddPrompt from "@/components/AddPrompt";
import ResumeReport from "@/components/ResumeReport";

export default function Home() {
  const [evaluations, setEvaluations] = useState<string[]>([]);

  return (
    <>
      <main className="flex w-[100%]">
        <AddPrompt setEvaluations={setEvaluations} />
        <ResumeReport evaluations={evaluations} />
      </main>
    </>
  );
}
