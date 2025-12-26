import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ARENA_DATA } from '../../data/arenaData';

const TheArena = () => {
    const [selectedGame, setSelectedGame] = useState(null);

    return (
        <div className="max-w-6xl mx-auto px-4 pb-32 min-h-screen">
            <h1 className="text-6xl md:text-8xl font-black text-center mb-16 italic text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 tracking-tighter">
                PROVE YOUR WORTH
            </h1>

            {/* GAMES GRID */}
            <div className="grid grid-cols-1 gap-12">
                {ARENA_DATA.map((game) => (
                    <motion.div
                        key={game.id}
                        layoutId={`game-card-${game.id}`}
                        onClick={() => {
                            new Audio('/sounds/metallic-click.mp3').play().catch(e => { });
                            setSelectedGame(game);
                        }}
                        className="group relative h-80 w-full overflow-hidden rounded-3xl border-2 border-white/10 hover:border-white transition-all cursor-pointer"
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                            style={{ backgroundImage: `url(${game.img})` }}
                        ></div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent p-8 md:p-12 flex flex-col justify-center items-start">
                            <h2 className="text-5xl md:text-7xl font-black text-white mb-2 italic" style={{ textShadow: `0 0 30px ${game.color}` }}>{game.title}</h2>
                            <p className="text-white/80 font-bold text-xl md:text-2xl mb-4 italic max-w-2xl">"{game.desc}"</p>

                            <div className="mt-auto flex items-center gap-4">
                                <span className="bg-white text-black font-bold px-6 py-2 rounded-full text-sm hover:scale-105 transition-transform">
                                    INSPECT DATA
                                </span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* MISSION BRIEFING MODAL */}
            <AnimatePresence>
                {selectedGame && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-6">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedGame(null)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                        />

                        <motion.div
                            layoutId={`game-card-${selectedGame.id}`}
                            className="bg-[#0a0a0a] w-full max-w-6xl h-full md:h-auto md:max-h-[90vh] md:rounded-3xl border border-white/10 relative z-10 overflow-hidden flex flex-col shadow-2xl"
                        >
                            {/* CLOSE BTN */}
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedGame(null); }}
                                className="absolute top-6 right-6 z-50 w-12 h-12 bg-black/50 hover:bg-white hover:text-black rounded-full border border-white/20 flex items-center justify-center transition-all text-xl"
                            >
                                ✕
                            </button>

                            {/* HEADER */}
                            <div className="h-64 relative shrink-0">
                                <img src={selectedGame.img} className="w-full h-full object-cover opacity-50" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                                <div className="absolute bottom-8 left-8 md:left-12">
                                    <h2 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter shadow-black/50 drop-shadow-lg" style={{ color: selectedGame.color }}>
                                        {selectedGame.title}
                                    </h2>
                                    <p className="text-white/60 font-mono text-lg">{selectedGame.subtitle}</p>
                                </div>
                            </div>

                            {/* CONTENT SCROLL */}
                            <div className="flex-1 overflow-y-auto no-scrollbar p-8 md:p-12">
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                                    {/* COL 1: HISTORY & STRATEGY */}
                                    <div className="lg:col-span-2 space-y-12">
                                        <section>
                                            <h3 className="text-2xl font-black text-white mb-4 border-b border-white/10 pb-2">ORIGIN STORY</h3>
                                            <p className="text-gray-300 text-lg leading-relaxed">{selectedGame.history}</p>
                                        </section>

                                        <section>
                                            <h3 className="text-2xl font-black text-white mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
                                                <span>🧠</span> META STRATEGY
                                            </h3>
                                            <p className="text-gray-300 text-lg leading-relaxed border-l-4 border-white/20 pl-6 italic">
                                                {selectedGame.strategy}
                                            </p>
                                        </section>

                                        {/* HISTORIC MOMENTS */}
                                        <section>
                                            <h3 className="text-2xl font-black text-white mb-6 border-b border-white/10 pb-2 text-[#ffd700]">WHEN HISTORY WAS WRITTEN</h3>
                                            <div className="grid gap-4">
                                                {selectedGame.moments.map((moment, i) => (
                                                    <a key={i} href={moment.link} target="_blank" className="block bg-[#111] p-6 rounded-xl border border-white/5 hover:border-[#ffd700] transition-colors group">
                                                        <div className="font-bold text-[#ffd700] text-lg mb-1 group-hover:underline">{moment.event} ↗</div>
                                                        <div className="text-white/60 text-sm">{moment.d}</div>
                                                    </a>
                                                ))}
                                            </div>
                                        </section>
                                    </div>

                                    {/* COL 2: STATS & ACTION */}
                                    <div className="space-y-8">
                                        <div className="bg-[#111] p-6 rounded-2xl border border-white/10">
                                            <h4 className="font-black text-green-400 mb-4 flex items-center gap-2">
                                                <span>▲</span> BUFFS (PROS)
                                            </h4>
                                            <ul className="space-y-3">
                                                {selectedGame.buffs.map((buff, i) => (
                                                    <li key={i} className="flex gap-3 text-sm text-gray-300">
                                                        <span>{buff.icon}</span>
                                                        <span>{buff.text}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="bg-[#111] p-6 rounded-2xl border border-white/10">
                                            <h4 className="font-black text-red-500 mb-4 flex items-center gap-2">
                                                <span>▼</span> DEBUFFS (CONS)
                                            </h4>
                                            <ul className="space-y-3">
                                                {selectedGame.debuffs.map((buff, i) => (
                                                    <li key={i} className="flex gap-3 text-sm text-gray-300">
                                                        <span>{buff.icon}</span>
                                                        <span>{buff.text}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <a
                                            href={selectedGame.playLink}
                                            target="_blank"
                                            className="block w-full text-center py-6 text-xl font-black text-black rounded-xl hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                            style={{ backgroundColor: selectedGame.color === '#ffffff' ? '#ffffff' : selectedGame.color }}
                                        >
                                            ENTER THE ARENA ↗
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TheArena;
