/**
 * PALS Algorithm Data
 * Contains structured data for Pediatric Advanced Life Support algorithms
 */
const algorithms = [
  {
    id: "cardiac-arrest",
    title: "Cardiac Arrest Algorithm",
    category: "cardiac arrest",
    description: "Step-by-step guide for managing pediatric cardiac arrest, including CPR, rhythm assessment, and medication administration.",
    tags: ["CPR", "Defibrillation", "PALS"],
    lastUpdated: "2023-04-15",
    steps: [
      {
        title: "Recognize Cardiac Arrest",
        content: "Check for responsiveness, breathing, and pulse (≤10 seconds). Start CPR if no pulse or pulse <60/min with poor perfusion.",
        notes: "For healthcare providers, simultaneous assessment of pulse and breathing is recommended."
      },
      {
        title: "Activate Emergency Response",
        content: "Activate emergency response system. Get AED/defibrillator and emergency equipment."
      },
      {
        title: "Begin High-Quality CPR",
        content: "Push hard (≥1/3 AP chest depth) and fast (100-120/min). Allow complete chest recoil. Minimize interruptions. Rotate compressor every 2 minutes.",
        notes: "Compression depth: Infant: 4 cm (1.5 in), Child: 5 cm (2 in), Adolescent: 5-6 cm (2-2.4 in)"
      },
      {
        title: "Attach Monitor/Defibrillator",
        content: "Check rhythm as soon as possible. Minimize interruptions in CPR."
      },
      {
        title: "Rhythm Assessment",
        content: "Is rhythm shockable? Check for Ventricular Fibrillation (VF) or pulseless Ventricular Tachycardia (pVT).",
        decision: true,
        options: [
          {
            text: "Yes - Shockable Rhythm (VF/pVT)",
            nextStep: 6
          },
          {
            text: "No - Non-shockable Rhythm (PEA/Asystole)",
            nextStep: 10
          }
        ]
      },
      {
        title: "Defibrillation",
        content: "Give 1 shock of 2 J/kg. Resume CPR immediately for 2 minutes.",
        notes: "Increase to 4 J/kg if second shock needed. Max 10 J/kg or adult dose."
      },
      {
        title: "Continue CPR & Give Epinephrine",
        content: "Continue CPR while preparing Epinephrine. Give Epinephrine IO/IV - 0.01 mg/kg (0.1 mL/kg of 0.1 mg/mL concentration). Max single dose: 1 mg.",
        medications: [
          "Epinephrine IO/IV: 0.01 mg/kg (0.1 mL/kg of 0.1 mg/mL)",
          "Max single dose: 1 mg",
          "Repeat every 3-5 minutes"
        ]
      },
      {
        title: "Rhythm Check",
        content: "After 2 minutes of CPR, check rhythm. Is rhythm shockable?",
        decision: true,
        options: [
          {
            text: "Yes - Still Shockable",
            nextStep: 9
          },
          {
            text: "No - Changed to Non-shockable",
            nextStep: 10
          }
        ]
      },
      {
        title: "Continue Shockable Rhythm Management",
        content: "Give 1 shock of 4 J/kg. Resume CPR immediately. Consider advanced airway and capnography. Consider antiarrhythmics.",
        medications: [
          "Amiodarone: 5 mg/kg IO/IV bolus. Max single dose: 300 mg",
          "OR Lidocaine: 1 mg/kg IO/IV bolus. Max dose: 100 mg"
        ],
        notes: "After 2 minutes of CPR, return to rhythm check. Administer Epinephrine every 3-5 minutes."
      },
      {
        title: "Non-shockable Rhythm Management",
        content: "Continue CPR. Give Epinephrine every 3-5 minutes. Consider advanced airway and capnography.",
        medications: [
          "Epinephrine IO/IV: 0.01 mg/kg (0.1 mL/kg of 0.1 mg/mL)",
          "Max single dose: 1 mg",
          "Repeat every 3-5 minutes"
        ]
      },
      {
        title: "Rhythm Check",
        content: "After 2 minutes of CPR, check rhythm. Is rhythm shockable?",
        decision: true,
        options: [
          {
            text: "Yes - Changed to Shockable",
            nextStep: 6
          },
          {
            text: "No - Still Non-shockable",
            nextStep: 12
          }
        ]
      },
      {
        title: "Continue Non-shockable Management",
        content: "Continue CPR. Check rhythm every 2 minutes. Administer Epinephrine every 3-5 minutes. Consider reversible causes.",
        notes: "If no ROSC, consider appropriateness of continuing resuscitation."
      }
    ]
  },
  {
    id: "bradycardia",
    title: "Bradycardia Algorithm",
    category: "bradycardia",
    description: "Management protocol for bradycardia with a pulse but signs of poor perfusion and shock.",
    tags: ["Bradycardia", "Heart Rate", "CPR"],
    lastUpdated: "2023-03-20",
    steps: [
      {
        title: "Identify Bradycardia",
        content: "Heart rate below normal for age with poor perfusion despite adequate oxygenation and ventilation."
      },
      {
        title: "Support ABCs",
        content: "Ensure adequate oxygenation and ventilation. Monitor oxygen saturation and ECG."
      },
      {
        title: "Assessment",
        content: "Is bradycardia causing cardiorespiratory compromise with poor perfusion?",
        decision: true,
        options: [
          {
            text: "Yes - Causing cardiorespiratory compromise",
            nextStep: 4
          },
          {
            text: "No - Heart rate slow but adequate perfusion",
            nextStep: 8
          }
        ]
      },
      {
        title: "Perform CPR",
        content: "Perform CPR if HR <60/min with poor perfusion despite oxygenation and ventilation."
      },
      {
        title: "Give Epinephrine",
        content: "Administer Epinephrine IO/IV. Continue CPR and reassess.",
        medications: [
          "Epinephrine IO/IV: 0.01 mg/kg (0.1 mL/kg of 0.1 mg/mL)",
          "Max single dose: 1 mg",
          "Repeat every 3-5 minutes"
        ]
      },
      {
        title: "Consider Atropine",
        content: "Consider Atropine IO/IV for increased vagal tone or primary AV block.",
        medications: [
          "Atropine IO/IV: 0.02 mg/kg",
          "Minimum dose: 0.1 mg",
          "Maximum single dose: 0.5 mg",
          "May repeat once"
        ]
      },
      {
        title: "Consider Cardiac Pacing",
        content: "Consider transvenous or external cardiac pacing in complete heart block or sinus node dysfunction unresponsive to oxygenation, ventilation, and medications."
      },
      {
        title: "Monitor and Support",
        content: "Observe and monitor closely. Consider cardiology consultation."
      }
    ]
  },
  {
    id: "tachycardia",
    title: "Tachycardia Algorithm",
    category: "tachycardia",
    description: "Management of tachycardia with pulses and adequate perfusion, or with poor perfusion.",
    tags: ["Tachycardia", "SVT", "VT"],
    lastUpdated: "2023-05-10",
    steps: [
      {
        title: "Identify Tachycardia",
        content: "Identify and assess tachycardia. Heart rate above normal for age with or without poor perfusion."
      },
      {
        title: "Assess ABCs",
        content: "Maintain patent airway. Assist breathing as needed. Administer oxygen. Attach monitor/defibrillator."
      },
      {
        title: "Perfusion Assessment",
        content: "Evaluate if cardiorespiratory compromise is present.",
        decision: true,
        options: [
          {
            text: "Cardiorespiratory compromise is present",
            nextStep: 4
          },
          {
            text: "Pulse present with adequate perfusion",
            nextStep: 6
          }
        ]
      },
      {
        title: "Synchronized Cardioversion",
        content: "Perform immediate synchronized cardioversion: 0.5-1 J/kg. Increase to 2 J/kg if initial dose is ineffective.",
        notes: "Sedate if possible but don't delay cardioversion."
      },
      {
        title: "Post-Cardioversion Care",
        content: "Evaluate response. Consider antiarrhythmics if recurrent. Consult pediatric cardiology.",
        medications: [
          "Amiodarone IO/IV: 5 mg/kg over 20-60 minutes",
          "Procainamide IO/IV: 15 mg/kg over 30-60 minutes"
        ],
        notes: "Do not routinely give Amiodarone and Procainamide together."
      },
      {
        title: "Evaluate QRS Duration",
        content: "Determine if QRS duration is normal or wide for age.",
        decision: true,
        options: [
          {
            text: "Normal (≤0.09 sec)",
            nextStep: 7
          },
          {
            text: "Wide (>0.09 sec)",
            nextStep: 10
          }
        ]
      },
      {
        title: "Evaluate Heart Rhythm",
        content: "Evaluate if rhythm is sinus tachycardia or supraventricular tachycardia (SVT).",
        decision: true,
        options: [
          {
            text: "Sinus Tachycardia",
            nextStep: 8
          },
          {
            text: "Supraventricular Tachycardia",
            nextStep: 9
          }
        ]
      },
      {
        title: "Manage Sinus Tachycardia",
        content: "Search for and treat underlying causes: fever, hypovolemia, pain, etc."
      },
      {
        title: "Manage SVT",
        content: "Attempt vagal maneuvers (if not delayed). Give adenosine if IV access available.",
        medications: [
          "Adenosine IO/IV: 0.1 mg/kg rapid bolus (max first dose: 6 mg)",
          "Second dose: 0.2 mg/kg rapid bolus (max second dose: 12 mg)"
        ]
      },
      {
        title: "Manage Wide QRS Tachycardia",
        content: "Consider if this is SVT with aberrancy or ventricular tachycardia.",
        notes: "Consult pediatric cardiology. Consider amiodarone or procainamide."
      }
    ]
  },
  {
    id: "shock",
    title: "Pediatric Shock Algorithm",
    category: "shock",
    description: "Recognition and management of shock in pediatric patients including fluid resuscitation and medication therapy.",
    tags: ["Shock", "Fluid Resuscitation", "Sepsis"],
    lastUpdated: "2023-06-05",
    steps: [
      {
        title: "Recognize Shock",
        content: "Assess for signs of shock: altered mental status, poor perfusion, weak pulses, tachycardia, hypotension.",
        notes: "Hypotension is a late finding in pediatric shock."
      },
      {
        title: "Initial Management",
        content: "Maintain patent airway. Assist breathing as needed. Administer 100% oxygen. Establish vascular access (IV/IO)."
      },
      {
        title: "Initial Fluid Resuscitation",
        content: "For signs of inadequate perfusion, give 20 mL/kg isotonic crystalloid bolus over 5-10 minutes. Reassess after each bolus."
      },
      {
        title: "Response Assessment",
        content: "Evaluate patient's response to initial fluid resuscitation.",
        decision: true,
        options: [
          {
            text: "Signs of shock resolved",
            nextStep: 5
          },
          {
            text: "Shock persists",
            nextStep: 6
          }
        ]
      },
      {
        title: "Shock Resolved",
        content: "Continue to monitor. Consider maintenance fluids. Determine specific etiology and appropriate therapy."
      },
      {
        title: "Continued Resuscitation",
        content: "Give second 20 mL/kg isotonic crystalloid bolus. Reassess frequently. Consider blood products for hemorrhagic shock."
      },
      {
        title: "Shock Type Assessment",
        content: "Determine shock type based on clinical presentation.",
        decision: true,
        options: [
          {
            text: "Hypovolemic/Hemorrhagic",
            nextStep: 8
          },
          {
            text: "Distributive (Septic, Anaphylactic)",
            nextStep: 9
          },
          {
            text: "Cardiogenic",
            nextStep: 10
          }
        ]
      },
      {
        title: "Hypovolemic/Hemorrhagic Shock",
        content: "Continue fluid resuscitation. Consider blood products for hemorrhagic shock (10-15 mL/kg). Address underlying cause."
      },
      {
        title: "Distributive Shock",
        content: "Continue fluid resuscitation. Start vasoactive agents if fluid-refractory.",
        medications: [
          "Epinephrine infusion: 0.05-0.3 mcg/kg/min",
          "Norepinephrine infusion: 0.05-0.3 mcg/kg/min",
          "For anaphylaxis: Epinephrine IM 0.01 mg/kg (max 0.3 mg)"
        ]
      },
      {
        title: "Cardiogenic Shock",
        content: "Limit fluid boluses. Start inotropic support. Consider echocardiogram if available.",
        medications: [
          "Milrinone: Loading 50 mcg/kg over 10-60 min, then 0.25-0.75 mcg/kg/min",
          "Dobutamine: 2-20 mcg/kg/min"
        ],
        notes: "Avoid excessive fluid administration in cardiogenic shock."
      }
    ]
  },
  {
    id: "post-resuscitation",
    title: "Post-Resuscitation Care",
    category: "post resuscitation",
    description: "Comprehensive care after return of spontaneous circulation (ROSC) including oxygenation, ventilation and hemodynamic monitoring.",
    tags: ["ROSC", "Post-Cardiac Arrest", "Neuroprotection"],
    lastUpdated: "2023-06-12",
    steps: [
      {
        title: "Confirm ROSC",
        content: "Confirm return of spontaneous circulation by checking pulses, blood pressure, and cardiac rhythm."
      },
      {
        title: "Optimize Ventilation and Oxygenation",
        content: "Maintain oxygen saturation 94-99%. Avoid excessive ventilation. Consider waveform capnography."
      },
      {
        title: "Evaluate Neurologic Status",
        content: "Assess neurologic status. Consider targeted temperature management for patients who remain comatose."
      },
      {
        title: "Hemodynamic Support",
        content: "Maintain adequate blood pressure for age. Consider vasoactive infusions if needed.",
        medications: [
          "Epinephrine infusion: 0.05-0.3 mcg/kg/min",
          "Norepinephrine infusion: 0.05-0.3 mcg/kg/min",
          "Dobutamine: 2-20 mcg/kg/min"
        ]
      },
      {
        title: "Monitor for Arrhythmias",
        content: "Monitor for recurrent arrhythmias. Treat as indicated based on rhythm and hemodynamic status."
      },
      {
        title: "Diagnostic Assessments",
        content: "Obtain 12-lead ECG, chest X-ray, laboratory studies including blood gases, lactate, electrolytes, glucose."
      },
      {
        title: "Temperature Management",
        content: "Maintain normothermia. Consider targeted temperature management (TTM) for 24-48 hours for children who remain comatose after cardiac arrest."
      },
      {
        title: "Identify and Treat Cause",
        content: "Identify and treat the underlying cause of cardiac arrest (e.g., respiratory failure, arrhythmia, infection, poisoning)."
      }
    ]
  }
];

export default algorithms;
