import React, { useState, useEffect } from 'react';
import { useAppContext } from '../contexts/AppContext';
import vitalSigns from '../data/vitalSigns';

function ParametersPage() {
  const { patientAge, patientWeight, setShowPatientModal, darkMode } = useAppContext();
  const [activeTab, setActiveTab] = useState('vital-signs'); // 'vital-signs', 'gcs', 'trauma', 'weight'
  const [selectedAgeRange, setSelectedAgeRange] = useState(null);
  
  // Find the appropriate age range based on patient age
  useEffect(() => {
    if (patientAge) {
      const matchedRange = vitalSigns.ageRanges.find(
        range => patientAge >= range.minAgeMonths && patientAge < range.maxAgeMonths
      );
      if (matchedRange) {
        setSelectedAgeRange(matchedRange.id);
      } else {
        // Default to adolescent for any age above ranges
        setSelectedAgeRange('adolescent');
      }
    }
  }, [patientAge]);
  
  // Calculate estimated weight based on age if weight not provided
  const getEstimatedWeight = () => {
    if (!patientAge) return null;
    
    // Find closest age in weight estimation table
    let closest = vitalSigns.weightEstimation[0];
    let minDiff = Math.abs(patientAge - closest.ageMonths);
    
    vitalSigns.weightEstimation.forEach(item => {
      const diff = Math.abs(patientAge - item.ageMonths);
      if (diff < minDiff) {
        minDiff = diff;
        closest = item;
      }
    });
    
    return closest.weight;
  };
  
  // GCS Calculator state
  const [gcsScores, setGcsScores] = useState({
    eyeOpening: 4,
    verbalResponse: 5,
    motorResponse: 6
  });
  
  // Update GCS score
  const updateGcsScore = (category, score) => {
    setGcsScores(prev => ({
      ...prev,
      [category]: score
    }));
  };
  
  // Calculate total GCS score
  const totalGcsScore = gcsScores.eyeOpening + gcsScores.verbalResponse + gcsScores.motorResponse;
  
  // Get GCS interpretation
  const gcsInterpretation = vitalSigns.glasgowComaScale.interpretation.find(
    item => {
      const [min, max] = item.range.split('-').map(Number);
      return totalGcsScore >= min && totalGcsScore <= max;
    }
  );
  
  // PTS Calculator state
  const [ptsScores, setPtsScores] = useState({
    size: 2,
    airway: 2,
    systolicBP: 2,
    cns: 2,
    openWound: 2,
    fractures: 2
  });
  
  // Update PTS score
  const updatePtsScore = (category, score) => {
    setPtsScores(prev => ({
      ...prev,
      [category]: score
    }));
  };
  
  // Calculate total PTS score
  const totalPtsScore = Object.values(ptsScores).reduce((sum, score) => sum + score, 0);
  
  // Get PTS interpretation
  const ptsInterpretation = vitalSigns.pediatricTraumaScore.interpretation.find(
    item => {
      if (item.score.startsWith('<')) {
        return totalPtsScore < parseInt(item.score.substring(1));
      } else if (item.score.includes('-')) {
        const [min, max] = item.score.split('-').map(Number);
        return totalPtsScore >= min && totalPtsScore <= max;
      }
      return false;
    }
  );

  return (
    <div className="space-y-6">
      {/* Patient information banner */}
      <div className={`p-4 rounded-lg border ${darkMode ? 'border-slate-700' : 'border-slate-200'} ${patientWeight || patientAge ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-slate-800'}`}>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Physiological Parameters</h2>
          <button 
            onClick={() => setShowPatientModal(true)}
            className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline"
          >
            {patientWeight || patientAge ? 'Edit' : 'Add'} Patient
          </button>
        </div>

        {patientWeight || patientAge ? (
          <div className="mt-2">
            {patientAge && (
              <p className="text-slate-700 dark:text-slate-300">
                Age: <span className="font-medium">
                  {patientAge >= 24 ? `${Math.floor(patientAge / 12)} years` : `${patientAge} months`}
                </span>
              </p>
            )}
            {patientWeight ? (
              <p className="text-slate-700 dark:text-slate-300">
                Weight: <span className="font-medium">{patientWeight} kg</span> ({(patientWeight * 2.2).toFixed(1)} lb)
              </p>
            ) : patientAge ? (
              <p className="text-slate-700 dark:text-slate-300">
                Estimated Weight: <span className="font-medium">{getEstimatedWeight()} kg</span> ({(getEstimatedWeight() * 2.2).toFixed(1)} lb)
                <span className="text-xs ml-2 text-slate-500 dark:text-slate-400">(based on age)</span>
              </p>
            ) : null}
          </div>
        ) : (
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm">
            Add patient information for age-specific parameters
          </p>
        )}
      </div>

      {/* Tab navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-700 overflow-x-auto pb-px hide-scrollbar">
        <button
          className={`py-2 px-4 font-medium text-sm whitespace-nowrap ${
            activeTab === 'vital-signs'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
          onClick={() => setActiveTab('vital-signs')}
        >
          Vital Signs
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm whitespace-nowrap ${
            activeTab === 'gcs'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
          onClick={() => setActiveTab('gcs')}
        >
          Glasgow Coma Scale
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm whitespace-nowrap ${
            activeTab === 'trauma'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
          onClick={() => setActiveTab('trauma')}
        >
          Pediatric Trauma Score
        </button>
        <button
          className={`py-2 px-4 font-medium text-sm whitespace-nowrap ${
            activeTab === 'weight'
              ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
          onClick={() => setActiveTab('weight')}
        >
          Weight Estimation
        </button>
      </div>

      {/* Vital Signs Content */}
      {activeTab === 'vital-signs' && (
        <div className="space-y-6">
          {/* Age Range Selector */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <h3 className="font-medium mb-3">Age Group Selection</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {vitalSigns.ageRanges.map(range => (
                <button
                  key={range.id}
                  onClick={() => setSelectedAgeRange(range.id)}
                  className={`p-2 rounded-lg text-sm font-medium ${
                    selectedAgeRange === range.id
                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Vital Signs Table */}
          {selectedAgeRange ? (
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700">
                    <th className="p-3 text-left text-slate-700 dark:text-slate-300 font-medium">Vital Sign</th>
                    <th className="p-3 text-left text-green-600 dark:text-green-400 font-medium">Normal Range</th>
                    <th className="p-3 text-left text-yellow-600 dark:text-yellow-400 font-medium">Concerning Range</th>
                    <th className="p-3 text-left text-red-600 dark:text-red-400 font-medium">Critical Values</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {['heartRate', 'respiratoryRate', 'systolicBP', 'diastolicBP', 'oxygenSaturation'].map(vitalSign => {
                    const selectedAge = vitalSigns.ageRanges.find(range => range.id === selectedAgeRange);
                    const vitalData = selectedAge ? selectedAge[vitalSign] : null;

                    return (
                      <tr key={vitalSign} className="hover:bg-slate-50 dark:hover:bg-slate-750">
                        <td className="p-3 font-medium">
                          {vitalSign === 'heartRate' && 'Heart Rate (bpm)'}
                          {vitalSign === 'respiratoryRate' && 'Respiratory Rate (bpm)'}
                          {vitalSign === 'systolicBP' && 'Systolic BP (mmHg)'}
                          {vitalSign === 'diastolicBP' && 'Diastolic BP (mmHg)'}
                          {vitalSign === 'oxygenSaturation' && 'Oxygen Saturation (%)'}
                        </td>
                        <td className="p-3">
                          {vitalData?.normal.min !== null && vitalData?.normal.max !== null && (
                            <span className="text-green-600 dark:text-green-400">
                              {vitalData.normal.min} - {vitalData.normal.max}
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          {vitalData?.concerning.min !== null && vitalData?.concerning.min !== vitalData?.normal.min && (
                            <span className="whitespace-nowrap">
                              <span className="text-yellow-600 dark:text-yellow-400">{vitalData.concerning.min} - {vitalData.normal.min - 1}</span>
                            </span>
                          )}
                          {vitalData?.concerning.max !== null && vitalData?.concerning.max !== vitalData?.normal.max && (
                            <span className="whitespace-nowrap ml-2">
                              <span className="text-yellow-600 dark:text-yellow-400">{vitalData.normal.max + 1} - {vitalData.concerning.max}</span>
                            </span>
                          )}
                        </td>
                        <td className="p-3">
                          {vitalData?.critical.min && (
                            <span className="whitespace-nowrap">
                              <span className="text-red-600 dark:text-red-400">&lt; {vitalData.concerning.min}</span>
                            </span>
                          )}
                          {vitalData?.critical.max && (
                            <span className="whitespace-nowrap ml-2">
                              <span className="text-red-600 dark:text-red-400">&gt; {vitalData.concerning.max}</span>
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <p className="text-slate-600 dark:text-slate-400">
                Select an age group to view vital signs ranges
              </p>
            </div>
          )}
        </div>
      )}

      {/* Glasgow Coma Scale Content */}
      {activeTab === 'gcs' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <h3 className="font-medium mb-3">Glasgow Coma Scale (GCS) Calculator</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Select the appropriate response for each category to calculate the Glasgow Coma Scale score.
            </p>

            {/* Eye Opening */}
            <div className="mb-6">
              <h4 className="font-medium text-sm text-slate-700 dark:text-slate-300 mb-2">Eye Opening</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {vitalSigns.glasgowComaScale.eyeOpening.map(item => (
                  <button
                    key={item.score}
                    onClick={() => updateGcsScore('eyeOpening', item.score)}
                    className={`p-2 rounded border text-sm ${gcsScores.eyeOpening === item.score
                      ? 'bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200'
                      : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600'
                    }`}
                  >
                    <div className="font-medium">{item.score}</div>
                    <div className="text-xs mt-1">{patientAge && patientAge < 60 ? item.pediatric : item.adult}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Verbal Response */}
            <div className="mb-6">
              <h4 className="font-medium text-sm text-slate-700 dark:text-slate-300 mb-2">Verbal Response</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {vitalSigns.glasgowComaScale.verbalResponse.map(item => (
                  <button
                    key={item.score}
                    onClick={() => updateGcsScore('verbalResponse', item.score)}
                    className={`p-2 rounded border text-sm ${gcsScores.verbalResponse === item.score
                      ? 'bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200'
                      : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600'
                    }`}
                  >
                    <div className="font-medium">{item.score}</div>
                    <div className="text-xs mt-1">{patientAge && patientAge < 60 ? item.pediatric : item.adult}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Motor Response */}
            <div className="mb-6">
              <h4 className="font-medium text-sm text-slate-700 dark:text-slate-300 mb-2">Motor Response</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {vitalSigns.glasgowComaScale.motorResponse.map(item => (
                  <button
                    key={item.score}
                    onClick={() => updateGcsScore('motorResponse', item.score)}
                    className={`p-2 rounded border text-sm ${gcsScores.motorResponse === item.score
                      ? 'bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200'
                      : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600'
                    }`}
                  >
                    <div className="font-medium">{item.score}</div>
                    <div className="text-xs mt-1">{patientAge && patientAge < 60 ? item.pediatric : item.adult}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Score Summary */}
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 mb-1">Total GCS Score:</p>
                  <h2 className="text-3xl font-bold">{totalGcsScore}</h2>
                </div>
                <div className="text-right">
                  <p className="text-slate-600 dark:text-slate-400 mb-1">Interpretation:</p>
                  <p className={`font-medium ${
                    totalGcsScore >= 13 ? 'text-green-600 dark:text-green-400' :
                    totalGcsScore >= 9 ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-red-600 dark:text-red-400'
                  }`}>
                    {gcsInterpretation?.severity || 'Unknown'}
                  </p>
                </div>
              </div>
              <div className="mt-3 text-sm">
                <p>{gcsInterpretation?.recommendation || ''}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pediatric Trauma Score Content */}
      {activeTab === 'trauma' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <h3 className="font-medium mb-3">Pediatric Trauma Score (PTS) Calculator</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              Select the appropriate option for each category to calculate the Pediatric Trauma Score.
            </p>

            {Object.keys(ptsScores).map(category => (
              <div key={category} className="mb-4">
                <h4 className="font-medium text-sm text-slate-700 dark:text-slate-300 mb-2 capitalize">
                  {category === 'cns' ? 'CNS Status' : 
                   category === 'systolicBP' ? 'Systolic Blood Pressure' : 
                   category.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {vitalSigns.pediatricTraumaScore[category].map(item => (
                    <button
                      key={item.score}
                      onClick={() => updatePtsScore(category, item.score)}
                      className={`p-2 rounded border text-sm ${ptsScores[category] === item.score
                        ? 'bg-blue-100 dark:bg-blue-900/40 border-blue-300 dark:border-blue-700 text-blue-800 dark:text-blue-200'
                        : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600'
                      }`}
                    >
                      <div className="font-medium">{item.score > 0 ? `+${item.score}` : item.score}</div>
                      <div className="text-xs mt-1">{item.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Score Summary */}
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-slate-600 dark:text-slate-400 mb-1">Total PTS Score:</p>
                  <h2 className="text-3xl font-bold">{totalPtsScore}</h2>
                </div>
                <div className="text-right">
                  <p className="text-slate-600 dark:text-slate-400 mb-1">Interpretation:</p>
                  <p className={`font-medium ${
                    totalPtsScore >= 9 ? 'text-green-600 dark:text-green-400' :
                    totalPtsScore >= 6 ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-red-600 dark:text-red-400'
                  }`}>
                    {ptsInterpretation?.recommendation || 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Weight Estimation Content */}
      {activeTab === 'weight' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
            <h3 className="font-medium mb-3">Weight Estimation by Age</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              This table provides estimated weights based on age. For more accurate calculations, measure the patient's actual weight when possible.
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700">
                    <th className="p-2 text-left text-slate-700 dark:text-slate-300 font-medium">Age</th>
                    <th className="p-2 text-left text-slate-700 dark:text-slate-300 font-medium">Estimated Weight (kg)</th>
                    <th className="p-2 text-left text-slate-700 dark:text-slate-300 font-medium">Estimated Weight (lb)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {vitalSigns.weightEstimation.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-750">
                      <td className="p-2">
                        {item.ageMonths === 0 ? 'Birth' : 
                          item.ageMonths < 12 ? `${item.ageMonths} months` : 
                          `${Math.floor(item.ageMonths / 12)} years${item.ageMonths % 12 ? ` ${item.ageMonths % 12} months` : ''}`}
                      </td>
                      <td className="p-2 font-medium">{item.weight}</td>
                      <td className="p-2 text-slate-600 dark:text-slate-400">{(item.weight * 2.2).toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ParametersPage;