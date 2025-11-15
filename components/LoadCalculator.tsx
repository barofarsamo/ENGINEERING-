
import React, { useState, useMemo } from 'react';
import { ChevronLeftIcon } from './Icons';

interface LoadCalculatorProps {
    onGoHome: () => void;
}

const LoadCalculator: React.FC<LoadCalculatorProps> = ({ onGoHome }) => {
    const [beamLength, setBeamLength] = useState<string>('10');
    const [pointLoad, setPointLoad] = useState<string>('100');
    const [loadPosition, setLoadPosition] = useState<string>('5');

    const results = useMemo(() => {
        const L = parseFloat(beamLength);
        const P = parseFloat(pointLoad);
        const a = parseFloat(loadPosition);

        if (isNaN(L) || isNaN(P) || isNaN(a) || L <= 0 || a < 0 || a > L) {
            return { R1: null, R2: null, error: 'Fadlan geli qiimayaal sax ah. Dhererku waa inuu ka weynaadaa 0, meesha culeyskuna waa inay ku dhex jirtaa dhererka.' };
        }

        const b = L - a;
        const R1 = (P * b) / L;
        const R2 = (P * a) / L;

        return { 
            R1: R1.toFixed(2), 
            R2: R2.toFixed(2), 
            error: null 
        };

    }, [beamLength, pointLoad, loadPosition]);
    
    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-base-200">
            <div className="max-w-4xl mx-auto">
                <button onClick={onGoHome} className="flex items-center text-brand-secondary font-semibold mb-6 hover:underline">
                    <ChevronLeftIcon className="h-5 w-5 mr-1" />
                    Dib ugu laabo Bogga Hore
                </button>
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-brand-primary mb-2">Xisaabiyaha Culeyska Dogobka</h1>
                    <p className="text-lg text-gray-600">Xisaabi falcelinta dogob si fudud loo taageeray oo leh hal culeys.</p>
                </div>

                <div className="bg-base-100 rounded-lg shadow-md p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Input Section */}
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="beamLength" className="block text-sm font-medium text-gray-700 mb-1">Dhererka Dogobka (L) (mitir)</label>
                                <input
                                    type="number"
                                    id="beamLength"
                                    value={beamLength}
                                    onChange={(e) => setBeamLength(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-secondary focus:outline-none"
                                    placeholder="e.g., 10"
                                />
                            </div>
                            <div>
                                <label htmlFor="pointLoad" className="block text-sm font-medium text-gray-700 mb-1">Culeyska (P) (kilonewtons)</label>
                                <input
                                    type="number"
                                    id="pointLoad"
                                    value={pointLoad}
                                    onChange={(e) => setPointLoad(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-secondary focus:outline-none"
                                    placeholder="e.g., 100"
                                />
                            </div>
                            <div>
                                <label htmlFor="loadPosition" className="block text-sm font-medium text-gray-700 mb-1">Masaafada Culeyska Taageerada 1 (a) (mitir)</label>
                                <input
                                    type="number"
                                    id="loadPosition"
                                    value={loadPosition}
                                    onChange={(e) => setLoadPosition(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-secondary focus:outline-none"
                                    placeholder="e.g., 5"
                                />
                            </div>
                        </div>

                        {/* Results and Diagram Section */}
                        <div className="flex flex-col items-center justify-center bg-base-200/50 p-6 rounded-lg">
                             <h3 className="text-xl font-bold text-brand-primary mb-4">Natiijooyinka Falcelinta</h3>
                             {results.error ? (
                                <p className="text-red-600 text-center">{results.error}</p>
                             ) : (
                                <div className="w-full text-center space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Falcelinta Taageerada 1 (R1)</p>
                                        <p className="text-2xl font-bold text-brand-secondary">{results.R1} kN</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Falcelinta Taageerada 2 (R2)</p>
                                        <p className="text-2xl font-bold text-brand-secondary">{results.R2} kN</p>
                                    </div>
                                </div>
                             )}

                             {/* Simple Diagram */}
                             <div className="w-full mt-6">
                                <p className="text-center text-xs text-gray-500 mb-2">Jaantus Fudud</p>
                                <div className="w-full h-2 bg-gray-400 relative">
                                    {/* Load Arrow */}
                                    {!results.error && (
                                        <div className="absolute top-0 transform -translate-y-full -translate-x-1/2" style={{ left: `${(parseFloat(loadPosition) / parseFloat(beamLength)) * 100}%`}}>
                                           <span className="text-xs text-red-600">P</span>
                                            <div className="w-0.5 h-6 bg-red-600 mx-auto"></div>
                                            <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-red-600 mx-auto"></div>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-between mt-1">
                                    <div className="flex flex-col items-center">
                                        <div className="w-0 h-0 border-l-6 border-r-6 border-b-6 border-transparent border-b-brand-secondary"></div>
                                        <span className="text-xs font-semibold">R1</span>
                                    </div>
                                     <div className="flex flex-col items-center">
                                        <div className="w-0 h-0 border-l-6 border-r-6 border-b-6 border-transparent border-b-brand-secondary"></div>
                                        <span className="text-xs font-semibold">R2</span>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadCalculator;
