import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';

function AlgorithmDetailsPage() {
  const { id } = useParams();
  const { offlineStorage } = useAppContext();
  const [algorithm, setAlgorithm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  
  // Load algorithm details
  useEffect(() => {
    const loadAlgorithm = async () => {
      setIsLoading(true);
      
      try {
        let algorithmData = null;
        
        // Try to load from IndexedDB first if available
        if (offlineStorage && offlineStorage.isAvailable) {
          algorithmData = await offlineStorage.getData('algorithms', id);
        }
        
        // If no algorithm found or no IndexedDB, load from mock data
        if (!algorithmData) {
          // Mock data for demonstration
          const mockAlgorithms = [
            {
              id: 'cardiac-arrest',
              title: 'Pediatric Cardiac Arrest',
              category: 'cardiac arrest',
              patientType: 'All Pediatric Patients',
              steps: [
                { text: 'Start high-quality CPR', details: '100-120 compressions per minute, 1/3 AP chest diameter' },
                { text: 'Attach monitor/defibrillator', details: 'Check rhythm' },
                { text: 'Assess rhythm: Shockable or Non-shockable?' },
                { text: 'Continue CPR while preparing for next steps', details: 'Minimize interruptions' },
                { text: 'Establish vascular access (IV/IO)', details: 'For medication administration' },
                { text: 'Consider advanced airway', details: 'If personnel skilled in placement are available' },
                { text: 'Consider reversible causes', details: 'Hypovolemia, Hypoxia, Hydrogen ion (acidosis), Hypo/hyperkalemia, Hypothermia, Toxins, Tamponade, Tension pneumothorax, Thrombosis' }
              ],
              notes: 'Prioritize high-quality CPR with minimal interruptions',
              additionalInfo: 'For pediatric patients, begin with chest compressions (C-A-B sequence) at a rate of 100-120 compressions/minute. Use a compression-to-ventilation ratio of 30:2 for single rescuers and 15:2 for 2 rescuers.',
              imageUrl: '/assets/images/pals_cardiac_arrest.png'
            },
            {
              id: 'vfib-pulseless-vtach',
              title: 'VF/Pulseless VT',
              category: 'cardiac arrest',
              patientType: 'Pediatric Shockable Rhythms',
              steps: [
                { text: 'Shock: 2 J/kg', details: 'Immediately resume CPR after shock' },
                { text: 'Epinephrine every 3-5 min: 0.01 mg/kg (0.1 mL/kg of 1:10,000)', details: 'Maximum single dose: 1 mg' },
                { text: 'Consider advanced airway and capnography', details: 'If skilled provider available' },
                { text: 'Shock: 4 J/kg', details: 'Immediately resume CPR after shock' },
                { text: 'Amiodarone or Lidocaine', details: 'Amiodarone: 5 mg/kg (max 300 mg), Lidocaine: 1 mg/kg (max 100 mg)' },
                { text: 'Continue CPR, drugs, and shock cycles', details: 'Treat reversible causes' }
              ],
              notes: 'Maximum epinephrine dose: 1 mg',
              additionalInfo: 'For refractory VF/pulseless VT, consider escalating defibrillation energy, changing pad position or defibrillator, and double sequential defibrillation if available.',
              imageUrl: '/assets/images/pals_vf_vt.png'
            },
            {
              id: 'pea-asystole',
              title: 'PEA/Asystole',
              category: 'cardiac arrest',
              patientType: 'Pediatric Non-shockable Rhythms',
              steps: [
                { text: 'Continue CPR', details: '2 minutes of uninterrupted compressions' },
                { text: 'Epinephrine every 3-5 min: 0.01 mg/kg (0.1 mL/kg of 1:10,000)', details: 'Maximum single dose: 1 mg' },
                { text: 'Consider advanced airway and capnography', details: 'If skilled provider available' },
                { text: 'Reassess rhythm every 2 minutes', details: 'Brief pulse/rhythm check' },
                { text: 'Continue CPR and drugs', details: 'Treat reversible causes' }
              ],
              notes: 'Identify and treat possible causes: Hypovolemia, Hypoxia, Hydrogen ion (acidosis), Hypo/hyperkalemia, Hypothermia, Toxins, Tamponade, Tension pneumothorax, Thrombosis (pulmonary/coronary)',
              additionalInfo: 'In PEA, focus on identifying and treating underlying causes. Consider bedside ultrasound if available to identify specific causes.',
              imageUrl: '/assets/images/pals_pea_asystole.png'
            },
            {
              id: 'bradycardia',
              title: 'Bradycardia with Pulse',
              category: 'bradycardia',
              patientType: 'Symptomatic Pediatric Patients',
              steps: [
                { text: 'Support ABCs', details: 'Give oxygen if needed' },
                { text: 'If HR < 60/min with poor perfusion despite oxygenation/ventilation, start CPR', details: '15:2 ratio (2 rescuers)' },
                { text: 'Reassess after 2 minutes', details: 'Check pulse and rhythm' },
                { text: 'Epinephrine: 0.01 mg/kg (0.1 mL/kg of 1:10,000) IV/IO, or 0.1 mg/kg (0.1 mL/kg of 1:1,000) ET', details: 'Repeat every 3-5 minutes as needed' },
                { text: 'Atropine: 0.02 mg/kg IV/IO', details: 'Minimum dose: 0.1 mg, Maximum single dose: 0.5 mg child, 1 mg adolescent' }
              ],
              notes: 'Consider atropine for increased vagal tone or primary AV block',
              additionalInfo: 'Bradycardia in children is often due to hypoxia. Ensure adequate oxygenation and ventilation before moving to medications.',
              imageUrl: '/assets/images/pals_bradycardia.png'
            },
            {
              id: 'tachycardia-stable',
              title: 'Tachycardia with Pulse (Stable)',
              category: 'tachycardia',
              patientType: 'Stable Pediatric Patients',
              steps: [
                { text: 'Identify and treat underlying causes', details: 'Fever, pain, dehydration, etc.' },
                { text: 'Evaluate 12-lead ECG', details: 'QRS duration < 0.09s (narrow) or ≥ 0.09s (wide)' },
                { text: 'For narrow QRS: Consider vagal maneuvers', details: 'If appropriate based on patient condition' },
                { text: 'For narrow QRS: Adenosine if SVT likely', details: 'First dose: 0.1 mg/kg (max 6 mg), Second dose: 0.2 mg/kg (max 12 mg)' },
                { text: 'For wide QRS: Consider expert consultation', details: 'May be SVT with aberrancy or VT' }
              ],
              notes: 'Consult pediatric cardiology or emergency medicine for further management',
              additionalInfo: 'For SVT with narrow QRS, adenosine should be given as a rapid IV push followed by a saline flush. Consider sedation before cardioversion in stable patients.',
              imageUrl: '/assets/images/pals_tach_stable.png'
            },
            {
              id: 'tachycardia-unstable',
              title: 'Tachycardia with Pulse (Unstable)',
              category: 'tachycardia',
              patientType: 'Unstable Pediatric Patients',
              steps: [
                { text: 'Immediate synchronized cardioversion: 0.5-1 J/kg', details: 'Sedate if possible without delaying cardioversion' },
                { text: 'If ineffective, increase to 2 J/kg', details: 'Ensure proper pad placement and contact' },
                { text: 'Consider adenosine for suspected SVT: 0.1 mg/kg (max 6mg) rapid IV push', details: 'If IV access readily available and delay in cardioversion won\'t harm patient' },
                { text: 'Consider antiarrhythmics', details: 'Amiodarone 5 mg/kg IV/IO over 20-60 minutes' },
                { text: 'Treat underlying causes', details: 'Electrolyte abnormalities, toxins, etc.' }
              ],
              notes: 'Unstable signs include altered mental status, poor perfusion, hypotension',
              additionalInfo: 'Signs of instability in pediatric tachycardia include hypotension, acutely altered mental status, signs of shock, or acute heart failure. Immediate synchronized cardioversion is indicated for unstable patients.',
              imageUrl: '/assets/images/pals_tach_unstable.png'
            },
            {
              id: 'post-resuscitation',
              title: 'Post-Resuscitation Care',
              category: 'post resuscitation',
              patientType: 'Post-Cardiac Arrest Patients',
              steps: [
                { text: 'Support oxygenation and ventilation', details: 'Avoid excessive ventilation' },
                { text: 'Maintain BP with fluids and vasoactive drugs if needed', details: 'Target age-appropriate systolic BP' },
                { text: 'Monitor temperature', details: 'Prevent/treat fever' },
                { text: 'Check blood glucose and maintain normal range', details: 'Target 80-110 mg/dL' },
                { text: 'Treat recurrent dysrhythmias', details: 'As per appropriate algorithm' },
                { text: 'Consider targeted temperature management', details: 'For comatose patients' }
              ],
              notes: 'Consider targeted temperature management for patients who remain comatose',
              additionalInfo: 'In post-resuscitation care, maintain normoxemia (SpO2 94-99%) and normocapnia (ETCO2 35-40 mmHg). Avoid hypotension and aim for age-appropriate blood pressure values.',
              imageUrl: '/assets/images/pals_post_resuscitation.png'
            }
          ];
          
          algorithmData = mockAlgorithms.find(algo => algo.id === id);
          
          // Store to IndexedDB if available
          if (algorithmData && offlineStorage && offlineStorage.isAvailable) {
            await offlineStorage.storeData('algorithms', algorithmData);
          }
        }
        
        if (algorithmData) {
          setAlgorithm(algorithmData);
          
          // Check if this algorithm is favorited
          const favoritedAlgorithms = JSON.parse(localStorage.getItem('favoritedAlgorithms') || '[]');
          setIsFavorited(favoritedAlgorithms.includes(id));
        }
      } catch (error) {
        console.error("Error loading algorithm details:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAlgorithm();
  }, [id, offlineStorage]);
  
  // Toggle favorite status
  const handleToggleFavorite = () => {
    const favoritedAlgorithms = JSON.parse(localStorage.getItem('favoritedAlgorithms') || '[]');
    
    if (isFavorited) {
      // Remove from favorites
      const updatedFavorites = favoritedAlgorithms.filter(algoId => algoId !== id);
      localStorage.setItem('favoritedAlgorithms', JSON.stringify(updatedFavorites));
      setIsFavorited(false);
    } else {
      // Add to favorites
      favoritedAlgorithms.push(id);
      localStorage.setItem('favoritedAlgorithms', JSON.stringify(favoritedAlgorithms));
      setIsFavorited(true);
    }
  };
  
  // Color scheme based on algorithm category
  const getCategoryColor = () => {
    if (!algorithm) return '';
    
    switch (algorithm.category) {
      case 'cardiac arrest':
        return 'bg-red-50 dark:bg-red-900/20';
      case 'bradycardia':
        return 'bg-yellow-50 dark:bg-yellow-900/20';
      case 'tachycardia':
        return 'bg-orange-50 dark:bg-orange-900/20';
      case 'post resuscitation':
        return 'bg-purple-50 dark:bg-purple-900/20';
      default:
        return 'bg-blue-50 dark:bg-blue-900/20';
    }
  };
  
  // Badge color for category
  const getCategoryBadgeColor = () => {
    if (!algorithm) return '';
    
    switch (algorithm.category) {
      case 'cardiac arrest':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      case 'bradycardia':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'tachycardia':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100';
      case 'post resuscitation':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!algorithm) {
    return (
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
        <h2 className="text-xl font-bold mb-4">Algorithm Not Found</h2>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          The requested algorithm could not be found.
        </p>
        <Link 
          to="/algorithms"
          className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          Back to Algorithms
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Algorithm Header */}
      <div className={`p-4 rounded-lg border border-slate-200 dark:border-slate-700 ${getCategoryColor()}`}>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold">{algorithm.title}</h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getCategoryBadgeColor()}`}>
                {algorithm.category.charAt(0).toUpperCase() + algorithm.category.slice(1)}
              </span>
              {algorithm.patientType && (
                <span className="bg-slate-100 text-slate-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-slate-700 dark:text-slate-300">
                  {algorithm.patientType}
                </span>
              )}
            </div>
          </div>
          
          <button 
            onClick={handleToggleFavorite}
            className="text-slate-400 hover:text-yellow-500 dark:text-slate-500 dark:hover:text-yellow-400"
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorited ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-yellow-500" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Algorithm Steps */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
        <h2 className="text-lg font-bold mb-4">Algorithm Steps</h2>
        <ol className="space-y-4">
          {algorithm.steps.map((step, index) => (
            <li key={index} className="flex">
              <div className="mr-4 flex-shrink-0">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold dark:bg-blue-900 dark:text-blue-300">
                  {index + 1}
                </div>
              </div>
              <div>
                <p className="font-medium">{step.text}</p>
                {step.details && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    {step.details}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
      
      {/* Algorithm Diagram/Image (if available) */}
      {algorithm.imageUrl && (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold mb-4">Algorithm Diagram</h2>
          <div className="flex justify-center">
            <img 
              src={algorithm.imageUrl} 
              alt={`${algorithm.title} diagram`} 
              className="max-w-full h-auto rounded-lg border border-slate-300 dark:border-slate-600"
            />
          </div>
        </div>
      )}
      
      {/* Additional Information */}
      {algorithm.additionalInfo && (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-bold mb-2">Additional Information</h2>
          <p className="text-slate-700 dark:text-slate-300">
            {algorithm.additionalInfo}
          </p>
        </div>
      )}
      
      {/* Notes */}
      {algorithm.notes && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="text-md font-bold text-yellow-800 dark:text-yellow-300 mb-1">Important Notes</h3>
              <p className="text-yellow-700 dark:text-yellow-200">
                {algorithm.notes}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Back Button */}
      <div className="flex justify-center mt-6">
        <Link 
          to="/algorithms"
          className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 rounded-lg"
        >
          Back to All Algorithms
        </Link>
      </div>
    </div>
  );
}

export default AlgorithmDetailsPage;
