import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GitPullRequest, Users, FolderGit, Unplug } from "lucide-react";
import Global from "@/Global";
import { useInView } from "react-intersection-observer";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Stat = () => {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState("");

  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.4 });

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
    <div className="min-h-[55vh]  flex  justify-center p-4">
      <div className="max-w-4xl w-full">
        <motion.div
          initial="hidden"
          variants={statVariants}
          animate={inView ? "visible" : "hidden"}
        >
          <h1 className="text-4xl md:text-5xl font-dm-sans font-bold text-center text-white mb-12">
            Club Gamma Hacktoberfest
            <br /> 2024 Stats
          </h1>
        </motion.div>
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
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <AnimatePresence mode="wait">
              <div className="grid font-poppins grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat) => (
                  <motion.div
                    key={stat.label}
                    // initial={{ opacity: 0, y: 20 }}
                    // animate={{ opacity: 1, y: 0 }}
                    // transition={{ delay: index * 0.2 }}
                    variants={statVariants}
                    className="bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-lg shadow-xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className="w-12 h-12 text-red-400" />
                      <div className="text-4xl font-bold text-white">
                        <CountUp end={stat.value} />
                        <span className="text-red-400">+</span>
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold text-white mb-2">
                      {stat.label}
                    </h2>
                    <div className="text-sm text-red-400">Hacktoberfest</div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Stat;
