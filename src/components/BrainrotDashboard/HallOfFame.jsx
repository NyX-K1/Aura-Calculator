import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HALL_OF_FAME_DATA } from '../../data/hallOfFameData';

const HallOfFame = () => {
    const [selectedId, setSelectedId] = useState(null);
    const selectedItem = HALL_OF_FAME_DATA.find(item => item.id === selectedId);

    return (
        <div className="min-h-screen pb-32">

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {HALL_OF_FAME_DATA.map((entity) => (
                    <motion.div
                        key={entity.id}
                        layoutId={`card-container-${entity.id}`}
                        onClick={() => {
                            const audio = new Audio('/sounds/metallic-click.mp3');
                            audio.volume = 0.5;
                            audio.play().catch(e => console.log('Audio play failed:', e));
                            setSelectedId(entity.id);
                        }}
                        whileHover={{ y: -5, borderColor: 'rgba(255, 255, 255, 0.5)' }}
                        className="bg-[#111] border border-white/10 rounded-xl overflow-hidden cursor-pointer group flex flex-col h-full relative"
                    >
                        {/* HEADER IMAGE */}
                        <div className="h-48 bg-gray-900 relative overflow-hidden group-hover:h-52 transition-all duration-500">
                            <img
                                src={`/images/hall-of-fame/${entity.id}.jpg`}
                                alt={entity.name}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                onError={(e) => {
                                    if (e.target.src.includes('.jpg')) {
                                        e.target.src = "https://media1.tenor.com/m/Z6bkiE0ZqwoAAAAd/retro-grid.gif";
                                    }
                                }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80"></div>

                            <div className="absolute bottom-0 left-0 p-3 w-full">
                                <motion.h3 layoutId={`card-title-${entity.id}`} className="font-black text-lg text-white leading-none drop-shadow-lg">
                                    {entity.name}
                                </motion.h3>
                            </div>
                        </div>

                        {/* STATS */}
                        <div className="p-4 space-y-4 flex-grow flex flex-col justify-end">
                            <div className="space-y-1">
                                <div className="text-[10px] font-bold text-white/40 tracking-widest">AURA SCORE</div>
                                <div className="text-xl font-mono text-[#00ff9d]">{entity.aura}</div>
                            </div>

                            <div className="space-y-1">
                                <div className="text-[10px] font-bold text-white/40 tracking-widest">MINDSET</div>
                                <div className="text-xs font-bold text-white line-clamp-1">"{entity.mindset}"</div>
                            </div>

                            <div className="space-y-1 pt-2 border-t border-white/5">
                                <div className="flex justify-between text-[10px] items-center mb-1">
                                    <span className="text-white/40 font-bold">PLOT ARMOR</span>
                                    <span className="text-white">{entity.plotArmor}</span>
                                </div>
                                <div className="w-full bg-gray-900 h-1.5 rounded-full overflow-hidden">
                                    {entity.plotArmor === '∞' ? (
                                        <div className="h-full w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-[shimmer_2s_infinite]"></div>
                                    ) : (
                                        <div className="h-full bg-white rounded-full" style={{ width: `${Math.min(entity.plotArmor, 100)}%` }}></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* EXPANDED MODAL */}
            <AnimatePresence>
                {selectedId && selectedItem && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* BACKDROP */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-sm cursor-pointer"
                        ></motion.div>

                        {/* CARD */}
                        <motion.div
                            layoutId={`card-container-${selectedId}`}
                            className="w-full max-w-2xl bg-[#0a0a0a] border border-white/20 rounded-3xl overflow-hidden relative z-10 shadow-[0_0_100px_rgba(255,0,255,0.1)] flex flex-col max-h-[90vh]"
                        >
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                                className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors"
                            >
                                ✕
                            </button>

                            {/* MODAL HEADER */}
                            <div className="h-64 relative flex items-end p-8 border-b border-white/10 overflow-hidden">
                                {/* BACKGROUND IMAGE */}
                                <img
                                    src={`/images/hall-of-fame/${selectedItem.id}.jpg`}
                                    alt={selectedItem.name}
                                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-50"
                                    onError={(e) => {
                                        if (e.target.src.includes('.jpg')) {
                                            e.target.src = "https://media1.tenor.com/m/Z6bkiE0ZqwoAAAAd/retro-grid.gif";
                                        }
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent"></div>
                                <div className="absolute inset-0 opacity-10 bg-[url('https://media1.tenor.com/m/Z6bkiE0ZqwoAAAAd/retro-grid.gif')] mix-blend-overlay"></div>

                                <div className="relative z-10 w-full">
                                    <div className="text-xs font-mono text-[#ff00ff] mb-2 tracking-widest flex items-center gap-2">
                                        <div className="w-2 h-2 bg-[#ff00ff] rounded-full animate-pulse"></div>
                                        {selectedItem.field.toUpperCase()}
                                    </div>
                                    <motion.h2 layoutId={`card-title-${selectedId}`} className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter drop-shadow-2xl">
                                        {selectedItem.name}
                                    </motion.h2>
                                </div>
                            </div>

                            {/* MODAL CONTENT */}
                            <div className="p-8 overflow-y-auto no-scrollbar space-y-8">

                                {/* AURA STATS */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                                        <div className="text-[10px] text-white/40 mb-1">TOTAL AURA</div>
                                        <div className="text-xl md:text-2xl font-mono text-[#00ff9d]">{selectedItem.aura}</div>
                                    </div>
                                    <div className="bg-[#111] p-4 rounded-xl border border-white/5">
                                        <div className="text-[10px] text-white/40 mb-1">PLOT ARMOR</div>
                                        <div className="text-xl md:text-2xl font-mono text-purple-400">{selectedItem.plotArmor}</div>
                                    </div>
                                    <div className="col-span-2 bg-[#111] p-4 rounded-xl border border-white/5">
                                        <div className="text-[10px] text-white/40 mb-1">MINDSET ARCHETYPE</div>
                                        <div className="text-lg font-bold text-white">"{selectedItem.mindset}"</div>
                                    </div>
                                </div>

                                {/* LORE */}
                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-sm font-bold text-white/50 tracking-widest mb-2 border-b border-white/10 pb-2">THE SOURCE</h4>
                                        <p className="text-lg leading-relaxed text-gray-300">{selectedItem.description}</p>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold text-white/50 tracking-widest mb-2 border-b border-white/10 pb-2">THE LESSON</h4>
                                        <p className="text-lg font-serif italic text-white/90 border-l-2 border-[#ff00ff] pl-4 py-1">
                                            {selectedItem.lesson}
                                        </p>
                                    </div>
                                </div>

                                {/* ACTIONS */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                                    <a
                                        href={selectedItem.wikiLink}
                                        target="_blank"
                                        className="py-4 border border-white/10 flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all group rounded-xl font-bold tracking-widest text-sm"
                                    >
                                        <span>WIKI_DATABASE</span>
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </a>
                                    <a
                                        href={selectedItem.ytLink}
                                        target="_blank"
                                        className="py-4 bg-[#ff00ff]/10 border border-[#ff00ff]/50 text-[#ff00ff] flex items-center justify-center gap-2 hover:bg-[#ff00ff] hover:text-white transition-all group rounded-xl font-bold tracking-widest text-sm"
                                    >
                                        <span>AURA_ARCHIVES</span>
                                        <span className="group-hover:translate-x-1 transition-transform">▶</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HallOfFame;
