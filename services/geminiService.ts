import { GoogleGenAI } from "@google/genai";
import { UserProfile } from "../types";

const SYSTEM_INSTRUCTION = `
You are the 'Ghost in the Machine' for NeuroLift, an advanced tactical fitness app.
Your goal is to interpret natural language user feedback and modify the User Profile state accordingly.
You must act as a middleware layer. You do not generate the workout text yourself. You output JSON parameters that the deterministic algorithm uses.

Current User Context:
The user has a list of injuries, specific equipment, and a fatigue state map.

Output Format:
Return ONLY a valid JSON object with the following schema (no markdown code blocks):
{
  "injuries_to_add": string[],
  "injuries_to_remove": string[],
  "fatigue_modifications": { [muscle_name: string]: number }, // 0.0 to 1.0 (1.0 is exhausted)
  "equipment_update": string[] | null,
  "systemic_fatigue_delta": number, // e.g., +0.5 or -0.5
  "assistant_response": string // A short, tactical, cyber-themed acknowledgement message.
}

Valid Muscles for normalization:
Quadriceps, Hamstrings, Glutes, Erector Spinae, Lats, Traps, Rhomboids, Chest, Front Delts, Side Delts, Rear Delts, Biceps, Triceps, Core, Calves, Lower Back (map to Erector Spinae).

Example 1:
User: "My lower back is killing me today."
JSON:
{
  "injuries_to_add": ["Erector Spinae"],
  "injuries_to_remove": [],
  "fatigue_modifications": {},
  "equipment_update": null,
  "systemic_fatigue_delta": 0,
  "assistant_response": " acknowledged. Spinal erectors flagged as compromised. Rerouting load distribution."
}

Example 2:
User: "I feel great, super energetic. Legs are fresh."
JSON:
{
  "injuries_to_add": [],
  "injuries_to_remove": [],
  "fatigue_modifications": {"Quadriceps": 0.0, "Hamstrings": 0.0, "Glutes": 0.0},
  "equipment_update": null,
  "systemic_fatigue_delta": -1.0,
  "assistant_response": "Biometrics optimal. Disengaging safeties. Prepare for heavy load."
}
`;

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // In a real app, API key should be handled securely.
    // Assuming process.env.API_KEY is available as per prompt instructions.
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

      // Update to use ai.models.generateContent instead of getGenerativeModel
      const result = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        },
      });
      
      // Use result.text instead of result.response.text()
      const responseText = result.text;
      
      if (!responseText) {
        throw new Error("Empty response from AI");
      }
      
      // Clean formatting if Gemini adds markdown
      const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      
      return JSON.parse(jsonStr);
    } catch (error) {
      console.error("Gemini Processing Error:", error);
      return {
        assistant_response: "Connection to neural core unstable. Unable to process intent.",
        injuries_to_add: [],
        injuries_to_remove: [],
        fatigue_modifications: {},
        equipment_update: null,
        systemic_fatigue_delta: 0
      };
    }
  }
}