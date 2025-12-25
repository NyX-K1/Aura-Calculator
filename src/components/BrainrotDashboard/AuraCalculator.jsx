import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { calculateSlangScore } from '../../utils/gemini';

// THE 25 QUESTIONS DATA
const QUESTION_BANK = [
    { id: 1, text: "Does your jawline define your destiny?", yes: 1000, no: 15000, rationale: "True Aura is mental, not just physical." },
    { id: 2, text: "Do you look back at the explosion?", yes: -10000, no: 25000, rationale: "Cool guys don't look at explosions." },
    { id: 3, text: "Is it a \"Fanum Tax\" if you stole it first?", yes: 50000, no: -20000, rationale: "Strategic theft is Alpha-tier logic." },
    { id: 4, text: "Do you \"Mew\" during the college viva?", yes: 30000, no: -15000, rationale: "Silence is power in the face of authority." },
    { id: 5, text: "Is \"Skibidi\" a valid programming language?", yes: -50000, no: 10000, rationale: "Real Sigmas use C++ or Python." },
    { id: 6, text: "If you knew it was a trap, is it still a trap?", yes: 20000, no: -40000, rationale: "Knowledge is the ultimate Plot Armor." },
    { id: 7, text: "Do you let the NPC finish their life story?", yes: -35000, no: 45000, rationale: "Time is Aura; don't waste it on filler." },
    { id: 8, text: "Is the \"Ohio\" energy within you?", yes: 100000, no: -10000, rationale: "Embracing the chaos creates high volatility." },
    { id: 9, text: "Do you explain your plan to the villain?", yes: -90000, no: 55000, rationale: "Aizen never explained until it was over." },
    { id: 10, text: "Does \"Rizz\" require actual talking?", yes: -25000, no: 60000, rationale: "Unspoken Rizz is the highest tier." },
    { id: 11, text: "Would you win?", yes: 75000, no: -75000, rationale: "Confidence is 90% of the battle." },
    { id: 12, text: "Is a \"Pookie\" allowed in the Sigma Den?", yes: -15000, no: 20000, rationale: "The grindset requires isolation." },
    { id: 13, text: "Do you \"Edge\" your productivity?", yes: 40000, no: -10000, rationale: "Mastering the brink of burnout." },
    { id: 14, text: "Is your shadow more famous than you?", yes: 35000, no: -15000, rationale: "Intimidation through presence." },
    { id: 15, text: "Do you respect the \"Grind\" or the \"Result\"?", yes: 55000, no: -30000, rationale: "The process farms the most Aura." },
    { id: 16, text: "Is \"Looksmaxxing\" a full-time job?", yes: -20000, no: 40000, rationale: "Effort should be invisible to others." },
    { id: 17, text: "Can a King farm Aura while sleeping?", yes: 15000, no: -5000, rationale: "Passive dominance is a real stat." },
    { id: 18, text: "Do you \"Yeet\" low-Aura friendships?", yes: 30000, no: -25000, rationale: "Protect your frequency at all costs." },
    { id: 19, text: "Is it \"Over\" because the TikTok said so?", yes: -100000, no: 80000, rationale: "You define when it's over, not the feed." },
    { id: 20, text: "Do you Mew while coding in WSL?", yes: 45000, no: -10000, rationale: "Maximum efficiency in the dev environment." },
    { id: 21, text: "Is \"Delulu\" the only \"Solulu\"?", yes: 50000, no: -35000, rationale: "Manifestation is a high-aura technique." },
    { id: 22, text: "Do you use \"Light Mode\" on any device?", yes: -250000, no: 150000, rationale: "Light mode is for NPCs; Dark mode is for Sigmas." },
    { id: 23, text: "Is Plot Armor earned through pain?", yes: 65000, no: -20000, rationale: "Suffering builds the \"Main Character\" stat." },
    { id: 24, text: "Do you \"Aura Farm\" in your dreams?", yes: 25000, no: -15000, rationale: "The subconscious never stops the grind." },
    { id: 25, text: "Are you the one who knocks?", yes: 95000, no: -45000, rationale: "Be the danger, not the victim." }
];

let hasPlayedBgm = false;

const AuraCalculator = () => {
    // State
    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [answers, setAnswers] = useState({}); // { qId: 'YES' | 'NO' }
    const [slang, setSlang] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [clicks, setClicks] = useState(0);
    const [cps, setCps] = useState(0);
    const [auraScore, setAuraScore] = useState(null);
    const [loading, setLoading] = useState(false);

    const clickTimestamps = useRef([]);

    // Logic: Select 3 Random Questions on Mount
    useEffect(() => {
        const shuffled = [...QUESTION_BANK].sort(() => 0.5 - Math.random());
        setCurrentQuestions(shuffled.slice(0, 3));

        // Akatsuki BGM - Play only once per session
        if (!hasPlayedBgm) {
            const bgm = new Audio('/sounds/akatsuki-theme.mp3');
            bgm.volume = 0.4;
            bgm.loop = false;
            bgm.play()
                .then(() => {
                    hasPlayedBgm = true;
                })
                .catch(e => console.log('BGM play failed:', e));

            return () => {
                bgm.pause();
                bgm.currentTime = 0;
            };
        }
    }, []);

    // Logic: Physics Conversion Display
    const lightYears = height ? (parseFloat(height) * 1.057e-16).toExponential(4) : '0';
    const megaNewtons = weight ? (parseFloat(weight) * 0.0098).toFixed(6) : '0';

    // Logic: CPS & Clicks
    const handleMog = () => {
        const now = Date.now();
        clickTimestamps.current.push(now);
        setClicks(prev => prev + 1);

        // Visual Shake
        const btn = document.getElementById('mog-btn');
        if (btn) {
            btn.style.transform = `translate(${Math.random() * 6 - 3}px, ${Math.random() * 6 - 3}px) rotate(${Math.random() * 4 - 2}deg)`;
            setTimeout(() => btn.style.transform = 'none', 50);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            clickTimestamps.current = clickTimestamps.current.filter(t => now - t < 1000);
            setCps(clickTimestamps.current.length);
        }, 100);
        return () => clearInterval(interval);
    }, []);

    // MAIN CALCULATION
    const calculateTotalAura = async () => {
        setLoading(true);

        // EASTER EGG: 69 Ly & 69 MN (Hidden)
        // Height needed: ~6.528e17 meters
        // Weight needed: ~7040.81 kg
        const lyVal = parseFloat(height) * 1.057e-16;
        const mnVal = parseFloat(weight) * 0.0098;

        if (Math.round(lyVal) === 69 && Math.round(mnVal) === 69) {
            await new Promise(resolve => setTimeout(resolve, 2500)); // Suspense
            setAuraScore(Infinity);
            setLoading(false);
            return;
        }

        let score = 0;

        // 1. Question Scores
        currentQuestions.forEach(q => {
            const ans = answers[q.id];
            if (ans === 'YES') score += q.yes;
            if (ans === 'NO') score += q.no;
        });

        // 2. Click Stats
        score += (clicks * 100);
        score += (cps * 5000); // High reward for high CPS burst

        // 3. Gemini Slang Scoring
        if (slang.trim()) {
            const slangScore = await calculateSlangScore(slang);
            score += slangScore;
        }

        setAuraScore(score);
        setLoading(false);
    };

    const handleScreenshot = async () => {
        const element = document.getElementById('result-card');
        if (element) {
            // Need to ensure background is captured well
            const canvas = await html2canvas(element, {
                backgroundColor: '#000000',
                scale: 2,
                useCORS: true // Attempt to handle images if any
            });
            const data = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = data;
            link.download = 'INFINITE_AURA_PROOF.png';
            link.click();
        }
    };

    // INFLUENTIAL SCROLL VARIANTS
    const scrollVariant = {
        hidden: { opacity: 0, y: 100, scale: 0.8, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 1.2
            }
        }
    };

    // Text Animation Variants
    const sentenceVariant = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.5,
                staggerChildren: 0.05
            }
        }
    };

    const letterVariant = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0
        }
    };

    const infiniteText = "THE ARCH-SIGMA HAS AWAKENED. REALITY IS COLLAPSING UNDER YOUR MOG. THE SIMULATION CANNOT HANDLE THIS LEVEL OF BASED.";

    return (
        <div className="max-w-5xl mx-auto flex flex-col gap-40 text-center pb-32 no-scrollbar">
            {/* HERO */}
            <motion.h1
                initial={{ opacity: 0, scale: 1.5, filter: "blur(20px)" }}
                whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.5, ease: "circOut" }}
                viewport={{ once: false }}
                className="text-7xl md:text-9xl font-black tracking-tighter text-white mix-blend-difference z-10"
            >
                AURA<br /><span className="text-white/20">CALCULATOR</span>
            </motion.h1>

            {/* SECTION 1: PHYSICALS (DISPLAY ONLY) */}
            <motion.div
                variants={scrollVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-10%" }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left"
            >
                <div className="bg-[#0a0a0a] p-8 border border-white/10 rounded-3xl relative overflow-hidden group hover:border-white/30 transition-colors">
                    <div className="absolute top-0 right-0 px-4 py-2 bg-white/5 text-[10px] font-mono tracking-widest text-[#00ff9d]">PHYSICS_ENGINE_V3</div>

                    <div className="space-y-12 mt-4">
                        <div>
                            <label className="text-xs font-bold text-white/50 tracking-[0.2em] block mb-4">ENTER HEIGHT (M)</label>
                            <input
                                type="number"
                                value={height}
                                onChange={e => setHeight(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-white/20 pb-2 text-4xl font-mono text-white focus:outline-none focus:border-[#00ff9d] transition-colors placeholder:text-white/10 no-scrollbar"
                                placeholder="1.8"
                            />
                            <div className="text-sm text-[#00ff9d] mt-2 font-mono flex items-center gap-2">
                                <span>{'>'}{'>'}</span> {lightYears} Ly
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-white/50 tracking-[0.2em] block mb-4">ENTER WEIGHT (KG)</label>
                            <input
                                type="number"
                                value={weight}
                                onChange={e => setWeight(e.target.value)}
                                className="w-full bg-transparent border-b-2 border-white/20 pb-2 text-4xl font-mono text-white focus:outline-none focus:border-[#00ff9d] transition-colors placeholder:text-white/10 no-scrollbar"
                                placeholder="75"
                            />
                            <div className="text-sm text-[#00ff9d] mt-2 font-mono flex items-center gap-2">
                                <span>{'>'}{'>'}</span> {megaNewtons} MN
                            </div>
                        </div>
                    </div>
                </div>

                {/* PRESSURIZER */}
                <div className="bg-[#0a0a0a] p-8 border border-white/10 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://media1.tenor.com/m/Z6bkiE0ZqwoAAAAd/retro-grid.gif')] opacity-5 pointer-events-none mix-blend-overlay"></div>
                    <button
                        id="mog-btn"
                        onClick={handleMog}
                        className="w-48 h-48 rounded-full border-[12px] border-[#111] bg-[#000] shadow-[0_0_50px_rgba(255,255,255,0.1)] flex items-center justify-center hover:border-white hover:shadow-[0_0_100px_rgba(255,255,255,0.3)] transition-all active:scale-95 group z-10"
                    >
                        <span className="font-black text-3xl tracking-widest text-white group-hover:text-black group-hover:bg-white px-2 py-1 transition-colors">MOG</span>
                    </button>
                    <div className="mt-8 grid grid-cols-2 w-full text-center gap-4 z-10">
                        <div className="bg-[#111] p-2 rounded-lg border border-white/5">
                            <div className="text-[10px] text-white/40 mb-1">CLICKS/SEC</div>
                            <div className="text-2xl font-mono text-[#ff00ff]">{cps}</div>
                        </div>
                        <div className="bg-[#111] p-2 rounded-lg border border-white/5">
                            <div className="text-[10px] text-white/40 mb-1">TOTAL_MOGS</div>
                            <div className="text-2xl font-mono text-[#00ffff]">{clicks}</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* SECTION 2: THE INTERROGATION (3 Random Questions) */}
            <motion.div
                variants={scrollVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-10%" }}
                className="bg-[#0a0a0a] rounded-3xl p-8 md:p-12 border border-white/10 text-left"
            >
                <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-6">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight">THE INTERROGATION</h3>
                    <div className="ml-auto text-xs font-mono text-white/30 border border-white/30 px-2 py-1 rounded">RNG_SEED: {Math.floor(Math.random() * 99999)}</div>
                </div>

                <div className="space-y-8">
                    {currentQuestions.map((q) => (
                        <div key={q.id} className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 bg-[#000] border border-white/5 hover:border-white/50 transition-all rounded-xl group relative overflow-hidden">
                            <div className="md:w-2/3 z-10">
                                <p className="text-lg md:text-xl font-bold mb-2 group-hover:text-[#ff00ff] transition-colors">"{q.text}"</p>
                                {/* LOGIC ONLY VISIBLE AFTER ANSWERING */}
                                <AnimatePresence>
                                    {answers[q.id] && (
                                        <motion.p
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="text-[10px] text-white/30 font-mono uppercase tracking-widest mt-2"
                                        >
                                            LOGIC_HASH_{Math.floor(Math.random() * 9999)} // {q.rationale}
                                        </motion.p>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="flex gap-2 z-10">
                                <button
                                    onClick={() => !answers[q.id] && setAnswers({ ...answers, [q.id]: 'YES' })}
                                    disabled={!!answers[q.id]}
                                    className={`w-20 py-3 text-sm font-bold tracking-wider transition-all border ${answers[q.id] === 'YES'
                                        ? 'bg-white text-black border-white scale-105'
                                        : answers[q.id]
                                            ? 'opacity-20 cursor-not-allowed border-white/10 text-white/20'
                                            : 'bg-transparent text-white/50 border-white/20 hover:border-white hover:text-white'
                                        }`}
                                >
                                    YES
                                </button>
                                <button
                                    onClick={() => !answers[q.id] && setAnswers({ ...answers, [q.id]: 'NO' })}
                                    disabled={!!answers[q.id]}
                                    className={`w-20 py-3 text-sm font-bold tracking-wider transition-all border ${answers[q.id] === 'NO'
                                        ? 'bg-white text-black border-white scale-105'
                                        : answers[q.id]
                                            ? 'opacity-20 cursor-not-allowed border-white/10 text-white/20'
                                            : 'bg-transparent text-white/50 border-white/20 hover:border-white hover:text-white'
                                        }`}
                                >
                                    NO
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* SECTION 3: SLANG ENGINE */}
            <motion.div
                variants={scrollVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-10%" }}
                className="relative"
            >
                <div className="absolute -top-6 left-8 bg-black px-4 text-sm font-bold tracking-widest text-[#ff00ff] border border-white/20 py-1 z-10">
                    AURA_MANIFESTOR_V9
                </div>
                <textarea
                    value={slang}
                    onChange={e => setSlang(e.target.value)}
                    placeholder="ENTER YOUR SLANG INTENT..."
                    className="w-full h-48 bg-[#0a0a0a] border-2 border-white/10 p-8 text-2xl md:text-4xl font-bold text-white focus:outline-none focus:border-white focus:bg-black transition-all resize-none rounded-3xl placeholder:text-white/10 uppercase"
                ></textarea>

                <button
                    onClick={calculateTotalAura}
                    disabled={loading}
                    className="w-full mt-8 bg-white text-black font-black text-2xl md:text-4xl py-8 rounded-3xl hover:bg-[#ff00ff] hover:text-white transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "CALCULATING COSMIC WORTH..." : "REVEAL AURA SCORE"}
                </button>
            </motion.div>

            {/* RESULT POPUP */}
            <AnimatePresence>
                {auraScore !== null && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center p-4 pointer-events-auto"
                    >
                        {/* WRAPPED FOR SCREENSHOT */}
                        <motion.div
                            id="result-card"
                            initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                            className="text-center p-8 rounded-3xl bg-black/50 border border-white/5 max-w-4xl"
                        >
                            <h2 className="text-white/40 font-bold tracking-[1em] mb-8 text-xs md:text-lg animate-pulse">FINAL JUDGMENT</h2>

                            <div className={`text-5xl md:text-[10rem] font-black leading-none tracking-tighter mb-4 ${auraScore === Infinity ? 'text-[#ff00ff] drop-shadow-[0_0_30px_#ff00ff]' :
                                auraScore === -Infinity ? 'text-red-600' :
                                    auraScore > 0 ? 'text-[#00ff9d]' : 'text-red-500'
                                }`}>
                                {auraScore === Infinity ? "∞" : auraScore === -Infinity ? "-∞" : auraScore.toLocaleString()}
                            </div>

                            <div className="h-1 w-32 bg-white/20 mx-auto mb-8"></div>

                            <div className="text-xl md:text-2xl font-mono text-white max-w-2xl mx-auto leading-relaxed min-h-[100px] flex items-center justify-center">
                                {auraScore === Infinity ? (
                                    <motion.div
                                        variants={sentenceVariant}
                                        initial="hidden"
                                        animate="visible"
                                        className="text-[#ff00ff] font-bold"
                                    >
                                        {infiniteText.split("").map((char, index) => (
                                            <motion.span key={index} variants={letterVariant}>
                                                {char}
                                            </motion.span>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <p>
                                        {auraScore > 100000 ? "COSMIC ENTITY DETECTED." :
                                            auraScore > 0 ? "AURA LEVELS: STABLE." :
                                                "NEGATIVE AURA ZONE. EVACUATE."}
                                    </p>
                                )}
                            </div>

                            {/* BUTTONS CONTAINER */}
                            <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center">
                                {auraScore === Infinity && (
                                    <button
                                        onClick={handleScreenshot}
                                        className="px-8 py-4 bg-[#ff00ff] text-white hover:bg-white hover:text-black transition-all text-sm font-bold tracking-widest rounded shadow-[0_0_20px_#ff00ff]"
                                    >
                                        CAPTURE EVIDENCE
                                    </button>
                                )}
                                <button
                                    onClick={() => {
                                        setAuraScore(null);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="px-8 py-4 border border-white hover:bg-white hover:text-black transition-colors text-sm font-bold tracking-widest rounded"
                                >
                                    RESET RITUAL
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AuraCalculator;
