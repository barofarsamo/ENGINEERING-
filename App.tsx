
import React, { useState, useMemo, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LessonReader from './components/LessonReader';
import AiTutor from './components/AiTutor';
import DisciplineBrowser from './components/DisciplineBrowser';
import Certificate from './components/Certificate';
import ChapterBrowser from './components/ChapterBrowser';
import LessonBrowser from './components/LessonBrowser';
import UnitConverter from './components/UnitConverter';
import LoadCalculator from './components/LoadCalculator';
import VirtualLab from './components/VirtualLab';
import { disciplines } from './constants';
import type { Discipline, Lesson, SearchResult, Level, Module, Lab } from './types';
import { useProgress } from './hooks/useProgress';
import { useDownloads } from './hooks/useDownloads';
import { SpinnerIcon, AcademicCapIcon, BookOpenIcon, BuildingIcon, ArrowRightIcon, XIcon } from './components/Icons';
import { useMediaQuery } from './hooks/useMediaQuery';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebase';
import AuthModal from './components/AuthModal';

const LoadingScreen: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-base-200 text-center p-4">
    <div className="mb-4">
      <h1 className="text-4xl font-bold text-brand-primary">
        <span className="text-brand-accent">SAHAN</span> Engineering
      </h1>
    </div>
    <SpinnerIcon className="h-8 w-8 text-brand-secondary animate-spin" />
    <p className="mt-4 text-lg text-gray-600">Waxaan diyaarinaynaa khibradaada waxbarasho...</p>
  </div>
);

type ViewMode = 'BROWSE' | 'LEARN' | 'CERTIFICATE' | 'CHAPTER_BROWSE' | 'LESSON_BROWSE' | 'TOOLS_UNIT_CONVERTER' | 'TOOLS_LOAD_CALCULATOR' | 'VIRTUAL_LAB';

const App: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [viewMode, setViewMode] = useState<ViewMode>('BROWSE');
  const [selectedDiscipline, setSelectedDiscipline] = useState<Discipline | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<Level | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedLab, setSelectedLab] = useState<Lab | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [isTutorOpen, setTutorOpen] = useState(!isMobile);
  const [tutorInitialPrompt, setTutorInitialPrompt] = useState<string | null>(null);
  const [isCompletionModalOpen, setCompletionModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authIsLoading, setAuthIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthIsLoading(false);
    });
    return () => unsubscribe();
  }, []);


  const {
    isLoaded,
    completedLessons,
    markModuleAsComplete,
    setLastViewed,
    getProgressForDiscipline,
    getLastViewedLessonData,
    getUnlockedLevels,
  } = useProgress();
  
  const {
    getDownloadStatus,
    addDownload,
    removeDownload,
    getDownloadedDiscipline
  } = useDownloads();

  const disciplineForView = useMemo(() => {
    if (selectedDiscipline?.id === 'civil-engineering' && selectedChapter && selectedModule) {
      const filteredLevel = { ...selectedChapter, modules: [selectedModule] };
      return { ...selectedDiscipline, levels: [filteredLevel] };
    }
    return selectedDiscipline;
  }, [selectedDiscipline, selectedChapter, selectedModule]);

  const { flatLessons } = useMemo(() => {
    if (!disciplineForView) {
      return { flatLessons: [] };
    }
    const lessons: Lesson[] = [];
    disciplineForView.levels.forEach(l => l.modules.forEach(m => lessons.push(...m.lessons)));
    return { flatLessons: lessons };
  }, [disciplineForView]);
  
  const unlockedLevels = useMemo(() => {
    if (!selectedDiscipline) return new Set<string>();
    return getUnlockedLevels(selectedDiscipline.id);
  }, [selectedDiscipline, getUnlockedLevels]);
  
  const { nextNavigationTarget, isLastModuleInDiscipline } = useMemo(() => {
    if (!selectedDiscipline || !selectedChapter || !selectedModule) {
      return { nextNavigationTarget: null, isLastModuleInDiscipline: false };
    }

    const currentChapterIndex = selectedDiscipline.levels.findIndex(l => l.id === selectedChapter.id);
    if (currentChapterIndex === -1) return { nextNavigationTarget: null, isLastModuleInDiscipline: false };

    const currentModuleIndex = selectedChapter.modules.findIndex(m => m.id === selectedModule.id);
    if (currentModuleIndex === -1) return { nextNavigationTarget: null, isLastModuleInDiscipline: false };

    // Check for next module in the same chapter
    if (currentModuleIndex < selectedChapter.modules.length - 1) {
      const nextModule = selectedChapter.modules[currentModuleIndex + 1];
      return { nextNavigationTarget: { type: 'module', data: nextModule }, isLastModuleInDiscipline: false };
    }

    // Check for next chapter in the same discipline
    if (currentChapterIndex < selectedDiscipline.levels.length - 1) {
      const nextChapter = selectedDiscipline.levels[currentChapterIndex + 1];
      return { nextNavigationTarget: { type: 'chapter', data: nextChapter }, isLastModuleInDiscipline: false };
    }
    
    // This is the end of the discipline
    const lastLevel = selectedDiscipline.levels[selectedDiscipline.levels.length - 1];
    const lastModule = lastLevel.modules[lastLevel.modules.length - 1];
    const isLast = selectedModule.id === lastModule.id;

    return { nextNavigationTarget: null, isLastModuleInDiscipline: isLast };
  }, [selectedDiscipline, selectedChapter, selectedModule]);


  const handleSelectLesson = (lesson: Lesson) => {
    const lessonLevel = selectedDiscipline?.levels.find(level => 
        level.modules.some(module => 
            module.lessons.some(l => l.id === lesson.id)
        )
    );
    
    if (lessonLevel && !unlockedLevels.has(lessonLevel.id)) {
        return;
    }
    
    setSelectedLesson(lesson);
    if (selectedDiscipline) {
      setLastViewed(selectedDiscipline.id, lesson.id);
    }
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const handleStartLearning = (discipline: Discipline) => {
    const offlineDiscipline = getDownloadedDiscipline(discipline.id) || discipline;
    setSelectedDiscipline(offlineDiscipline);
    setSelectedChapter(null);
    setSelectedModule(null);
    setSelectedLesson(null);


    if (discipline.id === 'civil-engineering') {
        setViewMode('CHAPTER_BROWSE');
    } else {
        const firstLesson = offlineDiscipline.levels[0].modules[0].lessons[0];
        setSelectedLesson(firstLesson);
        setSelectedModule(offlineDiscipline.levels[0].modules[0]);
        setLastViewed(offlineDiscipline.id, firstLesson.id);
        setViewMode('LEARN');
    }
  };
  
  const handleSelectChapter = (chapter: Level) => {
    setSelectedChapter(chapter);
    setSelectedModule(null);
    setSelectedLesson(null);
    setViewMode('LESSON_BROWSE');
  };

  const handleSelectModule = (module: Module) => {
    setSelectedModule(module);
    const firstLesson = module.lessons[0];
    setSelectedLesson(firstLesson);
    if (selectedDiscipline) {
        setLastViewed(selectedDiscipline.id, firstLesson.id);
    }
    setViewMode('LEARN');
  };

  const handleSelectSearchResult = (result: SearchResult) => {
    const offlineDiscipline = getDownloadedDiscipline(result.discipline.id) || result.discipline;
    setSelectedDiscipline(offlineDiscipline);
    
    if (offlineDiscipline.id === 'civil-engineering') {
        setSelectedChapter(result.level);
        setSelectedModule(result.module);
    } else {
        // For non-civil, we need to find the module and chapter from the lesson
        const foundLevel = offlineDiscipline.levels.find(l => l.modules.some(m => m.id === result.module.id));
        setSelectedChapter(foundLevel || null);
        setSelectedModule(result.module);
    }
    
    setSelectedLesson(result.lesson);
    setLastViewed(offlineDiscipline.id, result.lesson.id);
    setViewMode('LEARN');
  };

  const handleGoHome = () => {
    setViewMode('BROWSE');
    setSelectedDiscipline(null);
    setSelectedLesson(null);
    setSelectedChapter(null);
    setSelectedModule(null);
    setSelectedLab(null);
  };
  
  const handleCompleteModule = () => {
    if (selectedModule) {
      const lessonIds = selectedModule.lessons.map(l => l.id);
      markModuleAsComplete(lessonIds);
      if (isLastModuleInDiscipline) {
        setViewMode('CERTIFICATE');
      } else {
        setCompletionModalOpen(true);
      }
    }
  };

  const handleNavigateToNext = () => {
    if (!nextNavigationTarget || !selectedModule) {
      return;
    }
    
    // Silently mark current module as complete
    const lessonIds = selectedModule.lessons.map(l => l.id);
    markModuleAsComplete(lessonIds);


    if (nextNavigationTarget.type === 'module') {
      const nextModule = nextNavigationTarget.data as Module;
      handleSelectModule(nextModule); 
    } else if (nextNavigationTarget.type === 'chapter') {
      const nextChapter = nextNavigationTarget.data as Level;
      handleSelectChapter(nextChapter);
    }
  };


  const handleGoToNextModule = () => {
    setCompletionModalOpen(false);
    setViewMode('LESSON_BROWSE');
    setSelectedModule(null);
    setSelectedLesson(null);
  };

  const handleGoToChapters = () => {
    setCompletionModalOpen(false);
    setViewMode('CHAPTER_BROWSE');
    setSelectedChapter(null);
    setSelectedModule(null);
    setSelectedLesson(null);
  };
  
  const handleGoHomeFromModal = () => {
    setCompletionModalOpen(false);
    handleGoHome();
  };

  const handleTermClick = (term: string, context?: string) => {
    const prompt = context 
      ? `Marka loo eego macnaha guud ee "${context}", fadlan si faahfaahsan iigu sharax aragtida ka dambaysa.`
      : `Fadlan si faahfaahsan iigu sharax waxa loola jeedo "${term}" marka loo eego casharkan.`;
    setTutorInitialPrompt(prompt);
    if(!isTutorOpen) {
      setTutorOpen(true);
    }
  };

  const handleGoToLab = (labId: string) => {
    if (!selectedDiscipline || !selectedDiscipline.labs) return;
    const lab = selectedDiscipline.labs.find(l => l.id === labId);
    if (lab) {
      setSelectedLab(lab);
      setViewMode('VIRTUAL_LAB');
    }
  }
  
  const renderContent = () => {
    switch(viewMode) {
      case 'BROWSE':
        return (
          <DisciplineBrowser 
            disciplines={disciplines} 
            onSelectDiscipline={handleStartLearning}
            getProgressForDiscipline={getProgressForDiscipline}
            lastViewedLessonData={getLastViewedLessonData()}
            onSelectLastViewed={handleSelectSearchResult}
            getDownloadStatus={getDownloadStatus}
            onAddDownload={addDownload}
            onRemoveDownload={removeDownload}
          />
        );
      case 'CHAPTER_BROWSE':
        return selectedDiscipline ? (
            <ChapterBrowser 
                discipline={selectedDiscipline}
                onSelectChapter={handleSelectChapter}
                onGoToLabs={() => {
                  setSelectedLab(null);
                  setViewMode('VIRTUAL_LAB');
                }}
            />
        ) : null;
      case 'LESSON_BROWSE':
        return selectedChapter ? (
            <LessonBrowser
                chapter={selectedChapter}
                onSelectModule={handleSelectModule}
            />
        ) : null;
      case 'VIRTUAL_LAB':
        return selectedDiscipline ? (
            <VirtualLab
                discipline={selectedDiscipline}
                selectedLab={selectedLab}
                onSelectLab={setSelectedLab}
                onGoBack={() => {
                    if (selectedLab) {
                        setSelectedLab(null);
                    } else {
                        setViewMode('CHAPTER_BROWSE');
                    }
                }}
            />
        ) : null;
      case 'CERTIFICATE':
        return selectedDiscipline ? (
          <Certificate disciplineName={selectedDiscipline.name} onGoHome={handleGoHome} />
        ) : null;
      case 'TOOLS_UNIT_CONVERTER':
        return <UnitConverter onGoHome={handleGoHome} />;
      case 'TOOLS_LOAD_CALCULATOR':
        return <LoadCalculator onGoHome={handleGoHome} />;
      case 'LEARN':
        return (
          <div className="flex flex-1 overflow-hidden">
            <Sidebar 
              levels={disciplineForView?.levels || []}
              selectedLesson={selectedLesson}
              onSelectLesson={handleSelectLesson}
              isOpen={isSidebarOpen}
              completedLessons={completedLessons}
              isMobile={isMobile}
              onClose={() => setSidebarOpen(false)}
              unlockedLevels={unlockedLevels}
              disciplineId={selectedDiscipline?.id || ''}
            />
            <main className="flex-1 overflow-y-auto transition-all duration-300 ease-in-out bg-base-100">
              {selectedDiscipline && selectedModule ? (
                <LessonReader 
                  key={selectedModule.id} 
                  module={selectedModule}
                  disciplineName={selectedDiscipline?.name || ''}
                  completedLessons={completedLessons}
                  onCompleteModule={handleCompleteModule}
                  onTermClick={handleTermClick}
                  onGoToLab={handleGoToLab}
                  onNavigateToNext={handleNavigateToNext}
                  nextNavigationTarget={nextNavigationTarget}
                  isLastModuleInDiscipline={isLastModuleInDiscipline}
                />
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <h2 className="text-2xl font-bold mb-4">Ku Soo Dhawow SAHAN Engineering</h2>
                  <p>Fadlan dooro qayb injineernimo si aad u bilowdo safarkaaga waxbarasho.</p>
                </div>
              )}
            </main>
            <AiTutor 
                isOpen={isTutorOpen} 
                selectedLesson={selectedLesson} 
                isMobile={isMobile}
                onClose={() => setTutorOpen(false)}
                initialPrompt={tutorInitialPrompt}
                onPromptHandled={() => setTutorInitialPrompt(null)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  if (!isLoaded || authIsLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="flex flex-col h-screen font-sans bg-base-200 text-base-content overflow-hidden">
      <Header 
        onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
        onToggleTutor={() => setTutorOpen(!isTutorOpen)}
        disciplines={disciplines}
        onSelectDiscipline={handleStartLearning}
        onSelectSearchResult={handleSelectSearchResult}
        onGoHome={handleGoHome}
        onSelectTool={(tool) => setViewMode(tool as ViewMode)}
        user={user}
        onOpenAuthModal={() => setAuthModalOpen(true)}
      />
      {renderContent()}

      {isCompletionModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setCompletionModalOpen(false)}>
            <div className="bg-base-100 rounded-lg shadow-2xl p-8 max-w-lg w-full text-center relative" onClick={e => e.stopPropagation()}>
                <button onClick={() => setCompletionModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <XIcon className="h-6 w-6" />
                </button>
                <AcademicCapIcon className="h-16 w-16 mx-auto text-brand-accent mb-4" />
                <h2 className="text-2xl font-bold text-brand-primary mb-2">Hambalyo!</h2>
                <p className="text-gray-600 mb-6">Waxaad si guul leh u dhammaysay qaybtan. Maxaad jeclaan lahayd inaad xigto?</p>
                <div className="space-y-3">
                    <button
                        onClick={handleGoToNextModule}
                        className="w-full text-left flex items-center justify-between p-4 bg-base-200 hover:bg-base-300 rounded-lg transition-colors"
                    >
                        <span className="font-semibold text-base-content">Dooro Qayb Kale</span>
                        <BookOpenIcon className="h-6 w-6 text-brand-secondary" />
                    </button>
                    <button
                        onClick={handleGoToChapters}
                        className="w-full text-left flex items-center justify-between p-4 bg-base-200 hover:bg-base-300 rounded-lg transition-colors"
                    >
                        <span className="font-semibold text-base-content">Dib ugu laabo Cutubyada</span>
                        <BuildingIcon className="h-6 w-6 text-brand-secondary" />
                    </button>
                    <button
                        onClick={handleGoHomeFromModal}
                        className="w-full text-left flex items-center justify-between p-4 bg-base-200 hover:bg-base-300 rounded-lg transition-colors"
                    >
                        <span className="font-semibold text-base-content">Tag Bogga Hore</span>
                        <ArrowRightIcon className="h-6 w-6 text-brand-secondary" />
                    </button>
                </div>
            </div>
        </div>
      )}
       <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};

export default App;