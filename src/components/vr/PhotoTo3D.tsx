import { useState } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface Interactive3DObjectProps {
    position: [number, number, number];
    type: "machine" | "tool" | "control_panel" | "equipment" | "door";
    name: string;
    onInteract: (name: string) => void;
}

const Interactive3DObject = ({ position, type, name, onInteract }: Interactive3DObjectProps) => {
    const [active, setActive] = useState(false);
    const [hovered, setHovered] = useState(false);

    const getObjectGeometry = () => {
        switch (type) {
            case "machine":
                return (
                    <group>
                        <mesh position={[0, 1, 0]} castShadow receiveShadow>
                            <boxGeometry args={[2, 2, 1.5]} />
                            <meshStandardMaterial
                                color={active ? "#10b981" : "#334155"}
                                metalness={0.8}
                                roughness={0.3}
                                emissive={active ? "#10b981" : "#000000"}
                                emissiveIntensity={active ? 0.5 : 0}
                            />
                        </mesh>
                        {/* Control Screen */}
                        <mesh position={[0, 1.8, 0.76]}>
                            <planeGeometry args={[1.5, 1]} />
                            <meshStandardMaterial
                                color="#0a0a0a"
                                emissive={active ? "#3b82f6" : "#000000"}
                                emissiveIntensity={active ? 0.8 : 0}
                            />
                        </mesh>
                        {/* Status Light */}
                        <mesh position={[0.8, 2.3, 0.76]}>
                            <sphereGeometry args={[0.08, 16, 16]} />
                            <meshStandardMaterial
                                color={active ? "#10b981" : "#ef4444"}
                                emissive={active ? "#10b981" : "#ef4444"}
                                emissiveIntensity={3}
                            />
                        </mesh>
                    </group>
                );

            case "control_panel":
                return (
                    <group>
                        <mesh castShadow>
                            <boxGeometry args={[1.2, 1.8, 0.3]} />
                            <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.2} />
                        </mesh>
                        <mesh position={[0, 0.3, 0.16]}>
                            <planeGeometry args={[1, 1.2]} />
                            <meshStandardMaterial
                                color="#1e293b"
                                emissive={active ? "#3b82f6" : "#000000"}
                                emissiveIntensity={active ? 1 : 0}
                            />
                        </mesh>
                        {/* Buttons */}
                        {[[-0.3, -0.6], [0, -0.6], [0.3, -0.6]].map(([x, y], i) => (
                            <mesh key={i} position={[x, y, 0.16]}>
                                <cylinderGeometry args={[0.08, 0.08, 0.05, 16]} />
                                <meshStandardMaterial
                                    color={active && i === 1 ? "#10b981" : "#dc2626"}
                                    emissive={active && i === 1 ? "#10b981" : "#dc2626"}
                                    emissiveIntensity={1}
                                />
                            </mesh>
                        ))}
                    </group>
                );

            case "tool":
                return (
                    <group>
                        <mesh castShadow rotation={[0, 0, Math.PI / 6]}>
                            <capsuleGeometry args={[0.08, 0.6, 8, 16]} />
                            <meshStandardMaterial
                                color="#94a3b8"
                                metalness={0.9}
                                roughness={0.1}
                                emissive={active ? "#3b82f6" : "#000000"}
                                emissiveIntensity={active ? 0.5 : 0}
                            />
                        </mesh>
                    </group>
                );

            case "equipment":
                return (
                    <group>
                        <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
                            <cylinderGeometry args={[0.6, 0.8, 1.6, 32]} />
                            <meshStandardMaterial
                                color="#64748b"
                                metalness={0.7}
                                roughness={0.3}
                            />
                        </mesh>
                        <mesh position={[0, 1.8, 0]}>
                            <sphereGeometry args={[0.4, 32, 32]} />
                            <meshStandardMaterial
                                color={active ? "#10b981" : "#475569"}
                                metalness={0.8}
                                roughness={0.2}
                                emissive={active ? "#10b981" : "#000000"}
                                emissiveIntensity={active ? 0.7 : 0}
                            />
                        </mesh>
                    </group>
                );

            case "door":
                return (
                    <group>
                        <mesh castShadow receiveShadow>
                            <boxGeometry args={[2, 3, 0.2]} />
                            <meshStandardMaterial
                                color="#334155"
                                metalness={0.6}
                                roughness={0.4}
                            />
                        </mesh>
                        {/* Door Handle */}
                        <mesh position={[0.7, 0, 0.15]} rotation={[0, 0, Math.PI / 2]}>
                            <capsuleGeometry args={[0.04, 0.3, 8, 16]} />
                            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
                        </mesh>
                        {/* Window */}
                        <mesh position={[0, 1, 0.11]}>
                            <planeGeometry args={[0.8, 1.2]} />
                            <meshStandardMaterial
                                color="#1e3a8a"
                                transparent
                                opacity={0.3}
                                emissive={active ? "#3b82f6" : "#000000"}
                                emissiveIntensity={active ? 0.5 : 0}
                            />
                        </mesh>
                    </group>
                );
        }
    };

    return (
        <group position={position}>
            <group
                onClick={(e) => {
                    e.stopPropagation();
                    setActive(!active);
                    onInteract(name);
                }}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    setHovered(true);
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                    setHovered(false);
                    document.body.style.cursor = 'auto';
                }}
            >
                {getObjectGeometry()}
            </group>

            {hovered && (
                <Html position={[0, type === "machine" ? 3 : type === "door" ? 3.5 : 1.5, 0]} center>
                    <div className="bg-black/90 text-white px-4 py-2 rounded-lg text-sm border border-primary shadow-lg pointer-events-none">
                        <div className="font-semibold">{name}</div>
                        <div className="text-xs text-white/60 mt-1">
                            {active ? "✓ Active" : "Click to activate"}
                        </div>
                    </div>
                </Html>
            )}

            {active && (
                <Html position={[0, type === "machine" ? 2.5 : 1, 0]} center>
                    <div className="bg-green-500/20 text-green-200 px-3 py-1 rounded text-xs border border-green-500 animate-pulse pointer-events-none">
                        RUNNING
                    </div>
                </Html>
            )}
        </group>
    );
};

export const PhotoTo3D = ({
    photoUrl,
    onTeleport
}: {
    photoUrl: string;
    onTeleport?: (point: THREE.Vector3) => void;
}) => {
    const [interactions, setInteractions] = useState<string[]>([]);

    const handleInteract = (name: string) => {
        setInteractions(prev => {
            if (prev.includes(name)) {
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.speak(new SpeechSynthesisUtterance(`${name} deactivated`));
                }
                return prev.filter(n => n !== name);
            } else {
                if ('speechSynthesis' in window) {
                    window.speechSynthesis.speak(new SpeechSynthesisUtterance(`${name} activated`));
                }
                return [...prev, name];
            }
        });
    };

    // Strategic positions for industrial objects in the photo space
    const objects: Interactive3DObjectProps[] = [
        // Front area machines
        { position: [-8, 0, 8], type: "machine", name: "CNC Lathe", onInteract: handleInteract },
        { position: [8, 0, 8], type: "machine", name: "Milling Machine", onInteract: handleInteract },

        // Control panels on walls
        { position: [-15, 1.5, 0], type: "control_panel", name: "Main Control", onInteract: handleInteract },
        { position: [15, 1.5, 0], type: "control_panel", name: "Safety System", onInteract: handleInteract },

        // Equipment around the space
        { position: [0, 0, 12], type: "equipment", name: "Air Compressor", onInteract: handleInteract },
        { position: [-10, 0, -8], type: "equipment", name: "Hydraulic Press", onInteract: handleInteract },
        { position: [10, 0, -8], type: "equipment", name: "Welding Station", onInteract: handleInteract },

        // Tools on workbenches
        { position: [-12, 0.9, 12], type: "tool", name: "Wrench Set", onInteract: handleInteract },
        { position: [-10, 0.9, 12], type: "tool", name: "Drill", onInteract: handleInteract },
        { position: [10, 0.9, 12], type: "tool", name: "Scanner", onInteract: handleInteract },
        { position: [12, 0.9, 12], type: "tool", name: "Caliper", onInteract: handleInteract },

        // Doors/exits
        { position: [0, 1.5, -18], type: "door", name: "Emergency Exit", onInteract: handleInteract },
    ];

    return (
        <group>
            {/* Photo Background - 360 Sphere */}
            <mesh scale={[-1, 1, 1]}>
                <sphereGeometry args={[500, 60, 40]} />
                <meshBasicMaterial side={THREE.BackSide}>
                    <primitive attach="map" object={new THREE.TextureLoader().load(photoUrl)} />
                </meshBasicMaterial>
            </mesh>

            {/* Interactive Floor with grid */}
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
                <planeGeometry args={[60, 60]} />
                <meshStandardMaterial
                    color="#1e293b"
                    roughness={0.8}
                    metalness={0.2}
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Safety Grid Lines */}
            <group position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                {[-15, -10, -5, 0, 5, 10, 15].map((pos, i) => (
                    <group key={i}>
                        <mesh position={[pos, 0, 0]}>
                            <planeGeometry args={[0.1, 60]} />
                            <meshBasicMaterial color="#eab308" transparent opacity={0.4} />
                        </mesh>
                        <mesh position={[0, pos, 0]}>
                            <planeGeometry args={[60, 0.1]} />
                            <meshBasicMaterial color="#eab308" transparent opacity={0.4} />
                        </mesh>
                    </group>
                ))}
            </group>

            {/* 3D Interactive Objects */}
            {objects.map((obj, index) => (
                <Interactive3DObject key={index} {...obj} />
            ))}

            {/* Workbenches */}
            <group position={[-11, 0.9, 12]}>
                <mesh castShadow>
                    <boxGeometry args={[5, 0.1, 2]} />
                    <meshStandardMaterial color="#6b7280" metalness={0.6} roughness={0.4} />
                </mesh>
                <mesh position={[0, -0.45, 0]}>
                    <boxGeometry args={[4.8, 0.9, 1.8]} />
                    <meshStandardMaterial color="#374151" />
                </mesh>
            </group>

            <group position={[11, 0.9, 12]}>
                <mesh castShadow>
                    <boxGeometry args={[5, 0.1, 2]} />
                    <meshStandardMaterial color="#6b7280" metalness={0.6} roughness={0.4} />
                </mesh>
                <mesh position={[0, -0.45, 0]}>
                    <boxGeometry args={[4.8, 0.9, 1.8]} />
                    <meshStandardMaterial color="#374151" />
                </mesh>
            </group>

            {/* Enhanced Lighting for 3D objects */}
            <pointLight position={[0, 8, 0]} intensity={0.5} castShadow />
            <pointLight position={[-10, 6, 10]} intensity={0.3} color="#3b82f6" />
            <pointLight position={[10, 6, 10]} intensity={0.3} color="#10b981" />
            <spotLight
                position={[0, 10, -10]}
                angle={0.5}
                penumbra={0.5}
                intensity={0.8}
                castShadow
                shadow-mapSize={[2048, 2048]}
            />

            {/* Progress Indicator */}
            <Html position={[0, 3, -17]} center>
                <div className="bg-black/90 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-lg">
                    <div className="text-sm font-semibold mb-2">Interactive Objects</div>
                    <div className="text-xs text-white/60">
                        {interactions.length} / {objects.length} activated
                    </div>
                    <div className="w-48 h-2 bg-white/10 rounded-full mt-2 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-primary to-green-500 transition-all duration-500"
                            style={{ width: `${(interactions.length / objects.length) * 100}%` }}
                        />
                    </div>
                </div>
            </Html>
        </group>
    );
};
