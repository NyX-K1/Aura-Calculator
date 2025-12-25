import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GoldParticles = () => {
    const meshRef = useRef();
    const count = 250;

    // Generate random positions and speeds
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 20; // Spread x
            const y = (Math.random() - 0.5) * 20; // Spread y
            const z = (Math.random() - 0.5) * 10; // Spread z
            const speed = Math.random() * 0.02 + 0.005;
            const factor = Math.random() * 0.5 + 0.5; // Size factor
            temp.push({ x, y, z, speed, factor, originalY: y });
        }
        return temp;
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state) => {
        if (!meshRef.current) return;

        particles.forEach((particle, i) => {
            // Update position - float up
            particle.y += particle.speed;
            if (particle.y > 10) particle.y = -10; // Reset to bottom if too high

            // Add some wobble
            const time = state.clock.getElapsedTime();
            particle.x += Math.sin(time * particle.speed + i) * 0.002;

            dummy.position.set(particle.x, particle.y, particle.z);
            dummy.scale.setScalar(particle.factor);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <circleGeometry args={[0.05, 16]} />
            <meshBasicMaterial color="#FFD700" transparent opacity={0.6} depthWrite={false} blending={THREE.AdditiveBlending} />
        </instancedMesh>
    );
};

export default GoldParticles;
