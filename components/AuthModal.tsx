import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { XIcon, SpinnerIcon, CheckCircleIcon } from './Icons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthMode = 'login' | 'register' | 'forgotPassword' | 'resetSent';

// SECURITY FIX: Generic error mapping to prevent Information Leakage (User Enumeration)
const getSafeErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
            return "Emailka ama erayga sirta ah waa qalad."; // Generic message
        case 'auth/email-already-in-use':
            return "Emailkan horay ayaa loo diiwaangeliyay.";
        case 'auth/weak-password':
            return "Erayga sirta ah waa inuu ahaadaa ugu yaraan 6 xaraf.";
        case 'auth/invalid-email':
            return "Fadlan geli email sax ah.";
        case 'auth/too-many-requests':
            return "Isku dayo badan. Fadlan sug wax yar.";
        default:
            return "Cilad ayaa dhacday. Fadlan isku day mar kale.";
    }
};

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Function to reset form state when switching modes or closing
  const resetState = () => {
    setEmail('');
    setPassword('');
    setError(null);
    setIsLoading(false);
  };

  const handleClose = () => {
    resetState();
    setAuthMode('login'); // Reset to default view on close
    onClose();
  };

  useEffect(() => {
      if (isOpen) {
          resetState();
          setAuthMode('login');
      }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (!auth) {
        setError("Firebase configuration is missing or invalid. Authentication is disabled.");
        setIsLoading(false);
        return;
      }
      if (authMode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      handleClose(); // Close on success
    } catch (err: any) {
      // SECURITY FIX: Don't expose raw error code
      setError(getSafeErrorMessage(err.code));
    } finally {
        setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
        if (!auth) {
            setError("Firebase configuration is missing or invalid. Authentication is disabled.");
            setIsLoading(false);
            return;
        }
        await sendPasswordResetEmail(auth, email);
        setAuthMode('resetSent');
    } catch (err: any) {
        // SECURITY FIX: Don't expose raw error code
        setError(getSafeErrorMessage(err.code));
    } finally {
        setIsLoading(false);
    }
  };
  
  const handleSwitchMode = (mode: AuthMode) => {
    resetState();
    setAuthMode(mode);
  };

  if (!isOpen) return null;

  const renderContent = () => {
    switch (authMode) {
        case 'resetSent':
            return (
                <div className="text-center">
                    <CheckCircleIcon className="h-16 w-16 mx-auto text-green-500 mb-4" />
                    <h2 className="text-2xl font-bold text-brand-primary mb-2">Link-ga dib u dejinta waa la diray</h2>
                    <p className="text-gray-600 mb-6">
                        Fadlan ka eeg emailkaaga <span className="font-semibold">{email}</span> tilmaamaha ku saabsan sida loo beddelo erayga sirta ah.
                    </p>
                    <button
                        onClick={() => handleSwitchMode('login')}
                        className="w-full bg-brand-primary text-white font-bold py-3 rounded-lg hover:bg-brand-primary/90 transition-colors"
                    >
                        Ku laabo Soo Galitaanka
                    </button>
                </div>
            );
        case 'forgotPassword':
            return (
                <>
                    <h2 className="text-3xl font-bold text-brand-primary mb-4 text-center">Dib u deji Ereyga Sirta</h2>
                    <p className="text-center text-gray-600 mb-6">
                        Geli emailkaaga si aad u hesho link aad ku beddesho erayga sirta ah.
                    </p>
                    <form onSubmit={handlePasswordReset} className="space-y-6">
                        <div>
                            <label htmlFor="email-reset" className="block text-sm font-medium text-gray-700">Ciwaanka Emailka</label>
                            <input
                                type="email"
                                id="email-reset"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-secondary focus:outline-none"
                                placeholder="your@email.com"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm bg-red-100 p-3 rounded-md">{error}</p>}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center bg-brand-secondary text-white font-bold py-3 rounded-lg hover:bg-brand-secondary/90 transition-colors disabled:bg-gray-400"
                        >
                            {isLoading && <SpinnerIcon className="h-5 w-5 mr-2 animate-spin" />}
                            Dir Link-ga Dib u Dejinta
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-6">
                        <button onClick={() => handleSwitchMode('login')} className="font-semibold text-brand-secondary hover:underline">
                            Ku laabo Soo Galitaanka
                        </button>
                    </p>
                </>
            );
        case 'login':
        case 'register':
            return (
                <>
                    <h2 className="text-3xl font-bold text-brand-primary mb-4 text-center">{authMode === 'login' ? 'Ku soo gal' : 'Isdiiwaangeli'}</h2>
                    <p className="text-center text-gray-600 mb-6">
                        {authMode === 'login' ? 'Kusoo gal akoonkaaga si aad u sii wadato waxbarashadaada.' : 'Samee akoon cusub si aad u bilowdo safarkaaga waxbarasho.'}
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email-auth" className="block text-sm font-medium text-gray-700">Ciwaanka Emailka</label>
                            <input
                                type="email"
                                id="email-auth"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-secondary focus:outline-none"
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Ereyga Sirta ah</label>
                                {authMode === 'login' && (
                                     <button 
                                        type="button" 
                                        onClick={() => handleSwitchMode('forgotPassword')}
                                        className="text-sm font-semibold text-brand-secondary hover:underline focus:outline-none"
                                    >
                                        Ma illowday?
                                    </button>
                                )}
                            </div>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-secondary focus:outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                        {error && <p className="text-red-500 text-sm bg-red-100 p-3 rounded-md">{error}</p>}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center items-center bg-brand-secondary text-white font-bold py-3 rounded-lg hover:bg-brand-secondary/90 transition-colors disabled:bg-gray-400"
                        >
                            {isLoading && <SpinnerIcon className="h-5 w-5 mr-2 animate-spin" />}
                            {authMode === 'login' ? 'Soo Gal' : 'Samee Akoon'}
                        </button>
                    </form>
                    <p className="text-center text-sm text-gray-600 mt-6">
                        {authMode === 'login' ? "Akoon cusub ma u baahan tahay? " : "Akoon ma leedahay? "}
                        <button onClick={() => handleSwitchMode(authMode === 'login' ? 'register' : 'login')} className="font-semibold text-brand-secondary hover:underline">
                            {authMode === 'login' ? 'Isdiiwaangeli' : 'Soo Gal'}
                        </button>
                    </p>
                </>
            );
        default:
            return null;
    }
  }


  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={handleClose}>
      <div className="bg-base-100 rounded-lg shadow-2xl p-8 max-w-md w-full relative" onClick={e => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <XIcon className="h-6 w-6" />
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default AuthModal;