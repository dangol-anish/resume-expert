"use server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generatePrompts(prompt: string): Promise<string> {
  const response = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: prompt,
    max_tokens: 1024,
    temperature: 0.5,
  });

  return response.choices[0]?.text.trim() ?? "";
}
