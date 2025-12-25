import { Canvas } from '@react-three/fiber';
import { ContactShadows, Html, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ZenShader from '../effects/ZenShader';
import ProceduralLotus from './ProceduralLotus';
import SkullImage from './SkullImage';
import ZenCursor from './ZenCursor';

const ZenGarden = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="relative w-full h-full bg-[#fdfdf0] overflow-hidden">

            {/* Canvas Environment */}
            <div className="absolute inset-0 z-0">
                <Canvas
                    shadows
                    camera={{ position: [0, 2, 6], fov: 45 }}
                    style={{ width: '100%', height: '100%', position: 'absolute' }}
                    resize={{ debounce: 0 }}
                >
                    {/* Lighting */}
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} />

                    {/* Floor Shader */}
                    {/* Render order: Background first */}
                    <group position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[2, 2, 1]}>
                        <ZenShader />
                    </group>

                    {/* Central Lotus */}
                    <group position={[0, 0, 0]}>
                        <ProceduralLotus />
                        <ContactShadows opacity={0.5} scale={10} blur={2} far={10} resolution={256} color="#000000" />

                        {/* Navigation Labels in 3D Space */}
                        <Html position={[0, -1, 1.5]} center transform>
                            <div className="flex gap-16 font-serif text-[#C5A035] text-sm pointer-events-auto items-center">
                                {/* Thin elegant serif, 0.4em tracking */}
                                <button className="hover:text-[#FFD700] transition-colors duration-300 font-thin tracking-[0.4em]">
                                    REFLECT
                                </button>
                                <button
                                    className="hover:text-[#FFD700] transition-colors duration-300 font-thin tracking-[0.4em]"
                                    onClick={() => setShowModal(true)}
                                >
                                    CALCULATE
                                </button>
                                <button className="hover:text-[#FFD700] transition-colors duration-300 font-thin tracking-[0.4em]">
                                    BREATHE
                                </button>
                            </div>
                        </Html>
                    </group>

                    {/* Stone Skull */}
                    <SkullImage
                        position={[-3, -0.2, -2]}
                        rotation={[0, Math.PI / 4, 0]}
                        scale={[3, 3, 1]}
                        variant="stone"
                    />
                    <ContactShadows position={[-3, -0.5, -2]} opacity={0.6} scale={5} blur={2.5} far={10} color="#000000" />

                    {/* Cursor inside Canvas */}
                    <ZenCursor />

                </Canvas>
            </div>

            {/* Aura Input Modal */}
            {showModal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-white/50 w-96 relative"
                    >
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                        >
                            ✕
                        </button>
                        <h3 className="text-center font-serif text-[#C5A035] text-xl mb-6 tracking-widest font-thin">ENTER YOUR AURA</h3>
                        <input
                            type="text"
                            placeholder="Type here..."
                            className="w-full bg-white/50 border border-[#C5A035]/30 rounded-lg px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-[#C5A035] transition-colors mb-6 text-center font-serif tracking-widest"
                        />
                        <button className="w-full bg-gradient-to-r from-[#C5A035] to-[#FFD700] text-white font-serif py-3 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 tracking-[0.2em]"
                            onClick={() => setShowModal(false)}
                        >
                            CALCULATE
                        </button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default ZenGarden;
