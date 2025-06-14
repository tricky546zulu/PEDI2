/**
 * Utility functions for various medical calculations
 */

/**
 * Calculate medication dosage based on weight and age
 * @param {Object} dosing - The dosing information
 * @param {number} weight - Patient weight in kg
 * @param {number|null} age - Patient age in months (optional)
 * @returns {Object} - Calculated dosing information
 */
export const calculateDose = (dosing, weight, age = null) => {
  // Return empty object if no weight provided
  if (!weight) return {};
  
  // Extract dose information
  const { doseRange, doseMin, doseMax, doseUnit, concentration, route } = dosing;
  
  // Calculate min and max doses if available
  let minDose = null;
  let maxDose = null;
  let calculatedDose = null;
  
  // If we have specific min/max dose per kg
  if (doseMin !== undefined && doseMax !== undefined) {
    minDose = `${(doseMin * weight).toFixed(2)} ${doseUnit}`;
    maxDose = `${(doseMax * weight).toFixed(2)} ${doseUnit}`;
    
    // Calculate a middle-ground dose for the recommendation
    const midDose = (doseMin + doseMax) / 2;
    calculatedDose = `${(midDose * weight).toFixed(2)} ${doseUnit}`;
    
    // If there's concentration information, add volume
    if (concentration) {
      const midVolume = ((midDose * weight) / concentration).toFixed(2);
      calculatedDose += ` (${midVolume} mL)`;
    }
  } 
  // If we have a fixed dose based on weight ranges
  else if (dosing.weightBasedDosing) {
    const dosing = findWeightBasedDosing(dosing.weightBasedDosing, weight);
    if (dosing) {
      calculatedDose = dosing.dose;
      minDose = maxDose = dosing.dose;
    } else {
      calculatedDose = "Not recommended for this weight";
    }
  }
  // If we have a fixed dose or other calculation method
  else {
    calculatedDose = doseRange.replace('{weight}', weight);
  }
  
  // Age-specific adjustments if needed
  if (age !== null && dosing.ageAdjustments) {
    for (const adjustment of dosing.ageAdjustments) {
      if ((adjustment.minAge === undefined || age >= adjustment.minAge) &&
          (adjustment.maxAge === undefined || age <= adjustment.maxAge)) {
        // Apply age-specific adjustment
        calculatedDose = adjustment.dose.replace('{weight}', weight);
        break;
      }
    }
  }
  
  return {
    calculatedDose,
    minDose,
    maxDose
  };
};

/**
 * Find appropriate dosing based on weight ranges
 * @param {Array} weightBasedDosing - Array of weight-based dosing options
 * @param {number} weight - Patient weight in kg
 * @returns {Object|null} - The matched dosing or null
 */
const findWeightBasedDosing = (weightBasedDosing, weight) => {
  for (const dosing of weightBasedDosing) {
    if (weight >= dosing.minWeight && weight <= dosing.maxWeight) {
      return dosing;
    }
  }
  return null;
};

/**
 * Calculate equipment size based on patient weight and/or age
 * @param {Object} equipment - Equipment information
 * @param {number|null} weight - Patient weight in kg
 * @param {number|null} age - Patient age in months
 * @returns {Object} - Recommended size information
 */
export const calculateEquipmentSize = (equipment, weight = null, age = null) => {
  const result = {
    size: null,
    formula: null,
    sizeDetails: null,
    notes: null,
    alternativeSizes: []
  };
  
  // If equipment has a size chart, use that for the calculation
  if (equipment.sizeChart && equipment.sizeChart.length > 0) {
    // Determine which parameter to use for lookup
    const param = equipment.sizeBy === 'age' ? age : weight;
    const paramType = equipment.sizeBy === 'age' ? 'ageRange' : 'weightRange';
    
    if (param !== null) {
      // Find the matching chart entry
      for (const entry of equipment.sizeChart) {
        const range = entry[paramType];
        if (range) {
          // Parse range (format: "X-Y" or ">Z" or "<W")
          if (range.includes('-')) {
            const [min, max] = range.split('-').map(n => parseFloat(n));
            if (param >= min && param <= max) {
              result.size = entry.size;
              result.sizeDetails = entry.details;
              break;
            }
          } else if (range.startsWith('>')) {
            const threshold = parseFloat(range.substring(1));
            if (param > threshold) {
              result.size = entry.size;
              result.sizeDetails = entry.details;
              break;
            }
          } else if (range.startsWith('<')) {
            const threshold = parseFloat(range.substring(1));
            if (param < threshold) {
              result.size = entry.size;
              result.sizeDetails = entry.details;
              break;
            }
          } else if (range.includes(',')) {
            // Handle comma-separated values
            const values = range.split(',').map(v => parseFloat(v.trim()));
            if (values.includes(param)) {
              result.size = entry.size;
              result.sizeDetails = entry.details;
              break;
            }
          }
        }
      }
    }
  } 
  // If there's a sizing formula, use that
  else if (equipment.formula) {
    if ((equipment.formula.requiresWeight && weight === null) || 
        (equipment.formula.requiresAge && age === null)) {
      result.size = 'Missing required patient data';
      return result;
    }
    
    // Process the formula
    const formula = equipment.formula.equation;
    let calculatedValue;
    
    try {
      // Replace weight and age placeholders with values
      const equation = formula
        .replace(/\{weight\}/g, weight || 0)
        .replace(/\{age\}/g, age || 0);
      
      // Safely evaluate the formula
      calculatedValue = Function(`'use strict'; return (${equation})`)();
      
      // Round according to specified precision
      if (equipment.formula.precision !== undefined) {
        const precision = equipment.formula.precision;
        calculatedValue = Number(calculatedValue.toFixed(precision));
      }
      
      // Format the result
      result.size = `${calculatedValue} ${equipment.formula.unit || ''}`.trim();
      result.formula = formula;
      
      // Add formula details
      if (equipment.formula.name) {
        result.sizeDetails = `Calculated using ${equipment.formula.name}`;
      }
      
      // If there are min/max constraints
      if (equipment.formula.min !== undefined && calculatedValue < equipment.formula.min) {
        result.size = `${equipment.formula.min} ${equipment.formula.unit || ''}`.trim();
        result.notes = `Calculated value below minimum - using minimum size`;
      } else if (equipment.formula.max !== undefined && calculatedValue > equipment.formula.max) {
        result.size = `${equipment.formula.max} ${equipment.formula.unit || ''}`.trim();
        result.notes = `Calculated value above maximum - using maximum size`;
      }
    } catch (error) {
      result.size = 'Error in calculation';
      result.notes = 'Unable to calculate size';
    }
  }
  
  // If no size was determined
  if (!result.size) {
    result.size = 'Unable to determine size';
    result.notes = 'No matching size found for this patient';
  }
  
  // Add alternative sizes if specified
  if (equipment.alternativeSizes) {
    result.alternativeSizes = equipment.alternativeSizes;
  }
  
  return result;
};

/**
 * Convert pounds to kilograms
 * @param {number} pounds - Weight in pounds
 * @returns {number} - Weight in kilograms
 */
export const lbsToKg = (pounds) => {
  return pounds * 0.45359237;
};

/**
 * Convert kilograms to pounds
 * @param {number} kg - Weight in kilograms
 * @returns {number} - Weight in pounds
 */
export const kgToLbs = (kg) => {
  return kg / 0.45359237;
};

/**
 * Calculate ideal body weight (IBW) for pediatric patients
 * @param {number} height - Height in cm
 * @param {number} age - Age in months
 * @returns {number} - Ideal body weight in kg
 */
export const calculatePediatricIBW = (height, age) => {
  // Different formulas depending on age
  if (age <= 12) { // Infants
    return (height - 45) / 2;
  } else if (age <= 60) { // 1-5 years
    return (2 * height + 10) / 100;
  } else { // > 5 years
    return (3 * height - 100) / 100;
  }
};

/**
 * Calculate Broselow tape color zone based on height
 * @param {number} height - Patient height in cm
 * @returns {Object} - Broselow zone information
 */
export const calculateBroselowZone = (height) => {
  // Broselow zones
  const zones = [
    { color: 'Gray', minHeight: 0, maxHeight: 57, weight: 5 },
    { color: 'Pink', minHeight: 57, maxHeight: 67, weight: 7 },
    { color: 'Red', minHeight: 67, maxHeight: 75, weight: 8 },
    { color: 'Purple', minHeight: 75, maxHeight: 85, weight: 10 },
    { color: 'Yellow', minHeight: 85, maxHeight: 95, weight: 12 },
    { color: 'White', minHeight: 95, maxHeight: 107, weight: 15 },
    { color: 'Blue', minHeight: 107, maxHeight: 124, weight: 18 },
    { color: 'Orange', minHeight: 124, maxHeight: 140, weight: 24 },
    { color: 'Green', minHeight: 140, maxHeight: 155, weight: 30 },
  ];
  
  // Find the appropriate zone
  for (const zone of zones) {
    if (height >= zone.minHeight && height < zone.maxHeight) {
      return zone;
    }
  }
  
  // Patient is too tall for Broselow
  return { color: 'Adult', weight: 'Use adult dosing', notes: 'Patient exceeds pediatric length-based tape' };
};
