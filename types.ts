
// Domain Layer Types

export enum Mechanics {
  COMPOUND = "Compound",
  ISOLATION = "Isolation"
}

export interface DisplayMetadata {
  primaryMuscle: string;
  secondaryMuscles: string[];
}

export interface Biometrics {
  systemicFatigue: number; // Represents CNS Load/Fatigue Cost (0.0 - 1.5)
  mechanics: string; // "Compound" | "Isolation"
  activationProfile: Record<string, number>; // Muscle Name -> Coefficient (0.0 - 1.0)
}

export interface Exercise {
  id: string;
  name: string;
  type: string;
  description: string;
  equipment: string; // Comma separated string
  displayMetadata: DisplayMetadata;
  biometrics: Biometrics;
}

export interface ExerciseLog {
  weight: number;
  date: number;
  reps: string;
}

export interface SessionExercise {
  name: string;
  sets: number;
  reps: string;
  load: string;
}

export interface CompletedSession {
  id: string;
  date: number;
  exercises: SessionExercise[];
  totalVolume: number;
}

export type ExperienceLevel = 'Beginner' | 'Intermediate' | 'Advanced';
export type TrainingSplit = 'Full Body' | 'Push/Pull/Legs' | 'Upper/Lower' | 'Bro Split';

export interface UserStats {
  weight: number; // lbs
  height: number; // inches
  age: number;
  gender: 'Male' | 'Female' | 'Other';
}

export interface UserProfile {
  id: string;
  // Bio-metrics
  stats: UserStats;
  experience: ExperienceLevel;
  preferred_split: TrainingSplit;
  split_index: number; // Tracks rotation (0 = Day 1, 1 = Day 2, etc.)
  target_duration: number; // minutes
  
  // Algorithm State
  fatigue_state: Record<string, number>; // 0.0 (Fresh) to 1.0 (Exhausted)
  systemic_capacity: number; // 1.0 (Low) to 5.0 (High)
  current_systemic_fatigue: number; // Calculated accumulation
  available_equipment: string[];
  injuries: string[];
  exercise_bias: Record<string, number>; // Multiplier for specific exercises
  exercise_history: Record<string, ExerciseLog>; // Tracks last weight used per exercise (For Algorithm)
  completed_sessions: CompletedSession[]; // Full ledger of past workouts (For Logbook UI)
}

export interface WorkoutItem {
  exercise: Exercise;
  sets: number;
  reps: string; // Range e.g., "8-10"
  load: string; // "135 lbs"
  rest: string;
  slot_type: string;
  rationale: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}
