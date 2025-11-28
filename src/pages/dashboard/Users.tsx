import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Shield } from "lucide-react";

const Users = () => {
    const users = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active", modules: 12 },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Trainee", status: "Active", modules: 8 },
        { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "Instructor", status: "Active", modules: 15 },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                            User Management
                        </h1>
                        <p className="text-muted-foreground mt-1">Manage users, roles, and permissions</p>
                    </div>
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" />
                        Add User
                    </Button>
                </div>

                <div className="flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Search users..." className="pl-10" />
                    </div>
                </div>

                <Card className="bg-card/50 backdrop-blur border-primary/10">
                    <CardHeader>
                        <CardTitle>All Users</CardTitle>
                        <CardDescription>Manage your platform users and their access</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Modules</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge variant={user.role === "Admin" ? "default" : "secondary"} className="gap-1">
                                                <Shield className="w-3 h-3" />
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="border-green-500/50 text-green-400">
                                                {user.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{user.modules}/24</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex gap-2 justify-end">
                                                <Button variant="ghost" size="icon">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </DashboardLayout>
    );
};

export default Users;
