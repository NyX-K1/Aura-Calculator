import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ZenSide from './components/ZenSide';
import BrainrotSide from './components/BrainrotSide';
import DarkLanding from './components/DarkLanding';
import ZenGarden from './components/ZenGarden';
import BrainrotDashboard from './components/BrainrotDashboard';
import GoldDustOverlay from './effects/GoldDustOverlay';
import GlitchOverlay from './effects/GlitchOverlay';

const App = () => {
  const [view, setView] = useState('split');
  const [hoveredSide, setHoveredSide] = useState(null); // 'left' | 'right' | null

  // Transition States
  const [isTransitioning, setIsTransitioning] = useState(false); // Gold Dust (Zen)
  const [isGlitching, setIsGlitching] = useState(false); // Glitch (Brainrot)

  const [landingKey, setLandingKey] = useState(0); // Force remount on reset

  // Helper check: Is the view one that requires global scrolling?
  // 'landing' -> DarkLanding (Needs global scroll for Lenis to work optimally)
  // 'split' -> Needs hidden overflow (split screen)
  // 'garden' -> Static or internal scroll? ZenGarden usually internal or static.
  // 'brainrot' -> BrainrotDashboard (V3 needs global scroll)

  const isScrollableView = view === 'landing' || view === 'brainrot';

  const handleZenNavigation = () => {
    setIsTransitioning(true); // Trigger Overlay

    // Wait 3 seconds before actually changing view
    setTimeout(() => {
      setView('landing'); // Switch to Dark Landing

      // Slight delay to allow overlay to fade out smoothly AFTER view switch
      setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);
    }, 3000);
  };

  const handleBrainrotNavigation = () => {
    setIsGlitching(true);
    // Faster, more chaotic transition (3s total glitch, switch mid-way)
    setTimeout(() => {
      setView('brainrot');
      setTimeout(() => setIsGlitching(false), 1000);
    }, 2000);
  };

  return (
    <div className={`relative w-full h-screen bg-black ${isScrollableView ? 'overflow-y-auto no-scrollbar' : 'overflow-hidden'}`}>
      <GoldDustOverlay isVisible={isTransitioning} />
      <GlitchOverlay isVisible={isGlitching} />

      <AnimatePresence>

        {/* SPLIT VIEW (Initial) */}
        {view === 'split' && (
          <motion.div
            key="split"
            className="flex w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
          >
            {/* Brainrot Side (Left) */}
            <motion.div
              className="h-full relative overflow-hidden"
              initial={{ width: '50%' }}
              animate={{
                width: hoveredSide === 'left' ? '70%' : hoveredSide === 'right' ? '30%' : '50%'
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onMouseEnter={() => setHoveredSide('left')}
              onMouseLeave={() => setHoveredSide(null)}
            >
              <BrainrotSide onNavigate={handleBrainrotNavigation} />
            </motion.div>

            {/* Zen Side (Right) */}
            <motion.div
              className="h-full relative overflow-hidden"
              initial={{ width: '50%' }}
              animate={{
                width: hoveredSide === 'right' ? '70%' : hoveredSide === 'left' ? '30%' : '50%'
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onMouseEnter={() => setHoveredSide('right')}
              onMouseLeave={() => setHoveredSide(null)}
            >
              <ZenSide onNavigate={handleZenNavigation} />
            </motion.div>

            {/* Divider */}
            <motion.div
              className="absolute top-0 bottom-0 w-1 bg-yellow-400 z-50 shadow-[0_0_20px_#FFD700]"
              initial={{ left: '50%' }}
              animate={{
                left: hoveredSide === 'left' ? '70%' : hoveredSide === 'right' ? '30%' : '50%'
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </motion.div>
        )}

        {/* DARK LANDING (Intermediate Pre-Garden Page) */}
        {view === 'landing' && (
          <motion.div
            key={`landing-${landingKey}`}
            className="w-full min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 1.5, delay: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }} // Smoother exit
          >
            <DarkLanding
              onEnter={() => setView('garden')}
              onResetSession={() => setLandingKey(prev => prev + 1)}
              onNavigateToBrainrot={handleBrainrotNavigation}
            />
          </motion.div>
        )}

        {/* ZEN GARDEN (Final Destination) */}
        {view === 'garden' && (
          <motion.div
            key="garden"
            className="w-full h-full top-0 left-0 absolute bg-white"
            style={{ zIndex: 10000 }} // Ensure it sits on top of DarkLanding (z-9999)
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 2, ease: "easeInOut" } }} // Smoother enter
            exit={{ opacity: 0 }}
          >
            <ZenGarden />
          </motion.div>
        )}

        {/* BRAINROT DASHBOARD */}
        {view === 'brainrot' && (
          <motion.div
            key="brainrot"
            className="w-full min-h-screen relative z-[9999]" // Changed from absolute h-full to relative min-h-screen
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <BrainrotDashboard onNavigateToZen={handleZenNavigation} />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default App;
