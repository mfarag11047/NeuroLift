
import { Exercise, UserProfile, WorkoutItem, TrainingSplit } from '../types';

// =============================================================================
// 1. INFRASTRUCTURE: SANITIZATION & NORMALIZATION
// =============================================================================

const StandardizedMuscle = {
  LATISSIMUS_DORSI: "Latissimus Dorsi",
  ERECTOR_SPINAE: "Erector Spinae",
  HAMSTRINGS: "Hamstrings",
  QUADRICEPS: "Quadriceps",
  GLUTES: "Glutes",
  BICEPS: "Biceps",
  BRACHIALIS: "Brachialis",
  TRICEPS: "Triceps",
  DELTOIDS: "Deltoids",
  PECTORALS: "Pectoralis Major",

  _MAPPING: {
    "Lats": "Latissimus Dorsi",
    "Latissimus": "Latissimus Dorsi",
    "Erector_Spinae": "Erector Spinae",
    "Lower_Back": "Erector Spinae",
    "Quads": "Quadriceps",
    "Hams": "Hamstrings",
    "Glute Muscles": "Glutes",
    "Chest": "Pectoralis Major",
    "Shoulders": "Deltoids"
  } as Record<string, string>,

  normalize(name: string): string {
    return this._MAPPING[name] || name;
  }
};

// =============================================================================
// 2. SPLIT DEFINITIONS
// =============================================================================

interface SplitDay {
  name: string;
  muscles: string[];
}

const SPLIT_DEFINITIONS: Record<TrainingSplit, SplitDay[]> = {
  'Full Body': [
    { name: "FULL BODY ASSAULT", muscles: [] } // Empty means all allowed
  ],
  'Push/Pull/Legs': [
    { name: "PUSH PROTOCOL", muscles: ["Pectoralis Major", "Triceps Brachii", "Anterior Deltoid", "Lateral Deltoid", "Serratus Anterior"] },
    { name: "PULL PROTOCOL", muscles: ["Latissimus Dorsi", "Biceps Brachii", "Trapezius", "Rhomboids", "Posterior Deltoid", "Brachialis"] },
    { name: "LEGS PROTOCOL", muscles: ["Quadriceps", "Hamstrings", "Glutes", "Calves", "Adductors", "Abductors"] }
  ],
  'Upper/Lower': [
    { name: "UPPER BODY OP", muscles: ["Pectoralis Major", "Latissimus Dorsi", "Deltoids", "Biceps Brachii", "Triceps Brachii", "Trapezius", "Rhomboids"] },
    { name: "LOWER BODY OP", muscles: ["Quadriceps", "Hamstrings", "Glutes", "Calves", "Adductors", "Erector Spinae"] }
  ],
  'Bro Split': [
    { name: "CHEST DAY", muscles: ["Pectoralis Major", "Anterior Deltoid"] },
    { name: "BACK DAY", muscles: ["Latissimus Dorsi", "Trapezius", "Rhomboids"] },
    { name: "SHOULDERS", muscles: ["Anterior Deltoid", "Lateral Deltoid", "Posterior Deltoid", "Trapezius"] },
    { name: "LEGS", muscles: ["Quadriceps", "Hamstrings", "Glutes", "Calves"] },
    { name: "ARMS", muscles: ["Biceps Brachii", "Triceps Brachii", "Brachialis", "Forearms"] }
  ]
};

export class AlgorithmEngine {

  /**
   * Sanitizes the raw exercise data at runtime.
   */
  private sanitizeExercise(exercise: Exercise): Exercise {
    const newActivation: Record<string, number> = {};
    for (const [muscle, coeff] of Object.entries(exercise.biometrics.activationProfile)) {
      const cleanName = StandardizedMuscle.normalize(muscle);
      newActivation[cleanName] = coeff;
    }

    // Isolation Clamping
    if (exercise.biometrics.mechanics.toUpperCase() === "ISOLATION") {
        let primeMover = "";
        let maxVal = -1;
        for (const [m, c] of Object.entries(newActivation)) {
            if (c > maxVal) {
                maxVal = c;
                primeMover = m;
            }
        }
        for (const m of Object.keys(newActivation)) {
            if (m !== primeMover && newActivation[m] > 0.2) {
                newActivation[m] = 0.1;
            }
        }
    }

    return {
        ...exercise,
        biometrics: {
            ...exercise.biometrics,
            activationProfile: newActivation
        }
    };
  }

  // =============================================================================
  // 3. CONSTRAINT SOLVER & SPLIT LOGIC
  // =============================================================================

  private filterBySplit(user: UserProfile, exercises: Exercise[]): Exercise[] {
    const splitSchedule = SPLIT_DEFINITIONS[user.preferred_split];
    // Safety check: if split index out of bounds, reset to 0
    const dayIndex = (user.split_index || 0) % splitSchedule.length;
    const currentDay = splitSchedule[dayIndex];

    // If muscles array is empty, it means "All allowed" (Full Body)
    if (currentDay.muscles.length === 0) return exercises;

    return exercises.filter(ex => {
      const sanitized = this.sanitizeExercise(ex);
      // Check if the PRIMARY muscle of the exercise is in the allowed list for today
      const primary = StandardizedMuscle.normalize(ex.displayMetadata.primaryMuscle);
      
      // Also check normalized keys in activation profile just in case display metadata is vague
      const musclesInvolved = Object.keys(sanitized.biometrics.activationProfile);
      
      const isAllowed = currentDay.muscles.some(target => 
        primary.includes(target) || 
        // Allow if the primary mover matches loosely (e.g. "Triceps" matches "Triceps Brachii")
        target.includes(primary) ||
        // If it's a compound lift, check if it hits the target muscles significantly (>0.7)
        musclesInvolved.some(m => m.includes(target) && sanitized.biometrics.activationProfile[m] > 0.7)
      );

      return isAllowed;
    });
  }

  private filterHardConstraints(user: UserProfile, exercises: Exercise[]): Exercise[] {
    return exercises.filter(rawEx => {
      const ex = this.sanitizeExercise(rawEx);

      // A. Equipment Check
      const exEquipment = ex.equipment.split(',').map(s => s.trim());
      const hasEquipment = exEquipment.some(req => 
        user.available_equipment.some(avail => avail.toLowerCase() === req.toLowerCase()) ||
        req.toLowerCase() === "bodyweight" || 
        (req.toLowerCase() === "cable" && user.available_equipment.includes("Cable")) ||
        (req.toLowerCase().includes("machine") && user.available_equipment.includes("Machine"))
      );

      if (!hasEquipment) return false;

      // B. Injury Check
      let isInjured = false;
      for (const [muscle, coeff] of Object.entries(ex.biometrics.activationProfile)) {
        if (user.injuries.includes(muscle) && coeff > 0.6) {
          isInjured = true;
          break;
        }
      }
      if (isInjured) return false;

      return true;
    });
  }

  private calculateUtilityScore(user: UserProfile, exercise: Exercise): number {
    const ex = this.sanitizeExercise(exercise);
    let score = 0.0;

    // A. Local Freshness Score
    let muscleScore = 0.0;
    let totalWeight = 0.0;

    for (const [muscle, coeff] of Object.entries(ex.biometrics.activationProfile)) {
      const currentFatigue = user.fatigue_state[muscle] || 0.0;
      const freshness = 1.0 - currentFatigue;
      muscleScore += (freshness * coeff);
      totalWeight += coeff;
    }

    const avgFreshness = totalWeight > 0 ? muscleScore / totalWeight : 1.0;
    score += (avgFreshness * 100);

    // B. Systemic Fatigue Gate
    const systemicPenalty = ex.biometrics.systemicFatigue * user.current_systemic_fatigue * 50.0;
    score -= systemicPenalty;

    // C. User Bias
    const bias = user.exercise_bias[ex.id] || 1.0;
    score *= bias;

    return score;
  }

  // =============================================================================
  // 4. PROGRESSIVE OVERLOAD & GENERATION
  // =============================================================================

  private programExercise(exercise: Exercise, user: UserProfile, role: string): WorkoutItem {
    const history = user.exercise_history[exercise.id];
    let weight = 0;
    let rationale = "";
    
    const isCompound = exercise.biometrics.mechanics === "Compound";

    if (history) {
        // Linear Progression
        const increment = isCompound ? 5 : 2.5;
        weight = history.weight + increment;
        rationale = `Progressive Overload: +${increment}lbs`;
    } else {
        // --- COLD START LOGIC ---
        const userWeight = user.stats.weight || 170;
        
        // Difficulty Sliders (Experience Multipliers)
        // These numbers represent % of Bodyweight for a 10-rep max estimate
        let expMultiplier = 0.4; // Default Beginner
        if (user.experience === 'Beginner') expMultiplier = 0.3;
        if (user.experience === 'Intermediate') expMultiplier = 0.75;
        if (user.experience === 'Advanced') expMultiplier = 1.1;

        // Exercise Type Multiplier
        let typeMultiplier = 1.0; 
        
        if (isCompound) {
            const primaryMuscle = exercise.displayMetadata.primaryMuscle.toLowerCase();
            if (primaryMuscle.includes('quad') || primaryMuscle.includes('glute')) {
                typeMultiplier = 1.2; // Legs are stronger
            } else {
                typeMultiplier = 0.8; // Upper body
            }
        } else {
            typeMultiplier = 0.2; // Isolation is much weaker
        }

        // Calculate
        const rawWeight = userWeight * typeMultiplier * expMultiplier;
        
        // Round to nearest 5
        weight = Math.max(5, Math.round(rawWeight / 5) * 5);

        // Override for Bodyweight
        if (exercise.equipment.toLowerCase().includes("bodyweight")) {
            weight = 0; 
            rationale = `Bodyweight Baseline`;
        } else {
            rationale = `Cold Start: ${user.experience} (${Math.round(typeMultiplier * expMultiplier * 100)}% BW)`;
        }
    }

    const loadStr = weight > 0 ? `${weight} lbs` : "Bodyweight";

    return {
        exercise,
        sets: isCompound ? 4 : 3,
        reps: isCompound ? "6-8" : "10-12",
        load: loadStr,
        rest: isCompound ? "3 min" : "90s",
        slot_type: role,
        rationale: rationale
    };
  }

  public getCurrentPhaseName(user: UserProfile): string {
    const schedule = SPLIT_DEFINITIONS[user.preferred_split];
    const dayIndex = (user.split_index || 0) % schedule.length;
    return schedule[dayIndex].name;
  }

  public generateWorkout(user: UserProfile, allExercises: Exercise[]): WorkoutItem[] {
    // 1. Filter by Hard Constraints
    let candidates = this.filterHardConstraints(user, allExercises);

    // 2. Filter by SPLIT (Strict)
    candidates = this.filterBySplit(user, candidates);

    // 3. Score candidates
    const scoredExercises = candidates.map(ex => ({
      exercise: ex,
      score: this.calculateUtilityScore(user, ex)
    })).sort((a, b) => b.score - a.score);

    const workoutPlan: WorkoutItem[] = [];
    const usedIds = new Set<string>();

    // Calculate Slot Config based on Time
    const duration = user.target_duration || 60; // Default to 60 mins
    // Heuristic: ~10 mins per exercise (3-4 sets + rest + transition)
    const totalSlots = Math.floor(duration / 10);
    
    let mainCount = 1; // Always 1 main lift
    let secondaryCount = 0;
    let accessoryCount = 0;

    if (duration <= 30) {
        // Short session: 1 Main, remaining accessories (max 2)
        mainCount = 1;
        secondaryCount = 0;
        accessoryCount = Math.max(1, totalSlots - 1); 
    } else if (duration <= 45) {
        // 45 mins: 1 Main, 1 Secondary, rest accessories
        mainCount = 1;
        secondaryCount = 1;
        accessoryCount = Math.max(1, totalSlots - 2);
    } else {
        // 60+ mins: 1 Main, 2 Secondary (if time), rest accessories
        mainCount = 1;
        secondaryCount = duration >= 75 ? 2 : 1;
        accessoryCount = Math.max(2, totalSlots - mainCount - secondaryCount);
    }

    // Helper to fill slots
    const fillSlot = (role: string, needsCompound: boolean, count: number) => {
      let filled = 0;
      for (const item of scoredExercises) {
        if (filled >= count) break;
        if (usedIds.has(item.exercise.id)) continue;
        
        const isCompound = item.exercise.biometrics.mechanics === "Compound";
        
        // Strict Slotting
        if (needsCompound && !isCompound) continue;
        if (!needsCompound && isCompound) continue; 

        workoutPlan.push(this.programExercise(item.exercise, user, role));
        usedIds.add(item.exercise.id);
        filled++;
      }
    };

    // Fallback: If list is small (e.g. Bro Split Arms day), loosen constraints
    if (scoredExercises.length < 3) {
       // Just take top available regardless of slotting logic
       for (const item of scoredExercises) {
         if (workoutPlan.length >= totalSlots) break;
         if (!usedIds.has(item.exercise.id)) {
            workoutPlan.push(this.programExercise(item.exercise, user, "General Strength"));
            usedIds.add(item.exercise.id);
         }
       }
    } else {
        // Slot 1: Main Strength (Compound)
        fillSlot("Main Strength", true, mainCount);
        // Slot 2: Secondary Compound
        fillSlot("Secondary Compound", true, secondaryCount);
        // Slot 3+: Hypertrophy Accessory (Isolation)
        fillSlot("Hypertrophy Accessory", false, accessoryCount);
    }

    return workoutPlan;
  }

  // ... (Recovery and Apply methods remain the same)
  public applyWorkoutEffects(user: UserProfile, workout: WorkoutItem[]): UserProfile {
    const newUser = JSON.parse(JSON.stringify(user)); 

    workout.forEach(item => {
        const ex = this.sanitizeExercise(item.exercise);
        const weightMatch = item.load.match(/(\d+(\.\d+)?)/);
        const weight = weightMatch ? parseFloat(weightMatch[0]) : 0;
        
        newUser.exercise_history[ex.id] = {
            weight: weight,
            date: Date.now(),
            reps: item.reps
        };

        const fatigueImpulse = (ex.biometrics.systemicFatigue || 0.5) * item.sets * 0.1;
        newUser.current_systemic_fatigue = Math.min(5, newUser.current_systemic_fatigue + fatigueImpulse);

        Object.entries(ex.biometrics.activationProfile).forEach(([muscle, coeff]) => {
            const current = newUser.fatigue_state[muscle] || 0;
            const fatigueAdd = coeff * item.sets * 0.08;
            newUser.fatigue_state[muscle] = Math.min(1.0, current + fatigueAdd);
        });
    });

    return newUser;
  }

  public recover(user: UserProfile, hours: number): UserProfile {
    const newUser = JSON.parse(JSON.stringify(user));
    newUser.current_systemic_fatigue = Math.max(0, newUser.current_systemic_fatigue - (hours * 0.08));
    const muscles = Object.keys(newUser.fatigue_state);
    muscles.forEach(muscle => {
        const current = newUser.fatigue_state[muscle] || 0;
        newUser.fatigue_state[muscle] = Math.max(0, current - (hours * 0.04));
    });
    return newUser;
  }
}
