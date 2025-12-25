import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';

// Shader Material Definition
const BeamMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorTop: new THREE.Color('#1A3021'),    // Deep Forest Green
        uColorBottom: new THREE.Color('#50C878'), // Bright Emerald
        uIntensity: 1.5,
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
    // Fragment Shader
    `
    uniform float uTime;
    uniform vec3 uColorTop;
    uniform vec3 uColorBottom;
    uniform float uIntensity;
    varying vec2 vUv;

    // Noise function
    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
        // vUv.y: 0 is bottom, 1 is top.
        
        // 1. SPREAD LOGIC
        float bottomFactor = 1.0 - vUv.y;
        
        // Exponential Flare:
        // Ultra thin at top/mid.
        // Base width 0.005 (Razor blade thin).
        // Flare spreads it to ~0.5 UV space (full width) at bottom.
        float flare = 1.0 + pow(bottomFactor, 4.0) * 80.0;
        
        float effectiveWidth = 0.005 * flare; 
        
        // 2. FRESNEL-LIKE FADE
        float centerDist = abs(vUv.x - 0.5);
        
        // Harder core at the top for "Sleekness"
        float horizontalFade = 1.0 - smoothstep(0.0, effectiveWidth, centerDist);
        horizontalFade = pow(horizontalFade, 2.0); 

        // 3. VERTICAL FADE
        float verticalFade = smoothstep(0.98, 0.8, vUv.y);

        // 4. ANIMATION
        float flow = uTime * 0.4;
        float shimmer = sin(vUv.y * 20.0 + flow * 5.0) * 0.1; 
        
        // 5. NOISE
        float noise = random(vec2(vUv.x, vUv.y + flow)) * 0.1;

        // COMBINE
        float alpha = horizontalFade * verticalFade * (1.0 + shimmer + noise);
        alpha *= uIntensity;

        // 6. COLOR GRADIENT
        vec3 color = mix(uColorBottom, uColorTop, vUv.y);
        
        alpha = clamp(alpha, 0.0, 1.0);

        gl_FragColor = vec4(color, alpha);
    }
  `
);

extend({ BeamMaterial });

const BeamShader = () => {
    const materialRef = useRef();

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uTime = state.clock.getElapsedTime();
        }
    });

    return (
        <mesh position={[0, -1, 0]} rotation={[0, 0, 0]}>
            <planeGeometry args={[25, 20]} />
            <beamMaterial
                ref={materialRef}
                transparent
                blending={THREE.NormalBlending}
                depthWrite={false}
            />
        </mesh>
    );
};

export default BeamShader;
