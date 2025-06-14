/**
 * Equipment Sizes Data
 * Reference data for appropriate equipment sizing in pediatric patients
 */

const equipmentSizes = [
  {
    id: "ett",
    name: "Endotracheal Tube",
    category: "airway",
    description: "Uncuffed and cuffed endotracheal tube sizes by age and weight",
    critical: true,
    sizeBy: "both",
    sizeChart: [
      {
        ageRange: "Premature",
        weightRange: "<1",
        size: "2.5 uncuffed"
      },
      {
        ageRange: "Newborn",
        weightRange: "1-3",
        size: "3.0 uncuffed"
      },
      {
        ageRange: "0-6 months",
        weightRange: "3-5",
        size: "3.5 uncuffed"
      },
      {
        ageRange: "6-12 months",
        weightRange: "5-10",
        size: "3.5-4.0 uncuffed"
      },
      {
        ageRange: "1-2 years",
        weightRange: "10-12",
        size: "4.0-4.5 uncuffed or 3.5 cuffed"
      },
      {
        ageRange: "2-4 years",
        weightRange: "12-16",
        size: "4.5-5.0 uncuffed or 4.0 cuffed"
      },
      {
        ageRange: "4-6 years",
        weightRange: "16-20",
        size: "5.0-5.5 uncuffed or 4.5 cuffed"
      },
      {
        ageRange: "6-8 years",
        weightRange: "20-24",
        size: "5.5-6.0 cuffed" 
      },
      {
        ageRange: "8-10 years",
        weightRange: "24-30",
        size: "6.0 cuffed"
      },
      {
        ageRange: "10-12 years",
        weightRange: "30-36",
        size: "6.5 cuffed"
      },
      {
        ageRange: "12-14 years",
        weightRange: "36-50",
        size: "7.0 cuffed"
      },
      {
        ageRange: ">14 years",
        weightRange: ">50",
        size: "7.0-7.5 cuffed"
      }
    ],
    formula: {
      name: "Age-based formula for uncuffed",
      equation: "4 + ({age} / 4)",
      requiresAge: true,
      precision: 1,
      notes: "Age in years, add 0.5 for cuffed tubes"
    }
  },
  {
    id: "lma",
    name: "Laryngeal Mask Airway",
    category: "airway",
    description: "Supraglottic airway device sized by weight",
    critical: true,
    sizeBy: "weight",
    sizeChart: [
      {
        weightRange: "<5",
        size: "Size 1"
      },
      {
        weightRange: "5-10",
        size: "Size 1.5"
      },
      {
        weightRange: "10-20",
        size: "Size 2"
      },
      {
        weightRange: "20-30",
        size: "Size 2.5"
      },
      {
        weightRange: "30-50",
        size: "Size 3"
      },
      {
        weightRange: "50-70",
        size: "Size 4"
      },
      {
        weightRange: ">70",
        size: "Size 5"
      }
    ]
  },
  {
    id: "oralAirway",
    name: "Oropharyngeal Airway",
    category: "airway",
    description: "Oral airway adjunct sized by age",
    critical: false,
    sizeBy: "age",
    sizeChart: [
      {
        ageRange: "Premature",
        size: "000 (40mm)"
      },
      {
        ageRange: "Newborn",
        size: "00 (50mm)"
      },
      {
        ageRange: "0-6 months",
        size: "0 (60mm)"
      },
      {
        ageRange: "6-18 months",
        size: "1 (70mm)"
      },
      {
        ageRange: "18 months - 3 years",
        size: "2 (80mm)"
      },
      {
        ageRange: "4-7 years",
        size: "3 (90mm)"
      },
      {
        ageRange: "8-12 years",
        size: "4 (100mm)"
      },
      {
        ageRange: ">12 years",
        size: "5 (110mm)"
      }
    ]
  },
  {
    id: "nasalAirway",
    name: "Nasopharyngeal Airway",
    category: "airway",
    description: "Nasal airway adjunct sized by age",
    critical: false,
    sizeBy: "age",
    sizeChart: [
      {
        ageRange: "Premature",
        size: "12F (2.5mm ID)"
      },
      {
        ageRange: "0-6 months",
        size: "14F (3.0mm ID)"
      },
      {
        ageRange: "6-18 months",
        size: "16F (3.5mm ID)"
      },
      {
        ageRange: "18 months - 3 years",
        size: "18F (4.0mm ID)"
      },
      {
        ageRange: "4-7 years",
        size: "20F (4.5mm ID)"
      },
      {
        ageRange: "8-12 years",
        size: "22F (5.0mm ID)"
      },
      {
        ageRange: ">12 years",
        size: "24-30F (5.5-7.0mm ID)"
      }
    ]
  },
  {
    id: "blade",
    name: "Laryngoscope Blade",
    category: "airway",
    description: "Appropriate blade size and type for intubation",
    critical: true,
    sizeBy: "age",
    sizeChart: [
      {
        ageRange: "Premature",
        size: "00 Miller"
      },
      {
        ageRange: "Newborn to 3 months",
        size: "0 Miller"
      },
      {
        ageRange: "3 months - 2 years",
        size: "1 Miller (preferred) or Mac"
      },
      {
        ageRange: "2-8 years",
        size: "2 Miller or Mac"
      },
      {
        ageRange: "8-12 years",
        size: "2-3 Mac"
      },
      {
        ageRange: ">12 years",
        size: "3 Mac"
      }
    ]
  },
  {
    id: "mask",
    name: "Facemask",
    category: "ventilation",
    description: "Appropriate face mask size for bag-mask ventilation",
    critical: true,
    sizeBy: "age",
    sizeChart: [
      {
        ageRange: "Premature",
        size: "00"
      },
      {
        ageRange: "Newborn to 1 month",
        size: "0"
      },
      {
        ageRange: "1-12 months",
        size: "1"
      },
      {
        ageRange: "1-4 years",
        size: "2"
      },
      {
        ageRange: "4-10 years",
        size: "3"
      },
      {
        ageRange: ">10 years",
        size: "4-5"
      }
    ],
    notes: "Mask should create a seal over the mouth and nose without covering the eyes or extending past the chin"
  },
  {
    id: "suction",
    name: "Suction Catheter",
    category: "airway",
    description: "Appropriate suction catheter size",
    critical: false,
    sizeBy: "weight",
    formula: {
      name: "ETT-based formula",
      equation: "2 * ({weight} + 4)",
      requiresWeight: true,
      unit: "F",
      precision: 0
    },
    alternativeSizes: [
      "For ETT sizes 2.5-3.0: Use 6-8F catheter",
      "For ETT sizes 3.5-4.5: Use 8-10F catheter",
      "For ETT sizes 5.0-6.0: Use 10-12F catheter",
      "For ETT sizes >6.0: Use 12-14F catheter"
    ]
  },
  {
    id: "ngTube",
    name: "Nasogastric Tube",
    category: "gastrointestinal",
    description: "Appropriate nasogastric tube size",
    critical: false,
    sizeBy: "age",
    sizeChart: [
      {
        ageRange: "Premature",
        size: "5-6F"
      },
      {
        ageRange: "0-2 years",
        size: "8F"
      },
      {
        ageRange: "2-6 years",
        size: "10F"
      },
      {
        ageRange: "6-12 years",
        size: "12F"
      },
      {
        ageRange: ">12 years",
        size: "14-18F"
      }
    ]
  },
  {
    id: "foley",
    name: "Urinary Catheter",
    category: "genitourinary",
    description: "Appropriate Foley catheter size",
    critical: false,
    sizeBy: "age",
    sizeChart: [
      {
        ageRange: "Premature",
        size: "5F"
      },
      {
        ageRange: "0-2 years",
        size: "6-8F"
      },
      {
        ageRange: "2-5 years",
        size: "8F"
      },
      {
        ageRange: "5-10 years",
        size: "10F"
      },
      {
        ageRange: "10-16 years",
        size: "10-12F"
      },
      {
        ageRange: ">16 years",
        size: "12-14F (female), 14-16F (male)"
      }
    ]
  },
  {
    id: "ivCatheter",
    name: "IV Catheter",
    category: "vascular access",
    description: "Appropriate intravenous catheter sizes",
    critical: true,
    sizeBy: "age",
    sizeChart: [
      {
        ageRange: "Premature, Newborn",
        size: "24G"
      },
      {
        ageRange: "0-2 years",
        size: "24-22G"
      },
      {
        ageRange: "2-8 years",
        size: "22-20G"
      },
      {
        ageRange: ">8 years",
        size: "20-18G"
      }
    ],
    notes: "Site selection influences appropriate catheter size; emergent IO access recommended if IV access cannot be rapidly established"
  },
  {
    id: "ioNeedle",
    name: "IO Needle",
    category: "vascular access",
    description: "Appropriate intraosseous needle sizes",
    critical: true,
    sizeBy: "weight",
    sizeChart: [
      {
        weightRange: "<3",
        size: "15mm needle (newborn)"
      },
      {
        weightRange: "3-39",
        size: "15mm needle (pink)"
      },
      {
        weightRange: "≥40",
        size: "25mm needle (blue)"
      }
    ],
    alternativeSizes: [
      "Manual IO devices: 16-18G for <6 years, 13-15G for >6 years"
    ]
  },
  {
    id: "chestTube",
    name: "Chest Tube",
    category: "thoracic",
    description: "Appropriate chest tube sizes",
    critical: true,
    sizeBy: "age",
    sizeChart: [
      {
        ageRange: "Premature",
        size: "8-10F"
      },
      {
        ageRange: "Newborn-6 months",
        size: "10-12F"
      },
      {
        ageRange: "6 months-2 years",
        size: "14-20F"
      },
      {
        ageRange: "2-8 years",
        size: "20-24F"
      },
      {
        ageRange: "8-12 years",
        size: "24-28F"
      },
      {
        ageRange: ">12 years",
        size: "28-32F"
      }
    ]
  },
  {
    id: "ncdNeedle",
    name: "Needle Decompression",
    category: "thoracic",
    description: "Appropriate needle for tension pneumothorax decompression",
    critical: true,
    sizeBy: "age",
    sizeChart: [
      {
        ageRange: "Newborn-12 months",
        size: "18-20G, 1.5 inch"
      },
      {
        ageRange: "1-8 years",
        size: "16-18G, 1.5-2 inch"
      },
      {
        ageRange: ">8 years",
        size: "14-16G, 2-3 inch"
      }
    ],
    notes: "Recommended site: 4th-5th intercostal space, anterior axillary line (alternative: 2nd intercostal space, mid-clavicular line)"
  }
];

export default equipmentSizes;
