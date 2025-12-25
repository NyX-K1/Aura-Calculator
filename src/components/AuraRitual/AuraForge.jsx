import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const CONSTANTS = {
    GEMINI_API_KEY: 'AIzaSyCoXr8jOuZ1KYqO7CtYdr8hK9x1gai-LkM',
    TIERS: {
        GOLD: 'Golden Whisper',
        EMERALD: 'Emerald Anchor',
        INDIGO: 'Indigo Void'
    }
};

const LOCAL_ORACLE = {
    GOLD: [
        "Your spirit burns with the brightness of a thousand suns.",
        "Radiance follows your footsteps; light is your legacy.",
        "The sun does not ask permission to rise; neither should you."
    ],
    EMERALD: [
        "Roots deep, branches high; you are the shelter and the storm.",
        "Growth is silent, yet it splits the hardest stone.",
        "Nature does not hurry, yet everything is accomplished."
    ],
    INDIGO: [
        "The void is not empty; it is full of potential waiting for you.",
        "Silence speaks the loudest truth to those who listen.",
        "The stars only reveal themselves when the artificial lights fade."
    ]
};

const AuraForge = ({ onCalculate }) => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const rippleContainerRef = useRef(null);

    // --- STATE MANAGEMENT ---
    const [taps, setTaps] = useState([]);
    const [tapPhase, setTapPhase] = useState('idle');
    const [rhythmScore, setRhythmScore] = useState({ GOLD: 0, EMERALD: 0, INDIGO: 0 });

    const [audioMapping, setAudioMapping] = useState([]);
    const [selectedSound, setSelectedSound] = useState(null);
    const currentAudioRef = useRef(null);

    const [isHolding, setIsHolding] = useState(false);
    const [focusProgress, setFocusProgress] = useState(0);
    const [stability, setStability] = useState(false);
    const holdStartRef = useRef(0);
    const mouseStartRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef(null);

    const [intentText, setIntentText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // --- SETUP ---
    useEffect(() => {
        const sounds = [
            { file: '/doraemon-chime.mp3', pointsTo: 'GOLD' },
            { file: '/bell-chime.wav', pointsTo: 'EMERALD' },
            { file: '/wind-chime.wav', pointsTo: 'INDIGO' }
        ];
        // Perfect Shuffle
        for (let i = sounds.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [sounds[i], sounds[j]] = [sounds[j], sounds[i]];
        }
        setAudioMapping(sounds);
    }, []);

    // --- LOGIC ---
    const calculateRhythmPoints = (tapTimes) => {
        if (tapTimes.length < 2) return;
        let intervals = [];
        for (let i = 1; i < tapTimes.length; i++) intervals.push(tapTimes[i] - tapTimes[i - 1]);
        const avg = intervals.reduce((a, b) => a + b, 0) / intervals.length;
        const variance = intervals.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / intervals.length;
        const stdDev = Math.sqrt(variance);

        let newScores = { GOLD: 0, EMERALD: 0, INDIGO: 0 };
        if (stdDev < 50) newScores.EMERALD += 2;
        else if (stdDev > 200) newScores.INDIGO += 2;
        if (avg < 200) newScores.GOLD += 2;
        else if (avg > 800) newScores.EMERALD += 1;
        setRhythmScore(newScores);
    };

    const handleTap = () => {
        if (tapPhase === 'complete') return;
        const newTaps = [...taps, performance.now()];
        setTaps(newTaps);
        setTapPhase('recording');

        const ripple = document.createElement("div");
        ripple.className = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border border-white/60 pointer-events-none";
        rippleContainerRef.current?.appendChild(ripple);
        gsap.fromTo(ripple, { scale: 0.8, opacity: 0.8 }, { scale: 2, opacity: 0, duration: 1, ease: "power2.out", onComplete: () => ripple.remove() });

        if (newTaps.length >= 5) {
            setTapPhase('complete');
            calculateRhythmPoints(newTaps);
        }
    };

    // --- AUDIO CONTROL ---
    const stopAudio = () => {
        if (currentAudioRef.current) {
            currentAudioRef.current.pause();
            currentAudioRef.current.currentTime = 0;
            currentAudioRef.current = null;
        }
    };

    const playSound = (index) => {
        if (selectedSound === index) {
            stopAudio();
            setSelectedSound(null);
            return;
        }

        if (!audioMapping[index]) return;

        stopAudio();

        setSelectedSound(index);
        const audio = new Audio(audioMapping[index].file);
        audio.volume = 0.5;
        audio.play().catch(e => console.log(e));
        currentAudioRef.current = audio;
    };

    // --- FOCUS ---
    const startHold = (e) => {
        if (stability) return;
        setIsHolding(true);
        holdStartRef.current = performance.now();
        mouseStartRef.current = { x: e.clientX, y: e.clientY };

        const loop = () => {
            const now = performance.now();
            const elapsed = now - holdStartRef.current;
            const progress = Math.min(elapsed / 3000, 1);
            setFocusProgress(progress);
            if (progress >= 1) {
                setStability(true);
                setIsHolding(false);
                new Audio('/shimmer.wav').play().catch(() => { });
            } else {
                animationFrameRef.current = requestAnimationFrame(loop);
            }
        };
        animationFrameRef.current = requestAnimationFrame(loop);
    };

    const checkStability = (e) => {
        if (!isHolding) return;
        const dist = Math.hypot(e.clientX - mouseStartRef.current.x, e.clientY - mouseStartRef.current.y);
        if (dist > 5) { setIsHolding(false); setFocusProgress(0); cancelAnimationFrame(animationFrameRef.current); }
    };
    const endHold = () => { if (!stability) { setIsHolding(false); setFocusProgress(0); cancelAnimationFrame(animationFrameRef.current); } };

    // --- CALCULATION ---
    const calculateAndFinalize = async () => {
        setIsAnalyzing(true);
        let scores = { ...rhythmScore };
        if (selectedSound !== null && audioMapping[selectedSound]) {
            const type = audioMapping[selectedSound].pointsTo;
            scores[type] = (scores[type] || 0) + 1;
        }
        const winningScore = Object.keys(scores).reduce((a, b) => scores[a] > scores[b] ? a : b);

        try {
            const prompt = `Digital Oracle. User: "${intentText}". Scores: ${JSON.stringify(scores)}. Winner: ${winningScore}. Respond: CATEGORY|TITLE|FORTUNE`;
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${CONSTANTS.GEMINI_API_KEY}`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            if (!response.ok) throw new Error("API Error");
            const data = await response.json();
            const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
            const parts = rawText.split('|');

            stopAudio();
            onCalculate({ category: parts[0]?.trim() || winningScore, title: parts[1]?.trim() || 'The Unknown', fortune: parts[2]?.trim() || 'Destiny awaits.' });

        } catch (error) {
            stopAudio();
            const resultCat = winningScore;
            const fortunes = LOCAL_ORACLE[resultCat];
            setTimeout(() => onCalculate({ category: resultCat, title: `${resultCat} Resonance`, fortune: fortunes[Math.floor(Math.random() * fortunes.length)] }), 1500);
        }
    };

    return (
        <section
            ref={containerRef}
            className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-24 relative z-10 pointer-events-none"
            style={{ perspective: "1000px" }}
        >

            <motion.div
                className="w-full flex justify-center pointer-events-auto"
                initial={{ opacity: 0, rotateX: -30, y: 100 }}
                whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
                viewport={{ amount: 0.1 }}
                transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
            >
                <motion.h2
                    ref={titleRef}
                    className="font-playfair text-6xl md:text-8xl font-bold mb-16 tracking-tighter text-center"
                    style={{
                        backgroundImage: 'linear-gradient(to right, #FFD700, #50C878, #A78BFA, #FFD700)',
                        backgroundSize: '200% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}
                    animate={{ backgroundPosition: ['0% center', '-200% center'] }}
                    transition={{ duration: 20, ease: "linear", repeat: Infinity }}
                >
                    AURA RITUAL
                </motion.h2>
            </motion.div>

            <motion.div
                className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6 px-4 pointer-events-auto"
                initial={{ opacity: 0, scale: 0.8, y: 100 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ amount: 0.1 }}
                transition={{ duration: 1.0, type: "spring", bounce: 0.3, delay: 0 }}
            >
                {/* 1. RHYTHM */}
                <div className="p-6 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center min-h-[250px]">
                    <label className="font-playfair text-xl text-white mb-2">1. The Rhythm</label>
                    <div className="relative w-24 h-24 mb-4" ref={rippleContainerRef}>
                        <button onClick={handleTap} disabled={tapPhase === 'complete'} className="w-full h-full rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all">
                            <div className={`w-3 h-3 rounded-full bg-[#FFD700] ${tapPhase === 'complete' ? 'shadow-[0_0_15px_#FFD700]' : ''}`}></div>
                        </button>
                    </div>
                    <div className="flex gap-2">{[...Array(5)].map((_, i) => <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < taps.length ? 'bg-[#FFD700]' : 'bg-white/10'}`} />)}</div>
                </div>

                {/* 2. AUDIO */}
                <div className="p-6 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center min-h-[250px]">
                    <label className="font-playfair text-xl text-white mb-6">2. The Frequency</label>
                    <div className="flex gap-6">
                        {[0, 1, 2].map((idx) => (
                            <button key={idx} onClick={() => playSound(idx)} className={`flex flex-col items-center gap-2 transition-all ${selectedSound === idx ? 'scale-110 text-[#FFD700]' : 'text-white/60 hover:text-white'}`}>
                                <div className={`w-14 h-14 rounded-full border flex items-center justify-center ${selectedSound === idx ? 'border-[#FFD700] bg-[#FFD700]/10' : 'border-white/30'}`}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 6L8 10H4v4h4l4 4V6z" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
                                </div>
                                <span className="text-[10px] tracking-widest font-montserrat uppercase">Sound {idx + 1}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. INTENT */}
                <div className="p-6 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center min-h-[200px]">
                    <label className="font-playfair text-xl text-white mb-2">3. The Intent</label>
                    <textarea value={intentText} onChange={(e) => setIntentText(e.target.value)} placeholder="Whisper your wish..." className="w-full bg-transparent border-none text-center font-playfair text-xl italic text-white focus:outline-none placeholder:text-white/20 resize-none h-20" />
                </div>

                {/* 4. FOCUS */}
                <div className="p-6 rounded-3xl border border-white/20 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center min-h-[200px]">
                    <label className="font-playfair text-xl text-white mb-4">4. The Center</label>
                    <div className="relative w-24 h-24 flex items-center justify-center">
                        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="46" stroke="white" strokeWidth="1" fill="none" opacity="0.1" />
                            <circle cx="50" cy="50" r="46" stroke="#50C878" strokeWidth="2" fill="none" strokeDasharray="289" strokeDashoffset={289 - (289 * focusProgress)} className="transition-all duration-100 ease-linear" />
                        </svg>
                        <button
                            onMouseDown={startHold} onMouseMove={checkStability} onMouseUp={endHold} onMouseLeave={endHold}
                            className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${stability ? 'bg-[#50C878] shadow-[0_0_20px_#50C878]' : isHolding ? 'bg-white/20' : 'bg-white/10'}`}
                        >
                            {stability && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </button>
                    </div>
                </div>

                {/* INITIATE BTN */}
                <div className="md:col-span-2 flex justify-center mt-8">
                    <button onClick={calculateAndFinalize} disabled={!stability || tapPhase !== 'complete' || selectedSound === null || !intentText || isAnalyzing} className="px-16 py-4 border border-white/50 text-white font-montserrat text-sm tracking-[0.3em] uppercase rounded-full hover:bg-white hover:text-black transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                        {isAnalyzing ? "COMMUNING..." : "INITIATE RITE"}
                    </button>
                </div>
            </motion.div>
        </section>
    );
};
export default AuraForge;
