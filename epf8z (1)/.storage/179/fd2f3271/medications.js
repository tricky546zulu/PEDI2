/**
 * Pediatric Medication Data
 * Critical medications and dosing information for pediatric emergencies
 */

const medications = [
  {
    id: "epinephrine",
    name: "Epinephrine",
    category: "cardiac",
    code: "ACLS",
    critical: true,
    indication: "Cardiac arrest, symptomatic bradycardia, anaphylaxis, shock",
    dosing: [
      {
        indication: "Cardiac Arrest",
        route: "IV/IO",
        doseRange: "0.01 mg/kg (0.1 mL/kg of 1:10,000)",
        doseMin: 0.01,
        doseMax: 0.01,
        doseUnit: "mg/kg",
        concentration: 0.1,
        notes: "Repeat every 3-5 minutes. Max single dose: 1 mg"
      },
      {
        indication: "Bradycardia",
        route: "IV/IO",
        doseRange: "0.01 mg/kg (0.1 mL/kg of 1:10,000)",
        doseMin: 0.01,
        doseMax: 0.01,
        doseUnit: "mg/kg",
        concentration: 0.1,
        notes: "Repeat every 3-5 minutes as needed"
      },
      {
        indication: "Anaphylaxis",
        route: "IM",
        doseRange: "0.01 mg/kg (0.01 mL/kg of 1:1,000)",
        doseMin: 0.01,
        doseMax: 0.01,
        doseUnit: "mg/kg",
        concentration: 1,
        notes: "Max single dose: 0.3-0.5 mg. May repeat every 5-15 min"
      },
      {
        indication: "Infusion for Shock",
        route: "IV/IO",
        doseRange: "0.05-0.3 mcg/kg/min",
        doseMin: 0.05,
        doseMax: 0.3,
        doseUnit: "mcg/kg/min",
        notes: "Titrate to effect. Mix 0.6 mg/kg in 100 mL = 0.1 mcg/kg/min at 1 mL/hr"
      }
    ],
    sideEffects: "Tachycardia, hypertension, arrhythmias, anxiety, tremor, headache, vasoconstriction",
    contraindications: "None in cardiac arrest or life-threatening situation"
  },
  {
    id: "amiodarone",
    name: "Amiodarone",
    category: "cardiac",
    code: "ACLS",
    critical: true,
    indication: "Ventricular fibrillation, pulseless ventricular tachycardia, other tachyarrhythmias",
    dosing: [
      {
        indication: "VF/pVT",
        route: "IV/IO",
        doseRange: "5 mg/kg",
        doseMin: 5,
        doseMax: 5,
        doseUnit: "mg/kg",
        notes: "Rapid bolus. Maximum first dose: 300 mg. May repeat up to total dose of 15 mg/kg/day"
      },
      {
        indication: "Perfusing Tachyarrhythmias",
        route: "IV/IO",
        doseRange: "5 mg/kg",
        doseMin: 5,
        doseMax: 5,
        doseUnit: "mg/kg",
        notes: "Administer over 20-60 minutes. Maximum dose: 300 mg"
      }
    ],
    sideEffects: "Hypotension, bradycardia, heart block, prolonged QT, hepatotoxicity",
    contraindications: "Severe sinus node dysfunction, 2nd/3rd degree heart block, severe hypotension"
  },
  {
    id: "atropine",
    name: "Atropine Sulfate",
    category: "cardiac",
    critical: true,
    indication: "Symptomatic bradycardia, organophosphate poisoning",
    dosing: [
      {
        indication: "Bradycardia",
        route: "IV/IO",
        doseRange: "0.02 mg/kg",
        doseMin: 0.02,
        doseMax: 0.02,
        doseUnit: "mg/kg",
        notes: "Minimum dose: 0.1 mg, Maximum single dose: 0.5 mg child, 1 mg adolescent"
      },
      {
        indication: "Organophosphate Poisoning",
        route: "IV/IO/IM",
        doseRange: "0.05-0.1 mg/kg",
        doseMin: 0.05,
        doseMax: 0.1,
        doseUnit: "mg/kg",
        notes: "Repeat every 5-10 min as needed until muscarinic symptoms resolve"
      }
    ],
    sideEffects: "Tachycardia, dry mouth, blurred vision, urinary retention, hyperthermia",
    contraindications: "None in emergency situations"
  },
  {
    id: "adenosine",
    name: "Adenosine",
    category: "cardiac",
    critical: true,
    indication: "Supraventricular tachycardia (SVT)",
    dosing: [
      {
        indication: "SVT",
        route: "IV/IO",
        doseRange: "0.1 mg/kg (first dose)",
        doseMin: 0.1,
        doseMax: 0.1,
        doseUnit: "mg/kg",
        notes: "Maximum first dose: 6 mg. Give via rapid bolus followed by saline flush"
      },
      {
        indication: "SVT - Second dose",
        route: "IV/IO",
        doseRange: "0.2 mg/kg (second dose)",
        doseMin: 0.2,
        doseMax: 0.2,
        doseUnit: "mg/kg",
        notes: "Maximum second dose: 12 mg. Give via rapid bolus followed by saline flush"
      }
    ],
    sideEffects: "Transient heart block, flushing, dyspnea, chest pain, brief asystole",
    contraindications: "Second/third degree heart block, sick sinus syndrome, poisoning-induced tachycardia"
  },
  {
    id: "sodium_bicarbonate",
    name: "Sodium Bicarbonate",
    category: "metabolic",
    critical: false,
    indication: "Severe metabolic acidosis, hyperkalemia, tricyclic antidepressant overdose",
    dosing: [
      {
        indication: "Metabolic Acidosis",
        route: "IV/IO",
        doseRange: "1 mEq/kg",
        doseMin: 1,
        doseMax: 1,
        doseUnit: "mEq/kg",
        notes: "Administer slowly. Repeat based on blood pH and clinical status"
      },
      {
        indication: "Hyperkalemia",
        route: "IV/IO",
        doseRange: "1 mEq/kg",
        doseMin: 1,
        doseMax: 1,
        doseUnit: "mEq/kg",
        notes: "Administer over 5-10 minutes"
      },
      {
        indication: "Tricyclic Antidepressant Overdose",
        route: "IV/IO",
        doseRange: "1-2 mEq/kg",
        doseMin: 1,
        doseMax: 2,
        doseUnit: "mEq/kg",
        notes: "For wide complex arrhythmias or hypotension"
      }
    ],
    sideEffects: "Hypernatremia, fluid overload, hypocalcemia, metabolic alkalosis",
    contraindications: "Hypocalcemia, respiratory alkalosis"
  },
  {
    id: "dextrose",
    name: "Dextrose (D10W)",
    category: "metabolic",
    critical: true,
    indication: "Hypoglycemia",
    dosing: [
      {
        indication: "Hypoglycemia",
        route: "IV/IO",
        doseRange: "0.5-1 g/kg (5-10 mL/kg D10W)",
        doseMin: 0.5,
        doseMax: 1,
        doseUnit: "g/kg",
        notes: "Infuse slowly. Check blood glucose after administration"
      }
    ],
    sideEffects: "Hyperglycemia, tissue necrosis with extravasation, hyperosmolar state",
    contraindications: "Intracranial hemorrhage (relative)"
  },
  {
    id: "naloxone",
    name: "Naloxone",
    category: "toxicology",
    critical: true,
    indication: "Opioid overdose with respiratory depression",
    dosing: [
      {
        indication: "Opioid Overdose",
        route: "IV/IO/IM/IN",
        doseRange: "0.1 mg/kg",
        doseMin: 0.1,
        doseMax: 0.1,
        doseUnit: "mg/kg",
        notes: "Maximum single dose: 2 mg. May repeat as needed"
      }
    ],
    sideEffects: "Withdrawal symptoms, vomiting, agitation, pulmonary edema",
    contraindications: "Caution in opioid-dependent patients"
  },
  {
    id: "midazolam",
    name: "Midazolam",
    category: "neurological",
    critical: false,
    indication: "Status epilepticus, sedation for procedures",
    dosing: [
      {
        indication: "Status Epilepticus",
        route: "IV/IO",
        doseRange: "0.05-0.1 mg/kg",
        doseMin: 0.05,
        doseMax: 0.1,
        doseUnit: "mg/kg",
        notes: "Administer over 2-3 minutes. Maximum single dose: 5 mg"
      },
      {
        indication: "Status Epilepticus",
        route: "IM",
        doseRange: "0.1-0.2 mg/kg",
        doseMin: 0.1,
        doseMax: 0.2,
        doseUnit: "mg/kg",
        notes: "Maximum single dose: 10 mg"
      },
      {
        indication: "Status Epilepticus",
        route: "Intranasal",
        doseRange: "0.2 mg/kg",
        doseMin: 0.2,
        doseMax: 0.2,
        doseUnit: "mg/kg",
        notes: "Maximum single dose: 10 mg"
      },
      {
        indication: "Procedural Sedation",
        route: "IV/IO",
        doseRange: "0.05-0.1 mg/kg",
        doseMin: 0.05,
        doseMax: 0.1,
        doseUnit: "mg/kg",
        notes: "Titrate to effect. Maximum total dose: 5 mg"
      }
    ],
    sideEffects: "Respiratory depression, hypotension, paradoxical excitation",
    contraindications: "Glaucoma, shock, CNS depression, alcohol intoxication"
  },
  {
    id: "albuterol",
    name: "Albuterol",
    category: "respiratory",
    critical: false,
    indication: "Bronchospasm, wheezing, asthma, bronchiolitis",
    dosing: [
      {
        indication: "Bronchospasm",
        route: "Nebulized",
        doseRange: "2.5 mg (0.5 mL of 0.5% solution)",
        weightBasedDosing: [
          { minWeight: 0, maxWeight: 20, dose: "2.5 mg" },
          { minWeight: 20, maxWeight: 999, dose: "5 mg" }
        ],
        notes: "May repeat every 20 minutes for 3 doses, then as needed"
      },
      {
        indication: "Continuous Nebulization",
        route: "Nebulized",
        doseRange: "0.5 mg/kg/hr",
        doseMin: 0.5,
        doseMax: 0.5,
        doseUnit: "mg/kg/hr",
        notes: "Maximum 15 mg/hr. Used for severe respiratory distress"
      }
    ],
    sideEffects: "Tachycardia, tremor, hypokalemia, hyperglycemia",
    contraindications: "Hypersensitivity to albuterol"
  },
  {
    id: "diphenhydramine",
    name: "Diphenhydramine",
    category: "analgesia",
    critical: false,
    indication: "Allergic reactions, anaphylaxis, urticaria, dystonic reactions",
    dosing: [
      {
        indication: "Allergic Reaction",
        route: "IV/IO/IM",
        doseRange: "1 mg/kg",
        doseMin: 1,
        doseMax: 1,
        doseUnit: "mg/kg",
        notes: "Maximum dose: 50 mg. Administer IV over 10-15 minutes"
      },
      {
        indication: "Dystonic Reaction",
        route: "IV/IO/IM",
        doseRange: "1 mg/kg",
        doseMin: 1,
        doseMax: 1,
        doseUnit: "mg/kg",
        notes: "Maximum dose: 50 mg. Administer IV over 10-15 minutes"
      }
    ],
    sideEffects: "Sedation, dry mouth, blurred vision, urinary retention",
    contraindications: "Acute asthma, newborns, patients taking MAO inhibitors"
  },
  {
    id: "ondansetron",
    name: "Ondansetron",
    category: "gastrointestinal",
    critical: false,
    indication: "Nausea, vomiting",
    dosing: [
      {
        indication: "Nausea/Vomiting",
        route: "IV/IO",
        doseRange: "0.1 mg/kg",
        doseMin: 0.1,
        doseMax: 0.1,
        doseUnit: "mg/kg",
        notes: "Maximum dose: 4 mg. Administer over 2-5 minutes"
      },
      {
        indication: "Nausea/Vomiting",
        route: "Oral/ODT",
        weightBasedDosing: [
          { minWeight: 0, maxWeight: 15, dose: "2 mg" },
          { minWeight: 15, maxWeight: 30, dose: "4 mg" },
          { minWeight: 30, maxWeight: 999, dose: "8 mg" }
        ],
        notes: "Give once every 8 hours as needed"
      }
    ],
    sideEffects: "Headache, dizziness, constipation, QT prolongation",
    contraindications: "Known hypersensitivity, congenital long QT syndrome"
  },
  {
    id: "morphine",
    name: "Morphine Sulfate",
    category: "analgesia",
    critical: false,
    indication: "Moderate to severe pain, pulmonary edema",
    dosing: [
      {
        indication: "Pain Management",
        route: "IV/IO",
        doseRange: "0.05-0.1 mg/kg",
        doseMin: 0.05,
        doseMax: 0.1,
        doseUnit: "mg/kg",
        notes: "Maximum single dose: 5 mg. Administer over 5 minutes"
      }
    ],
    sideEffects: "Respiratory depression, hypotension, bradycardia, nausea, pruritis",
    contraindications: "Respiratory depression, head injury, severe asthma"
  },
  {
    id: "fentanyl",
    name: "Fentanyl",
    category: "analgesia",
    critical: false,
    indication: "Moderate to severe pain",
    dosing: [
      {
        indication: "Pain Management",
        route: "IV/IO",
        doseRange: "1-2 mcg/kg",
        doseMin: 1,
        doseMax: 2,
        doseUnit: "mcg/kg",
        notes: "Maximum single dose: 50 mcg. Administer over 1-2 minutes"
      },
      {
        indication: "Pain Management",
        route: "Intranasal",
        doseRange: "1.5-2 mcg/kg",
        doseMin: 1.5,
        doseMax: 2,
        doseUnit: "mcg/kg",
        notes: "Maximum single dose: 100 mcg"
      }
    ],
    sideEffects: "Respiratory depression, chest wall rigidity (with rapid administration), bradycardia, hypotension",
    contraindications: "Respiratory depression, increased ICP, hemodynamic instability"
  },
  {
    id: "calcium_chloride",
    name: "Calcium Chloride 10%",
    category: "electrolyte",
    critical: true,
    indication: "Hypocalcemia, hyperkalemia, calcium channel blocker overdose",
    dosing: [
      {
        indication: "Hypocalcemia/Hyperkalemia",
        route: "IV/IO",
        doseRange: "20 mg/kg (0.2 mL/kg of 10% solution)",
        doseMin: 20,
        doseMax: 20,
        doseUnit: "mg/kg",
        notes: "Maximum dose: 1 gram. Administer slowly over 5-10 minutes through central line if possible"
      }
    ],
    sideEffects: "Tissue necrosis with extravasation, hypotension, bradycardia",
    contraindications: "Hypercalcemia, digoxin toxicity"
  },
  {
    id: "norepinephrine",
    name: "Norepinephrine",
    category: "cardiac",
    critical: true,
    indication: "Distributive shock, septic shock, neurogenic shock",
    dosing: [
      {
        indication: "Shock",
        route: "IV/IO",
        doseRange: "0.05-2 mcg/kg/min",
        doseMin: 0.05,
        doseMax: 2,
        doseUnit: "mcg/kg/min",
        notes: "Start at low dose and titrate to effect. Central line preferred but peripheral acceptable in emergency"
      }
    ],
    sideEffects: "Hypertension, arrhythmias, tissue ischemia, bradycardia",
    contraindications: "Hypovolemia (without adequate fluid resuscitation)"
  }
];

export default medications;
