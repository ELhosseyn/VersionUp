import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Upload, Search, Trash2, Download, Box, Volume2, Image } from "lucide-react";

const AssetsManager = () => {
    const models3D = [
        { id: 1, name: "Fire Extinguisher", type: "glb", size: "2.4 MB", uploaded: "2024-01-15" },
        { id: 2, name: "Safety Helmet", type: "gltf", size: "1.8 MB", uploaded: "2024-01-14" },
        { id: 3, name: "Warning Sign", type: "fbx", size: "3.2 MB", uploaded: "2024-01-13" },
    ];

    const hdriMaps = [
        { id: 1, name: "Warehouse Interior", type: "hdr", size: "12.5 MB", uploaded: "2024-01-12" },
        { id: 2, name: "Factory Floor", type: "exr", size: "18.3 MB", uploaded: "2024-01-11" },
        { id: 3, name: "Outdoor Daylight", type: "hdr", size: "15.7 MB", uploaded: "2024-01-10" },
    ];

    const audioFiles = [
        { id: 1, name: "Welcome Message", type: "mp3", size: "1.2 MB", uploaded: "2024-01-09" },
        { id: 2, name: "Success Sound", type: "wav", size: "0.8 MB", uploaded: "2024-01-08" },
        { id: 3, name: "Ambient Industrial", type: "mp3", size: "3.5 MB", uploaded: "2024-01-07" },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                        Assets Manager
                    </h1>
                    <p className="text-muted-foreground mt-1">Manage 3D models, environments, and audio files</p>
                </div>

                <Tabs defaultValue="3d" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="3d">3D Models</TabsTrigger>
                        <TabsTrigger value="hdri">HDRI Environments</TabsTrigger>
                        <TabsTrigger value="audio">Audio Files</TabsTrigger>
                    </TabsList>

                    <TabsContent value="3d" className="space-y-6">
                        <Card className="bg-card/50 backdrop-blur border-primary/10">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <Box className="w-5 h-5 text-primary" />
                                            3D Models Library
                                        </CardTitle>
                                        <CardDescription>Upload and manage .glb, .gltf, and .fbx files</CardDescription>
                                    </div>
                                    <Button className="gap-2">
                                        <Upload className="w-4 h-4" />
                                        Upload Model
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input placeholder="Search 3D models..." className="pl-10" />
                                </div>

                                <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                    <h3 className="text-lg font-semibold mb-2">Upload 3D Models</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Drag and drop files here or click to browse
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Supported formats: .glb, .gltf, .fbx (max 50MB)
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    {models3D.map((model) => (
                                        <div
                                            key={model.id}
                                            className="flex items-center justify-between p-4 rounded-lg border border-primary/10 hover:border-primary/30 transition-all bg-card/30"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                                                    <Box className="w-6 h-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium">{model.name}</h4>
                                                    <div className="flex gap-2 mt-1">
                                                        <Badge variant="outline" className="text-xs">
                                                            {model.type.toUpperCase()}
                                                        </Badge>
                                                        <span className="text-xs text-muted-foreground">{model.size}</span>
                                                        <span className="text-xs text-muted-foreground">•</span>
                                                        <span className="text-xs text-muted-foreground">{model.uploaded}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="icon">
                                                    <Download className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="hdri" className="space-y-6">
                        <Card className="bg-card/50 backdrop-blur border-primary/10">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <Image className="w-5 h-5 text-primary" />
                                            HDRI Environment Maps
                                        </CardTitle>
                                        <CardDescription>Upload and manage .hdr and .exr environment maps</CardDescription>
                                    </div>
                                    <Button className="gap-2">
                                        <Upload className="w-4 h-4" />
                                        Upload HDRI
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                                    <Image className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                    <h3 className="text-lg font-semibold mb-2">Upload HDRI Maps</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Drag and drop files here or click to browse
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Supported formats: .hdr, .exr (max 100MB)
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    {hdriMaps.map((hdri) => (
                                        <div
                                            key={hdri.id}
                                            className="flex items-center justify-between p-4 rounded-lg border border-primary/10 hover:border-primary/30 transition-all bg-card/30"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-purple-900/20 flex items-center justify-center">
                                                    <Image className="w-6 h-6 text-primary" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium">{hdri.name}</h4>
                                                    <div className="flex gap-2 mt-1">
                                                        <Badge variant="outline" className="text-xs">
                                                            {hdri.type.toUpperCase()}
                                                        </Badge>
                                                        <span className="text-xs text-muted-foreground">{hdri.size}</span>
                                                        <span className="text-xs text-muted-foreground">•</span>
                                                        <span className="text-xs text-muted-foreground">{hdri.uploaded}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="icon">
                                                    <Download className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="audio" className="space-y-6">
                        <Card className="bg-card/50 backdrop-blur border-primary/10">
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle className="flex items-center gap-2">
                                            <Volume2 className="w-5 h-5 text-primary" />
                                            Audio Files
                                        </CardTitle>
                                        <CardDescription>Upload and manage voice clips and ambient sounds</CardDescription>
                                    </div>
                                    <Button className="gap-2">
                                        <Upload className="w-4 h-4" />
                                        Upload Audio
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="border-2 border-dashed border-primary/20 rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
                                    <Volume2 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                                    <h3 className="text-lg font-semibold mb-2">Upload Audio Files</h3>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Drag and drop files here or click to browse
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Supported formats: .mp3, .wav, .ogg (max 20MB)
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    {audioFiles.map((audio) => (
                                        <div
                                            key={audio.id}
                                            className="flex items-center justify-between p-4 rounded-lg border border-primary/10 hover:border-primary/30 transition-all bg-card/30"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                                                    <Volume2 className="w-6 h-6 text-blue-400" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium">{audio.name}</h4>
                                                    <div className="flex gap-2 mt-1">
                                                        <Badge variant="outline" className="text-xs">
                                                            {audio.type.toUpperCase()}
                                                        </Badge>
                                                        <span className="text-xs text-muted-foreground">{audio.size}</span>
                                                        <span className="text-xs text-muted-foreground">•</span>
                                                        <span className="text-xs text-muted-foreground">{audio.uploaded}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button variant="ghost" size="icon">
                                                    <Download className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default AssetsManager;
