"use client";
import React, { useState } from "react";
import AddPrompt from "@/components/AddPrompt";
import ResumeReport from "@/components/ResumeReport";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  const [evaluations, setEvaluations] = useState<string[]>([]);

  return (
    <>
      <main className="flex w-[100%]">
        <AddPrompt setEvaluations={setEvaluations} />
        <Separator
          className="w-[1px] h-screen bg-black/10"
          orientation="horizontal"
        />
        <ResumeReport evaluations={evaluations} />
      </main>
    </>
  );
}
