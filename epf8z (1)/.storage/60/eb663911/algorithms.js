/**
 * algorithms.js
 * This file contains the PALS algorithm data for the application
 */

export const algorithms = [
  {
    id: 'cardiac-arrest',
    title: 'Pediatric Cardiac Arrest',
    category: 'cardiac arrest',
    patientType: 'All Pediatric Patients',
    steps: [
      { text: 'Start high-quality CPR', details: '100-120 compressions per minute, 1/3 AP chest diameter' },
      { text: 'Attach monitor/defibrillator', details: 'Check rhythm' },
      { text: 'Assess rhythm: Shockable or Non-shockable?' },
      { text: 'Continue CPR while preparing for next steps', details: 'Minimize interruptions' },
      { text: 'Establish vascular access (IV/IO)', details: 'For medication administration' },
      { text: 'Consider advanced airway', details: 'If personnel skilled in placement are available' },
      { text: 'Consider reversible causes', details: 'Hypovolemia, Hypoxia, Hydrogen ion (acidosis), Hypo/hyperkalemia, Hypothermia, Toxins, Tamponade, Tension pneumothorax, Thrombosis' }
    ],
    notes: 'Prioritize high-quality CPR with minimal interruptions',
    additionalInfo: 'For pediatric patients, begin with chest compressions (C-A-B sequence) at a rate of 100-120 compressions/minute. Use a compression-to-ventilation ratio of 30:2 for single rescuers and 15:2 for 2 rescuers.',
    imageUrl: '/assets/images/pals_cardiac_arrest.png'
  },
  {
    id: 'vfib-pulseless-vtach',
    title: 'VF/Pulseless VT',
    category: 'cardiac arrest',
    patientType: 'Pediatric Shockable Rhythms',
    steps: [
      { text: 'Shock: 2 J/kg', details: 'Immediately resume CPR after shock' },
      { text: 'Epinephrine every 3-5 min: 0.01 mg/kg (0.1 mL/kg of 1:10,000)', details: 'Maximum single dose: 1 mg' },
      { text: 'Consider advanced airway and capnography', details: 'If skilled provider available' },
      { text: 'Shock: 4 J/kg', details: 'Immediately resume CPR after shock' },
      { text: 'Amiodarone or Lidocaine', details: 'Amiodarone: 5 mg/kg (max 300 mg), Lidocaine: 1 mg/kg (max 100 mg)' },
      { text: 'Continue CPR, drugs, and shock cycles', details: 'Treat reversible causes' }
    ],
    notes: 'Maximum epinephrine dose: 1 mg',
    additionalInfo: 'For refractory VF/pulseless VT, consider escalating defibrillation energy, changing pad position or defibrillator, and double sequential defibrillation if available.',
    imageUrl: '/assets/images/pals_vf_vt.png'
  },
  {
    id: 'pea-asystole',
    title: 'PEA/Asystole',
    category: 'cardiac arrest',
    patientType: 'Pediatric Non-shockable Rhythms',
    steps: [
      { text: 'Continue CPR', details: '2 minutes of uninterrupted compressions' },
      { text: 'Epinephrine every 3-5 min: 0.01 mg/kg (0.1 mL/kg of 1:10,000)', details: 'Maximum single dose: 1 mg' },
      { text: 'Consider advanced airway and capnography', details: 'If skilled provider available' },
      { text: 'Reassess rhythm every 2 minutes', details: 'Brief pulse/rhythm check' },
      { text: 'Continue CPR and drugs', details: 'Treat reversible causes' }
    ],
    notes: 'Identify and treat possible causes: Hypovolemia, Hypoxia, Hydrogen ion (acidosis), Hypo/hyperkalemia, Hypothermia, Toxins, Tamponade, Tension pneumothorax, Thrombosis (pulmonary/coronary)',
    additionalInfo: 'In PEA, focus on identifying and treating underlying causes. Consider bedside ultrasound if available to identify specific causes.',
    imageUrl: '/assets/images/pals_pea_asystole.png'
  },
  {
    id: 'bradycardia',
    title: 'Bradycardia with Pulse',
    category: 'bradycardia',
    patientType: 'Symptomatic Pediatric Patients',
    steps: [
      { text: 'Support ABCs', details: 'Give oxygen if needed' },
      { text: 'If HR < 60/min with poor perfusion despite oxygenation/ventilation, start CPR', details: '15:2 ratio (2 rescuers)' },
      { text: 'Reassess after 2 minutes', details: 'Check pulse and rhythm' },
      { text: 'Epinephrine: 0.01 mg/kg (0.1 mL/kg of 1:10,000) IV/IO, or 0.1 mg/kg (0.1 mL/kg of 1:1,000) ET', details: 'Repeat every 3-5 minutes as needed' },
      { text: 'Atropine: 0.02 mg/kg IV/IO', details: 'Minimum dose: 0.1 mg, Maximum single dose: 0.5 mg child, 1 mg adolescent' }
    ],
    notes: 'Consider atropine for increased vagal tone or primary AV block',
    additionalInfo: 'Bradycardia in children is often due to hypoxia. Ensure adequate oxygenation and ventilation before moving to medications.',
    imageUrl: '/assets/images/pals_bradycardia.png'
  },
  {
    id: 'tachycardia-stable',
    title: 'Tachycardia with Pulse (Stable)',
    category: 'tachycardia',
    patientType: 'Stable Pediatric Patients',
    steps: [
      { text: 'Identify and treat underlying causes', details: 'Fever, pain, dehydration, etc.' },
      { text: 'Evaluate 12-lead ECG', details: 'QRS duration < 0.09s (narrow) or ≥ 0.09s (wide)' },
      { text: 'For narrow QRS: Consider vagal maneuvers', details: 'If appropriate based on patient condition' },
      { text: 'For narrow QRS: Adenosine if SVT likely', details: 'First dose: 0.1 mg/kg (max 6 mg), Second dose: 0.2 mg/kg (max 12 mg)' },
      { text: 'For wide QRS: Consider expert consultation', details: 'May be SVT with aberrancy or VT' }
    ],
    notes: 'Consult pediatric cardiology or emergency medicine for further management',
    additionalInfo: 'For SVT with narrow QRS, adenosine should be given as a rapid IV push followed by a saline flush. Consider sedation before cardioversion in stable patients.',
    imageUrl: '/assets/images/pals_tach_stable.png'
  },
  {
    id: 'tachycardia-unstable',
    title: 'Tachycardia with Pulse (Unstable)',
    category: 'tachycardia',
    patientType: 'Unstable Pediatric Patients',
    steps: [
      { text: 'Immediate synchronized cardioversion: 0.5-1 J/kg', details: 'Sedate if possible without delaying cardioversion' },
      { text: 'If ineffective, increase to 2 J/kg', details: 'Ensure proper pad placement and contact' },
      { text: 'Consider adenosine for suspected SVT: 0.1 mg/kg (max 6mg) rapid IV push', details: 'If IV access readily available and delay in cardioversion won\'t harm patient' },
      { text: 'Consider antiarrhythmics', details: 'Amiodarone 5 mg/kg IV/IO over 20-60 minutes' },
      { text: 'Treat underlying causes', details: 'Electrolyte abnormalities, toxins, etc.' }
    ],
    notes: 'Unstable signs include altered mental status, poor perfusion, hypotension',
    additionalInfo: 'Signs of instability in pediatric tachycardia include hypotension, acutely altered mental status, signs of shock, or acute heart failure. Immediate synchronized cardioversion is indicated for unstable patients.',
    imageUrl: '/assets/images/pals_tach_unstable.png'
  },
  {
    id: 'post-resuscitation',
    title: 'Post-Resuscitation Care',
    category: 'post resuscitation',
    patientType: 'Post-Cardiac Arrest Patients',
    steps: [
      { text: 'Support oxygenation and ventilation', details: 'Avoid excessive ventilation' },
      { text: 'Maintain BP with fluids and vasoactive drugs if needed', details: 'Target age-appropriate systolic BP' },
      { text: 'Monitor temperature', details: 'Prevent/treat fever' },
      { text: 'Check blood glucose and maintain normal range', details: 'Target 80-110 mg/dL' },
      { text: 'Treat recurrent dysrhythmias', details: 'As per appropriate algorithm' },
      { text: 'Consider targeted temperature management', details: 'For comatose patients' }
    ],
    notes: 'Consider targeted temperature management for patients who remain comatose',
    additionalInfo: 'In post-resuscitation care, maintain normoxemia (SpO2 94-99%) and normocapnia (ETCO2 35-40 mmHg). Avoid hypotension and aim for age-appropriate blood pressure values.',
    imageUrl: '/assets/images/pals_post_resuscitation.png'
  }
];

export default algorithms;
