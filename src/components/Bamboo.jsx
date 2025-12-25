const Bamboo = ({ position, height = 5, rotation = [0, 0, 0] }) => {
    // Stalk segments
    const segments = Math.floor(height * 2);

    return (
        <group position={position} rotation={rotation}>
            {[...Array(segments)].map((_, i) => (
                <group key={i} position={[0, i * 0.6, 0]}>
                    {/* Main stalk */}
                    <mesh position={[0, 0.25, 0]}>
                        <cylinderGeometry args={[0.1, 0.12, 0.5, 16]} />
                        <meshStandardMaterial color="#556b2f" roughness={0.4} />
                    </mesh>
                    {/* Joint */}
                    <mesh position={[0, 0.52, 0]}>
                        <torusGeometry args={[0.11, 0.02, 8, 16]} />
                        <meshStandardMaterial color="#3f5022" roughness={0.6} />
                    </mesh>
                </group>
            ))}
        </group>
    );
};

export default Bamboo;
