import { useRef } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';

const BrainrotMaterial = shaderMaterial(
    {
        uTime: 0,
        uResolution: new THREE.Vector2(),
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment Shader
    `
    uniform float uTime;
    uniform vec2 uResolution;
    varying vec2 vUv;

    // BRAINROT MODE: Sensory Overload
    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    void main() {
        vec2 uv = vUv;
        
        float t = uTime * 20.0;
        
        // Chaotic Grid Glitch
        vec2 gridUv = floor(uv * 20.0);
        float noise = hash(gridUv + floor(t));
        
        // RGB Split / Aberration
        float r = hash(uv + t * 0.01);
        float g = hash(uv + t * 0.01 + 0.1);
        float b = hash(uv + t * 0.01 + 0.2);
        
        // Flashing background colors
        vec3 bg = 0.5 + 0.5 * cos(uTime * 10.0 + uv.xyx + vec3(0, 2, 4));
        
        // Invert sections randomly
        if(noise > 0.8) bg = 1.0 - bg;
        
        // Add "strobe" lines
        float lines = step(0.9, sin(uv.y * 100.0 + t));
        bg += lines * vec3(1.0, 0.0, 1.0);

        // Final chaotic output
        gl_FragColor = vec4(bg * vec3(r, g, b), 1.0);
    }
  `
);

extend({ BrainrotMaterial });

const BrainrotShader = () => {
    const materialRef = useRef();
    const { viewport } = useThree();

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uTime = state.clock.getElapsedTime();
            materialRef.current.uResolution.set(state.size.width, state.size.height);
        }
    });

    return (
        <mesh scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <brainrotMaterial ref={materialRef} />
        </mesh>
    );
};

export default BrainrotShader;
