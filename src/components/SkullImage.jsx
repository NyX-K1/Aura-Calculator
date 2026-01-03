import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import * as THREE from 'three';

const SkullImage = ({
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = [4, 4, 1],
    variant = 'interactive' // 'interactive' | 'stone'
}) => {
    const groupRef = useRef();
    const imageRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            if (variant === 'interactive') {
                // Interactive: Aggressive look-at
                const targetRotY = state.pointer.x * (45 * Math.PI / 180);
                const targetRotX = -state.pointer.y * (45 * Math.PI / 180);
                groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.15);
                groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.15);
            } else if (variant === 'stone') {
                // Stone: Dampened, slight movement
                // Use sine wave for breathing/heavy feel? Or just very slow tracking?
                // Request says: "Keep the lookAt logic, but dampen the speed so it feels heavier"
                const targetRotY = state.pointer.x * (10 * Math.PI / 180); // Less range
                const targetRotX = -state.pointer.y * (10 * Math.PI / 180);

                // Very slow interpolation for weight
                groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY + rotation[1], 0.02);
                groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX + rotation[0], 0.02);
            }
        }
    });

    return (
        <group ref={groupRef} position={position} rotation={variant === 'interactive' ? [0, 0, 0] : rotation}>
            <Image
                ref={imageRef}
                url="/images/skull.png"
                scale={scale}
                transparent
                toneMapped={false}
                color={variant === 'stone' ? '#888888' : '#ffffff'} // Tint grey for stone look
            />
        </group>
    );
};

export default SkullImage;
