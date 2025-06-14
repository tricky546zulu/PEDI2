/**
 * equipmentSizes.js
 * This file contains pediatric equipment sizing data based on age and weight
 */

export const equipmentSizes = [
  {
    id: 'ett-uncuffed',
    name: 'Endotracheal Tube (Uncuffed)',
    description: 'For pediatric airway management, typically for children under 8 years',
    category: 'airway',
    sizingMethod: 'formula',
    sizeFormula: 'ETT',
    critical: true,
    sizes: [
      { value: '2.5 mm', ageRange: 'Premature', weightRange: '<1' },
      { value: '3.0 mm', ageRange: 'Newborn', weightRange: '1-3' },
      { value: '3.5 mm', ageRange: '0-6 months', weightRange: '3-5' },
      { value: '4.0 mm', ageRange: '6-18 months', weightRange: '5-10' },
      { value: '4.5 mm', ageRange: '18-36 months', weightRange: '10-14' },
      { value: '5.0 mm', ageRange: '3-5 years', weightRange: '14-18' },
      { value: '5.5 mm', ageRange: '5-6 years', weightRange: '18-22' },
      { value: '6.0 mm', ageRange: '6-8 years', weightRange: '22-30' }
    ],
    notes: 'Formula: (Age in years / 4) + 4 for uncuffed ETT'
  },
  {
    id: 'ett-cuffed',
    name: 'Endotracheal Tube (Cuffed)',
    description: 'For pediatric airway management, typically for children over 8 years',
    category: 'airway',
    sizingMethod: 'formula',
    sizeFormula: 'ETT-CUFFED',
    critical: true,
    sizes: [
      { value: '3.0 mm', ageRange: '0-6 months', weightRange: '3-5' },
      { value: '3.5 mm', ageRange: '6-18 months', weightRange: '5-10' },
      { value: '4.0 mm', ageRange: '18-36 months', weightRange: '10-14' },
      { value: '4.5 mm', ageRange: '3-5 years', weightRange: '14-18' },
      { value: '5.0 mm', ageRange: '5-6 years', weightRange: '18-22' },
      { value: '5.5 mm', ageRange: '6-8 years', weightRange: '22-30' },
      { value: '6.0 mm', ageRange: '8-10 years', weightRange: '30-35' },
      { value: '6.5 mm', ageRange: '10-12 years', weightRange: '35-45' },
      { value: '7.0 mm', ageRange: '12-14 years', weightRange: '45-55' }
    ],
    notes: 'Formula: (Age in years / 4) + 3.5 for cuffed ETT'
  },
  {
    id: 'laryngoscope-blade',
    name: 'Laryngoscope Blade',
    description: 'For visualization during intubation',
    category: 'airway',
    sizingMethod: 'age',
    critical: true,
    sizes: [
      { value: '0', ageRange: 'Premature to Newborn', weightRange: '<3' },
      { value: '1', ageRange: 'Newborn to 2 years', weightRange: '3-12' },
      { value: '2', ageRange: '2-8 years', weightRange: '12-30' },
      { value: '3', ageRange: '8+ years', weightRange: '30+' }
    ],
    notes: 'Straight (Miller) blade preferred for infants and small children'
  },
  {
    id: 'lma',
    name: 'Laryngeal Mask Airway (LMA)',
    description: 'Supraglottic airway device for oxygenation and ventilation',
    category: 'airway',
    sizingMethod: 'weight',
    sizes: [
      { value: '1', ageRange: 'Neonates', weightRange: '<5' },
      { value: '1.5', ageRange: 'Infants', weightRange: '5-10' },
      { value: '2', ageRange: 'Toddlers', weightRange: '10-20' },
      { value: '2.5', ageRange: 'Children', weightRange: '20-30' },
      { value: '3', ageRange: 'Children', weightRange: '30-50' }
    ],
    notes: 'Alternative when ETT placement is difficult'
  },
  {
    id: 'oral-airway',
    name: 'Oropharyngeal Airway',
    description: 'For maintaining patent airway',
    category: 'airway',
    sizingMethod: 'age',
    sizes: [
      { value: '50 mm (000)', ageRange: 'Premature', weightRange: '<2.5' },
      { value: '60 mm (00)', ageRange: 'Newborn', weightRange: '2.5-4' },
      { value: '70 mm (0)', ageRange: '1-6 months', weightRange: '4-6' },
      { value: '80 mm (1)', ageRange: '6-18 months', weightRange: '6-10' },
      { value: '90 mm (2)', ageRange: '18 mo-5 years', weightRange: '10-20' },
      { value: '100 mm (3)', ageRange: '5-10 years', weightRange: '20-30' },
      { value: '110 mm (4)', ageRange: '10+ years', weightRange: '30+' }
    ]
  },
  {
    id: 'bvm',
    name: 'Bag-Valve-Mask',
    description: 'For manual ventilation',
    category: 'breathing',
    sizingMethod: 'age',
    critical: true,
    sizes: [
      { value: 'Infant (250 mL)', ageRange: '0-1 year', weightRange: '<10' },
      { value: 'Child (500 mL)', ageRange: '1-8 years', weightRange: '10-30' },
      { value: 'Adult (1000+ mL)', ageRange: '8+ years', weightRange: '30+' }
    ],
    notes: 'Use appropriate size mask for tight seal'
  },
  {
    id: 'suction-catheter',
    name: 'Suction Catheter',
    description: 'For clearing secretions',
    category: 'breathing',
    sizingMethod: 'formula',
    sizeFormula: 'SUCTION-CATHETER',
    sizes: [
      { value: '6 Fr', ageRange: 'Premature', weightRange: '<1' },
      { value: '8 Fr', ageRange: 'Newborn to 6 months', weightRange: '1-5' },
      { value: '10 Fr', ageRange: '6-24 months', weightRange: '5-12' },
      { value: '12 Fr', ageRange: '2-6 years', weightRange: '12-22' },
      { value: '14 Fr', ageRange: '6+ years', weightRange: '22+' }
    ],
    notes: 'Size approximately 2x ETT size'
  },
  {
    id: 'iv-catheter',
    name: 'IV Catheter',
    description: 'For vascular access',
    category: 'iv',
    sizingMethod: 'age',
    sizes: [
      { value: '24G', ageRange: 'Premature to 6 months', weightRange: '<6' },
      { value: '22G', ageRange: '6 months to 6 years', weightRange: '6-22' },
      { value: '20G', ageRange: '6-12 years', weightRange: '22-40' },
      { value: '18G', ageRange: '12+ years', weightRange: '40+' }
    ]
  },
  {
    id: 'io-needle',
    name: 'IO Needle',
    description: 'For intraosseous access',
    category: 'iv',
    critical: true,
    sizingMethod: 'age',
    sizes: [
      { value: '15mm', ageRange: '0-3 years', weightRange: '<15' },
      { value: '25mm', ageRange: '3+ years', weightRange: '15+' },
      { value: '45mm', ageRange: 'Adolescent/Obese', weightRange: '40+' }
    ],
    notes: 'For EZ-IO system; manual IO sizes may vary'
  },
  {
    id: 'ng-tube',
    name: 'Nasogastric Tube',
    description: 'For gastric decompression',
    category: 'breathing',
    sizingMethod: 'age',
    sizes: [
      { value: '5 Fr', ageRange: 'Premature', weightRange: '<1' },
      { value: '8 Fr', ageRange: 'Newborn to 1 year', weightRange: '1-10' },
      { value: '10 Fr', ageRange: '1-6 years', weightRange: '10-20' },
      { value: '12 Fr', ageRange: '6-12 years', weightRange: '20-40' },
      { value: '14-18 Fr', ageRange: '12+ years', weightRange: '40+' }
    ]
  },
  {
    id: 'bp-cuff',
    name: 'Blood Pressure Cuff',
    description: 'For non-invasive blood pressure monitoring',
    category: 'circulation',
    sizingMethod: 'age',
    sizes: [
      { value: 'Newborn (1)', ageRange: 'Premature to Newborn', weightRange: '<4' },
      { value: 'Infant (2)', ageRange: 'Newborn to 1 year', weightRange: '4-8' },
      { value: 'Child (3)', ageRange: '1-6 years', weightRange: '8-20' },
      { value: 'Small Adult (4)', ageRange: '6-12 years', weightRange: '20-40' },
      { value: 'Adult (5)', ageRange: '12+ years', weightRange: '40+' }
    ],
    notes: 'Cuff width should be 40% of arm circumference'
  },
  {
    id: 'nrb-mask',
    name: 'Non-rebreather Mask',
    description: 'For high concentration oxygen delivery',
    category: 'breathing',
    sizingMethod: 'age',
    sizes: [
      { value: 'Infant', ageRange: '0-1 year', weightRange: '<10' },
      { value: 'Child', ageRange: '1-8 years', weightRange: '10-30' },
      { value: 'Adult', ageRange: '8+ years', weightRange: '30+' }
    ]
  },
  {
    id: 'chest-tube',
    name: 'Chest Tube',
    description: 'For pneumothorax or hemothorax',
    category: 'breathing',
    sizingMethod: 'age',
    sizes: [
      { value: '8-12 Fr', ageRange: 'Newborn', weightRange: '<3' },
      { value: '14-20 Fr', ageRange: 'Infant to preschool', weightRange: '3-18' },
      { value: '20-32 Fr', ageRange: 'School age to adolescent', weightRange: '18+' }
    ]
  },
  {
    id: 'foley-catheter',
    name: 'Foley Catheter',
    description: 'For urinary catheterization',
    category: 'circulation',
    sizingMethod: 'age',
    sizes: [
      { value: '5-6 Fr', ageRange: 'Newborn to 1 year', weightRange: '<10' },
      { value: '8 Fr', ageRange: '1-6 years', weightRange: '10-20' },
      { value: '10 Fr', ageRange: '6-12 years', weightRange: '20-40' },
      { value: '12+ Fr', ageRange: '12+ years', weightRange: '40+' }
    ]
  }
];

export default equipmentSizes;
