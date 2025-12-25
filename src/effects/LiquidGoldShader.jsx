import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const fragmentShader = `
void main() {
    vec2 p = 5. * (vUv - .5);
    vec2 i = p;
    float c = 0.0;
    float r = length(p + vec2(sin(uTime), sin(uTime * .222 + 99.)) * 1.5);
    float d = length(p);
    float rot = d + uTime + p.x * .15;
    for (float n = 0.0; n < 4.0; n++) {
        p *= mat2(cos(rot - sin(uTime / 4.)), sin(rot), -sin(cos(rot) - uTime), cos(rot)) * -0.15;
        float t = r - uTime / (n + 1.5);
        i -= p + vec2(cos(t - i.x - r) + sin(t + i.y), sin(t - i.y) + cos(t + i.x) + r);
        c += 1.0 / length(vec2((sin(i.x + t) / .15), (cos(i.y + t) / .15)));
    }
    c /= 4.0;
    gl_FragColor = vec4(vec3(c) * vec3(4.3, 3.4, 0.1) - 0.35, 1.0);
}
`;

const vertexShader = `
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const LiquidGoldShader = () => {
    const meshRef = useRef();

    // Uniforms must be memoized to avoid recreation on every render
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
        }),
        []
    );

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[100, 100]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
            />
        </mesh>
    );
};

export default LiquidGoldShader;
