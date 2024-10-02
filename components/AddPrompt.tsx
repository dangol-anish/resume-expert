import React from "react";
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
import { Input } from "./ui/input";

export default function AddPrompt() {
  return (
    <>
      <main className="h-screen flex justify-center items-center">
        <Dialog>
          <DialogTrigger>Add </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Resume Expert</DialogTitle>
              <DialogDescription>lorem</DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-5">
              <div>
                <Label>Enter your resume</Label>

                <Input />
              </div>

              <div>
                <Label>Enter the job description</Label>
                <Input />
              </div>

              <Button>Generate</Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </>
  );
}
