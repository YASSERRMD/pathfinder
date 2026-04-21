/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { UserProfile, Roadmap, NextStepResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

/**
 * Logic to decide the next question dynamically.
 * This ensures the profiling is deterministic about the information goals but dynamic in interaction.
 */
export async function getNextStep(messages: { role: string, content: string }[], currentProfile: UserProfile): Promise<NextStepResponse> {
  const prompt = `
    You are the "Pathfinder Brain". Your job is to profile a learner to create a perfectly tailored learning roadmap.
    
    ## Information Goals:
    We need to know:
    1. Topic (The subject they want to learn)
    2. Goal (What "success" looks like for them)
    3. Timeline (How months/years they plan to study)
    4. Familiarity (Current skill level)
    5. Time Availability (Hours per week)
    6. Context/Age (To set the right tone/pacing)
    7. Preferences (Format, Budget, Language)

    ## Instructions:
    1. Look at the current User Profile and the conversation history.
    2. If we have enough information to build a high-quality roadmap (usually after 4-6 questions total), set "isComplete" to true.
       - A roadmap is "high quality" if we know the topic, goal, timeline, and familiarity at minimum.
    3. Otherwise, choose one missing Information Goal and ask a clear, helpful question about it.
    4. Provide options whenever possible. Specify "inputType" as 'single' (click one button), 'multiple' (select several and confirm), or 'text' (type response).
    5. Be concise and encouraging. Do not ask for everything at once. 
    6. Use "profileUpdate" to store any information you've gathered from the LAST user message.

    ## Current Profile Data:
    ${JSON.stringify(currentProfile, null, 2)}

    ## Conversation History:
    ${messages.map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n')}

    ## Output Format (JSON ONLY):
    {
      "message": "Your next question or a wrapping up message",
      "options": ["Option 1", "Option 2"],
      "inputType": "single" | "multiple" | "text",
      "profileUpdate": { "key": "value" },
      "isComplete": boolean
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: { 
        responseMimeType: "application/json"
      },
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    // Clean potential markdown code blocks from the response
    const jsonString = text.replace(/```json\n?|```/g, '').trim();
    const parsed = JSON.parse(jsonString) as NextStepResponse;
    return parsed;
  } catch (error) {
    console.error("Error getting next step:", error);
    return {
      message: "I'm sorry, I'm having trouble processing that. Could you tell me a bit more about what you want to achieve?",
      inputType: 'text',
      isComplete: false
    };
  }
}

export async function generateRoadmap(profile: UserProfile): Promise<Roadmap> {
  const prompt = `
    You are a Personalized Learning Roadmap Advisor. Create a highly detailed, professional tailored roadmap based on this profile:
    
    ${JSON.stringify(profile, null, 2)}

    ## CORE PRINCIPLES:
    1. MATCH THE GOAL: Hobby? Quick start. Career? Formal path.
    2. TONE: Playful for kids, practical for pros, thorough for researchers.
    3. SPECIFIC RESOURCES: Name real books, courses (Coursera/Udemy/YouTube), or documentation.
    4. MASTERY PROJECTS: One concrete, meaningful hands-on task per phase.

    ## OUTPUT FORMAT (STRICT JSON ONLY):
    {
      "summary": "Detailed 2-3 sentence overview of the strategy",
      "phases": [
        {
          "name": "Clear phase title",
          "duration": "Specific timeframe",
          "topics": ["Specific skill or concept"],
          "resources": [{ "name": "Resource Name", "type": "Book/Video/Course", "description": "Specific value add", "link": "https://example.com" }],
          "project": "Description of a project to prove mastery"
        }
      ],
      "deepDives": ["Advanced concept for future exploration"],
      "firstWeekActionPlan": ["Day 1-7 concrete checklist items"],
      "progressCheckpoints": ["Milestone to reach"],
      "disclaimers": ["Specific safety or ethics warning related to the topic"]
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: { responseMimeType: "application/json" },
    });

    const text = response.text;
    if (!text) throw new Error("No text returned");

    const jsonString = text.replace(/```json\n?|```/g, '').trim();
    return JSON.parse(jsonString) as Roadmap;
  } catch (error: any) {
    console.error("Error generating roadmap:", error);
    throw new Error("Failed to generate your personalized roadmap. Please try again.");
  }
}
