import { Card, CardContent } from "@/components/ui/card";
import { Folder, Star } from "lucide-react";
import { Link } from "react-router-dom";

const PRStatusLine = ({ project }) => {
  return (
    <div className="text-xs sm:text-sm text-zinc-400 flex flex-wrap items-center gap-1 sm:gap-2">
      <div className="flex items-center">
        <span>{project.opened} Opened</span>
      </div>
      <div className="inline ">|</div>
      <div className="flex items-center">
        <span>{project.merged} Merged</span>
      </div>
      <div className="inline ">|</div>
      <div className="flex items-center">
        <span>{project.closed} Closed</span>
      </div>
    </div>
  );
};

const ProjectContributions = ({ projectContributions }) => {
  return (
    <Card className="bg-gradient-to-br from-[#2a2a2a] to-[#3d2929] border-[#4e3535] w-full">
      <CardContent className="p-3 sm:p-4 md:p-6">
        <h2 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2 sm:mb-4">
          Project Contributions
        </h2>
        <div className="space-y-2 sm:space-y-2">
          {projectContributions.map((project, index) => (
            <Link
              key={index}
              to={`/hacktoberfest2024/contributors/${project.projectName}`}
              className="block"
            >
              <Card className="bg-[#1e1e1e]/50 border-[#4e3535] hover:border-red-900 transition-all duration-300">
                <CardContent className="p-3 sm:p-4">
                  <div className="flex  sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
                    <div className="flex items-start gap-2 sm:gap-3 min-w-0">
                      <Folder className="h-4 w-4 sm:h-5 sm:w-5 text-red-400 mt-1 flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm sm:text-base text-white truncate">
                          {project.projectName}
                        </div>
                        <PRStatusLine project={project} />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-red-400 text-sm sm:text-base mt-1 sm:mt-0">
                      <Star className="h-3 w-3" />
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