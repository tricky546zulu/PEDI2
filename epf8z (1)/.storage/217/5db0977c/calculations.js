/**
 * Utility functions for pediatric emergency calculations
 */

/**
 * Calculate drug dosage based on patient weight
 * @param {number} weight - Patient weight in kg
 * @param {number} dosePerKg - Dose per kg
 * @param {number} minDose - Minimum dose
 * @param {number} maxDose - Maximum dose
 * @param {number} [precision=2] - Number of decimal places for rounding
 * @returns {number} The calculated dose
 */
export const calculateDrugDose = (weight, dosePerKg, minDose, maxDose, precision = 2) => {
  if (!weight || weight <= 0 || !dosePerKg) return null;
  
  // Calculate dose
  let dose = weight * dosePerKg;
  
  // Apply min/max constraints if provided
  if (minDose !== undefined && minDose !== null) {
    dose = Math.max(dose, minDose);
  }
  
  if (maxDose !== undefined && maxDose !== null) {
    dose = Math.min(dose, maxDose);
  }
  
  // Round to specified precision
  return parseFloat(dose.toFixed(precision));
};

/**
 * Calculate defibrillation energy based on patient weight
 * @param {number} weight - Patient weight in kg
 * @param {number} joulesPerkKg - Joules per kg
 * @param {number} maxEnergy - Maximum energy in joules
 * @returns {number} The calculated energy in joules
 */
export const calculateDefibrillationEnergy = (weight, joulesPerKg, maxEnergy) => {
  if (!weight || weight <= 0 || !joulesPerKg) return null;
  
  // Calculate energy
  let energy = Math.round(weight * joulesPerKg);
  
  // Apply max if provided
  if (maxEnergy !== undefined && maxEnergy !== null) {
    energy = Math.min(energy, maxEnergy);
  }
  
  return energy;
};

/**
 * Calculate ETT (Endotracheal Tube) size based on patient age or weight
 * @param {number} age - Patient age in months
 * @param {number} [weight] - Optional patient weight in kg
 * @returns {Object} ETT sizes (cuffed and uncuffed) and depth
 */
export const calculateETTSize = (age, weight) => {
  // Default values
  let uncuffedSize = null;
  let cuffedSize = null;
  let depth = null;
  
  // Calculate sizes based on age (in months)
  if (age !== null && age !== undefined) {
    // Convert to years for calculation
    const ageInYears = age / 12;
    
    // For children > 1 year
    if (ageInYears >= 1) {
      uncuffedSize = (ageInYears / 4) + 4;
      cuffedSize = (ageInYears / 4) + 3.5;
      depth = (ageInYears / 2) + 12;
    } 
    // For infants < 1 year
    else {
      // For premature or newborns, use weight-based calculation if available
      if (weight && weight < 3) {
        uncuffedSize = 2.5;
        cuffedSize = null; // Cuffed tubes typically not used in neonates
        depth = weight + 6;
      } else {
        uncuffedSize = 3.5;
        cuffedSize = 3.0;
        depth = 10.5;
      }
    }
  }
  // If age not available but weight is
  else if (weight !== null && weight !== undefined) {
    // Estimate based on Broselow tape approximations
    if (weight < 3) {
      uncuffedSize = 2.5;
      cuffedSize = null;
      depth = weight + 6;
    } else if (weight < 8) {
      uncuffedSize = 3.5;
      cuffedSize = 3.0;
      depth = 10.5;
    } else if (weight < 10) {
      uncuffedSize = 4.0;
      cuffedSize = 3.5;
      depth = 11;
    } else if (weight < 12) {
      uncuffedSize = 4.5;
      cuffedSize = 4.0;
      depth = 12.5;
    } else if (weight < 15) {
      uncuffedSize = 5.0;
      cuffedSize = 4.5;
      depth = 14;
    } else if (weight < 18) {
      uncuffedSize = 5.5;
      cuffedSize = 5.0;
      depth = 15;
    } else if (weight < 25) {
      uncuffedSize = 6.0;
      cuffedSize = 5.5;
      depth = 16;
    } else if (weight < 35) {
      uncuffedSize = 6.5;
      cuffedSize = 6.0;
      depth = 17;
    } else {
      uncuffedSize = 7.0;
      cuffedSize = 6.5;
      depth = 18;
    }
  }
  
  // Format values to one decimal place
  return {
    uncuffedSize: uncuffedSize !== null ? parseFloat(uncuffedSize.toFixed(1)) : null,
    cuffedSize: cuffedSize !== null ? parseFloat(cuffedSize.toFixed(1)) : null,
    depth: depth !== null ? Math.round(depth) : null
  };
};

/**
 * Calculate fluid bolus volume based on patient weight
 * @param {number} weight - Patient weight in kg
 * @param {number} [mlPerKg=20] - mL per kg (default: 20)
 * @returns {number} Bolus volume in mL
 */
export const calculateFluidBolus = (weight, mlPerKg = 20) => {
  if (!weight || weight <= 0 || !mlPerKg) return null;
  
  // Calculate bolus volume
  return Math.round(weight * mlPerKg);
};

/**
 * Determine normal vital signs range based on patient age
 * @param {number} age - Patient age in months
 * @returns {Object} Vital signs ranges
 */
export const getNormalVitalSigns = (age) => {
  if (age === null || age === undefined) return null;
  
  // Convert to years for easier calculation
  const ageInYears = age / 12;
  
  // Define vital sign ranges by age group
  if (ageInYears < 1/12) { // Newborn (< 1 month)
    return {
      heartRate: { low: 100, high: 180 },
      respiratoryRate: { low: 30, high: 60 },
      systolicBP: { low: 60, high: 90 },
      diastolicBP: { low: 30, high: 60 }
    };
  } else if (ageInYears < 1) { // Infant (1-11 months)
    return {
      heartRate: { low: 100, high: 160 },
      respiratoryRate: { low: 25, high: 50 },
      systolicBP: { low: 70, high: 100 },
      diastolicBP: { low: 40, high: 65 }
    };
  } else if (ageInYears < 3) { // Toddler (1-2 years)
    return {
      heartRate: { low: 90, high: 150 },
      respiratoryRate: { low: 20, high: 40 },
      systolicBP: { low: 80, high: 110 },
      diastolicBP: { low: 40, high: 70 }
    };
  } else if (ageInYears < 6) { // Preschool (3-5 years)
    return {
      heartRate: { low: 80, high: 140 },
      respiratoryRate: { low: 18, high: 30 },
      systolicBP: { low: 90, high: 115 },
      diastolicBP: { low: 50, high: 75 }
    };
  } else if (ageInYears < 12) { // School age (6-11 years)
    return {
      heartRate: { low: 70, high: 120 },
      respiratoryRate: { low: 16, high: 26 },
      systolicBP: { low: 95, high: 120 },
      diastolicBP: { low: 55, high: 80 }
    };
  } else { // Adolescent (≥12 years)
    return {
      heartRate: { low: 60, high: 100 },
      respiratoryRate: { low: 12, high: 20 },
      systolicBP: { low: 100, high: 130 },
      diastolicBP: { low: 60, high: 85 }
    };
  }
};

/**
 * Estimate weight from age using standard formulas
 * @param {number} age - Patient age in months
 * @returns {number} Estimated weight in kg
 */
export const estimateWeightFromAge = (age) => {
  if (age === null || age === undefined || age < 0) return null;
  
  const ageInYears = age / 12;
  
  // Formulas based on age groups
  if (ageInYears <= 1) {
    // Birth to 12 months: (age in months + 9) / 2
    return parseFloat(((age + 9) / 2).toFixed(1));
  } else if (ageInYears <= 5) {
    // 1-5 years: 2 × (age in years + 5)
    return parseFloat((2 * (ageInYears + 5)).toFixed(1));
  } else if (ageInYears <= 14) {
    // 6-14 years: 4 × age in years
    return parseFloat((4 * ageInYears).toFixed(1));
  } else {
    // >14 years: adult calculation or growth charts would be more appropriate
    // Here we'll use a simple approximation
    return Math.min(parseFloat((4 * ageInYears).toFixed(1)), 70);
  }
};

/**
 * Calculate appropriate blood pressure range based on age
 * @param {number} age - Patient age in months
 * @returns {Object} BP thresholds including hypotension
 */
export const calculateBPThresholds = (age) => {
  if (age === null || age === undefined) return null;
  
  // Convert to years
  const ageInYears = age / 12;
  
  let hypotension;
  
  // Calculate 5th percentile systolic BP (hypotension threshold)
  if (ageInYears < 1) {
    hypotension = 70; // Infants
  } else if (ageInYears <= 10) {
    // Children 1-10 years: 70 + (2 × age in years)
    hypotension = 70 + (2 * ageInYears);
  } else {
    // Children >10 years: 90
    hypotension = 90;
  }
  
  return {
    hypotension: Math.round(hypotension),
    normal: getNormalVitalSigns(age).systolicBP
  };
};
