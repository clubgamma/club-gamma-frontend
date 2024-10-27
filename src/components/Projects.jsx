import { cn } from '@/lib/utils';
import { ArrowUpRight, Users } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProjectShowcase = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const mainCategories = [
  "Web Dev",
  "AI/ML",
  "Cloud",
  "App Dev",
  "Other",
  ];

  const handleButtonClick = (url) => {
    window.open(url, '_blank');
  };

  const projects = [
    {
      title: "Club Gamma Frontend",
      description: "A modern and responsive website built using Vite and React, showcasing advanced web development skills and design aesthetics.",
      repoName: "club-gamma-frontend",
      buttonText: "Github",
      url: "https://github.com/clubgamma/club-gamma-frontend",
      categories: ["Web Dev","React"]
    },
    {
      title: "Club Gamma Backend",
      description: "A robust backend for the Club Gamma website, developed using Node.js to handle complex data processing and ensure smooth operation.",
      repoName: "club-gamma-backend",
      buttonText: "Github",
      url: "https://github.com/clubgamma/club-gamma-backend",
      categories:["Web Dev","Node.js"]
    },
    {
      title: "Internet Speed-Tester",
      description: "A React-based application to test internet speed, demonstrating proficiency in frontend development and user interface design.",
      repoName: "Internet-Speed-Tester",
      buttonText: "Github",
      url: "https://github.com/clubgamma/Internet-Speed-Tester",
      categories: ["Web Dev","React","Node.js"]
    },
    {
      title: "Weather Web App",
      description: "This project creates a weather web app using HTML, CSS, and JavaScript, providing real-time weather updates and forecasts.",
      repoName: "Weather-Web-App-2024",
      buttonText: "Github",
      url: "https://github.com/clubgamma/Weather-Web-App-2024",
      categories: ["Web Dev","HTML","CSS"]
    },
    {
      title: "Air Quality Index Analysis",
      description: "This project utilizes machine learning to predict AQI levels in Delhi during winter, employing SMOTE to improve data balance and accuracy.",
      repoName: "Air-Quality-Index-Analysis",
      buttonText: "Github",
      url: "https://github.com/clubgamma/Air-Quality-Index-Analysis",
      categories: ["AI/ML","Python"]
    },
    {
      title: "Summarize papers",
      description: "This project develops an application that summarizes research papers using NLP techniques like NLTK and spaCy for essential information extraction.",
      repoName: "Summarize-papers",
      buttonText: "Github",
      url: "https://github.com/clubgamma/Summarize-papers",
      categories: ["AI/ML","NLP","Python"]
    },
    {
      title: "Sudoku",
      description: "This project implements a Sudoku game in C, allowing users to play, solve puzzles, and validate their solutions.",
      repoName: "Sudoku",
      buttonText: "Github",
      url: "https://github.com/clubgamma/Sudoku",
      categories: ["Other","C"]
    },
    {
      title: "Ticket Booking",
      description: "This project features a menu-driven ticket booking system in C, enabling users to book, cancel, and view tickets easily.",
      repoName: "Ticket-Booking",
      buttonText: "Github",
      url: "https://github.com/clubgamma/Ticket-Booking",
      categories: ["Other","C"]
    }
  ];

  const filteredProjects = selectedCategory
    ? projects.filter(project => project.categories.includes(selectedCategory))
    : projects;

  return (
    <div className="relative z-10">
      <div className="relative max-w-7xl mx-auto">
        <div className="relative space-y-4 mb-12 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white">
            Our{" "}
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent hover:from-red-400 hover:to-red-500 transition-colors duration-300">
              Projects
            </span>{" "}
            🧑‍💻
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our innovative projects and contributions!
          </p>
        </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === null
                ? 'bg-red-500 text-white'
                : 'bg-transparent text-gray-300 hover:bg-gray-700 border border-gray-600'
            } transition-colors duration-300 mb-2`}
            onClick={() => setSelectedCategory(null)}
          >
            All
          </button>
          {mainCategories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg ${
                selectedCategory === category
                  ? 'bg-red-500 text-white'
                  : 'bg-transparent text-gray-300 hover:bg-gray-700 border border-gray-600'
              } transition-colors duration-300 mb-2`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredProjects.length > 0 ? (filteredProjects.map((project, index) => (
            <div
              key={index}
              className="relative group p-3"
            >
              <div className="h-full rounded-xl font-dm-sans overflow-hidden border border-[#4e3535] shadow-lg bg-gradient-to-br from-[#2a2424] to-[#3d2c2c] transform transition-all duration-300 group-hover:scale-[1.02] group-hover:border-red-500/50">
                <div className="p-6 h-full flex flex-col">
                  <div className="mb-4">
                    <div className='flex gap-1'>
                    {project.categories.map((category,index) => (
                      <span key={`${index}${category}`} className="inline-block px-3 py-1 text-xs font-semibold text-red-400 bg-red-900/20 rounded-full mb-4">
                        {category}
                      </span>
                    ))}
                      </div>
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors min-h-[3rem] break-words leading-normal">
                      {project.title}
                    </h2>
                    <p className="text-gray-300 mb-6 line-clamp-4">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-auto flex justify-between gap-4">
                    <Link
                      to={`/hacktoberfest2024/contributors/${project.repoName}`}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#3d2c2c] hover:bg-[#4e3535] text-white transition-all duration-300 flex-1"
                    >
                      <Users size={18} className={cn('block','sm:hidden', 'md:block')} />
                      <span>Contributors</span>
                    </Link>
                    <button
                      onClick={() => handleButtonClick(project.url)}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 transition-all duration-300 flex-1 "
                    >
                      <span>Github</span>
                      <ArrowUpRight size={18} className={cn('block','sm:hidden', 'md:block')}/>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))) : (
            <div className="flex flex-col items-center justify-center py-5 col-span2 md:col-span-3">
            <svg
              className="w-48 h-48 mb-8 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={0.5}
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <h2 className="text-3xl font-bold text-white mb-4">No projects found</h2>
            <p className="text-xl text-gray-400 text-center max-w-md">
              We couldn't find any projects matching your selected category. Try selecting a different category or check back later for new projects!
            </p>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectShowcase;
