
import { MeshReflectorMaterial, useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

export const ModernHangar = ({ onTeleport }: { onTeleport?: (point: THREE.Vector3) => void }) => {
    return (
        <group>
            {/* Reflective Floor */}
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
                <planeGeometry args={[50, 50]} />
                <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={1024}
                    mixBlur={1}
                    mixStrength={40}
                    roughness={0.5}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#1e293b"
                    metalness={0.5}
                    mirror={0.5}
                />
            </mesh>

            {/* Safety Lines (Yellow Stripes) */}
            <group position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                {/* Central Walkway */}
                <mesh position={[-3, 0, 0]}>
                    <planeGeometry args={[0.2, 50]} />
                    <meshBasicMaterial color="#eab308" />
                </mesh>
                <mesh position={[3, 0, 0]}>
                    <planeGeometry args={[0.2, 50]} />
                    <meshBasicMaterial color="#eab308" />
                </mesh>

                {/* Module Zones */}
                <mesh position={[-6, 0, 0]}>
                    <ringGeometry args={[1.8, 2, 32]} />
                    <meshBasicMaterial color="#eab308" />
                </mesh>
                <mesh position={[6, 0, 0]}>
                    <ringGeometry args={[1.8, 2, 32]} />
                    <meshBasicMaterial color="#eab308" />
                </mesh>
            </group>

            {/* Walls with Emissive Strips */}
            <group>
                <mesh position={[0, 10, -25]} receiveShadow>
                    <planeGeometry args={[50, 20]} />
                    <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Emissive Strip Back */}
                <mesh position={[0, 5, -24.9]}>
                    <planeGeometry args={[50, 0.5]} />
                    <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
                </mesh>

                <mesh position={[0, 10, 25]} rotation={[0, Math.PI, 0]} receiveShadow>
                    <planeGeometry args={[50, 20]} />
                    <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
                </mesh>

                <mesh position={[-25, 10, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
                    <planeGeometry args={[50, 20]} />
                    <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Emissive Strip Left */}
                <mesh position={[-24.9, 5, 0]} rotation={[0, Math.PI / 2, 0]}>
                    <planeGeometry args={[50, 0.5]} />
                    <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
                </mesh>

                <mesh position={[25, 10, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
                    <planeGeometry args={[50, 20]} />
                    <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.2} />
                </mesh>
                {/* Emissive Strip Right */}
                <mesh position={[24.9, 5, 0]} rotation={[0, -Math.PI / 2, 0]}>
                    <planeGeometry args={[50, 0.5]} />
                    <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
                </mesh>
            </group>

            {/* Ceiling Structure */}
            <group position={[0, 18, 0]}>
                {/* Main Trusses */}
                {[...Array(6)].map((_, i) => (
                    <group key={i} position={[0, 0, (i - 2.5) * 10]}>
                        <mesh rotation={[0, 0, Math.PI / 2]}>
                            <boxGeometry args={[2, 0.5, 50]} />
                            <meshStandardMaterial color="#334155" metalness={0.8} />
                        </mesh>
                        {/* Lights on Trusses */}
                        <mesh position={[0, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
                            <planeGeometry args={[48, 0.2]} />
                            <meshStandardMaterial color="white" emissive="white" emissiveIntensity={1.5} />
                        </mesh>
                    </group>
                ))}
            </group>

            {/* Decorative Props - Crates */}
            <group position={[-15, 1.5, -15]}>
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[3, 3, 3]} />
                    <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.7} />
                </mesh>
                <mesh position={[0, 3, 0]} castShadow receiveShadow>
                    <boxGeometry args={[3, 3, 3]} />
                    <meshStandardMaterial color="#334155" metalness={0.5} roughness={0.7} />
                </mesh>
                <mesh position={[3.5, 0, 0]} castShadow receiveShadow>
                    <boxGeometry args={[3, 3, 3]} />
                    <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.7} />
                </mesh>
            </group>

            <group position={[15, 1.5, 15]} rotation={[0, -Math.PI / 4, 0]}>
                <mesh castShadow receiveShadow>
                    <boxGeometry args={[2, 2, 4]} />
                    <meshStandardMaterial color="#64748b" metalness={0.6} roughness={0.4} />
                </mesh>
            </group>
        </group>
    );
};
