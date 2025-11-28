import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Sun, Moon, Shield, Grid3x3 } from "lucide-react";

const Environments = () => {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                        Environment Controls
                    </h1>
                    <p className="text-muted-foreground mt-1">Configure VR/AR environments and lighting</p>
                </div>

                <Tabs defaultValue="environment" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="environment">Environment</TabsTrigger>
                        <TabsTrigger value="lighting">Lighting</TabsTrigger>
                        <TabsTrigger value="safety">Safety Zones</TabsTrigger>
                    </TabsList>

                    <TabsContent value="environment" className="space-y-6">
                        <Card className="bg-card/50 backdrop-blur border-primary/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Grid3x3 className="w-5 h-5 text-primary" />
                                    Scene Environment
                                </CardTitle>
                                <CardDescription>Choose the VR/AR environment preset</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Environment Preset</Label>
                                    <Select defaultValue="warehouse">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="warehouse">Industrial Warehouse</SelectItem>
                                            <SelectItem value="laboratory">Laboratory</SelectItem>
                                            <SelectItem value="meeting">Meeting Room</SelectItem>
                                            <SelectItem value="living">Living Room</SelectItem>
                                            <SelectItem value="music">Music Room</SelectItem>
                                            <SelectItem value="office-large">Office Large</SelectItem>
                                            <SelectItem value="office-small">Office Small</SelectItem>
                                            <SelectItem value="outdoor">Outdoor Field</SelectItem>
                                            <SelectItem value="factory">Factory Floor</SelectItem>
                                            <SelectItem value="grid">Default Grid</SelectItem>
                                            <SelectItem value="custom">Custom Import</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>HDRI Environment Map</Label>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[
                                            { name: "warehouse", label: "Warehouse" },
                                            { name: "meeting", label: "Meeting Room" },
                                            { name: "living", label: "Living Room" },
                                            { name: "music", label: "Music Room" },
                                            { name: "office-large", label: "Office Large" },
                                            { name: "office-small", label: "Office Small" },
                                            { name: "studio", label: "Studio" },
                                            { name: "sunset", label: "Sunset" }
                                        ].map((hdri) => (
                                            <div
                                                key={hdri.name}
                                                className="relative aspect-video rounded-lg border-2 border-primary/20 hover:border-primary/50 cursor-pointer overflow-hidden group transition-all"
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-900/20 group-hover:from-primary/30 group-hover:to-purple-900/30 transition-all" />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-sm font-medium">{hdri.label}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Custom HDRI Upload</Label>
                                    <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            .hdr, .exr (max 50MB)
                                        </p>
                                    </div>
                                </div>

                                <Button className="w-full">Apply Environment</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="lighting" className="space-y-6">
                        <Card className="bg-card/50 backdrop-blur border-primary/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Sun className="w-5 h-5 text-primary" />
                                    Lighting System
                                </CardTitle>
                                <CardDescription>Configure scene lighting and shadows</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>HDRI Lighting</Label>
                                        <p className="text-sm text-muted-foreground">Use environment map for lighting</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label>Ambient Light Intensity</Label>
                                        <span className="text-sm text-muted-foreground">0.4</span>
                                    </div>
                                    <Slider defaultValue={[40]} max={100} step={1} />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label>Directional Light Intensity</Label>
                                        <span className="text-sm text-muted-foreground">1.0</span>
                                    </div>
                                    <Slider defaultValue={[100]} max={200} step={1} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Dynamic Shadows</Label>
                                        <p className="text-sm text-muted-foreground">Enable real-time shadow casting</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label>Shadow Quality</Label>
                                        <span className="text-sm text-muted-foreground">2048x2048</span>
                                    </div>
                                    <Select defaultValue="2048">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="512">512x512 (Low)</SelectItem>
                                            <SelectItem value="1024">1024x1024 (Medium)</SelectItem>
                                            <SelectItem value="2048">2048x2048 (High)</SelectItem>
                                            <SelectItem value="4096">4096x4096 (Ultra)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Ambient Occlusion</Label>
                                        <p className="text-sm text-muted-foreground">Add depth to shadows</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Button className="w-full">Apply Lighting</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="safety" className="space-y-6">
                        <Card className="bg-card/50 backdrop-blur border-primary/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Shield className="w-5 h-5 text-primary" />
                                    Safety Elements
                                </CardTitle>
                                <CardDescription>Configure safety zones and boundaries</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Hazard Zone Stripes</Label>
                                        <p className="text-sm text-muted-foreground">Yellow/black safety markings</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <Label>Safe Zone Radius</Label>
                                        <span className="text-sm text-muted-foreground">5.0m</span>
                                    </div>
                                    <Slider defaultValue={[50]} max={100} step={1} />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Safe Zone Visualization</Label>
                                        <p className="text-sm text-muted-foreground">Show safe area boundaries</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Navigation Boundaries</Label>
                                        <p className="text-sm text-muted-foreground">Prevent users from leaving area</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="space-y-2">
                                    <Label>Boundary Warning Style</Label>
                                    <Select defaultValue="fade">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="fade">Fade to Black</SelectItem>
                                            <SelectItem value="grid">Grid Wall</SelectItem>
                                            <SelectItem value="warning">Warning Flash</SelectItem>
                                            <SelectItem value="teleport">Auto Teleport Back</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <Button className="w-full">Apply Safety Settings</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default Environments;
