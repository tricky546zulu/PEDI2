/**
 * Utility functions for pediatric emergency calculations
 */

// Weight estimation based on age (Broselow method)
export const estimateWeight = ({ ageMonths = null, lengthCm = null }) => {
  // If length is provided, use length-based estimation (most accurate)
  if (lengthCm !== null && lengthCm > 0) {
    // Length-based estimation (simplified Broselow formula)
    return (lengthCm - 50) / 4 + 3.5;
  }
  
  // If age is provided, use age-based estimation
  if (ageMonths !== null && ageMonths >= 0) {
    if (ageMonths < 12) {
      // Infants (0-12 months): Weight (kg) = (Age in months + 9) / 2
      return (ageMonths + 9) / 2;
    } else if (ageMonths <= 60) {
      // Children 1-5 years: Weight (kg) = 2 × (Age in years + 5)
      return 2 * (ageMonths/12 + 5);
    } else if (ageMonths <= 144) {
      // Children 5-12 years: Weight (kg) = 4 × (Age in years)
      return 4 * (ageMonths/12);
    } else {
      // Adolescents: use adult estimation methods
      // This is very approximate
      return 45;
    }
  }
  
  // If no valid parameters were provided
  return null;
};

// Calculate medication dose based on weight
export const calculateDose = (weight, dosePerKg) => {
  if (!weight || !dosePerKg) return null;
  
  const result = weight * dosePerKg;
  return result;
};

// Calculate fluid bolus volume (typically 20 ml/kg)
export const calculateFluidBolus = (weight, mlPerKg = 20) => {
  if (!weight) return null;
  
  return weight * mlPerKg;
};

// Calculate energy for defibrillation
export const calculateDefibrillationEnergy = (weight, jPerKg = 2) => {
  if (!weight) return null;
  
  const energy = weight * jPerKg;
  
  // Cap at 200J for safety based on most guidelines
  return Math.min(energy, 200);
};

// Calculate ETT (Endotracheal Tube) size based on age or weight
export const calculateETTSize = (ageMonths, weight) => {
  let ettSize;
  
  if (ageMonths !== null && ageMonths >= 0) {
    // Convert to years for calculation
    const ageYears = ageMonths / 12;
    
    if (ageYears < 1) {
      // Neonates and infants < 1 year
      ettSize = 3.0 + (weight >= 3.5 ? 0.5 : 0);
    } else {
      // Children ≥ 1 year: Uncuffed ETT = (Age in years/4) + 4
      // Cuffed ETT = (Age in years/4) + 3.5
      const useUncuffed = ageYears < 8;
      ettSize = (ageYears/4) + (useUncuffed ? 4 : 3.5);
    }
    
    // Round to the nearest 0.5
    ettSize = Math.round(ettSize * 2) / 2;
  }
  
  return ettSize;
};

// Calculate ETT insertion depth (from lips)
export const calculateETTDepth = (ageMonths, ettSize) => {
  let depth;
  
  if (ettSize) {
    // Based on ETT size: depth (cm) = ETT size × 3
    depth = ettSize * 3;
  } else if (ageMonths !== null) {
    // Based on age: depth (cm) = (Age in years/2) + 12
    const ageYears = ageMonths / 12;
    depth = (ageYears/2) + 12;
  }
  
  return depth ? Math.round(depth) : null;
};

// Convert between units for medication calculations
export const convertUnits = (value, fromUnit, toUnit) => {
  // Convert all to base units first
  let baseValue;
  
  // Convert input to base units
  switch (fromUnit) {
    case 'mg':
      baseValue = value * 1000; // to mcg
      break;
    case 'mcg':
    case 'µg':
      baseValue = value; // already in mcg
      break;
    case 'g':
      baseValue = value * 1000000; // to mcg
      break;
    default:
      return null;
  }
  
  // Convert from base units to output
  switch (toUnit) {
    case 'mg':
      return baseValue / 1000;
    case 'mcg':
    case 'µg':
      return baseValue;
    case 'g':
      return baseValue / 1000000;
    default:
      return null;
  }
};

// Calculate normal vital signs range based on age
export const getNormalVitalSigns = (ageMonths) => {
  if (ageMonths === null) return null;
  
  if (ageMonths < 1) {
    return {
      heartRate: { min: 100, max: 180 },
      respiratoryRate: { min: 30, max: 60 },
      systolicBP: { min: 60, max: 90 },
    };
  } else if (ageMonths < 12) {
    return {
      heartRate: { min: 80, max: 180 },
      respiratoryRate: { min: 25, max: 55 },
      systolicBP: { min: 70, max: 110 },
    };
  } else if (ageMonths < 36) {
    return {
      heartRate: { min: 70, max: 170 },
      respiratoryRate: { min: 20, max: 45 },
      systolicBP: { min: 80, max: 115 },
    };
  } else if (ageMonths < 72) {
    return {
      heartRate: { min: 65, max: 150 },
      respiratoryRate: { min: 18, max: 35 },
      systolicBP: { min: 85, max: 120 },
    };
  } else if (ageMonths < 144) {
    return {
      heartRate: { min: 60, max: 140 },
      respiratoryRate: { min: 16, max: 30 },
      systolicBP: { min: 90, max: 130 },
    };
  } else {
    return {
      heartRate: { min: 55, max: 120 },
      respiratoryRate: { min: 14, max: 25 },
      systolicBP: { min: 100, max: 140 },
    };
  }
};

// Determine if patient is tachycardiac based on age and heart rate
export const isTachycardic = (ageMonths, heartRate) => {
  if (ageMonths === null || heartRate === null) return false;
  
  const normalVitals = getNormalVitalSigns(ageMonths);
  return heartRate > normalVitals.heartRate.max;
};

// Determine if patient is bradycardiac based on age and heart rate
export const isBradycardic = (ageMonths, heartRate) => {
  if (ageMonths === null || heartRate === null) return false;
  
  const normalVitals = getNormalVitalSigns(ageMonths);
  return heartRate < normalVitals.heartRate.min;
};

// Determine if patient is hypotensive based on age and systolic BP
export const isHypotensive = (ageMonths, systolicBP) => {
  if (ageMonths === null || systolicBP === null) return false;
  
  const normalVitals = getNormalVitalSigns(ageMonths);
  return systolicBP < normalVitals.systolicBP.min;
};
