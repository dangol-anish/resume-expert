"use client";
import React, { useState } from "react";
import AddPrompt from "@/components/AddPrompt";
import ResumeReport from "@/components/ResumeReport";
import { Separator } from "@/components/ui/separator";
import LoginButton from "@/components/Auth/LoginLogoutButton";
import UserGreetText from "@/components/Auth/UserGreetText";

export default function Home() {
  const [evaluations, setEvaluations] = useState<string[]>([]);

  return (
    <>
      <main className="flex w-[100%] flex-col justify-between">
        <UserGreetText />
        {/* <AddPrompt setEvaluations={setEvaluations} />
        <Separator
          className="w-[1px] h-screen bg-black/10"
          orientation="horizontal"
        />
        <ResumeReport evaluations={evaluations} /> */}
        <LoginButton />
      </main>
    </>
  );
}
