/**
 * medications.js
 * This file contains medication data for pediatric emergency dosing
 */

export const medications = [
  {
    id: 'epinephrine',
    name: 'Epinephrine',
    category: 'emergency',
    indication: 'Cardiac arrest, severe allergic reaction',
    concentration: '1 mg/10 mL (0.1 mg/mL)',
    standardDose: '0.01 mg/kg (0.1 mL/kg)',
    dosePerKg: 0.01,
    maxDose: 1,
    doseUnit: 'mg',
    notes: 'Maximum single dose: 1 mg. Repeat every 3-5 min as needed during cardiac arrest.'
  },
  {
    id: 'epinephrine-racemic',
    name: 'Epinephrine (Racemic)',
    category: 'emergency',
    indication: 'Croup, stridor',
    concentration: '2.25% solution',
    standardDose: '0.05 mL/kg (min 0.25 mL, max 0.5 mL) in 3 mL NS',
    dosePerKg: 0.05,
    maxDose: 0.5,
    doseUnit: 'mL',
    notes: 'Administered via nebulizer. May repeat every 15-20 minutes as needed.'
  },
  {
    id: 'amiodarone',
    name: 'Amiodarone',
    category: 'resuscitation',
    indication: 'VF/pulseless VT refractory to defibrillation',
    concentration: '50 mg/mL',
    standardDose: '5 mg/kg',
    dosePerKg: 5,
    maxDose: 300,
    doseUnit: 'mg',
    notes: 'Maximum single dose: 300 mg. For perfusing rhythms, give over 20-60 minutes.'
  },
  {
    id: 'adenosine',
    name: 'Adenosine',
    category: 'emergency',
    indication: 'SVT',
    concentration: '3 mg/mL',
    standardDose: '0.1 mg/kg (first dose), 0.2 mg/kg (subsequent)',
    dosePerKg: 0.1,
    maxDose: 6,
    doseUnit: 'mg',
    notes: 'First dose: 0.1 mg/kg (max 6 mg). Second dose: 0.2 mg/kg (max 12 mg). Rapid IV push with saline flush.'
  },
  {
    id: 'atropine',
    name: 'Atropine',
    category: 'emergency',
    indication: 'Symptomatic bradycardia, nerve agent exposure',
    concentration: '0.1 mg/mL',
    standardDose: '0.02 mg/kg',
    dosePerKg: 0.02,
    maxDose: 0.5,
    doseUnit: 'mg',
    notes: 'Minimum dose: 0.1 mg. Maximum single dose: 0.5 mg for child, 1 mg for adolescent. May repeat once.'
  },
  {
    id: 'calcium-chloride',
    name: 'Calcium Chloride 10%',
    category: 'emergency',
    indication: 'Hyperkalemia, calcium channel blocker toxicity, hypocalcemia',
    concentration: '100 mg/mL',
    standardDose: '20 mg/kg',
    dosePerKg: 20,
    maxDose: 2000,
    doseUnit: 'mg',
    notes: 'Administer slowly. DO NOT mix with sodium bicarbonate.'
  },
  {
    id: 'dextrose',
    name: 'Dextrose 10%',
    category: 'emergency',
    indication: 'Hypoglycemia',
    concentration: '100 mg/mL',
    standardDose: '5 mL/kg',
    dosePerKg: 0.5, // 0.5 g/kg or 5 mL/kg of D10W
    maxDose: 25,
    doseUnit: 'g',
    notes: 'For neonates: use D10W (2-4 mL/kg)'
  },
  {
    id: 'diazepam',
    name: 'Diazepam',
    category: 'seizure',
    indication: 'Status epilepticus',
    concentration: '5 mg/mL',
    standardDose: '0.2-0.5 mg/kg',
    dosePerKg: 0.3,
    maxDose: 10,
    doseUnit: 'mg',
    notes: 'May repeat in 5-10 minutes if needed. Maximum dose: 10 mg.'
  },
  {
    id: 'fentanyl',
    name: 'Fentanyl',
    category: 'analgesia',
    indication: 'Pain management',
    concentration: '50 mcg/mL',
    standardDose: '1-2 mcg/kg',
    dosePerKg: 1,
    maxDose: 50,
    doseUnit: 'mcg',
    notes: 'Slow IV push. May cause respiratory depression and hypotension.'
  },
  {
    id: 'glucagon',
    name: 'Glucagon',
    category: 'emergency',
    indication: 'Hypoglycemia, beta-blocker or calcium-channel blocker toxicity',
    concentration: '1 mg/mL after reconstitution',
    standardDose: '0.03-0.1 mg/kg',
    dosePerKg: 0.05,
    maxDose: 1,
    doseUnit: 'mg',
    notes: 'For hypoglycemia: < 20kg: 0.5mg, >20kg: 1mg. For toxicity: may need higher doses.'
  },
  {
    id: 'lidocaine',
    name: 'Lidocaine',
    category: 'resuscitation',
    indication: 'VF/pulseless VT refractory to defibrillation and amiodarone',
    concentration: '20 mg/mL',
    standardDose: '1 mg/kg',
    dosePerKg: 1,
    maxDose: 100,
    doseUnit: 'mg',
    notes: 'Maximum dose: 100 mg. May repeat 0.5-0.75 mg/kg in 5-10 minutes up to 3 mg/kg total.'
  },
  {
    id: 'magnesium-sulfate',
    name: 'Magnesium Sulfate',
    category: 'emergency',
    indication: 'Torsades de pointes, severe asthma, hypomagnesemia',
    concentration: '500 mg/mL (50%)',
    standardDose: '25-50 mg/kg',
    dosePerKg: 25,
    maxDose: 2000,
    doseUnit: 'mg',
    notes: 'Maximum dose: 2 g. Administer slowly over 10-20 minutes (faster in cardiac arrest).'
  },
  {
    id: 'methylprednisolone',
    name: 'Methylprednisolone',
    category: 'emergency',
    indication: 'Status asthmaticus, allergic reaction, croup, bronchospasm',
    concentration: '62.5 mg/mL after reconstitution',
    standardDose: '2 mg/kg',
    dosePerKg: 2,
    maxDose: 60,
    doseUnit: 'mg',
    notes: 'Maximum dose: 60 mg. May repeat every 6 hours as needed.'
  },
  {
    id: 'midazolam',
    name: 'Midazolam',
    category: 'sedation',
    indication: 'Sedation, seizures',
    concentration: '5 mg/mL',
    standardDose: '0.1 mg/kg',
    dosePerKg: 0.1,
    maxDose: 5,
    doseUnit: 'mg',
    notes: 'May repeat every 5-10 minutes as needed. Maximum single dose: 5 mg.'
  },
  {
    id: 'morphine',
    name: 'Morphine',
    category: 'analgesia',
    indication: 'Pain management',
    concentration: '10 mg/mL',
    standardDose: '0.1 mg/kg',
    dosePerKg: 0.1,
    maxDose: 5,
    doseUnit: 'mg',
    notes: 'Slow IV push. May cause respiratory depression and hypotension.'
  },
  {
    id: 'naloxone',
    name: 'Naloxone',
    category: 'emergency',
    indication: 'Opioid overdose',
    concentration: '0.4 mg/mL',
    standardDose: '0.1 mg/kg',
    dosePerKg: 0.1,
    maxDose: 2,
    doseUnit: 'mg',
    notes: 'Maximum single dose: 2 mg. May need to repeat doses. Duration of action may be shorter than opioid effect.'
  },
  {
    id: 'phenobarbital',
    name: 'Phenobarbital',
    category: 'seizure',
    indication: 'Status epilepticus',
    concentration: '130 mg/mL',
    standardDose: '20 mg/kg',
    dosePerKg: 20,
    maxDose: 1000,
    doseUnit: 'mg',
    notes: 'Loading dose. Administer at maximum rate of 1 mg/kg/min. May give additional 5-10 mg/kg doses.'
  },
  {
    id: 'sodium-bicarbonate',
    name: 'Sodium Bicarbonate',
    category: 'emergency',
    indication: 'Severe metabolic acidosis, tricyclic antidepressant toxicity',
    concentration: '1 mEq/mL',
    standardDose: '1 mEq/kg',
    dosePerKg: 1,
    maxDose: 50,
    doseUnit: 'mEq',
    notes: 'Not routinely recommended in cardiac arrest. DO NOT mix with calcium salts.'
  }
];

export default medications;
