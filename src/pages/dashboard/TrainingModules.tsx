import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Plus, Edit, Eye, Lock, Unlock } from "lucide-react";

const TrainingModules = () => {
    const modules = [
        { id: 1, title: "Industrial Safety Basics", difficulty: "Beginner", status: "Published", completion: 85, users: 24 },
        { id: 2, title: "Assembly Line Operations", difficulty: "Intermediate", status: "Published", completion: 65, users: 18 },
        { id: 3, title: "Hazard Identification", difficulty: "Advanced", status: "Draft", completion: 0, users: 0 },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                            Training Modules
                        </h1>
                        <p className="text-muted-foreground mt-1">Create and manage VR/AR training content</p>
                    </div>
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Create Module
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module) => (
                        <Card key={module.id} className="bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-all">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg">{module.title}</CardTitle>
                                        <CardDescription className="mt-1">
                                            <Badge variant="outline" className="text-xs">
                                                {module.difficulty}
                                            </Badge>
                                        </CardDescription>
                                    </div>
                                    <Badge variant={module.status === "Published" ? "default" : "secondary"}>
                                        {module.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-muted-foreground">Completion Rate</span>
                                        <span className="font-medium">{module.completion}%</span>
                                    </div>
                                    <Progress value={module.completion} className="h-2" />
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Active Users</span>
                                    <span className="font-medium">{module.users}</span>
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                                        <Eye className="w-3 h-3" />
                                        Preview
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1 gap-2">
                                        <Edit className="w-3 h-3" />
                                        Edit
                                    </Button>
                                    <Button variant="ghost" size="sm">
                                        {module.status === "Published" ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default TrainingModules;
