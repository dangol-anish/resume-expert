"use client";
import React, { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import AddPrompt from "@/components/AddPrompt";
import ResumeReport from "@/components/ResumeReport";
import { Separator } from "@/components/ui/separator";
import LoginButton from "@/components/Auth/LoginLogoutButton";
import UserGreetText from "@/components/Auth/UserGreetText";
import { useRouter } from "next/navigation"; // Import useRouter for redirection

const supabase = createClient(); // Create Supabase client outside the component

export default function Home() {
  // const router = useRouter(); // Initialize the router for redirection

  // useEffect(() => {
  //   const checkUserSession = async () => {
  //     const {
  //       data: { session },
  //     } = await supabase.auth.getSession();
  //     if (session) {
  //       router.push("/projects");
  //     }
  //   };

  //   checkUserSession();
  // }, []);

  return (
    <>
      <main className="flex w-[100%] flex-col justify-between">
        <UserGreetText />
        <LoginButton />
      </main>
    </>
  );
}
