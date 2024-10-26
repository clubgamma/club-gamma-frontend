import { Card, CardContent } from "@/components/ui/card";
import { GitPullRequest, Star } from "lucide-react";
import { Link } from "react-router-dom";

const ProjectContributions = ({ projectContributions }) => {
  return (
    <Card className="bg-gradient-to-br from-[#2a2a2a] to-[#3d2929] border-[#4e3535] w-full">
      <CardContent className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-white mb-4">
          Project Contributions
        </h2>
        <div className="space-y-3">
          {projectContributions.map((project, index) => (
            <Link
              key={index}
              to={`/hacktoberfest2024/contributors/${project.projectName}`}
            >
              <Card className="bg-[#1e1e1e]/50 border-[#4e3535] hover:border-red-900 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 min-w-0">
                      <GitPullRequest className="h-5 w-5 text-red-400 mt-1" />
                      <div className="min-w-0">
                        <div className="font-medium text-white truncate">
                          {project.projectName}
                        </div>
                        <div className="text-sm text-zinc-400">
                          {project.prCount} Pull Request{project.prCount !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-red-400">
                      <Star className="h-4 w-4" />
                      <span>{project.totalPoints} points</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectContributions;