
import React, { useState, useMemo } from 'react';
import { ArrowRightIcon, ChevronLeftIcon } from './Icons';

interface UnitConverterProps {
    onGoHome: () => void;
}

const unitConfig = {
    Length: {
        'Meters (m)': 1,
        'Kilometers (km)': 1000,
        'Centimeters (cm)': 0.01,
        'Millimeters (mm)': 0.001,
        'Feet (ft)': 0.3048,
        'Inches (in)': 0.0254,
    },
    Mass: {
        'Kilograms (kg)': 1,
        'Grams (g)': 0.001,
        'Milligrams (mg)': 0.000001,
        'Pounds (lb)': 0.453592,
        'Ounces (oz)': 0.0283495,
    },
    Force: {
        'Newtons (N)': 1,
        'Kilonewtons (kN)': 1000,
        'Pound-force (lbf)': 4.44822,
    },
    Pressure: {
        'Pascals (Pa)': 1,
        'Kilopascals (kPa)': 1000,
        'Megapascals (MPa)': 1000000,
        'Pounds per square inch (psi)': 6894.76,
        'Atmospheres (atm)': 101325,
    },
};

type UnitCategory = keyof typeof unitConfig;

const UnitConverter: React.FC<UnitConverterProps> = ({ onGoHome }) => {
    const [category, setCategory] = useState<UnitCategory>('Length');
    const [fromUnit, setFromUnit] = useState<string>('Meters (m)');
    const [toUnit, setToUnit] = useState<string>('Feet (ft)');
    const [inputValue, setInputValue] = useState<string>('1');

    const unitsForCategory = unitConfig[category];

    const conversionResult = useMemo(() => {
        const value = parseFloat(inputValue);
        if (isNaN(value)) return '';

        const fromFactor = unitsForCategory[fromUnit as keyof typeof unitsForCategory];
        const toFactor = unitsForCategory[toUnit as keyof typeof unitsForCategory];

        if (fromFactor === undefined || toFactor === undefined) return '';

        const valueInBase = value * fromFactor;
        const result = valueInBase / toFactor;
        
        return result.toLocaleString(undefined, { maximumFractionDigits: 6 });

    }, [inputValue, fromUnit, toUnit, category, unitsForCategory]);

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value as UnitCategory;
        setCategory(newCategory);
        const newUnits = Object.keys(unitConfig[newCategory]);
        setFromUnit(newUnits[0]);
        setToUnit(newUnits[1] || newUnits[0]);
    };
    
    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-base-200">
            <div className="max-w-4xl mx-auto">
                <button onClick={onGoHome} className="flex items-center text-brand-secondary font-semibold mb-6 hover:underline">
                    <ChevronLeftIcon className="h-5 w-5 mr-1" />
                    Dib ugu laabo Bogga Hore
                </button>
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-brand-primary mb-2">Unit Converter</h1>
                    <p className="text-lg text-gray-600">Qalab degdeg ah oo loogu beddelo halbeegyada injineernimada ee caadiga ah.</p>
                </div>

                <div className="bg-base-100 rounded-lg shadow-md p-6 md:p-8">
                    <div className="mb-6">
                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Dooro Qaybta Halbeegga</label>
                        <select
                            id="category"
                            value={category}
                            onChange={handleCategoryChange}
                            className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-brand-secondary focus:outline-none"
                        >
                            {Object.keys(unitConfig).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                        <div className="md:col-span-2">
                            <label htmlFor="fromValue" className="block text-sm font-medium text-gray-700 mb-1">Qiimaha</label>
                            <input
                                type="number"
                                id="fromValue"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-secondary focus:outline-none"
                            />
                        </div>

                        <div className="md:col-span-2">
                             <label htmlFor="fromUnit" className="block text-sm font-medium text-gray-700 mb-1">Laga Bilaabo</label>
                             <select
                                id="fromUnit"
                                value={fromUnit}
                                onChange={(e) => setFromUnit(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-brand-secondary focus:outline-none"
                            >
                                {Object.keys(unitsForCategory).map(unit => <option key={unit} value={unit}>{unit}</option>)}
                            </select>
                        </div>
                        
                        <div className="text-center text-2xl font-bold text-gray-400 pb-2">
                           =
                        </div>

                        <div className="md:col-span-2">
                            <label htmlFor="toUnit" className="block text-sm font-medium text-gray-700 mb-1">Loo Beddelayo</label>
                            <select
                                id="toUnit"
                                value={toUnit}
                                onChange={(e) => setToUnit(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-brand-secondary focus:outline-none"
                            >
                                {Object.keys(unitsForCategory).map(unit => <option key={unit} value={unit}>{unit}</option>)}
                            </select>
                        </div>

                         <div className="md:col-span-3">
                            <p className="mt-1 text-sm text-gray-500">Natiijada:</p>
                            <p className="text-3xl font-bold text-brand-primary bg-base-200 p-3 rounded-md">{conversionResult}</p>
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnitConverter;
