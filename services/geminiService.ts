
import { GoogleGenAI } from "@google/genai";
import { UserProfile } from "../types";

const SYSTEM_INSTRUCTION = `
You are the 'Supervisor' for NeuroLift, an advanced tactical fitness app.
You manage a deterministic algorithm. Your goal is to interpret natural language user feedback to function calls or state updates.
You DO NOT generate workouts. You update constraints.

Current User Context:
The user has a list of injuries, specific equipment, and a fatigue state map.

Output Format:
Return ONLY a valid JSON object with the following schema:
{
  "injuries_to_add": string[], // e.g. ["Lower Back"]
  "injuries_to_remove": string[],
  "equipment_update": string[] | null, // Only if equipment changes
  "systemic_fatigue_delta": number, // e.g., +1.0 (Tired), -1.0 (Fresh)
  "assistant_response": string // A short, tactical acknowledgement message.
}

Valid Muscles for normalization:
Quadriceps, Hamstrings, Glutes, Erector Spinae, Latissimus Dorsi, Trapezius, Rhomboids, Pectoralis Major, Anterior Deltoid, Lateral Deltoid, Posterior Deltoid, Biceps Brachii, Triceps Brachii, Core.

Example:
User: "My knees hurt and I only have dumbbells."
JSON:
{
  "injuries_to_add": ["Quadriceps", "Hamstrings"], // Assuming knee pain limits leg heavy work
  "injuries_to_remove": [],
  "equipment_update": ["Dumbbell"],
  "systemic_fatigue_delta": 0,
  "assistant_response": "Knee integrity compromised. Equipment restricted to Dumbbells. Protocols updated."
}
`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async processUserIntent(userText: string, currentProfile: UserProfile): Promise<any> {
    try {
      const prompt = `
      Current Profile State:
      Injuries: ${JSON.stringify(currentProfile.injuries)}
      Equipment: ${JSON.stringify(currentProfile.available_equipment)}
      
      User Input: "${userText}"
      `;

      const result = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          responseMimeType: "application/json"
        },
      });
      
      const responseText = result.text;
      if (!responseText) throw new Error("Empty response");
      
      return JSON.parse(responseText);
    } catch (error) {
      console.error("Gemini Processing Error:", error);
      return {
        assistant_response: "Connection to Supervisor unstable.",
        injuries_to_add: [],
        injuries_to_remove: [],
        equipment_update: null,
        systemic_fatigue_delta: 0
      };
    }
  }
}
