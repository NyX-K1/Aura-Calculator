import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FARMING_DATA } from '../../data/farmingData';

const FarmingTechniques = () => {
    const [selectedArticle, setSelectedArticle] = useState(null);

    return (
        <div className="max-w-7xl mx-auto min-h-screen pb-32">

            <div className="text-center mb-16">
                <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
                    FARMING <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff9d] to-[#00ffff]">TECHNIQUES</span>
                </h2>
                <p className="text-white/40 font-mono">FORBIDDEN KNOWLEDGE TO MAXIMIZE YOUR STATS</p>
            </div>

            {/* GRID LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FARMING_DATA.map((article) => (
                    <motion.div
                        layoutId={`article-card-${article.id}`}
                        key={article.id}
                        onClick={() => {
                            new Audio('/sounds/metallic-click.mp3').play().catch(e => { });
                            setSelectedArticle(article);
                        }}
                        whileHover={{ y: -10 }}
                        className="bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden cursor-pointer group hover:border-white/30 transition-all relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/80 z-0"></div>
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity z-10 text-4xl grayscale group-hover:grayscale-0">
                            {article.icon}
                        </div>

                        <div className="p-8 h-full flex flex-col relative z-10">
                            <div className="text-[10px] font-bold tracking-[0.2em] mb-4" style={{ color: article.color }}>
                                {article.readTime}
                            </div>

                            <h3 className="text-2xl font-black text-white mb-2 leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-500 transition-all">
                                {article.title}
                            </h3>

                            <p className="text-white/40 font-mono text-xs mb-8">
                                {article.subtitle}
                            </p>

                            <span>ACCESS ARCHIVE</span>
                            <span>Example &rarr;</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* READING MODAL */}
            <AnimatePresence>
                {selectedArticle && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-8">
                        {/* BACKDROP */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedArticle(null)}
                            className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-pointer"
                        />

                        {/* CONTENT CONTAINER */}
                        <motion.div
                            layoutId={`article-card-${selectedArticle.id}`}
                            className="bg-[#050505] w-full max-w-4xl h-full md:h-auto md:max-h-[85vh] md:rounded-3xl border-x md:border border-white/10 relative z-10 overflow-hidden flex flex-col shadow-2xl"
                        >
                            {/* CLOSE BUTTON */}
                            <button
                                onClick={(e) => { e.stopPropagation(); setSelectedArticle(null); }}
                                className="absolute top-6 right-6 z-50 w-10 h-10 bg-black/50 hover:bg-white hover:text-black rounded-full border border-white/20 flex items-center justify-center transition-all"
                            >
                                ✕
                            </button>

                            {/* ARTICLE HEADER */}
                            <div className="p-8 md:p-12 border-b border-white/10 bg-[#0a0a0a] relative overflow-hidden shrink-0">
                                <div className="absolute inset-0 bg-[url('https://media1.tenor.com/m/Z6bkiE0ZqwoAAAAd/retro-grid.gif')] opacity-5 mix-blend-screen"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-2xl">{selectedArticle.icon}</span>
                                        <span className="text-xs font-bold tracking-widest px-2 py-1 rounded border" style={{ borderColor: selectedArticle.color, color: selectedArticle.color }}>
                                            {selectedArticle.readTime}
                                        </span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-2">
                                        {selectedArticle.title}
                                    </h2>
                                    <p className="text-white/50 font-mono text-sm md:text-base">
                                        // {selectedArticle.subtitle}
                                    </p>
                                </div>
                            </div>

                            {/* ARTICLE BODY */}
                            <div className="p-8 md:p-12 overflow-y-auto no-scrollbar scroll-smooth">
                                <div className="prose prose-invert prose-lg max-w-none">
                                    <p className="text-xl leading-relaxed text-gray-300 font-light mb-12 border-l-4 border-white/10 pl-6">
                                        {selectedArticle.content.split('\n\n').map((paragraph, i) => (
                                            <span key={i} className="block mb-6">{paragraph}</span>
                                        ))}
                                    </p>

                                    {/* ACTIONABLE STEPS */}
                                    <div className="bg-[#111] rounded-2xl p-8 border border-white/10 mb-12">
                                        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                                            <span style={{ color: selectedArticle.color }}>⚡</span>
                                            ACTIONABLE STEPS
                                        </h3>
                                        <ul className="space-y-4">
                                            {selectedArticle.steps.map((step, idx) => (
                                                <li key={idx} className="flex items-start gap-4 text-gray-300">
                                                    <span className="font-mono text-white/30 font-bold mt-1">0{idx + 1}</span>
                                                    <span className="flex-1">{step}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* REFERENCES / SURVEY DATA */}
                                    {selectedArticle.references && (
                                        <div className="border-t border-white/10 pt-8">
                                            <h4 className="text-sm font-bold text-white/40 tracking-widest mb-6 uppercase flex items-center gap-2">
                                                <span>🧪</span> Source Data & Studies
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {selectedArticle.references.map((ref, idx) => (
                                                    <a
                                                        key={idx}
                                                        href={ref.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="block bg-[#0f0f0f] p-4 rounded-lg border border-white/5 hover:border-white/20 hover:bg-[#151515] transition-all group/ref"
                                                    >
                                                        <div className="text-[#00ffff] font-bold text-sm mb-1 group-hover/ref:underline truncate">
                                                            {ref.title} ↗
                                                        </div>
                                                        <div className="text-white/40 text-xs font-mono">
                                                            {ref.description}
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-16 text-center">
                                    <p className="text-xs font-mono text-white/20">END OF TRANSMISSION</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FarmingTechniques;
