/**
 * PALS Algorithms Data
 * Based on AHA Pediatric Advanced Life Support guidelines
 */

const algorithms = [
  {
    id: "pals-cardiac-arrest",
    title: "Pediatric Cardiac Arrest Algorithm",
    category: "cardiac arrest",
    description: "Step-by-step approach to pediatric cardiac arrest management, including CPR, rhythm assessment, and appropriate treatments",
    patientType: "Infants and children in cardiac arrest",
    references: "American Heart Association PALS Guidelines",
    steps: [
      {
        title: "Begin CPR",
        content: "Start high-quality CPR immediately. Ensure adequate chest compressions with proper depth and recoil. Compression depth should be at least 1/3 AP diameter of chest (approximately 4 cm in infants, 5 cm in children)."
      },
      {
        title: "Attach Monitor/Defibrillator",
        content: "As soon as available, attach cardiac monitor/defibrillator to assess rhythm while continuing CPR.",
        notes: "Minimize interruptions in chest compressions during monitor attachment."
      },
      {
        title: "Assess Rhythm",
        content: "Briefly check rhythm to determine if shockable or non-shockable rhythm.",
        decision: true,
        options: [
          {
            text: "Shockable rhythm (VF/pVT)",
            nextStep: 3
          },
          {
            text: "Non-shockable rhythm (Asystole/PEA)",
            nextStep: 7
          }
        ]
      },
      {
        title: "Deliver Shock",
        content: "Deliver one shock at 2 J/kg. Resume CPR immediately after shock for 2 minutes.",
        notes: "Increase energy to 4 J/kg for subsequent shocks. Maximum 10 J/kg or adult dose."
      },
      {
        title: "Continue CPR",
        content: "Perform 2 minutes of high-quality CPR. Establish IV/IO access if not already done.",
        medications: [
          "Epinephrine: 0.01 mg/kg (0.1 mL/kg of 1:10,000) IV/IO every 3-5 minutes"
        ]
      },
      {
        title: "Re-assess Rhythm",
        content: "After 2 minutes of CPR, briefly check rhythm.",
        decision: true,
        options: [
          {
            text: "Shockable rhythm persists",
            nextStep: 6
          },
          {
            text: "Non-shockable rhythm",
            nextStep: 7
          },
          {
            text: "Return of spontaneous circulation",
            nextStep: 11
          }
        ]
      },
      {
        title: "Continue Shock Cycle",
        content: "Deliver another shock at 4 J/kg. Resume CPR immediately after shock. Consider antiarrhythmics.",
        medications: [
          "Amiodarone: 5 mg/kg IV/IO (maximum first dose: 300 mg)",
          "OR Lidocaine: 1 mg/kg IV/IO (maximum dose: 100 mg)"
        ],
        notes: "Return to step 5 and continue cycles of CPR, rhythm check, and shock if indicated."
      },
      {
        title: "Continue CPR for Non-shockable Rhythm",
        content: "Perform 2 minutes of high-quality CPR. Establish IV/IO access if not already done."
      },
      {
        title: "Administer Epinephrine",
        content: "Give epinephrine during CPR as soon as possible.",
        medications: [
          "Epinephrine: 0.01 mg/kg (0.1 mL/kg of 1:10,000) IV/IO every 3-5 minutes"
        ]
      },
      {
        title: "Re-assess Rhythm",
        content: "After 2 minutes of CPR, briefly check rhythm.",
        decision: true,
        options: [
          {
            text: "Shockable rhythm",
            nextStep: 3
          },
          {
            text: "Non-shockable rhythm persists",
            nextStep: 10
          },
          {
            text: "Return of spontaneous circulation",
            nextStep: 11
          }
        ]
      },
      {
        title: "Continue CPR and Assessment Cycles",
        content: "Continue 2-minute cycles of CPR with rhythm checks. Administer epinephrine every 3-5 minutes.",
        notes: "Identify and treat reversible causes: Hypovolemia, Hypoxia, Hydrogen ion (acidosis), Hypo/Hyperkalemia, Hypothermia, Tension pneumothorax, Tamponade (cardiac), Toxins, Thrombosis (pulmonary or coronary)"
      },
      {
        title: "Post-Resuscitation Care",
        content: "Optimize ventilation and oxygenation. Maintain BP with fluids and/or vasoactive drugs. Consider therapeutic hypothermia. Perform comprehensive neurological evaluation. Treat precipitating causes.",
        notes: "Consult pediatric critical care specialist for ongoing management."
      }
    ]
  },
  {
    id: "pals-bradycardia",
    title: "Pediatric Bradycardia with Pulse and Poor Perfusion",
    category: "bradycardia",
    description: "Management algorithm for symptomatic bradycardia in pediatric patients",
    patientType: "Infants and children with bradycardia and signs of poor perfusion",
    references: "American Heart Association PALS Guidelines",
    steps: [
      {
        title: "Initial Assessment",
        content: "Identify bradycardia with pulse and poor perfusion. HR typically < 60/min with signs of poor systemic perfusion."
      },
      {
        title: "Support ABCs",
        content: "Ensure airway is patent. Support breathing as necessary with 100% oxygen and ventilation. Attach monitor/defibrillator."
      },
      {
        title: "Evaluate",
        content: "Identify and treat underlying causes. Consider reversible causes of bradycardia.",
        notes: "Common causes: Hypoxemia, Hypothermia, Head injury with increased ICP, Heart block, Heart transplant (denervated), Toxins/poisons/drugs"
      },
      {
        title: "Decision Point",
        content: "Is bradycardia causing severe cardiorespiratory compromise? Signs include: poor perfusion, hypotension, respiratory difficulty, altered consciousness",
        decision: true,
        options: [
          {
            text: "Yes - Severe compromise",
            nextStep: 4
          },
          {
            text: "No - Bradycardia without severe compromise",
            nextStep: 7
          }
        ]
      },
      {
        title: "Begin CPR",
        content: "Start CPR if HR < 60/min with poor perfusion despite oxygenation and ventilation.",
        notes: "Perform chest compressions if heart rate remains < 60/min with signs of poor perfusion despite adequate oxygenation and ventilation"
      },
      {
        title: "Administer Epinephrine",
        content: "Give epinephrine if bradycardia persists despite adequate oxygenation, ventilation, and CPR.",
        medications: [
          "Epinephrine: 0.01 mg/kg (0.1 mL/kg of 1:10,000) IV/IO every 3-5 minutes",
          "Alternative: 0.1 mg/kg (0.1 mL/kg of 1:1,000) via endotracheal tube"
        ]
      },
      {
        title: "Consider Atropine",
        content: "Consider atropine for bradycardia due to increased vagal tone or primary AV block.",
        medications: [
          "Atropine: 0.02 mg/kg IV/IO (minimum dose: 0.1 mg, maximum single dose: 0.5 mg)",
          "May repeat once if necessary"
        ],
        notes: "Consider cardiac pacing if bradycardia is due to complete heart block or sinus node dysfunction unresponsive to oxygenation, ventilation, chest compressions, and medications."
      },
      {
        title: "Observe and Monitor",
        content: "If no signs of cardiorespiratory compromise, observe and monitor while continuing to address any underlying causes.",
        notes: "Support ABCs as needed, consider expert consultation, and prepare for transport as appropriate."
      }
    ]
  },
  {
    id: "pals-tachycardia",
    title: "Pediatric Tachycardia with Pulse",
    category: "tachycardia",
    description: "Management algorithm for tachycardia with a pulse in pediatric patients",
    patientType: "Infants and children with tachycardia and a pulse",
    references: "American Heart Association PALS Guidelines",
    steps: [
      {
        title: "Initial Assessment",
        content: "Identify tachycardia with pulse. Assess for signs of poor perfusion or shock."
      },
      {
        title: "Support ABCs",
        content: "Ensure airway is patent. Support breathing as necessary with oxygen. Attach monitor/defibrillator."
      },
      {
        title: "Evaluate QRS Duration",
        content: "Evaluate 12-lead ECG if available or monitor. Is QRS duration narrow (≤0.09 sec) or wide (>0.09 sec)?",
        decision: true,
        options: [
          {
            text: "Narrow QRS (≤0.09 sec)",
            nextStep: 4
          },
          {
            text: "Wide QRS (>0.09 sec)",
            nextStep: 9
          }
        ]
      },
      {
        title: "Narrow QRS: Evaluate Rhythm",
        content: "Evaluate rhythm. Is the rhythm sinus tachycardia or supraventricular tachycardia (SVT)?",
        notes: "Sinus tachycardia: Variable R-R and P-R intervals, P waves present and normal. SVT: HR typically >220/min in infants or >180/min in children, abrupt onset/offset, P waves absent or abnormal, R-R interval usually constant."
      },
      {
        title: "Identify Rhythm Type",
        decision: true,
        options: [
          {
            text: "Probable Sinus Tachycardia",
            nextStep: 6
          },
          {
            text: "Probable Supraventricular Tachycardia",
            nextStep: 7
          }
        ]
      },
      {
        title: "Sinus Tachycardia Management",
        content: "Search for and treat underlying causes such as pain, fever, hypovolemia, or sepsis.",
        notes: "Common causes: Fever, Pain, Hypovolemia, Anxiety, Anemia, Hypoxemia"
      },
      {
        title: "SVT: Assess Hemodynamic Status",
        content: "Is there cardiorespiratory compromise? Signs include poor perfusion, hypotension, respiratory difficulty, altered consciousness.",
        decision: true,
        options: [
          {
            text: "Yes - Severe compromise",
            nextStep: 8
          },
          {
            text: "No - Stable SVT",
            nextStep: 12
          }
        ]
      },
      {
        title: "SVT with Compromise: Immediate Cardioversion",
        content: "Perform immediate synchronized cardioversion.",
        medications: [
          "Consider sedation if not emergent",
          "Synchronized cardioversion 0.5-1 J/kg for first attempt",
          "If ineffective, increase dose to 2 J/kg"
        ],
        notes: "If vascular access readily available, consider adenosine 0.1-0.2 mg/kg (max first dose 6 mg) while preparing for cardioversion."
      },
      {
        title: "Wide QRS: Evaluate for SVT vs VT",
        content: "Consider if tachycardia is supraventricular with aberrancy or ventricular tachycardia.",
        notes: "VT more likely if: Older children, history of heart disease, VA dissociation, capture or fusion beats, very irregular QRS pattern."
      },
      {
        title: "Wide QRS Assessment",
        decision: true,
        options: [
          {
            text: "Probable SVT with aberrancy",
            nextStep: 7
          },
          {
            text: "Probable Ventricular Tachycardia",
            nextStep: 11
          }
        ]
      },
      {
        title: "VT: Assess Hemodynamic Status",
        content: "Assess for signs of cardiorespiratory compromise.",
        decision: true,
        options: [
          {
            text: "Unstable with severe compromise",
            nextStep: 13
          },
          {
            text: "Stable VT without severe compromise",
            nextStep: 14
          }
        ]
      },
      {
        title: "Stable SVT: Vagal Maneuvers & Adenosine",
        content: "Try vagal maneuvers (ice to face without occluding airway). If available, give adenosine.",
        medications: [
          "Adenosine: First dose 0.1 mg/kg IV/IO (maximum 6 mg)",
          "Second dose: 0.2 mg/kg IV/IO (maximum 12 mg) if needed"
        ],
        notes: "Use rapid bolus technique followed by saline flush. Consider expert consultation."
      },
      {
        title: "Unstable VT: Immediate Cardioversion",
        content: "Perform immediate synchronized cardioversion.",
        medications: [
          "Consider sedation if not emergent",
          "Synchronized cardioversion 0.5-1 J/kg for first attempt",
          "If ineffective, increase dose to 2 J/kg"
        ]
      },
      {
        title: "Stable VT: Pharmacological Management",
        content: "Consider antiarrhythmic therapy after expert consultation.",
        medications: [
          "Amiodarone: 5 mg/kg IV/IO over 20-60 minutes",
          "OR Procainamide: 15 mg/kg IV/IO over 30-60 minutes",
          "Do not routinely administer amiodarone and procainamide together"
        ],
        notes: "Consider expert consultation. Prepare for synchronized cardioversion if patient becomes unstable or if medication treatment fails."
      }
    ]
  },
  {
    id: "pals-shock",
    title: "Pediatric Shock Management",
    category: "shock",
    description: "Assessment and management of shock in pediatric patients",
    patientType: "Infants and children with signs of shock",
    references: "American Heart Association PALS Guidelines",
    steps: [
      {
        title: "Identify Shock",
        content: "Recognize clinical signs of shock: tachycardia, altered mental status, poor perfusion (delayed capillary refill, diminished pulses, cool extremities, decreased urine output). Hypotension is a late finding."
      },
      {
        title: "Initial Resuscitation",
        content: "Support ABCs. Give 100% oxygen. Establish IV/IO access. Attach cardiac monitoring and check vital signs."
      },
      {
        title: "Identify Shock Type",
        content: "Determine the type of shock if possible:",
        notes: "Hypovolemic: History of fluid loss (vomiting, diarrhea, bleeding, etc.)\nDistributive: Sepsis, anaphylaxis, neurogenic shock\nCardiogenic: History of congenital heart disease, cardiomyopathy, dysrhythmia\nObstructive: Tension pneumothorax, cardiac tamponade, pulmonary embolism"
      },
      {
        title: "Initial Fluid Resuscitation",
        content: "For most shock states, begin with 20 mL/kg isotonic crystalloid (NS or LR) bolus.",
        notes: "If cardiogenic shock is suspected, initial fluid bolus should be reduced to 5-10 mL/kg with careful assessment after each bolus."
      },
      {
        title: "Reassessment",
        content: "Reassess after each fluid bolus. Check clinical signs, vital signs, and for evidence of fluid overload.",
        decision: true,
        options: [
          {
            text: "Improved",
            nextStep: 5
          },
          {
            text: "Not improved",
            nextStep: 6
          }
        ]
      },
      {
        title: "Continued Management - Improved",
        content: "If improved, continue to address underlying cause. Administer additional fluid as needed. Consider maintenance fluids.",
        notes: "Observe for deterioration. Monitor vital signs, urine output, mental status, and signs of fluid overload."
      },
      {
        title: "Shock Not Responsive to Initial Fluid",
        content: "For fluid-refractory shock, consider additional therapy based on shock type.",
        notes: "If signs of shock persist after 40-60 mL/kg of isotonic fluid, consider need for vasoactive drug support."
      },
      {
        title: "Vasoactive Support",
        content: "Begin vasoactive drug therapy for fluid-refractory shock. Choice depends on shock type:",
        medications: [
          "Cold shock (increased SVR, low cardiac output): Epinephrine 0.05-0.3 mcg/kg/min",
          "Warm shock (decreased SVR, adequate cardiac output): Norepinephrine 0.05-0.1 mcg/kg/min",
          "Cardiogenic shock: Epinephrine 0.05-0.3 mcg/kg/min and/or Milrinone 0.25-0.75 mcg/kg/min"
        ],
        notes: "Central venous access preferred but not required to start vasoactive therapy."
      },
      {
        title: "Persistent Shock",
        content: "For shock resistant to fluid and initial vasoactive therapy, consider additional interventions:",
        medications: [
          "Stress-dose hydrocortisone (1-2 mg/kg) for catecholamine-resistant shock with suspected or proven absolute adrenal insufficiency",
          "Additional vasoactive agents based on hemodynamic monitoring",
          "For persistently low cardiac output, consider milrinone"
        ],
        notes: "Consult pediatric critical care, if available."
      },
      {
        title: "Special Considerations",
        content: "Address specific etiologies of shock with targeted therapies:",
        notes: "Anaphylactic shock: Epinephrine (0.01 mg/kg IM, max 0.5 mg), antihistamines, steroids\nSeptic shock: Early antibiotics, source control\nHypovolemic shock due to bleeding: Blood products, control hemorrhage\nObstructive shock: Relieve obstruction (needle decompression for tension pneumothorax, pericardiocentesis for tamponade)\nCardiogenic shock: Minimal fluid resuscitation, inotropic support, consider antiarrhythmics for dysrhythmias"
      }
    ]
  },
  {
    id: "pals-post-resuscitation",
    title: "Post-Resuscitation Management",
    category: "post resuscitation",
    description: "Care of pediatric patients following return of spontaneous circulation (ROSC) after cardiac arrest",
    patientType: "Infants and children with return of spontaneous circulation (ROSC) after cardiac arrest",
    references: "American Heart Association PALS Guidelines",
    steps: [
      {
        title: "Immediate Post-ROSC Care",
        content: "Continue respiratory support. Maintain oxygenation (target SpO2 94-99%). Avoid hyperventilation - aim for normocapnia. Secure airway if not already done."
      },
      {
        title: "Circulatory Support",
        content: "Maintain adequate blood pressure for age. Treat hypotension with fluid boluses (10-20 mL/kg) and/or vasoactive infusions.",
        notes: "Target systolic BP: >70 + (2 × age in years) mmHg",
        medications: [
          "Epinephrine infusion: 0.05-0.3 mcg/kg/min for low cardiac output",
          "Norepinephrine infusion: 0.05-0.1 mcg/kg/min for vasodilated state"
        ]
      },
      {
        title: "Laboratory Evaluation",
        content: "Obtain: Complete blood count, electrolytes, glucose, calcium, blood gas, coagulation studies, lactate level, and consider toxicology screen if indicated.",
        notes: "Repeat laboratory tests as needed for ongoing management."
      },
      {
        title: "Temperature Management",
        content: "Monitor core temperature. Avoid and promptly treat fever (temperature ≥ 38°C).",
        notes: "For children who remain comatose after ROSC: Maintain normothermia or consider targeted temperature management (32-34°C for 48 hours) as per institutional protocol."
      },
      {
        title: "Glucose Management",
        content: "Monitor glucose levels frequently. Avoid hypoglycemia and severe hyperglycemia.",
        notes: "Target glucose range: 80-180 mg/dL (4.4-10 mmol/L)",
        medications: [
          "For hypoglycemia: D10W 2-4 mL/kg IV bolus",
          "For hyperglycemia: Consider insulin per institutional protocol if persistent >180-200 mg/dL"
        ]
      },
      {
        title: "Seizure Management",
        content: "Monitor for clinical seizures and consider continuous EEG monitoring for comatose patients.",
        medications: [
          "Benzodiazepines: First-line treatment (Lorazepam 0.05-0.1 mg/kg IV or Midazolam 0.05-0.1 mg/kg IV)",
          "Levetiracetam: 20-60 mg/kg IV (max 3g) for subsequent treatment",
          "Phenytoin/Fosphenytoin: 15-20 mg PE/kg IV as alternative"
        ],
        notes: "If seizures continue despite treatment, consider status epilepticus protocol and neurology consultation."
      },
      {
        title: "Identify and Treat Reversible Causes",
        content: "Search for and treat underlying causes of the arrest.",
        notes: "Consider: Hypoxemia, Hypovolemia, Hydrogen ion (acidosis), Hypo/Hyperkalemia, Hypoglycemia, Hypothermia, Tension pneumothorax, Tamponade (cardiac), Toxins, Thrombosis (coronary or pulmonary)"
      },
      {
        title: "Neurological Assessment",
        content: "Perform regular neurological examinations. Document Glasgow Coma Scale or Pediatric Glasgow Coma Scale. Consider neurology consultation for comatose patients.",
        notes: "Avoid hyperthermia as it may worsen neurological outcomes."
      },
      {
        title: "Diagnostic Studies",
        content: "Consider additional studies based on clinical indication:",
        notes: "Chest X-ray: Evaluate ETT position, pulmonary status, and cardiac size\nECG: Identify arrhythmias or ischemia\nEchocardiogram: Assess cardiac function\nHead CT: If traumatic injury suspected or neurological concerns\nEEG: For patients with altered mental status or suspected seizures"
      },
      {
        title: "Ongoing Care and Transport",
        content: "Stabilize for transfer to pediatric critical care if not already in appropriate setting. Communicate effectively with receiving team about arrest details and post-resuscitation management.",
        notes: "Transport with adequate monitoring and ongoing critical care support."
      }
    ]
  }
];

export default algorithms;
