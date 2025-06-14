// Medications data for pediatric emergency care
const medications = [
  {
    id: "epinephrine",
    name: "Epinephrine",
    category: "cardiac",
    concentration: "0.1 mg/mL (1:10,000)",
    indication: "Cardiac arrest, symptomatic bradycardia, anaphylaxis",
    doseCardiacArrest: {
      route: "IV/IO",
      dose: "0.01 mg/kg (0.1 mL/kg)",
      maxDose: "1 mg (10 mL)",
      notes: "Repeat every 3-5 minutes"
    },
    doseAnaphylaxis: {
      route: "IM",
      dose: "0.01 mg/kg (0.01 mL/kg of 1:1,000)",
      maxDose: "0.3 mg (0.3 mL)",
      notes: "May repeat every 5-15 minutes"
    },
    cautions: "Extravasation may cause tissue necrosis. Ensure proper placement of IV/IO.",
    preparation: "Cardiac arrest: Use 0.1 mg/mL (1:10,000). Anaphylaxis: Use 1 mg/mL (1:1,000)",
    adverse: "Tachycardia, hypertension, arrhythmias, anxiety, tremor"
  },
  {
    id: "amiodarone",
    name: "Amiodarone",
    category: "cardiac",
    concentration: "50 mg/mL",
    indication: "VF/pVT refractory to defibrillation, perfusing tachyarrhythmias",
    doseCardiacArrest: {
      route: "IV/IO",
      dose: "5 mg/kg",
      maxDose: "300 mg",
      notes: "May repeat up to 2 times for refractory VF/pVT"
    },
    dosePerfusingArrhythmia: {
      route: "IV/IO",
      dose: "5 mg/kg over 20-60 minutes",
      maxDose: "300 mg",
      notes: "Use caution with repeated doses. Monitor ECG and blood pressure"
    },
    cautions: "Can cause hypotension and bradycardia. Monitor hemodynamics closely.",
    preparation: "May be diluted in D5W or NS to concentration of 1-6 mg/mL",
    adverse: "Hypotension, bradycardia, heart block, QT prolongation"
  },
  {
    id: "atropine",
    name: "Atropine",
    category: "cardiac",
    concentration: "0.1 mg/mL",
    indication: "Symptomatic bradycardia with pulse",
    doseGeneral: {
      route: "IV/IO",
      dose: "0.02 mg/kg",
      minDose: "0.1 mg",
      maxDose: "0.5 mg in child, 1 mg in adolescent",
      notes: "May repeat once if needed. Maximum total dose: 1 mg in child, 2 mg in adolescent"
    },
    cautions: "Ineffective for AV block or abnormal ventricular conduction. Paradoxical bradycardia may occur with doses less than 0.1 mg.",
    preparation: "Do not dilute",
    adverse: "Tachycardia, mydriasis, urinary retention, decreased secretions"
  },
  {
    id: "adenosine",
    name: "Adenosine",
    category: "cardiac",
    concentration: "3 mg/mL",
    indication: "Supraventricular tachycardia (SVT)",
    doseGeneral: {
      route: "IV/IO (rapid push)",
      firstDose: "0.1 mg/kg",
      maxFirstDose: "6 mg",
      secondDose: "0.2 mg/kg",
      maxSecondDose: "12 mg",
      notes: "Follow each dose with rapid saline flush (5-10 mL)"
    },
    cautions: "Use with caution in patients with asthma. Administer through most proximal IV/IO site followed by immediate rapid saline flush.",
    preparation: "Do not dilute",
    adverse: "Transient heart block, flushing, dyspnea, chest pain"
  },
  {
    id: "sodium-bicarb",
    name: "Sodium Bicarbonate",
    category: "metabolic",
    concentration: "1 mEq/mL (8.4%)",
    indication: "Severe metabolic acidosis, hyperkalemia, tricyclic antidepressant overdose",
    doseGeneral: {
      route: "IV/IO",
      dose: "1 mEq/kg",
      notes: "Infuse slowly. Reassess after initial dose."
    },
    cautions: "Use with caution if adequate ventilation is not established. May inactivate catecholamines if administered in same IV line.",
    preparation: "May be diluted 1:1 with sterile water or D5W for infants <3 months (creates 0.5 mEq/mL)",
    adverse: "Metabolic alkalosis, hypernatremia, hyperosmolarity"
  },
  {
    id: "dextrose",
    name: "Dextrose",
    category: "metabolic",
    concentration: "D10W (0.1 g/mL) preferred for children. D50W (0.5 g/mL) for adolescents.",
    indication: "Hypoglycemia",
    doseInfantChild: {
      route: "IV/IO",
      solution: "D10W",
      dose: "0.5-1 g/kg (5-10 mL/kg)",
      notes: "Infuse slowly. Reassess glucose after administration."
    },
    doseAdolescent: {
      route: "IV/IO",
      solution: "D50W",
      dose: "1-2 mL/kg",
      maxDose: "50 mL",
      notes: "Consider diluting D50W to D25W for small adolescents."
    },
    cautions: "Extravasation can cause tissue necrosis. Avoid concentrated solutions in neonates due to risk of intraventricular hemorrhage.",
    preparation: "D10W is preferred for pediatric patients. Can be made by adding 10 mL of D50W to 40 mL of sterile water.",
    adverse: "Hyperglycemia, hyperosmolarity"
  },
  {
    id: "naloxone",
    name: "Naloxone",
    category: "toxicology",
    concentration: "1 mg/mL",
    indication: "Opioid overdose with respiratory depression",
    doseInfant: {
      route: "IV/IO/IM/IN",
      dose: "0.1 mg/kg",
      maxDose: "2 mg",
      notes: "May repeat as needed. Consider continuous infusion for recurrent symptoms (2/3 of effective dose per hour)."
    },
    doseChild: {
      route: "IV/IO/IM/IN",
      dose: "0.1 mg/kg",
      maxDose: "2 mg",
      notes: "May repeat as needed. Consider continuous infusion for recurrent symptoms."
    },
    doseAdolescent: {
      route: "IV/IO/IM/IN",
      dose: "2 mg",
      notes: "For suspected opioid dependence, start with 0.1 mg doses to prevent withdrawal."
    },
    cautions: "May precipitate acute withdrawal in opioid-dependent patients. Duration of action shorter than many opioids, requiring repeated doses.",
    preparation: "May administer undiluted",
    adverse: "Acute opioid withdrawal symptoms, tachycardia, hypertension, pulmonary edema"
  },
  {
    id: "albuterol",
    name: "Albuterol",
    category: "respiratory",
    concentration: "5 mg/mL (for nebulization)",
    indication: "Bronchospasm, wheezing",
    doseGeneral: {
      route: "Nebulization",
      childDose: "2.5 mg (0.5 mL of 5 mg/mL solution)",
      adolescentDose: "2.5-5 mg (0.5-1 mL)",
      notes: "May repeat every 20 minutes for up to 3 doses, then as needed."
    },
    doseMDI: {
      route: "MDI with spacer",
      dose: "4-8 puffs",
      notes: "90 mcg per puff. May repeat every 20 minutes for up to 3 doses."
    },
    doseContinuous: {
      route: "Continuous nebulization",
      dose: "10-15 mg/hour",
      notes: "For severe respiratory distress"
    },
    cautions: "May cause tachycardia, tremor, and hypokalemia. Monitor heart rate and for signs of toxicity.",
    preparation: "For nebulization, may dilute with normal saline to a total of 3 mL",
    adverse: "Tachycardia, tremor, hypokalemia, hyperglycemia"
  },
  {
    id: "methylprednisolone",
    name: "Methylprednisolone",
    category: "respiratory",
    concentration: "Various (typically 40 mg/mL or 62.5 mg/mL)",
    indication: "Acute asthma, allergic reactions, anaphylaxis, airway edema",
    doseAsthma: {
      route: "IV/IO",
      dose: "2 mg/kg",
      maxDose: "60 mg",
      notes: "Followed by 0.5-1 mg/kg every 6 hours"
    },
    doseCroup: {
      route: "IV/IO/PO",
      dose: "1-2 mg/kg",
      maxDose: "60 mg",
      notes: "Single dose"
    },
    cautions: "May cause hyperglycemia. Not a first-line agent in anaphylaxis.",
    preparation: "Reconstitute with provided diluent. May be further diluted in NS or D5W for infusion.",
    adverse: "Hyperglycemia, hypertension, gastric irritation, mood changes"
  },
  {
    id: "diazepam",
    name: "Diazepam",
    category: "neurological",
    concentration: "5 mg/mL",
    indication: "Status epilepticus, seizures",
    doseGeneral: {
      route: "IV/IO",
      dose: "0.1-0.2 mg/kg",
      maxDose: "10 mg",
      notes: "Administer at rate of 1 mg/minute. May repeat once after 5-10 minutes if needed."
    },
    doseRectal: {
      route: "PR",
      dose: "0.5 mg/kg",
      maxDose: "20 mg",
      notes: "For use when IV access not available"
    },
    cautions: "May cause respiratory depression, especially when co-administered with opioids. Have resuscitation equipment available.",
    preparation: "May administer undiluted for IV use",
    adverse: "Respiratory depression, hypotension, paradoxical excitation"
  },
  {
    id: "fentanyl",
    name: "Fentanyl",
    category: "analgesia",
    concentration: "50 mcg/mL",
    indication: "Moderate to severe pain, procedural sedation",
    doseGeneral: {
      route: "IV/IO",
      dose: "1-2 mcg/kg",
      maxDose: "50 mcg initial, 100 mcg total",
      notes: "Administer slowly over 3-5 minutes. May repeat half dose every 30-60 minutes as needed."
    },
    doseIntranasal: {
      route: "IN",
      dose: "1.5-2 mcg/kg",
      maxDose: "100 mcg",
      notes: "Use atomizer device. Split dose between nostrils."
    },
    cautions: "May cause respiratory depression. Have naloxone and airway equipment available. Use with caution in patients with hemodynamic instability.",
    preparation: "May administer undiluted for IV use",
    adverse: "Respiratory depression, hypotension, chest wall rigidity with rapid administration"
  },
  {
    id: "morphine",
    name: "Morphine",
    category: "analgesia",
    concentration: "1 mg/mL or 10 mg/mL",
    indication: "Moderate to severe pain",
    doseGeneral: {
      route: "IV/IO",
      dose: "0.1 mg/kg",
      maxDose: "5 mg initial, 10 mg total",
      notes: "Administer slowly over 5 minutes. May repeat every 10-30 minutes as needed."
    },
    cautions: "May cause respiratory depression and hypotension. Have naloxone and airway equipment available. Use with caution in patients with hemodynamic instability.",
    preparation: "Dilute 10 mg/mL concentration to 1 mg/mL with NS for pediatric use",
    adverse: "Respiratory depression, hypotension, pruritus, nausea, urinary retention"
  },
  {
    id: "calcium-chloride",
    name: "Calcium Chloride (10%)",
    category: "electrolyte",
    concentration: "100 mg/mL (10%)",
    indication: "Hyperkalemia with ECG changes, hypocalcemia, calcium channel blocker toxicity",
    doseGeneral: {
      route: "IV/IO",
      dose: "20 mg/kg",
      maxDose: "1 gram",
      notes: "Administer slowly over 5-10 minutes for non-arrest situations. May be given more rapidly in cardiac arrest."
    },
    cautions: "Avoid in patients taking digoxin. Extravasation can cause severe tissue necrosis. Do not mix with sodium bicarbonate.",
    preparation: "May administer undiluted through a central line or large vein",
    adverse: "Hypotension with rapid administration, tissue necrosis with extravasation"
  }
];

export default medications;
