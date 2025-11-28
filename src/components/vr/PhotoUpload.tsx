import { useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PhotoUploadProps {
    onPhotoSelected: (photoUrl: string) => void;
}

export const PhotoUpload = ({ onPhotoSelected }: PhotoUploadProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileSelect = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setPreview(result);
                onPhotoSelected(result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        handleFileSelect(file);
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    return (
        <div className="absolute top-32 right-8 z-20 w-80">
            <div className="bg-black/80 backdrop-blur-md border border-white/20 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload Your Space Photo
                </h3>

                {!preview ? (
                    <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${isDragging
                                ? 'border-primary bg-primary/10'
                                : 'border-white/20 hover:border-primary/50'
                            }`}
                        onDragOver={(e) => {
                            e.preventDefault();
                            setIsDragging(true);
                        }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('photo-upload')?.click()}
                    >
                        <Upload className="w-12 h-12 text-white/50 mx-auto mb-3" />
                        <p className="text-white/70 text-sm mb-2">
                            Drop your photo here or click to browse
                        </p>
                        <p className="text-white/40 text-xs">
                            Supports: JPG, PNG (360° panorama recommended)
                        </p>
                        <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileInput}
                        />
                    </div>
                ) : (
                    <div className="relative">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-40 object-cover rounded-lg"
                        />
                        <Button
                            size="icon"
                            variant="destructive"
                            className="absolute top-2 right-2 w-6 h-6"
                            onClick={() => {
                                setPreview(null);
                                onPhotoSelected('');
                            }}
                        >
                            <X className="w-4 h-4" />
                        </Button>
                        <p className="text-green-400 text-xs mt-2 text-center">
                            ✓ Photo loaded! Your VR space is ready.
                        </p>
                    </div>
                )}

                <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded text-xs text-blue-200">
                    <strong>Tip:</strong> For best results, use a 360° panorama photo of your industrial space. Regular photos will work too!
                </div>
            </div>
        </div>
    );
};
