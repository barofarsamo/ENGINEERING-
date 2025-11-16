import React, { useRef, useCallback, useMemo, useState } from 'react';
import * as htmlToImage from 'html-to-image';
import jsPDF from 'jspdf';
import { AcademicCapIcon, ArrowRightIcon, DownloadIcon, ShareIcon, SpinnerIcon } from './Icons';

interface CertificateProps {
  disciplineName: string;
  onGoHome: () => void;
}

const Certificate: React.FC<CertificateProps> = ({ disciplineName, onGoHome }) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const certificateId = useMemo(() => `SAHAN-CERT-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`, []);

  const currentDate = new Date().toLocaleDateString('so-SO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleDownloadPdf = useCallback(() => {
    if (certificateRef.current === null) return;
    setIsProcessing(true);

    htmlToImage.toCanvas(certificateRef.current, { cacheBust: true, pixelRatio: 3, backgroundColor: '#ffffff' })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png', 1.0);
        // Create a standard A4 landscape PDF
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: 'a4'
        });
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        // Add the image to the PDF, scaling it to fit the A4 page
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Shahaadada_${disciplineName.replace(/\s/g, '_')}.pdf`);
      })
      .catch((err) => {
        console.error('Waxbaa khaldamay, fadlan isku day mar kale.', err);
        alert('Way guuldareysatay diyaarinta PDF-ka. Fadlan isku day mar kale.');
      })
      .finally(() => {
        setIsProcessing(false);
      });
  }, [disciplineName]);

  const handleShare = useCallback(async () => {
    if (certificateRef.current === null || !navigator.share) return;
    setIsProcessing(true);
    
    try {
        const blob = await htmlToImage.toBlob(certificateRef.current, { pixelRatio: 2, backgroundColor: '#ffffff' });
        if (!blob) throw new Error('Failed to create blob');

        const file = new File([blob], `Sahan_Engineering_Certificate.png`, { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
                title: `Shahaadadayda ${disciplineName}`,
                text: `Waxaan si guul leh u dhammeeyay koorsada ${disciplineName} ee SAHAN Engineering!`,
                files: [file],
            });
        } else {
             alert('Browser-kaagu ma taageerayo wadaagista faylasha.');
        }
    } catch (error) {
        console.error('Error sharing:', error);
    } finally {
        setIsProcessing(false);
    }
  }, [disciplineName]);
  
  const canShare = typeof navigator !== 'undefined' && !!navigator.share;
  
  const blueprintWatermark = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3e%3cg fill='none' stroke='%230A2540' stroke-opacity='0.05'%3e%3cpath d='M-100 50 L200 50 Z' stroke-width='1'/%3e%3cpath d='M50 -100 L50 200 Z' stroke-width='1'/%3e%3cpath d='M-90 10 L-90 90 A10 10 0 0 0 -80 100 L80 100 A10 10 0 0 0 90 90 L90 10 A10 10 0 0 0 80 0 L-80 0 A10 10 0 0 0 -90 10' stroke-width='0.5'/%3e%3ccircle cx='50' cy='50' r='20' stroke-width='0.5'/%3e%3c/g%3e%3c/svg%3e")`;

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-base-200 p-4 font-sans">
      <div className="w-full max-w-5xl">
        <div 
            ref={certificateRef} 
            className="bg-base-100 shadow-2xl p-2 aspect-[1.414/1] flex flex-col"
            style={{ backgroundImage: blueprintWatermark, backgroundSize: '200px 200px' }}
        >
            <div className="border-2 border-brand-primary w-full h-full p-2 flex flex-col">
                <div className="border border-brand-accent w-full h-full p-6 flex flex-col justify-between text-center text-brand-primary">
                    
                    {/* 1. Top Section */}
                    <div className="flex flex-col items-center">
                        <div className="flex items-center space-x-3">
                            <AcademicCapIcon className="h-10 w-10 text-brand-primary" />
                             <div className="text-center">
                                <h1 className="text-3xl font-bold tracking-wider">SAHAN ENGINEERING</h1>
                                <p className="text-sm font-semibold tracking-widest text-gray-600">Barnaamijka Tababarka Injineernimada Madaniga</p>
                            </div>
                        </div>
                    </div>

                    {/* 2. Main Certificate Body */}
                    <div className="flex-grow flex flex-col justify-center items-center">
                        <p className="text-5xl font-bold tracking-tight text-brand-secondary font-serif">Shahaadada Dhammaystirka</p>
                        <p className="mt-6 text-base text-gray-700">Shahaadadan waxaa la guddoonsiinayaa</p>
                        <p className="text-4xl font-semibold my-3 border-b-2 border-brand-accent pb-2 px-8 font-serif">
                            Ardayga Dadaalka Badan
                        </p>
                        <p className="max-w-2xl text-center text-base text-gray-700">
                            Ka dib markii uu si guul leh u muujiyay aqoon iyo dadaal dhamaystiran ee barashada takhasuska
                        </p>
                         <p className="text-2xl font-bold mt-2">{disciplineName}</p>
                         <p className="text-sm mt-4 text-gray-600 italic">"Waxaa la guddoonsiiyay aqoonsiga waxqabad heer sare ah iyo xirfad-yaqaannimo."</p>
                    </div>
                    
                    {/* 3. Details & Signatures Section */}
                    <div className="flex justify-between items-end w-full">
                        <div className="text-left text-xs text-gray-600 space-y-1">
                            <p><strong>Taariikhda Bixinta:</strong> {currentDate}</p>
                            <p><strong>Aqoonsiga Shahaadada:</strong> {certificateId}</p>
                            <p><strong>Muddada Tababarka:</strong> 4 Sano</p>
                        </div>

                        <div className="flex items-end space-x-16">
                             <div className="text-center">
                                <div className="w-48 h-12 mb-1">{/* Placeholder for signature */}</div>
                                <div className="w-full h-px bg-brand-primary"></div>
                                <p className="text-sm font-bold mt-1">Agaasimaha Waxbarashada</p>
                                <p className="text-xs text-gray-600">M. Sahan</p>
                            </div>
                            <div className="text-center">
                                <div className="w-48 h-12 mb-1">{/* Placeholder for signature */}</div>
                                <div className="w-full h-px bg-brand-primary"></div>
                                <p className="text-sm font-bold mt-1">Isku-duwaha Barnaamijka</p>
                                <p className="text-xs text-gray-600">A. Ali</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* 4. Bottom Section */}
                    <div className="absolute bottom-3 right-3 text-right">
                        <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500">[QR]</div>
                    </div>
                    <div className="absolute bottom-3 left-3 text-left text-xs text-gray-500">
                        <p>www.sahan-engineering.com</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
                onClick={handleDownloadPdf}
                disabled={isProcessing}
                className="group inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-brand-secondary text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-wait"
            >
                {isProcessing ? <SpinnerIcon className="h-5 w-5 mr-2 animate-spin" /> : <DownloadIcon className="h-5 w-5 mr-2" />}
                {isProcessing ? 'Waa la diyaarinayaa...' : 'Degso Shahaadada (PDF)'}
            </button>
            {canShare && (
                 <button
                    onClick={handleShare}
                    disabled={isProcessing}
                    className="group inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-wait"
                >
                    {isProcessing ? <SpinnerIcon className="h-5 w-5 mr-2 animate-spin" /> : <ShareIcon className="h-5 w-5 mr-2" />}
                    {isProcessing ? 'Sug...' : 'La Wadaag'}
                </button>
            )}
            <button
                onClick={onGoHome}
                disabled={isProcessing}
                className="group inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-brand-primary text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
                Qaybo Kale
                <ArrowRightIcon className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default Certificate;