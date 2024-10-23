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
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  GitPullRequestIcon,
  TrophyIcon,
  SearchIcon,
  SlidersHorizontal,
  Info,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
import { Link, useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import SEO from "@/components/SEO";

const LeaderBoard = () => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    minPoints: 0,
    maxPoints: 100,
    minPrs: 0,
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
        const res = await Global.httpGet(
          `/users/stats/${Global.user.githubId}`
        );
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
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", limit);
      if (searchTerm) {
        params.append("name", searchTerm);
      }
      if (filters.minPoints > 0) {
        params.append("minPoints", filters.minPoints);
      }
      if (filters.maxPoints < 100) {
        params.append("maxPoints", filters.maxPoints);
      }
      if (filters.minPrs > 0) {
        params.append("minPrs", filters.minPrs);
      }
      const url = `/leaderboard?${params.toString()}`;
      const response = await Global.httpGet(url);
      setContributors(response.contributors || []);
      setTotalPages(
        response.meta && response.meta.totalPages ? response.meta.totalPages : 1
      );
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
      setFilters((prev) => ({ ...prev, minPoints: min, maxPoints: max }));
      setPage(1);
    }, 300),
    []
  );

  const debouncedMinPRSChange = useCallback(
    debounce(([minPrs]) => {
      setFilters((prev) => ({ ...prev, minPrs: minPrs }));
      setPage(1);
    }, 300),
    []
  );

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

  const navigate = useNavigate();
  const handlePointSystemClick = () => {
    navigate("/point-system");
  };

  const renderPaginationNumbers = () => {
    const items = [];

    items.push(
      <PaginationItem key={1}>
        <PaginationLink
          onClick={() => handlePageChange(1)}
          className={`${page === 1 ? "bg-red-500" : "bg-[#3A3A3A]"
            } text-white rounded-md px-3 py-2 hover:cursor-pointer hover:bg-[#4A4A4A]`}
        >
          1
        </PaginationLink>
      </PaginationItem>
    );

    let startPage = Math.max(2, page - 1);
    let endPage = Math.min(totalPages - 1, page + 1);

    if (startPage > 2) {
      items.push(<PaginationEllipsis key="ellipsis-1" />);
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            className={`${page === i ? "bg-red-500" : "bg-[#3A3A3A]"
              } text-white rounded-md px-3 py-2 hover:cursor-pointer hover:bg-[#4A4A4A]`}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages - 1) {
      items.push(<PaginationEllipsis key="ellipsis-2" />);
    }

    if (totalPages > 1) {
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            className={`${page === totalPages ? "bg-red-500" : "bg-[#3A3A3A]"
              } text-white rounded-md px-3 py-2 hover:cursor-pointer hover:bg-[#4A4A4A]`}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <>
      <SEO
        pathname="/leaderboard"
        title={"Leaderboard"}
        description="Track and explore Club Gamma's top contributors on our leaderboard. View rankings, points, and pull request statistics for our open-source community."
        keywords="Club Gamma, Club Gamma leaderboard, open source contributions, GitHub contributors, developer achievements, contribution metrics, pull request tracking, developer badges, Club Gamma community, contribution points, open source community"
      />
      <div className="min-h-screen font-dm-sans text-white pt-16 md:pt-28 bg-gradient-to-br from-[#1e1e1e] to-[#4e3535] overflow-hidden">
        <main className="container px-4 py-8 mx-auto">
          {currentUser && (
            <div className="bg-[#1e1e1e]/50 backdrop-blur-sm rounded-xl shadow-lg p-4 md:p-6 border border-[#4e3535]/30 mb-8">
              <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  <img
                    src={
                      currentUser.githubId
                        ? `https://avatars.githubusercontent.com/${currentUser.githubId}`
                        : "https://github.com/identicons/jasonlong.png"
                    }
                    alt={currentUser.username}
                    className="w-20 h-20 rounded-full border-4 border-[#4e3535]"
                  />
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-white md:text-3xl">
                      {Global.user.name}
                    </h2>
                    <h2
                      className="text-base text-blue-400 cursor-pointer"
                      onClick={() =>
                        window.open(
                          `https://github.com/${currentUser.githubId}`,
                          "_blank"
                        )
                      }
                    >
                      @{currentUser.githubId}
                    </h2>
                    <p className="text-[#FF4545] text-lg">
                      Rank #{currentUser.rank}
                    </p>
                  </div>
                </div>
                <div className="grid w-full grid-cols-3 gap-2 text-center md:gap-4 md:w-auto">
                  <div className="p-2 md:p-4 rounded-lg bg-[#1e1e1e]/70 backdrop-blur-sm">
                    <div className="text-xl md:text-3xl font-bold text-[#FF4545]">
                      {currentUser.points}
                    </div>
                    <div className="text-xs text-gray-300 md:text-sm">Points</div>
                  </div>
                  <div className="p-2 md:p-4 rounded-lg bg-[#1e1e1e]/70 backdrop-blur-sm">
                    <div className="text-xl md:text-3xl font-bold text-[#FFA500]">
                      {currentUser.totalPRs}
                    </div>
                    <div className="text-xs text-gray-300 md:text-sm">
                      Total PRs
                    </div>
                  </div>
                  <div className="p-2 md:p-4 rounded-lg bg-[#1e1e1e]/70 backdrop-blur-sm">
                    <div className="text-xs font-medium text-gray-300 md:text-sm">
                      PRs Status
                    </div>
                    <div className="mt-1 text-xs">
                      <span className="text-green-400">
                        {currentUser.openPRs} Open
                      </span>{" "}
                      |
                      <span className="text-blue-400">
                        {" "}
                        {currentUser.mergedPRs} Merged
                      </span>{" "}
                      |
                      <span className="text-red-400">
                        {" "}
                        {currentUser.closedPRs} Closed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-[#1e1e1e]/50 backdrop-blur-sm rounded-xl shadow-lg border border-[#4e3535]/30">
            <div className="p-4 md:p-6 border-b border-[#4e3535]/30">
              <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
                <div className="flex items-center space-x-4">
                  <h2 className="text-2xl font-bold text-white md:text-3xl">
                    Leaderboard
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-[#1e1e1e]/70 border-[#4e3535]/50 hover:bg-[#4e3535]/30 hover:text-white text-white"
                    onClick={handlePointSystemClick}
                  >
                    <Info className="w-4 h-4 mr-2" />
                    Point System
                  </Button>
                </div>
                <div className="flex items-center w-full md:w-auto">
                  <div className="relative w-full pr-3 md:w-64">
                    <SearchIcon className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                    <Input
                      placeholder="Search contributors..."
                      className="pl-10 bg-[#1e1e1e]/70 border-[#4e3535]/50 text-white placeholder-gray-400 w-full"
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="bg-[#3A3A3A] border-[#4A4A4A] hover:bg-[#4A4A4A]"
                      >
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
                          <label className="text-sm font-medium text-gray-300">
                            Points Range
                          </label>
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
                          <label className="text-sm font-medium text-gray-300">
                            Minimum PRs
                          </label>
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

            {/* Leaderboard */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#1e1e1e]/70">
                  <tr>
                    <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                      Rank
                    </th>
                    <th className="px-4 py-3 text-xs font-medium tracking-wider text-left text-gray-300 uppercase">
                      User
                    </th>
                    <th className="px-4 py-3 text-xs font-medium tracking-wider text-right text-gray-300 uppercase">
                      Points
                    </th>
                    <th className="px-4 py-3 text-xs font-medium tracking-wider text-right text-gray-300 uppercase">
                      PRs
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#4e3535]/30">
                  {loading ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-4 py-4 text-center text-gray-400"
                      >
                        <Loader />
                      </td>
                    </tr>
                  ) : (
                    contributors.map((contributor, index) => (
                      <tr
                        key={contributor.githubId}
                        className={`hover:bg-[#4e3535]/20 transition-colors ${index % 2 === 0 ? "bg-[#1e1e1e]/30" : "bg-[#1e1e1e]/50"
                          }`}
                      >
                        <td className="px-4 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {contributor.rank <= 3 ? (
                              <TrophyIcon
                                className={`h-6 w-6 ${contributor.rank === 1
                                  ? "text-[#FFD700]"
                                  : contributor.rank === 2
                                    ? "text-[#C0C0C0]"
                                    : "text-[#CD7F32]"
                                  }`}
                              />
                            ) : (
                              <span className="font-medium text-gray-400">
                                #{contributor.rank}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              className="h-10 w-10 rounded-full border-2 border-[#FF4545]"
                              src={
                                contributor.githubId
                                  ? `https://avatars.githubusercontent.com/${contributor.githubId}`
                                  : "https://github.com/identicons/jasonlong.png"
                              }
                              alt="Contributor's avatar"
                            />
                            <div className="flex items-center ml-4">
                              <Link
                                to={`/profile/${contributor.githubId}`}
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-white hover:cursor-pointer"
                              >
                                {contributor.githubId}
                              </Link>

                              {/* badge tag */}
                              <span
                                className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${contributor.points >= 40 ? 'bg-yellow-500' :
                                  contributor.points >= 20 ? 'bg-purple-500' :
                                    contributor.points >= 10 ? 'bg-blue-500' :
                                      contributor.points >= 1 ? 'bg-green-500' :
                                        'bg-gray-500'
                                  } text-white`}
                              >
                                {contributor.points >= 40 ? 'Master' :
                                  contributor.points >= 20 ? 'Expert' :
                                    contributor.points >= 10 ? 'Regular' :
                                      contributor.points >= 1 ? 'Contributor' :
                                        'Newcomer'}
                              </span>

                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-right whitespace-nowrap">
                          <div className="text-[#FF4545] font-bold">
                            {contributor.points}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-right whitespace-nowrap">
                          <div className="flex items-center justify-end space-x-2">
                            <GitPullRequestIcon className="h-5 w-5 text-[#FFA500]" />
                            <span className="font-medium text-white">
                              {contributor.prs.opened +
                                contributor.prs.merged +
                                contributor.prs.closed}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-[#4e3535]/30">
              <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">

                {/* select rows per page */}
                <Select
                  value={limit.toString()}
                  onValueChange={handleLimitChange}
                >
                  <SelectTrigger className="w-full md:w-[180px] bg-[#1e1e1e]/70 border-[#4e3535]/50 text-white">
                    <SelectValue placeholder="Select rows per page" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1e1e1e]/90 border-[#4e3535]/50 text-white">
                    <SelectItem value="5">5 per page</SelectItem>
                    <SelectItem value="10">10 per page</SelectItem>
                    <SelectItem value="20">20 per page</SelectItem>
                    <SelectItem value="50">50 per page</SelectItem>
                  </SelectContent>
                </Select>

                {/* Pagination */}
                <Pagination>
                  <PaginationContent className="flex items-center space-x-1">
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => page > 1 && handlePageChange(page - 1)}
                        className={`text-white bg-[#1e1e1e]/70 rounded-md p-2 hover:cursor-pointer
                        ${page <= 1 ? "opacity-50 pointer-events-none" : "hover:bg-[#4e3535]/30"}`}
                        aria-disabled={page <= 1}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </PaginationLink>
                    </PaginationItem>

                    {renderPaginationNumbers()}

                    <PaginationItem>
                      <PaginationLink
                        onClick={() => page < totalPages && handlePageChange(page + 1)}
                        className={`text-white bg-[#3A3A3A] rounded-md p-2 hover:cursor-pointer
                        ${page >= totalPages ? "opacity-50 pointer-events-none" : "hover:bg-[#4A4A4A]"}`}
                        aria-disabled={page >= totalPages}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </PaginationLink>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>

              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default LeaderBoard;