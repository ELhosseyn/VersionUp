
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Environment, Text, Float, KeyboardControls, useKeyboardControls, Html, Stars, ContactShadows } from "@react-three/drei";
import { Suspense, useState, useRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { createXRStore, XR, useXR, XROrigin, useXRControllerLocomotion } from "@react-three/xr";
import { Glasses, Smartphone, Footprints, MonitorPlay, Image as ImageIcon, Box } from "lucide-react";
import { SafetyModule } from "./SafetyModule";
import { ModernHangar } from "./ModernHangar";
import { RealisticIndustrial } from "./RealisticIndustrial";
import { XREntryOverlay } from "./XREntryOverlay";
import { PhotoUpload } from "./PhotoUpload";
import { PhotoTo3D } from "./PhotoTo3D";

const Locomotion = ({ originRef }: { originRef: React.RefObject<THREE.Group> }) => {
    // Explicitly set left hand for movement (translation) and right hand for turning (rotation)
    useXRControllerLocomotion(originRef, { speed: 2 }, { type: 'smooth', speed: 2 }, 'left');
    return null;
};

const store = createXRStore();

const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "w", "W"] },
    { name: "backward", keys: ["ArrowDown", "s", "S"] },
    { name: "left", keys: ["ArrowLeft", "a", "A"] },
    { name: "right", keys: ["ArrowRight", "d", "D"] },
];

type Language = 'en' | 'fr' | 'ar';

const translations = {
    en: {
        welcome: "Welcome to VersionUp! Select a module to start training.",
        start: "Module 1 Started: Assembly Basics. Task: Click the RED Cube first.",
        correct_red: "Correct! Now click the GREEN Sphere.",
        correct_green: "Excellent. Finally, click the BLUE Cone.",
        complete: "Module Complete! Great job assembling the sequence.",
        reset: "Select a module to continue training.",
        incorrect: "Incorrect object! Listen to the instructions.",
        module1: "Assembly Basics",
        module2: "Safety Inspection",
        mod2_start: "Module 2 Started: Safety Inspection. Find and fix 3 hazards on the tank!",
        mod2_complete: "All hazards neutralized! The facility is safe.",
        enter_vr: "Enter VR",
        enter_ar: "Enter AR/MR",
        mode_3d: "3D Room",
        mode_photo: "360 Photo"
    },
    fr: {
        welcome: "Bienvenue sur VersionUp ! Sélectionnez un module pour commencer.",
        start: "Module 1 démarré : Bases. Tâche : Cliquez sur le Cube ROUGE.",
        correct_red: "Correct ! Maintenant, cliquez sur la Sphère VERTE.",
        correct_green: "Excellent. Enfin, cliquez sur le Cône BLEU.",
        complete: "Module terminé ! Excellent travail.",
        reset: "Sélectionnez un module pour continuer.",
        incorrect: "Objet incorrect ! Écoutez les instructions.",
        module1: "Bases d'Assemblage",
        module2: "Inspection Sécurité",
        mod2_start: "Module 2 : Inspection de sécurité. Trouvez et réparez 3 dangers !",
        mod2_complete: "Tous les dangers neutralisés ! L'installation est sûre.",
        enter_vr: "Mode VR",
        enter_ar: "Mode AR/MR",
        mode_3d: "Salle 3D",
        mode_photo: "Photo 360"
    },
    ar: {
        welcome: "مرحبًا بك في VersionUp! اختر وحدة لبدء التدريب.",
        start: "بدأت الوحدة 1: الأساسيات. المهمة: انقر على المكعب الأحمر أولاً.",
        correct_red: "صحيح! الآن انقر على الكرة الخضراء.",
        correct_green: "ممتاز. أخيرًا، انقر على المخروط الأزرق.",
        complete: "اكتملت الوحدة! عمل رائع.",
        reset: "اختر وحدة لمتابعة التدريب.",
        incorrect: "عنصر غير صحيح! استمع إلى التعليمات.",
        module1: "أساسيات التجميع",
        module2: "فحص السلامة",
        mod2_start: "الوحدة 2: فحص السلامة. ابحث عن 3 مخاطر وأصلحها!",
        mod2_complete: "تم تحييد جميع المخاطر! المنشأة آمنة.",
        enter_vr: "وضع VR",
        enter_ar: "وضع AR/MR",
        mode_3d: "غرفة 3D",
        mode_photo: "صورة 360"
    }
};

const MovementController = ({ controlsRef }: { controlsRef: React.RefObject<any> }) => {
    const { camera } = useThree();
    const [, get] = useKeyboardControls();
    const { mode } = useXR();

    useFrame((_, delta) => {
        if (mode != null) return;

        const { forward, backward, left, right } = get();
        const speed = 5 * delta;

        if (!forward && !backward && !left && !right) return;

        const direction = new THREE.Vector3();
        const frontVector = new THREE.Vector3(0, 0, 0);
        const sideVector = new THREE.Vector3(0, 0, 0);

        if (forward) frontVector.set(0, 0, -1);
        if (backward) frontVector.set(0, 0, 1);
        if (left) sideVector.set(-1, 0, 0);
        if (right) sideVector.set(1, 0, 0);

        direction
            .subVectors(frontVector, sideVector)
            .normalize()
            .multiplyScalar(speed)
            .applyEuler(camera.rotation);

        direction.y = 0;
        camera.position.add(direction);

        if (controlsRef.current) {
            controlsRef.current.target.add(direction);
        }
    });

    return null;
};

const VRScene = () => {
    const [activeModule, setActiveModule] = useState<"none" | "module1" | "module2">("none");
    const [taskStep, setTaskStep] = useState(0);
    const [language, setLanguage] = useState<Language>('en');
    const [guideMessage, setGuideMessage] = useState(translations['en'].welcome);
    const [showEntryOverlay, setShowEntryOverlay] = useState(true);
    const [envMode, setEnvMode] = useState<'3d' | 'photo'>('3d');
    const [customPhoto, setCustomPhoto] = useState<string>('');
    const controlsRef = useRef<any>(null);
    const originRef = useRef<THREE.Group>(null);

    useEffect(() => {
        if (activeModule === 'none' && taskStep === 0) {
            setGuideMessage(translations[language].welcome);
        }
    }, [language, activeModule, taskStep]);

    const speak = (text: string, lang: Language) => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            const langMap = { 'en': 'en-US', 'fr': 'fr-FR', 'ar': 'ar-SA' };
            utterance.lang = langMap[lang];
            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(voice => voice.lang.startsWith(langMap[lang]));
            if (preferredVoice) utterance.voice = preferredVoice;
            window.speechSynthesis.speak(utterance);
        }
    };

    // Module 1 Logic
    const handleModule1Click = () => {
        if (activeModule === "none") {
            setActiveModule("module1");
            setTaskStep(1);
            const msg = translations[language].start;
            setGuideMessage(msg);
            speak(msg, language);
        }
    };

    const handleTaskObjectClick = (color: string) => {
        if (activeModule !== "module1") return;

        let msg = "";
        if (taskStep === 1 && color === "red") {
            setTaskStep(2);
            msg = translations[language].correct_red;
        } else if (taskStep === 2 && color === "green") {
            setTaskStep(3);
            msg = translations[language].correct_green;
        } else if (taskStep === 3 && color === "blue") {
            setTaskStep(4);
            msg = translations[language].complete;
            setTimeout(() => {
                setActiveModule("none");
                setTaskStep(0);
                const resetMsg = translations[language].reset;
                setGuideMessage(resetMsg);
                speak(resetMsg, language);
            }, 4000);
        } else {
            msg = translations[language].incorrect;
        }

        if (msg) {
            setGuideMessage(msg);
            speak(msg, language);
        }
    };

    // Module 2 Logic
    const handleModule2Click = () => {
        if (activeModule === "none") {
            setActiveModule("module2");
            const msg = translations[language].mod2_start;
            setGuideMessage(msg);
            speak(msg, language);
        }
    };

    const handleModule2Progress = (msg: string) => {
        setGuideMessage(msg);
        speak(msg, language);
    };

    const handleModule2Complete = () => {
        const completeMsg = translations[language].mod2_complete;
        setGuideMessage(completeMsg);
        speak(completeMsg, language);
        setTimeout(() => {
            setActiveModule("none");
            const resetMsg = translations[language].reset;
            setGuideMessage(resetMsg);
            speak(resetMsg, language);
        }, 4000);
    };

    const handleTeleport = (point: THREE.Vector3) => {
        if (originRef.current) {
            originRef.current.position.set(point.x, point.y, point.z);
        }
    };

    return (
        <KeyboardControls map={keyboardMap}>
            <div className="h-screen w-full bg-black relative">
                {/* Entry Overlay */}
                {showEntryOverlay && (
                    <XREntryOverlay
                        onEnterVR={() => {
                            store.enterVR();
                            setShowEntryOverlay(false);
                        }}
                        onEnterAR={() => {
                            store.enterAR();
                            setShowEntryOverlay(false);
                        }}
                        onClose={() => setShowEntryOverlay(false)}
                    />
                )}

                {/* Controls Info */}
                <div className="absolute bottom-24 left-8 z-20 text-white/50 text-xs pointer-events-none">
                    <p className="flex items-center gap-2"><Footprints className="w-3 h-3" /> WASD to Move • Click Floor to Teleport (VR)</p>
                </div>

                {/* Re-open Overlay Button (if closed) */}
                {!showEntryOverlay && (
                    <div className="absolute bottom-8 left-8 z-20">
                        <Button
                            onClick={() => setShowEntryOverlay(true)}
                            className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white"
                        >
                            <MonitorPlay className="mr-2 h-4 w-4" />
                            XR Options
                        </Button>
                    </div>
                )}

                {/* Environment Toggle */}
                <div className="absolute top-8 left-8 z-20 flex gap-2">
                    <Button
                        variant={envMode === '3d' ? "default" : "secondary"}
                        size="sm"
                        onClick={() => setEnvMode('3d')}
                        className="gap-2"
                    >
                        <Box className="w-4 h-4" />
                        {translations[language].mode_3d}
                    </Button>
                    <Button
                        variant={envMode === 'photo' ? "default" : "secondary"}
                        size="sm"
                        onClick={() => setEnvMode('photo')}
                        className="gap-2"
                    >
                        <ImageIcon className="w-4 h-4" />
                        {translations[language].mode_photo}
                    </Button>
                </div>

                {/* Photo Upload */}
                {envMode === 'photo' && (
                    <PhotoUpload onPhotoSelected={setCustomPhoto} />
                )}

                {/* Language Controls */}
                <div className="absolute top-20 right-8 z-20 flex flex-col gap-2">
                    {['en', 'fr', 'ar'].map((lang) => (
                        <Button
                            key={lang}
                            variant={language === lang ? "default" : "secondary"}
                            size="sm"
                            onClick={() => setLanguage(lang as Language)}
                            className="w-12 uppercase"
                        >
                            {lang}
                        </Button>
                    ))}
                </div>

                <Canvas shadows camera={{ position: [0, 1.7, 6], fov: 60 }} gl={{ antialias: true, alpha: false }} style={{ background: '#0f172a' }}>
                    <XR store={store}>
                        <XROrigin ref={originRef} position={[0, 0, 0]} />
                        <Locomotion originRef={originRef} />
                        <Suspense fallback={
                            <Html center>
                                <div className="text-white text-xl">Loading VR Environment...</div>
                            </Html>
                        }>
                            {/* Lighting & Environment */}
                            <ambientLight intensity={0.2} />
                            <pointLight position={[0, 10, 0]} intensity={0.5} castShadow />

                            {envMode === '3d' ? (
                                <>
                                    {/* <spotLight
                                        position={[10, 15, 10]}
                                        angle={0.3}
                                        penumbra={0.5}
                                        intensity={1}
                                        castShadow
                                        shadow-mapSize={[2048, 2048]}
                                    />
                                    <spotLight
                                        position={[-10, 15, -10]}
                                        angle={0.3}
                                        penumbra={0.5}
                                        intensity={1}
                                        castShadow
                                        shadow-mapSize={[2048, 2048]}
                                    /> */}
                                    <Environment
                                        files="/empty_warehouse_01_4k.hdr"
                                        background
                                        ground={{ height: 2, radius: 130, scale: 100 }}
                                    />
                                    {/* <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} /> */}
                                    <RealisticIndustrial onTeleport={handleTeleport} showStructure={false} />
                                </>
                            ) : (
                                <>
                                    {/* Photo to 3D Interactive Environment */}
                                    <PhotoTo3D
                                        photoUrl={customPhoto || '/realistic_hangar.png'}
                                        onTeleport={handleTeleport}
                                    />
                                </>
                            )}

                            {/* Contact Shadows for grounding objects (always useful) */}
                            <ContactShadows resolution={1024} scale={50} blur={2} opacity={0.5} far={10} color="#000000" />

                            <OrbitControls ref={controlsRef} enableZoom={true} maxPolarAngle={Math.PI / 2} />
                            <MovementController controlsRef={controlsRef} />

                            {/* AI Guide */}
                            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                                <group position={[0, 1.5, -2]}>
                                    <mesh>
                                        <sphereGeometry args={[0.4, 32, 32]} />
                                        <meshStandardMaterial color={activeModule !== "none" ? "#10b981" : "#4f46e5"} metalness={0.8} roughness={0.2} />
                                    </mesh>
                                    <mesh position={[0, 0, 0.35]}>
                                        <circleGeometry args={[0.15, 32]} />
                                        <meshBasicMaterial color="#00ffcc" toneMapped={false} />
                                    </mesh>
                                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                                        <torusGeometry args={[0.6, 0.02, 16, 100]} />
                                        <meshStandardMaterial color="#818cf8" emissive="#4f46e5" toneMapped={false} />
                                    </mesh>

                                    <Html position={[0, 1.2, 0]} center transform>
                                        <div
                                            className="bg-black/80 backdrop-blur-md border border-primary/50 text-white px-4 py-2 rounded-xl text-center min-w-[200px]"
                                            dir={language === 'ar' ? 'rtl' : 'ltr'}
                                        >
                                            <p className="text-sm font-medium">{guideMessage}</p>
                                        </div>
                                    </Html>
                                </group>
                            </Float>

                            {/* Module Selectors */}
                            {activeModule === "none" && (
                                <group>
                                    <group position={[-2, 0.5, 0]} onClick={handleModule1Click} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
                                        <Float speed={1.5} rotationIntensity={1} floatIntensity={0.2}>
                                            <mesh castShadow receiveShadow>
                                                <boxGeometry args={[1, 1, 1]} />
                                                <meshStandardMaterial color="#ec4899" metalness={0.5} roughness={0.2} />
                                            </mesh>
                                        </Float>
                                        <Text position={[0, 1, 0]} fontSize={0.2} color="white" anchorX="center">
                                            {translations[language].module1}
                                        </Text>
                                    </group>

                                    <group position={[2, 0.5, 0]} onClick={handleModule2Click} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
                                        <Float speed={1.5} rotationIntensity={1} floatIntensity={0.2}>
                                            <mesh castShadow receiveShadow>
                                                <octahedronGeometry args={[0.7]} />
                                                <meshStandardMaterial color="#f59e0b" metalness={0.5} roughness={0.2} />
                                            </mesh>
                                        </Float>
                                        <Text position={[0, 1, 0]} fontSize={0.2} color="white" anchorX="center">
                                            {translations[language].module2}
                                        </Text>
                                    </group>
                                </group>
                            )}

                            {/* Module 1 Content */}
                            {activeModule === "module1" && (
                                <group position={[0, 0.5, 1]}>
                                    <mesh
                                        position={[-1.5, 0, 0]}
                                        onClick={() => handleTaskObjectClick("red")}
                                        onPointerOver={() => document.body.style.cursor = 'pointer'}
                                        onPointerOut={() => document.body.style.cursor = 'auto'}
                                        visible={taskStep >= 1}
                                        castShadow
                                        receiveShadow
                                    >
                                        <boxGeometry args={[0.6, 0.6, 0.6]} />
                                        <meshStandardMaterial color={taskStep > 1 ? "#333" : "#ef4444"} />
                                        {taskStep === 1 && (
                                            <Html position={[0, 0.8, 0]} center transform>
                                                <div className="bg-red-500/20 text-red-200 px-2 py-1 rounded text-xs border border-red-500 animate-bounce">Click Me</div>
                                            </Html>
                                        )}
                                    </mesh>

                                    <mesh
                                        position={[0, 0, 0]}
                                        onClick={() => handleTaskObjectClick("green")}
                                        onPointerOver={() => document.body.style.cursor = 'pointer'}
                                        onPointerOut={() => document.body.style.cursor = 'auto'}
                                        visible={taskStep >= 1}
                                        castShadow
                                        receiveShadow
                                    >
                                        <sphereGeometry args={[0.4, 32, 32]} />
                                        <meshStandardMaterial color={taskStep > 2 ? "#333" : "#10b981"} />
                                        {taskStep === 2 && (
                                            <Html position={[0, 0.8, 0]} center transform>
                                                <div className="bg-green-500/20 text-green-200 px-2 py-1 rounded text-xs border border-green-500 animate-bounce">Click Me</div>
                                            </Html>
                                        )}
                                    </mesh>

                                    <mesh
                                        position={[1.5, 0, 0]}
                                        onClick={() => handleTaskObjectClick("blue")}
                                        onPointerOver={() => document.body.style.cursor = 'pointer'}
                                        onPointerOut={() => document.body.style.cursor = 'auto'}
                                        visible={taskStep >= 1}
                                        castShadow
                                        receiveShadow
                                    >
                                        <coneGeometry args={[0.4, 0.8, 32]} />
                                        <meshStandardMaterial color={taskStep > 3 ? "#333" : "#3b82f6"} />
                                        {taskStep === 3 && (
                                            <Html position={[0, 0.8, 0]} center transform>
                                                <div className="bg-blue-500/20 text-blue-200 px-2 py-1 rounded text-xs border border-blue-500 animate-bounce">Click Me</div>
                                            </Html>
                                        )}
                                    </mesh>
                                </group>
                            )}

                            {/* Module 2 Content: Safety Inspection */}
                            {activeModule === "module2" && (
                                <SafetyModule
                                    active={true}
                                    onComplete={handleModule2Complete}
                                    onProgress={handleModule2Progress}
                                />
                            )}

                        </Suspense>
                    </XR>
                </Canvas>
            </div>
        </KeyboardControls>
    );
};

export default VRScene;
