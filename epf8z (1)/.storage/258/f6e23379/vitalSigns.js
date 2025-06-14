/**
 * Vital Signs Data
 * Contains structured data for normal vital signs parameters by age group
 */
const vitalSigns = {
  ageRanges: [
    {
      id: "newborn",
      label: "Newborn (0-28 days)",
      minAgeMonths: 0,
      maxAgeMonths: 1,
      heartRate: {
        normal: { min: 100, max: 180 },
        concerning: { min: 80, max: 200 },
        critical: { min: "<80", max: ">200" }
      },
      respiratoryRate: {
        normal: { min: 30, max: 60 },
        concerning: { min: 20, max: 70 },
        critical: { min: "<20", max: ">70" }
      },
      systolicBP: {
        normal: { min: 60, max: 90 },
        concerning: { min: 50, max: 100 },
        critical: { min: "<50", max: ">100" }
      },
      diastolicBP: {
        normal: { min: 30, max: 60 },
        concerning: { min: 25, max: 65 },
        critical: { min: "<25", max: ">65" }
      },
      oxygenSaturation: {
        normal: { min: 95, max: 100 },
        concerning: { min: 90, max: 94 },
        critical: { min: "<90", max: null }
      }
    },
    {
      id: "infant",
      label: "Infant (1-12 months)",
      minAgeMonths: 1,
      maxAgeMonths: 12,
      heartRate: {
        normal: { min: 100, max: 160 },
        concerning: { min: 80, max: 180 },
        critical: { min: "<80", max: ">180" }
      },
      respiratoryRate: {
        normal: { min: 25, max: 50 },
        concerning: { min: 20, max: 60 },
        critical: { min: "<20", max: ">60" }
      },
      systolicBP: {
        normal: { min: 70, max: 100 },
        concerning: { min: 60, max: 110 },
        critical: { min: "<60", max: ">110" }
      },
      diastolicBP: {
        normal: { min: 40, max: 65 },
        concerning: { min: 30, max: 75 },
        critical: { min: "<30", max: ">75" }
      },
      oxygenSaturation: {
        normal: { min: 95, max: 100 },
        concerning: { min: 90, max: 94 },
        critical: { min: "<90", max: null }
      }
    },
    {
      id: "toddler",
      label: "Toddler (1-3 years)",
      minAgeMonths: 12,
      maxAgeMonths: 36,
      heartRate: {
        normal: { min: 90, max: 150 },
        concerning: { min: 70, max: 170 },
        critical: { min: "<70", max: ">170" }
      },
      respiratoryRate: {
        normal: { min: 20, max: 40 },
        concerning: { min: 15, max: 45 },
        critical: { min: "<15", max: ">45" }
      },
      systolicBP: {
        normal: { min: 80, max: 110 },
        concerning: { min: 70, max: 120 },
        critical: { min: "<70", max: ">120" }
      },
      diastolicBP: {
        normal: { min: 40, max: 70 },
        concerning: { min: 30, max: 80 },
        critical: { min: "<30", max: ">80" }
      },
      oxygenSaturation: {
        normal: { min: 95, max: 100 },
        concerning: { min: 90, max: 94 },
        critical: { min: "<90", max: null }
      }
    },
    {
      id: "preschooler",
      label: "Preschooler (3-5 years)",
      minAgeMonths: 36,
      maxAgeMonths: 60,
      heartRate: {
        normal: { min: 80, max: 140 },
        concerning: { min: 65, max: 160 },
        critical: { min: "<65", max: ">160" }
      },
      respiratoryRate: {
        normal: { min: 18, max: 30 },
        concerning: { min: 14, max: 35 },
        critical: { min: "<14", max: ">35" }
      },
      systolicBP: {
        normal: { min: 90, max: 115 },
        concerning: { min: 80, max: 130 },
        critical: { min: "<80", max: ">130" }
      },
      diastolicBP: {
        normal: { min: 50, max: 75 },
        concerning: { min: 40, max: 85 },
        critical: { min: "<40", max: ">85" }
      },
      oxygenSaturation: {
        normal: { min: 95, max: 100 },
        concerning: { min: 90, max: 94 },
        critical: { min: "<90", max: null }
      }
    },
    {
      id: "school_age",
      label: "School Age (5-12 years)",
      minAgeMonths: 60,
      maxAgeMonths: 144,
      heartRate: {
        normal: { min: 70, max: 120 },
        concerning: { min: 60, max: 130 },
        critical: { min: "<60", max: ">130" }
      },
      respiratoryRate: {
        normal: { min: 16, max: 26 },
        concerning: { min: 14, max: 30 },
        critical: { min: "<14", max: ">30" }
      },
      systolicBP: {
        normal: { min: 95, max: 120 },
        concerning: { min: 90, max: 130 },
        critical: { min: "<90", max: ">130" }
      },
      diastolicBP: {
        normal: { min: 55, max: 80 },
        concerning: { min: 45, max: 90 },
        critical: { min: "<45", max: ">90" }
      },
      oxygenSaturation: {
        normal: { min: 95, max: 100 },
        concerning: { min: 90, max: 94 },
        critical: { min: "<90", max: null }
      }
    },
    {
      id: "adolescent",
      label: "Adolescent (12-18 years)",
      minAgeMonths: 144,
      maxAgeMonths: 216,
      heartRate: {
        normal: { min: 60, max: 100 },
        concerning: { min: 50, max: 120 },
        critical: { min: "<50", max: ">120" }
      },
      respiratoryRate: {
        normal: { min: 12, max: 20 },
        concerning: { min: 10, max: 30 },
        critical: { min: "<10", max: ">30" }
      },
      systolicBP: {
        normal: { min: 100, max: 130 },
        concerning: { min: 90, max: 140 },
        critical: { min: "<90", max: ">140" }
      },
      diastolicBP: {
        normal: { min: 60, max: 85 },
        concerning: { min: 50, max: 90 },
        critical: { min: "<50", max: ">90" }
      },
      oxygenSaturation: {
        normal: { min: 95, max: 100 },
        concerning: { min: 90, max: 94 },
        critical: { min: "<90", max: null }
      }
    }
  ],
  
  // Glasgow Coma Scale (GCS)
  glasgowComaScale: {
    eyeOpening: [
      { score: 4, adult: "Spontaneous", pediatric: "Spontaneous" },
      { score: 3, adult: "To voice", pediatric: "To voice" },
      { score: 2, adult: "To pain", pediatric: "To pain" },
      { score: 1, adult: "None", pediatric: "None" }
    ],
    verbalResponse: [
      { score: 5, adult: "Oriented", pediatric: "Appropriate words/social smile, fixes and follows" },
      { score: 4, adult: "Confused", pediatric: "Cries but consolable" },
      { score: 3, adult: "Inappropriate words", pediatric: "Persistently irritable" },
      { score: 2, adult: "Incomprehensible sounds", pediatric: "Restless, agitated" },
      { score: 1, adult: "None", pediatric: "None" }
    ],
    motorResponse: [
      { score: 6, adult: "Obeys commands", pediatric: "Normal spontaneous movements" },
      { score: 5, adult: "Localizes pain", pediatric: "Withdraws to touch" },
      { score: 4, adult: "Withdraws from pain", pediatric: "Withdraws from pain" },
      { score: 3, adult: "Flexion to pain", pediatric: "Flexion to pain" },
      { score: 2, adult: "Extension to pain", pediatric: "Extension to pain" },
      { score: 1, adult: "None", pediatric: "None" }
    ],
    interpretation: [
      { range: "13-15", severity: "Minor", recommendation: "Consider discharge if stable" },
      { range: "9-12", severity: "Moderate", recommendation: "Observe for deterioration" },
      { range: "3-8", severity: "Severe", recommendation: "Consider intubation and ventilation" }
    ]
  },
  
  // Pediatric Trauma Score
  pediatricTraumaScore: {
    size: [
      { score: 2, description: ">20 kg" },
      { score: 1, description: "10-20 kg" },
      { score: -1, description: "<10 kg" }
    ],
    airway: [
      { score: 2, description: "Normal" },
      { score: 1, description: "Maintainable" },
      { score: -1, description: "Unmaintainable" }
    ],
    systolicBP: [
      { score: 2, description: ">90 mmHg" },
      { score: 1, description: "50-90 mmHg" },
      { score: -1, description: "<50 mmHg" }
    ],
    cns: [
      { score: 2, description: "Awake" },
      { score: 1, description: "Obtunded/LOC" },
      { score: -1, description: "Coma/Decerebrate" }
    ],
    openWound: [
      { score: 2, description: "None" },
      { score: 1, description: "Minor" },
      { score: -1, description: "Major/Penetrating" }
    ],
    fractures: [
      { score: 2, description: "None" },
      { score: 1, description: "Single/Closed" },
      { score: -1, description: "Multiple/Open" }
    ],
    interpretation: [
      { score: "9-12", recommendation: "Minor trauma" },
      { score: "6-8", recommendation: "Potentially serious trauma" },
      { score: "<6", recommendation: "Life-threatening trauma" }
    ]
  },
  
  // Weight estimation by age for Broselow tape approximation
  weightEstimation: [
    { ageMonths: 0, weight: 3.5 },
    { ageMonths: 3, weight: 5.5 },
    { ageMonths: 6, weight: 7.5 },
    { ageMonths: 9, weight: 9.0 },
    { ageMonths: 12, weight: 10.0 },
    { ageMonths: 18, weight: 11.5 },
    { ageMonths: 24, weight: 12.5 },
    { ageMonths: 36, weight: 14.0 },
    { ageMonths: 48, weight: 16.0 },
    { ageMonths: 60, weight: 18.0 },
    { ageMonths: 72, weight: 20.0 },
    { ageMonths: 84, weight: 23.0 },
    { ageMonths: 96, weight: 26.0 },
    { ageMonths: 108, weight: 28.0 },
    { ageMonths: 120, weight: 32.0 },
    { ageMonths: 132, weight: 36.0 },
    { ageMonths: 144, weight: 40.0 },
    { ageMonths: 168, weight: 50.0 }
  ]
};

export default vitalSigns;