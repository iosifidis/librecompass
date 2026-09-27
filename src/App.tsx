import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowLeft, 
  ExternalLink, 
  Compass, 
  Search, 
  Sparkles, 
  RotateCcw,
  ArrowRight,
  Sun,
  Moon
} from 'lucide-react';

// 1. Logo του LibreHub / LibreCompass
import logo from './librehub_logo.png';

// 2. Import του Master Index
import categories from './data.json';

// 3. Προ-φόρτωση των JSON (Eager Loading)
import data_daily from './data_daily.json';
import data_business from './data_business.json';
import data_edu from './data_edu.json';
import data_gov from './data_gov.json';

// Map για να συνδέσουμε το "file" του data.json με τα πραγματικά imports
const dataMap: Record<string, any> = {
  "data_daily.json": data_daily,
  "data_business.json": data_business,
  "data_edu.json": data_edu,
  "data_gov.json": data_gov
};

export default function App() {
  const [activeData, setActiveData] = useState<any[] | null>(null);
  const [topLevelIndex, setTopLevelIndex] = useState(0);
  const [subPath, setSubPath] = useState<number[]>([]);
  const [history, setHistory] = useState<{ topIndex: number; subPath: number[] }[]>([]);

  // 4. State για το Θέμα (Light / Dark)
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark' || stored === 'light') return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Φόρτωση κατηγορίας
  const loadCategory = (fileName: string) => {
    const data = dataMap[fileName];
    if (data) {
      setActiveData(data);
      setTopLevelIndex(0);
      setSubPath([]);
      setHistory([]);
    } else {
      alert(`Σφάλμα: Δεν βρέθηκαν δεδομένα για το ${fileName}`);
    }
  };

  const currentTopic = activeData
    ? (() => {
      let topic = activeData[topLevelIndex];
      for (const index of subPath) {
        if (topic.subcategories && topic.subcategories[index]) {
          topic = topic.subcategories[index];
        }
      }
      return topic;
    })()
    : categories[topLevelIndex];

  // Χειρισμός του "Επόμενο"
  const handleNext = () => {
    if (!activeData) {
      setTopLevelIndex((prev) => (prev + 1) % categories.length);
      return;
    }

    if (subPath.length === 0) {
      setTopLevelIndex((prev) => (prev + 1) % activeData.length);
    } else {
      let parent = activeData[topLevelIndex];
      for (let i = 0; i < subPath.length - 1; i++) {
        parent = parent.subcategories[subPath[i]];
      }

      const currentIndexInLevel = subPath[subPath.length - 1];
      const nextIndex = (currentIndexInLevel + 1) % parent.subcategories.length;

      const newPath = [...subPath];
      newPath[newPath.length - 1] = nextIndex;
      setSubPath(newPath);
    }
  };

  // Χειρισμός του "Ενδιαφέρομαι"
  const handleYes = () => {
    if (!activeData) {
      loadCategory(categories[topLevelIndex].file);
    } else if (currentTopic.subcategories && currentTopic.subcategories.length > 0) {
      setHistory([...history, { topIndex: topLevelIndex, subPath: [...subPath] }]);
      setSubPath([...subPath, 0]);
    } else if (currentTopic.url) {
      window.open(currentTopic.url, '_blank');
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const lastEntry = history[history.length - 1];
      setTopLevelIndex(lastEntry.topIndex);
      setSubPath(lastEntry.subPath);
      setHistory(history.slice(0, -1));
    } else {
      setActiveData(null);
      setTopLevelIndex(0);
      setSubPath([]);
    }
  };

  const handleBackToStart = () => {
    setActiveData(null);
    setTopLevelIndex(0);
    setSubPath([]);
    setHistory([]);
  };

  const currentStep = !activeData 
    ? 1 
    : (currentTopic.subcategories ? 2 : 3);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#030712] text-gray-900 dark:text-gray-100 flex flex-col font-sans selection:bg-green-600 selection:text-white transition-colors duration-200">

      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-200/80 dark:border-gray-800/80 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo & Brand */}
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); handleBackToStart(); }} 
              className="flex items-center gap-3 group transition-opacity hover:opacity-90"
            >
              <img
                src={logo}
                alt="LibreHub Logo"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-none">
                    Libre<span className="text-green-600 dark:text-green-500">Compass</span>
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/25">
                    Guide
                  </span>
                </div>
                <span className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                  Οδηγός Ανοικτού Λογισμικού
                </span>
              </div>
            </a>

            {/* Navigation links, Sister site button & Theme toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              <a
                href="https://librehub.netlify.app/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 active:bg-green-800 rounded-lg transition-all shadow-sm hover:shadow-green-900/30 group"
                title="Αναζητήστε συγκεκριμένο ανοικτό λογισμικό στο LibreHub"
              >
                <Search className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                <span className="hidden sm:inline">Μηχανή Αναζήτησης</span>
                <span>LibreHub</span>
                <ExternalLink className="w-3 h-3 opacity-60 ml-0.5" />
              </a>

              <a
                href="https://iosifidis.github.io/librehub.gr/"
                target="_blank"
                rel="noreferrer"
                className="hidden md:flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                librehub.gr
              </a>

              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Εναλλαγή θέματος"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 cursor-pointer border border-gray-200 dark:border-gray-800"
                title={theme === 'dark' ? 'Αλλαγή σε φωτεινό θέμα' : 'Αλλαγή σε σκοτεινό θέμα'}
              >
                {theme === 'dark' ? (
                  <Sun className="h-4 w-4 text-amber-400 transition-transform hover:rotate-45" />
                ) : (
                  <Moon className="h-4 w-4 text-gray-700 transition-transform hover:-rotate-12" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 text-center my-auto">
        <div className="max-w-3xl w-full space-y-6 sm:space-y-8 my-6">

          {/* Header & Badges */}
          <header className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-50 dark:bg-green-950/70 border border-green-200 dark:border-green-500/30 text-green-700 dark:text-green-400 text-xs font-semibold shadow-inner">
              <Compass className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
              <span>LibreCompass • Ανακάλυψε τον κόσμο του Ανοιχτού Λογισμικού</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-tight">
              Βρες το κατάλληλο εργαλείο <span className="text-green-600 dark:text-green-500">σε 3 βήματα</span>
            </h1>

            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
              {activeData
                ? "Περιηγηθείτε στις προτάσεις μας ή συνεχίστε την εξερεύνηση για να βρείτε την ιδανική λύση."
                : "Επιλέξτε τον τομέα που σας ενδιαφέρει για να ξεκινήσετε την καθοδηγούμενη ανακάλυψη."}
            </p>

            {/* Link to search engine */}
            <div className="pt-1">
              <a
                href="https://librehub.netlify.app/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/30 hover:bg-green-100 dark:hover:bg-green-950/60 border border-green-200 dark:border-green-800/40 px-3 py-1.5 rounded-lg transition-colors"
              >
                <Search className="w-3 h-3" />
                <span>Ψάχνετε συγκεκριμένο πρόγραμμα με αναζήτηση; Μεταβείτε στο LibreHub</span>
                <ArrowRight className="w-3 h-3 ml-0.5 opacity-70" />
              </a>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-2 pt-2 text-xs font-medium text-gray-500 dark:text-gray-400">
              <span className={`px-2.5 py-1 rounded-md transition-all ${currentStep === 1 ? 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400 border border-green-300 dark:border-green-500/40 font-semibold shadow-xs' : 'bg-gray-200/60 dark:bg-gray-900/60 text-gray-500'}`}>
                1. Τομέας Χρήσης
              </span>
              <span className="text-gray-400 dark:text-gray-600">→</span>
              <span className={`px-2.5 py-1 rounded-md transition-all ${currentStep === 2 ? 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400 border border-green-300 dark:border-green-500/40 font-semibold shadow-xs' : 'bg-gray-200/60 dark:bg-gray-900/60 text-gray-500'}`}>
                2. Κατηγορία Εργαλείου
              </span>
              <span className="text-gray-400 dark:text-gray-600">→</span>
              <span className={`px-2.5 py-1 rounded-md transition-all ${currentStep === 3 ? 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400 border border-green-300 dark:border-green-500/40 font-semibold shadow-xs' : 'bg-gray-200/60 dark:bg-gray-900/60 text-gray-500'}`}>
                3. Προτεινόμενο Λογισμικό
              </span>
            </div>
          </header>

          {/* Interactive Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTopic.id + (activeData ? 'active' : 'idle')}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gradient-to-b dark:from-gray-900/95 dark:to-gray-950/95 p-8 sm:p-12 rounded-2xl shadow-xl dark:shadow-2xl text-gray-900 dark:text-white border border-gray-200/90 dark:border-green-500/30 relative overflow-hidden backdrop-blur-md transition-colors"
            >
              {/* Background ambient accents */}
              <div className="pointer-events-none absolute -top-24 -right-24 w-60 h-60 bg-green-500/5 dark:bg-green-500/10 rounded-full blur-3xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-24 w-60 h-60 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl" />

              {activeData && !currentTopic.subcategories && (
                <div className="absolute top-0 right-0 bg-green-600 text-white px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-wider rounded-bl-xl shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Πρόταση Libre</span>
                </div>
              )}

              <h2 className="text-3xl sm:text-5xl font-black mb-5 leading-tight text-green-600 dark:text-green-400 tracking-tight">
                {currentTopic.title}
              </h2>

              {currentTopic.commercial_equivalent && (
                <div className="inline-flex items-center gap-2 bg-amber-50 dark:bg-amber-500/10 text-amber-900 dark:text-amber-300 px-4 py-2 rounded-xl font-semibold text-xs sm:text-sm mb-6 border border-amber-200 dark:border-amber-500/25 shadow-sm">
                  <Sparkles className="w-4 h-4 text-amber-500 dark:text-amber-400 flex-shrink-0" />
                  <span>ΑΝΤΙΚΑΘΙΣΤΑ: <strong className="text-gray-900 dark:text-white font-bold">{currentTopic.commercial_equivalent}</strong></span>
                </div>
              )}

              <p className="text-base sm:text-xl font-normal leading-relaxed text-gray-700 dark:text-gray-200 opacity-95 max-w-2xl mx-auto">
                {currentTopic.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-2">
            <button
              onClick={handleYes}
              className="bg-green-600 hover:bg-green-700 dark:hover:bg-green-500 active:bg-green-800 text-white font-bold py-3.5 px-8 rounded-xl flex items-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-green-600/20 dark:shadow-green-900/30 cursor-pointer text-sm sm:text-base"
            >
              {activeData && !currentTopic.subcategories && currentTopic.url ? (
                <>
                  <ExternalLink className="w-5 h-5" />
                  <span>Επίσκεψη στην ιστοσελίδα</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>{activeData ? (currentTopic.subcategories ? "Πες μου περισσότερα" : "Επίσκεψη στην ιστοσελίδα") : "Ενδιαφέρομαι"}</span>
                </>
              )}
            </button>

            <button
              onClick={handleNext}
              className="bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-850 text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-700/80 font-semibold py-3.5 px-8 rounded-xl flex items-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer text-sm sm:text-base shadow-sm"
            >
              <XCircle className="w-5 h-5 text-red-500 dark:text-red-400" />
              <span>Δεν με ενδιαφέρει, επόμενο</span>
            </button>

            {(activeData || history.length > 0) && (
              <button
                onClick={handleBack}
                className="bg-transparent hover:bg-gray-100 dark:bg-gray-950 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 border border-gray-300 dark:border-gray-800 font-medium py-3.5 px-6 rounded-xl flex items-center gap-2 transition-all cursor-pointer text-sm sm:text-base"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Έκανα λάθος. Πάμε πίσω</span>
              </button>
            )}
          </div>

          {(activeData || history.length > 0) && (
            <div className="pt-1">
              <button
                onClick={handleBackToStart}
                className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Επιστροφή στην αρχική οθόνη</span>
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 border-t border-gray-200 dark:border-gray-900 text-center text-gray-500 dark:text-gray-400 text-xs bg-white/80 dark:bg-gray-950/80 transition-colors">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src={logo} alt="LibreCompass" className="h-5 w-auto opacity-70" />
            <span className="font-bold text-gray-800 dark:text-gray-300">LibreCompass</span>
            <span>•</span>
            <span>Μέρος του οικοσυστήματος <a href="https://librehub.netlify.app/" target="_blank" rel="noreferrer" className="text-green-600 dark:text-green-400 hover:underline">LibreHub</a></span>
          </div>

          <div className="flex items-center gap-5 text-xs text-gray-500 dark:text-gray-400">
            <a href="https://librehub.netlify.app/" target="_blank" rel="noreferrer" className="hover:text-green-600 dark:hover:text-green-400 transition-colors flex items-center gap-1">
              <Search className="w-3.5 h-3.5" /> LibreHub Search
            </a>
            <a href="https://iosifidis.github.io/librehub.gr/" target="_blank" rel="noreferrer" className="hover:text-green-600 dark:hover:text-green-400 transition-colors">
              librehub.gr
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}