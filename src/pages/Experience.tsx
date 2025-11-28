import VRScene from "@/components/vr/VRScene";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, Headphones } from "lucide-react";
import { useState } from "react";

const Experience = () => {
    const navigate = useNavigate();
    const [isMicActive, setIsMicActive] = useState(false);

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">
            {/* UI Overlay */}
            <div className="absolute top-0 left-0 w-full p-6 z-10 flex justify-between items-start pointer-events-none">
                <Button
                    variant="outline"
                    onClick={() => navigate("/")}
                    className="bg-black/40 backdrop-blur-md border-white/20 text-white hover:bg-white/10 pointer-events-auto"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Exit Simulation
                </Button>

                <div className="bg-black/40 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white/80 text-sm font-medium">
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block mr-2 animate-pulse"></span>
                    Connected to VersionUp Cloud
                </div>
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-4 pointer-events-auto">
                <Button
                    variant={isMicActive ? "default" : "secondary"}
                    size="lg"
                    className={`rounded-full h-14 w-14 p-0 ${isMicActive ? "bg-red-500 hover:bg-red-600" : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"}`}
                    onClick={() => setIsMicActive(!isMicActive)}
                >
                    <Mic className="h-6 w-6" />
                </Button>
                <Button
                    variant="secondary"
                    size="lg"
                    className="rounded-full h-14 w-14 p-0 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md"
                >
                    <Headphones className="h-6 w-6" />
                </Button>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-8 right-8 z-10 max-w-xs pointer-events-none">
                <div className="bg-black/40 backdrop-blur-md border border-white/20 p-4 rounded-xl text-white">
                    <h4 className="font-semibold mb-1">Navigation</h4>
                    <p className="text-xs text-white/70">
                        • Left Click + Drag to Rotate<br />
                        • Scroll to Zoom<br />
                        • Right Click to Pan
                    </p>
                </div>
            </div>

            <VRScene />
        </div>
    );
};

export default Experience;
