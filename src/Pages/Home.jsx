import { Button } from "../components/ui/button"; // Adjust path as necessary
import { useState } from 'react';
// import { ArrowRightCircle } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link for navigation
import PropTypes from "prop-types"; // Import PropTypes for validation
import { FaGithub, FaLinkedinIn, FaInstagram, FaTwitter, FaFacebook, FaDiscord, FaYoutube, FaLinkedin } from 'react-icons/fa';
import logo from '@/assets/logo.jpeg';
import teamData from '../../JSON/team.json'; // Adjust the path if necessary
import { motion } from 'framer-motion';

import Global from '@/Global';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowRightCircle, User } from 'lucide-react';
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { Link as ScrollLink } from 'react-scroll'; // Import for smooth scrolling



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

// Card Component
const Card = ({ title, description, buttonText }) => {
    return (
        <div className="flex flex-col items-center p-6 transition-shadow duration-300 bg-white rounded-lg shadow-md hover:shadow-xl">
            <h3 className="mb-4 text-2xl font-bold">{title}</h3>
            <p className="mb-4 text-gray-600">{description}</p>
            <Button className="px-4 py-2 text-white bg-[#D8183A] rounded-lg hover:bg-[#B01331]">
                {buttonText}
            </Button>
        </div>
    );
};

// Prop types for Card component validation
Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
};

const Home = () => {
    console.log("owinegoinogniw");
    
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        { question: "What is Club Gamma?", answer: "Club Gamma is a developer community focused on learning, building, and growing together." },
        { question: "How can I join Club Gamma?", answer: "You can join by signing up on our website and becoming part of our community." },
        { question: "What activities does Club Gamma offer?", answer: "We offer coding workshops, hackathons, and networking events." },
        { question: "Is there a membership fee?", answer: "No, joining Club Gamma is completely free!" }
    ];

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

    const handleGithubLogin = () => {
        window.location.assign(`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&scope=user:email`);
    };

    const handleLogout = async () => {
        try {
            await Global.logout();
        } catch (err) {
            console.error(err);
        }
    };

    // Check for this kind of line and remove if it's not being used:


    return (
        <div className="min-h-screen text-black bg-white">
            {/* Hero Section */}
            <section id="home" className="h-screen flex flex-col justify-center bg-[#D8183A] text-white py-16 text-center">
                {/* Navbar */}
                <nav className="bg-white text-black backdrop-blur-lg p-4 fixed top-0 left-0 right-0 z-50 flex justify-between items-center shadow-lg mx-auto w-[90%] rounded-lg mt-8">
                    <div className="flex items-center">
                        <img className="w-10 h-10 mr-4 transition-transform duration-300 ease-in-out rounded-full hover:scale-110" src={logo} alt="Logo" />
                        <a href="/" className="text-2xl font-bold tracking-wide text-red-500 font-dm-sans">Club Gamma</a>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-10 font-montserrat text-[1rem]">
                        <ScrollLink to="home" smooth={true} duration={800} offset={-70} className="text-black transition-all duration-300 cursor-pointer hover:text-red-500">
                            Home
                        </ScrollLink>
                        <ScrollLink to="about" smooth={true} duration={800} offset={-70} className="text-black transition-all duration-300 cursor-pointer hover:text-red-500">
                            About Us
                        </ScrollLink>
                        <ScrollLink to="events" smooth={true} duration={800} offset={-70} className="text-black transition-all duration-300 cursor-pointer hover:text-red-500">
                            Events
                        </ScrollLink>
                        <ScrollLink to="team" smooth={true} duration={800} offset={-70} className="text-black transition-all duration-300 cursor-pointer hover:text-red-500">
                            Team
                        </ScrollLink>
                        <ScrollLink to="faqs" smooth={true} duration={800} offset={-70} className="text-black transition-all duration-300 cursor-pointer hover:text-red-500">
                            FAQs
                        </ScrollLink>
                    </div>

                    {/* User Authentication Section */}
                    <div className="hidden lg:flex">
                        {Global.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="flex items-center gap-2">
                                        <User className="w-4 h-4" />
                                        {Global.user.name.split(" ")[0]}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <Link to={`/profile/${Global.user.githubId}`}>
                                        <DropdownMenuItem>Profile</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <button onClick={handleGithubLogin} className="flex items-center px-5 py-2 font-bold text-white bg-black rounded-md shadow-lg hover:bg-gray-800">
                                Continue with GitHub
                            </button>
                        )}
                    </div>

                    {/* Mobile Navigation Toggle */}
                    <div className="lg:hidden">
                        <button className="text-black bg-transparent border-none" onClick={toggleSidebar}>
                            {sidebarOpen ? <IoMdClose size={24} /> : <RiMenu3Fill size={24} />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Sidebar */}
                <motion.div className="fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-gray-900 font-dm-sans lg:hidden" animate={sidebarOpen ? "open" : "closed"}>
                    <div className="p-4">
                        <div className="flex items-center">
                            <img className="w-10 h-10 m-2 rounded-full" src={logo} alt="Logo" />
                            <p className='font-bold text-white'>Club GAMMA</p>
                        </div>
                        <nav className="mt-4 space-y-6 text-white">
                            <ScrollLink to="home" smooth={true} duration={800} offset={-70} onClick={() => setSidebarOpen(false)} className="block w-full text-center cursor-pointer hover:text-red-500">
                                Home
                            </ScrollLink>
                            <ScrollLink to="about" smooth={true} duration={800} offset={-70} onClick={() => setSidebarOpen(false)} className="block w-full text-center cursor-pointer hover:text-red-500">
                                About Us
                            </ScrollLink>
                            <ScrollLink to="events" smooth={true} duration={800} offset={-70} onClick={() => setSidebarOpen(false)} className="block w-full text-center cursor-pointer hover:text-red-500">
                                Events
                            </ScrollLink>
                            <ScrollLink to="team" smooth={true} duration={800} offset={-70} onClick={() => setSidebarOpen(false)} className="block w-full text-center cursor-pointer hover:text-red-500">
                                Team
                            </ScrollLink>
                            <ScrollLink to="faqs" smooth={true} duration={800} offset={-70} onClick={() => setSidebarOpen(false)} className="block w-full text-center cursor-pointer hover:text-red-500">
                                FAQs
                            </ScrollLink>
                            <hr className="border-gray-700" />
                            {Global.user ? (
                                <>
                                    <Link to={`/profile/${Global.user.githubId}`} className="block hover:text-red-500">Profile</Link>
                                    <button onClick={handleLogout} className="block w-full text-center hover:text-red-500">Logout</button>
                                </>
                            ) : (
                                <Button onClick={handleGithubLogin} className="block w-full bg-red-500 hover:bg-red-600">Continue with GitHub</Button>
                            )}
                        </nav>
                    </div>
                </motion.div>

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
                            <FaLinkedinIn size={60} className="text-black" />
                        </div>
                        <div className="flex items-center justify-center w-32 h-32 bg-white rounded-full">
                            <FaInstagram size={60} className="text-black" />
                        </div>
                        <div className="flex items-center justify-center w-32 h-32 bg-white rounded-full">
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

            {/* Other Sections (About, Events, Team, FAQ) */}
            {/* About Section */}
            <section id="about" className="flex flex-col items-center justify-center min-h-screen py-12 bg-white">
                <div className="container px-6 mx-auto text-center">
                    <h2 className="mb-6 text-5xl font-extrabold text-gray-900">
                        About <span className="text-red-600">Club Gamma</span>
                    </h2>
                    <p className="max-w-2xl mx-auto mb-10 text-lg text-gray-700">
                        Club Gamma is an inclusive developer community where you can <span className="font-semibold">learn</span>,
                        <span className="font-semibold"> build</span>, and <span className="font-semibold">grow</span> together.
                        We offer a platform for knowledge sharing, coding events, and personal development.
                    </p>
                </div>
            </section>

            {/* Events Section */}
            <section id="events" className="flex flex-col items-center justify-center h-screen py-12 bg-gray-100">
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

            {/* Team Section */}
            <section id="team" className="flex flex-col items-center justify-center min-h-screen py-12 bg-white">
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
                                whileHover="hover"
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
                                            <FaLinkedinIn className="text-[#D8183A] hover:text-gray-800" size={24} />
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
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* FAQ Section */}
            <section id="faqs" className="flex flex-col items-center justify-center w-full h-screen py-12 bg-gray-100">
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

export default Home;
