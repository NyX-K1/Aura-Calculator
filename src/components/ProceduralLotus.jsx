import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ProceduralLotus = () => {
    const groupRef = useRef();
    const [hovered, setHovered] = useState(false);

    useFrame((state) => {
        if (groupRef.current) {
            // Breathing animation: Reduced amplitude
            const t = state.clock.getElapsedTime();
            const frequency = (Math.PI * 2) / 8;
            const scale = 1 + Math.sin(t * frequency) * 0.01; // Reduced from 0.02 to 0.01 (Subtle)
            groupRef.current.scale.setScalar(scale);
        }
    });

    const material = new THREE.MeshPhysicalMaterial({
        color: '#ffffff',
        roughness: 0.1,
        metalness: 0.1,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
        transmission: 0.6,
        emissive: '#FFD700',
        emissiveIntensity: hovered ? 0.5 : 0.1
    });

    return (
        <group ref={groupRef}>
            {/* Center */}
            <mesh position={[0, 0.5, 0]} material={material}>
                <sphereGeometry args={[0.5, 32, 32]} />
            </mesh>

            {/* Inner Ring */}
            {[...Array(6)].map((_, i) => (
                <group key={`inner-${i}`} rotation={[0, (i / 6) * Math.PI * 2, 0]}>
                    <mesh rotation={[Math.PI / 4, 0, 0]} position={[0, 0, 0.8]} material={material}>
                        <coneGeometry args={[0.3, 1.5, 32]} />
                    </mesh>
                </group>
            ))}

            {/* Outer Ring */}
            {[...Array(8)].map((_, i) => (
                <group key={`outer-${i}`} rotation={[0, (i / 8) * Math.PI * 2, 0]}>
                    <mesh rotation={[Math.PI / 3, 0, 0]} position={[0, -0.2, 1.2]} material={material}>
                        <coneGeometry args={[0.4, 1.8, 32]} />
                    </mesh>
                </group>
            ))}
        </group>
    );
};

export default ProceduralLotus;
