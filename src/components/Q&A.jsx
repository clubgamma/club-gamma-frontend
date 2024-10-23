import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";

const slides = [
  {
    title: "How Club Gamma is going to celebrate Hacktoberfest?",
    content: (
      <>
        <p>
          Club Gamma is the community which aims to work together and grow
          together. We are going to celebrate the Hacktoberfest this year with
          great enthusiasm.
        </p>
        <p>
          We will put <strong className="text-red-500">projects</strong> on
          different fields like{" "}
          <strong className="text-red-500">
            MERN Stack Development, AI/ML , Core C++ Project
          </strong>
          , etc. We will initialize some{" "}
          <strong className="text-red-500">GitHub Repo</strong> and make them
          open-source. Anyone can contribute to any of those projects during
          Hacktoberfest and avail the{" "}
          <strong className="text-red-500">cool prizes</strong> by DigitalOcean
          and GitHub.
        </p>
      </>
    ),
  },
  {
    title: "How can I participate?",
    content: (
      <>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Go to{" "}
            <a
              href="https://hacktoberfest.com/"
              className="text-red-500 underline"
            >
              Hacktoberfest
            </a>{" "}
            to learn about the event and its mission.
          </li>
          <li>
            <strong className="text-red-500">Register</strong> there using your{" "}
            <strong className="text-red-500">GitHub account</strong> to
            officially participate and start tracking your contributions.
          </li>
          <li>
            Go to the{" "}
            <strong className="text-red-500">Club Gamma website</strong> to find
            projects that need contributors like you.
          </li>
          <li>
            <strong className="text-red-500">Continue with GitHub</strong> by
            logging in with your{" "}
            <strong className="text-red-500">GitHub account</strong> on the Club
            Gamma website to access relevant repositories.
          </li>
          <li>
            Start <strong className="text-red-500">hacking</strong> and{" "}
            <strong className="text-red-500">contributing</strong> by choosing
            an issue, submitting your pull request, and beginning your
            open-source journey with Club Gamma!
          </li>
        </ol>
      </>
    ),
  },
  {
    title: "What are the rules?",
    content: (
      <>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            You have to{" "}
            <strong className="text-red-500">
              register on the official Hacktoberfest website
            </strong>{" "}
            during the event period to participate.
          </li>
          <li>
            To qualify, you must make{" "}
            <strong className="text-red-500">four valid pull requests</strong>{" "}
            (PRs) between <strong className="text-red-500">October 1–31</strong>{" "}
            in any time zone. Pull requests can be to any{" "}
            <strong className="text-red-500">participating</strong> public
            repository on GitHub, labeled{" "}
            <strong className="text-red-500">'hacktoberfest'</strong> or{" "}
            <strong className="text-red-500">'hacktoberfest-accepted'</strong>.
          </li>
          <li>
            Pull requests must contain commits you made{" "}
            <strong>yourself</strong> and be{" "}
            <strong className="text-red-500">meaningful contributions</strong>.
          </li>
          <li>
            If a maintainer marks your pull request as{" "}
            <strong className="text-red-500">spam or invalid</strong>, it will{" "}
            <strong className="text-red-500">not be counted</strong> toward your
            participation in Hacktoberfest.
          </li>
          <li>
            If a maintainer reports behavior that's{" "}
            <strong className="text-red-500">
              not in line with the project's code of conduct,
            </strong>{" "}
            you will be{" "}
            <strong className="text-red-500">ineligible to participate.</strong>
          </li>
        </ol>
      </>
    ),
  },
  {
    title: "What are the standards for a pull request?",
    content: (
      <>
        <ol className="list-decimal list-inside space-y-2">
          <li>
            Pull requests that are{" "}
            <strong className="text-red-500">not automated</strong> (e.g.
            scripted opening pull requests to remove whitespace/fix
            typos/optimize images).
          </li>
          <li>
            Pull requests that are{" "}
            <strong className="text-red-500">not disruptive</strong> (e.g.
            taking someone else's branch/commits and making a pull request).
          </li>
          <li>
            Pull requests that are regarded by a project maintainer as a{" "}
            <strong className="text-red-500">hindrance</strong> vs. helping{" "}
            <strong className="text-red-500">won't be counted.</strong>
          </li>
          <li>
            Something that's clearly{" "}
            <strong className="text-red-500">
              an attempt to simply +1 your pull request count
            </strong>{" "}
            won't be accepted.
          </li>
          <li>
            Last but not least,{" "}
            <strong className="text-red-500">one pull request</strong> to fix a
            typo is fine, but 5 pull requests to remove a stray whitespace is
            not considered.
          </li>
        </ol>
      </>
    ),
  },
];

const QandA = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.6 });
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-[70vh] text-white">
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="w-full max-w-5xl relative"
      >
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        <div className="text-center px-8 flex justify-center items-center min-h-[50vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-5xl font-dm-sans font-bold mb-6">
                {slides[currentSlide].title}
              </h2>
              <div className="text-lg font-poppins mb-8 p-7 leading-relaxed space-y-4 text-left">
                {slides[currentSlide].content}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-center mt-8 space-x-2 z-10">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default QandA;
