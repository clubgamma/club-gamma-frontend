import React from 'react';
import { Dock, DockIcon } from "@/components/ui/dock";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Home, Trophy, BarChart3, HelpCircle, FolderKanban } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from 'react-router-dom';

const DOCK_ITEMS = [
    {
        icon: Home,
        label: "Home",
        scrollTo: "hero",
        path: "/hacktoberfest2024",
    },
    {
        type: "separator"
    },
    {
        icon: Trophy,
        label: "Leaderboard",
        path: "/hacktoberfest2024/leaderboard",
    },
    {
        icon: BarChart3,
        label: "Statistics",
        scrollTo: "stat",
        path: "/hacktoberfest2024",
    },
    {
        icon: FolderKanban,
        label: "Projects",
        scrollTo: "projects",
        path: "/hacktoberfest2024",  
    },
    {
        icon: HelpCircle,
        label: "Q&A",
        scrollTo: "q&a",
        path: "/hacktoberfest2024", 
    },
];

const Docks = () => {
    const navigate = useNavigate();

    const handleClick = (item) => {
        if (item.path === "/hacktoberfest2024") {
            navigate("/hacktoberfest2024", { state: { scrollTo: item.scrollTo } });
        } else {
            navigate(item.path);
        }
    };

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            <div className="absolute inset-0" />
            <TooltipProvider>
                <Dock
                    direction="middle"
                    className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full px-4 pointer-events-auto z-50"
                >
                    {DOCK_ITEMS.map((item, index) => (
                        item.type === "separator" ? (
                            <Separator
                                key="separator"
                                orientation="vertical"
                                className="mx-2 h-8 bg-white/10"
                            />
                        ) : (
                            <DockIcon key={item.label}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={() => handleClick(item)}
                                            className={cn(
                                                buttonVariants({ variant: "ghost", size: "icon" }),
                                                "size-12 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors",
                                            )}
                                        >
                                            <item.icon className="size-6" />
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent sideOffset={4}>
                                        <p className="font-medium font-dm-sans">{item.label}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </DockIcon>
                        )
                    ))}
                </Dock>
            </TooltipProvider>
        </div>
    );
};

export default Docks;
