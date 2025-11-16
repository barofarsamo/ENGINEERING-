import React from 'react';
import type { Discipline, Lab, LabCategory } from '../types';
import LabActivity from './LabActivity';
import { ChevronLeftIcon, BeakerIcon } from './Icons';

interface VirtualLabProps {
    discipline: Discipline;
    selectedLab: Lab | null;
    onSelectLab: (lab: Lab) => void;
    onGoBack: () => void;
}

const LabBrowser: React.FC<Omit<VirtualLabProps, 'selectedLab'>> = ({ discipline, onSelectLab, onGoBack }) => {
    // FIX: Explicitly typed the `labsByCategory` constant to ensure the result of the `reduce` function is correctly typed.
    const labsByCategory: Record<LabCategory, Lab[]> = (discipline.labs || []).reduce((acc, lab) => {
        (acc[lab.category] = acc[lab.category] || []).push(lab);
        return acc;
    }, {} as Record<LabCategory, Lab[]>);

    return (
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-base-200">
            <div className="max-w-4xl mx-auto">
                 <button onClick={onGoBack} className="flex items-center text-brand-secondary font-semibold mb-6 hover:underline">
                    <ChevronLeftIcon className="h-5 w-5 mr-1" />
                    Dib ugu laabo Cutubyada
                </button>
                <div className="text-center mb-8">
                    <BeakerIcon className="h-16 w-16 text-brand-secondary mb-4 mx-auto" />
                    <h1 className="text-4xl font-bold text-brand-primary mb-2">Shaybaarka Virtual-ka ah</h1>
                    <p className="text-lg text-gray-600">Gacmahaaga ku samee tijaabooyin si aad u fahamto fikradaha injineernimada ee muhiimka ah.</p>
                </div>

                {Object.entries(labsByCategory).map(([category, labs]) => (
                    <div key={category} className="mb-8">
                        <h2 className="text-2xl font-bold text-brand-primary mb-4">{category} Lab</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {labs.map(lab => (
                                <button
                                    key={lab.id}
                                    onClick={() => onSelectLab(lab)}
                                    className="group bg-base-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-all text-left flex items-center hover:border-brand-secondary border-2 border-transparent hover:-translate-y-1"
                                >
                                    <BeakerIcon className="h-6 w-6 text-brand-secondary mr-3 flex-shrink-0" />
                                    <span className="font-semibold text-brand-primary group-hover:text-brand-secondary">{lab.title}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};


const VirtualLab: React.FC<VirtualLabProps> = ({ discipline, selectedLab, onSelectLab, onGoBack }) => {
    if (selectedLab) {
        return <LabActivity lab={selectedLab} onGoBack={onGoBack} />;
    }
    return <LabBrowser discipline={discipline} onSelectLab={onSelectLab} onGoBack={onGoBack} />;
};

export default VirtualLab;