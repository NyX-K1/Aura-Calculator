import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DICTIONARY_DATA } from '../../data/dictionaryData';

const CATEGORIES = ['ALL', 'AURA', 'MINDSET', 'GAMING', 'GENERAL', 'AESTHETICS', 'LORE'];

const BrainrotDictionary = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [isSuggesting, setIsSuggesting] = useState(false);
    const [suggestionForm, setSuggestionForm] = useState({ word: '', def: '', category: 'GENERAL' });
    const [suggestionStatus, setSuggestionStatus] = useState('idle'); // idle, submitting, success

    // Filter Logic
    const filteredWords = DICTIONARY_DATA.filter(item => {
        const matchesSearch = item.word.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.def.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    const handleSuggest = (e) => {
        e.preventDefault();
        setSuggestionStatus('submitting');

        // Simulate API call
        setTimeout(() => {
            setSuggestionStatus('success');
            setTimeout(() => {
                setIsSuggesting(false);
                setSuggestionStatus('idle');
                setSuggestionForm({ word: '', def: '', category: 'GENERAL' });
            }, 2000);
        }, 1500);
    };

    return (
        <div className="max-w-6xl mx-auto min-h-screen pb-32">

            {/* SEARCH HEADER */}
            <div className="sticky top-0 z-20 bg-black/80 backdrop-blur-md py-6 mb-8 border-b border-white/10">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <h2 className="text-4xl font-black text-[#00ffff] tracking-tighter flex items-center gap-3">
                        THE ARCHIVES <span className="text-sm text-white/30 whitespace-nowrap font-mono tracking-normal h-full pt-2">({DICTIONARY_DATA.length} TERMS)</span>
                    </h2>

                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="relative flex-grow md:flex-grow-0 md:w-64">
                            <input
                                type="text"
                                placeholder="SEARCH TERMINOLOGY..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[#111] border border-white/20 rounded-full py-3 px-6 text-white focus:outline-none focus:border-[#00ffff] focus:ring-1 focus:ring-[#00ffff] transition-all font-mono text-sm"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30">🔍</div>
                        </div>

                        <button
                            onClick={() => setIsSuggesting(true)}
                            className="bg-[#00ffff]/10 border border-[#00ffff]/20 text-[#00ffff] px-6 py-3 rounded-full font-bold hover:bg-[#00ffff] hover:text-black transition-all whitespace-nowrap"
                        >
                            + CONTRIBUTE
                        </button>
                    </div>
                </div>

                {/* CATEGORY TAGS */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar mt-6 text-sm font-bold pb-2">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1.5 rounded-full border transition-all whitespace-nowrap ${selectedCategory === cat
                                ? 'bg-[#00ffff] text-black border-[#00ffff]'
                                : 'bg-transparent text-white/50 border-white/20 hover:border-white hover:text-white'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* SUGGESTION MODAL */}
            <AnimatePresence>
                {isSuggesting && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsSuggesting(false)}
                            className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-lg p-8 relative z-10 shadow-[0_0_50px_rgba(0,255,255,0.1)]"
                        >
                            <h3 className="text-2xl font-black text-white mb-6">SUBMIT TO THE COUNCIL</h3>

                            {suggestionStatus === 'success' ? (
                                <div className="text-center py-12">
                                    <div className="text-6xl mb-4">✅</div>
                                    <h4 className="text-xl font-bold text-[#00ffff] mb-2">SUBMISSION RECEIVED.</h4>
                                    <p className="text-white/50">The Council will review your contribution.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSuggest} className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-white/40 tracking-widest block mb-2">TERM</label>
                                        <input
                                            required
                                            value={suggestionForm.word}
                                            onChange={e => setSuggestionForm({ ...suggestionForm, word: e.target.value })}
                                            className="w-full bg-[#111] border border-white/20 rounded-xl p-4 text-white focus:border-[#00ffff] focus:outline-none transition-colors"
                                            placeholder="e.g. SKIBIDI RIZZ"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-white/40 tracking-widest block mb-2">DEFINITION</label>
                                        <textarea
                                            required
                                            value={suggestionForm.def}
                                            onChange={e => setSuggestionForm({ ...suggestionForm, def: e.target.value })}
                                            className="w-full bg-[#111] border border-white/20 rounded-xl p-4 text-white focus:border-[#00ffff] focus:outline-none transition-colors h-32 resize-none"
                                            placeholder="Explain the lore..."
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-white/40 tracking-widest block mb-2">CATEGORY</label>
                                        <select
                                            value={suggestionForm.category}
                                            onChange={e => setSuggestionForm({ ...suggestionForm, category: e.target.value })}
                                            className="w-full bg-[#111] border border-white/20 rounded-xl p-4 text-white focus:border-[#00ffff] focus:outline-none transition-colors appearance-none"
                                        >
                                            {CATEGORIES.filter(c => c !== 'ALL').map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        disabled={suggestionStatus === 'submitting'}
                                        className="w-full bg-[#00ffff] text-black font-bold py-4 rounded-xl hover:bg-white transition-colors disabled:opacity-50 mt-4"
                                    >
                                        {suggestionStatus === 'submitting' ? 'TRANSMITTING...' : 'SUBMIT ENTRY'}
                                    </button>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* MASONRY GRID (Simulated with columns) */}
            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence mode='popLayout'>
                    {filteredWords.map((item, i) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            key={item.word}
                            onMouseEnter={() => {
                                new Audio('/sounds/metallic-click.mp3').play().catch(e => { });
                            }}
                            className="bg-[#0a0a0a] p-6 rounded-2xl border border-white/5 hover:border-[#00ffff]/50 transition-colors group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-100 transition-opacity">
                                <span className="text-[10px] font-mono border border-white/30 px-1 rounded text-white/50">{item.category}</span>
                            </div>

                            <h3 className="text-2xl font-black text-white mb-3 group-hover:text-[#00ffff] transition-colors">{item.word}</h3>
                            <p className="text-white/70 font-mono text-sm leading-relaxed border-l-2 border-white/10 pl-4 group-hover:border-[#00ffff] transition-colors">
                                {item.def}
                            </p>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* EMPTY STATE */}
            {filteredWords.length === 0 && (
                <div className="text-center py-20 text-white/30 font-mono">
                    NO ENTRIES FOUND IN THE AURA DATABASE.
                </div>
            )}
        </div>
    );
};

export default BrainrotDictionary;
