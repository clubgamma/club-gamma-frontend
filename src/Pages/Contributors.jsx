import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  GitPullRequest, 
  Trophy, 
  Users, 
  Star, 
  GitFork, 
  Eye,
  Github
} from 'lucide-react';
import Global from '@/Global';
import SEO from '@/components/SEO';

const ContributorsPage = () => {
  const { repoName } = useParams();
  const [contributors, setContributors] = useState([]);
  const [repoDetails, setRepoDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchData = async () => {
      try {
        // Fetch contributors from your API
        const contributorsResponse = await Global.httpGet(`/projects/contributors/${repoName}`);
        setContributors(contributorsResponse);

        // Fetch repo details from GitHub API
        const repoResponse = await fetch(`https://api.github.com/repos/clubgamma/${repoName}`);

        if (!repoResponse.ok) {
          throw new Error('Failed to fetch repository details');
        }

        const repoData = await repoResponse.json();
        setRepoDetails(repoData);
      } catch (error) {
        setError("Error fetching data");
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [repoName]);

  const formatNumber = (num) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num;
  };

  return (
    <>
      <SEO
        title={`Contributors`}
        pathname={`/contributors/${repoName}`}
        description="Discover the open-source contributors driving innovation at Club Gamma. Explore the people behind the projects."
        keywords={`Club Gamma,${
          repoName || "Club Gamma"
        } contributors,open source,github ${
          repoName || "Club Gamma"
        },project collaborators,developer community`}
      />
    <div className="min-h-screen p-4 sm:p-32 bg-gradient-to-br from-[#1e1e1e] to-[#4e3535] flex flex-col items-center pt-32">
      {/* Header Card */}
      <Card className="w-full max-w-4xl bg-gradient-to-br from-[#2a2a2a] to-[#3d2929] border-none mb-4 sm:mb-8">
        <CardContent className="p-4 sm:p-6">
          {repoDetails ? (
            <div className="space-y-4">
              {/* Top Row */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Github className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                    <h1 className="text-2xl sm:text-4xl font-bold text-white break-all">
                      {repoDetails.name}
                    </h1>
                  </div>
                  <p className="text-sm sm:text-base text-slate-300 max-w-xl">
                    {repoDetails.description}
                  </p>
                </div>
                <a 
                  href={repoDetails.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-red-900/20 hover:bg-red-900/30 text-red-400 px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <span>View on GitHub</span>
                </a>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                  <span className="text-sm sm:text-base text-slate-300">
                    {formatNumber(repoDetails.stargazers_count)} Stars
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <GitFork className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                  <span className="text-sm sm:text-base text-slate-300">
                    {formatNumber(repoDetails.forks_count)} Forks
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                  <span className="text-sm sm:text-base text-slate-300">
                    {formatNumber(repoDetails.watchers_count)} Watchers
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                  <span className="text-sm sm:text-base text-slate-300">
                    {contributors.length} Contributors
                  </span>
                </div>
              </div>

              {/* Topics */}
              {repoDetails.topics && repoDetails.topics.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {repoDetails.topics.map((topic, index) => (
                    <Badge 
                      key={index}
                      className="text-xs sm:text-sm bg-red-900/20 text-red-400 hover:bg-red-900/30"
                    >
                      {topic}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ) : error ? (
            <p className="text-red-400">Error loading repository details</p>
          ) : (
            <div className="animate-pulse">
              <div className="h-8 bg-slate-700 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-slate-700 rounded w-2/3"></div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contributors Grid */}
      <div className="w-full max-w-4xl">
        {error ? (
          <Card className="bg-red-900/20 border-red-500">
            <CardContent className="p-4 sm:p-6">
              <p className="text-center text-red-400">{error}</p>
            </CardContent>
          </Card>
        ) : contributors.length === 0 ? (
          <Card className="bg-[#2a2a2a]/50">
            <CardContent className="p-4 sm:p-6">
              <p className="text-center text-slate-400">No contributors found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {contributors.map((contributor, index) => (
              <Card 
                key={index}
                className="group bg-gradient-to-br from-[#2a2a2a] to-[#3d2929] hover:from-[#3d2929] hover:to-[#2a2a2a] transition-all duration-300 border-[#4e3535] hover:border-red-900"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="relative">
                        <img 
                          src={`https://avatars.githubusercontent.com/${contributor.githubId}`} 
                          alt={`${contributor.name}'s profile`} 
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full ring-2 ring-red-900 ring-offset-2 ring-offset-[#2a2a2a]"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-red-900 rounded-full p-1">
                          <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base sm:text-base font-semibold text-white mb-2 break-all">
                          {contributor.name}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="text-xs sm:text-sm bg-red-900/20 text-red-400 hover:bg-red-900/30">
                            <GitPullRequest className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                            {contributor.prsCount} PRs
                          </Badge>
                          <Badge className="text-xs sm:text-sm bg-red-900/20 text-red-400 hover:bg-red-900/30">
                            {contributor.totalPoints} Points
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <a 
                      href={contributor.profileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="shrink-0 ml-2"
                    >
                      <Badge className="text-xs sm:text-sm bg-red-900/20 hover:bg-red-900/30 text-red-400 transition-colors duration-300">
                        View Profile
                      </Badge>
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
      </div>
      </>
  );
};

export default ContributorsPage;