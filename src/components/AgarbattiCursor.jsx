import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AgarbattiCursor = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [particles, setParticles] = useState([]);
    const frameRef = useRef(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setParticles((prev) => {
                const now = Date.now();
                // Filter out old particles (older than 2s)
                const kept = prev.filter(p => now - p.id < 2000);

                // Add new particle at current mouse pos
                // Only add if mouse moved or just periodically to create continuous smoke?
                // Continuous is better for agarbatti
                return [...kept, {
                    id: now,
                    x: mousePos.x,
                    y: mousePos.y,
                    // Random horizontal drift initial velocity
                    vx: (Math.random() - 0.5) * 2
                }];
            });
        }, 50); // Spawn every 50ms

        return () => clearInterval(interval);
    }, [mousePos]);

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {/* Glowing Orange Dot */}
            <div
                className="absolute w-2 h-2 rounded-full bg-[#FF8C00] shadow-[0_0_10px_#FF8C00] transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: mousePos.x, top: mousePos.y }}
            />

            {/* Smoke Particles */}
            <AnimatePresence>
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0.6, scale: 0.5, x: p.x, y: p.y }}
                        animate={{
                            opacity: 0,
                            scale: 2,
                            y: p.y - 100, // Move up
                            x: p.x + p.vx * 50 // Drift
                        }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute w-4 h-4 bg-gray-400 rounded-full blur-sm transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: 0, top: 0 }} // Positioning handled by initial/animate
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default AgarbattiCursor;
