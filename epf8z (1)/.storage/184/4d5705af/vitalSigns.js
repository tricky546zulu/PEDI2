/**
 * Physiological Parameters Data
 * Normal ranges for pediatric vital signs by age group
 */

const vitalSigns = [
  {
    id: "neonate",
    label: "Neonate (0-30 days)",
    ageRange: "Birth to 30 days",
    parameters: [
      {
        id: "hr",
        section: "vital",
        name: "Heart Rate",
        unit: "beats/min",
        normalRange: "100-160",
        interventionThresholds: "<100 or >180",
        criticalThresholds: "<80 or >200"
      },
      {
        id: "rr",
        section: "vital",
        name: "Respiratory Rate",
        unit: "breaths/min",
        normalRange: "30-60",
        interventionThresholds: "<30 or >60",
        criticalThresholds: "<20 or >80"
      },
      {
        id: "bp",
        section: "vital",
        name: "Systolic Blood Pressure",
        unit: "mmHg",
        normalRange: "60-90",
        interventionThresholds: "<50 or >100",
        criticalThresholds: "<40 or >110"
      },
      {
        id: "temp",
        section: "vital",
        name: "Temperature",
        unit: "°C",
        normalRange: "36.5-37.5",
        interventionThresholds: "<36 or >38",
        criticalThresholds: "<35 or >40"
      },
      {
        id: "spo2",
        section: "respiratory",
        name: "Oxygen Saturation",
        unit: "%",
        normalRange: "≥95",
        interventionThresholds: "90-94",
        criticalThresholds: "<90"
      },
      {
        id: "avpu",
        section: "vital",
        name: "AVPU",
        normalRange: "Alert",
        interventionThresholds: "Verbal",
        criticalThresholds: "Pain or Unresponsive"
      },
      {
        id: "cap",
        section: "cardiovascular",
        name: "Capillary Refill",
        unit: "seconds",
        normalRange: "<2",
        interventionThresholds: "2-3",
        criticalThresholds: ">3"
      }
    ]
  },
  {
    id: "infant",
    label: "Infant",
    ageRange: "1-12 months",
    parameters: [
      {
        id: "hr",
        section: "vital",
        name: "Heart Rate",
        unit: "beats/min",
        normalRange: "90-160",
        interventionThresholds: "<90 or >170",
        criticalThresholds: "<70 or >190"
      },
      {
        id: "rr",
        section: "vital",
        name: "Respiratory Rate",
        unit: "breaths/min",
        normalRange: "25-50",
        interventionThresholds: "<25 or >55",
        criticalThresholds: "<15 or >70"
      },
      {
        id: "bp",
        section: "vital",
        name: "Systolic Blood Pressure",
        unit: "mmHg",
        normalRange: "70-100",
        interventionThresholds: "<65 or >110",
        criticalThresholds: "<60 or >120"
      },
      {
        id: "temp",
        section: "vital",
        name: "Temperature",
        unit: "°C",
        normalRange: "36.5-37.5",
        interventionThresholds: "<36 or >38",
        criticalThresholds: "<35 or >40"
      },
      {
        id: "spo2",
        section: "respiratory",
        name: "Oxygen Saturation",
        unit: "%",
        normalRange: "≥95",
        interventionThresholds: "90-94",
        criticalThresholds: "<90"
      },
      {
        id: "etco2",
        section: "respiratory",
        name: "End-tidal CO₂",
        unit: "mmHg",
        normalRange: "35-45",
        interventionThresholds: "30-35 or 45-50",
        criticalThresholds: "<30 or >50"
      },
      {
        id: "avpu",
        section: "vital",
        name: "AVPU",
        normalRange: "Alert",
        interventionThresholds: "Verbal",
        criticalThresholds: "Pain or Unresponsive"
      },
      {
        id: "cap",
        section: "cardiovascular",
        name: "Capillary Refill",
        unit: "seconds",
        normalRange: "<2",
        interventionThresholds: "2-3",
        criticalThresholds: ">3"
      },
      {
        id: "glucose",
        section: "vital",
        name: "Blood Glucose",
        unit: "mg/dL",
        normalRange: "65-110",
        interventionThresholds: "50-65 or 110-180",
        criticalThresholds: "<50 or >180"
      }
    ]
  },
  {
    id: "toddler",
    label: "Toddler",
    ageRange: "1-3 years",
    parameters: [
      {
        id: "hr",
        section: "vital",
        name: "Heart Rate",
        unit: "beats/min",
        normalRange: "80-140",
        interventionThresholds: "<80 or >150",
        criticalThresholds: "<65 or >170"
      },
      {
        id: "rr",
        section: "vital",
        name: "Respiratory Rate",
        unit: "breaths/min",
        normalRange: "20-40",
        interventionThresholds: "<20 or >45",
        criticalThresholds: "<15 or >60"
      },
      {
        id: "bp",
        section: "vital",
        name: "Systolic Blood Pressure",
        unit: "mmHg",
        normalRange: "80-110",
        interventionThresholds: "<75 or >120",
        criticalThresholds: "<70 or >130"
      },
      {
        id: "temp",
        section: "vital",
        name: "Temperature",
        unit: "°C",
        normalRange: "36.5-37.5",
        interventionThresholds: "<36 or >38.5",
        criticalThresholds: "<35 or >40"
      },
      {
        id: "spo2",
        section: "respiratory",
        name: "Oxygen Saturation",
        unit: "%",
        normalRange: "≥95",
        interventionThresholds: "90-94",
        criticalThresholds: "<90"
      },
      {
        id: "etco2",
        section: "respiratory",
        name: "End-tidal CO₂",
        unit: "mmHg",
        normalRange: "35-45",
        interventionThresholds: "30-35 or 45-50",
        criticalThresholds: "<30 or >50"
      },
      {
        id: "avpu",
        section: "vital",
        name: "AVPU",
        normalRange: "Alert",
        interventionThresholds: "Verbal",
        criticalThresholds: "Pain or Unresponsive"
      },
      {
        id: "cap",
        section: "cardiovascular",
        name: "Capillary Refill",
        unit: "seconds",
        normalRange: "<2",
        interventionThresholds: "2-3",
        criticalThresholds: ">3"
      },
      {
        id: "glucose",
        section: "vital",
        name: "Blood Glucose",
        unit: "mg/dL",
        normalRange: "65-110",
        interventionThresholds: "50-65 or 110-180",
        criticalThresholds: "<50 or >180"
      }
    ]
  },
  {
    id: "preschool",
    label: "Preschool Child",
    ageRange: "3-5 years",
    parameters: [
      {
        id: "hr",
        section: "vital",
        name: "Heart Rate",
        unit: "beats/min",
        normalRange: "70-120",
        interventionThresholds: "<70 or >130",
        criticalThresholds: "<60 or >150"
      },
      {
        id: "rr",
        section: "vital",
        name: "Respiratory Rate",
        unit: "breaths/min",
        normalRange: "18-30",
        interventionThresholds: "<18 or >35",
        criticalThresholds: "<15 or >40"
      },
      {
        id: "bp",
        section: "vital",
        name: "Systolic Blood Pressure",
        unit: "mmHg",
        normalRange: "85-110",
        interventionThresholds: "<80 or >120",
        criticalThresholds: "<75 or >130"
      },
      {
        id: "temp",
        section: "vital",
        name: "Temperature",
        unit: "°C",
        normalRange: "36.5-37.5",
        interventionThresholds: "<36 or >38.5",
        criticalThresholds: "<35 or >40"
      },
      {
        id: "spo2",
        section: "respiratory",
        name: "Oxygen Saturation",
        unit: "%",
        normalRange: "≥95",
        interventionThresholds: "90-94",
        criticalThresholds: "<90"
      },
      {
        id: "etco2",
        section: "respiratory",
        name: "End-tidal CO₂",
        unit: "mmHg",
        normalRange: "35-45",
        interventionThresholds: "30-35 or 45-50",
        criticalThresholds: "<30 or >50"
      },
      {
        id: "avpu",
        section: "vital",
        name: "AVPU",
        normalRange: "Alert",
        interventionThresholds: "Verbal",
        criticalThresholds: "Pain or Unresponsive"
      },
      {
        id: "cap",
        section: "cardiovascular",
        name: "Capillary Refill",
        unit: "seconds",
        normalRange: "<2",
        interventionThresholds: "2-3",
        criticalThresholds: ">3"
      },
      {
        id: "glucose",
        section: "vital",
        name: "Blood Glucose",
        unit: "mg/dL",
        normalRange: "65-110",
        interventionThresholds: "55-65 or 110-180",
        criticalThresholds: "<55 or >180"
      }
    ]
  },
  {
    id: "school",
    label: "School Age",
    ageRange: "6-12 years",
    parameters: [
      {
        id: "hr",
        section: "vital",
        name: "Heart Rate",
        unit: "beats/min",
        normalRange: "60-110",
        interventionThresholds: "<60 or >120",
        criticalThresholds: "<50 or >130"
      },
      {
        id: "rr",
        section: "vital",
        name: "Respiratory Rate",
        unit: "breaths/min",
        normalRange: "16-25",
        interventionThresholds: "<16 or >30",
        criticalThresholds: "<12 or >35"
      },
      {
        id: "bp",
        section: "vital",
        name: "Systolic Blood Pressure",
        unit: "mmHg",
        normalRange: "90-120",
        interventionThresholds: "<85 or >130",
        criticalThresholds: "<80 or >140"
      },
      {
        id: "temp",
        section: "vital",
        name: "Temperature",
        unit: "°C",
        normalRange: "36.5-37.5",
        interventionThresholds: "<36 or >38.5",
        criticalThresholds: "<35 or >40"
      },
      {
        id: "spo2",
        section: "respiratory",
        name: "Oxygen Saturation",
        unit: "%",
        normalRange: "≥95",
        interventionThresholds: "90-94",
        criticalThresholds: "<90"
      },
      {
        id: "etco2",
        section: "respiratory",
        name: "End-tidal CO₂",
        unit: "mmHg",
        normalRange: "35-45",
        interventionThresholds: "30-35 or 45-50",
        criticalThresholds: "<30 or >50"
      },
      {
        id: "avpu",
        section: "vital",
        name: "AVPU",
        normalRange: "Alert",
        interventionThresholds: "Verbal",
        criticalThresholds: "Pain or Unresponsive"
      },
      {
        id: "cap",
        section: "cardiovascular",
        name: "Capillary Refill",
        unit: "seconds",
        normalRange: "<2",
        interventionThresholds: "2-3",
        criticalThresholds: ">3"
      },
      {
        id: "glucose",
        section: "vital",
        name: "Blood Glucose",
        unit: "mg/dL",
        normalRange: "70-120",
        interventionThresholds: "55-70 or 120-200",
        criticalThresholds: "<55 or >200"
      }
    ]
  },
  {
    id: "adolescent",
    label: "Adolescent",
    ageRange: "12-18 years",
    parameters: [
      {
        id: "hr",
        section: "vital",
        name: "Heart Rate",
        unit: "beats/min",
        normalRange: "55-100",
        interventionThresholds: "<50 or >110",
        criticalThresholds: "<40 or >130"
      },
      {
        id: "rr",
        section: "vital",
        name: "Respiratory Rate",
        unit: "breaths/min",
        normalRange: "12-20",
        interventionThresholds: "<12 or >25",
        criticalThresholds: "<10 or >30"
      },
      {
        id: "bp",
        section: "vital",
        name: "Systolic Blood Pressure",
        unit: "mmHg",
        normalRange: "100-130",
        interventionThresholds: "<90 or >140",
        criticalThresholds: "<80 or >150"
      },
      {
        id: "dbp",
        section: "vital",
        name: "Diastolic Blood Pressure",
        unit: "mmHg",
        normalRange: "60-80",
        interventionThresholds: "<50 or >90",
        criticalThresholds: "<40 or >100"
      },
      {
        id: "temp",
        section: "vital",
        name: "Temperature",
        unit: "°C",
        normalRange: "36.5-37.5",
        interventionThresholds: "<36 or >38.5",
        criticalThresholds: "<35 or >40"
      },
      {
        id: "spo2",
        section: "respiratory",
        name: "Oxygen Saturation",
        unit: "%",
        normalRange: "≥95",
        interventionThresholds: "90-94",
        criticalThresholds: "<90"
      },
      {
        id: "etco2",
        section: "respiratory",
        name: "End-tidal CO₂",
        unit: "mmHg",
        normalRange: "35-45",
        interventionThresholds: "30-35 or 45-50",
        criticalThresholds: "<30 or >50"
      },
      {
        id: "avpu",
        section: "vital",
        name: "AVPU",
        normalRange: "Alert",
        interventionThresholds: "Verbal",
        criticalThresholds: "Pain or Unresponsive"
      },
      {
        id: "cap",
        section: "cardiovascular",
        name: "Capillary Refill",
        unit: "seconds",
        normalRange: "<2",
        interventionThresholds: "2-3",
        criticalThresholds: ">3"
      },
      {
        id: "glucose",
        section: "vital",
        name: "Blood Glucose",
        unit: "mg/dL",
        normalRange: "70-120",
        interventionThresholds: "55-70 or 120-200",
        criticalThresholds: "<55 or >200"
      }
    ]
  }
];

export default vitalSigns;
