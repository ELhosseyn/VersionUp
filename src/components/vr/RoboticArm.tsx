import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";

interface RoboticArmProps {
    position: [number, number, number];
    onInteract?: () => void;
}

export const RoboticArm = ({ position, onInteract }: RoboticArmProps) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationPhase, setAnimationPhase] = useState(0);
    const [hovered, setHovered] = useState(false);

    // Refs for joints
    const baseRef = useRef<THREE.Group>(null);
    const joint1Ref = useRef<THREE.Group>(null);
    const joint2Ref = useRef<THREE.Group>(null);
    const joint3Ref = useRef<THREE.Group>(null);
    const endEffectorRef = useRef<THREE.Group>(null);

    // Animation state
    const animationTime = useRef(0);

    useFrame((state, delta) => {
        if (!isAnimating) return;

        animationTime.current += delta;

        // Simple pick and place animation
        const time = animationTime.current;
        const speed = 2;

        if (animationPhase === 0) {
            // Move to pickup position
            if (joint1Ref.current) joint1Ref.current.rotation.y = Math.sin(time * speed) * 0.5;
            if (joint2Ref.current) joint2Ref.current.rotation.z = Math.sin(time * speed * 0.8) * 0.3;
            if (joint3Ref.current) joint3Ref.current.rotation.z = Math.sin(time * speed * 0.6) * 0.2;

            if (time > 2) {
                setAnimationPhase(1);
                animationTime.current = 0;
            }
        } else if (animationPhase === 1) {
            // Close gripper
            if (endEffectorRef.current) {
                const gripperRotation = Math.min(time * 2, 0.3);
                endEffectorRef.current.children.forEach((child, index) => {
                    if (index > 0) { // Skip the base cylinder
                        child.rotation.z = index % 2 === 1 ? gripperRotation : -gripperRotation;
                    }
                });
            }

            if (time > 1) {
                setAnimationPhase(2);
                animationTime.current = 0;
            }
        } else if (animationPhase === 2) {
            // Move to place position
            if (joint1Ref.current) joint1Ref.current.rotation.y = Math.sin(time * speed + Math.PI) * 0.5;
            if (joint2Ref.current) joint2Ref.current.rotation.z = Math.sin(time * speed * 0.8 + Math.PI) * 0.3;
            if (joint3Ref.current) joint3Ref.current.rotation.z = Math.sin(time * speed * 0.6 + Math.PI) * 0.2;

            if (time > 2) {
                setAnimationPhase(3);
                animationTime.current = 0;
            }
        } else if (animationPhase === 3) {
            // Open gripper
            if (endEffectorRef.current) {
                const gripperRotation = Math.max(0.3 - time * 2, 0);
                endEffectorRef.current.children.forEach((child, index) => {
                    if (index > 0) { // Skip the base cylinder
                        child.rotation.z = index % 2 === 1 ? gripperRotation : -gripperRotation;
                    }
                });
            }

            if (time > 1) {
                setIsAnimating(false);
                setAnimationPhase(0);
                animationTime.current = 0;
            }
        }
    });

    const handleClick = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            if (onInteract) onInteract();
        }
    };

    return (
        <group position={position}>
            {/* Base */}
            <group ref={baseRef}>
                <mesh castShadow receiveShadow>
                    <cylinderGeometry args={[0.8, 0.8, 0.3, 32]} />
                    <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
                </mesh>
                <mesh position={[0, 0.2, 0]} castShadow>
                    <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
                    <meshStandardMaterial color="#4b5563" metalness={0.9} roughness={0.1} />
                </mesh>

                {/* Joint 1 */}
                <group ref={joint1Ref} position={[0, 0.3, 0]}>
                    <mesh castShadow>
                        <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
                        <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.3} />
                    </mesh>

                    {/* Link 1 */}
                    <mesh position={[0, 0.8, 0]} castShadow>
                        <cylinderGeometry args={[0.15, 0.15, 1.6, 16]} />
                        <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.1} />
                    </mesh>

                    {/* Joint 2 */}
                    <group ref={joint2Ref} position={[0, 1.6, 0]}>
                        <mesh castShadow>
                            <cylinderGeometry args={[0.35, 0.35, 0.2, 32]} />
                            <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.3} />
                        </mesh>

                        {/* Link 2 */}
                        <mesh position={[0, 0.7, 0]} castShadow>
                            <cylinderGeometry args={[0.12, 0.12, 1.4, 16]} />
                            <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.1} />
                        </mesh>

                        {/* Joint 3 */}
                        <group ref={joint3Ref} position={[0, 1.4, 0]}>
                            <mesh castShadow>
                                <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
                                <meshStandardMaterial color="#6b7280" metalness={0.8} roughness={0.3} />
                            </mesh>

                            {/* Link 3 */}
                            <mesh position={[0, 0.6, 0]} castShadow>
                                <cylinderGeometry args={[0.1, 0.1, 1.2, 16]} />
                                <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.1} />
                            </mesh>

                            {/* End Effector */}
                            <group ref={endEffectorRef} position={[0, 1.2, 0]}>
                                {/* Base of end effector */}
                                <mesh castShadow>
                                    <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
                                    <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
                                </mesh>

                                {/* Gripper fingers */}
                                {[-1, 1].map((side, index) => (
                                    <mesh
                                        key={`finger-${index}`}
                                        position={[side * 0.08, 0.15, 0]}
                                        rotation={[0, 0, side > 0 ? 0.3 : -0.3]}
                                        castShadow
                                    >
                                        <boxGeometry args={[0.03, 0.3, 0.03]} />
                                        <meshStandardMaterial color="#6b7280" metalness={0.9} roughness={0.1} />
                                    </mesh>
                                ))}

                                {/* Gripper tips */}
                                {[-1, 1].map((side, index) => (
                                    <mesh
                                        key={`tip-${index}`}
                                        position={[side * 0.15, 0.25, 0]}
                                        castShadow
                                    >
                                        <boxGeometry args={[0.02, 0.1, 0.02]} />
                                        <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
                                    </mesh>
                                ))}
                            </group>
                        </group>
                    </group>
                </group>
            </group>

            {/* Control Panel */}
            <mesh
                position={[1.5, 0.5, 0]}
                onClick={handleClick}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                castShadow
            >
                <boxGeometry args={[0.8, 0.8, 0.1]} />
                <meshStandardMaterial
                    color={isAnimating ? "#10b981" : "#334155"}
                    metalness={0.8}
                    roughness={0.2}
                    emissive={isAnimating ? "#10b981" : "#000000"}
                    emissiveIntensity={isAnimating ? 0.3 : 0}
                />
            </mesh>

            {/* Screen */}
            <mesh position={[1.5, 0.5, 0.06]}>
                <planeGeometry args={[0.6, 0.6]} />
                <meshStandardMaterial
                    color="#1a1a2e"
                    emissive={isAnimating ? "#16213e" : "#000000"}
                    emissiveIntensity={isAnimating ? 0.5 : 0}
                />
            </mesh>

            {/* Status Indicator */}
            <mesh position={[1.8, 0.8, 0.06]}>
                <sphereGeometry args={[0.03, 16, 16]} />
                <meshStandardMaterial
                    color={isAnimating ? "#10b981" : "#6b7280"}
                    emissive={isAnimating ? "#10b981" : "#6b7280"}
                    emissiveIntensity={isAnimating ? 1 : 0.2}
                />
            </mesh>

            {/* Hover Label */}
            {hovered && (
                <Html position={[1.5, 1, 0]} center>
                    <div className="bg-black/80 text-white px-3 py-1 rounded text-sm border border-blue-500">
                        Robotic Arm Control
                    </div>
                </Html>
            )}

            {/* Animation Status */}
            {isAnimating && (
                <Html position={[0, 2.5, 0]} center>
                    <div className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded text-sm border border-blue-500 animate-pulse">
                        Performing Pick & Place Operation
                    </div>
                </Html>
            )}
        </group>
    );
};