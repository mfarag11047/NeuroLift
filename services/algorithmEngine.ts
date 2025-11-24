
import { Exercise, UserProfile, WorkoutItem, TrainingSplit, BanisterState, NexusHistoryEntry, DUPPhase } from '../types';

// =============================================================================
// 1. COMPONENT: THE BANISTER RECOVERY ENGINE
// =============================================================================

export class BanisterModel {
  private static readonly TAU_FITNESS = 42.0; // Days
  private static readonly TAU_FATIGUE = 7.0;  // Days

  /**
   * Calculates the current readiness score (0.0 - 1.0) based on the impulse-response model.
   * Score < 0.3 implies critical fatigue (Red Zone).
   * Score > 0.6 implies readiness / supercompensation.
   */
  static getRecoveryScore(state: BanisterState | undefined, queryDate: number): number {
    if (!state) return 1.0; // Cold start / Fresh
    
    const diffMs = queryDate - state.last_update;
    const days = diffMs / (1000 * 60 * 60 * 24);
    
    // Prevent future-dated queries breaking math
    if (days < 0) return 1.0;

    const decayG = Math.exp(-days / this.TAU_FITNESS);
    const decayH = Math.exp(-days / this.TAU_FATIGUE);
    
    const currentG = state.fitness_g * decayG;
    const currentH = state.fatigue_h * decayH;
    
    // Performance = Fitness - (2 * Fatigue)
    // We weight fatigue higher to ensure safety and encourage deloads
    const netPerformance = currentG - (2.0 * currentH);
    
    // Sigmoid Normalization
    // Maps (-Inf, Inf) to (0, 1). Adjusted slope (0.1) for smoother graduation.
    return 1.0 / (1.0 + Math.exp(-0.1 * netPerformance));
  }

  /**
   * Applies a training impulse to the state.
   */
  static updateState(state: BanisterState | undefined, impulse: number, eventDate: number): BanisterState {
    // Default cold state
    const currentState = state || { fitness_g: 0, fatigue_h: 0, last_update: eventDate };

    // 1. Decay existing state to the specific event moment
    const diffMs = eventDate - currentState.last_update;
    const days = Math.max(0, diffMs / (1000 * 60 * 60 * 24));

    const g = currentState.fitness_g * Math.exp(-days / this.TAU_FITNESS);
    const h = currentState.fatigue_h * Math.exp(-days / this.TAU_FATIGUE);

    // 2. Add new impulse
    return {
      fitness_g: g + impulse,
      fatigue_h: h + impulse,
      last_update: eventDate
    };
  }
}

// =============================================================================
// 2. COMPONENT: THE PROGRESSION ENGINE (DUP)
// =============================================================================

export class ProgressionEngine {
  
  private static PHASE_PARAMS = {
    'Hypertrophy': { reps: 10, sets: 4, intensity: 0.75 }, 
    'Strength':    { reps: 5,  sets: 5, intensity: 0.85 },
    'Endurance':   { reps: 15, sets: 3, intensity: 0.55 } 
  };

  // Brzycki / Epley Hybrid for e1RM
  static calculateE1RM(weight: number, reps: number): number {
    if (weight === 0) return 0;
    if (reps < 10) return weight * (1 + reps / 30.0); // Epley
    return weight * (36.0 / (37.0 - reps)); // Brzycki
  }

  static getNextPrescription(
    historyEntry: NexusHistoryEntry | undefined, 
    currentGlobalPhase: DUPPhase,
    userWeight: number
  ): { weight: number, sets: number, reps: number, phase: DUPPhase, rationale: string } {
    
    // We rotate phases based on the USER'S global cycle.
    const target = this.PHASE_PARAMS[currentGlobalPhase];

    let workingWeight = 0;
    let rationale = "";

    if (!historyEntry) {
      // Cold Start: Safe baseline based on BW
      const intensityMult = target.intensity; 
      workingWeight = Math.round((userWeight * 0.4 * intensityMult) / 5) * 5;
      rationale = "Cold Start Baseline";
    } else {
      // Calculate previous performance
      const e1rm = this.calculateE1RM(historyEntry.weight, historyEntry.reps);
      
      // Project load for CURRENT phase intensity
      workingWeight = Math.round((e1rm * target.intensity) / 5) * 5;
      
      // Progressive Overload Micro-cycle: If we are repeating a phase, add load
      if (historyEntry.phase === currentGlobalPhase) {
          workingWeight += 5;
      }

      rationale = `DUP: ${currentGlobalPhase} (${Math.round(target.intensity * 100)}% e1RM)`;
    }

    // Floor weight to empty bar (45) or dumbbell min (5)
    if (workingWeight < 5) workingWeight = 5;

    return {
      weight: workingWeight,
      sets: target.sets,
      reps: target.reps,
      phase: currentGlobalPhase,
      rationale
    };
  }

  static generateWarmup(workingWeight: number, exercise: Exercise): WorkoutItem[] {
    // Only generate warmups for heavy lifts (> 45lbs)
    if (workingWeight < 45) return []; 
    
    const warmups: WorkoutItem[] = [];
    
    // Set 1: 50% load
    warmups.push({
        exercise: { ...exercise, name: `${exercise.name} (Warmup)` },
        load: `${Math.round(workingWeight * 0.5 / 5)*5} lbs`,
        reps: 10,
        sets: 1,
        rest: "60s",
        slot_type: "Warmup",
        rationale: "Potentiation Set 1"
    });

    // Set 2: 70% load
    warmups.push({
        exercise: { ...exercise, name: `${exercise.name} (Warmup)` },
        load: `${Math.round(workingWeight * 0.7 / 5)*5} lbs`,
        reps: 5,
        sets: 1,
        rest: "90s",
        slot_type: "Warmup",
        rationale: "Potentiation Set 2"
    });

    return warmups;
  }
}

// =============================================================================
// 3. INFRASTRUCTURE: SANITIZATION & NORMALIZATION
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

interface SplitDay {
  name: string;
  muscles: string[];
}

const SPLIT_DEFINITIONS: Record<TrainingSplit, SplitDay[]> = {
  'Full Body': [{ name: "FULL BODY ASSAULT", muscles: [] }],
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

// =============================================================================
// 4. MAIN ENGINE: NEXUS INTEGRATION
// =============================================================================

export class AlgorithmEngine {

  private sanitizeExercise(exercise: Exercise): Exercise {
    const newActivation: Record<string, number> = {};
    for (const [muscle, coeff] of Object.entries(exercise.biometrics.activationProfile)) {
      const cleanName = StandardizedMuscle.normalize(muscle);
      newActivation[cleanName] = coeff;
    }

    // Isolation Clamping logic
    if (exercise.biometrics.mechanics.toUpperCase() === "ISOLATION") {
        let primeMover = "";
        let maxVal = -1;
        for (const [m, c] of Object.entries(newActivation)) {
            if (c > maxVal) { maxVal = c; primeMover = m; }
        }
        // Dampen non-prime movers in isolation movements
        for (const m of Object.keys(newActivation)) {
            if (m !== primeMover && newActivation[m] > 0.2) newActivation[m] = 0.1;
        }
    }

    return {
        ...exercise,
        biometrics: { ...exercise.biometrics, activationProfile: newActivation }
    };
  }

  private filterBySplit(user: UserProfile, exercises: Exercise[]): Exercise[] {
    const splitSchedule = SPLIT_DEFINITIONS[user.preferred_split];
    const dayIndex = (user.split_index || 0) % splitSchedule.length;
    const currentDay = splitSchedule[dayIndex];

    if (currentDay.muscles.length === 0) return exercises;

    return exercises.filter(ex => {
      const sanitized = this.sanitizeExercise(ex);
      const primary = StandardizedMuscle.normalize(ex.displayMetadata.primaryMuscle);
      const musclesInvolved = Object.keys(sanitized.biometrics.activationProfile);
      
      return currentDay.muscles.some(target => 
        primary.includes(target) || 
        target.includes(primary) ||
        musclesInvolved.some(m => m.includes(target) && sanitized.biometrics.activationProfile[m] > 0.7)
      );
    });
  }

  private filterHardConstraints(user: UserProfile, exercises: Exercise[]): Exercise[] {
    return exercises.filter(rawEx => {
      const ex = this.sanitizeExercise(rawEx);
      
      // Equipment Check
      const exEquipment = ex.equipment.split(',').map(s => s.trim());
      const hasEquipment = exEquipment.some(req => 
        user.available_equipment.some(avail => avail.toLowerCase() === req.toLowerCase()) ||
        req.toLowerCase() === "bodyweight" || 
        (req.toLowerCase() === "cable" && user.available_equipment.includes("Cable")) ||
        (req.toLowerCase().includes("machine") && user.available_equipment.includes("Machine"))
      );
      if (!hasEquipment) return false;

      // Injury Check
      for (const [muscle, coeff] of Object.entries(ex.biometrics.activationProfile)) {
        if (user.injuries.includes(muscle) && coeff > 0.6) return false;
      }

      return true;
    });
  }

  // --- NEXUS INTEGRATION: BANISTER SCORING ---
  private calculateUtilityScore(user: UserProfile, exercise: Exercise): number {
    const ex = this.sanitizeExercise(exercise);
    let score = 0.0;
    let muscleScore = 0.0;
    let totalWeight = 0.0;
    
    const recoveryMap = user.recovery_state || {};

    for (const [muscle, coeff] of Object.entries(ex.biometrics.activationProfile)) {
      // NEXUS CALL: Get Banister Score (0.0 - 1.0)
      const state = recoveryMap[muscle];
      const recoveryIndex = BanisterModel.getRecoveryScore(state, Date.now());

      // CONSTRAINT: Red Zone check (<30% recovered)
      if (recoveryIndex < 0.3 && coeff > 0.5) {
          return -9999; // Hard Exclude due to fatigue risk
      }

      muscleScore += (recoveryIndex * coeff);
      totalWeight += coeff;
    }

    const avgFreshness = totalWeight > 0 ? muscleScore / totalWeight : 1.0;
    score += (avgFreshness * 100);

    // Systemic Fatigue Penalty
    const systemicPenalty = ex.biometrics.systemicFatigue * (user.current_systemic_fatigue || 0) * 50.0;
    score -= systemicPenalty;

    // User Bias
    const bias = user.exercise_bias[ex.id] || 1.0;
    score *= bias;

    return score;
  }

  // --- NEXUS INTEGRATION: DUP PRESCRIPTION ---
  private programExercise(exercise: Exercise, user: UserProfile, role: string): WorkoutItem {
    const history = user.exercise_history[exercise.id];
    const currentPhase = user.current_phase || 'Hypertrophy';
    const userWeight = user.stats.weight || 170;

    // NEXUS CALL: Get DUP Prescription
    const prescription = ProgressionEngine.getNextPrescription(history, currentPhase, userWeight);

    // Override for Bodyweight logic
    let loadStr = `${prescription.weight} lbs`;
    if (exercise.equipment.toLowerCase().includes("bodyweight") && prescription.weight < 20) {
        loadStr = "Bodyweight";
    }

    return {
        exercise,
        sets: prescription.sets,
        reps: prescription.reps, 
        load: loadStr,
        rest: prescription.phase === 'Strength' ? "3-5 min" : "60-90s",
        slot_type: role,
        rationale: prescription.rationale
    };
  }

  public getCurrentPhaseName(user: UserProfile): string {
    const splitSchedule = SPLIT_DEFINITIONS[user.preferred_split];
    const splitName = splitSchedule[(user.split_index || 0) % splitSchedule.length].name;
    return `${splitName} [${user.current_phase || 'Hypertrophy'}]`;
  }

  public generateWorkout(user: UserProfile, allExercises: Exercise[]): WorkoutItem[] {
    // 1. Constraints
    let candidates = this.filterHardConstraints(user, allExercises);
    candidates = this.filterBySplit(user, candidates);

    // 2. Scoring (Banister Integrated)
    const scoredExercises = candidates.map(ex => ({
      exercise: ex,
      score: this.calculateUtilityScore(user, ex)
    })).sort((a, b) => b.score - a.score);

    const workoutPlan: WorkoutItem[] = [];
    const usedIds = new Set<string>();

    // 3. Slotting Config
    const duration = user.target_duration || 60;
    const totalSlots = Math.floor(duration / 10);
    
    let mainCount = 1;
    let secondaryCount = duration >= 45 ? 1 : 0;
    let accessoryCount = Math.max(1, totalSlots - mainCount - secondaryCount);

    // Helper to fill slots
    const fillSlot = (role: string, needsCompound: boolean, limit: number) => {
      let filled = 0;
      for (const item of scoredExercises) {
        if (filled >= limit) break;
        if (usedIds.has(item.exercise.id)) continue;
        
        const isCompound = item.exercise.biometrics.mechanics === "Compound";
        if (needsCompound && !isCompound) continue;
        if (!needsCompound && isCompound) continue; 

        const programmedItem = this.programExercise(item.exercise, user, role);
        
        // NEXUS CALL: Inject Warmups for the Main Strength lift
        if (role === "Main Strength" && filled === 0) {
            const weight = parseFloat(programmedItem.load) || 0;
            const warmups = ProgressionEngine.generateWarmup(weight, item.exercise);
            workoutPlan.push(...warmups);
        }

        workoutPlan.push(programmedItem);
        usedIds.add(item.exercise.id);
        filled++;
      }
    };

    // Fallback logic
    if (scoredExercises.length < 3) {
       for (const item of scoredExercises) {
         if (workoutPlan.length >= totalSlots) break;
         if (!usedIds.has(item.exercise.id)) {
            workoutPlan.push(this.programExercise(item.exercise, user, "General Strength"));
            usedIds.add(item.exercise.id);
         }
       }
    } else {
        fillSlot("Main Strength", true, mainCount);
        fillSlot("Secondary Compound", true, secondaryCount);
        fillSlot("Hypertrophy Accessory", false, accessoryCount);
    }

    return workoutPlan;
  }

  public applyWorkoutEffects(user: UserProfile, workout: WorkoutItem[]): UserProfile {
    const newUser = JSON.parse(JSON.stringify(user)) as UserProfile;
    
    // Ensure structures exist
    if (!newUser.recovery_state) newUser.recovery_state = {};
    if (!newUser.exercise_history) newUser.exercise_history = {};

    const eventDate = Date.now();

    workout.forEach(item => {
        if (item.slot_type === "Warmup") return; 

        const ex = this.sanitizeExercise(item.exercise);
        const weightMatch = item.load.match(/(\d+(\.\d+)?)/);
        const weight = weightMatch ? parseFloat(weightMatch[0]) : 0;
        
        // 1. Update History with DUP Data
        newUser.exercise_history[ex.id] = {
            weight: weight,
            date: eventDate,
            reps: typeof item.reps === 'number' ? item.reps : (parseInt(item.reps as string) || 5),
            sets: item.sets,
            phase: user.current_phase || 'Hypertrophy',
            e1rm: ProgressionEngine.calculateE1RM(weight, typeof item.reps === 'number' ? item.reps : 8)
        };

        // 2. Calculate Impulse for Banister
        // Impulse = (Sets * Reps * WeightScale) * SystemicFatigue
        // Note: We use Volume Load Proxy scaled by fatigue coeff.
        const volumeLoad = item.sets * (typeof item.reps === 'number' ? item.reps : 8);
        const impulseMagnitude = volumeLoad * (ex.biometrics.systemicFatigue || 0.5); 

        // 3. Update Recovery State (Banister)
        Object.entries(ex.biometrics.activationProfile).forEach(([muscle, coeff]) => {
            const muscleImpulse = impulseMagnitude * coeff * 2.0; 
            newUser.recovery_state[muscle] = BanisterModel.updateState(
                newUser.recovery_state[muscle], 
                muscleImpulse, 
                eventDate
            );
        });

        // 4. Systemic Fatigue (Short term buffer)
        newUser.current_systemic_fatigue = Math.min(5, (newUser.current_systemic_fatigue || 0) + (impulseMagnitude * 0.01));
    });

    // Rotate DUP Phase after successful workout
    const phases: DUPPhase[] = ['Hypertrophy', 'Strength', 'Endurance'];
    const nextIndex = (phases.indexOf(newUser.current_phase || 'Hypertrophy') + 1) % 3;
    newUser.current_phase = phases[nextIndex];

    return newUser;
  }

  public recover(user: UserProfile, hours: number): UserProfile {
    // In Nexus/Banister, recovery is calculated at query time (getRecoveryScore).
    // This method primarily advances specific linear counters like Systemic Fatigue.
    const newUser = JSON.parse(JSON.stringify(user)) as UserProfile;
    
    // Linear decay for systemic fatigue buffer
    newUser.current_systemic_fatigue = Math.max(0, (newUser.current_systemic_fatigue || 0) - (hours * 0.08));

    return newUser;
  }
}
