import ProgressLevel from '@/components/ProgressLevel';
import SyncPRs from '@/components/SyncPRs';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Global from '@/Global';
import { cn } from '@/lib/utils';
import {
    Building2,
    GitFork,
    Github,
    GitPullRequest,
    Link as LinkIcon,
    MapPin,
    Scroll,
    SquareArrowOutUpRight,
    Star,
    Users
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProjectContributions from '@/components/ProjectContributions';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const NoPRsIllustration = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="200"
    height="200"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-zinc-600"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

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
            <CardContent className="p-4 sm:p-6 w-full">
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
        merged: "bg-purple-900/20 text-purple-400 border-purple-900/50 hidden sm:block",
        open: "bg-green-900/20 text-green-400 border-green-900/50",
        closed: "bg-red-900/20 text-red-400 border-red-900/50"
    };

    return (
        <Badge variant="outline" className={`${variants[state]} border`}>
            {state.charAt(0).toUpperCase() + state.slice(1)}
        </Badge>
    );
};

const ContributionBadge = ({ label }) => {
    if (!label) return null;
    const variants = {
        'level 1': "bg-blue-900/20 text-blue-400 border-blue-900/50",
        'level 2': "bg-teal-900/20 text-teal-400 border-teal-900/50",
        'level 3': "bg-yellow-900/20 text-yellow-400 border-yellow-900/50",
        'level 4': "bg-red-900/20 text-red-400 border-red-900/50",
        'documentation': "bg-indigo-900/20 text-indigo-400 border-indigo-900/50",
        'bug': "bg-orange-900/20 text-orange-400 border-orange-900/50"
    };

    const text = {
        'level 1': 'lvl 1',
        'level 2': 'lvl 2',
        'level 3': 'lvl 3',
        'level 4': 'lvl 4',
        'documentation': 'docs',
        'bug': 'bug'
    };

    return (
        <Badge variant="outline" className={`${variants[label.toLowerCase()] || "bg-gray-900/20 text-gray-400 border-gray-900/50"} border`}>
            <span className='sm:block hidden'>
                {label.toLowerCase()!="documentation" ? label : "docs"}
            </span>
            <span className='block sm:hidden'>
                {text[label.toLowerCase()]}
            </span>

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
      const [prFilter, setPrFilter] = useState('all');

  const filteredPRs = useMemo(() => {
    if (!userData) return [];
    return userData.prs.filter(pr => {
      if (prFilter === 'all') return true;
      if (['open', 'closed', 'merged'].includes(prFilter)) return pr.state === prFilter;
      return pr.label && pr.label.toLowerCase() === prFilter;
    });
  }, [userData, prFilter]);


    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchData = async () => {
            try {
                const { user, stats, projectContributions } = await Global.httpGet(`/users/stats/${username}`);
                setUserData({ ...user, ...stats, projectContributions });
                setUserPRs(stats);
                console.log(user, stats, projectContributions);
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
            <div className="max-w-5xl mx-auto">
                <Card className="bg-gradient-to-br from-[#2a2a2a] to-[#3d2929] border-[#4e3535] mb-8">
                    <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                            <img
                                src={`https://avatars.githubusercontent.com/${userData.githubId}` || 'default-avatar.png'}
                                alt={userData.name}
                                className="w-24 h-24 rounded-full border-2 border-red-500"
                            />
                            <div className="flex-1 flex flex-col justify-center">
                                <div className="flex items-center justify-between">
                                    <h1 className="text-2xl font-bold text-white mb-1 flex items-center">
                                        {userData.name}
                                        <a
                                            href={`https://github.com/${userData.githubId}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ml-2"
                                        >
                                            <SquareArrowOutUpRight className="w-5 h-5 text-white opacity-75 hover:opacity-100 transition-opacity" />
                                        </a>
                                    </h1>
                                </div>
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

                <div className="grid grid-cols-2  sm:grid-cols-5 gap-4 mb-8">
                    <StatCard value={userData.points} label="Points" icon={Star} />
                    <StatCard value={userData.mergedPRs} label="Merged PRs" icon={GitPullRequest} />
                    <StatCard value={userData.repositories} label="Repositories" icon={GitFork} />
                    <StatCard value={userData.followers} label="Followers" icon={Users} />
                    <StatCard value={userData.following} label="Following" icon={Users} />
                </div>

                <div className="pb-8">
                    <ProjectContributions projectContributions={userData.projectContributions} />
                </div>

                <div className="mb-8 w-full flex flex-col gap-4 sm:flex-row justify-between">
                    <ContributionCalendar userPRs={userPRs} />
                    <ProgressLevel userData={userData} />
                </div>

                <div className="space-y-8">
        <Card className="bg-gradient-to-br from-[#2a2a2a] to-[#3d2929] border-[#4e3535]">
          <CardContent className="p-6">
            <div className='flex justify-between items-center mb-4 flex-wrap gap-2'>
                <h2 className="text-xl font-semibold text-white hidden sm:block">Recent Pull Requests</h2>
                <h2 className='text-xl font-semibold text-white block sm:hidden'>Pull Requests</h2>
              <Select value={prFilter} onValueChange={setPrFilter}>
                <SelectTrigger className="w-[140px] sm:w-[180px] bg-[#1e1e1e] text-white border-[#4e3535]">
                  <SelectValue placeholder="Filter PRs" />
                </SelectTrigger>
                  <SelectContent className="bg-[#2a2a2a] text-white border-[#4e3535] h-[180px] overflow-y-auto">
                  {/* <ScrollArea className="h-[200px] pr-0 sm:pr-4">                       */}
                    <SelectItem value="all">All PRs</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="merged">Merged</SelectItem>
                    <SelectItem value="level 1">Level 1</SelectItem>
                    <SelectItem value="level 2">Level 2</SelectItem>
                    <SelectItem value="level 3">Level 3</SelectItem>
                    <SelectItem value="level 4">Level 4</SelectItem>
                    <SelectItem value="documentation">Docs</SelectItem>
                    <SelectItem value="bug">Bug</SelectItem>
                  {/* </ScrollArea> */}
                </SelectContent>
              </Select>
            </div>
            {/* <ScrollArea className="h-[400px] pr-0 sm:pr-4"> */}
              {filteredPRs.length > 0 ? (
                <div className="space-y-3 overflow-y-auto h-[400px]">
                  {filteredPRs.map((pr, index) => (
                    <a href={`https://github.com/${pr.repository}/pull/${pr.prNumber}`} key={index} target="_blank" rel="noopener noreferrer">
                      <Card className="bg-[#1e1e1e]/50 border-[#4e3535] hover:border-red-900 transition-all duration-300 mb-1">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex items-start gap-3 min-w-0">
                              <GitPullRequest className="h-5 w-5 text-red-400 mt-1 hidden sm:block" />
                              <div className="min-w-0">
                                <div className="font-medium text-white truncate">
                                  {pr.title}
                                </div>
                                <div className="sm:text-sm text-xs text-zinc-400 truncate">
                                  {pr.repository}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <ContributionBadge label={pr.label} />
                              <StatusBadge state={pr.state} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <NoPRsIllustration />
                  <p className="text-zinc-400 mt-4">No PRs found for the selected filter.</p>
                  <p className="text-zinc-500 text-sm mt-2">Try adjusting your filter or contribute to see PRs here!</p>
                </div>
              )}
              {/* <ScrollBar
                className={cn(
                  "bg-transparent,rounded-full,w-2",
                  "sm:block hidden"
                )}
              />
            </ScrollArea> */}
          </CardContent>
        </Card>
      </div>
            </div>
        </div>
  );
}