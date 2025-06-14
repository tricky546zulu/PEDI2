/**
 * calculations.js
 * Utility functions for pediatric calculations including drug dosing,
 * equipment sizing, and vital signs references
 */

import { weightEstimation, getVitalSignsForAge as getVitals } from '../data/vitalSigns';

/**
 * Calculate medication dose based on patient weight
 * @param {number} weight - Patient weight in kg
 * @param {object} medication - Medication object with dosing info
 * @returns {object} - Calculated dose information
 */
export function calculateMedicationDose(weight, medication) {
  if (!weight || !medication) {
    return {
      recommendedDose: null,
      minDose: null,
      maxDose: null,
      calculatedDose: null,
    };
  }

  // Calculate the recommended dose based on weight
  const calculatedDose = medication.dosePerKg * weight;
  
  // Cap at maximum dose if applicable
  const finalDose = medication.maxDose 
    ? Math.min(calculatedDose, medication.maxDose) 
    : calculatedDose;
  
  // Format the dose with appropriate precision
  const formattedDose = formatDoseWithUnits(finalDose, medication.doseUnit);
  
  // For medications with dose ranges
  let minDose = null;
  let maxDose = null;
  
  if (medication.doseRangeMin && medication.doseRangeMax) {
    minDose = formatDoseWithUnits(medication.doseRangeMin * weight, medication.doseUnit);
    maxDose = formatDoseWithUnits(
      Math.min(medication.doseRangeMax * weight, medication.maxDose || Infinity),
      medication.doseUnit
    );
  }
  
  return {
    recommendedDose: formattedDose,
    minDose,
    maxDose,
    calculatedDose: finalDose,
  };
}

/**
 * Format dose with appropriate units and precision
 * @param {number} dose - The calculated dose
 * @param {string} unit - The dose unit (mg, mcg, etc)
 * @returns {string} - Formatted dose string
 */
export function formatDoseWithUnits(dose, unit) {
  if (dose === null || dose === undefined) return null;
  
  // Format numbers appropriately based on size
  let formattedDose;
  if (dose < 0.1) {
    formattedDose = dose.toFixed(3);
  } else if (dose < 1) {
    formattedDose = dose.toFixed(2);
  } else if (dose < 10) {
    formattedDose = dose.toFixed(1);
  } else {
    formattedDose = Math.round(dose);
  }
  
  // Remove trailing zeros
  formattedDose = parseFloat(formattedDose).toString();
  
  return `${formattedDose} ${unit}`;
}

/**
 * Calculate equipment size based on age, weight, or length
 * @param {object} patient - Patient data (age, weight, length)
 * @param {object} equipment - Equipment object with sizing info
 * @returns {object} - Recommended equipment size
 */
export function calculateEquipmentSize(patient, equipment) {
  if (!equipment) return null;
  
  const { age, weight, length } = patient;
  
  // Default to null
  let recommendedSize = null;
  let sizeNotes = null;
  
  // If equipment has a specific sizing formula
  if (equipment.sizingMethod === 'formula') {
    recommendedSize = getSizeByFormula(equipment.sizeFormula, age, weight);
    sizeNotes = equipment.notes || null;
  } 
  // If equipment is sized by weight
  else if (equipment.sizingMethod === 'weight' && weight) {
    recommendedSize = getSizeByWeight(equipment.sizes, weight);
  }
  // If equipment is sized by age
  else if (equipment.sizingMethod === 'age' && age) {
    recommendedSize = getSizeByAge(equipment.sizes, age);
  }
  // If equipment is sized by length (e.g., Broselow tape)
  else if (equipment.sizingMethod === 'length' && length) {
    recommendedSize = getSizeByLength(equipment.sizes, length);
  }
  
  return {
    size: recommendedSize,
    notes: sizeNotes
  };
}

/**
 * Get equipment size based on formula
 * @param {string} formula - Formula identifier
 * @param {number} ageMonths - Age in months
 * @param {number} weight - Weight in kg
 * @returns {string} - Calculated size
 */
function getSizeByFormula(formula, ageMonths, weight) {
  const ageYears = ageMonths / 12;
  
  switch(formula) {
    case 'ETT':
      // Uncuffed ETT formula: (age/4) + 4
      return `${((ageYears / 4) + 4).toFixed(1)} mm`;
    
    case 'ETT-CUFFED':
      // Cuffed ETT formula: (age/4) + 3.5
      return `${((ageYears / 4) + 3.5).toFixed(1)} mm`;
    
    case 'SUCTION-CATHETER':
      // Suction catheter is typically 2x ETT size in Fr
      const ettSize = (ageYears / 4) + 4;
      return `${Math.round(ettSize * 2)} Fr`;
    
    default:
      return null;
  }
}

/**
 * Get equipment size based on weight range
 * @param {Array} sizes - Array of size options with weight ranges
 * @param {number} weight - Patient weight in kg
 * @returns {string} - Recommended size
 */
function getSizeByWeight(sizes, weight) {
  if (!sizes || !sizes.length || !weight) return null;
  
  // Find the size where weight falls within range
  for (const size of sizes) {
    // Parse weight range (e.g., "10-20" or "<5" or "40+")
    const range = size.weightRange;
    
    if (range.includes('-')) {
      // Range format "10-20"
      const [min, max] = range.split('-').map(v => parseFloat(v));
      if (weight >= min && weight <= max) return size.value;
    } 
    else if (range.startsWith('<')) {
      // Range format "<5"
      const max = parseFloat(range.substring(1));
      if (weight < max) return size.value;
    }
    else if (range.endsWith('+')) {
      // Range format "40+"
      const min = parseFloat(range.substring(0, range.length - 1));
      if (weight >= min) return size.value;
    }
  }
  
  // If no match, find closest range
  const lastSize = sizes[sizes.length - 1];
  const firstSize = sizes[0];
  
  // If weight is greater than the max of the last range
  if (lastSize.weightRange.endsWith('+')) {
    return lastSize.value;
  }
  // If weight is less than the min of the first range
  if (firstSize.weightRange.startsWith('<')) {
    return firstSize.value;
  }
  
  return null;
}

/**
 * Get equipment size based on age range
 * @param {Array} sizes - Array of size options with age ranges
 * @param {number} ageMonths - Age in months
 * @returns {string} - Recommended size
 */
function getSizeByAge(sizes, ageMonths) {
  if (!sizes || !sizes.length || !ageMonths) return null;
  
  // Convert months to years for comparison
  const ageYears = ageMonths / 12;
  
  // Helper function to convert age range string to months
  const parseAgeRange = (rangeStr) => {
    // Common patterns: "0-1 year", "1-3 years", "6-12 months", "6+ years"
    let min = 0, max = Infinity;
    
    // Match patterns like "0-1 year", "1-3 years"
    const yearRangeMatch = rangeStr.match(/(\d+)\s*-\s*(\d+)\s*years?/i);
    if (yearRangeMatch) {
      min = parseInt(yearRangeMatch[1]) * 12;
      max = parseInt(yearRangeMatch[2]) * 12;
      return { min, max };
    }
    
    // Match patterns like "6-18 months"
    const monthRangeMatch = rangeStr.match(/(\d+)\s*-\s*(\d+)\s*months?/i);
    if (monthRangeMatch) {
      min = parseInt(monthRangeMatch[1]);
      max = parseInt(monthRangeMatch[2]);
      return { min, max };
    }
    
    // Match patterns like "6+ years"
    const plusYearMatch = rangeStr.match(/(\d+)\+\s*years?/i);
    if (plusYearMatch) {
      min = parseInt(plusYearMatch[1]) * 12;
      return { min, max };
    }
    
    // Match patterns like "12+ months"
    const plusMonthMatch = rangeStr.match(/(\d+)\+\s*months?/i);
    if (plusMonthMatch) {
      min = parseInt(plusMonthMatch[1]);
      return { min, max };
    }
    
    // Match "Newborn"
    if (rangeStr.toLowerCase().includes('newborn')) {
      max = 1;
      return { min, max };
    }
    
    // Match "Premature"
    if (rangeStr.toLowerCase().includes('premature')) {
      max = 0;
      return { min, max };
    }
    
    return { min: 0, max: Infinity };
  };
  
  // Find the size where age falls within range
  for (const size of sizes) {
    const range = parseAgeRange(size.ageRange);
    if (ageMonths >= range.min && ageMonths <= range.max) {
      return size.value;
    }
  }
  
  // If no exact match, return closest (either last or first size)
  if (ageMonths > parseAgeRange(sizes[sizes.length - 1].ageRange).min) {
    return sizes[sizes.length - 1].value;
  }
  
  return sizes[0].value;
}

/**
 * Get equipment size based on length (using Broselow method)
 * @param {Array} sizes - Array of size options with length ranges
 * @param {number} lengthCm - Patient length in cm
 * @returns {string} - Recommended size
 */
function getSizeByLength(sizes, lengthCm) {
  if (!sizes || !sizes.length || !lengthCm) return null;
  
  // Find the size where length falls within range
  for (const size of sizes) {
    if (size.lengthRange) {
      const [min, max] = size.lengthRange;
      if (lengthCm >= min && lengthCm <= max) {
        return size.value;
      }
    }
  }
  
  return null;
}

/**
 * Estimate weight based on age, length, or other parameters
 * @param {object} patient - Patient data (age, length)
 * @param {string} method - Method to use for estimation
 * @returns {number} - Estimated weight in kg
 */
export function estimateWeight(patient, method = 'standard') {
  const { ageMonths, lengthCm } = patient;
  
  // Age-based estimation
  if (ageMonths !== undefined && ageMonths !== null) {
    const ageYears = ageMonths / 12;
    
    if (ageMonths < 12) {
      // For infants under 1 year
      return weightEstimation.formulae.infant(ageMonths);
    }
    
    // Use specified method
    switch (method) {
      case 'apls':
        return weightEstimation.formulae.apls(ageYears);
      case 'erc':
        return weightEstimation.formulae.erc(ageYears);
      case 'luscombe':
        return weightEstimation.formulae.luscombe(ageYears);
      case 'standard':
      default:
        return weightEstimation.formulae.standard(ageYears);
    }
  }
  
  // Length-based estimation (Broselow)
  if (lengthCm !== undefined && lengthCm !== null) {
    // Find the Broselow color zone based on length
    for (const zone of weightEstimation.broselow) {
      const [minLength, maxLength] = zone.length;
      if (lengthCm >= minLength && lengthCm <= maxLength) {
        // Return midpoint of weight range
        const [minWeight, maxWeight] = zone.weightRange;
        return (minWeight + maxWeight) / 2;
      }
    }
    
    // If outside Broselow range, use the ideal body weight formula
    return weightEstimation.idealBodyWeight(lengthCm);
  }
  
  return null;
}

/**
 * Calculate tidal volume for ventilator settings
 * @param {number} weight - Patient weight in kg
 * @param {number} mlPerKg - ml/kg (usually 6-8 ml/kg)
 * @returns {number} - Calculated tidal volume in ml
 */
export function calculateTidalVolume(weight, mlPerKg = 7) {
  if (!weight) return null;
  return Math.round(weight * mlPerKg);
}

/**
 * Get normal vital sign ranges for patient age
 * @param {number} ageMonths - Patient age in months
 * @returns {object} - Vital sign ranges
 */
export function getVitalSignsForAge(ageMonths) {
  return getVitals(ageMonths);
}

/**
 * Calculate resuscitation drug doses
 * @param {number} weight - Patient weight in kg
 * @returns {object} - Common resuscitation drug doses
 */
export function calculateResuscitationDoses(weight) {
  if (!weight) return null;
  
  return {
    epinephrine: {
      cardiac: {
        dose: `${(0.01 * weight).toFixed(2)} mg`,
        concentration: '1:10,000',
        volume: `${(0.1 * weight).toFixed(1)} mL`
      },
      anaphylaxis: {
        dose: `${(0.01 * weight).toFixed(2)} mg`,
        concentration: '1:1,000',
        volume: `${(0.01 * weight).toFixed(2)} mL`
      }
    },
    amiodarone: {
      dose: `${Math.min(5 * weight, 300)} mg`,
      volume: `${Math.min((5 * weight) / 50, 6).toFixed(1)} mL`
    },
    adenosine: {
      firstDose: {
        dose: `${Math.min(0.1 * weight, 6)} mg`,
        volume: `${Math.min((0.1 * weight) / 3, 2).toFixed(1)} mL`
      },
      secondDose: {
        dose: `${Math.min(0.2 * weight, 12)} mg`,
        volume: `${Math.min((0.2 * weight) / 3, 4).toFixed(1)} mL`
      }
    },
    dextrose: {
      dose: `${0.5 * weight} g`,
      volume: `${5 * weight} mL of D10W`
    },
    fluid: {
      bolus: `${20 * weight} mL`
    },
    defib: {
      firstDose: `${2 * weight} Joules`,
      subsequentDose: `${4 * weight} Joules`
    }
  };
}

export default {
  calculateMedicationDose,
  calculateEquipmentSize,
  estimateWeight,
  calculateTidalVolume,
  getVitalSignsForAge,
  calculateResuscitationDoses
};
