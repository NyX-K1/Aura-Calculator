import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SpamToRizz = () => {
    const [clicks, setClicks] = useState(0);
    const [cps, setCps] = useState(0);
    const [slang, setSlang] = useState('');
    const [result, setResult] = useState(null); // 'SKIBIDI AURA' | 'NPC VIBES' | 'MID RIZZ'
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const clickTimestamps = useRef([]);

    const handleSpam = () => {
        const now = Date.now();
        clickTimestamps.current.push(now);
        setClicks(prev => prev + 1);

        // Vibration/Shake effect trigger here if needed
    };

    // CPS Calculator Loop
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            // Keep only clicks from last 1 second
            clickTimestamps.current = clickTimestamps.current.filter(t => now - t < 1000);
            setCps(clickTimestamps.current.length);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    const analyzeAura = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            let stalwart = { name: 'MID RIZZ', img: 'https://media1.tenor.com/m/t7r4WqA_bTUAAAAd/saitama-ok.gif' }; // Default

            const upperSlang = slang.toUpperCase();

            // Calculate Base Aura
            let finalAura = cps * 1000;
            if (upperSlang.includes('FANUM') || upperSlang.includes('SKIBIDI')) {
                finalAura += 2000;
            }

            // TIER 1: MADARA (9000+)
            if (finalAura > 9000) {
                stalwart = {
                    name: 'MADARA UCHIHA',
                    img: 'https://media1.tenor.com/m/K7vP9uYC81AAAAAd/madara-uchiha-naruto.gif',
                    fortune: 'YOU DO NOT EXIST TO MAKE SENSE TO NPCS.'
                };
            }
            // TIER 2: AIZEN (8000-9000)
            else if (finalAura > 8000) {
                stalwart = {
                    name: 'AIZEN SOSUKE',
                    img: 'https://media1.tenor.com/m/C3c2f9d_iQAAAAAd/aizen-bleach.gif',
                    fortune: 'ALL ACCORDING TO PLAN.'
                };
            }
            // TIER 3: GIGACHAD (Mewing Focused)
            else if (upperSlang.includes('MEWING') || (cps > 5 && cps <= 8)) {
                stalwart = {
                    name: 'GIGACHAD',
                    img: 'https://media1.tenor.com/m/x8v1e5Dk3bYAAAAd/gigachad-chad.gif',
                    fortune: 'SILENCE IS THE LOUDEST ROAR.'
                };
            }
            // TIER 4: L (NPC Status)
            else if (cps < 3) {
                stalwart = {
                    name: 'L (DEATH NOTE)',
                    img: 'https://media1.tenor.com/m/oV3nQxXyUxEAAAAd/l-death-note.gif',
                    fortune: 'YOUR DEDUCTION SKILLS ARE... LACKING.'
                };
            }

            setResult(stalwart);
            setIsAnalyzing(false);
        }, 1500); // Fake Gemini Delay
    };

    if (result) {
        return (
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex flex-col items-center justify-center p-8 bg-black/95 border-4 border-[#00ff00] rounded-xl z-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform-gpu shadow-[0_0_100px_#00ff00] w-[500px] max-w-full text-center"
            >
                <h2 className="text-[#00ff00] font-mono text-xl mb-2 animate-pulse">STALWART REVEALED</h2>
                <img src={result.img} alt={result.name} className="w-64 h-64 object-cover border-2 border-white mb-4 rounded-lg" />

                <h1 className="text-4xl font-black text-white mb-4 glitch-text leading-tight">{result.name}</h1>
                <p className="text-[#ff00ff] font-bold font-mono mb-8 text-lg">"{result.fortune}"</p>

                <button
                    onClick={() => { setResult(null); setClicks(0); setSlang(''); }}
                    className="px-8 py-4 bg-[#39FF14] text-black font-black text-xl hover:bg-white hover:scale-105 transition-all w-full"
                >
                    AGANE
                </button>
            </motion.div>
        );
    }

    return (
        <div className="flex flex-col items-center gap-8 w-full max-w-md pointer-events-auto z-20 relative">
            {/* INPUT - Minimalist */}
            <div className="w-full">
                <input
                    type="text"
                    value={slang}
                    onChange={(e) => setSlang(e.target.value)}
                    placeholder="ENTER INTENT //"
                    className="w-full bg-black border-b-2 border-white/20 p-2 text-white font-mono text-lg focus:outline-none focus:border-white transition-colors text-center placeholder:text-white/20"
                />
            </div>

            {/* MOG BUTTON */}
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSpam}
                className="relative w-48 h-48 rounded-full bg-black flex items-center justify-center overflow-hidden border-[1px] border-white/30 hover:border-white transition-colors group"
            >
                {/* Click Ripple / Flash */}
                <AnimatePresence>
                    {clickTimestamps.current.length > 0 && (
                        <motion.div
                            key={clicks}
                            initial={{ opacity: 1, scale: 0.5 }}
                            animate={{ opacity: 0, scale: 1.5 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 bg-white rounded-full pointer-events-none"
                        />
                    )}
                </AnimatePresence>

                <span className="font-mono font-bold text-2xl text-white tracking-[0.2em] group-hover:tracking-[0.3em] transition-all">
                    [MOG]
                </span>
            </motion.button>

            {/* MILITARY METRICS */}
            <div className="absolute bottom-0 left-0 -translate-x-full pr-8 flex flex-col items-end gap-1 opacity-50">
                <span className="font-mono text-xs text-white">CPS_READOUT</span>
                <span className="font-mono text-4xl font-bold text-white leading-none">
                    {cps.toString().padStart(2, '0')}
                </span>
            </div>

            <div className="absolute bottom-0 right-0 translate-x-full pl-8 flex flex-col items-start gap-1 opacity-50">
                <span className="font-mono text-xs text-white">TOTAL_CLICKS</span>
                <span className="font-mono text-2xl font-bold text-white leading-none">
                    {clicks.toString().padStart(3, '0')}
                </span>
            </div>

            {/* SUBMIT */}
            <button
                onClick={analyzeAura}
                disabled={isAnalyzing || clicks === 0}
                className="mt-8 text-white/50 font-mono text-sm hover:text-white hover:tracking-widest transition-all uppercase"
            >
                {isAnalyzing ? 'CALCULATING DOMINANCE...' : '[ INITIATE JUDGMENT ]'}
            </button>
        </div>
    );
};

export default SpamToRizz;
