import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState } from 'react';
import * as THREE from 'three';

// A tiny particle cloud that appears on hover
const TwinkleCloud = ({ active }) => {
    const pointsRef = useRef();

    // Create random points
    const geometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        const count = 50;
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            // Spread randomly in a small area
            positions[i * 3] = (Math.random() - 0.5) * 3;     // x
            positions[i * 3 + 1] = (Math.random() - 0.5) * 1; // y
            positions[i * 3 + 2] = (Math.random() - 0.5) * 1; // z
            sizes[i] = Math.random();
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
        return geo;
    }, []);

    useFrame((state) => {
        if (!pointsRef.current) return;
        // Twinkle / Rotate
        pointsRef.current.rotation.y += 0.02;
        pointsRef.current.rotation.z += 0.01;

        // Pulse visibility if active
        // Actually we control visibility via parent, but maybe pulse scale
    });

    if (!active) return null;

    return (
        <points ref={pointsRef} geometry={geometry}>
            <pointsMaterial
                size={0.1}
                color="#FFD700" // Gold
                transparent
                opacity={0.8}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </points>
    );
};

const LinkWithTwinkle = ({ text, href }) => {
    const [hover, setHover] = useState(false);

    return (
        <a
            href={href}
            className="relative font-montserrat font-bold text-emerald-900 hover:text-emerald-700 transition-colors px-4 py-2"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {text}
            {/* R3F Overlay for this specific link? 
                Rendering a Canvas per link is heavy. 
                Optimized approach: Use CSS for the link text, 
                and a small persistent absolute Canvas for the particles if possible.
                Or just a tiny canvas. 
                Let's try a tiny canvas behind the text.
            */}
            {hover && (
                <div className="absolute inset-0 pointer-events-none -z-10 overflow-visible">
                    <Canvas camera={{ position: [0, 0, 2] }} gl={{ alpha: true }}>
                        <TwinkleCloud active={true} />
                    </Canvas>
                </div>
            )}
        </a>
    );
};

export default LinkWithTwinkle;
