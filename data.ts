
import { Exercise } from './types';

export const EXERCISE_DATABASE: Exercise[] = [
  {
    "id": "deadlift",
    "name": "Barbell Deadlift",
    "equipment": "Barbell, Weight plates",
    "constraints": {
      "stationType": "Rack",
      "movementPattern": "Hinge",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 1,
      "loadCoefficient": 1.0,
      "baseGroup": "Hinge_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Glutes",
      "secondaryMuscles": ["Core Muscles", "Adductors", "Forearm Flexors", "Rhomboids", "Shoulders"]
    },
    "biometrics": {
      "systemicFatigue": 1.5,
      "mechanics": "Compound",
      "activationProfile": { "Glutes": 1.2, "Hamstrings": 1.0, "Erector Spinae": 1.0, "Adductors": 0.6, "Forearm Flexors": 0.8, "Rhomboids": 0.5, "Trapezius": 0.5, "Core Muscles": 0.4 }
    }
  },
  {
    "id": "pull_up",
    "name": "Pull-up",
    "equipment": "Pull-up Bar",
    "constraints": {
      "stationType": "Rack",
      "movementPattern": "Pull_Vertical",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 1,
      "loadCoefficient": 1.0,
      "baseGroup": "Pull_Vertical_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Latissimus Dorsi",
      "secondaryMuscles": ["Trapezius", "Rhomboids", "Biceps"]
    },
    "biometrics": {
      "systemicFatigue": 0.8,
      "mechanics": "Compound",
      "activationProfile": { "Latissimus Dorsi": 1.2, "Teres Major": 1.0, "Biceps": 0.7, "Rhomboids": 0.6, "Trapezius": 0.5, "Posterior Deltoid": 0.5 }
    }
  },
  {
    "id": "barbell_row",
    "name": "Barbell Row",
    "equipment": "Barbell",
    "constraints": {
      "stationType": "Rack",
      "movementPattern": "Pull_Horizontal",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 1,
      "loadCoefficient": 1.0,
      "baseGroup": "Pull_Horizontal_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Latissimus Dorsi",
      "secondaryMuscles": ["Biceps", "Erector Spinae", "Rhomboids"]
    },
    "biometrics": {
      "systemicFatigue": 1.1,
      "mechanics": "Compound",
      "activationProfile": { "Latissimus Dorsi": 1.0, "Rhomboids": 1.0, "Trapezius": 0.9, "Posterior Deltoid": 0.8, "Biceps": 0.6, "Erector Spinae": 0.5 }
    }
  },
  {
    "id": "barbell_curls",
    "name": "Barbell Curls",
    "equipment": "Barbell",
    "constraints": {
      "stationType": "Open_Floor",
      "movementPattern": "Isolation",
      "mechanics": "Isolation"
    },
    "substitution": {
      "tier": 1,
      "loadCoefficient": 1.0,
      "baseGroup": "Bicep_Isolation"
    },
    "displayMetadata": {
      "primaryMuscle": "Biceps Brachii",
      "secondaryMuscles": ["Forearm Flexors"]
    },
    "biometrics": {
      "systemicFatigue": 0.3,
      "mechanics": "Isolation",
      "activationProfile": { "Biceps Brachii": 1.0, "Forearm Flexors": 0.5, "Deltoids": 0.2 }
    }
  },
  {
    "id": "dumbbell_bicep_curl",
    "name": "Dumbbell Bicep Curl",
    "equipment": "Dumbbell",
    "constraints": {
      "stationType": "Open_Floor",
      "movementPattern": "Isolation",
      "mechanics": "Isolation"
    },
    "substitution": {
      "tier": 3,
      "loadCoefficient": 0.4,
      "baseGroup": "Bicep_Isolation"
    },
    "displayMetadata": {
      "primaryMuscle": "Biceps Brachii",
      "secondaryMuscles": ["Brachioradialis"]
    },
    "biometrics": {
      "systemicFatigue": 0.2,
      "mechanics": "Isolation",
      "activationProfile": { "Biceps Brachii": 1.0, "Brachialis": 0.8, "Brachioradialis": 0.6 }
    }
  },
  {
    "id": "hammer_curls",
    "name": "Hammer Curls",
    "equipment": "Dumbbell",
    "constraints": {
      "stationType": "Open_Floor",
      "movementPattern": "Isolation",
      "mechanics": "Isolation"
    },
    "substitution": {
      "tier": 3,
      "loadCoefficient": 0.4,
      "baseGroup": "Bicep_Isolation"
    },
    "displayMetadata": {
      "primaryMuscle": "Brachialis",
      "secondaryMuscles": ["Forearms"]
    },
    "biometrics": {
      "systemicFatigue": 0.2,
      "mechanics": "Isolation",
      "activationProfile": { "Brachialis": 1.0, "Brachioradialis": 0.9, "Biceps Brachii": 0.7, "Forearms": 0.6 }
    }
  },
  {
    "id": "barbell_back_squat",
    "name": "Barbell Back Squat",
    "equipment": "Barbell, Squat Rack",
    "constraints": {
      "stationType": "Rack",
      "movementPattern": "Squat",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 1,
      "loadCoefficient": 1.0,
      "baseGroup": "Squat_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Quadriceps",
      "secondaryMuscles": ["Erector Spinae", "Adductors", "Glutes"]
    },
    "biometrics": {
      "systemicFatigue": 1.5,
      "mechanics": "Compound",
      "activationProfile": { "Quadriceps": 1.2, "Glutes": 1.0, "Adductors": 0.7, "Erector Spinae": 0.8, "Core": 0.6 }
    }
  },
  {
    "id": "leg_press",
    "name": "Leg Press",
    "equipment": "Machine",
    "constraints": {
      "stationType": "Machine",
      "movementPattern": "Squat",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 2,
      "loadCoefficient": 2.5,
      "baseGroup": "Squat_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Quadriceps",
      "secondaryMuscles": ["Calves", "Adductors"]
    },
    "biometrics": {
      "systemicFatigue": 1.0,
      "mechanics": "Compound",
      "activationProfile": { "Quadriceps": 1.2, "Glutes": 0.8, "Hamstrings": 0.6, "Adductors": 0.5 }
    }
  },
  {
    "id": "dumbbell_lunges",
    "name": "Dumbbell Lunges",
    "equipment": "Dumbbell",
    "constraints": {
      "stationType": "Open_Floor",
      "movementPattern": "Lunge",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 3,
      "loadCoefficient": 0.4,
      "baseGroup": "Lunge_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Quadriceps",
      "secondaryMuscles": ["Calves", "Core", "Glutes"]
    },
    "biometrics": {
      "systemicFatigue": 0.9,
      "mechanics": "Compound",
      "activationProfile": { "Quadriceps": 1.1, "Glutes": 1.0, "Adductors": 0.7, "Core": 0.5 }
    }
  },
  {
    "id": "romanian_deadlift",
    "name": "Romanian Deadlift",
    "equipment": "Barbell",
    "constraints": {
      "stationType": "Rack",
      "movementPattern": "Hinge",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 1,
      "loadCoefficient": 0.8,
      "baseGroup": "Hinge_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Hamstrings",
      "secondaryMuscles": ["Adductors", "Trapezius", "Core"]
    },
    "biometrics": {
      "systemicFatigue": 1.2,
      "mechanics": "Compound",
      "activationProfile": { "Hamstrings": 1.2, "Glutes": 1.1, "Erector Spinae": 0.9, "Forearms": 0.6 }
    }
  },
  {
    "id": "lying_leg_curl",
    "name": "Lying Leg Curl",
    "equipment": "Machine",
    "constraints": {
      "stationType": "Machine",
      "movementPattern": "Isolation",
      "mechanics": "Isolation"
    },
    "substitution": {
      "tier": 2,
      "loadCoefficient": 0.4,
      "baseGroup": "Leg_Isolation"
    },
    "displayMetadata": {
      "primaryMuscle": "Hamstrings",
      "secondaryMuscles": ["Calves"]
    },
    "biometrics": {
      "systemicFatigue": 0.3,
      "mechanics": "Isolation",
      "activationProfile": { "Hamstrings": 1.0, "Calves": 0.4 }
    }
  },
  {
    "id": "crunches",
    "name": "Crunches",
    "equipment": "Bodyweight",
    "constraints": {
      "stationType": "Open_Floor",
      "movementPattern": "Core",
      "mechanics": "Isolation"
    },
    "substitution": {
      "tier": 3,
      "loadCoefficient": 0.0,
      "baseGroup": "Core_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Rectus Abdominis",
      "secondaryMuscles": ["Obliques"]
    },
    "biometrics": {
      "systemicFatigue": 0.2,
      "mechanics": "Isolation",
      "activationProfile": { "Rectus Abdominis": 1.0, "Obliques": 0.4 }
    }
  },
  {
    "id": "dumbbell_shoulder_press",
    "name": "Dumbbell Shoulder Press",
    "equipment": "Dumbbell, Bench",
    "constraints": {
      "stationType": "Dumbbell_Bench",
      "movementPattern": "Push_Vertical",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 3,
      "loadCoefficient": 0.7,
      "baseGroup": "Push_Vertical_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Anterior Deltoid",
      "secondaryMuscles": ["Rotator Cuff", "Trapezius"]
    },
    "biometrics": {
      "systemicFatigue": 0.9,
      "mechanics": "Compound",
      "activationProfile": { "Anterior Deltoid": 1.0, "Lateral Deltoid": 0.8, "Triceps Brachii": 0.7 }
    }
  },
  {
    "id": "lateral_raises",
    "name": "Lateral Raises",
    "equipment": "Dumbbell",
    "constraints": {
      "stationType": "Open_Floor",
      "movementPattern": "Isolation",
      "mechanics": "Isolation"
    },
    "substitution": {
      "tier": 3,
      "loadCoefficient": 0.2,
      "baseGroup": "Shoulder_Isolation"
    },
    "displayMetadata": {
      "primaryMuscle": "Lateral Deltoid",
      "secondaryMuscles": ["Upper Trapezius"]
    },
    "biometrics": {
      "systemicFatigue": 0.2,
      "mechanics": "Isolation",
      "activationProfile": { "Lateral Deltoid": 1.0, "Supraspinatus": 0.6, "Upper Trapezius": 0.3 }
    }
  },
  {
    "id": "face_pulls",
    "name": "Face Pulls",
    "equipment": "Cable",
    "constraints": {
      "stationType": "Machine",
      "movementPattern": "Pull_Horizontal",
      "mechanics": "Isolation"
    },
    "substitution": {
      "tier": 2,
      "loadCoefficient": 0.4,
      "baseGroup": "Shoulder_Isolation"
    },
    "displayMetadata": {
      "primaryMuscle": "Posterior Deltoids",
      "secondaryMuscles": ["Lateral Deltoids", "Biceps"]
    },
    "biometrics": {
      "systemicFatigue": 0.4,
      "mechanics": "Isolation",
      "activationProfile": { "Posterior Deltoids": 1.0, "Rhomboids": 0.9, "Rotator Cuff": 0.8, "Trapezius": 0.7 }
    }
  },
  {
    "id": "lat_pulldown",
    "name": "Lat Pulldown",
    "equipment": "Machine",
    "constraints": {
      "stationType": "Machine",
      "movementPattern": "Pull_Vertical",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 2,
      "loadCoefficient": 1.0,
      "baseGroup": "Pull_Vertical_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Latissimus Dorsi",
      "secondaryMuscles": ["Biceps Brachii", "Rhomboids"]
    },
    "biometrics": {
      "systemicFatigue": 0.7,
      "mechanics": "Compound",
      "activationProfile": { "Latissimus Dorsi": 1.0, "Teres Major": 0.8, "Biceps Brachii": 0.6 }
    }
  },
  {
    "id": "seated_cable_row",
    "name": "Seated Cable Row",
    "equipment": "Cable",
    "constraints": {
      "stationType": "Machine",
      "movementPattern": "Pull_Horizontal",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 2,
      "loadCoefficient": 1.0,
      "baseGroup": "Pull_Horizontal_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Latissimus Dorsi",
      "secondaryMuscles": ["Biceps", "Forearms"]
    },
    "biometrics": {
      "systemicFatigue": 0.8,
      "mechanics": "Compound",
      "activationProfile": { "Latissimus Dorsi": 1.0, "Rhomboids": 0.9, "Trapezius": 0.8, "Biceps": 0.6 }
    }
  },
  {
    "id": "single_arm_dumbbell_row",
    "name": "Single-Arm Dumbbell Row",
    "equipment": "Dumbbell, Bench",
    "constraints": {
      "stationType": "Dumbbell_Bench",
      "movementPattern": "Pull_Horizontal",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 3,
      "loadCoefficient": 0.5,
      "baseGroup": "Pull_Horizontal_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Latissimus Dorsi",
      "secondaryMuscles": ["Biceps Brachii", "Core"]
    },
    "biometrics": {
      "systemicFatigue": 0.7,
      "mechanics": "Compound",
      "activationProfile": { "Latissimus Dorsi": 1.0, "Rhomboids": 0.7, "Biceps Brachii": 0.6, "Core": 0.3 }
    }
  },
  {
    "id": "barbell_bench_press",
    "name": "Barbell Bench Press",
    "equipment": "Barbell, Bench",
    "constraints": {
      "stationType": "Rack",
      "movementPattern": "Push_Horizontal",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 1,
      "loadCoefficient": 1.0,
      "baseGroup": "Push_Horizontal_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Pectoralis Major",
      "secondaryMuscles": ["Lateral Deltoids", "Posterior Deltoids"]
    },
    "biometrics": {
      "systemicFatigue": 1.0,
      "mechanics": "Compound",
      "activationProfile": { "Pectoralis Major": 1.0, "Anterior Deltoid": 0.8, "Triceps Brachii": 0.7 }
    }
  },
  {
    "id": "dumbbell_bench_press",
    "name": "Dumbbell Bench Press",
    "equipment": "Dumbbell, Bench",
    "constraints": {
      "stationType": "Dumbbell_Bench",
      "movementPattern": "Push_Horizontal",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 3,
      "loadCoefficient": 0.8,
      "baseGroup": "Push_Horizontal_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Pectoralis Major",
      "secondaryMuscles": ["Pectoralis Minor", "Rotator Cuff"]
    },
    "biometrics": {
      "systemicFatigue": 0.9,
      "mechanics": "Compound",
      "activationProfile": { "Pectoralis Major": 1.0, "Anterior Deltoid": 0.7, "Triceps Brachii": 0.6 }
    }
  },
  {
    "id": "incline_dumbbell_press",
    "name": "Incline Dumbbell Press",
    "equipment": "Dumbbell, Bench",
    "constraints": {
      "stationType": "Dumbbell_Bench",
      "movementPattern": "Push_Horizontal",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 3,
      "loadCoefficient": 0.7,
      "baseGroup": "Push_Horizontal_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Pectoralis Major",
      "secondaryMuscles": ["Triceps Brachii", "Core"]
    },
    "biometrics": {
      "systemicFatigue": 0.9,
      "mechanics": "Compound",
      "activationProfile": { "Pectoralis Major": 1.0, "Anterior Deltoid": 0.9, "Triceps Brachii": 0.6 }
    }
  },
  {
    "id": "triceps_pushdown",
    "name": "Triceps Pushdown",
    "equipment": "Cable",
    "constraints": {
      "stationType": "Machine",
      "movementPattern": "Isolation",
      "mechanics": "Isolation"
    },
    "substitution": {
      "tier": 2,
      "loadCoefficient": 0.4,
      "baseGroup": "Tricep_Isolation"
    },
    "displayMetadata": {
      "primaryMuscle": "Triceps Brachii",
      "secondaryMuscles": ["Forearms"]
    },
    "biometrics": {
      "systemicFatigue": 0.2,
      "mechanics": "Isolation",
      "activationProfile": { "Triceps Brachii": 1.0, "Forearms": 0.3 }
    }
  },
  {
    "id": "overhead_dumbbell_extension",
    "name": "Overhead Dumbbell Extension",
    "equipment": "Dumbbell",
    "constraints": {
      "stationType": "Dumbbell_Bench",
      "movementPattern": "Isolation",
      "mechanics": "Isolation"
    },
    "substitution": {
      "tier": 3,
      "loadCoefficient": 0.3,
      "baseGroup": "Tricep_Isolation"
    },
    "displayMetadata": {
      "primaryMuscle": "Triceps Brachii",
      "secondaryMuscles": ["Deltoids", "Core"]
    },
    "biometrics": {
      "systemicFatigue": 0.3,
      "mechanics": "Isolation",
      "activationProfile": { "Triceps Brachii": 1.0, "Core": 0.2 }
    }
  },
  {
    "id": "goblet_squat",
    "name": "Goblet Squat",
    "equipment": "Dumbbell, Kettlebell",
    "constraints": {
      "stationType": "Open_Floor",
      "movementPattern": "Squat",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 3,
      "loadCoefficient": 0.4,
      "baseGroup": "Squat_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Quadriceps",
      "secondaryMuscles": ["Hamstrings", "Core Muscles"]
    },
    "biometrics": {
      "systemicFatigue": 0.8,
      "mechanics": "Compound",
      "activationProfile": { "Quadriceps": 1.1, "Glutes": 0.9, "Core": 0.7 }
    }
  },
  {
    "id": "kettlebell_swings",
    "name": "Kettlebell Swings",
    "equipment": "Kettlebell",
    "constraints": {
      "stationType": "Open_Floor",
      "movementPattern": "Hinge",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 3,
      "loadCoefficient": 0.6,
      "baseGroup": "Hinge_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Glutes",
      "secondaryMuscles": ["Abdominals", "Lats"]
    },
    "biometrics": {
      "systemicFatigue": 0.9,
      "mechanics": "Compound",
      "activationProfile": { "Glutes": 1.2, "Hamstrings": 1.0, "Core": 0.6, "Forearms": 0.4 }
    }
  },
  {
    "id": "farmer_s_carry",
    "name": "Farmer's Carry",
    "equipment": "Dumbbell, Kettlebell",
    "constraints": {
      "stationType": "Open_Floor",
      "movementPattern": "Carry",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 1,
      "loadCoefficient": 1.0,
      "baseGroup": "Carry_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Forearms",
      "secondaryMuscles": ["Shoulders", "Back", "Glutes"]
    },
    "biometrics": {
      "systemicFatigue": 0.9,
      "mechanics": "Compound",
      "activationProfile": { "Forearms": 1.2, "Trapezius": 0.8, "Core": 0.8, "Glutes": 0.5 }
    }
  },
  {
    "id": "band_pull_aparts",
    "name": "Band Pull-Aparts",
    "equipment": "Resistance Band",
    "constraints": {
      "stationType": "Open_Floor",
      "movementPattern": "Isolation",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 3,
      "loadCoefficient": 0.1,
      "baseGroup": "Shoulder_Isolation"
    },
    "displayMetadata": {
      "primaryMuscle": "Rhomboids",
      "secondaryMuscles": ["Rotator Cuff", "Lower Trapezius"]
    },
    "biometrics": {
      "systemicFatigue": 0.2,
      "mechanics": "Compound",
      "activationProfile": { "Rhomboids": 1.0, "Posterior Deltoids": 0.9, "Trapezius": 0.6, "Rotator Cuff": 0.5 }
    }
  },
  {
    "id": "plank",
    "name": "Plank",
    "equipment": "Bodyweight",
    "constraints": {
      "stationType": "Open_Floor",
      "movementPattern": "Core",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 3,
      "loadCoefficient": 0.0,
      "baseGroup": "Core_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Rectus Abdominis",
      "secondaryMuscles": ["Deltoids"]
    },
    "biometrics": {
      "systemicFatigue": 0.4,
      "mechanics": "Compound",
      "activationProfile": { "Rectus Abdominis": 1.0, "Transverse Abdominis": 0.9, "Shoulders": 0.3 }
    }
  },
  {
    "id": "push_up",
    "name": "Push-up",
    "equipment": "Bodyweight",
    "constraints": {
      "stationType": "Open_Floor",
      "movementPattern": "Push_Horizontal",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 3,
      "loadCoefficient": 0.6,
      "baseGroup": "Push_Horizontal_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Pectoralis Major",
      "secondaryMuscles": ["Serratus Anterior", "Abdominals"]
    },
    "biometrics": {
      "systemicFatigue": 0.5,
      "mechanics": "Compound",
      "activationProfile": { "Pectoralis Major": 1.0, "Anterior Deltoid": 0.8, "Triceps Brachii": 0.7 }
    }
  },
  {
    "id": "bodyweight_squat",
    "name": "Bodyweight Squat",
    "equipment": "Bodyweight",
    "constraints": {
      "stationType": "Open_Floor",
      "movementPattern": "Squat",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 3,
      "loadCoefficient": 0.4,
      "baseGroup": "Squat_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Quadriceps",
      "secondaryMuscles": ["Calves", "Adductors"]
    },
    "biometrics": {
      "systemicFatigue": 0.5,
      "mechanics": "Compound",
      "activationProfile": { "Quadriceps": 1.0, "Glutes": 0.8, "Adductors": 0.5 }
    }
  },
  {
    "id": "medicine_ball_slams",
    "name": "Medicine Ball Slams",
    "equipment": "Medicine Ball",
    "constraints": {
      "stationType": "Open_Floor",
      "movementPattern": "Core",
      "mechanics": "Compound"
    },
    "substitution": {
      "tier": 3,
      "loadCoefficient": 0.3,
      "baseGroup": "Core_Pattern"
    },
    "displayMetadata": {
      "primaryMuscle": "Core",
      "secondaryMuscles": ["Triceps", "Lats"]
    },
    "biometrics": {
      "systemicFatigue": 0.8,
      "mechanics": "Compound",
      "activationProfile": { "Core": 1.2, "Latissimus Dorsi": 0.8, "Triceps": 0.6 }
    }
  },
  {
    "id": "leg_extension",
    "name": "Leg Extension",
    "equipment": "Machine",
    "constraints": {
      "stationType": "Machine",
      "movementPattern": "Isolation",
      "mechanics": "Isolation"
    },
    "substitution": {
      "tier": 2,
      "loadCoefficient": 0.6,
      "baseGroup": "Leg_Isolation"
    },
    "displayMetadata": {
      "primaryMuscle": "Quadriceps Femoris",
      "secondaryMuscles": ["Hip Flexors"]
    },
    "biometrics": {
      "systemicFatigue": 0.3,
      "mechanics": "Isolation",
      "activationProfile": { "Quadriceps": 1.2, "Core": 0.2 }
    }
  },
  {
    "id": "resistance_band_bicep_curls",
    "name": "Resistance Band Bicep Curls",
    "equipment": "Resistance Band",
    "constraints": {
      "stationType": "Open_Floor",
      "movementPattern": "Isolation",
      "mechanics": "Isolation"
    },
    "substitution": {
      "tier": 3,
      "loadCoefficient": 0.2,
      "baseGroup": "Bicep_Isolation"
    },
    "displayMetadata": {
      "primaryMuscle": "Biceps Brachii",
      "secondaryMuscles": ["Brachialis", "Brachioradialis"]
    },
    "biometrics": {
      "systemicFatigue": 0.1,
      "mechanics": "Isolation",
      "activationProfile": { "Biceps Brachii": 1.0, "Forearms": 0.4 }
    }
  }
];

export const ALL_MUSCLES = Array.from(new Set(EXERCISE_DATABASE.flatMap(ex => Object.keys(ex.biometrics.activationProfile))));
