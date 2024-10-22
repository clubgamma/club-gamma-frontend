import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Users } from 'lucide-react';

const ProjectShowcase = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleButtonClick = (url) => {
    window.open(url, '_blank');
  };

  const projects = [
    {
      title: "Club Gamma Website (React)",
      description: "A modern and responsive website built using Vite and React, showcasing advanced web development skills and design aesthetics.",
      repoName: "hacktoberfest2024",
      buttonText: "Github",
      url: "https://github.com/clubgamma/club-gamma-frontend"
    },
    {
      title: "Club Gamma Website (Node.js)",
      description: "A robust backend for the Club Gamma website, developed using Node.js to handle complex data processing and ensure smooth operation.",
      repoName: "club-gamma-backend",
      buttonText: "Github",
      url: "https://github.com/clubgamma/club-gamma-backend"
    },
    {
      title: "Internet Speed-Tester (React)",
      description: "A React-based application to test internet speed, demonstrating proficiency in frontend development and user interface design.",
      repoName :"Internet-Speed-Tester",
      buttonText: "Github",
      url: "https://github.com/clubgamma/Internet-Speed-Tester"
    },
    {
      title: "Weather Web App (Frontend)",
      description: "This project creates a weather web app using HTML, CSS, and JavaScript, providing real-time weather updates and forecasts.",
      repoName: "Weather-Web-App-2024",
      buttonText: "Github",
      url: "https://github.com/clubgamma/Weather-Web-App-2024"
    },
    {
      title: "Air Quality Index Analysis (AI/ML)",
      description: "This project utilizes machine learning to predict AQI levels in Delhi during winter, employing SMOTE to improve data balance and accuracy.",
      repoName: "Air-Quality-Index-Analysis",
      buttonText: "Github",
      url: "https://github.com/clubgamma/Air-Quality-Index-Analysis"
    },
    {
      title: "Summarize papers (AI/ML)",
      description: "This project develops an application that summarizes research papers using NLP techniques like NLTK and spaCy for essential information extraction.",
      repoName: "Summarize-papers",
      buttonText: "Github",
      url: "https://github.com/clubgamma/Summarize-papers"
    },
    {
      title: "Sudoku (C)",
      description: "This project implements a Sudoku game in C, allowing users to play, solve puzzles, and validate their solutions.",
      repoName: "Sudoku",
      buttonText: "Github",
      url: "https://github.com/clubgamma/Sudoku"
    },
    {
      title: "Ticket Booking (C)",
      description: "This project features a menu-driven ticket booking system in C, enabling users to book, cancel, and view tickets easily.",
      repoName: "Ticket-Booking",
      buttonText: "Github",
      url: "https://github.com/clubgamma/Ticket-Booking"
    }
  ];

  const [ref, inView] = useInView({ 
    triggerOnce: false, 
    threshold: 0.1,
    rootMargin: '-50px'
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const fadeUpVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      } 
    },
  };

  return (
    <div className="relative min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariants}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-black font-poppins text-white mb-4">
            Our Projects
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover our innovative solutions across different domains
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariants}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative group"
            >
              <div className="h-full rounded-xl overflow-hidden border border-[#4e3535] shadow-lg bg-gradient-to-br from-[#2a2424] to-[#3d2c2c] transform transition-all duration-300 group-hover:scale-[1.02] group-hover:border-red-500/50">
                <div className="p-6 h-full flex flex-col">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-red-400 bg-red-900/20 rounded-full mb-4">
                      {project.category}
                    </span>
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-gray-300 mb-6 line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="mt-auto flex justify-between gap-4">
                    <button
                      onClick={() => navigate(`/contributors/${project.repoName}`)}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#3d2c2c] hover:bg-[#4e3535] text-white transition-all duration-300 flex-1"
                    >
                      <Users size={18} />
                      <span>Contributors</span>
                    </button>
                    <button
                      onClick={() => handleButtonClick(project.url)}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-500 hover:text-red-400 transition-all duration-300 flex-1"
                    >
                      <span>Github</span>
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectShowcase;