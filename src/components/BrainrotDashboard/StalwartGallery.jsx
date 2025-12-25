import { motion } from 'framer-motion';
import { useState } from 'react';

const STALWARTS = [
    { id: 'madara', name: 'MADARA', aura: 'INFINITY', color: '#ff0000', img: 'https://media1.tenor.com/m/K7vP9uYC81AAAAAd/madara-uchiha-naruto.gif' },
    { id: 'aizen', name: 'AIZEN', aura: 'PLANNED', color: '#a855f7', img: 'https://media1.tenor.com/m/C3c2f9d_iQAAAAAd/aizen-bleach.gif' },
    { id: 'gigachad', name: 'GIGACHAD', aura: 'PEAK', color: '#ffffff', img: 'https://media1.tenor.com/m/x8v1e5Dk3bYAAAAd/gigachad-chad.gif' },
    { id: 'itachi', name: 'ITACHI', aura: 'GENJUTSU', color: '#fda4af', img: 'https://media1.tenor.com/m/AyID_C4r7LgAAAAd/itachi-uchiha-naruto.gif' }
];

const StalwartGallery = () => {
    const [activeId, setActiveId] = useState(null);

    return (
        <div className="w-full h-64 relative flex items-center gap-8 overflow-x-auto overflow-y-hidden px-8 no-scrollbar z-20">
            {/* Background Text Overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none whitespace-nowrap">
                <span className="font-mono font-black text-[10rem] text-[#ffffff] opacity-[0.03] select-none">
                    {activeId ? STALWARTS.find(s => s.id === activeId)?.name : 'VAULT'}
                </span>
            </div>

            {STALWARTS.map((char) => (
                <motion.div
                    key={char.id}
                    onMouseEnter={() => setActiveId(char.id)}
                    onMouseLeave={() => setActiveId(null)}
                    className="relative flex-shrink-0 w-48 h-full group cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Image */}
                    <div
                        className="w-full h-full object-cover transition-all duration-500 ease-out"
                        style={{
                            backgroundImage: `url(${char.img})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: activeId === char.id ? 'grayscale(0%)' : 'grayscale(100%)',
                            opacity: activeId === char.id ? 1 : 0.5
                        }}
                    >
                        {/* Overlay Gradient for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                    </div>

                    {/* Border Glow on Hover */}
                    <div
                        className="absolute inset-0 border-2 transition-all duration-300"
                        style={{
                            borderColor: activeId === char.id ? char.color : 'transparent',
                            boxShadow: activeId === char.id ? `0 0 20px ${char.color}40` : 'none'
                        }}
                    ></div>

                    {/* Info */}
                    <div className="absolute bottom-4 left-4">
                        <h3 className="text-white font-mono font-bold text-lg tracking-wider">{char.name}</h3>
                        <p
                            className="font-mono text-xs font-bold transition-colors duration-300"
                            style={{ color: activeId === char.id ? char.color : '#666' }}
                        >
                            AURA: {char.aura}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default StalwartGallery;
