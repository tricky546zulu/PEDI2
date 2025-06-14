/**
 * vitalSigns.js
 * This file contains normal vital signs ranges for different pediatric age groups
 */

export const vitalSigns = [
  {
    id: 'newborn',
    label: 'Newborn',
    ageRange: '0-1 month',
    hrRange: [100, 160],
    rrRange: [30, 60],
    sbpRange: [60, 90],
    dbpRange: [30, 60],
    weightRange: [2, 5],
    notes: 'HR increases with crying; BP varies with state (sleep/awake)'
  },
  {
    id: 'infant',
    label: 'Infant',
    ageRange: '1-12 months',
    hrRange: [90, 150],
    rrRange: [25, 40],
    sbpRange: [70, 100],
    dbpRange: [45, 65],
    weightRange: [4, 10],
    notes: 'Weight (kg) can be estimated as age in months + 4 for first few months'
  },
  {
    id: 'toddler',
    label: 'Toddler',
    ageRange: '1-3 years',
    hrRange: [80, 140],
    rrRange: [20, 30],
    sbpRange: [80, 110],
    dbpRange: [50, 70],
    weightRange: [10, 15],
    notes: 'Normal systolic BP: ~90 + (age in years × 2)'
  },
  {
    id: 'preschooler',
    label: 'Preschooler',
    ageRange: '3-5 years',
    hrRange: [70, 120],
    rrRange: [20, 25],
    sbpRange: [90, 110],
    dbpRange: [55, 70],
    weightRange: [14, 18],
    notes: ''
  },
  {
    id: 'school-age',
    label: 'School Age',
    ageRange: '6-12 years',
    hrRange: [70, 110],
    rrRange: [15, 20],
    sbpRange: [95, 120],
    dbpRange: [55, 80],
    weightRange: [20, 42],
    notes: ''
  },
  {
    id: 'adolescent',
    label: 'Adolescent',
    ageRange: '13-18 years',
    hrRange: [60, 100],
    rrRange: [12, 20],
    sbpRange: [110, 135],
    dbpRange: [60, 85],
    weightRange: [40, 70],
    notes: 'Adult values increasingly apply as teens approach maturity'
  }
];

// Weight estimation formulae
export const weightEstimation = {
  // Broselow Tape colors and weight ranges
  broselow: [
    { color: 'Grey', weightRange: [3, 5], length: [46, 60] },
    { color: 'Pink', weightRange: [6, 7], length: [61, 67] },
    { color: 'Red', weightRange: [8, 9], length: [68, 75] },
    { color: 'Purple', weightRange: [10, 11], length: [76, 84] },
    { color: 'Yellow', weightRange: [12, 14], length: [85, 97] },
    { color: 'White', weightRange: [15, 18], length: [98, 109] },
    { color: 'Blue', weightRange: [19, 22], length: [110, 121] },
    { color: 'Orange', weightRange: [23, 29], length: [122, 134] },
    { color: 'Green', weightRange: [30, 36], length: [135, 146] }
  ],

  // Age-based weight estimation formulae
  formulae: {
    // (Age in years + 4) x 2
    standard: (ageYears) => (ageYears + 4) * 2,

    // For infants < 12 months: Weight (kg) = (Age in months + 9) / 2
    infant: (ageMonths) => (ageMonths + 9) / 2,

    // Advanced Pediatric Life Support (APLS) formula
    apls: (ageYears) => (ageYears + 4) * 2,

    // European Resuscitation Council
    erc: (ageYears) => 5 + (2 * ageYears),

    // Luscombe formula
    luscombe: (ageYears) => 3 * (ageYears + 2)
  },

  // Ideal body weight
  idealBodyWeight: (heightCm) => {
    if (heightCm < 60) return 2.5; // Premature
    if (heightCm < 75) return 4 + ((heightCm - 60) * 0.11); // Infant formula
    return 8 + ((heightCm - 75) * 0.23); // Children > 75cm formula
  }
};

// Normal blood pressure by age (for reference)
export const normalBloodPressure = (ageYears) => {
  // Return systolic minimum
  return 90 + (2 * ageYears);
};

// Get vitals based on age in months
export const getVitalSignsForAge = (ageMonths) => {
  if (ageMonths <= 1) return vitalSigns.find(v => v.id === 'newborn');
  if (ageMonths <= 12) return vitalSigns.find(v => v.id === 'infant');
  if (ageMonths <= 36) return vitalSigns.find(v => v.id === 'toddler');
  if (ageMonths <= 60) return vitalSigns.find(v => v.id === 'preschooler');
  if (ageMonths <= 144) return vitalSigns.find(v => v.id === 'school-age');
  return vitalSigns.find(v => v.id === 'adolescent');
};

export default vitalSigns;
