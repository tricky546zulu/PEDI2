/**
 * calculations.js - Utility functions for medical calculations
 * 
 * This module provides functions for calculating medication doses, equipment sizes,
 * and other essential parameters for pediatric emergency care.
 */

/**
 * Calculate medication dose based on patient weight and age
 *
 * @param {Object} medication - Medication object with dosing information
 * @param {number} weight - Patient weight in kg
 * @param {number|null} age - Patient age in months (optional)
 * @return {number} - Calculated dose value
 */
export const calculateDose = (medication, weight, age = null) => {
  if (!weight || weight <= 0) {
    throw new Error("Valid patient weight is required");
  }

  // Get appropriate dose per kg based on age if applicable
  let dosePerKg = medication.dosePerKg;
  
  // Some medications have different dosing based on age
  if (medication.ageSpecificDosing && age !== null) {
    for (const ageDose of medication.ageSpecificDosing) {
      if (age >= ageDose.minAge && age <= ageDose.maxAge) {
        dosePerKg = ageDose.dosePerKg;
        break;
      }
    }
  }

  // Calculate the dose
  let calculatedDose = weight * dosePerKg;
  
  // Apply minimum/maximum dose constraints if present
  if (medication.minDose !== undefined && calculatedDose < medication.minDose) {
    calculatedDose = medication.minDose;
  }
  
  if (medication.maxDose !== undefined && calculatedDose > medication.maxDose) {
    calculatedDose = medication.maxDose;
  }
  
  return calculatedDose;
};

/**
 * Calculate volume of medication to administer
 *
 * @param {Object} medication - Medication object with concentration information
 * @param {number} dose - Calculated dose
 * @return {number} - Volume in mL
 */
export const calculateVolume = (medication, dose) => {
  if (!medication.concentration) {
    throw new Error("Medication concentration is required");
  }
  
  // Parse concentration (e.g., "10 mg/mL")
  const concentrationParts = medication.concentration.split(' ');
  const concentrationValue = parseFloat(concentrationParts[0]);
  
  if (isNaN(concentrationValue) || concentrationValue <= 0) {
    throw new Error("Invalid medication concentration");
  }
  
  // Calculate volume
  const volume = dose / concentrationValue;
  
  return volume;
};

/**
 * Calculate equipment size based on patient parameters
 *
 * @param {Object} equipment - Equipment object with sizing information
 * @param {number|null} weight - Patient weight in kg (optional)
 * @param {number|null} age - Patient age in months (optional)
 * @param {number|null} length - Patient length in cm (optional)
 * @return {string|null} - Recommended equipment size
 */
export const calculateEquipmentSize = (equipment, weight = null, age = null, length = null) => {
  // If no patient parameters available
  if (!weight && !age && !length) {
    return null;
  }
  
  // Different equipment may use different sizing methods
  switch (equipment.sizingMethod) {
    case 'weight': {
      if (!weight) return null;
      
      for (const size of equipment.sizes) {
        if (size.weightRange) {
          const [min, max] = size.weightRange.split('-').map(Number);
          if (weight >= min && weight <= max) {
            return size.value;
          }
        }
      }
      break;
    }
    
    case 'age': {
      if (!age) return null;
      
      for (const size of equipment.sizes) {
        if (size.ageRangeMonths) {
          const [min, max] = size.ageRangeMonths.split('-').map(Number);
          if (age >= min && age <= max) {
            return size.value;
          }
        }
      }
      break;
    }
    
    case 'length': {
      if (!length) return null;
      
      for (const size of equipment.sizes) {
        if (size.lengthRange) {
          const [min, max] = size.lengthRange.split('-').map(Number);
          if (length >= min && length <= max) {
            return size.value;
          }
        }
      }
      break;
    }
    
    case 'formula': {
      // Handle equipment with specific formulas
      if (equipment.sizeFormula === 'ETT') {
        // Endotracheal tube sizing formula: (age in years / 4) + 4
        if (age !== null) {
          const ageInYears = age / 12;
          const uncuffedSize = (ageInYears / 4) + 4;
          // Round to nearest 0.5
          return (Math.round(uncuffedSize * 2) / 2).toFixed(1);
        }
      } 
      else if (equipment.sizeFormula === 'ETT-CUFFED') {
        // Cuffed endotracheal tube formula: (age in years / 4) + 3.5
        if (age !== null) {
          const ageInYears = age / 12;
          const cuffedSize = (ageInYears / 4) + 3.5;
          // Round to nearest 0.5
          return (Math.round(cuffedSize * 2) / 2).toFixed(1);
        }
      }
      else if (equipment.sizeFormula === 'SUCTION-CATHETER') {
        // Suction catheter sizing (typically 2x ETT size)
        if (age !== null) {
          const ageInYears = age / 12;
          const ettSize = (ageInYears / 4) + 4;
          const suctionSize = ettSize * 2;
          // Convert to Fr/Ch (French) sizing
          return Math.round(suctionSize).toString() + ' Fr';
        }
      }
      break;
    }
    
    default:
      // Default to weight-based if method not specified
      if (weight && equipment.sizes) {
        // Find closest size based on weight
        return equipment.sizes.reduce((closest, size) => {
          if (size.weightRange) {
            const [min, max] = size.weightRange.split('-').map(Number);
            const midpoint = (min + max) / 2;
            if (Math.abs(weight - midpoint) < Math.abs(weight - closest.midpoint)) {
              return { value: size.value, midpoint };
            }
          }
          return closest;
        }, { value: null, midpoint: Infinity }).value;
      }
      break;
  }
  
  return null;
};

/**
 * Calculate fluid bolus volume
 *
 * @param {number} weight - Patient weight in kg
 * @param {number} mlPerKg - ml/kg rate (default 20 ml/kg)
 * @return {number} - Bolus volume in ml
 */
export const calculateBolusVolume = (weight, mlPerKg = 20) => {
  if (!weight || weight <= 0) {
    throw new Error("Valid patient weight is required");
  }
  
  return weight * mlPerKg;
};

/**
 * Calculate energy level for defibrillation
 *
 * @param {number} weight - Patient weight in kg
 * @param {number} joulePerKg - Joules/kg (default 2 J/kg for initial shock)
 * @return {number} - Energy level in Joules
 */
export const calculateDefibrillationEnergy = (weight, joulePerKg = 2) => {
  if (!weight || weight <= 0) {
    throw new Error("Valid patient weight is required");
  }
  
  // Calculate energy level
  let energy = weight * joulePerKg;
  
  // Round to nearest 5 J
  return Math.round(energy / 5) * 5;
};

/**
 * Calculate synchronized cardioversion energy
 *
 * @param {number} weight - Patient weight in kg
 * @param {string} rhythmType - Type of arrhythmia 
 * @param {number} attempt - Attempt number (1st, 2nd, etc.)
 * @return {number} - Energy level in Joules
 */
export const calculateCardioversionEnergy = (weight, rhythmType, attempt = 1) => {
  if (!weight || weight <= 0) {
    throw new Error("Valid patient weight is required");
  }
  
  let joulePerKg;
  
  // SVT typically starts at 0.5-1 J/kg
  if (rhythmType === 'SVT') {
    joulePerKg = attempt === 1 ? 0.5 : 1;
  } 
  // VT with pulse typically starts at 0.5-1 J/kg
  else if (rhythmType === 'VT') {
    joulePerKg = attempt === 1 ? 0.5 : (attempt === 2 ? 1 : 2);
  } 
  // Default
  else {
    joulePerKg = 1;
  }
  
  // Calculate energy level
  let energy = weight * joulePerKg;
  
  // Round to nearest 5 J
  return Math.round(energy / 5) * 5;
};

/**
 * Get age-appropriate vital signs
 * 
 * @param {number} ageInMonths - Patient age in months
 * @return {Object} - Object containing normal ranges for HR, RR, BP
 */
export const getVitalSignsForAge = (ageInMonths) => {
  if (ageInMonths < 0) {
    throw new Error("Age cannot be negative");
  }
  
  // Age group definitions
  if (ageInMonths < 1) {
    // Newborn (0-1 month)
    return {
      hrRange: [100, 160],
      rrRange: [30, 60],
      sbpRange: [60, 90],
      dbpRange: [30, 60]
    };
  } else if (ageInMonths < 6) {
    // 1-6 months
    return {
      hrRange: [100, 160],
      rrRange: [30, 60],
      sbpRange: [70, 100],
      dbpRange: [45, 65]
    };
  } else if (ageInMonths < 12) {
    // 6-12 months
    return {
      hrRange: [90, 150],
      rrRange: [25, 40],
      sbpRange: [80, 100],
      dbpRange: [55, 65]
    };
  } else if (ageInMonths < 36) {
    // 1-3 years
    return {
      hrRange: [80, 140],
      rrRange: [20, 30],
      sbpRange: [90, 105],
      dbpRange: [55, 70]
    };
  } else if (ageInMonths < 60) {
    // 3-5 years
    return {
      hrRange: [70, 120],
      rrRange: [20, 25],
      sbpRange: [95, 110],
      dbpRange: [60, 75]
    };
  } else if (ageInMonths < 120) {
    // 5-10 years
    return {
      hrRange: [70, 110],
      rrRange: [15, 20],
      sbpRange: [95, 120],
      dbpRange: [60, 75]
    };
  } else {
    // 10+ years
    return {
      hrRange: [60, 100],
      rrRange: [12, 20],
      sbpRange: [110, 130],
      dbpRange: [65, 80]
    };
  }
};
