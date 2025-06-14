/**
 * Pediatric Emergency Medications Data
 * Contains structured data for pediatric medication dosing
 */
const medications = [
  {
    id: "epinephrine-cardiac",
    name: "Epinephrine (Cardiac)",
    category: "cardiac",
    routes: ["IV/IO"],
    indications: ["Cardiac arrest", "Symptomatic bradycardia"],
    concentration: "0.1 mg/mL (1:10,000)",
    dosing: [
      {
        indication: "Cardiac arrest/Symptomatic bradycardia",
        min: 0.01,
        max: 0.01,
        unit: "mg/kg",
        route: "IV/IO",
        maxDose: 1,
        notes: "Maximum single dose: 1 mg. Repeat every 3-5 minutes as needed."
      }
    ],
    preparation: "1 mg in 10 mL (0.1 mg/mL)",
    precautions: "May cause tachycardia, hypertension, arrhythmias",
    contraindications: "None in cardiac arrest",
    adverseEffects: ["Tachycardia", "Hypertension", "Arrhythmias", "Myocardial ischemia"]
  },
  {
    id: "epinephrine-anaphylaxis",
    name: "Epinephrine (Anaphylaxis)",
    category: "anaphylaxis",
    routes: ["IM", "IV/IO"],
    indications: ["Anaphylaxis", "Severe allergic reaction"],
    concentration: "1 mg/mL (1:1,000) for IM; 0.1 mg/mL (1:10,000) for IV",
    dosing: [
      {
        indication: "Anaphylaxis (IM)",
        min: 0.01,
        max: 0.01,
        unit: "mg/kg",
        route: "IM",
        maxDose: 0.3,
        notes: "Maximum single dose: 0.3 mg, Use 1:1,000 concentration. Repeat every 5-15 minutes as needed."
      },
      {
        indication: "Severe anaphylactic shock (IV)",
        min: 0.001,
        max: 0.001,
        unit: "mg/kg",
        route: "IV",
        maxDose: 0.1,
        notes: "For severe shock only; use 1:10,000 concentration; administer over 5 minutes. May repeat every 5-15 minutes."
      }
    ],
    preparation: "IM: 1 mg in 1 mL; IV: 1 mg in 10 mL",
    precautions: "Use with caution in patients with cardiovascular disease",
    contraindications: "No absolute contraindications in anaphylaxis",
    adverseEffects: ["Anxiety", "Tremor", "Headache", "Palpitations", "Hypertension"]
  },
  {
    id: "amiodarone",
    name: "Amiodarone",
    category: "antiarrhythmic",
    routes: ["IV/IO"],
    indications: ["VF/pulseless VT refractory to defibrillation", "SVT", "VT with pulse"],
    concentration: "50 mg/mL",
    dosing: [
      {
        indication: "VF/pulseless VT",
        min: 5,
        max: 5,
        unit: "mg/kg",
        route: "IV/IO",
        maxDose: 300,
        notes: "Administer rapid bolus during cardiac arrest. Can repeat up to total 15 mg/kg/day."
      },
      {
        indication: "Perfusing tachyarrhythmias",
        min: 5,
        max: 5,
        unit: "mg/kg",
        route: "IV/IO",
        maxDose: 300,
        notes: "Administer over 20-60 minutes for perfusing rhythms."
      }
    ],
    preparation: "Cardiac arrest: undiluted; Perfusing: dilute to 1-2 mg/mL",
    precautions: "Monitor blood pressure and QT interval",
    contraindications: ["Severe sinus node dysfunction", "Second and third-degree AV block", "Cardiogenic shock"],
    adverseEffects: ["Hypotension", "Bradycardia", "QT prolongation", "Hepatotoxicity", "Pulmonary toxicity (rare with acute use)"]
  },
  {
    id: "atropine",
    name: "Atropine",
    category: "anticholinergic",
    routes: ["IV/IO", "ET"],
    indications: ["Symptomatic bradycardia", "Organophosphate poisoning"],
    concentration: "0.1 mg/mL",
    dosing: [
      {
        indication: "Symptomatic bradycardia",
        min: 0.02,
        max: 0.02,
        unit: "mg/kg",
        route: "IV/IO",
        maxDose: 0.5,
        notes: "May repeat once after 5 minutes. Maximum total dose: 1 mg in child, 3 mg in adolescent."
      },
      {
        indication: "Organophosphate poisoning",
        min: 0.05,
        max: 0.05,
        unit: "mg/kg",
        route: "IV/IO",
        maxDose: null,
        notes: "Repeat every 2-5 minutes as needed. No maximum dose in organophosphate poisoning."
      }
    ],
    preparation: "Undiluted",
    precautions: "May cause paradoxical bradycardia at very low doses",
    contraindications: ["Tachycardia", "Narrow-angle glaucoma"],
    adverseEffects: ["Tachycardia", "Dry mouth", "Blurred vision", "Urinary retention", "Decreased secretions"]
  },
  {
    id: "adenosine",
    name: "Adenosine",
    category: "antiarrhythmic",
    routes: ["IV"],
    indications: ["Supraventricular tachycardia (SVT)"],
    concentration: "3 mg/mL",
    dosing: {
      svt: {
        dose: 0.1,
        unit: "mg/kg",
        min: null,
        max: 6,
        interval: "Second dose: 0.2 mg/kg (max 12 mg)",
        notes: "Rapid IV push over 1-2 seconds, followed by immediate saline flush"
      }
    },
    preparation: "Undiluted",
    precautions: "Use with caution in patients with asthma",
    contraindications: ["Second or third-degree AV block", "Sick sinus syndrome"],
    adverseEffects: ["Transient bradycardia", "Chest pain", "Shortness of breath", "Facial flushing"]
  },
  {
    id: "dextrose",
    name: "Dextrose",
    category: "metabolic",
    routes: ["IV/IO"],
    indications: ["Hypoglycemia"],
    concentration: "D10W: 100 mg/mL, D25W: 250 mg/mL, D50W: 500 mg/mL",
    dosing: {
      neonate: {
        dose: 0.5,
        unit: "g/kg",
        min: null,
        max: null,
        interval: "As needed for hypoglycemia",
        notes: "Use D10W 5 mL/kg"
      },
      infant_child: {
        dose: 0.5,
        unit: "g/kg",
        min: null,
        max: 25,
        interval: "As needed for hypoglycemia",
        notes: "Use D25W 2 mL/kg"
      },
      adolescent: {
        dose: 0.5,
        unit: "g/kg",
        min: null,
        max: 25,
        interval: "As needed for hypoglycemia",
        notes: "Use D50W 1 mL/kg"
      }
    },
    preparation: "D10W, D25W, or D50W depending on age",
    precautions: "Avoid extravasation; can cause tissue necrosis",
    contraindications: ["Hyperglycemia", "Intracranial hemorrhage"],
    adverseEffects: ["Hyperglycemia", "Extravasation injury", "Osmotic diuresis"]
  },
  {
    id: "naloxone",
    name: "Naloxone",
    category: "reversal_agent",
    routes: ["IV/IO", "IM", "IN", "ET"],
    indications: ["Opioid overdose", "Respiratory depression due to opioids"],
    concentration: "0.4 mg/mL or 1 mg/mL",
    dosing: {
      standard: {
        dose: 0.1,
        unit: "mg/kg",
        min: null,
        max: 2,
        interval: "May repeat every 2-3 minutes as needed",
        notes: "Higher doses may be needed for synthetic opioids"
      }
    },
    preparation: "Undiluted",
    precautions: "May precipitate withdrawal in opioid-dependent patients",
    contraindications: "Known hypersensitivity to naloxone",
    adverseEffects: ["Acute withdrawal", "Vomiting", "Agitation", "Pulmonary edema"]
  },
  {
    id: "midazolam",
    name: "Midazolam",
    category: "sedative",
    routes: ["IV/IO", "IM", "IN"],
    indications: ["Seizures", "Sedation", "Anxiolysis"],
    concentration: "1 mg/mL or 5 mg/mL",
    dosing: {
      seizure: {
        dose: 0.15,
        unit: "mg/kg",
        min: null,
        max: 10,
        interval: "May repeat every 5 minutes up to 3 doses",
        notes: "IM/IN dose: 0.2 mg/kg (max 10 mg)"
      },
      sedation: {
        dose: 0.05,
        unit: "mg/kg",
        min: null,
        max: 2.5,
        interval: "Titrate to effect",
        notes: "Reduce dose in combination with other sedatives"
      }
    },
    preparation: "May be diluted in normal saline for IV administration",
    precautions: "Respiratory depression, especially when combined with opioids",
    contraindications: ["Acute narrow-angle glaucoma", "Shock", "Alcohol intoxication"],
    adverseEffects: ["Respiratory depression", "Hypotension", "Paradoxical excitation"]
  },
  {
    id: "morphine",
    name: "Morphine",
    category: "analgesic",
    routes: ["IV/IO", "IM", "SC"],
    indications: ["Pain management", "Pulmonary edema"],
    concentration: "1 mg/mL or 10 mg/mL",
    dosing: {
      analgesic: {
        dose: 0.1,
        unit: "mg/kg",
        min: null,
        max: 5,
        interval: "May repeat every 15-30 minutes",
        notes: "Titrate to effect"
      },
      pulmonary_edema: {
        dose: 0.1,
        unit: "mg/kg",
        min: null,
        max: 3,
        interval: "May repeat every 15-30 minutes",
        notes: "Monitor respiratory status closely"
      }
    },
    preparation: "Dilute to appropriate concentration",
    precautions: "Respiratory depression, hypotension",
    contraindications: ["Severe respiratory depression", "Head injury with altered mental status"],
    adverseEffects: ["Respiratory depression", "Hypotension", "Nausea", "Vomiting", "Pruritus"]
  },
  {
    id: "lorazepam",
    name: "Lorazepam",
    category: "sedative",
    routes: ["IV/IO", "IM"],
    indications: ["Status epilepticus", "Acute anxiety", "Sedation"],
    concentration: "2 mg/mL or 4 mg/mL",
    dosing: {
      seizure: {
        dose: 0.1,
        unit: "mg/kg",
        min: null,
        max: 4,
        interval: "May repeat once after 10-15 minutes",
        notes: "Administer no faster than 2 mg/minute"
      },
      sedation: {
        dose: 0.05,
        unit: "mg/kg",
        min: null,
        max: 2,
        interval: "Every 4-6 hours as needed",
        notes: "Lower doses for anxiolysis"
      }
    },
    preparation: "May be diluted in normal saline or D5W",
    precautions: "Respiratory depression, especially with opioids",
    contraindications: ["Acute narrow-angle glaucoma", "Severe respiratory depression"],
    adverseEffects: ["Respiratory depression", "Hypotension", "Sedation", "Amnesia"]
  }
];

export default medications;