import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '@/assets/logo.jpeg';
import Global from '@/Global';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User } from 'lucide-react';
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link as ScrollLink } from 'react-scroll'; // Import for smooth scrolling

const Navbar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

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

    const sidebarVariants = {
        open: { x: 0 },
        closed: { x: "-100%" },
    };

    return (
        <>
            <nav className="bg-white text-black backdrop-blur-lg p-4 fixed top-0 left-0 right-0 z-50 flex justify-between items-center shadow-lg mx-auto w-[90%] rounded-lg mt-8">
                <div className="flex items-center">
                    <img
                        className="w-10 h-10 mr-4 transition-transform duration-300 ease-in-out rounded-full hover:scale-110"
                        src={logo}
                        alt="Logo"
                    />
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
            <motion.div
                className="fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-gray-900 font-dm-sans lg:hidden"
                variants={sidebarVariants}
                initial="closed"
                animate={sidebarOpen ? "open" : "closed"}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
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
                                <Link to={`/profile/${Global.user.githubId}`} className="text-white block hover:text-red-500 transition-colors duration-200" onClick={() => setSidebarOpen(false)}>
                                    Profile
                                </Link>
                                <button onClick={handleLogout} className="text-white block hover:text-red-500 transition-colors duration-200 w-full text-left">Logout</button>
                            </>
                        ) : (
                            <Button onClick={handleGithubLogin} className="block w-full bg-red-500 hover:bg-red-600">Continue with GitHub</Button>
                        )}
                    </nav>
                </div>
            </motion.div>
        </>
    );
};

Navbar.propTypes = {
    onContactClick: PropTypes.func,
    onQandAClick: PropTypes.func,
    onStatusClick: PropTypes.func,
    onProjectsClick: PropTypes.func,
};

export default Navbar;
