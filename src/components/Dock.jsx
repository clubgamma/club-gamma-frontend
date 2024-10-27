import React from 'react';
import { Dock, DockIcon } from "@/components/ui/dock";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { Home, Trophy, BarChart3, HelpCircle, FolderKanban } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from 'react-router-dom';

const HacktoberfestIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 300 300"
        width="1em"
        height="1em"
        fill="currentColor"
        {...props}
    >
        <polygon xmlns="http://www.w3.org/2000/svg" className="cls-1" points="134.53 199.52 134.53 67.19 101.45 67.19 101.45 100.28 67.81 100.28 67.81 133.36 101.45 133.36 101.45 199.52 67.81 199.52 67.81 232.6 167.06 232.6 167.06 199.52 134.53 199.52" />
        <polygon xmlns="http://www.w3.org/2000/svg" className="cls-1" points="233.11 199.58 233.11 100.33 200.03 100.33 200.03 133.42 166.95 133.42 166.95 166.5 200.03 166.5 200.03 232.66 233.11 232.66 266.19 232.66 266.19 199.58 233.11 199.58" />
        <polygon
            className="cls-1"
            points="68.03 299.93 34.18 266.63 34.18 34.66 266.15 34.66 300 67.96 300 0 0 0 0 300 68.03 299.93"
        />
    </svg>
)

const DOCK_ITEMS = [
    {
        icon: HacktoberfestIcon,
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

const Docks = ({ sidebarOpen }) => {
    const navigate = useNavigate();

    const handleClick = (item) => {
        if (item.path === "/hacktoberfest2024") {
            navigate("/hacktoberfest2024", { state: { scrollTo: item.scrollTo } });
        } else {
            navigate(item.path);
        }
    };

    return (
        <div className={cn("fixed inset-0 z-50 pointer-events-none", {
            "pointer-events-none": sidebarOpen
        })}>
            <div className="absolute inset-0" />
            <TooltipProvider>
                <Dock
                    direction="middle"
                    className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-black/20 backdrop-blur-xl border border-white/10 rounded-full px-4 pointer-events-auto z-50"
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
