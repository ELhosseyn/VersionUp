import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Download, TrendingUp, Users, Clock, Target } from "lucide-react";

const Analytics = () => {
    const sessionData = [
        { date: 'Mon', sessions: 12, completions: 10 },
        { date: 'Tue', sessions: 15, completions: 13 },
        { date: 'Wed', sessions: 18, completions: 16 },
        { date: 'Thu', sessions: 14, completions: 12 },
        { date: 'Fri', sessions: 20, completions: 18 },
        { date: 'Sat', sessions: 8, completions: 7 },
        { date: 'Sun', sessions: 10, completions: 9 },
    ];

    const moduleData = [
        { name: 'Industrial Safety', completions: 45, avgTime: 12.5 },
        { name: 'Assembly Line', completions: 38, avgTime: 15.2 },
        { name: 'Hazard ID', completions: 32, avgTime: 10.8 },
        { name: 'Equipment Use', completions: 28, avgTime: 18.3 },
    ];

    const performanceData = [
        { name: 'Excellent', value: 35, color: '#10b981' },
        { name: 'Good', value: 45, color: '#3b82f6' },
        { name: 'Needs Improvement', value: 15, color: '#f59e0b' },
        { name: 'Failed', value: 5, color: '#ef4444' },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                            Analytics Dashboard
                        </h1>
                        <p className="text-muted-foreground mt-1">Training performance insights and metrics</p>
                    </div>
                    <Button className="gap-2">
                        <Download className="w-4 h-4" />
                        Export Report
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-card/50 backdrop-blur border-primary/10">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sessions</CardTitle>
                            <TrendingUp className="w-4 h-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,247</div>
                            <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur border-primary/10">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Completion</CardTitle>
                            <Target className="w-4 h-4 text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">87%</div>
                            <p className="text-xs text-muted-foreground mt-1">+5% from last month</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur border-primary/10">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Active Users</CardTitle>
                            <Users className="w-4 h-4 text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">156</div>
                            <p className="text-xs text-muted-foreground mt-1">+8 new this week</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur border-primary/10">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Avg Time</CardTitle>
                            <Clock className="w-4 h-4 text-yellow-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">14.2m</div>
                            <p className="text-xs text-muted-foreground mt-1">Per session</p>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="overview" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="modules">Module Performance</TabsTrigger>
                        <TabsTrigger value="users">User Analytics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="bg-card/50 backdrop-blur border-primary/10">
                                <CardHeader>
                                    <CardTitle>Session Activity</CardTitle>
                                    <CardDescription>Sessions vs Completions over the last 7 days</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={sessionData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                            <XAxis dataKey="date" stroke="#888" tickLine={false} axisLine={false} />
                                            <YAxis stroke="#888" tickLine={false} axisLine={false} />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                            />
                                            <Line type="monotone" dataKey="sessions" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} />
                                            <Line type="monotone" dataKey="completions" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card className="bg-card/50 backdrop-blur border-primary/10">
                                <CardHeader>
                                    <CardTitle>Performance Distribution</CardTitle>
                                    <CardDescription>User performance breakdown</CardDescription>
                                </CardHeader>
                                <CardContent className="h-[300px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={performanceData}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                                outerRadius={80}
                                                fill="#8884d8"
                                                dataKey="value"
                                            >
                                                {performanceData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                            />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="modules" className="space-y-6">
                        <Card className="bg-card/50 backdrop-blur border-primary/10">
                            <CardHeader>
                                <CardTitle>Module Performance</CardTitle>
                                <CardDescription>Completion rates and average time by module</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={moduleData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                        <XAxis dataKey="name" stroke="#888" tickLine={false} axisLine={false} />
                                        <YAxis stroke="#888" tickLine={false} axisLine={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                        />
                                        <Bar dataKey="completions" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="users" className="space-y-6">
                        <Card className="bg-card/50 backdrop-blur border-primary/10">
                            <CardHeader>
                                <CardTitle>User Engagement</CardTitle>
                                <CardDescription>Coming soon: Heatmaps and user improvement tracking</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[400px] flex items-center justify-center">
                                <p className="text-muted-foreground">User analytics visualization will be displayed here</p>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    );
};

export default Analytics;
