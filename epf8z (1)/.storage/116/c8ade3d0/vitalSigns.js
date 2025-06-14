// Normal vital signs data by age group for pediatric emergency care
const vitalSigns = [
  {
    id: "neonate",
    label: "Neonate (0-30 days)",
    ageRange: [0, 1],
    weightRange: [3, 5],
    heartRate: {
      low: 100,
      normal: "120-160",
      high: 180,
      units: "bpm",
      notes: "Lower rates during sleep"
    },
    respiratoryRate: {
      low: 30,
      normal: "40-60",
      high: 60,
      units: "breaths/min"
    },
    systolicBP: {
      low: 60,
      normal: "65-85",
      high: 90,
      units: "mmHg",
      notes: "Mean arterial pressure (MAP) should be >35 mmHg in term infants"
    },
    diastolicBP: {
      low: 30,
      normal: "35-45",
      high: 50,
      units: "mmHg"
    },
    oxygenSaturation: {
      low: 92,
      normal: "95-100",
      units: "%"
    },
    temperature: {
      low: 36.5,
      normal: "36.5-37.5",
      high: 37.9,
      units: "°C",
      notes: "Axillary temperature is typically 0.5°C lower than rectal"
    }
  },
  {
    id: "infant-1-12mo",
    label: "Infant (1-12 months)",
    ageRange: [1, 12],
    weightRange: [4, 10],
    heartRate: {
      low: 80,
      normal: "100-160",
      high: 180,
      units: "bpm"
    },
    respiratoryRate: {
      low: 25,
      normal: "30-50",
      high: 55,
      units: "breaths/min"
    },
    systolicBP: {
      low: 70,
      normal: "80-100",
      high: 110,
      units: "mmHg"
    },
    diastolicBP: {
      low: 35,
      normal: "45-65",
      high: 75,
      units: "mmHg"
    },
    oxygenSaturation: {
      low: 94,
      normal: "95-100",
      units: "%"
    },
    temperature: {
      low: 36.5,
      normal: "36.5-37.5",
      high: 38.0,
      units: "°C"
    }
  },
  {
    id: "toddler-1-3yr",
    label: "Toddler (1-3 years)",
    ageRange: [12, 36],
    weightRange: [10, 14],
    heartRate: {
      low: 70,
      normal: "90-150",
      high: 170,
      units: "bpm"
    },
    respiratoryRate: {
      low: 20,
      normal: "22-40",
      high: 45,
      units: "breaths/min"
    },
    systolicBP: {
      low: 80,
      normal: "90-105",
      high: 115,
      units: "mmHg"
    },
    diastolicBP: {
      low: 40,
      normal: "50-70",
      high: 80,
      units: "mmHg"
    },
    oxygenSaturation: {
      low: 94,
      normal: "95-100",
      units: "%"
    },
    temperature: {
      low: 36.5,
      normal: "36.5-37.5",
      high: 38.0,
      units: "°C"
    }
  },
  {
    id: "preschool-3-6yr",
    label: "Preschool (3-6 years)",
    ageRange: [36, 72],
    weightRange: [14, 20],
    heartRate: {
      low: 65,
      normal: "80-140",
      high: 150,
      units: "bpm"
    },
    respiratoryRate: {
      low: 18,
      normal: "20-30",
      high: 35,
      units: "breaths/min"
    },
    systolicBP: {
      low: 85,
      normal: "95-110",
      high: 120,
      units: "mmHg"
    },
    diastolicBP: {
      low: 45,
      normal: "55-75",
      high: 80,
      units: "mmHg"
    },
    oxygenSaturation: {
      low: 94,
      normal: "95-100",
      units: "%"
    },
    temperature: {
      low: 36.5,
      normal: "36.5-37.5",
      high: 38.0,
      units: "°C"
    }
  },
  {
    id: "school-age-6-12yr",
    label: "School Age (6-12 years)",
    ageRange: [72, 144],
    weightRange: [20, 42],
    heartRate: {
      low: 60,
      normal: "70-120",
      high: 140,
      units: "bpm"
    },
    respiratoryRate: {
      low: 16,
      normal: "18-25",
      high: 30,
      units: "breaths/min"
    },
    systolicBP: {
      low: 90,
      normal: "100-120",
      high: 130,
      units: "mmHg"
    },
    diastolicBP: {
      low: 50,
      normal: "60-75",
      high: 85,
      units: "mmHg"
    },
    oxygenSaturation: {
      low: 94,
      normal: "95-100",
      units: "%"
    },
    temperature: {
      low: 36.5,
      normal: "36.5-37.5",
      high: 38.0,
      units: "°C"
    }
  },
  {
    id: "adolescent-12-16yr",
    label: "Adolescent (12-16 years)",
    ageRange: [144, 192],
    weightRange: [42, 68],
    heartRate: {
      low: 55,
      normal: "60-100",
      high: 120,
      units: "bpm"
    },
    respiratoryRate: {
      low: 14,
      normal: "15-20",
      high: 25,
      units: "breaths/min"
    },
    systolicBP: {
      low: 100,
      normal: "110-130",
      high: 140,
      units: "mmHg"
    },
    diastolicBP: {
      low: 55,
      normal: "65-85",
      high: 90,
      units: "mmHg"
    },
    oxygenSaturation: {
      low: 94,
      normal: "95-100",
      units: "%"
    },
    temperature: {
      low: 36.5,
      normal: "36.5-37.5",
      high: 38.0,
      units: "°C"
    }
  }
];

export default vitalSigns;