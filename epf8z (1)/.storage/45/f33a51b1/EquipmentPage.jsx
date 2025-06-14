import React, { useState, useEffect } from 'react';
import EquipmentSizing from '../components/EquipmentSizing';
import { useAppContext } from '../contexts/AppContext';

function EquipmentPage() {
  const { patientWeight, patientAge, patientLength, setShowPatientModal } = useAppContext();
  const [equipment, setEquipment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Equipment categories
  const categories = [
    { id: 'all', name: 'All Equipment' },
    { id: 'airway', name: 'Airway' },
    { id: 'breathing', name: 'Breathing' },
    { id: 'circulation', name: 'Circulation' },
    { id: 'iv', name: 'IV/IO Access' }
  ];
  
  // Load equipment data
  useEffect(() => {
    const loadEquipment = async () => {
      setIsLoading(true);
      
      // Mock data for demonstration
      const equipmentData = [
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
        }
      ];
      
      setEquipment(equipmentData);
      setIsLoading(false);
    };
    
    loadEquipment();
  }, []);
  
  // Filter equipment based on search query and selected category
  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      {/* Patient Info Banner */}
      {(!patientWeight && !patientAge) && (
        <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg shadow-sm text-center">
          <p className="text-yellow-800 dark:text-yellow-200">
            Enter patient details for accurate equipment size recommendations
          </p>
          <button 
            onClick={() => setShowPatientModal(true)}
            className="mt-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-medium"
          >
            Add Patient Details
          </button>
        </div>
      )}
      
      {/* Search and Filter */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="mb-3">
          <label htmlFor="equipment-search" className="sr-only">Search Equipment</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              id="equipment-search"
              type="search"
              className="block w-full pl-10 pr-3 py-2 border border-slate-300 rounded-md dark:border-slate-600 dark:bg-slate-700 text-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-1 space-x-2">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Equipment List */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {patientWeight || patientAge ? (
            <>
              {filteredEquipment.length > 0 ? (
                filteredEquipment.map(item => (
                  <EquipmentSizing key={item.id} equipment={item} />
                ))
              ) : (
                <div className="bg-white dark:bg-slate-800 p-8 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
                  <p className="text-slate-500 dark:text-slate-400">No equipment matches your search.</p>
                  <button 
                    className="mt-4 text-blue-600 dark:text-blue-400"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-lg border border-slate-200 dark:border-slate-700 text-center">
              <p className="text-slate-500 dark:text-slate-400">
                Add patient information to view equipment size recommendations
              </p>
              <button 
                onClick={() => setShowPatientModal(true)}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
              >
                Add Patient Details
              </button>
            </div>
          )}
        </div>
      )}
      
      {/* Instructions */}
      <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-sm">
        <h3 className="font-bold mb-2">Equipment Sizing Guide</h3>
        <p className="text-slate-600 dark:text-slate-300">
          This guide provides recommended equipment sizes based on patient age, weight, and/or length. 
          Critical equipment is highlighted. Always verify sizes based on actual patient measurements.
        </p>
      </div>
    </div>
  );
}

export default EquipmentPage;
