// Equipment sizing data for pediatric emergency care
const equipmentSizes = [
  {
    id: "ett",
    name: "Endotracheal Tube",
    category: "airway",
    critical: true,
    description: "Uncuffed for <8 years, cuffed for ≥8 years. Size is internal diameter in mm.",
    sizing: [
      { ageRange: [0, 1], weightRange: [1, 3], size: "2.5-3.0", notes: "Premature infant" },
      { ageRange: [0, 6], weightRange: [3, 6], size: "3.0-3.5", notes: "Newborn to 6 months" },
      { ageRange: [6, 18], weightRange: [6, 10], size: "3.5-4.0", notes: "6-18 months" },
      { ageRange: [18, 36], weightRange: [10, 14], size: "4.0-4.5", notes: "18-36 months" },
      { ageRange: [36, 72], weightRange: [14, 18], size: "4.5-5.0", notes: "3-6 years" },
      { ageRange: [72, 108], weightRange: [18, 30], size: "5.0-5.5 cuffed", notes: "6-9 years" },
      { ageRange: [108, 156], weightRange: [30, 40], size: "5.5-6.0 cuffed", notes: "9-13 years" },
      { ageRange: [156, 192], weightRange: [40, 55], size: "6.0-6.5 cuffed", notes: "13-16 years" }
    ],
    formula: "Uncuffed ETT size = (Age in years/4) + 4, Cuffed ETT size = (Age in years/4) + 3.5",
    depthFormula: "Depth of insertion (cm) = ETT size × 3, or Age in years/2 + 12 for oral intubation",
    notes: "Final tube size should be based on patient size, not just age. Always have a tube one size smaller and one size larger available."
  },
  {
    id: "laryngoscope",
    name: "Laryngoscope Blade",
    category: "airway",
    critical: true,
    description: "Straight (Miller) blade used for infants, either straight or curved (Mac) for older children.",
    sizing: [
      { ageRange: [0, 1], weightRange: [1, 3], size: "0 straight", notes: "Premature infant" },
      { ageRange: [0, 12], weightRange: [3, 8], size: "1 straight", notes: "Term newborn to 1 year" },
      { ageRange: [12, 36], weightRange: [8, 14], size: "1-2 straight/curved", notes: "1-3 years" },
      { ageRange: [36, 96], weightRange: [14, 30], size: "2 straight/curved", notes: "3-8 years" },
      { ageRange: [96, 192], weightRange: [30, 60], size: "3 curved", notes: "8-16 years" }
    ],
    notes: "Always have backup blades and handle available. Check light intensity before use."
  },
  {
    id: "oropharyngeal-airway",
    name: "Oropharyngeal Airway (OPA)",
    category: "airway",
    critical: false,
    description: "Used to maintain airway patency in unconscious patients without a gag reflex.",
    sizing: [
      { ageRange: [0, 6], weightRange: [3, 6], size: "50mm (0)", notes: "Newborn to 6 months" },
      { ageRange: [6, 18], weightRange: [6, 10], size: "60mm (1)", notes: "6-18 months" },
      { ageRange: [18, 36], weightRange: [10, 14], size: "70mm (2)", notes: "18 months-3 years" },
      { ageRange: [36, 96], weightRange: [14, 30], size: "80mm (3)", notes: "3-8 years" },
      { ageRange: [96, 156], weightRange: [30, 45], size: "90mm (4)", notes: "8-13 years" },
      { ageRange: [156, 192], weightRange: [45, 60], size: "100mm (5)", notes: "13-16 years" }
    ],
    notes: "Proper sizing: measure from corner of mouth to angle of jaw or tragus of ear. Only use in patients without a gag reflex."
  },
  {
    id: "nasopharyngeal-airway",
    name: "Nasopharyngeal Airway (NPA)",
    category: "airway",
    critical: false,
    description: "Better tolerated than OPA in semi-conscious patients with some gag reflex.",
    sizing: [
      { ageRange: [0, 6], weightRange: [3, 6], size: "12-14Fr (3.0-3.5mm)", notes: "Infant" },
      { ageRange: [6, 24], weightRange: [6, 12], size: "14-18Fr (3.5-4.5mm)", notes: "6 months-2 years" },
      { ageRange: [24, 72], weightRange: [12, 22], size: "18-22Fr (4.5-5.5mm)", notes: "2-6 years" },
      { ageRange: [72, 144], weightRange: [22, 40], size: "22-26Fr (5.5-6.5mm)", notes: "6-12 years" },
      { ageRange: [144, 192], weightRange: [40, 60], size: "26-30Fr (6.5-7.5mm)", notes: "12-16 years" }
    ],
    notes: "Proper sizing: measure from tip of nose to tragus of ear. Lubricate before insertion. Contraindicated in patients with facial trauma or suspected basilar skull fracture."
  },
  {
    id: "bvm",
    name: "Bag-Valve-Mask (BVM)",
    category: "ventilation",
    critical: true,
    description: "Used for assisted ventilation. Reservoir should always be attached for high concentration oxygen delivery.",
    sizing: [
      { ageRange: [0, 12], weightRange: [0, 10], size: "Infant (250mL)", notes: "Use for neonates and infants up to 1 year" },
      { ageRange: [12, 96], weightRange: [10, 30], size: "Child (500mL)", notes: "Use for children 1-8 years" },
      { ageRange: [96, 192], weightRange: [30, 90], size: "Adult (1000-1500mL)", notes: "Use for children >8 years and adolescents" }
    ],
    notes: "Avoid excessive ventilation. Recommended rate: infant/child 20-30 breaths/min, adolescent 10-20 breaths/min. Watch for chest rise."
  },
  {
    id: "suction-catheter",
    name: "Suction Catheter",
    category: "airway",
    critical: false,
    description: "Used for clearing secretions from airway or ETT.",
    sizing: [
      { ageRange: [0, 1], weightRange: [1, 3], size: "6-8Fr", notes: "Premature infant" },
      { ageRange: [0, 12], weightRange: [3, 10], size: "8-10Fr", notes: "Full term newborn to 1 year" },
      { ageRange: [12, 96], weightRange: [10, 30], size: "10-12Fr", notes: "1-8 years" },
      { ageRange: [96, 192], weightRange: [30, 60], size: "12-14Fr", notes: ">8 years" }
    ],
    formula: "ETT size × 2 = suction catheter size (Fr)",
    notes: "Apply suction only while withdrawing catheter. Limit suction to 5-10 seconds to prevent hypoxia."
  },
  {
    id: "iv-catheter",
    name: "IV Catheter",
    category: "vascular access",
    critical: true,
    description: "Used for peripheral intravenous access.",
    sizing: [
      { ageRange: [0, 3], weightRange: [1, 5], size: "24G", notes: "Neonates and young infants" },
      { ageRange: [3, 36], weightRange: [5, 15], size: "22-24G", notes: "Infants and toddlers" },
      { ageRange: [36, 144], weightRange: [15, 40], size: "22G-20G", notes: "Children" },
      { ageRange: [144, 192], weightRange: [40, 70], size: "20G-18G", notes: "Adolescents" }
    ],
    notes: "Common sites: hand, forearm, antecubital fossa, foot (infants). Use largest appropriate size for resuscitation and fluid administration."
  },
  {
    id: "io-needle",
    name: "IO Needle",
    category: "vascular access",
    critical: true,
    description: "Used for intraosseous access when IV access cannot be rapidly obtained.",
    sizing: [
      { ageRange: [0, 12], weightRange: [3, 10], size: "15mm (pink)", notes: "Newborn to 1 year" },
      { ageRange: [12, 108], weightRange: [10, 30], size: "15-25mm (blue)", notes: "1-9 years" },
      { ageRange: [108, 192], weightRange: [30, 80], size: "25mm (yellow)", notes: ">9 years" }
    ],
    notes: "Common sites: proximal tibia (1-2 cm below tuberosity), distal tibia, distal femur. For manual IO devices, size may refer to gauge (e.g. 18G, 16G, 14G)."
  },
  {
    id: "ngogastric-tube",
    name: "Nasogastric/Orogastric Tube",
    category: "gastrointestinal",
    critical: false,
    description: "Used for gastric decompression, feeding, or medication administration.",
    sizing: [
      { ageRange: [0, 1], weightRange: [1, 3], size: "5-6Fr", notes: "Premature infant" },
      { ageRange: [0, 24], weightRange: [3, 12], size: "8Fr", notes: "Newborn to 2 years" },
      { ageRange: [24, 84], weightRange: [12, 25], size: "10Fr", notes: "2-7 years" },
      { ageRange: [84, 156], weightRange: [25, 45], size: "12Fr", notes: "7-13 years" },
      { ageRange: [156, 192], weightRange: [45, 70], size: "14-16Fr", notes: "13-16 years" }
    ],
    formula: "(Age in years/2) + 10 = French size",
    notes: "Proper length: measure from nose to earlobe to xiphoid process. Verify position before use. Consider an OG tube instead of NG in patients with facial/basilar skull trauma."
  },
  {
    id: "foley-catheter",
    name: "Foley Catheter",
    category: "genitourinary",
    critical: false,
    description: "Used for urinary drainage and monitoring.",
    sizing: [
      { ageRange: [0, 24], weightRange: [3, 12], size: "5-6Fr", notes: "Newborn to 2 years" },
      { ageRange: [24, 120], weightRange: [12, 35], size: "8Fr", notes: "2-10 years" },
      { ageRange: [120, 156], weightRange: [35, 50], size: "10Fr", notes: "10-13 years" },
      { ageRange: [156, 192], weightRange: [50, 70], size: "10-12Fr", notes: "13-16 years" }
    ],
    notes: "Use aseptic technique for insertion. Fill balloon according to manufacturer's recommendations."
  },
  {
    id: "chest-tube",
    name: "Chest Tube",
    category: "thoracic",
    critical: true,
    description: "Used for drainage of pneumothorax, hemothorax, or pleural effusion.",
    sizing: [
      { ageRange: [0, 1], weightRange: [1, 3], size: "8-10Fr", notes: "Premature infant" },
      { ageRange: [0, 12], weightRange: [3, 10], size: "10-14Fr", notes: "Term newborn to 1 year" },
      { ageRange: [12, 72], weightRange: [10, 22], size: "14-20Fr", notes: "1-6 years" },
      { ageRange: [72, 144], weightRange: [22, 40], size: "20-28Fr", notes: "6-12 years" },
      { ageRange: [144, 192], weightRange: [40, 70], size: "28-38Fr", notes: "12-16 years" }
    ],
    notes: "Insertion site: 4th-5th intercostal space, anterior/mid-axillary line for pneumothorax; 5th-6th intercostal space, mid-axillary line for fluid."
  },
  {
    id: "mask-size",
    name: "Oxygen Mask Size",
    category: "ventilation",
    critical: false,
    description: "Various masks for oxygen delivery.",
    sizing: [
      { ageRange: [0, 12], weightRange: [3, 10], size: "Infant", notes: "Newborn to 1 year" },
      { ageRange: [12, 72], weightRange: [10, 22], size: "Pediatric", notes: "1-6 years" },
      { ageRange: [72, 156], weightRange: [22, 50], size: "Small adult", notes: "6-13 years" },
      { ageRange: [156, 192], weightRange: [50, 70], size: "Adult", notes: "13-16 years" }
    ],
    notes: "Simple mask: 5-10 L/min, Non-rebreather: 10-15 L/min with reservoir bag fully inflated."
  },
  {
    id: "lma",
    name: "Laryngeal Mask Airway (LMA)",
    category: "airway",
    critical: true,
    description: "Supraglottic airway device used when intubation is difficult or as a bridge to definitive airway management.",
    sizing: [
      { weightRange: [<5], size: "1", cuffVolume: "Up to 4 mL", notes: "Neonate, infant <5 kg" },
      { weightRange: [5, 10], size: "1.5", cuffVolume: "Up to 7 mL", notes: "Infant 5-10 kg" },
      { weightRange: [10, 20], size: "2", cuffVolume: "Up to 10 mL", notes: "Child 10-20 kg" },
      { weightRange: [20, 30], size: "2.5", cuffVolume: "Up to 14 mL", notes: "Child 20-30 kg" },
      { weightRange: [30, 50], size: "3", cuffVolume: "Up to 20 mL", notes: "Child/adolescent 30-50 kg" },
      { weightRange: [50, 70], size: "4", cuffVolume: "Up to 30 mL", notes: "Adolescent 50-70 kg" }
    ],
    notes: "Primarily sized by weight, not age. Do not overinflate cuff. Not suitable for patients at high risk of aspiration."
  }
];

export default equipmentSizes;