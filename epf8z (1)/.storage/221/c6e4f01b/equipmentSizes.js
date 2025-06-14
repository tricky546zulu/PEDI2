/**
 * Equipment Sizing Data
 * Contains structured data for pediatric equipment sizing based on age, weight, or length
 */
const equipmentSizes = {
  endotrachealTubes: [
    { 
      ageRange: "Premature",
      weight: "<1",
      uncuffedETT: "2.5",
      cuffedETT: "Not recommended",
      depth: "6.5-7",
      notes: "Uncuffed preferred in neonates"
    },
    { 
      ageRange: "Premature",
      weight: "1-2",
      uncuffedETT: "3.0",
      cuffedETT: "Not recommended",
      depth: "7-8",
      notes: "Uncuffed preferred in neonates"
    },
    { 
      ageRange: "Term newborn",
      weight: "3-4",
      uncuffedETT: "3.5",
      cuffedETT: "3.0",
      depth: "9-10",
      notes: "Uncuffed typically used <1 year"
    },
    { 
      ageRange: "1-6 months",
      weight: "4-7",
      uncuffedETT: "3.5",
      cuffedETT: "3.0",
      depth: "9-10.5",
      notes: "Uncuffed typically used <1 year"
    },
    { 
      ageRange: "6-12 months",
      weight: "7-10",
      uncuffedETT: "4.0",
      cuffedETT: "3.5",
      depth: "10.5-11",
      notes: "Uncuffed or cuffed appropriate"
    },
    { 
      ageRange: "1-2 years",
      weight: "10-12",
      uncuffedETT: "4.5",
      cuffedETT: "4.0",
      depth: "11-12",
      notes: "Either uncuffed or cuffed appropriate"
    },
    { 
      ageRange: "2-3 years",
      weight: "12-14",
      uncuffedETT: "4.5-5.0",
      cuffedETT: "4.0-4.5",
      depth: "12-13",
      notes: "Cuffed becoming preferred >2 years"
    },
    { 
      ageRange: "3-5 years",
      weight: "14-18",
      uncuffedETT: "5.0-5.5",
      cuffedETT: "4.5-5.0",
      depth: "13-14",
      notes: "Cuffed preferred >2 years"
    },
    { 
      ageRange: "5-6 years",
      weight: "18-20",
      uncuffedETT: "5.5-6.0",
      cuffedETT: "5.0-5.5",
      depth: "14-15",
      notes: "Cuffed preferred"
    },
    { 
      ageRange: "6-8 years",
      weight: "20-26",
      uncuffedETT: "6.0-6.5",
      cuffedETT: "5.5-6.0",
      depth: "15-16",
      notes: "Cuffed preferred"
    },
    { 
      ageRange: "8-10 years",
      weight: "26-32",
      uncuffedETT: "6.5",
      cuffedETT: "6.0",
      depth: "16-17",
      notes: "Cuffed preferred"
    },
    { 
      ageRange: "10-12 years",
      weight: "32-38",
      uncuffedETT: "7.0",
      cuffedETT: "6.5",
      depth: "17-18",
      notes: "Cuffed preferred"
    },
    { 
      ageRange: "12-14 years",
      weight: "38-45",
      uncuffedETT: "7.0-7.5",
      cuffedETT: "6.5-7.0",
      depth: "18-19",
      notes: "Cuffed preferred"
    },
    { 
      ageRange: "14-16 years",
      weight: "45-55",
      uncuffedETT: "7.5",
      cuffedETT: "7.0",
      depth: "19-20",
      notes: "Cuffed preferred"
    },
    { 
      ageRange: ">16 years",
      weight: ">55",
      uncuffedETT: "8.0-9.0",
      cuffedETT: "7.0-8.0",
      depth: "20-23",
      notes: "Adult sizing"
    }
  ],
  
  oralAirways: [
    {
      ageRange: "Premature/Newborn",
      weight: "<3",
      size: "000",
      color: "Pink",
      length: "30mm"
    },
    {
      ageRange: "Newborn",
      weight: "3-5",
      size: "00",
      color: "Blue",
      length: "40mm"
    },
    {
      ageRange: "Infant",
      weight: "5-10",
      size: "0",
      color: "Black",
      length: "50mm"
    },
    {
      ageRange: "Child",
      weight: "10-20",
      size: "1",
      color: "White",
      length: "60mm"
    },
    {
      ageRange: "Child",
      weight: "20-30",
      size: "2",
      color: "Green",
      length: "70mm"
    },
    {
      ageRange: "Adolescent",
      weight: "30-50",
      size: "3",
      color: "Yellow",
      length: "80mm"
    },
    {
      ageRange: "Adult",
      weight: ">50",
      size: "4",
      color: "Red",
      length: "90mm"
    }
  ],
  
  nasalAirways: [
    {
      ageRange: "Premature/Newborn",
      size: "12 Fr",
      diameter: "4.0 mm",
      length: "8-10 cm"
    },
    {
      ageRange: "Infant",
      size: "14-16 Fr",
      diameter: "4.7-5.3 mm",
      length: "11-13 cm"
    },
    {
      ageRange: "Toddler/Preschooler",
      size: "18-20 Fr",
      diameter: "6.0-6.7 mm",
      length: "14-16 cm"
    },
    {
      ageRange: "School Age",
      size: "22-24 Fr",
      diameter: "7.3-8.0 mm",
      length: "17-19 cm"
    },
    {
      ageRange: "Adolescent",
      size: "26-28 Fr",
      diameter: "8.7-9.3 mm",
      length: "20-22 cm"
    },
    {
      ageRange: "Adult",
      size: "30-36 Fr",
      diameter: "10.0-12.0 mm",
      length: "23-25 cm"
    }
  ],
  
  laryngealMaskAirways: [
    {
      size: "1",
      weight: "<5",
      maxInflationVolume: "4 mL",
      notes: "Neonates/infants up to 5 kg"
    },
    {
      size: "1.5",
      weight: "5-10",
      maxInflationVolume: "7 mL",
      notes: "Infants 5-10 kg"
    },
    {
      size: "2",
      weight: "10-20",
      maxInflationVolume: "10 mL",
      notes: "Infants/children 10-20 kg"
    },
    {
      size: "2.5",
      weight: "20-30",
      maxInflationVolume: "14 mL",
      notes: "Children 20-30 kg"
    },
    {
      size: "3",
      weight: "30-50",
      maxInflationVolume: "20 mL",
      notes: "Children/small adults 30-50 kg"
    },
    {
      size: "4",
      weight: "50-70",
      maxInflationVolume: "30 mL",
      notes: "Adults 50-70 kg"
    },
    {
      size: "5",
      weight: ">70",
      maxInflationVolume: "40 mL",
      notes: "Adults >70 kg"
    }
  ],
  
  suctionCatheters: [
    {
      ageRange: "Premature",
      weight: "<1",
      size: "6-8 Fr",
      color: "Light Blue/White"
    },
    {
      ageRange: "Newborn",
      weight: "1-3",
      size: "8 Fr",
      color: "Blue"
    },
    {
      ageRange: "Infant",
      weight: "3-10",
      size: "8-10 Fr",
      color: "Black"
    },
    {
      ageRange: "Toddler",
      weight: "10-15",
      size: "10 Fr",
      color: "Black"
    },
    {
      ageRange: "Preschooler",
      weight: "15-20",
      size: "10-12 Fr",
      color: "White/Green"
    },
    {
      ageRange: "School Age",
      weight: "20-35",
      size: "12-14 Fr",
      color: "Green/Yellow"
    },
    {
      ageRange: "Adolescent",
      weight: "35-50",
      size: "14 Fr",
      color: "Yellow"
    },
    {
      ageRange: "Adult",
      weight: ">50",
      size: "14-18 Fr",
      color: "Yellow/Red"
    }
  ],
  
  bladeCuffSizes: [
    {
      ageRange: "Premature",
      weight: "<1",
      laryngoscopeBlade: "0 Miller",
      bloodPressureCuff: "Newborn"
    },
    {
      ageRange: "Newborn",
      weight: "1-3",
      laryngoscopeBlade: "0-1 Miller",
      bloodPressureCuff: "Newborn"
    },
    {
      ageRange: "1-6 months",
      weight: "4-7",
      laryngoscopeBlade: "1 Miller/Mac",
      bloodPressureCuff: "Infant"
    },
    {
      ageRange: "6-12 months",
      weight: "7-10",
      laryngoscopeBlade: "1 Miller/Mac",
      bloodPressureCuff: "Infant"
    },
    {
      ageRange: "1-2 years",
      weight: "10-12",
      laryngoscopeBlade: "1-2 Mac",
      bloodPressureCuff: "Child"
    },
    {
      ageRange: "2-5 years",
      weight: "12-18",
      laryngoscopeBlade: "2 Mac",
      bloodPressureCuff: "Child"
    },
    {
      ageRange: "5-8 years",
      weight: "18-26",
      laryngoscopeBlade: "2 Mac",
      bloodPressureCuff: "Small Adult"
    },
    {
      ageRange: "8-12 years",
      weight: "26-40",
      laryngoscopeBlade: "2-3 Mac",
      bloodPressureCuff: "Small Adult"
    },
    {
      ageRange: "12+ years",
      weight: ">40",
      laryngoscopeBlade: "3 Mac",
      bloodPressureCuff: "Adult"
    }
  ],
  
  ivCatheters: [
    {
      ageRange: "Premature",
      weight: "<1",
      ivCatheter: "24G",
      color: "Yellow",
      notes: "Use 1 cc syringe for fluids"
    },
    {
      ageRange: "Term Newborn",
      weight: "1-3",
      ivCatheter: "24G",
      color: "Yellow",
      notes: "Use 3-5 cc syringe for fluids"
    },
    {
      ageRange: "Infant",
      weight: "4-10",
      ivCatheter: "22-24G",
      color: "Blue/Yellow",
      notes: "Scalp veins may be used"
    },
    {
      ageRange: "Toddler",
      weight: "10-15",
      ivCatheter: "22G",
      color: "Blue",
      notes: "Hand/foot veins preferred"
    },
    {
      ageRange: "Preschool",
      weight: "15-20",
      ivCatheter: "22G",
      color: "Blue",
      notes: "Hand/foot/AC veins"
    },
    {
      ageRange: "School Age",
      weight: "20-35",
      ivCatheter: "20-22G",
      color: "Pink/Blue",
      notes: "AC veins may be used"
    },
    {
      ageRange: "Adolescent",
      weight: ">35",
      ivCatheter: "18-20G",
      color: "Green/Pink",
      notes: "AC veins preferred for resuscitation"
    }
  ],
  
  ioNeedles: [
    {
      ageRange: "Newborn",
      weight: "<3",
      ioNeedle: "18G",
      color: "Pink",
      notes: "Use manual IO or EZ-IO 15mm"
    },
    {
      ageRange: "Infant",
      weight: "3-10",
      ioNeedle: "18G",
      color: "Pink",
      notes: "Use manual IO or EZ-IO 15mm"
    },
    {
      ageRange: "Toddler-Preschool",
      weight: "10-20",
      ioNeedle: "16-18G",
      color: "Blue/Pink",
      notes: "EZ-IO 15mm"
    },
    {
      ageRange: "School Age",
      weight: "20-40",
      ioNeedle: "15-16G",
      color: "Blue",
      notes: "EZ-IO 25mm"
    },
    {
      ageRange: "Adolescent",
      weight: ">40",
      ioNeedle: "15G",
      color: "Blue",
      notes: "EZ-IO 25mm or 45mm for obese patients"
    }
  ],
  
  ngTubes: [
    {
      ageRange: "Premature",
      weight: "<1",
      size: "5-6 Fr",
      notes: "Measure from nose to earlobe to mid-xiphoid"
    },
    {
      ageRange: "Term Newborn",
      weight: "1-3",
      size: "6-8 Fr",
      notes: "Measure from nose to earlobe to mid-xiphoid"
    },
    {
      ageRange: "Infant",
      weight: "3-10",
      size: "8 Fr",
      notes: "Measure from nose to earlobe to mid-xiphoid"
    },
    {
      ageRange: "Toddler",
      weight: "10-15",
      size: "10 Fr",
      notes: "Measure from nose to earlobe to mid-xiphoid"
    },
    {
      ageRange: "Preschool",
      weight: "15-20",
      size: "10-12 Fr",
      notes: "Measure from nose to earlobe to mid-xiphoid"
    },
    {
      ageRange: "School Age",
      weight: "20-35",
      size: "12-14 Fr",
      notes: "Measure from nose to earlobe to mid-xiphoid"
    },
    {
      ageRange: "Adolescent",
      weight: ">35",
      size: "14-18 Fr",
      notes: "Measure from nose to earlobe to mid-xiphoid"
    }
  ],
  
  chestTubes: [
    {
      ageRange: "Premature",
      weight: "<1",
      size: "8-10 Fr",
      notes: "Insert at 4th-5th intercostal space, mid-axillary line"
    },
    {
      ageRange: "Term Newborn",
      weight: "1-3",
      size: "10-12 Fr",
      notes: "Insert at 4th-5th intercostal space, mid-axillary line"
    },
    {
      ageRange: "Infant",
      weight: "3-10",
      size: "12-16 Fr",
      notes: "Insert at 4th-5th intercostal space, mid-axillary line"
    },
    {
      ageRange: "Toddler",
      weight: "10-15",
      size: "16-20 Fr",
      notes: "Insert at 4th-5th intercostal space, mid-axillary line"
    },
    {
      ageRange: "Preschool",
      weight: "15-20",
      size: "20-24 Fr",
      notes: "Insert at 4th-5th intercostal space, mid-axillary line"
    },
    {
      ageRange: "School Age",
      weight: "20-35",
      size: "24-32 Fr",
      notes: "Insert at 4th-5th intercostal space, mid-axillary line"
    },
    {
      ageRange: "Adolescent",
      weight: ">35",
      size: "28-40 Fr",
      notes: "Insert at 4th-5th intercostal space, mid-axillary line"
    }
  ]
};

export default equipmentSizes;
