import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AuraCalculator from './BrainrotDashboard/AuraCalculator';
import HallOfFame from './BrainrotDashboard/HallOfFame';
import BrainrotDictionary from './BrainrotDashboard/BrainrotDictionary';
import FarmingTechniques from './BrainrotDashboard/FarmingTechniques';
import TheArena from './BrainrotDashboard/TheArena';

const BrainrotDashboard = ({ onNavigateToZen }) => {
    const [view, setView] = useState('CALCULATOR'); // CALCULATOR, FAME, DICTIONARY, FARMING, ARENA

    const NAV_ITEMS = [
        { id: 'CALCULATOR', label: 'AURA CALCULATOR' },
        { id: 'FAME', label: 'HALL OF FAME' },
        { id: 'DICTIONARY', label: 'THE DICTIONARY' },
        { id: 'FARMING', label: 'FARMING TECHNIQUES' },
        { id: 'ARENA', label: 'THE ARENA' },
    ];

    return (
        <div className="w-full min-h-screen bg-[#050505] text-white font-mono selection:bg-[#ff00ff] selection:text-white overflow-x-hidden flex flex-col">
            {/* V3 NAVIGATION BAR */}
            <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16 overflow-x-auto no-scrollbar gap-4">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setView(item.id)}
                                className={`whitespace-nowrap px-4 py-2 text-sm font-bold tracking-wider transition-all duration-300 relative group ${view === item.id ? 'text-[#ff00ff]' : 'text-white/60 hover:text-white'
                                    }`}
                            >
                                {item.label}
                                {view === item.id && (
                                    <motion.div
                                        layoutId="nav-underline"
                                        className="absolute bottom-0 left-0 w-full h-0.5 bg-[#ff00ff] shadow-[0_0_10px_#ff00ff]"
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={view}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="w-full"
                    >
                        {view === 'CALCULATOR' && <AuraCalculator />}
                        {view === 'FAME' && <HallOfFame />}
                        {view === 'DICTIONARY' && <BrainrotDictionary />}
                        {view === 'FARMING' && <FarmingTechniques />}
                        {view === 'ARENA' && <TheArena />}
                    </motion.div>
                </AnimatePresence>

                {/* BRAINROT FOOTER */}
                <footer className="mt-20 border-t border-white/10 pt-8 pb-4 flex justify-center gap-8">
                    <button
                        onClick={onNavigateToZen}
                        className="font-mono text-xs font-bold text-white/40 hover:text-[#00ff9d] transition-colors uppercase tracking-widest group relative"
                    >
                        Go to Zen Mode
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00ff9d] transition-all duration-300 group-hover:w-full"></span>
                    </button>
                    <button
                        onClick={() => window.open('https://www.instagram.com/relativexmemes', '_blank')}
                        className="font-mono text-xs font-bold text-white/40 hover:text-[#00ff9d] transition-colors uppercase tracking-widest group relative"
                    >
                        Instagram
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00ff9d] transition-all duration-300 group-hover:w-full"></span>
                    </button>
                    <button
                        onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
                        className="font-mono text-xs font-bold text-white/40 hover:text-[#00ff9d] transition-colors uppercase tracking-widest group relative"
                    >
                        Contact
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00ff9d] transition-all duration-300 group-hover:w-full"></span>
                    </button>
                </footer>
            </main>
        </div>
    );
};

export default BrainrotDashboard;
