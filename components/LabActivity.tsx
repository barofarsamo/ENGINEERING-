
import React, { useState, useMemo } from 'react';
import type { Lab, LabInputField } from '../types';
import { ChevronLeftIcon, BeakerIcon, ClipboardListIcon, CalculatorIcon, LightBulbIcon } from './Icons';

interface LabActivityProps {
    lab: Lab;
    onGoBack: () => void;
}

const LabActivity: React.FC<LabActivityProps> = ({ lab, onGoBack }) => {
    // FIX: Explicitly typed the `initialInputs` constant to ensure the result of the `reduce` function is correctly typed as `Record<string, string>`.
    const initialInputs: Record<string, string> = lab.inputData.fields.reduce((acc, field) => {
        acc[field.id] = field.defaultValue;
        return acc;
    }, {} as Record<string, string>);

    const [inputValues, setInputValues] = useState(initialInputs);

    const handleInputChange = (id: string, value: string) => {
        setInputValues(prev => ({ ...prev, [id]: value }));
    };

    const renderResults = () => {
        // This is where specific logic for each lab will go.
        // For now, it's a placeholder. Let's implement for Concrete Slump & Strength.
        const values: Record<string, number> = Object.fromEntries(
            Object.entries(inputValues).map(([key, value]) => [key, parseFloat(value as string)])
        );

        // FIX: Use Object.values and pass isNaN directly to .some() for a more robust and type-safe check for NaN values.
        if (Object.values(values).some(isNaN)) {
            return <p className="text-red-500">Fadlan geli qiimayaal sax ah dhammaan goobaha.</p>;
        }

        switch (lab.id) {
            case 'lab-slump-test':
                const slump = values.h1 - values.h2;
                let interpretation = "Qiimaynta Natiijada...";
                if (slump < 25) interpretation = "Slump aad u yar (Dry Mix) - Shaqeyn adag.";
                else if (slump >= 25 && slump <= 100) interpretation = "True Slump - Shaqeyn wanaagsan oo ku habboon inta badan dhismayaasha.";
                else if (slump > 100 && slump <= 175) interpretation = "Shear/Collapse Slump - Isku-dhaf aad u qoyan, awooddiisu hooseyso.";
                else interpretation = "Collapse Slump - Biyo aad u badan, shamiito aan la aqbali karin.";
                return (
                    <div>
                        <p className="text-lg">Slump La Xisaabiyay: <span className="font-bold text-brand-secondary">{slump.toFixed(1)} mm</span></p>
                        <p className="mt-2 text-sm">{interpretation}</p>
                    </div>
                );
            case 'lab-compressive-strength':
                const area = values.width * values.length;
                const strength = (values.load * 1000) / area; // Convert kN to N
                let grade = "Fasiraad...";
                if (strength < 20) grade = "Awood aad u hooseysa.";
                else if (strength >= 20 && strength < 30) grade = "Awood dhexdhexaad ah, oo ku habboon dhismayaasha guud.";
                else if (strength >= 30 && strength < 40) grade = "Awood wanaagsan (M30 Grade), oo ku habboon qaab-dhismeedyada muhiimka ah.";
                else grade = "Awood aad u sarreysa.";
                return (
                    <div>
                        <p className="text-lg">Bedka: <span className="font-bold">{area.toFixed(2)} mm²</span></p>
                        <p className="text-lg mt-2">Awoodda Cadaadiska: <span className="font-bold text-brand-secondary">{strength.toFixed(2)} MPa (N/mm²)</span></p>
                        <p className="mt-2 text-sm">{grade}</p>
                    </div>
                );
            default:
                return <p>Xisaabinta loogu talagalay shaybaarkan weli lama hirgelin.</p>;
        }
    };
    
    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-base-100">
            <div className="max-w-4xl mx-auto">
                <button onClick={onGoBack} className="flex items-center text-brand-secondary font-semibold mb-6 hover:underline">
                    <ChevronLeftIcon className="h-5 w-5 mr-1" />
                    Dib ugu laabo Shaybaarada
                </button>
                <div className="text-center mb-8 pb-8 border-b border-base-300">
                    <p className="font-semibold text-brand-secondary">{lab.category} Lab</p>
                    <h1 className="text-4xl font-bold text-brand-primary mt-2">{lab.title}</h1>
                </div>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-2xl font-bold text-brand-primary flex items-center mb-4"><LightBulbIcon className="h-6 w-6 mr-3 text-brand-accent"/>Ujeeddo</h2>
                        <p className="text-gray-700 leading-relaxed">{lab.objective}</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-brand-primary flex items-center mb-4"><BeakerIcon className="h-6 w-6 mr-3 text-brand-accent"/>Qalabka Loo Baahan Yahay</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            {lab.equipment.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </section>
                    
                     <section>
                        <h2 className="text-2xl font-bold text-brand-primary flex items-center mb-4"><ClipboardListIcon className="h-6 w-6 mr-3 text-brand-accent"/>Habka Shaqada (Procedure)</h2>
                        <ol className="list-decimal list-inside space-y-3 text-gray-700 leading-relaxed">
                             {lab.procedure.map((step, index) => <li key={index}>{step}</li>)}
                        </ol>
                    </section>

                    <section className="bg-base-200 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold text-brand-primary flex items-center mb-4"><CalculatorIcon className="h-6 w-6 mr-3 text-brand-accent"/>Geli Xogta & Xisaabi</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                {lab.inputData.fields.map(field => (
                                    <div key={field.id}>
                                        <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">{field.label} ({field.unit})</label>
                                        <input
                                            type={field.type}
                                            id={field.id}
                                            value={inputValues[field.id]}
                                            onChange={(e) => handleInputChange(field.id, e.target.value)}
                                            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-secondary"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="bg-base-100 p-4 rounded-md">
                                 <h3 className="font-semibold text-lg mb-2">Natiijooyinka</h3>
                                 {renderResults()}
                            </div>
                        </div>
                    </section>
                     <section>
                        <h2 className="text-2xl font-bold text-brand-primary flex items-center mb-4">Qaacidooyinka Xisaabta</h2>
                         <div className="space-y-4">
                            {lab.calculations.map((calc, i) => (
                                <div key={i} className="bg-gray-800 text-white p-4 rounded-md font-mono text-sm">
                                    <p>{calc.formula}</p>
                                    <p className="text-xs text-gray-400 mt-2 font-sans">{calc.description}</p>
                                </div>
                            ))}
                         </div>
                         <h3 className="font-semibold mt-6 mb-2">Tusaale Xisaabeed:</h3>
                         <p className="text-gray-700 text-sm whitespace-pre-wrap">{lab.exampleCalculation}</p>
                    </section>

                     <section>
                        <h2 className="text-2xl font-bold text-brand-primary flex items-center mb-4">Fasiraadda Natiijooyinka</h2>
                        <p className="text-gray-700 leading-relaxed">{lab.interpretation}</p>
                    </section>

                     <section>
                        <h2 className="text-2xl font-bold text-brand-primary flex items-center mb-4">Su'aalo Ardayga</h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                             {lab.studentQuestions.map((q, i) => <li key={i}>{q.question}</li>)}
                        </ul>
                    </section>
                </div>

            </div>
        </div>
    );
};

export default LabActivity;
