import { motion } from 'framer-motion';
import { useState } from 'react';

const DICTIONARY = [
    { word: 'AURA', def: 'The invisible energy field of chadness.' },
    { word: 'BASED', def: 'Courageously being yourself. Opposite of cringe.' },
    { word: 'CAP', def: 'Lies. Deceit. Falsehoods.' },
    { word: 'DELULU', def: 'Delusional is the solulu.' },
    { word: 'FANUM TAX', def: 'The distinct portion of food stolen by a friend.' },
    { word: 'GLAZING', def: 'Over-complimenting to an embarrassing degree.' },
    { word: 'GYATT', def: 'Exclamation of surprise/admiration.' },
    { word: 'HIM', def: 'The apex predator. The main character.' },
    { word: 'ICK', def: 'Sudden turn-off. Game over.' },
    { word: 'JIT', def: 'Youngster. Small entity.' },
    { word: 'MEWING', def: 'Tongue posture technique for jawline supremacy.' },
    { word: 'MID', def: 'Average. Mediocre. Insulting.' },
    { word: 'NPC', def: 'Non-Playable Character. Robot behavior.' },
    { word: 'OHIO', def: 'Land of chaos and strangeness.' },
    { word: 'RIZZ', def: 'Charisma. Seduction capability.' },
    { word: 'SIGMA', def: 'Lone wolf. Grinds while others sleep.' },
    { word: 'SKIBIDI', def: 'Chaos. Absurdity. Variable meaning.' },
    { word: 'SUS', def: 'Suspicious. Untrustworthy.' },
    { word: 'UNK', def: 'Unc. Uncle status. Old head.' },
    { word: 'YAPPING', def: 'Speaking endlessly without substance.' },
];

const SlangDictionary = () => {
    return (
        <div className="h-full w-64 bg-black/80 border-r-4 border-[#39FF14] flex flex-col relative overflow-hidden pointer-events-auto">
            <div className="bg-[#39FF14] text-black font-black p-2 text-center animate-pulse">
                BRAINROT<br />ARCHIVE
            </div>

            <div className="flex-1 overflow-hidden relative">
                <motion.div
                    className="absolute top-0 w-full"
                    animate={{ y: ["0%", "-50%"] }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    {/* Double the list for seamless marquee */}
                    {[...DICTIONARY, ...DICTIONARY].map((item, index) => (
                        <div
                            key={index}
                            className="group p-4 border-b border-[#39FF14]/30 hover:bg-[#39FF14]/20 transition-colors cursor-help"
                        >
                            <h3 className="text-[#39FF14] font-bold text-xl mb-1 group-hover:scale-110 group-hover:origin-left transition-transform" style={{ fontFamily: '"Press Start 2P", monospace' }}>
                                {item.word}
                            </h3>
                            <p className="text-[#39FF14]/70 text-xs hidden group-hover:block leading-tight">
                                {item.def}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default SlangDictionary;
