import { Exercise } from './types';

// Ingesting the full calibrated_knowledge_base.json provided
export const EXERCISE_DATABASE: Exercise[] = [
  {
    "id": "deadlift",
    "name": "Deadlift",
    "type": "Compound",
    "description": "The deadlift is a compound exercise involving lifting a barbell or other weight from the floor to a standing position.",
    "equipment": "Barbell, Weight plates, Chalk, Lifting shoes",
    "displayMetadata": {
      "primaryMuscle": "Glutes",
      "secondaryMuscles": ["Core Muscles", "Adductors", "Forearm Flexors", "Rhomboids", "Shoulders", "Biceps"]
    },
    "biometrics": {
      "systemicFatigue": 1.5,
      "mechanics": "Compound",
      "activationProfile": {
        "Glutes": 1.2,
        "Hamstrings": 1.0,
        "Erector Spinae": 1.0,
        "Adductors": 0.6,
        "Forearm Flexors": 0.8,
        "Rhomboids": 0.5,
        "Trapezius": 0.5,
        "Core Muscles": 0.4
      }
    }
  },
  {
    "id": "pull_up",
    "name": "Pull-up",
    "type": "Compound",
    "description": "The pull-up is a closed-chain, compound upper-body exercise biomechanically characterized by concurrent elbow flexion and shoulder adduction/extension...",
    "equipment": "Pull-up Bar",
    "displayMetadata": {
      "primaryMuscle": "Latissimus Dorsi",
      "secondaryMuscles": ["Trapezius", "Rhomboids", "Teres Major", "Infraspinatus", "Brachialis", "Posterior Deltoid", "Serratus Anterior", "Forearms", "Pectoralis Major", "Subscapularis", "Triceps Brachii", "Core"]
    },
    "biometrics": {
      "systemicFatigue": 0.8,
      "mechanics": "Compound",
      "activationProfile": {
        "Latissimus Dorsi": 1.2,
        "Teres Major": 1.0,
        "Biceps": 0.7,
        "Brachialis": 0.7,
        "Rhomboids": 0.6,
        "Trapezius": 0.5,
        "Posterior Deltoid": 0.5,
        "Core": 0.2,
        "Triceps Brachii": 0.2,
        "Pectoralis Major": 0.2
      }
    }
  },
  {
    "id": "barbell_row",
    "name": "Barbell Row",
    "type": "Compound",
    "description": "The Barbell Row is a compound pulling exercise...",
    "equipment": "Barbell",
    "displayMetadata": {
      "primaryMuscle": "Latissimus Dorsi",
      "secondaryMuscles": ["Biceps", "Erector Spinae", "Forearms", "Hamstrings", "Glutes", "Teres Minor", "Brachialis", "Brachioradialis", "Rotator Cuff"]
    },
    "biometrics": {
      "systemicFatigue": 1.1,
      "mechanics": "Compound",
      "activationProfile": {
        "Latissimus Dorsi": 1.0,
        "Rhomboids": 1.0,
        "Trapezius": 0.9,
        "Posterior Deltoid": 0.8,
        "Biceps": 0.6,
        "Erector Spinae": 0.5,
        "Core": 0.2
      }
    }
  },
  {
    "id": "barbell_curls",
    "name": "Barbell Curls",
    "type": "Isolation",
    "description": "The Barbell Curl is an isolation exercise primarily targeting the elbow flexors...",
    "equipment": "Barbell",
    "displayMetadata": {
      "primaryMuscle": "Biceps Brachii (Long Head)",
      "secondaryMuscles": ["Forearm Flexors", "Deltoids (Stabilizer)", "Core (Stabilizer)"]
    },
    "biometrics": {
      "systemicFatigue": 0.3,
      "mechanics": "Isolation",
      "activationProfile": {
        "Biceps Brachii": 1.0,
        "Forearm Flexors": 0.5,
        "Deltoids": 0.2,
        "Core": 0.2
      }
    }
  },
  {
    "id": "dumbbell_bicep_curl",
    "name": "Dumbbell Bicep Curl",
    "type": "Isolation",
    "description": "The Dumbbell Bicep Curl is an isolation exercise primarily targeting the elbow flexors...",
    "equipment": "Dumbbell",
    "displayMetadata": {
      "primaryMuscle": "Biceps Brachii",
      "secondaryMuscles": ["Brachioradialis", "Forearm Flexors", "Anterior Deltoid"]
    },
    "biometrics": {
      "systemicFatigue": 0.2,
      "mechanics": "Isolation",
      "activationProfile": {
        "Biceps Brachii": 1.0,
        "Brachialis": 0.8,
        "Brachioradialis": 0.6,
        "Forearm Flexors": 0.4,
        "Anterior Deltoid": 0.2
      }
    }
  },
  {
    "id": "barbell_back_squat",
    "name": "Barbell Back Squat",
    "type": "Compound",
    "description": "The Barbell Back Squat is a compound, functional exercise...",
    "equipment": "Barbell, Squat Rack, Weight Plates",
    "displayMetadata": {
      "primaryMuscle": "Quadriceps",
      "secondaryMuscles": ["Erector Spinae", "Adductors", "Calves", "Core", "Upper Back", "Shoulders"]
    },
    "biometrics": {
      "systemicFatigue": 1.5,
      "mechanics": "Compound",
      "activationProfile": {
        "Quadriceps": 1.2,
        "Glutes": 1.0,
        "Adductors": 0.7,
        "Erector Spinae": 0.8,
        "Core": 0.6,
        "Calves": 0.4
      }
    }
  },
  {
    "id": "leg_press",
    "name": "Leg Press",
    "type": "Compound",
    "description": "The leg press is a multi-joint, closed kinetic chain resistance exercise...",
    "equipment": "Leg Press Machine",
    "displayMetadata": {
      "primaryMuscle": "Quadriceps",
      "secondaryMuscles": ["Calves", "Adductors"]
    },
    "biometrics": {
      "systemicFatigue": 1.0,
      "mechanics": "Compound",
      "activationProfile": {
        "Quadriceps": 1.2,
        "Glutes": 0.8,
        "Hamstrings": 0.6,
        "Calves": 0.5,
        "Adductors": 0.5
      }
    }
  },
  {
    "id": "romanian_deadlift",
    "name": "Romanian Deadlift",
    "type": "Compound",
    "description": "The Romanian Deadlift (RDL) is a compound, hip-hinge movement...",
    "equipment": "Barbell, Dumbbell, Kettlebell, Smith Machine",
    "displayMetadata": {
      "primaryMuscle": "Hamstrings",
      "secondaryMuscles": ["Adductors", "Trapezius", "Core", "Latissimus Dorsi", "Forearms", "Calves"]
    },
    "biometrics": {
      "systemicFatigue": 1.2,
      "mechanics": "Compound",
      "activationProfile": {
        "Hamstrings": 1.2,
        "Glutes": 1.1,
        "Erector Spinae": 0.9,
        "Forearms": 0.6,
        "Core": 0.5,
        "Trapezius": 0.4
      }
    }
  },
  {
    "id": "lying_leg_curl",
    "name": "Lying Leg Curl",
    "type": "Isolation",
    "description": "The Lying Leg Curl is an isolation exercise that primarily targets the hamstrings...",
    "equipment": "Leg curl machine",
    "displayMetadata": {
      "primaryMuscle": "Hamstrings",
      "secondaryMuscles": ["Gastrocnemius", "Soleus", "Gluteus Maximus"]
    },
    "biometrics": {
      "systemicFatigue": 0.3,
      "mechanics": "Isolation",
      "activationProfile": {
        "Hamstrings": 1.0,
        "Calves": 0.4,
        "Gluteus Maximus": 0.2
      }
    }
  },
  {
    "id": "crunches",
    "name": "Crunches",
    "type": "Isolation",
    "description": "Crunches are a bodyweight exercise primarily targeting the rectus abdominis...",
    "equipment": "Bodyweight",
    "displayMetadata": {
      "primaryMuscle": "Rectus Abdominis",
      "secondaryMuscles": ["Obliques", "Transverse Abdominis", "Sternocleidomastoid"]
    },
    "biometrics": {
      "systemicFatigue": 0.2,
      "mechanics": "Isolation",
      "activationProfile": {
        "Rectus Abdominis": 1.0,
        "Obliques": 0.4,
        "Transverse Abdominis": 0.3
      }
    }
  },
  {
    "id": "dumbbell_shoulder_press",
    "name": "Dumbbell Shoulder Press",
    "type": "Compound",
    "description": "The Dumbbell Shoulder Press is a compound exercise involving the vertical pressing...",
    "equipment": "Dumbbell",
    "displayMetadata": {
      "primaryMuscle": "Anterior Deltoid",
      "secondaryMuscles": ["Rotator Cuff", "Trapezius", "Serratus Anterior", "Core", "Glutes", "Upper Pectorals"]
    },
    "biometrics": {
      "systemicFatigue": 0.9,
      "mechanics": "Compound",
      "activationProfile": {
        "Anterior Deltoid": 1.0,
        "Lateral Deltoid": 0.8,
        "Triceps Brachii": 0.7,
        "Upper Pectorals": 0.5,
        "Core": 0.2
      }
    }
  },
  {
    "id": "lateral_raises",
    "name": "Lateral Raises",
    "type": "Isolation",
    "description": "Lateral Raises are an isolation exercise that primarily targets the lateral deltoid...",
    "equipment": "Dumbbell, Cable, Machine, Resistance Band",
    "displayMetadata": {
      "primaryMuscle": "Lateral Deltoid",
      "secondaryMuscles": ["Anterior Deltoid", "Posterior Deltoid", "Upper Trapezius", "Supraspinatus", "Serratus Anterior", "Core Muscles", "Rotator Cuff"]
    },
    "biometrics": {
      "systemicFatigue": 0.2,
      "mechanics": "Isolation",
      "activationProfile": {
        "Lateral Deltoid": 1.0,
        "Supraspinatus": 0.6,
        "Anterior Deltoid": 0.3,
        "Upper Trapezius": 0.3
      }
    }
  },
  {
    "id": "face_pulls",
    "name": "Face Pulls",
    "type": "Isolation",
    "description": "The Face Pull is a multi-joint resistance exercise that primarily targets the posterior deltoids...",
    "equipment": "Cable Machine, Rope Attachment",
    "displayMetadata": {
      "primaryMuscle": "Posterior Deltoids",
      "secondaryMuscles": ["Lateral Deltoids", "Biceps", "Latissimus Dorsi", "Erector Spinae"]
    },
    "biometrics": {
      "systemicFatigue": 0.4,
      "mechanics": "Isolation",
      "activationProfile": {
        "Posterior Deltoids": 1.0,
        "Rhomboids": 0.9,
        "Rotator Cuff": 0.8,
        "Trapezius": 0.7,
        "Biceps": 0.4
      }
    }
  },
  {
    "id": "lat_pulldown",
    "name": "Lat Pulldown",
    "type": "Compound",
    "description": "The Lat Pulldown is a compound exercise performed on a machine...",
    "equipment": "Lat Pulldown Machine",
    "displayMetadata": {
      "primaryMuscle": "Latissimus Dorsi",
      "secondaryMuscles": ["Biceps Brachii", "Rhomboids", "Trapezius", "Teres Major", "Posterior Deltoids", "Brachialis", "Brachioradialis", "Forearms", "Rotator Cuff"]
    },
    "biometrics": {
      "systemicFatigue": 0.7,
      "mechanics": "Compound",
      "activationProfile": {
        "Latissimus Dorsi": 1.0,
        "Teres Major": 0.8,
        "Biceps Brachii": 0.6,
        "Rhomboids": 0.5,
        "Posterior Deltoids": 0.4
      }
    }
  },
  {
    "id": "seated_cable_row",
    "name": "Seated Cable Row",
    "type": "Compound",
    "description": "The Seated Cable Row is a compound pulling exercise...",
    "equipment": "Cable machine",
    "displayMetadata": {
      "primaryMuscle": "Latissimus Dorsi",
      "secondaryMuscles": ["Biceps", "Forearms", "Erector Spinae", "Core", "Hamstrings", "Glutes", "Rotator Cuffs"]
    },
    "biometrics": {
      "systemicFatigue": 0.8,
      "mechanics": "Compound",
      "activationProfile": {
        "Latissimus Dorsi": 1.0,
        "Rhomboids": 0.9,
        "Trapezius": 0.8,
        "Biceps": 0.6,
        "Erector Spinae": 0.4,
        "Core": 0.2
      }
    }
  },
  {
    "id": "single_arm_dumbbell_row",
    "name": "Single-Arm Dumbbell Row",
    "type": "Compound",
    "description": "The Single-Arm Dumbbell Row is an upper body compound exercise...",
    "equipment": "Dumbbell, Bench",
    "displayMetadata": {
      "primaryMuscle": "Latissimus Dorsi",
      "secondaryMuscles": ["Biceps Brachii", "Core", "Forearms"]
    },
    "biometrics": {
      "systemicFatigue": 0.7,
      "mechanics": "Compound",
      "activationProfile": {
        "Latissimus Dorsi": 1.0,
        "Rhomboids": 0.7,
        "Biceps Brachii": 0.6,
        "Core": 0.3,
        "Forearms": 0.4
      }
    }
  },
  {
    "id": "barbell_bench_press",
    "name": "Barbell Bench Press",
    "type": "Compound",
    "description": "The Barbell Bench Press is a foundational compound, multi-joint exercise...",
    "equipment": "Barbell, Bench",
    "displayMetadata": {
      "primaryMuscle": "Pectoralis Major",
      "secondaryMuscles": ["Lateral Deltoids", "Posterior Deltoids", "Rotator Cuff", "Rhomboids", "Trapezius", "Latissimus Dorsi"]
    },
    "biometrics": {
      "systemicFatigue": 1.0,
      "mechanics": "Compound",
      "activationProfile": {
        "Pectoralis Major": 1.0,
        "Anterior Deltoid": 0.8,
        "Triceps Brachii": 0.7,
        "Serratus Anterior": 0.4,
        "Rotator Cuff": 0.2
      }
    }
  },
  {
    "id": "dumbbell_bench_press",
    "name": "Dumbbell Bench Press",
    "type": "Compound",
    "description": "The Dumbbell Bench Press is a compound pushing movement...",
    "equipment": "Dumbbell, Bench",
    "displayMetadata": {
      "primaryMuscle": "Pectoralis Major",
      "secondaryMuscles": ["Pectoralis Minor", "Rotator Cuff", "Serratus Anterior", "Abdominals", "Lateral Deltoid", "Latissimus Dorsi"]
    },
    "biometrics": {
      "systemicFatigue": 0.9,
      "mechanics": "Compound",
      "activationProfile": {
        "Pectoralis Major": 1.0,
        "Anterior Deltoid": 0.7,
        "Triceps Brachii": 0.6,
        "Serratus Anterior": 0.5,
        "Rotator Cuff": 0.3
      }
    }
  },
  {
    "id": "incline_dumbbell_press",
    "name": "Incline Dumbbell Press",
    "type": "Compound",
    "description": "The Incline Dumbbell Press is a compound pushing movement performed on an inclined bench...",
    "equipment": "Dumbbells, Incline Bench",
    "displayMetadata": {
      "primaryMuscle": "Pectoralis Major (Clavicular Head)",
      "secondaryMuscles": ["Triceps Brachii", "Core"]
    },
    "biometrics": {
      "systemicFatigue": 0.9,
      "mechanics": "Compound",
      "activationProfile": {
        "Pectoralis Major": 1.0,
        "Anterior Deltoid": 0.9,
        "Triceps Brachii": 0.6,
        "Core": 0.2
      }
    }
  },
  {
    "id": "triceps_pushdown",
    "name": "Triceps Pushdown",
    "type": "Isolation",
    "description": "The Triceps Pushdown is an isolation exercise primarily targeting the triceps brachii...",
    "equipment": "Cable Machine, Rope attachment, V-bar attachment, Straight bar attachment, D-handle attachment",
    "displayMetadata": {
      "primaryMuscle": "Triceps Brachii",
      "secondaryMuscles": ["Forearms"]
    },
    "biometrics": {
      "systemicFatigue": 0.2,
      "mechanics": "Isolation",
      "activationProfile": {
        "Triceps Brachii": 1.0,
        "Forearms": 0.3,
        "Core": 0.2
      }
    }
  },
  {
    "id": "overhead_dumbbell_extension",
    "name": "Overhead Dumbbell Extension",
    "type": "Isolation",
    "description": "The Overhead Dumbbell Extension is an isolation exercise that primarily targets the triceps...",
    "equipment": "Dumbbell",
    "displayMetadata": {
      "primaryMuscle": "Triceps Brachii",
      "secondaryMuscles": ["Deltoids", "Core", "Forearms"]
    },
    "biometrics": {
      "systemicFatigue": 0.3,
      "mechanics": "Isolation",
      "activationProfile": {
        "Triceps Brachii": 1.0,
        "Core": 0.2,
        "Deltoids": 0.2
      }
    }
  },
  {
    "id": "hammer_curls",
    "name": "Hammer Curls",
    "type": "Isolation",
    "description": "Hammer curls are an isolation exercise involving elbow flexion with a neutral grip...",
    "equipment": "Dumbbell",
    "displayMetadata": {
      "primaryMuscle": "Brachialis",
      "secondaryMuscles": ["Forearms", "Anterior Deltoid", "Middle Trapezius", "Upper Trapezius", "Levator Scapulae", "Wrist Flexors", "Wrist Extensors"]
    },
    "biometrics": {
      "systemicFatigue": 0.2,
      "mechanics": "Isolation",
      "activationProfile": {
        "Brachialis": 1.0,
        "Brachioradialis": 0.9,
        "Biceps Brachii": 0.7,
        "Forearms": 0.6,
        "Anterior Deltoid": 0.2
      }
    }
  },
  {
    "id": "goblet_squat",
    "name": "Goblet Squat",
    "type": "Compound",
    "description": "The Goblet Squat is a compound, anteriorly loaded squat variation...",
    "equipment": "Kettlebell, Dumbbell",
    "displayMetadata": {
      "primaryMuscle": "Quadriceps",
      "secondaryMuscles": ["Hamstrings", "Core Muscles", "Calves", "Upper Back", "Shoulders", "Forearms", "Biceps"]
    },
    "biometrics": {
      "systemicFatigue": 0.8,
      "mechanics": "Compound",
      "activationProfile": {
        "Quadriceps": 1.1,
        "Glutes": 0.9,
        "Core": 0.7,
        "Upper Back": 0.4,
        "Biceps": 0.3
      }
    }
  },
  {
    "id": "kettlebell_swings",
    "name": "Kettlebell Swings",
    "type": "Compound",
    "description": "The Kettlebell Swing is a ballistic exercise characterized by a powerful hip-hinge movement...",
    "equipment": "Kettlebell",
    "displayMetadata": {
      "primaryMuscle": "Glutes",
      "secondaryMuscles": ["Abdominals", "Obliques", "Lats", "Quadriceps", "Shoulders"]
    },
    "biometrics": {
      "systemicFatigue": 0.9,
      "mechanics": "Compound",
      "activationProfile": {
        "Glutes": 1.2,
        "Hamstrings": 1.0,
        "Core": 0.6,
        "Forearms": 0.4,
        "Shoulders": 0.3
      }
    }
  },
  {
    "id": "farmer_s_carry",
    "name": "Farmer's Carry",
    "type": "Isolation",
    "description": "The Farmer's Carry is a full-body loaded carry exercise...",
    "equipment": "Dumbbells, Kettlebells, Farmer's Carry Handles",
    "displayMetadata": {
      "primaryMuscle": "Forearms",
      "secondaryMuscles": ["Shoulders (Deltoids, Rotator Cuff)", "Back (Latissimus Dorsi, Rhomboids)", "Glutes", "Hamstrings", "Quadriceps", "Calves"]
    },
    "biometrics": {
      "systemicFatigue": 0.9,
      "mechanics": "Compound",
      "activationProfile": {
        "Forearms": 1.2,
        "Trapezius": 0.8,
        "Core": 0.8,
        "Glutes": 0.5,
        "Quadriceps": 0.5
      }
    }
  },
  {
    "id": "band_pull_aparts",
    "name": "Band Pull-Aparts",
    "type": "Compound",
    "description": "The Band Pull-Apart is an exercise where a resistance band is held...",
    "equipment": "Resistance Band",
    "displayMetadata": {
      "primaryMuscle": "Rhomboids",
      "secondaryMuscles": ["Rotator Cuff", "Lower Trapezius", "Upper Trapezius", "Teres Major", "Biceps", "Triceps", "Forearm Muscles", "Serratus Anterior"]
    },
    "biometrics": {
      "systemicFatigue": 0.2,
      "mechanics": "Compound",
      "activationProfile": {
        "Rhomboids": 1.0,
        "Posterior Deltoids": 0.9,
        "Trapezius": 0.6,
        "Rotator Cuff": 0.5
      }
    }
  },
  {
    "id": "plank",
    "name": "Plank",
    "type": "Compound",
    "description": "The plank is an isometric exercise that involves maintaining a rigid, straight-line position...",
    "equipment": "Bodyweight",
    "displayMetadata": {
      "primaryMuscle": "Rectus Abdominis",
      "secondaryMuscles": ["Deltoids", "Pectorals", "Latissimus Dorsi", "Trapezius", "Rhomboids", "Biceps", "Triceps", "Gluteus Maximus", "Gluteus Medius", "Gluteus Minimus", "Quadriceps", "Hamstrings", "Calves", "Pelvic Floor", "Diaphragm", "Multifidus", "Quadratus Lumborum", "Hip Flexors"]
    },
    "biometrics": {
      "systemicFatigue": 0.4,
      "mechanics": "Compound",
      "activationProfile": {
        "Rectus Abdominis": 1.0,
        "Transverse Abdominis": 0.9,
        "Shoulders": 0.3,
        "Quadriceps": 0.2
      }
    }
  },
  {
    "id": "push_up",
    "name": "Push-up",
    "type": "Compound",
    "description": "The push-up is a compound, closed kinetic chain exercise...",
    "equipment": "Bodyweight",
    "displayMetadata": {
      "primaryMuscle": "Pectoralis Major",
      "secondaryMuscles": ["Serratus Anterior", "Abdominals", "Glutes", "Quadriceps", "Erector Spinae", "Biceps Brachii"]
    },
    "biometrics": {
      "systemicFatigue": 0.5,
      "mechanics": "Compound",
      "activationProfile": {
        "Pectoralis Major": 1.0,
        "Anterior Deltoid": 0.8,
        "Triceps Brachii": 0.7,
        "Core": 0.4
      }
    }
  },
  {
    "id": "bodyweight_squat",
    "name": "Bodyweight Squat",
    "type": "Compound",
    "description": "The bodyweight squat is a fundamental compound exercise...",
    "equipment": "Bodyweight",
    "displayMetadata": {
      "primaryMuscle": "Quadriceps",
      "secondaryMuscles": ["Calves", "Adductors", "Hip Flexors", "Core", "Erector Spinae"]
    },
    "biometrics": {
      "systemicFatigue": 0.5,
      "mechanics": "Compound",
      "activationProfile": {
        "Quadriceps": 1.0,
        "Glutes": 0.8,
        "Adductors": 0.5,
        "Core": 0.3
      }
    }
  },
  {
    "id": "lunges",
    "name": "Dumbbell Lunges",
    "type": "Compound",
    "description": "Dumbbell Lunges are a compound, unilateral exercise...",
    "equipment": "Dumbbell",
    "displayMetadata": {
      "primaryMuscle": "Quadriceps",
      "secondaryMuscles": ["Calves", "Core", "Hip Flexors", "Adductors", "Spinal Erectors", "Grip"]
    },
    "biometrics": {
      "systemicFatigue": 0.9,
      "mechanics": "Compound",
      "activationProfile": {
        "Quadriceps": 1.1,
        "Glutes": 1.0,
        "Adductors": 0.7,
        "Core": 0.5,
        "Forearms": 0.4
      }
    }
  },
  {
    "id": "medicine_ball_slams",
    "name": "Medicine Ball Slams",
    "type": "Compound",
    "description": "Medicine Ball Slams are a full-body, explosive plyometric exercise...",
    "equipment": "Medicine Ball",
    "displayMetadata": {
      "primaryMuscle": "Core",
      "secondaryMuscles": ["Triceps", "Pectorals", "Spinal Erectors", "Calves", "Rotator Cuffs"]
    },
    "biometrics": {
      "systemicFatigue": 0.8,
      "mechanics": "Compound",
      "activationProfile": {
        "Core": 1.2,
        "Latissimus Dorsi": 0.8,
        "Triceps": 0.6,
        "Quadriceps": 0.5
      }
    }
  },
  {
    "id": "leg_extension",
    "name": "Leg Extension",
    "type": "Isolation",
    "description": "The leg extension is an open-chain, single-joint exercise...",
    "equipment": "Leg Extension Machine",
    "displayMetadata": {
      "primaryMuscle": "Quadriceps Femoris",
      "secondaryMuscles": ["Hip Flexors", "Rectus Abdominis", "Obliques", "Hamstrings (eccentric phase)"]
    },
    "biometrics": {
      "systemicFatigue": 0.3,
      "mechanics": "Isolation",
      "activationProfile": {
        "Quadriceps": 1.2,
        "Core": 0.2
      }
    }
  },
  {
    "id": "resistance_band_bicep_curls",
    "name": "Resistance Band Bicep Curls",
    "type": "Isolation",
    "description": "This exercise involves forearm flexion...",
    "equipment": "Resistance Band",
    "displayMetadata": {
      "primaryMuscle": "Biceps Brachii",
      "secondaryMuscles": ["Brachialis", "Brachioradialis", "Forearm Flexors"]
    },
    "biometrics": {
      "systemicFatigue": 0.1,
      "mechanics": "Isolation",
      "activationProfile": {
        "Biceps Brachii": 1.0,
        "Forearms": 0.4
      }
    }
  }
];

export const ALL_MUSCLES = Array.from(new Set(EXERCISE_DATABASE.flatMap(ex => Object.keys(ex.biometrics.activationProfile))));
