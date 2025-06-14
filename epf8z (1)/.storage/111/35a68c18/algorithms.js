// PALS Algorithms Data
const algorithms = [
  {
    id: 'pulseless-arrest',
    title: 'Pulseless Arrest Algorithm',
    category: 'cardiac arrest',
    patientType: 'pediatric',
    description: 'Algorithm for managing pediatric pulseless arrest (cardiac arrest).',
    steps: [
      {
        text: 'Verify pulselessness (≤10 seconds)',
        critical: 'Begin CPR if pulse is absent or <60 bpm with signs of poor perfusion',
        details: 'Check brachial pulse in infant, carotid or femoral pulse in child',
      },
      {
        text: 'Begin high-quality CPR',
        details: 'Push hard (≥⅓ AP diameter) and fast (100-120/min), allow complete chest recoil',
        substeps: [
          'Compression to ventilation ratio: 15:2 (two rescuers), 30:2 (single rescuer)',
          'Attach monitor/defibrillator as soon as available'
        ]
      },
      {
        text: 'Rhythm shockable?',
        details: 'Check rhythm every 2 minutes',
      },
      {
        text: 'VF/pVT: Deliver shock',
        details: '2 J/kg, increase to 4 J/kg for subsequent shocks (maximum 10 J/kg or adult dose)',
        note: 'Use pediatric pads for children <8 years if available'
      },
      {
        text: 'Resume CPR immediately for 2 minutes',
        details: 'Minimize interruptions in chest compressions',
        substeps: [
          'IO/IV access as soon as possible',
          'Consider advanced airway',
          'Continuous capnography if advanced airway placed',
          'Pulse and rhythm check every 2 minutes'
        ]
      },
      {
        text: 'Administer epinephrine',
        details: 'IO/IV: 0.01 mg/kg (0.1 mL/kg of 0.1 mg/mL concentration). Maximum dose: 1 mg',
        note: 'Repeat every 3-5 minutes'
      },
      {
        text: 'Consider advanced airway and capnography',
        details: 'If advanced airway in place: continuous CPR at 100-120/min with ventilation every 6 seconds (10 breaths/min)'
      },
      {
        text: 'Treat reversible causes',
        details: 'Hypovolemia, Hypoxia, Hydrogen ion (acidosis), Hypo/hyperkalemia, Hypothermia, Toxins, Tamponade (cardiac), Tension pneumothorax, Thrombosis (coronary or pulmonary), Trauma',
      }
    ],
    notes: 'For pediatric patients, cardiac arrest is more often due to respiratory failure and decompensated shock rather than a primary cardiac event.',
    references: [
      'Pediatric Advanced Life Support Provider Manual, American Heart Association, 2020',
      'Part 6: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care'
    ]
  },
  {
    id: 'bradycardia-algorithm',
    title: 'Bradycardia with Pulse Algorithm',
    category: 'bradycardia',
    patientType: 'pediatric',
    description: 'Algorithm for managing bradycardia with a pulse and poor perfusion in pediatric patients.',
    steps: [
      {
        text: 'Identify bradycardia with pulse and poor perfusion',
        details: 'Heart rate below normal for age with signs of poor systemic perfusion',
        substeps: [
          'Maintain patent airway',
          'Assist breathing as necessary',
          'Administer oxygen',
          'Attach monitor/defibrillator'
        ]
      },
      {
        text: 'Is bradycardia causing cardiorespiratory compromise?',
        details: 'Look for signs: hypotension, acutely altered mental status, signs of shock',
        critical: 'If severe cardiorespiratory compromise, proceed quickly through algorithm'
      },
      {
        text: 'Perform CPR if HR <60/min with poor perfusion despite oxygenation and ventilation',
        details: 'Begin chest compressions if heart rate <60/min with signs of poor perfusion despite adequate oxygenation and ventilation'
      },
      {
        text: 'Ensure vascular access (IV/IO)',
        details: 'Establish IV/IO access for medication administration'
      },
      {
        text: 'Administer epinephrine',
        details: 'IO/IV: 0.01 mg/kg (0.1 mL/kg of 0.1 mg/mL concentration). Maximum dose: 1 mg',
        note: 'Repeat every 3-5 minutes as needed'
      },
      {
        text: 'Consider atropine for increased vagal tone or primary AV block',
        details: 'IO/IV: 0.02 mg/kg. Minimum dose: 0.1 mg, Maximum single dose: 0.5 mg',
        note: 'May repeat once if needed'
      },
      {
        text: 'Consider cardiac pacing if unresponsive to medical interventions',
        details: 'Transcutaneous pacing if available',
      },
      {
        text: 'Treat underlying causes',
        details: 'Hypoxia, Hypothermia, Head injury, Heart block, Heart transplant rejection, Toxins/poisons/drugs, Electrolyte abnormalities'
      }
    ],
    notes: 'Bradycardia in children is more commonly due to hypoxia than primary cardiac disease.',
    references: [
      'Pediatric Advanced Life Support Provider Manual, American Heart Association, 2020',
      'Part 6: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care'
    ]
  },
  {
    id: 'tachycardia-svt',
    title: 'Tachycardia with Pulse - SVT Algorithm',
    category: 'tachycardia',
    patientType: 'pediatric',
    description: 'Algorithm for managing supraventricular tachycardia (SVT) in pediatric patients.',
    steps: [
      {
        text: 'Identify tachycardia with pulse',
        details: 'Heart rate above normal for age',
        substeps: [
          'Maintain patent airway',
          'Assist breathing as necessary',
          'Administer oxygen',
          'Attach monitor/defibrillator'
        ]
      },
      {
        text: 'Evaluate QRS duration',
        details: 'Narrow QRS (≤0.09 sec) is likely Supraventricular Tachycardia (SVT)',
        note: 'If wide QRS (>0.09 sec), follow Ventricular Tachycardia algorithm'
      },
      {
        text: 'Assess for hemodynamic instability',
        details: 'Look for signs: hypotension, acutely altered mental status, signs of shock',
        critical: 'If unstable with severe compromise, proceed to synchronized cardioversion'
      },
      {
        text: 'If stable: Attempt vagal maneuvers',
        details: 'Appropriate maneuvers include ice to face (without occluding airway)'
      },
      {
        text: 'Administer adenosine if IV/IO access available',
        details: 'First dose: 0.1 mg/kg (maximum: 6 mg)',
        substeps: [
          'Follow with rapid saline flush',
          'If no response, give second dose: 0.2 mg/kg (maximum: 12 mg)'
        ]
      },
      {
        text: 'If unstable: Perform synchronized cardioversion',
        details: 'Synchronized cardioversion: 0.5-1 J/kg',
        note: 'Sedate if possible, but don\'t delay cardioversion',
        substeps: [
          'If not effective, increase to 2 J/kg'
        ]
      },
      {
        text: 'Consider antiarrhythmic medication',
        details: 'Consult pediatric cardiologist if available',
        substeps: [
          'Amiodarone: 5 mg/kg IV/IO over 20-60 min',
          'Or procainamide: 15 mg/kg IV/IO over 30-60 min',
          'Do not routinely administer amiodarone and procainamide together'
        ]
      }
    ],
    notes: 'SVT is the most common symptomatic tachyarrhythmia in infants and children.',
    references: [
      'Pediatric Advanced Life Support Provider Manual, American Heart Association, 2020',
      'Part 6: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care'
    ]
  },
  {
    id: 'tachycardia-vt',
    title: 'Tachycardia with Pulse - VT Algorithm',
    category: 'tachycardia',
    patientType: 'pediatric',
    description: 'Algorithm for managing ventricular tachycardia (VT) with a pulse in pediatric patients.',
    steps: [
      {
        text: 'Identify tachycardia with pulse',
        details: 'Heart rate above normal for age',
        substeps: [
          'Maintain patent airway',
          'Assist breathing as necessary',
          'Administer oxygen',
          'Attach monitor/defibrillator'
        ]
      },
      {
        text: 'Evaluate QRS duration',
        details: 'Wide QRS (>0.09 sec) suggests Ventricular Tachycardia',
        note: 'Consider expert consultation'
      },
      {
        text: 'Assess for hemodynamic instability',
        details: 'Look for signs: hypotension, acutely altered mental status, signs of shock',
        critical: 'If unstable with severe compromise, proceed to synchronized cardioversion immediately'
      },
      {
        text: 'If unstable: Perform synchronized cardioversion',
        details: 'Synchronized cardioversion: 0.5-1 J/kg',
        note: 'Sedate if possible, but don\'t delay cardioversion',
        substeps: [
          'If not effective, increase to 2 J/kg'
        ]
      },
      {
        text: 'If stable: Consider antiarrhythmic medication',
        details: 'Consult pediatric cardiologist if available',
        substeps: [
          'Amiodarone: 5 mg/kg IV/IO over 20-60 min',
          'Or procainamide: 15 mg/kg IV/IO over 30-60 min',
          'Do not routinely administer amiodarone and procainamide together'
        ]
      },
      {
        text: 'Consider underlying causes',
        details: 'Medication toxicity, cardiomyopathy, myocarditis, electrolyte imbalances, prolonged QT syndrome, cardiac surgery'
      }
    ],
    notes: 'In pediatrics, most wide complex tachycardias are supraventricular in origin with aberrant conduction. True VT is rare in children without heart disease.',
    references: [
      'Pediatric Advanced Life Support Provider Manual, American Heart Association, 2020',
      'Part 6: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care'
    ]
  },
  {
    id: 'post-cardiac-arrest',
    title: 'Post-Cardiac Arrest Care Algorithm',
    category: 'post resuscitation',
    patientType: 'pediatric',
    description: 'Algorithm for post-resuscitation care after return of spontaneous circulation (ROSC) in pediatric patients.',
    steps: [
      {
        text: 'Return of Spontaneous Circulation (ROSC)',
        critical: 'Continue post-cardiac arrest care immediately',
        details: 'Verify pulse and blood pressure, continuously monitor oxygenation and ventilation'
      },
      {
        text: 'Optimize ventilation and oxygenation',
        details: 'Maintain oxygen saturation 94-99%',
        substeps: [
          'Avoid excessive ventilation',
          'Consider advanced airway if not already in place',
          'Maintain normal PaCO2 (35-45 mm Hg)'
        ]
      },
      {
        text: 'Treat hypotension',
        details: 'Systolic BP should be maintained at least above the 5th percentile for age',
        substeps: [
          'Fluid bolus: 10-20 mL/kg',
          'Consider vasopressors: epinephrine, dopamine, norepinephrine',
          'Monitor for signs of fluid overload'
        ]
      },
      {
        text: 'Consider targeted temperature management',
        details: 'For children who remain comatose after cardiac arrest',
        note: 'Target of 32-34°C (89.6-93.2°F) for 48 hours OR target of 36°C (96.8°F)'
      },
      {
        text: 'Perform 12-lead ECG',
        details: 'Look for ST-segment changes, prolonged QT, or other abnormalities'
      },
      {
        text: 'Obtain laboratory tests',
        details: 'Blood gases, electrolytes, glucose, calcium, lactate, complete blood count, coagulation studies'
      },
      {
        text: 'Consider causes and treat',
        details: 'Address reversible causes that may have led to arrest',
        substeps: [
          'Hypoxemia, Hypovolemia, Hydrogen ion (acidosis), Hypo/hyperkalemia',
          'Hypothermia, Tension pneumothorax, Tamponade (cardiac)',
          'Toxins, Thrombosis (coronary or pulmonary), Trauma'
        ]
      },
      {
        text: 'Consider advanced critical care consultation and transport',
        details: 'Transfer to a pediatric tertiary care facility with critical care capabilities when feasible'
      }
    ],
    notes: 'No single intervention during post-cardiac arrest care has been proven to improve neurological outcome, but the bundle of care is beneficial.',
    references: [
      'Pediatric Advanced Life Support Provider Manual, American Heart Association, 2020',
      'Part 6: Pediatric Basic and Advanced Life Support: 2020 American Heart Association Guidelines for Cardiopulmonary Resuscitation and Emergency Cardiovascular Care'
    ]
  }
];

export default algorithms;