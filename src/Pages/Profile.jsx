import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
    GitPullRequest,
    Users,
    Star,
    GitFork,
    Github,
    Building2,
    Link as LinkIcon,
    MapPin
} from 'lucide-react';
import Global from '@/Global';
import { useParams } from 'react-router-dom';
import ProgressLevel from '@/components/ProgressLevel';



const ContributionBox = ({ value, date }) => {
    const getBackgroundColor = (value) => {
        if (!value) return 'bg-gray-700';
        if (value === 1) return 'bg-red-200';
        if (value === 2) return 'bg-red-400';
        if (value === 3) return 'bg-red-600';
        if (value === 4) return 'bg-red-800';
        if (value >= 5) return 'bg-red-950';
        return 'bg-red-500';
    };

    return (
        <div className="w-6 h-6">
            <TooltipProvider>
                <Tooltip delayDuration={200}>
                    <TooltipTrigger asChild>
                        <div 
                            className={`${getBackgroundColor(value)} w-full h-full rounded-sm cursor-pointer`}
                            aria-label={`${value || 'No'} contribution${value !== 1 ? 's' : ''} on ${date}`}
                        />
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className='font-dm-sans'>{value || 'No'} contribution{value !== 1 ? 's' : ''} on {date}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};
const ContributionCalendar = ({ userPRs }) => {
    const prData = userPRs.prCountPerDay;
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const startOfMonth = new Date(2024, 9, 1);
    const startDay = startOfMonth.getDay();

    const getDaysInMonth = () => {
        const daysArray = [];
        const lastDay = new Date(2024, 10, 0).getDate();

        for (let day = 1; day <= lastDay; day++) {
            const dateStr = `2024-10-${String(day).padStart(2, '0')}`;
            const contributionCount = prData[dateStr] || 0;
            daysArray.push({
                date: dateStr,
                value: contributionCount
            });
        }
        return daysArray;
    };

    const days = getDaysInMonth();

    return (
        <Card className="bg-gradient-to-br w-full sm:w-[500px] flex justify-center from-[#2a2a2a] to-[#3d2929] border-[#4e3535]">
            <CardContent className="p-4 sm:p-6 w-full sm:w-[500px]">
                <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
                    Contribution Activity
                </h2>

                <div className="grid grid-cols-7 gap-1 mb-2">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="text-[10px] sm:text-xs text-gray-400">
                            {day}
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: startDay }).map((_, i) => (
                        <div key={`empty-${i}`} className="w-4 h-4 sm:w-6 sm:h-6" />
                    ))}
                    {days.map((day) => (
                        <ContributionBox
                            key={day.date}
                            value={day.value}
                            date={day.date}
                            className="w-4 h-4 sm:w-6 sm:h-6"
                        />
                    ))}
                </div>

                <div className="mt-4 flex items-center justify-end space-x-1 sm:space-x-2 text-[10px] sm:text-sm text-gray-400">
                    <span>Less</span>
                    <div className="bg-red-100 w-2 h-2 sm:w-3 sm:h-3 rounded-sm" />
                    <div className="bg-red-200 w-2 h-2 sm:w-3 sm:h-3 rounded-sm" />
                    <div className="bg-red-300 w-2 h-2 sm:w-3 sm:h-3 rounded-sm" />
                    <div className="bg-red-500 w-2 h-2 sm:w-3 sm:h-3 rounded-sm" />
                    <div className="bg-red-700 w-2 h-2 sm:w-3 sm:h-3 rounded-sm" />
                    <span>More</span>
                </div>
            </CardContent>
        </Card>
    );
};

const StatusBadge = ({ state }) => {
    const variants = {
        merged: "bg-purple-900/20 text-purple-400 border-purple-900/50",
        open: "bg-green-900/20 text-green-400 border-green-900/50",
        closed: "bg-red-900/20 text-red-400 border-red-900/50"
    };

    return (
        <Badge variant="outline" className={`${variants[state]} border`}>
            {state.charAt(0).toUpperCase() + state.slice(1)}
        </Badge>
    );
};

const StatCard = ({ value, label, icon: Icon }) => (
    <Card className="bg-gradient-to-br from-[#2a2a2a] to-[#3d2929] border-[#4e3535] hover:border-red-900 transition-all duration-300">
        <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Icon className="h-5 w-5 text-red-400 mb-2" />
            <div className="text-xl sm:text-2xl font-bold text-white">{value}</div>
            <div className="text-sm text-zinc-400">{label}</div>
        </CardContent>
    </Card>
);

const ProfileSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e1e] to-[#4e3535] p-4 sm:p-8 pt-24 sm:pt-32">
        <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 mb-8">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="flex-1">
                    <Skeleton className="h-8 w-48 mb-2" />
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-4 w-64" />
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
                {[...Array(5)].map((_, i) => (
                    <Card key={i} className="bg-[#2a2a2a]">
                        <CardContent className="p-4">
                            <Skeleton className="h-8 w-16 mb-2" />
                            <Skeleton className="h-4 w-20" />
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Skeleton className="h-8 w-48 mb-4" />
            <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                    <Skeleton key={i} className="h-24 w-full" />
                ))}
            </div>
        </div>
    </div>
);

export default function GitHubProfile() {
    const [userData, setUserData] = useState(null);
    const [userPRs, setUserPRs] = useState(null);
    const [error, setError] = useState(null);
    const { username } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchData = async () => {
            try {
                const { user, stats } = await Global.httpGet(`/users/stats/${username}`);
                setUserData({ ...user, ...stats });
                console.log(user, stats);
                setUserPRs(stats);
                document.title = `Profile | ${user.name}`;
            } catch (err) {
                setError('Profile not found');
            }
        };

        fetchData();
    }, [username]);

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#1e1e1e] to-[#4e3535] flex items-center justify-center p-4">
                <Card className="bg-gradient-to-br from-[#2a2a2a] to-[#3d2929] border-red-900">
                    <CardContent className="p-8 text-center">
                        <Github className="h-12 w-12 text-red-400 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-white mb-2">{error}</h2>
                        <p className="text-zinc-400">Please check the username and try again</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (!userData) {
        return <ProfileSkeleton />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br font-dm-sans from-[#1e1e1e] to-[#4e3535] p-4 sm:p-8 pt-24 sm:pt-32">
            <div className="max-w-4xl mx-auto">
                <Card className="bg-gradient-to-br from-[#2a2a2a] to-[#3d2929] border-[#4e3535] mb-8">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <img
                                src={userData.avatar || 'default-avatar.png'}
                                alt={userData.name}
                                className="w-24 h-24 rounded-full border-2 border-red-500"
                            />
                            <div className="flex-1 flex flex-col justify-center">
                                <h1 className="text-2xl font-bold text-white mb-1">{userData.name}</h1>
                                {userData.bio && (
                                    <p className="text-zinc-300 mb-2">{userData.bio}</p>
                                )}
                                {(userData.company || userData.location || userData.blog) && (
                                    <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
                                        {userData.company && (
                                            <div className="flex items-center gap-1">
                                                <Building2 className="h-4 w-4" />
                                                {userData.company}
                                            </div>
                                        )}
                                        {userData.location && (
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                {userData.location}
                                            </div>
                                        )}
                                        {userData.blog && (
                                            <div className="flex items-center gap-1">
                                                <LinkIcon className="h-4 w-4" />
                                                <a href={userData.blog} target="_blank" rel="noopener noreferrer"
                                                    className="text-red-400 hover:text-red-300 transition-colors">
                                                    {userData.blog.replace(/^https?:\/\//, '')}
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
                    <StatCard value={userData.points} label="Points" icon={Star} />
                    <StatCard value={userData.mergedPRs} label="Merged PRs" icon={GitPullRequest} />
                    <StatCard value={userData.repositories} label="Repositories" icon={GitFork} />
                    <StatCard value={userData.followers} label="Followers" icon={Users} />
                    <StatCard value={userData.following} label="Following" icon={Users} />
                </div>

                <div className="mb-8 w-full flex justify-between">
                    <ContributionCalendar userPRs={userPRs} />
                    <ProgressLevel  userData={userData} />
                </div>
                <div className="space-y-8 ">

                    <Card className="bg-gradient-to-br from-[#2a2a2a] to-[#3d2929] border-[#4e3535]">
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold text-white mb-4">Recent Pull Requests</h2>
                            <div className="space-y-3">
                                {userData.prs.map((pr, index) => (
                                    <a href={pr.url} key={index} target="_blank" rel="noopener noreferrer">
                                        <Card key={index} className="bg-[#1e1e1e]/50 border-[#4e3535] hover:border-red-900 transition-all duration-300">
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex items-start gap-3 min-w-0">
                                                        <GitPullRequest className="h-5 w-5 text-red-400 mt-1" />
                                                        <div className="min-w-0">
                                                            <div className="font-medium text-white truncate">
                                                                {pr.title}
                                                            </div>
                                                            <div className="text-sm text-zinc-400 truncate">
                                                                {pr.url}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <StatusBadge state={pr.state} />
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </a>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
