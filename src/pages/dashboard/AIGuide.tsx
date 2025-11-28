import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Zap, MessageSquare, Volume2 } from "lucide-react";

const AIGuide = () => {
    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                        AI Guide Configuration
                    </h1>
                    <p className="text-muted-foreground mt-1">Configure your AI instructor's behavior and responses</p>
                </div>

                <Tabs defaultValue="personality" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="personality">Personality</TabsTrigger>
                        <TabsTrigger value="dialogues">Dialogues</TabsTrigger>
                        <TabsTrigger value="voice">Voice Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="personality" className="space-y-6">
                        <Card className="bg-card/50 backdrop-blur border-primary/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Zap className="w-5 h-5 text-primary" />
                                    AI Personality
                                </CardTitle>
                                <CardDescription>Define how your AI guide interacts with trainees</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Personality Type</Label>
                                    <Select defaultValue="friendly">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="friendly">Friendly & Encouraging</SelectItem>
                                            <SelectItem value="professional">Professional & Formal</SelectItem>
                                            <SelectItem value="strict">Strict & Direct</SelectItem>
                                            <SelectItem value="gamified">Gamified & Fun</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Response Speed</Label>
                                    <Select defaultValue="normal">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="instant">Instant</SelectItem>
                                            <SelectItem value="normal">Normal (1-2s)</SelectItem>
                                            <SelectItem value="slow">Slow (3-4s)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Enable Hints</Label>
                                        <p className="text-sm text-muted-foreground">AI can provide hints when user struggles</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Adaptive Difficulty</Label>
                                        <p className="text-sm text-muted-foreground">AI adjusts based on user performance</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="dialogues" className="space-y-6">
                        <Card className="bg-card/50 backdrop-blur border-primary/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                    Dialogue Templates
                                </CardTitle>
                                <CardDescription>Customize AI messages for different scenarios</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Welcome Message</Label>
                                    <Textarea
                                        placeholder="Enter welcome message..."
                                        defaultValue="Welcome to NextVerse! I'm your AI guide. Let's start your training journey."
                                        rows={3}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Success Message</Label>
                                    <Textarea
                                        placeholder="Enter success message..."
                                        defaultValue="Excellent work! You've completed this step correctly."
                                        rows={3}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Error Message</Label>
                                    <Textarea
                                        placeholder="Enter error message..."
                                        defaultValue="Not quite right. Let me help you understand what went wrong."
                                        rows={3}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Hint Message</Label>
                                    <Textarea
                                        placeholder="Enter hint message..."
                                        defaultValue="Here's a tip: Try focusing on the highlighted object."
                                        rows={3}
                                    />
                                </div>

                                <Button className="w-full">Save Dialogues</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="voice" className="space-y-6">
                        <Card className="bg-card/50 backdrop-blur border-primary/10">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Volume2 className="w-5 h-5 text-primary" />
                                    Voice Configuration
                                </CardTitle>
                                <CardDescription>Configure text-to-speech settings</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <Label>Voice Mode</Label>
                                    <Select defaultValue="tts">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="text">Text Only</SelectItem>
                                            <SelectItem value="tts">Text-to-Speech</SelectItem>
                                            <SelectItem value="avatar">Avatar Mode</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Voice Language</Label>
                                    <Select defaultValue="en">
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="en">English (US)</SelectItem>
                                            <SelectItem value="fr">French</SelectItem>
                                            <SelectItem value="ar">Arabic</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label>Speech Rate</Label>
                                    <Input type="range" min="0.5" max="2" step="0.1" defaultValue="1" />
                                    <p className="text-xs text-muted-foreground">1.0x (Normal)</p>
                                </div>

                                <div className="space-y-2">
                                    <Label>Pitch</Label>
                                    <Input type="range" min="0.5" max="2" step="0.1" defaultValue="1" />
                                    <p className="text-xs text-muted-foreground">1.0x (Normal)</p>
                                </div>

                                <Button className="w-full">Test Voice</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default AIGuide;
