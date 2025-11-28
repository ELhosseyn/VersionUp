
import { Glasses, Smartphone, X, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface XREntryOverlayProps {
    onEnterVR: () => void;
    onEnterAR: () => void;
    onClose: () => void;
}

export const XREntryOverlay = ({ onEnterVR, onEnterAR, onClose }: XREntryOverlayProps) => {
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-full max-w-4xl"
            >
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute -top-12 right-0 text-white/50 hover:text-white hover:bg-white/10 rounded-full"
                    onClick={onClose}
                >
                    <X className="w-6 h-6" />
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* VR Card */}
                    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#1a1b26] to-[#0f1016] border border-white/10 p-8 hover:border-purple-500/50 transition-all duration-500 hover:shadow-[0_0_50px_-12px_rgba(168,85,247,0.5)]">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1622979135225-d2ba269fb1bd?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500 mix-blend-overlay" />
                        <div className="relative z-10 flex flex-col items-center text-center h-full justify-between min-h-[320px]">
                            <div className="mt-4 p-6 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-500">
                                <Glasses className="w-16 h-16 text-purple-400" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Virtual Reality</h3>
                                <p className="text-white/60 mb-8 text-lg leading-relaxed">
                                    Immerse yourself in a fully digital training hangar. Best for Oculus/Meta Quest & HTC Vive.
                                </p>
                            </div>
                            <Button
                                onClick={onEnterVR}
                                className="w-full h-14 text-lg font-semibold bg-purple-600 hover:bg-purple-500 text-white border-0 shadow-lg shadow-purple-900/20 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Enter VR Experience
                            </Button>
                        </div>
                    </div>

                    {/* AR Card */}
                    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-b from-[#1a1b26] to-[#0f1016] border border-white/10 p-8 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-[0_0_50px_-12px_rgba(16,185,129,0.5)]">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-500 mix-blend-overlay" />
                        <div className="relative z-10 flex flex-col items-center text-center h-full justify-between min-h-[320px]">
                            <div className="mt-4 p-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6 group-hover:scale-110 group-hover:bg-emerald-500/20 transition-all duration-500">
                                <Smartphone className="w-16 h-16 text-emerald-400" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">Mixed Reality</h3>
                                <p className="text-white/60 mb-8 text-lg leading-relaxed">
                                    Overlay the training module into your physical room. Best for Mobile AR & HoloLens.
                                </p>
                            </div>
                            <Button
                                onClick={onEnterAR}
                                className="w-full h-14 text-lg font-semibold bg-emerald-600 hover:bg-emerald-500 text-white border-0 shadow-lg shadow-emerald-900/20 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Enter AR Experience
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-white/30 text-sm">
                        Don't have a headset? <button onClick={onClose} className="text-white/50 hover:text-white underline underline-offset-4">Continue in 3D Mode</button>
                    </p>
                </div>
            </motion.div>
        </div>
    );
};
