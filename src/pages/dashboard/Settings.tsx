import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, Key, Palette, Globe, AlertCircle, CheckCircle } from "lucide-react";

const Settings = () => {
    const logs = [
        { id: 1, type: "error", message: "VR session disconnected for user John Doe", time: "2 min ago" },
        { id: 2, type: "success", message: "Module 'Industrial Safety' published successfully", time: "15 min ago" },
        { id: 3, type: "warning", message: "AR tracking quality degraded", time: "1 hour ago" },
        { id: 4, type: "info", message: "New user registered: Jane Smith", time: "2 hours ago" },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                        System Settings
                    </h1>
                    <p className="text-muted-foreground mt-1">Configure platform settings and integrations</p>
                </div>

                <Tabs defaultValue="platform" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="platform">Platform</TabsTrigger>
                        <TabsTrigger value="branding">Branding</TabsTrigger>
                        <TabsTrigger value="languages">Languages</TabsTrigger>
                        <TabsTrigger value="logs">Logs</TabsTrigger>
                    </TabsList>

                    <TabsContent value="platform" className="space-y-6">
                        <Card className="bg-card/50 backdrop-blur border-primary/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Key className="w-5 h-5 text-primary" />
                                    API Configuration
                                </CardTitle>
                                <CardDescription>Manage API keys and integrations</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>OpenAI API Key</Label>
                                    <Input type="password" placeholder="sk-..." defaultValue="sk-••••••••••••••••" />
                                    <p className="text-xs text-muted-foreground">Used for AI guide responses</p>
                                </div>

                                <div className="space-y-2">
                                    <Label>WebXR API Endpoint</Label>
                                    <Input placeholder="https://api.nextverse.com/xr" defaultValue="https://api.nextverse.com/xr" />
                                    <p className="text-xs text-muted-foreground">VR/AR session management endpoint</p>
                                </div>

                                <div className="space-y-2">
                                    <Label>Analytics Tracking ID</Label>
                                    <Input placeholder="UA-XXXXXXXXX-X" defaultValue="UA-123456789-1" />
                                    <p className="text-xs text-muted-foreground">Google Analytics or custom tracking</p>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Enable Debug Mode</Label>
                                        <p className="text-sm text-muted-foreground">Show detailed error messages</p>
                                    </div>
                                    <Switch />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Auto-Save Sessions</Label>
                                        <p className="text-sm text-muted-foreground">Automatically save user progress</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <Button className="w-full">Save Platform Settings</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="branding" className="space-y-6">
                        <Card className="bg-card/50 backdrop-blur border-primary/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Palette className="w-5 h-5 text-primary" />
                                    Brand Customization
                                </CardTitle>
                                <CardDescription>Customize your platform's appearance</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Platform Name</Label>
                                    <Input placeholder="NextVerse" defaultValue="NextVerse" />
                                </div>

                                <div className="space-y-2">
                                    <Label>Logo Upload</Label>
                                    <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                                        <Palette className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground">
                                            Click to upload logo
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            PNG, SVG (max 2MB)
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Primary Color</Label>
                                    <div className="flex gap-4">
                                        <Input type="color" defaultValue="#14b8a6" className="w-20 h-10" />
                                        <Input placeholder="#14b8a6" defaultValue="#14b8a6" className="flex-1" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Secondary Color</Label>
                                    <div className="flex gap-4">
                                        <Input type="color" defaultValue="#8b5cf6" className="w-20 h-10" />
                                        <Input placeholder="#8b5cf6" defaultValue="#8b5cf6" className="flex-1" />
                                    </div>
                                </div>

                                <Button className="w-full">Save Branding</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="languages" className="space-y-6">
                        <Card className="bg-card/50 backdrop-blur border-primary/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Globe className="w-5 h-5 text-primary" />
                                    Multi-Language Support
                                </CardTitle>
                                <CardDescription>Configure platform and AI instructor languages</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>English</Label>
                                        <p className="text-sm text-muted-foreground">Default language</p>
                                    </div>
                                    <Switch defaultChecked disabled />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>French</Label>
                                        <p className="text-sm text-muted-foreground">Français</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Arabic</Label>
                                        <p className="text-sm text-muted-foreground">العربية (RTL support)</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Spanish</Label>
                                        <p className="text-sm text-muted-foreground">Español</p>
                                    </div>
                                    <Switch />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>German</Label>
                                        <p className="text-sm text-muted-foreground">Deutsch</p>
                                    </div>
                                    <Switch />
                                </div>

                                <Button className="w-full">Save Language Settings</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="logs" className="space-y-6">
                        <Card className="bg-card/50 backdrop-blur border-primary/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <SettingsIcon className="w-5 h-5 text-primary" />
                                    System Logs
                                </CardTitle>
                                <CardDescription>Monitor system events and errors</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {logs.map((log) => (
                                    <div
                                        key={log.id}
                                        className="flex items-start gap-4 p-4 rounded-lg border border-primary/10 bg-card/30"
                                    >
                                        {log.type === "error" && <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />}
                                        {log.type === "success" && <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />}
                                        {log.type === "warning" && <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5" />}
                                        {log.type === "info" && <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />}
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge
                                                    variant="outline"
                                                    className={`text-xs ${log.type === "error"
                                                            ? "border-red-500/50 text-red-400"
                                                            : log.type === "success"
                                                                ? "border-green-500/50 text-green-400"
                                                                : log.type === "warning"
                                                                    ? "border-yellow-500/50 text-yellow-400"
                                                                    : "border-blue-500/50 text-blue-400"
                                                        }`}
                                                >
                                                    {log.type.toUpperCase()}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground">{log.time}</span>
                                            </div>
                                            <p className="text-sm">{log.message}</p>
                                        </div>
                                    </div>
                                ))}

                                <Button variant="outline" className="w-full">
                                    Load More Logs
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default Settings;
