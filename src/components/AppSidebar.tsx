import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import {
    LayoutDashboard,
    BookOpen,
    Trophy,
    Settings,
    LogOut,
    Zap,
    Box,
    User,
    Home,
    Activity
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function AppSidebar() {
    const { pathname } = useLocation();
    const { user, signOut } = useAuth();

    const items = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            title: "Experience",
            url: "/experience",
            icon: Box,
        },
    ];

    const managementItems = [
        {
            title: "Users",
            url: "/dashboard/users",
            icon: User,
        },
        {
            title: "Training Modules",
            url: "/dashboard/modules",
            icon: BookOpen,
        },
        {
            title: "AI Guide",
            url: "/dashboard/ai-guide",
            icon: Zap,
        },
        {
            title: "Environments",
            url: "/dashboard/environments",
            icon: Box,
        },
    ];

    const monitoringItems = [
        {
            title: "Live Sessions",
            url: "/dashboard/live-sessions",
            icon: Activity,
        },
        {
            title: "Analytics",
            url: "/dashboard/analytics",
            icon: Trophy,
        },
    ];

    const contentItems = [
        {
            title: "Assets Manager",
            url: "/dashboard/assets",
            icon: Box,
        },
    ];
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader>
                <div className="flex items-center gap-2 px-2 py-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Zap className="size-4" />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">VersionUp</span>
                        <span className="truncate text-xs">Enterprise</span>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        tooltip={item.title}
                                        className="transition-all duration-300 hover:shadow-[0_0_20px_hsl(188,95%,52%,0.4)] hover:border-primary/50"
                                    >
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Management</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {managementItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        tooltip={item.title}
                                        className="transition-all duration-300 hover:shadow-[0_0_20px_hsl(188,95%,52%,0.4)] hover:border-primary/50"
                                    >
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Monitoring</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {monitoringItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        tooltip={item.title}
                                        className="transition-all duration-300 hover:shadow-[0_0_20px_hsl(188,95%,52%,0.4)] hover:border-primary/50"
                                    >
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>Content</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {contentItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={pathname === item.url}
                                        tooltip={item.title}
                                        className="transition-all duration-300 hover:shadow-[0_0_20px_hsl(188,95%,52%,0.4)] hover:border-primary/50"
                                    >
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarGroup>
                    <SidebarGroupLabel>System</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton
                                    asChild
                                    tooltip="Settings"
                                    className="transition-all duration-300 hover:shadow-[0_0_20px_hsl(188,95%,52%,0.4)] hover:border-primary/50"
                                >
                                    <Link to="/dashboard/settings">
                                        <Settings />
                                        <span>Settings</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="flex items-center gap-2 p-2">
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email || ""} />
                                <AvatarFallback className="rounded-lg">
                                    <User className="h-4 w-4" />
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                <span className="truncate font-semibold">{user?.user_metadata?.first_name || "User"}</span>
                                <span className="truncate text-xs">{user?.email}</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="ml-auto h-8 w-8 group-data-[collapsible=icon]:hidden"
                                onClick={() => signOut()}
                            >
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
