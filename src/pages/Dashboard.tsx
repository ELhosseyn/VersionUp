import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, BookOpen, Clock, Trophy, ArrowRight, Play, Box } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import DashboardLayout from "@/components/DashboardLayout";

const data = [
    { name: 'Mon', hours: 2 },
    { name: 'Tue', hours: 1.5 },
    { name: 'Wed', hours: 3 },
    { name: 'Thu', hours: 2.5 },
    { name: 'Fri', hours: 4 },
    { name: 'Sat', hours: 1 },
    { name: 'Sun', hours: 2 },
];

const Dashboard = () => {
    const { user } = useAuth();
    const userName = user?.user_metadata?.first_name || "Learner";

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <DashboardLayout>
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-8"
            >
                {/* Header Section */}
                <motion.div variants={item} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                            Dashboard
                        </h1>
                        <p className="text-muted-foreground mt-2">
                            Welcome back, {userName}! You're on a 3-day streak.
                        </p>
                    </div>
                    <Link to="/experience">
                        <Button size="lg" className="gap-2 shadow-lg shadow-primary/25">
                            <Play className="w-4 h-4" /> Resume Training
                        </Button>
                    </Link>
                </motion.div>

                {/* Stats Grid */}
                <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Modules</CardTitle>
                            <BookOpen className="w-4 h-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12/24</div>
                            <Progress value={50} className="mt-2 h-1" />
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Time Spent</CardTitle>
                            <Clock className="w-4 h-4 text-blue-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">14.5h</div>
                            <p className="text-xs text-muted-foreground mt-1">+2.5h from last week</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Skill Score</CardTitle>
                            <Activity className="w-4 h-4 text-green-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">850</div>
                            <p className="text-xs text-muted-foreground mt-1">Top 10% of learners</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-card/50 backdrop-blur border-primary/10 hover:border-primary/30 transition-colors">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Certificates</CardTitle>
                            <Trophy className="w-4 h-4 text-yellow-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">3</div>
                            <p className="text-xs text-muted-foreground mt-1">Latest: Industrial Safety</p>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Chart Section */}
                    <motion.div variants={item} className="lg:col-span-2">
                        <Card className="h-full bg-card/50 backdrop-blur border-primary/10">
                            <CardHeader>
                                <CardTitle>Learning Activity</CardTitle>
                                <CardDescription>Your study hours over the last 7 days</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[300px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={data}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                        <XAxis dataKey="name" stroke="#888" tickLine={false} axisLine={false} />
                                        <YAxis stroke="#888" tickLine={false} axisLine={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="hours"
                                            stroke="#8b5cf6"
                                            strokeWidth={3}
                                            dot={{ r: 4, fill: '#8b5cf6' }}
                                            activeDot={{ r: 6, fill: '#fff' }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </motion.div>

                    {/* Recent Modules */}
                    <motion.div variants={item} className="space-y-6">
                        <Card className="bg-card/50 backdrop-blur border-primary/10">
                            <CardHeader>
                                <CardTitle>Continue Learning</CardTitle>
                                <CardDescription>Pick up where you left off</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="group flex items-center gap-4 p-3 rounded-xl bg-accent/50 hover:bg-accent transition-colors cursor-pointer border border-transparent hover:border-primary/20">
                                    <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                        <Box className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium group-hover:text-primary transition-colors">Industrial Safety</h4>
                                        <p className="text-xs text-muted-foreground">Module 2 • 45% Complete</p>
                                    </div>
                                    <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </div>

                                <div className="group flex items-center gap-4 p-3 rounded-xl bg-accent/50 hover:bg-accent transition-colors cursor-pointer border border-transparent hover:border-primary/20">
                                    <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                        <Activity className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium group-hover:text-blue-400 transition-colors">Assembly Basics</h4>
                                        <p className="text-xs text-muted-foreground">Module 1 • Completed</p>
                                    </div>
                                    <Button size="icon" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                        <ArrowRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-primary/20 to-purple-900/20 border-primary/20">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold mb-2">Pro Tip</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Use VR mode for 2x faster skill retention. Connect your headset to start immersive training.
                                </p>
                                <Button variant="outline" className="w-full border-primary/50 hover:bg-primary/10">
                                    Setup VR Headset
                                </Button>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </motion.div>
        </DashboardLayout>
    );
};

export default Dashboard;
