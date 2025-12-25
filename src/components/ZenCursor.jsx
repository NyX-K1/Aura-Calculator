import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Updated: "Calm Leaf" Cursor
// Fix: Darkened Color (#2E8B57)
const ZenCursor = () => {
    const meshRef = useRef();

    // Leaf Shape Geometry
    const leafGeometry = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.quadraticCurveTo(0.2, 0.2, 0.5, 0);
        shape.quadraticCurveTo(0.2, -0.2, 0, 0);
        return new THREE.ShapeGeometry(shape);
    }, []);

    useFrame((state) => {
        if (!meshRef.current) return;

        // Pointer: -1 to +1 relative to Canvas
        const { pointer, camera } = state;
        const vector = new THREE.Vector3(pointer.x, pointer.y, 0);
        vector.unproject(camera);

        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const worldPos = camera.position.clone().add(dir.multiplyScalar(distance));

        // Smooth follow
        meshRef.current.position.lerp(worldPos, 0.2);

        // Gentle rotation
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime) * 0.2 + (pointer.x * 0.5);
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} geometry={leafGeometry}>
            {/* Darkened Green: #2E8B57 (SeaGreen) with slightly higher opacity */}
            <meshBasicMaterial color="#2E8B57" transparent opacity={0.8} side={THREE.DoubleSide} />
        </mesh>
    );
};

export default ZenCursor;
