import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

const ZenMaterial = shaderMaterial(
    {
        uTime: 0,
        uResolution: new THREE.Vector2(),
        uHover: 0.0,
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

    void main() {
        vec2 uv = vUv;
        vec2 p = (uv - 0.5) * 2.0; 

        // RIPPLE LOGIC for Garden Floor
        float t = uTime;

        float dist = length(p);
        float ripple = sin(dist * 10.0 - t * 2.0) * 0.02;
        
        p += ripple;
        
        // Organic flow
        for(float i = 1.0; i < 3.0; i++){
            p.x += 0.3 / i * sin(i * 3.0 * p.y + t);
            p.y += 0.2 / i * cos(i * 3.0 * p.x + t);
        }

        // Material Feel
        vec3 whiteBase = vec3(0.97, 0.97, 0.95);
        vec3 deepBronze = vec3(0.6, 0.4, 0.1);
        vec3 champagneGold = vec3(1.0, 0.9, 0.6);
        vec3 gold = mix(deepBronze, champagneGold, 0.5 + 0.5 * sin(t * 2.0 + p.x + p.y));

        float basePattern = sin(p.x + p.y) * 0.5 + 0.5;
        float pattern = smoothstep(0.48, 0.52, basePattern);
        
        float glint = pow(max(0.0, sin(uv.x * 300.0 + t) * sin(uv.y * 300.0 + t * 0.5)), 40.0);
        float shimmer = pow(max(0.0, sin(p.x * 2.0 - t * 2.0)), 20.0);

        vec3 color = mix(whiteBase, gold, pattern);
        color += champagneGold * glint * 2.0 * pattern; 
        color += champagneGold * shimmer * 0.3;
        color += whiteBase * smoothstep(0.0, 0.1, ripple) * 0.1;
        color *= 1.0 - length(uv - 0.5) * 0.3;

        gl_FragColor = vec4(color, 1.0);
    }
  `
);

extend({ ZenMaterial });

const ZenShader = ({ hoverSpeed = 0 }) => {
    const materialRef = useRef();
    const { viewport } = useThree();

    useFrame((state, delta) => {
        if (materialRef.current) {
            // Speed Control: Reduced to 0.25 (User requested "balance" but reported 0.4 didn't reduce enough)
            // Using DELTA time accumulation for smoother, reliable speed changes
            const baseSpeed = 0.25;
            const multiplier = hoverSpeed ? 1.5 : 1.0;

            // Increment uTime by the delta * speed
            // This ensures meaningful speed reduction even if elapsedTime is large
            materialRef.current.uTime += delta * baseSpeed * multiplier;

            materialRef.current.uResolution.set(state.size.width, state.size.height);
        }
    });

    return (
        <mesh scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1]} />
            <zenMaterial ref={materialRef} />
        </mesh>
    );
};

export default ZenShader;
