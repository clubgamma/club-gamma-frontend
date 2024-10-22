import { Button } from "../components/ui/button"; // Adjust path as necessary
import { useState } from 'react';
import { ArrowRightCircle } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link for navigation
import PropTypes from "prop-types"; // Import PropTypes for validation
import Navbar from "@/components/Navbar";
import { FaGithub, FaInstagram, FaYoutube, FaLinkedin, FaFacebook, FaTwitter, FaDiscord, FaLinkedinIn } from 'react-icons/fa';
import logo from '@/assets/logo.jpeg';
import teamData from '../../JSON/team.json'; // Adjust the path if necessary
import { motion } from 'framer-motion';




const Home = () => {

    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
      {
        question: "What is Club Gamma?",
        answer: "Club Gamma is a developer community focused on learning, building, and growing together."
      },
      {
        question: "How can I join Club Gamma?",
        answer: "You can join by signing up on our website and becoming part of our community."
      },
      {
        question: "What activities does Club Gamma offer?",
        answer: "We offer coding workshops, hackathons, and networking events."
      },
      {
        question: "Is there a membership fee?",
        answer: "No, joining Club Gamma is completely free!"
      },
      // Add more FAQs as needed
    ];

    const cardVariants = {
        initial: {
          opacity: 0,
          scale: 0.8,
          y: 20,
        },
        animate: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: 'easeOut',
          },
        },
        hover: {
          scale: 1.05,
          transition: {
            duration: 0.2,
            ease: 'easeInOut',
          },
        },
    };
  return (
    <div className="min-h-screen text-black bg-white">
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center bg-[#D8183A] text-white py-16 text-center">
        {/* Navbar Component */}
        <Navbar />

        <div className="flex flex-col items-center mx-auto">
          <h1 className="mb-4 font-bold tracking-wide text-7xl">
            CLUB <span className="text-white">GAMMA</span>
          </h1>
          <p className="mb-6 text-2xl">
            The more{" "}
            <span className="font-extrabold text-white">DIVERSITY</span> the
            better <span className="font-extrabold text-white">COMMUNITY</span>!
          </p>


{/* Illustrations */}
<div className="flex items-center justify-center mt-8 space-x-6">
  {/* Icon with a white background and rounded full border */}
  <div className="flex items-center justify-center w-32 h-32 bg-white rounded-full">
    {/* LinkedIn Icon */}
    <FaLinkedinIn size={60} className="text-black" />
  </div>
  
  <div className="flex items-center justify-center w-32 h-32 bg-white rounded-full">
    {/* Instagram Icon */}
    <FaInstagram size={60} className="text-black" />
  </div>
  
  <div className="flex items-center justify-center w-32 h-32 bg-white rounded-full">
    {/* GitHub Icon */}
    <FaGithub size={60} className="text-black" />
  </div>
</div>


          {/* Register Button */}
          <Link to="/hacktoberfest2024">
            <Button className="flex items-center px-6 py-3 mt-12 text-white bg-black rounded-lg hover:bg-gray-800">
              Register Now <ArrowRightCircle className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="flex flex-col items-center justify-center min-h-screen py-12 bg-white">
        <div className="container px-6 mx-auto text-center">
          <h2 className="mb-6 text-5xl font-extrabold text-gray-900">
            About <span className="text-red-600">Club Gamma</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-700">
            Club Gamma is an inclusive developer community where you can <span className="font-semibold">learn</span>, 
            <span className="font-semibold"> build</span>, and <span className="font-semibold">grow</span> together. 
            We offer a platform for knowledge sharing, coding events, and personal development.
          </p>
          <div className="flex justify-center">
            <img
              src="/illustration.png"
              alt="Club Gamma Illustration"
              className="w-full h-auto max-w-lg rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="flex flex-col items-center justify-center h-screen py-12 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="mb-8 text-4xl font-bold">Recent Events</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card
              title="Hacktoberfest 2021"
              description="Open-source contribution made easy! Join our community and get started on your journey of coding."
              buttonText="View Details"
            />
            <Card
              title="Coding Interviews 101"
              description="Prepare for your next coding interview with our expert-led sessions."
              buttonText="View Details"
            />
            <Card
              title="Micro-interactions with CSS"
              description="Improve your web applications with sleek micro-interactions."
              buttonText="View Details"
            />
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center min-h-screen py-12 bg-white">
      <div className="container px-6 mx-auto text-center">
        <h2 className="mb-6 text-5xl font-bold text-gray-900">
          Meet the <span className="text-red-600">Team</span>
        </h2>
        <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-700">
          Our team consists of passionate developers and community leaders dedicated to building a welcoming and inclusive environment.
        </p>
        
        {/* Team members grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {teamData.teams.flat().map((member, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg"
              variants={cardVariants}
              initial="initial"
              animate="animate"
              whileHover="hover" // Add hover effect
            >
              {/* Member's image */}
              <img
                src={member.imageUrl}
                alt={member.name}
                className="object-cover w-32 h-32 mb-4 rounded-full"
              />
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-600">{member.position}</p>
              <p className="mt-2 text-sm italic text-gray-500">&#34;{member.tagline}&#34;</p>
              
              {/* Social media icons */}
              <div className="flex mt-4 space-x-4">
                {member.social.linkedin && (
                  <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <FaLinkedin className="text-[#D8183A] hover:text-gray-800" size={24} />
                  </a>
                )}
                {member.social.instagram && (
                  <a href={member.social.instagram} target="_blank" rel="noopener noreferrer">
                    <FaInstagram className="text-[#D8183A] hover:text-gray-800" size={24} />
                  </a>
                )}
                {member.social.github && (
                  <a href={member.social.github} target="_blank" rel="noopener noreferrer">
                    <FaGithub className="text-[#D8183A] hover:text-gray-800" size={24} />
                  </a>
                )}
                {member.social.twitter && (
                  <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                    <FaTwitter className="text-[#D8183A] hover:text-gray-800" size={24} />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

      {/* FAQs Section */}
      <section className="flex flex-col items-center justify-center w-full h-screen py-12 bg-gray-100">
      <div className="container w-full mx-auto text-center">
        <h2 className="mb-8 text-4xl font-bold">FAQs</h2>
        <div className="w-full max-w-2xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-[#D8183A] rounded-lg shadow-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }} // Smooth transition
            >
              <div
                className="flex items-center justify-between p-4 text-white cursor-pointer"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <span className="text-3xl">{openIndex === index ? '−' : '+'}</span> {/* Large white sign */}
              </div>
              {openIndex === index && (
                <motion.div
                  className="p-4 text-white"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }} // Smooth transition for answer
                >
                  {faq.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    
{/* Footer Section */}
<footer className="py-8 text-white bg-black">
  <div className="container px-6 mx-auto">
    <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0 md:space-x-10">
      {/* Logo Section */}
      <div className="flex items-center justify-center md:justify-start">
      <div className="flex items-center">
                    <img
                        className="w-10 h-10 mr-4 transition-transform duration-300 ease-in-out rounded-full hover:scale-110"
                        src={logo} alt="Logo" />
                    <a href="/" className="text-2xl font-bold tracking-wide text-white font-dm-sans">Club Gamma</a>
                </div>
      </div>

      {/* Copyright and Code of Conduct Link */}
      <div className="text-center md:text-left">
        <p className="text-sm text-gray-200">
          © {new Date().getFullYear()} Club Gamma. All Rights Reserved
        </p>
        <a
          href="/code-of-conduct"
          className="text-sm text-[#00FFFF] hover:underline"
        >
          Code Of Conduct
        </a>
      </div>

      {/* Social Media Icons */}
      <div className="flex space-x-3">
        <a
          href="#"
          className="p-2 rounded-full bg-[#D8183A] hover:bg-gray-700"
          aria-label="GitHub"
        >
          <FaGithub size={20} className="text-white" />
        </a>
        <a
          href="#"
          className="p-2 rounded-full bg-[#D8183A] hover:bg-gray-700"
          aria-label="Instagram"
        >
          <FaInstagram size={20} className="text-white" />
        </a>
        <a
          href="#"
          className="p-2 rounded-full bg-[#D8183A] hover:bg-gray-700"
          aria-label="YouTube"
        >
          <FaYoutube size={20} className="text-white" />
        </a>
        <a
          href="#"
          className="p-2 rounded-full bg-[#D8183A] hover:bg-gray-700"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={20} className="text-white" />
        </a>
        <a
          href="#"
          className="p-2 rounded-full bg-[#D8183A] hover:bg-gray-700"
          aria-label="Facebook"
        >
          <FaFacebook size={20} className="text-white" />
        </a>
        <a
          href="#"
          className="p-2 rounded-full bg-[#D8183A] hover:bg-gray-700"
          aria-label="Twitter"
        >
          <FaTwitter size={20} className="text-white" />
        </a>
        <a
          href="#"
          className="p-2 rounded-full bg-[#D8183A] hover:bg-gray-700"
          aria-label="Discord"
        >
          <FaDiscord size={20} className="text-white" />
        </a>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
};

// Custom Card Component
const Card = ({ title, description, buttonText }) => (
  <div className="p-4 bg-white rounded-lg shadow-lg">
    <div className="bg-[#D8183A] text-white p-4 rounded-t-lg">
      <h3 className="text-xl font-bold">{title}</h3>
    </div>
    <div className="p-4">
      <p>{description}</p>
      <Button
        variant="ghost"
        className="mt-4 text-[#D8183A] hover:bg-[#D8183A] hover:text-white"
      >
        {buttonText}
      </Button>
    </div>
  </div>
);

// Prop Types Validation
Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

export default Home;
