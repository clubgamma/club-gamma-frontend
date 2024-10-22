import React, { useState } from 'react';
import { motion } from 'framer-motion';
import logo from '@/assets/logo.jpeg';
import Global from '@/Global';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User } from 'lucide-react';
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { Link, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ onContactClick, onQandAClick, onStatusClick, onProjectsClick }) => {
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

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const sidebarVariants = {
        open: { x: 0 },
        closed: { x: "-100%" },
    };

    return (
        <>
            {/* Navbar */}
            <nav className="bg-white text-black backdrop-blur-lg p-4 fixed top-0 left-0 right-0 z-50 flex justify-between items-center shadow-lg mx-auto w-[90%] rounded-lg mt-8">
                {/* Logo */}
                <div className="flex items-center">
                    <img
                        className="w-10 h-10 rounded-full mr-4 transition-transform duration-300 ease-in-out hover:scale-110"
                        src={logo} alt="Logo" />
                    <a href="/" className="text-red-500 font-dm-sans text-2xl font-bold tracking-wide">Club Gamma</a>
                </div>

                {/* Navbar Links (visible on larger screens) */}
                <div className="hidden lg:flex items-center gap-10 font-montserrat text-[1rem]">
                    <button className="text-black hover:text-red-500 transition-all duration-300">Home</button>
                    <button className="text-black hover:text-red-500 transition-all duration-300">About Us</button>
                    <button className="text-black hover:text-red-500 transition-all duration-300">Events</button>
                    <button className="text-black hover:text-red-500 transition-all duration-300">Team</button>
                    <button className="text-black hover:text-red-500 transition-all duration-300">Faqs</button>
                </div>

                {/* User Menu / GitHub Login */}
                <div className="hidden lg:flex">
                    {Global.user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
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
                        <button onClick={handleGithubLogin}
                            className="flex font-dm-sans items-center bg-black hover:bg-gray-800 text-white py-2 px-5 rounded-md font-bold shadow-lg hover:shadow-none">
                            Continue with GitHub
                        </button>
                    )}
                </div>

                {/* Mobile Menu Icon */}
                <div className="lg:hidden">
                    <button className="text-black bg-transparent border-none" onClick={toggleSidebar}>
                        {sidebarOpen ? <IoMdClose size={24} /> : <RiMenu3Fill size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Sidebar */}
            <motion.div
                className="fixed inset-y-0 left-0 font-dm-sans w-64 bg-gray-900 z-50 lg:hidden overflow-y-auto"
                variants={sidebarVariants}
                initial="closed"
                animate={sidebarOpen ? "open" : "closed"}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="p-4">
                    <div className="flex items-center">
                        <img className="w-10 h-10 rounded-full m-2" src={logo} alt="Logo" />
                        <p className='text-white font-bold '>Club GAMMA</p>
                    </div>
                    <nav className="space-y-6 text-white mt-4">
                        <Link to="/" onClick={() => setSidebarOpen(false)} className="block hover:text-red-500 transition-colors duration-200 w-full text-center">Home</Link>
                        <button onClick={() => { onQandAClick(); setSidebarOpen(false) }} className="block hover:text-red-500 transition-colors duration-200 w-full text-center">About Us</button>
                        <button onClick={() => { onStatusClick(); setSidebarOpen(false) }} className="block hover:text-red-500 transition-colors duration-200 w-full text-center">Events</button>
                        <button onClick={() => { onProjectsClick(); setSidebarOpen(false) }} className="block hover:text-red-500 transition-colors duration-200 w-full text-center">Team</button>
                        <button onClick={() => { onContactClick(); setSidebarOpen(false) }} className="block hover:text-red-500 transition-colors duration-200 w-full text-center">Faqs</button>
                        <hr className="border-gray-700" />
                        {Global.user ? (
                            <>
                                <Link to={`/profile/${Global.user.githubId}`} className="text-black block hover:text-red-500 transition-colors duration-200">Profile</Link>
                                <button onClick={handleLogout} className="text-black block hover:text-red-500 transition-colors duration-200 w-full text-center">Logout</button>
                            </>
                        ) : (
                            <Button onClick={handleGithubLogin} className="text-black bg-red-500 hover:bg-red-600 transition-colors duration-200 block w-full">Continue with GitHub</Button>
                        )}
                    </nav>
                </div>
            </motion.div>

            <Outlet />
        </>
    );
};

Navbar.propTypes = {
    onContactClick: PropTypes.func.isRequired,
    onQandAClick: PropTypes.func.isRequired,
    onStatusClick: PropTypes.func.isRequired,
    onProjectsClick: PropTypes.func.isRequired,
};

export default Navbar;
