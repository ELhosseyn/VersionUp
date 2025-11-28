
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles, Html, useCursor } from "@react-three/drei";
import * as THREE from "three";

interface SafetyModuleProps {
    active: boolean;
    onComplete: () => void;
    onProgress: (message: string) => void;
}

export const SafetyModule = ({ active, onComplete, onProgress }: SafetyModuleProps) => {
    const [hazards, setHazards] = useState({ fire: true, leak: true, valve: true });
    const [hovered, setHover] = useState(false);
    useCursor(hovered);

    const handleFix = (type: 'fire' | 'leak' | 'valve') => {
        if (!active || !hazards[type]) return;

        const newHazards = { ...hazards, [type]: false };
        setHazards(newHazards);

        let msg = "";
        if (type === 'fire') msg = "Fire extinguished! Good job.";
        if (type === 'leak') msg = "Gas leak sealed. Air quality stabilizing.";
        if (type === 'valve') msg = "Valve tightened. Pressure normalizing.";

        onProgress(msg);

        if (!newHazards.fire && !newHazards.leak && !newHazards.valve) {
            onComplete();
        }
    };

    return (
        <group position={[0, 0, 0]}>
            {/* Industrial Tank Structure */}
            <group position={[0, 0, 0]}>
                {/* Main Body */}
                <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
                    <cylinderGeometry args={[1.2, 1.2, 3, 32]} />
                    <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Top Cap */}
                <mesh position={[0, 3, 0]} castShadow>
                    <sphereGeometry args={[1.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Bottom Cap */}
                <mesh position={[0, 0, 0]} castShadow>
                    <cylinderGeometry args={[1.4, 1.4, 0.2, 32]} />
                    <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
                </mesh>

                {/* Pipes */}
                <mesh position={[-1, 2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                    <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
                    <meshStandardMaterial color="#64748b" metalness={0.7} roughness={0.3} />
                </mesh>
                <mesh position={[1, 1, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                    <cylinderGeometry args={[0.15, 0.15, 1, 16]} />
                    <meshStandardMaterial color="#64748b" metalness={0.7} roughness={0.3} />
                </mesh>
            </group>

            {/* Hazard 1: Chemical Fire */}
            {hazards.fire && (
                <group
                    position={[1.2, 0.2, 0.5]}
                    onClick={() => handleFix('fire')}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                >
                    {/* Fire Core */}
                    <mesh>
                        <sphereGeometry args={[0.3, 16, 16]} />
                        <meshStandardMaterial color="#ef4444" emissive="#f97316" emissiveIntensity={3} transparent opacity={0.8} />
                    </mesh>
                    {/* Fire Particles */}
                    <Sparkles
                        count={50}
                        scale={1.5}
                        size={4}
                        speed={0.4}
                        opacity={1}
                        color="#fbbf24"
                        noise={1}
                    />
                    <Sparkles
                        count={30}
                        scale={1}
                        size={6}
                        speed={0.6}
                        opacity={0.8}
                        color="#ef4444"
                        noise={0.5}
                    />
                    {/* Label */}
                    <Html position={[0, 0.6, 0]} center distanceFactor={6} transform>
                        <div className="bg-red-950/80 border border-red-500 text-red-200 px-3 py-1 rounded-lg text-sm font-bold animate-pulse whitespace-nowrap backdrop-blur-sm">
                            ⚠️ EXTINGUISH FIRE
                        </div>
                    </Html>
                </group>
            )}

            {/* Hazard 2: Gas Leak */}
            {hazards.leak && (
                <group
                    position={[-1.4, 2, 0]}
                    onClick={() => handleFix('leak')}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                >
                    {/* Leaking Joint */}
                    <mesh rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.2, 0.2, 0.3, 16]} />
                        <meshStandardMaterial color="#22c55e" transparent opacity={0.4} />
                    </mesh>
                    {/* Gas Particles */}
                    <Sparkles
                        count={60}
                        scale={[1, 2, 1]}
                        size={3}
                        speed={1}
                        opacity={0.6}
                        color="#86efac"
                        position={[0, 0.5, 0]}
                    />
                    <Html position={[0, 0.8, 0]} center distanceFactor={6} transform>
                        <div className="bg-green-950/80 border border-green-500 text-green-200 px-3 py-1 rounded-lg text-sm font-bold animate-pulse whitespace-nowrap backdrop-blur-sm">
                            ⚠️ SEAL LEAK
                        </div>
                    </Html>
                </group>
            )}

            {/* Hazard 3: Loose Valve */}
            {hazards.valve && (
                <group
                    position={[0, 1.5, 1.3]}
                    onClick={() => handleFix('valve')}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                >
                    <ValveModel />
                    <Html position={[0, 0.6, 0]} center distanceFactor={6} transform>
                        <div className="bg-yellow-950/80 border border-yellow-500 text-yellow-200 px-3 py-1 rounded-lg text-sm font-bold animate-pulse whitespace-nowrap backdrop-blur-sm">
                            ⚠️ TIGHTEN VALVE
                        </div>
                    </Html>
                </group>
            )}
        </group>
    );
};

const ValveModel = () => {
    const meshRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (meshRef.current) {
            // Wobble effect to show it's loose
            meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 10) * 0.1;
        }
    });

    return (
        <group ref={meshRef} rotation={[Math.PI / 2, 0, 0]}>
            {/* Valve Stem */}
            <mesh position={[0, -0.2, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 0.4, 16]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.8} />
            </mesh>
            {/* Valve Wheel */}
            <mesh>
                <torusGeometry args={[0.3, 0.05, 16, 32]} />
                <meshStandardMaterial color="#eab308" metalness={0.6} roughness={0.4} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]}>
                <boxGeometry args={[0.6, 0.05, 0.05]} />
                <meshStandardMaterial color="#eab308" metalness={0.6} roughness={0.4} />
            </mesh>
            <mesh>
                <boxGeometry args={[0.6, 0.05, 0.05]} />
                <meshStandardMaterial color="#eab308" metalness={0.6} roughness={0.4} />
            </mesh>
        </group>
    );
};
