import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Eye, MessageSquare, AlertCircle, CheckCircle } from "lucide-react";

const LiveSessions = () => {
    const sessions = [
        {
            id: 1,
            user: "John Doe",
            module: "Industrial Safety",
            mode: "VR",
            status: "active",
            progress: 65,
            currentStep: "Step 3: Hazard Identification",
            errors: 2,
            duration: "12:34",
            lastAction: "Clicked fire extinguisher"
        },
        {
            id: 2,
            user: "Jane Smith",
            module: "Assembly Line",
            mode: "AR",
            status: "active",
            progress: 45,
            currentStep: "Step 2: Component Assembly",
            errors: 0,
            duration: "08:15",
            lastAction: "Grabbed component A"
        },
        {
            id: 3,
            user: "Mike Johnson",
            module: "Safety Inspection",
            mode: "VR",
            status: "idle",
            progress: 100,
            currentStep: "Completed",
            errors: 1,
            duration: "15:42",
            lastAction: "Module completed"
        },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                        Live Sessions
                    </h1>
                    <p className="text-muted-foreground mt-1">Monitor active VR/AR training sessions in real-time</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-card/50 backdrop-blur border-primary/10">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Active Sessions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-primary">2</div>
                            <p className="text-xs text-muted-foreground mt-1">Currently in VR/AR</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur border-primary/10">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Idle Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">1</div>
                            <p className="text-xs text-muted-foreground mt-1">Connected but inactive</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur border-primary/10">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Avg. Session Time</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">12:10</div>
                            <p className="text-xs text-muted-foreground mt-1">Minutes per session</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-4">
                    {sessions.map((session) => (
                        <Card key={session.id} className="bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-all">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold">{session.user}</h3>
                                            <Badge variant={session.status === "active" ? "default" : "secondary"}>
                                                {session.status === "active" ? "🔴 Live" : "⏸️ Idle"}
                                            </Badge>
                                            <Badge variant="outline" className="border-primary/50">
                                                {session.mode}
                                            </Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">{session.module}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <Eye className="w-3 h-3" />
                                            Watch
                                        </Button>
                                        <Button variant="outline" size="sm" className="gap-2">
                                            <MessageSquare className="w-3 h-3" />
                                            Send Hint
                                        </Button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Progress</span>
                                            <span className="font-medium">{session.progress}%</span>
                                        </div>
                                        <Progress value={session.progress} className="h-2" />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Duration</span>
                                            <span className="font-medium">{session.duration}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Errors</span>
                                            <span className={`font-medium ${session.errors > 0 ? "text-yellow-400" : "text-green-400"}`}>
                                                {session.errors}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-accent/30 rounded-lg p-3 space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <CheckCircle className="w-4 h-4 text-primary" />
                                        <span className="font-medium">Current Step:</span>
                                        <span className="text-muted-foreground">{session.currentStep}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <AlertCircle className="w-4 h-4 text-muted-foreground" />
                                        <span className="font-medium">Last Action:</span>
                                        <span className="text-muted-foreground">{session.lastAction}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default LiveSessions;
