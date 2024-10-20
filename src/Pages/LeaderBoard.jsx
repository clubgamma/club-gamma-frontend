import React, { useState, useEffect, useCallback } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { GitPullRequestIcon, TrophyIcon, SearchIcon, SlidersHorizontal, Info } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import Global from "@/Global";
import 'ldrs/infinity'
import { useNavigate } from 'react-router-dom';


const LeaderBoard = () => {
    const [contributors, setContributors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [filters, setFilters] = useState({
        minPoints: 0,
        maxPoints: 100,
        minPrs: 0
    });
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentUser, setCurrentUser] = useState(null);

    const debouncedSearch = useCallback(
        debounce((value) => {
            setSearchTerm(value);
            setPage(1);
        }, 300),
        []
    );

    useEffect(() => {
        fetchCurrentUser();
        fetchContributors();
    }, [page, limit, searchTerm, filters]);

    const fetchCurrentUser = async () => {
        try {
            if (Global.user) {
                const res = await Global.httpGet(`/users/stats/${Global.user.githubId}`);
                console.log(res.user);
                setCurrentUser({ ...res.stats, ...res.user });
            }
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const fetchContributors = async () => {
        setLoading(true);
        try {
            // Initialize query parameters
            const params = new URLSearchParams();

            // Add pagination parameters
            params.append('page', page);
            params.append('limit', limit);

            // Add search term if it exists
            if (searchTerm) {
                params.append('name', searchTerm);
            }

            if (filters.minPoints > 0) {
                params.append('minPoints', filters.minPoints);
            }
            if (filters.maxPoints < 100) {
                params.append('maxPoints', filters.maxPoints);
            }
            if (filters.minPrs > 0) {
                params.append('minPrs', filters.minPrs);
            }


            // Concatenate the URL and the query string
            const url = `/leaderboard?${params.toString()}`;

            const response = await Global.httpGet(url);
            setContributors(response.contributors || []);
            setTotalPages(response.meta && response.meta.totalPages ? response.meta.totalPages : 1);
        } catch (error) {
            console.error("Error fetching contributors:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (value) => {
        debouncedSearch(value);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleLimitChange = (value) => {
        setLimit(parseInt(value));
        setPage(1);
    };

    const debouncedPointsRangeChange = useCallback(
        debounce(([min, max]) => {
            setFilters(prev => ({ ...prev, minPoints: min, maxPoints: max }));
            setPage(1);
        }, 300),
        []
        , []);

    const debouncedMinPRSChange = useCallback(
        debounce(([minPrs]) => {
            setFilters(prev => ({ ...prev, minPrs: minPrs }));
            setPage(1);
        }, 300),
        []
        , []);

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

      // redirect to point-system
      const navigate = useNavigate(); 
      const handlePointSystemClick = () => {
          
          navigate('/point-system');
        
      };

    return (
        <div className="min-h-screen font-dm-sans bg-[#1C1C1C] text-white pt-28">
            <main className="container px-4 py-8 mx-auto">
                {/* <h1 className="mb-8 text-4xl font-bold text-white">Leaderboard</h1> */}

                {/* User Stats Card */}
                {currentUser && (
                    <div className="bg-[#2A2A2A] rounded-xl shadow-lg p-6 border border-[#3A3A3A] mb-8">
                        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                            <div className="flex items-center space-x-4">
                                <img
                                    // src={currentUser.avatarUrl || "https://github.com/identicons/jasonlong.png"}
                                    src={currentUser.githubId ? `https://avatars.githubusercontent.com/${currentUser.githubId}` : "https://github.com/identicons/jasonlong.png"}
                                    alt={currentUser.username}
                                    className="w-20 h-20 rounded-full border-4 border-[#FF4545]"
                                />
                                <div>
                                    <h2 className="text-3xl font-bold text-white">{Global.user.name}</h2>
                                    <h2
                                        className="text-base text-blue-400 cursor-pointer"
                                        onClick={() => window.open(`https://github.com/${currentUser.githubId}`, '_blank')}
                                    >
                                        @{currentUser.githubId}
                                    </h2>

                                    <p className="text-[#FF4545] text-lg">Rank #{currentUser.rank}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="p-4 rounded-lg bg-[#3A3A3A]">
                                    <div className="text-3xl font-bold text-[#FF4545]">{currentUser.points}</div>
                                    <div className="text-sm text-gray-300">Points</div>
                                </div>
                                <div className="p-4 rounded-lg bg-[#3A3A3A]">
                                    <div className="text-3xl font-bold text-[#FFA500]">{currentUser.totalPRs}</div>
                                    <div className="text-sm text-gray-300">Total PRs</div>
                                </div>
                                <div className="p-4 rounded-lg bg-[#3A3A3A]">
                                    <div className="text-sm font-medium text-gray-300">PRs Status</div>
                                    <div className="mt-1 text-xs">
                                        <span className="text-green-400">{currentUser.openPRs} Open</span> |
                                        <span className="text-blue-400"> {currentUser.mergedPRs} Merged</span> |
                                        <span className="text-red-400"> {currentUser.closedPRs} Closed</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Leaderboard */}
                <div className="bg-[#2A2A2A] rounded-xl shadow-lg border border-[#3A3A3A]">
                    <div className="p-6 border-b border-[#3A3A3A]">
                        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                            <div className="flex items-center space-x-4">
                                <h2 className="text-3xl font-bold text-white">Leaderboard</h2>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="bg-[#3A3A3A] border-[#4A4A4A] hover:bg-[#4A4A4A] hover:text-[#ff3e3e] text-white"
                                    onClick={() => handlePointSystemClick()}
                                >
                                    <Info className="w-4 h-4 mr-2" />
                                    Point System
                                </Button>
                            </div>
                            <div className="flex items-center">

                                <div className="relative pr-3 ml-auto w-72 md:w-64">
                                    <SearchIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                                    <Input
                                        placeholder="Search contributors..."
                                        className="pl-10 bg-[#3A3A3A] border-[#4A4A4A] text-white placeholder-gray-400 w-full"
                                        onChange={(e) => handleSearch(e.target.value)}
                                    />
                                </div>
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button variant="outline" size="icon" className="bg-[#3A3A3A] border-[#4A4A4A] hover:bg-[#4A4A4A]">
                                            <SlidersHorizontal className="w-5 h-5" />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent className="bg-[#2A2A2A] text-white">
                                        <SheetHeader>
                                            <SheetTitle className="text-white">Filters</SheetTitle>
                                            <SheetDescription className="text-gray-400">
                                                Adjust the filters to refine the leaderboard
                                            </SheetDescription>
                                        </SheetHeader>
                                        <div className="py-4 space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Points Range</label>
                                                <Slider
                                                    defaultValue={[filters.minPoints, filters.maxPoints]}
                                                    max={100}
                                                    step={1}
                                                    onValueChange={debouncedPointsRangeChange}
                                                    className="bg-[#3A3A3A]"
                                                />
                                                <div className="flex justify-between text-sm text-gray-400">
                                                    <span>{filters.minPoints}</span>
                                                    <span>{filters.maxPoints}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">Minimum PRs</label>
                                                <Slider
                                                    defaultValue={[filters.minPrs]}
                                                    max={50}
                                                    step={1}
                                                    onValueChange={debouncedMinPRSChange}
                                                    className="bg-[#3A3A3A]"
                                                />
                                                <div className="text-sm text-gray-400">
                                                    {filters.minPrs} PRs
                                                </div>
                                            </div>
                                        </div>
                                    </SheetContent>
                                </Sheet>
                            </div>

                        </div>
                    </div>

                    <div className="overflow-x-auto">

                        <table className="w-full">
                            <thead className="bg-[#3A3A3A]">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Rank</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Points</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">PRs</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#3A3A3A]">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-4 text-center text-gray-400">
                                            <l-infinity
                                                size="55"
                                                stroke="4"
                                                stroke-length="0.15"
                                                bg-opacity="0.1"
                                                speed="1.3"
                                                color="white"
                                            ></l-infinity>
                                        </td>
                                    </tr>
                                ) : contributors.map((contributor, index) => (
                                    <tr key={contributor.githubId} className={`hover:bg-[#3A3A3A] transition-colors ${index % 2 === 0 ? 'bg-[#2A2A2A]' : 'bg-[#333333]'}`}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {contributor.rank <= 3 ? (
                                                    <TrophyIcon className={`h-6 w-6 ${contributor.rank === 1 ? 'text-[#FFD700]' :
                                                        contributor.rank === 2 ? 'text-[#C0C0C0]' :
                                                            'text-[#CD7F32]'
                                                        }`} />
                                                ) : (
                                                    <span className="text-gray-400 font-medium">#{contributor.rank}</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-3 whitespace-nowrap">
                                            <div className="flex items-center">
                                                {/* <img className="h-10 w-10 rounded-full border-2 border-[#FF4545]" src={contributor.avatarUrl || "https://github.com/identicons/jasonlong.png"} alt="" /> */}
                                                <img
                                                    className="h-12 w-12 rounded-full border-2 border-[#FF4545]"
                                                    src={contributor.githubId ? `https://avatars.githubusercontent.com/${contributor.githubId}` : "https://github.com/identicons/jasonlong.png"}
                                                    alt="Contributor's avatar"
                                                />
                                                <div className="ml-4">
                                                    <Link to={`https://github.com/${contributor.githubId}`} target="_blank" rel="noopener noreferrer">
                                                        <div className="text-sm font-medium text-white">{contributor.githubId}</div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                            <div className="text-[#FF4545] font-bold">{contributor.points}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                            <div className="flex items-center justify-end space-x-2">
                                                <GitPullRequestIcon className="h-5 w-5 text-[#FFA500]" />
                                                <span className="text-white font-medium">{contributor.prs.opened + contributor.prs.merged + contributor.prs.closed}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            ) : contributors.map((contributor, index) => (
                                <tr key={contributor.githubId} className={`hover:bg-[#3A3A3A] transition-colors ${index % 2 === 0 ? 'bg-[#2A2A2A]' : 'bg-[#333333]'}`}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {contributor.rank <= 3 ? (
                                                <TrophyIcon className={`h-6 w-6 ${contributor.rank === 1 ? 'text-[#FFD700]' :
                                                    contributor.rank === 2 ? 'text-[#C0C0C0]' :
                                                        'text-[#CD7F32]'
                                                }`} />
                                            ) : (
                                                <span className="font-medium text-gray-400">#{contributor.rank}</span>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 whitespace-nowrap">
                                        <div className="flex items-center">
                                            {/* <img className="h-10 w-10 rounded-full border-2 border-[#FF4545]" src={contributor.avatarUrl || "https://github.com/identicons/jasonlong.png"} alt="" /> */}
                                            <img
                                                className="h-12 w-12 rounded-full border-2 border-[#FF4545]"
                                                src={contributor.githubId ? `https://avatars.githubusercontent.com/${contributor.githubId}` : "https://github.com/identicons/jasonlong.png"}
                                                alt="Contributor's avatar"
                                            />
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-white">{contributor.githubId}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                                        <div className="text-[#FF4545] font-bold">{contributor.points}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-right whitespace-nowrap">
                                        <div className="flex items-center justify-end space-x-2">
                                            <GitPullRequestIcon className="h-5 w-5 text-[#FFA500]" />
                                            <span className="font-medium text-white">{contributor.prs.opened + contributor.prs.merged + contributor.prs.closed}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-[#3A3A3A]">
                        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                            <Select value={limit.toString()} onValueChange={handleLimitChange}>
                                <SelectTrigger className="w-[180px] bg-[#3A3A3A] border-[#4A4A4A] text-white">
                                    <SelectValue placeholder="Select rows per page" />
                                </SelectTrigger>
                                <SelectContent className="bg-[#3A3A3A] border-[#4A4A4A] text-white">
                                    <SelectItem value="5">5 per page</SelectItem>
                                    <SelectItem value="10">10 per page</SelectItem>
                                    <SelectItem value="20">20 per page</SelectItem>
                                    <SelectItem value="50">50 per page</SelectItem>
                                </SelectContent>
                            </Select>

                            <Pagination>
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious
                                            onClick={() => handlePageChange(page - 1)}
                                            disabled={page <= 1}
                                            className="bg-[#3A3A3A] border-[#4A4A4A] text-white hover:bg-[#4A4A4A]"
                                        />
                                    </PaginationItem>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                onClick={() => handlePageChange(i + 1)}
                                                isActive={page === i + 1}
                                                className={`${page === i + 1 ? 'bg-[#FF4545] text-white' : 'bg-[#3A3A3A] text-white'} border-[#4A4A4A] hover:bg-[#4A4A4A]`}
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                        <PaginationNext
                                            onClick={() => handlePageChange(page + 1)}
                                            disabled={page >= totalPages}
                                            className="bg-[#3A3A3A] border-[#4A4A4A] text-white hover:bg-[#4A4A4A]"
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LeaderBoard;
