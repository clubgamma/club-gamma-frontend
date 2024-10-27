import Global from "@/Global";
import { motion } from "framer-motion";
import { FolderGit, GitPullRequest, Unplug, Users } from "lucide-react";
import { useEffect, useState } from "react";

const CountUp = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      setCount(Math.floor(end * percentage));
      if (percentage < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    requestAnimationFrame(animateCount);
  }, [end, duration]);

  return <>{count}</>;
};

const Stats = () => {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await Global.getStats();
        const mappedStats = [
          {
            icon: GitPullRequest,
            label: "Pull Requests",
            value: data.numberOfPr,
          },
          {
            icon: Users,
            label: "Contributors",
            value: data.numberOfContributors,
          },
          {
            icon: FolderGit,
            label: "Open-Source Projects",
            value: data.numberOfRepos,
          },
        ];
        setStats(mappedStats);
      } catch (error) {
        setError("Error Fetching stats. Please try again later.");
        console.error("Error fetching stats: ", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-[45vh] flex justify-center">
      <div className="max-w-5xl w-full">
        <div className="relative space-y-4 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white">
            Club Gamma{" "}
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent hover:from-red-400 hover:to-red-500 transition-colors duration-300">
              Hacktoberfest
            </span>{" "}
            <br/>
            2024 Stats 📊
          </h1>
        </div>

        {error ? (
          <div className="flex flex-col sm:-mx-4 sm:flex-row text-center justify-center">
            <Unplug stroke="white" className="sm:block hidden" />
            <div className="mt-4 sm:mx-4 sm:mt-0">
              <h1 className="text-xl font-semibold font-poppins text-white md:text-2xl group-hover:text-white text-gradient">
                Something went wrong loading this section.
              </h1>
              <p className="font-poppins font-normal text-white mt-3">
                Please wait a few minutes and try reloading the page.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid font-poppins grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative  overflow-hidden bg-gradient-to-br from-[#2a2a2a] to-[#3d2828] rounded-lg p-6 shadow-xl border border-[#4e3535]/30 hover:border-red-500/50 transition-all duration-300 group mx-3"
              >
                <div className="absolute  inset-0 bg-gradient-to-br from-red-500/5 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center justify-between mb-4">
                  <stat.icon className="w-12 h-12 text-red-400 group-hover:text-red-300 transition-colors duration-300" />
                  <div className="text-4xl font-bold text-white group-hover:text-red-50 transition-colors duration-300">
                    <CountUp end={stat.value} />
                    <span className="text-red-400 group-hover:text-red-300">+</span>
                  </div>
                </div>
                <h2 className="relative text-xl font-semibold text-white mb-2 group-hover:text-red-50 transition-colors duration-300">
                  {stat.label}
                </h2>
                <div className="relative text-sm text-red-400 group-hover:text-red-300 transition-colors duration-300">
                  Hacktoberfest
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;