
import React, { useState, useEffect, useRef } from 'react';
import { MenuIcon, SparklesIcon, UserCircleIcon, SearchIcon, XIcon, BookOpenIcon, WrenchScrewdriverIcon, CalculatorIcon, BeakerIcon } from './Icons';
import type { Discipline, Lesson, SearchResult } from '../types';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { User, signOut } from 'firebase/auth';
import { auth } from '../firebase';


interface HeaderProps {
  onToggleSidebar: () => void;
  onToggleTutor: () => void;
  disciplines: Discipline[];
  onSelectDiscipline: (discipline: Discipline) => void;
  onSelectSearchResult: (result: SearchResult) => void;
  onGoHome: () => void;
  onSelectTool: (tool: 'TOOLS_UNIT_CONVERTER' | 'TOOLS_LOAD_CALCULATOR') => void;
  user: User | null;
  onOpenAuthModal: () => void;
}

const SearchModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    disciplines: Discipline[];
    onSelectDiscipline: (discipline: Discipline) => void;
    onSelectSearchResult: (result: SearchResult) => void;
}> = ({ isOpen, onClose, disciplines, onSelectDiscipline, onSelectSearchResult }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState<{disciplines: Discipline[], lessons: SearchResult[]}>({disciplines: [], lessons: []});
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
            setSearchTerm('');
        }
    }, [isOpen]);

    useEffect(() => {
        if (searchTerm.trim().length < 2) {
            setResults({disciplines: [], lessons: []});
            return;
        }
        
        const lowerCaseSearchTerm = searchTerm.toLowerCase();

        const matchingDisciplines = disciplines.filter(d =>
            d.name.toLowerCase().includes(lowerCaseSearchTerm)
        );

        const matchingLessons: SearchResult[] = [];
        disciplines.forEach(discipline => {
            discipline.levels.forEach(level => {
                level.modules.forEach(module => {
                    module.lessons.forEach(lesson => {
                        if (lesson.title.toLowerCase().includes(lowerCaseSearchTerm)) {
                            matchingLessons.push({ discipline, level, module, lesson });
                        }
                    });
                });
            });
        });
        
        setResults({
            disciplines: matchingDisciplines,
            lessons: matchingLessons.slice(0, 10) // Limit lesson results
        });

    }, [searchTerm, disciplines]);

    const handleSelectDiscipline = (discipline: Discipline) => {
        onSelectDiscipline(discipline);
        onClose();
    };
    
    const handleSelectLesson = (result: SearchResult) => {
        onSelectSearchResult(result);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center p-4" onClick={onClose}>
            <div className="bg-base-100 rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="p-4 border-b border-base-300 relative">
                     <SearchIcon className="absolute left-7 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                     <input
                        ref={inputRef}
                        type="text"
                        placeholder="Raadi casharo ama qaybo..."
                        className="w-full pl-10 pr-4 py-2 border border-base-300 rounded-md focus:ring-2 focus:ring-brand-accent focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800">
                        <XIcon className="h-6 w-6" />
                    </button>
                </div>
                <div className="overflow-y-auto">
                    {results.lessons.length > 0 && (
                        <div>
                            <h3 className="px-4 py-2 text-xs font-bold uppercase text-gray-500 bg-base-200">Casharo</h3>
                            <ul>
                                {results.lessons.map(result => (
                                    <li key={result.lesson.id}>
                                        <button onClick={() => handleSelectLesson(result)} className="w-full text-left px-4 py-3 hover:bg-base-200 flex items-start">
                                            <BookOpenIcon className="h-5 w-5 mr-3 mt-1 text-brand-secondary flex-shrink-0" />
                                            <div>
                                                <p className="font-semibold">{result.lesson.title}</p>
                                                <p className="text-xs text-gray-500">{result.discipline.name} &gt; {result.module.title}</p>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {results.disciplines.length > 0 && (
                         <div>
                            <h3 className="px-4 py-2 text-xs font-bold uppercase text-gray-500 bg-base-200">Qaybaha Injineernimada</h3>
                            <ul>
                                {results.disciplines.map(discipline => (
                                <li key={discipline.id}>
                                    <button 
                                    onClick={() => handleSelectDiscipline(discipline)}
                                    className="w-full text-left flex items-center px-4 py-3 hover:bg-base-200 transition-colors"
                                    >
                                    <discipline.icon className="h-5 w-5 mr-3 text-brand-secondary" />
                                    <span>{discipline.name}</span>
                                    </button>
                                </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}


const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onToggleTutor, disciplines, onSelectDiscipline, onSelectSearchResult, onGoHome, onSelectTool, user, onOpenAuthModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<{disciplines: Discipline[], lessons: SearchResult[]}>({disciplines: [], lessons: []});
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const [isToolsOpen, setToolsOpen] = useState(false);
  const toolsRef = useRef<HTMLDivElement>(null);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setResults({disciplines: [], lessons: []});
      return;
    }
    
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const matchingDisciplines = disciplines.filter(d =>
      d.name.toLowerCase().includes(lowerCaseSearchTerm)
    );

    const matchingLessons: SearchResult[] = [];
    disciplines.forEach(discipline => {
        discipline.levels.forEach(level => {
            level.modules.forEach(module => {
                module.lessons.forEach(lesson => {
                    if (lesson.title.toLowerCase().includes(lowerCaseSearchTerm)) {
                        matchingLessons.push({ discipline, level, module, lesson });
                    }
                });
            });
        });
    });
    
    setResults({
        disciplines: matchingDisciplines,
        lessons: matchingLessons.slice(0, 5) // Limit lesson results in dropdown
    });

  }, [searchTerm, disciplines]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchTerm('');
      }
      if (toolsRef.current && !toolsRef.current.contains(event.target as Node)) {
        setToolsOpen(false);
      }
       if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectDiscipline = (discipline: Discipline) => {
    onSelectDiscipline(discipline);
    setSearchTerm('');
  };

  const handleSelectLesson = (result: SearchResult) => {
    onSelectSearchResult(result);
    setSearchTerm('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (results.lessons.length > 0) {
        handleSelectLesson(results.lessons[0]);
      } else if (results.disciplines.length > 0) {
        handleSelectDiscipline(results.disciplines[0]);
      }
    }
  };
  
  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const handleSignOut = () => {
    signOut(auth);
    setProfileMenuOpen(false);
  };

  const showResults = searchTerm.length > 1 && (results.disciplines.length > 0 || results.lessons.length > 0);

  return (
    <>
    <header className="bg-brand-primary text-white shadow-md flex items-center justify-between p-3 z-40 relative">
      <div className="flex items-center">
        <button onClick={onToggleSidebar} className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-accent md:hidden">
          <MenuIcon className="h-6 w-6" />
        </button>
        <button onClick={onGoHome} className="text-left" aria-label="Tag bogga hore">
          <h1 className="text-xl md:text-2xl font-bold ml-2 md:ml-0">
            <span className="text-brand-accent">SAHAN</span> Engineering
          </h1>
        </button>
      </div>
      
      <div ref={searchContainerRef} className="hidden md:block flex-1 mx-8 max-w-xl relative">
        <div className="relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Ka raadi casharo ama qaybo..."
            className="w-full pl-11 pr-11 py-2.5 border-none rounded-full bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-brand-accent focus:outline-none focus:bg-white/20 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {searchTerm && (
            <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-300 hover:text-white transition-colors"
                aria-label="Nadiifi raadinta"
            >
                <XIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        {showResults && (
          <div className="absolute top-full mt-2 w-full bg-base-100 rounded-lg shadow-lg overflow-hidden max-h-96 overflow-y-auto text-base-content">
            {results.lessons.length > 0 && (
                <div>
                    <h3 className="px-4 pt-3 pb-1 text-xs font-bold uppercase text-gray-500">Casharo</h3>
                    <ul>
                        {results.lessons.map(result => (
                            <li key={result.lesson.id}>
                                <button onClick={() => handleSelectLesson(result)} className="w-full text-left px-4 py-2 hover:bg-base-200">
                                    <p className="font-semibold">{result.lesson.title}</p>
                                    <p className="text-xs text-gray-500">{result.discipline.name}</p>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {results.disciplines.length > 0 && (
              <div>
                <h3 className="px-4 pt-3 pb-1 text-xs font-bold uppercase text-gray-500">Qaybaha Injineernimada</h3>
                <ul>
                    {results.disciplines.map(discipline => (
                    <li key={discipline.id}>
                        <button 
                        onClick={() => handleSelectDiscipline(discipline)}
                        className="w-full text-left flex items-center px-4 py-3 hover:bg-base-200 transition-colors"
                        >
                        <discipline.icon className="h-5 w-5 mr-3 text-brand-secondary" />
                        <span>{discipline.name}</span>
                        </button>
                    </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        {isMobile && (
             <button onClick={() => setSearchModalOpen(true)} className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-accent">
                <SearchIcon className="h-6 w-6" />
            </button>
        )}
        <div ref={toolsRef} className="relative">
             <button onClick={() => setToolsOpen(!isToolsOpen)} className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-accent flex items-center">
                <WrenchScrewdriverIcon className="h-6 w-6" />
                <span className="hidden lg:inline ml-2 text-sm font-semibold">Tools</span>
            </button>
            {isToolsOpen && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-base-100 rounded-lg shadow-lg overflow-hidden text-base-content py-2">
                    <button 
                        onClick={() => { onSelectTool('TOOLS_UNIT_CONVERTER'); setToolsOpen(false); }}
                        className="w-full text-left flex items-center px-4 py-3 hover:bg-base-200 transition-colors"
                    >
                        <CalculatorIcon className="h-5 w-5 mr-3 text-brand-secondary" />
                        <span>Unit Converter</span>
                    </button>
                    <button
                        onClick={() => { onSelectTool('TOOLS_LOAD_CALCULATOR'); setToolsOpen(false); }}
                        className="w-full text-left flex items-center px-4 py-3 hover:bg-base-200 transition-colors"
                    >
                        <BeakerIcon className="h-5 w-5 mr-3 text-brand-secondary" />
                        <span>Beam Load Calculator</span>
                    </button>
                </div>
            )}
        </div>
        <div ref={profileRef} className="relative">
            <button onClick={() => {
                if (user) {
                    setProfileMenuOpen(!isProfileMenuOpen);
                } else {
                    onOpenAuthModal();
                }
            }} className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-accent">
                <UserCircleIcon className="h-7 w-7" />
            </button>
            {user && isProfileMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-base-100 rounded-lg shadow-lg overflow-hidden text-base-content py-2">
                    <div className="px-4 py-3 border-b border-base-300">
                        <p className="text-sm font-semibold">Ku soo galay:</p>
                        <p className="text-sm text-gray-600 truncate">{user.email}</p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="w-full text-left flex items-center px-4 py-3 hover:bg-base-200 transition-colors text-red-600"
                    >
                        Ka Bax
                    </button>
                </div>
            )}
        </div>
         <button onClick={onToggleTutor} className="p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-brand-accent md:hidden">
          <SparklesIcon className="h-6 w-6" />
        </button>
      </div>
    </header>
    <SearchModal 
        isOpen={isSearchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        disciplines={disciplines}
        onSelectDiscipline={onSelectDiscipline}
        onSelectSearchResult={onSelectSearchResult}
    />
    </>
  );
};

export default Header;