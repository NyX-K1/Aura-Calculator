import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const BrainrotCursor = () => {
    // We need a history of mouse positions for the ghost trail
    // 3 ghosts, delayed by frames.
    // Framer motion Spring is good, but simple history queue is more "glitchy/accurate" to the request

    // Request: "simple 'ghosting' trail (3 frames of delay)"

    const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
    const historyRef = useRef([]); // Stores last N positions

    useEffect(() => {
        const handleMouseMove = (e) => {
            const newPos = { x: e.clientX, y: e.clientY };
            setMousePos(newPos);

            // Add to history
            historyRef.current.unshift(newPos);
            if (historyRef.current.length > 5) historyRef.current.pop();
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 mix-blend-difference">

            {/* Ghost 1 (Frame 1 delay) */}
            {historyRef.current[1] && (
                <div
                    className="absolute w-8 h-8 pointer-events-none opacity-60"
                    style={{
                        left: historyRef.current[1].x,
                        top: historyRef.current[1].y,
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#39FF14]" />
                    <div className="absolute left-1/2 top-0 h-full w-[2px] bg-[#39FF14]" />
                </div>
            )}

            {/* Ghost 2 (Frame 2 delay) */}
            {historyRef.current[2] && (
                <div
                    className="absolute w-8 h-8 pointer-events-none opacity-40"
                    style={{
                        left: historyRef.current[2].x,
                        top: historyRef.current[2].y,
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#39FF14]" />
                    <div className="absolute left-1/2 top-0 h-full w-[2px] bg-[#39FF14]" />
                </div>
            )}

            {/* Ghost 3 (Frame 3 delay) */}
            {historyRef.current[3] && (
                <div
                    className="absolute w-8 h-8 pointer-events-none opacity-20"
                    style={{
                        left: historyRef.current[3].x,
                        top: historyRef.current[3].y,
                        transform: 'translate(-50%, -50%)'
                    }}
                >
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#39FF14]" />
                    <div className="absolute left-1/2 top-0 h-full w-[2px] bg-[#39FF14]" />
                </div>
            )}

            {/* MAIN CURSOR (Current) */}
            <div
                className="absolute w-8 h-8 pointer-events-none"
                style={{
                    left: mousePos.x,
                    top: mousePos.y,
                    transform: 'translate(-50%, -50%)'
                }}
            >
                {/* Horizontal line */}
                <div className="absolute top-1/2 left-0 w-full h-[2px] bg-[#39FF14] shadow-[0_0_5px_#39FF14]" />
                {/* Vertical line */}
                <div className="absolute left-1/2 top-0 h-full w-[2px] bg-[#39FF14] shadow-[0_0_5px_#39FF14]" />
            </div>

        </div>
    );
};

export default BrainrotCursor;
