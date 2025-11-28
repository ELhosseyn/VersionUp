import { useTexture, MeshReflectorMaterial, Html } from "@react-three/drei";
import { useState } from "react";
import * as THREE from "three";
import { RoboticArm } from "./RoboticArm";

interface InteractiveMachineProps {
    position: [number, number, number];
    name: string;
    onInteract: (name: string) => void;
}

const InteractiveMachine = ({ position, name, onInteract }: InteractiveMachineProps) => {
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);

    return (
        <group position={position}>
            {/* Control Panel */}
            <mesh
                position={[0, 1.5, 0]}
                castShadow
                onClick={() => {
                    setActive(!active);
                    onInteract(name);
                }}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <boxGeometry args={[1.5, 2, 0.3]} />
                <meshStandardMaterial
                    color={active ? "#10b981" : "#334155"}
                    metalness={0.8}
                    roughness={0.2}
                    emissive={active ? "#10b981" : "#000000"}
                    emissiveIntensity={active ? 0.5 : 0}
                />
            </mesh>

            {/* Screen */}
            <mesh position={[0, 1.8, 0.16]}>
                <planeGeometry args={[1.2, 0.8]} />
                <meshStandardMaterial
                    color="#1a1a2e"
                    emissive={active ? "#16213e" : "#000000"}
                    emissiveIntensity={active ? 1 : 0}
                />
            </mesh>

            {/* Indicator Light */}
            <mesh position={[0.6, 2.3, 0.16]}>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshStandardMaterial
                    color={active ? "#10b981" : "#ef4444"}
                    emissive={active ? "#10b981" : "#ef4444"}
                    emissiveIntensity={2}
                />
            </mesh>

            {/* Base */}
            <mesh position={[0, 0.5, 0]} castShadow>
                <boxGeometry args={[1.5, 1, 0.5]} />
                <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.4} />
            </mesh>

            {/* Label */}
            {hovered && (
                <Html position={[0, 2.8, 0]} center>
                    <div className="bg-black/80 text-white px-3 py-1 rounded text-sm border border-green-500">
                        {name}
                    </div>
                </Html>
            )}
        </group>
    );
};

interface InteractiveToolProps {
    position: [number, number, number];
    type: "wrench" | "hammer" | "drill";
    onGrab: (type: string) => void;
}

const InteractiveTool = ({ position, type, onGrab }: InteractiveToolProps) => {
    const [grabbed, setGrabbed] = useState(false);

    const toolColors = {
        wrench: "#94a3b8",
        hammer: "#f59e0b",
        drill: "#3b82f6"
    };

    return (
        <group position={position}>
            <mesh
                castShadow
                onClick={() => {
                    setGrabbed(!grabbed);
                    onGrab(type);
                }}
                onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'grab'; }}
                onPointerOut={() => { document.body.style.cursor = 'auto'; }}
            >
                <capsuleGeometry args={[0.05, 0.4, 8, 16]} />
                <meshStandardMaterial
                    color={toolColors[type]}
                    metalness={0.9}
                    roughness={0.1}
                    emissive={grabbed ? toolColors[type] : "#000000"}
                    emissiveIntensity={grabbed ? 0.3 : 0}
                />
            </mesh>
            {grabbed && (
                <Html position={[0, 0.3, 0]} center>
                    <div className="bg-green-500/20 text-green-200 px-2 py-1 rounded text-xs border border-green-500 animate-pulse">
                        Using {type}
                    </div>
                </Html>
            )}
        </group>
    );
};

export const RealisticIndustrial = ({ onTeleport, showStructure = true }: { onTeleport?: (point: THREE.Vector3) => void, showStructure?: boolean }) => {
    const handleMachineInteract = (name: string) => {
        console.log(`Interacting with: ${name}`);
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(`${name} activated`);
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleToolGrab = (type: string) => {
        console.log(`Grabbed: ${type}`);
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(`Picked up ${type}`);
            window.speechSynthesis.speak(utterance);
        }
    };

    return (
        <group>
            {/* Industrial Floor with realistic concrete texture */}
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -0.05, 0]}
                receiveShadow
                onPointerDown={(e) => {
                    if (onTeleport) {
                        e.stopPropagation();
                        onTeleport(e.point);
                    }
                }}
            >
                <planeGeometry args={[80, 80]} />
                {showStructure ? (
                    <MeshReflectorMaterial
                        blur={[400, 100]}
                        resolution={1024}
                        mixBlur={1}
                        mixStrength={10}
                        roughness={0.8}
                        depthScale={1}
                        minDepthThreshold={0.4}
                        maxDepthThreshold={1.4}
                        color="#2d3748"
                        metalness={0.2}
                    />
                ) : (
                    <shadowMaterial transparent opacity={0.4} />
                )}
            </mesh>

            {/* Safety Lines (Yellow) */}
            <group position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                {[-10, 0, 10].map((z, i) => (
                    <mesh key={`line-h-${i}`} position={[0, z, 0]}>
                        <planeGeometry args={[80, 0.15]} />
                        <meshBasicMaterial color="#eab308" />
                    </mesh>
                ))}
                {[-10, 0, 10].map((x, i) => (
                    <mesh key={`line-v-${i}`} position={[x, 0, 0]}>
                        <planeGeometry args={[0.15, 80]} />
                        <meshBasicMaterial color="#eab308" />
                    </mesh>
                ))}
            </group>

            {showStructure && (
                <>
                    {/* Walls */}
                    <group>
                        <mesh position={[0, 12, -40]} receiveShadow>
                            <planeGeometry args={[80, 24]} />
                            <meshStandardMaterial color="#1a202c" metalness={0.3} roughness={0.7} />
                        </mesh>
                        <mesh position={[0, 12, 40]} rotation={[0, Math.PI, 0]} receiveShadow>
                            <planeGeometry args={[80, 24]} />
                            <meshStandardMaterial color="#1a202c" metalness={0.3} roughness={0.7} />
                        </mesh>
                        <mesh position={[-40, 12, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
                            <planeGeometry args={[80, 24]} />
                            <meshStandardMaterial color="#1a202c" metalness={0.3} roughness={0.7} />
                        </mesh>
                        <mesh position={[40, 12, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
                            <planeGeometry args={[80, 24]} />
                            <meshStandardMaterial color="#1a202c" metalness={0.3} roughness={0.7} />
                        </mesh>
                    </group>

                    {/* Ceiling with Industrial Lights */}
                    <group position={[0, 22, 0]}>
                        {[...Array(6)].map((_, i) => (
                            <group key={`ceiling-${i}`} position={[(i - 2.5) * 12, 0, 0]}>
                                <mesh>
                                    <boxGeometry args={[10, 0.3, 80]} />
                                    <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
                                </mesh>
                                {/* Industrial Light Fixtures */}
                                {[-20, -10, 0, 10, 20].map((z, j) => (
                                    <mesh key={`light-${j}`} position={[0, -0.5, z]}>
                                        <cylinderGeometry args={[0.5, 0.5, 0.2, 16]} />
                                        <meshStandardMaterial
                                            color="#ffffff"
                                            emissive="#ffffff"
                                            emissiveIntensity={2}
                                        />
                                    </mesh>
                                ))}
                            </group>
                        ))}
                    </group>

                    {/* Pipes and Infrastructure */}
                    <group position={[0, 3, -39]}>
                        {[0, 2, 4].map((y, i) => (
                            <mesh key={`pipe-${i}`} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
                                <cylinderGeometry args={[0.15, 0.15, 80, 16]} />
                                <meshStandardMaterial color="#71717a" metalness={0.9} roughness={0.1} />
                            </mesh>
                        ))}
                    </group>
                </>
            )}

            {/* Interactive Machines */}
            <InteractiveMachine
                position={[-15, 0, -10]}
                name="CNC Machine"
                onInteract={handleMachineInteract}
            />
            <InteractiveMachine
                position={[-15, 0, 5]}
                name="Welding Station"
                onInteract={handleMachineInteract}
            />
            <InteractiveMachine
                position={[15, 0, -10]}
                name="Assembly Robot"
                onInteract={handleMachineInteract}
            />
            <InteractiveMachine
                position={[15, 0, 5]}
                name="Quality Control"
                onInteract={handleMachineInteract}
            />

            {/* Tool Workbench */}
            <group position={[-25, 0, 15]}>
                <mesh position={[0, 0.9, 0]} castShadow>
                    <boxGeometry args={[4, 0.1, 2]} />
                    <meshStandardMaterial color="#6b7280" metalness={0.7} roughness={0.3} />
                </mesh>
                <mesh position={[0, 0.45, 0]}>
                    <boxGeometry args={[3.8, 0.9, 1.8]} />
                    <meshStandardMaterial color="#374151" />
                </mesh>

                {/* Tools on bench */}
                <InteractiveTool position={[-1.2, 1, 0]} type="wrench" onGrab={handleToolGrab} />
                <InteractiveTool position={[0, 1, 0.3]} type="hammer" onGrab={handleToolGrab} />
                <InteractiveTool position={[1.2, 1, -0.2]} type="drill" onGrab={handleToolGrab} />
            </group>

            {/* Industrial Storage Containers */}
            <group position={[25, 2, 15]}>
                {[0, 2.5, 5].map((offset, i) => (
                    <mesh key={`container-${i}`} position={[0, 0, offset]} castShadow receiveShadow>
                        <boxGeometry args={[3, 4, 2]} />
                        <meshStandardMaterial
                            color={i % 2 === 0 ? "#dc2626" : "#2563eb"}
                            metalness={0.4}
                            roughness={0.6}
                        />
                    </mesh>
                ))}
            </group>

            {/* Emergency Equipment */}
            <group position={[-38, 1.5, -20]}>
                <mesh castShadow>
                    <cylinderGeometry args={[0.2, 0.2, 1.5, 16]} />
                    <meshStandardMaterial color="#dc2626" emissive="#dc2626" emissiveIntensity={0.2} />
                </mesh>
                <Html position={[0, 1, 0]} center>
                    <div className="bg-red-500/20 text-red-200 px-2 py-1 rounded text-xs border border-red-500">
                        Fire Extinguisher
                    </div>
                </Html>
            </group>

            {/* First Aid Station */}
            <group position={[-38, 1.5, 20]}>
                <mesh castShadow>
                    <boxGeometry args={[0.5, 0.5, 0.2]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>
                <mesh position={[0, 0, 0.11]}>
                    <planeGeometry args={[0.3, 0.05]} />
                    <meshStandardMaterial color="#dc2626" />
                </mesh>
                <mesh position={[0, 0, 0.11]}>
                    <planeGeometry args={[0.05, 0.3]} />
                    <meshStandardMaterial color="#dc2626" />
                </mesh>
                <Html position={[0, 0.5, 0]} center>
                    <div className="bg-white/20 text-white px-2 py-1 rounded text-xs border border-white">
                        First Aid
                    </div>
                </Html>
            </group>

            {/* Caution Signs */}
            {[[10, 0, -20], [-10, 0, 20]].map((pos, i) => (
                <group key={`sign-${i}`} position={pos as [number, number, number]}>
                    <mesh position={[0, 1.5, 0]} castShadow>
                        <boxGeometry args={[0.05, 2, 1.5]} />
                        <meshStandardMaterial color="#eab308" />
                    </mesh>
                    <Html position={[0, 1.5, 0]} center>
                        <div className="bg-yellow-500/90 text-black px-3 py-2 rounded font-bold text-sm border-2 border-black">
                            ⚠️ CAUTION<br />Safety First
                        </div>
                    </Html>
                </group>
            ))}
        </group>
    );
};
