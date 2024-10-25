import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '@/assets/logo.jpeg';
import Global from '@/Global';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User, ChevronDown, LogOut } from 'lucide-react';
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { Link, Outlet } from 'react-router-dom';
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { cn } from '@/lib/utils';


const Navbar = ({ onHeroClick, onContactClick, onQandAClick, onStatusClick, onProjectsClick, onLeaderboardClick }) => {

    const handleGithubLogin = () => {
        // window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/github`;
        window.location.assign(`https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&scope=user:email`);
    };

    const handleLogout = async () => {
        try {
            await Global.logout();
        } catch (err) {
            console.error(err);
        }
    };

    const truncateName = (name) => {
        const firstName = name.split(' ')[0]
        if (firstName.length <= 13) {
            return firstName
        }
        return `${firstName.slice(0, 10)}...`
    }

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [eventsOpen, setEventsOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleEvents = () => {
        setEventsOpen(!eventsOpen);
    };

    const sidebarVariants = {
        open: { x: 0 },
        closed: { x: "-100%" },
    };

    const eventsVariants = {
        open: {
            height: "auto",
            opacity: 1,
            transition: {
                height: {
                    duration: 0.05,
                },
            },
        },
        closed: {
            height: 0,
            opacity: 0,
            transition: {
                height: {
                    duration: 0.05,
                },
            },
        },
    };

    return (
        <>
            {/* Navbar */}
            <nav
                className="bg-[rgba(30,30,30,0.8)] backdrop-blur-lg p-4 fixed top-0 left-0 right-0 z-50 flex justify-between items-center shadow-lg">
                {/* Logo */}
                <div className="flex items-center">
                    <img
                        className="w-10 h-10 rounded-full mr-4 transition-transform duration-300 ease-in-out hover:scale-110"
                        src={logo} alt="Logo" />
                    <a href="/" className="text-red-500 font-dm-sans text-2xl font-bold tracking-wide">Club Gamma</a>
                </div>

                {/* Navbar Links (visible on larger screens) */}
                <div className="hidden lg:flex items-center gap-10 font-montserrat text-[1rem]">
                    <button onClick={onHeroClick}
                        className="text-white hover:text-red-500 transition-all duration-300">Home
                    </button>
                    <NavigationMenu>
                        <NavigationMenuList >
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent text-[16px]  text-white hover:text-red-500  transition-all duration-300">
                                    Explore
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="bg-[rgba(60,37,37,0.89)] border-[1px] border-[rgba(74,62,62,0.89)]">
                                    <div className="p-2  bg-[rgba(36,21,21,0.89)] rounded-md shadow-lg ">
                                        <NavigationMenuLink asChild>
                                            <button onClick={onQandAClick}
                                                className="text-white block w-full py-2 px-4 hover:bg-[rgba(255,255,255,0.1)] rounded  hover:text-red-500 transition-all duration-300">Q&A
                                            </button>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink asChild>
                                            <button onClick={onStatusClick}
                                                className="text-white block w-full py-2 px-4 hover:bg-[rgba(255,255,255,0.1)] rounded  hover:text-red-500 transition-all duration-300">Stats
                                            </button>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink asChild>
                                            <button onClick={onProjectsClick}
                                                className="text-white block w-full py-2 px-4 hover:bg-[rgba(255,255,255,0.1)] rounded  hover:text-red-500 transition-all duration-300">Projects
                                            </button>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink asChild>
                                            <button onClick={onContactClick}
                                                className="text-white block w-full py-2 px-4 hover:bg-[rgba(255,255,255,0.1)] rounded  hover:text-red-500 transition-all duration-300">Contact
                                            </button>
                                        </NavigationMenuLink>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>


                    <Link to="/leaderboard"
                        className="text-white hover:text-red-500 transition-all duration-300">Leaderboard
                    </Link> {/* Add this line */}
                    <NavigationMenu>
                        <NavigationMenuList >
                            <NavigationMenuItem>
                                <NavigationMenuTrigger className="bg-transparent text-[16px] text-white hover:text-red-500  transition-all duration-300">
                                    Events
                                </NavigationMenuTrigger>
                                <NavigationMenuContent className="bg-[rgba(36,21,21,0.89)] border-[1px] border-[rgba(74,62,62,0.89)] ">
                                    <div className="p-2 w-24 bg-[rgba(36,21,21,0.89)] rounded-md shadow-lg ">
                                        <NavigationMenuLink asChild>
                                            <Link
                                                to="/events/2024"
                                                className="block py-2 px-4 text-white hover:text-red-500 hover:bg-[rgba(255,255,255,0.1)] rounded transition-all duration-300"
                                            >
                                                2024
                                            </Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                to="/events/2021"
                                                className="block py-2 px-4 text-white hover:text-red-500 hover:bg-[rgba(255,255,255,0.1)] rounded transition-all duration-300"
                                            >
                                                2021
                                            </Link>
                                        </NavigationMenuLink>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                to="/events/2020"
                                                className="block py-2 px-4 text-white hover:text-red-500 hover:bg-[rgba(255,255,255,0.1)] rounded transition-all duration-300"
                                            >
                                                2020
                                            </Link>
                                        </NavigationMenuLink>
                                    </div>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <Link to='/team' className='text-white hover:text-red-500 transition-all duration-300'>
                        Team
                    </Link>
                </div>

                {/* User Menu / GitHub Login */}
                <div className="hidden lg:flex items-center">
                    {Global.user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-12 rounded-full pl-2 pr-4 hover:bg-transparent group">
                            <div className="flex items-center space-x-3">
                            <Avatar className="h-10 w-10 border-2 border-red-500">
                                <AvatarImage src={`https://github.com/${Global.user.githubId}.png`} alt={Global.user.name} />
                                <AvatarFallback>{Global.user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col items-start">
                                <span className="text-sm font-medium text-white group-hover:text-red-500 transition-colors duration-200">
                                {truncateName(Global.user.name)}
                                </span>
                                <span className="text-xs text-gray-300 group-hover:text-red-500 transition-colors duration-200">
                                Rank {Global.user.rank}
                                </span>
                            </div>
                            <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
                            </div>
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-48 bg-[rgba(36,21,21,0.95)] text-white border-none rounded-md shadow-lg" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal border-b border-gray-700 pb-2">
                            <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-5">{Global.user.name}</p>
                            <p className="text-xs leading-none text-gray-400">{Global.user.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuItem asChild className=" focus:bg-transparent focus:text-red-500 transition-colors duration-200">
                            <Link to={`/profile/${Global.user.githubId}`} className="flex items-center py-2">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex justify-between items-center py-2 pointer-events-none">
                            <span>Points</span>
                            <span>{Global.user.points}</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex justify-between items-center py-2 pointer-events-none">
                            <span>Rank</span>
                            <span>{Global.user.rank}</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-700" />
                        <DropdownMenuItem onClick={handleLogout} className="focus:bg-transparent focus:text-red-500 transition-colors duration-200">
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    ) : (
                    <Button onClick={handleGithubLogin} className="flex items-center bg-[#181717] text-white py-2 px-5 rounded-md font-bold shadow-lg hover:shadow-none transition-all duration-500">
                        <svg className="w-6 h-6 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z" />
                        </svg>
                        Continue with GitHub
                    </Button>
                    )}
                </div>

                <div className="lg:hidden">
                    <button className="text-white bg-transparent border-none" onClick={toggleSidebar}>
                        {sidebarOpen ? <IoMdClose size={24} /> : <RiMenu3Fill size={24} />}
                    </button>
                </div>
            </nav>

            <motion.div
                className="fixed inset-y-0 left-0 font-dm-sans w-64 bg-[#181717] z-50 lg:hidden overflow-y-auto"
                variants={sidebarVariants}
                initial="closed"
                animate={sidebarOpen ? "open" : "closed"}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="p-4">
                    <img className="w-10 h-10 rounded-full mb-4" src={logo} alt="Logo" />
                    <nav className="space-y-6">
                        <Link to="/" onClick={() => setSidebarOpen(false)} className="text-white block hover:text-red-500 transition-colors duration-200">Home</Link>
                        <button onClick={() => { onQandAClick(); setSidebarOpen(false) }} className="text-white block hover:text-red-500 transition-colors duration-200 w-full text-left">Q&A</button>
                        <button onClick={() => { onStatusClick(); setSidebarOpen(false) }} className="text-white block hover:text-red-500 transition-colors duration-200 w-full text-left">Stats</button>
                        <button onClick={() => { onProjectsClick(); setSidebarOpen(false) }} className="text-white block hover:text-red-500 transition-colors duration-200 w-full text-left">Projects</button>
                        <button onClick={() => { onContactClick(); setSidebarOpen(false) }} className="text-white block hover:text-red-500 transition-colors duration-200 w-full text-left">Contact</button>
                        <Link to="/leaderboard" onClick={() => setSidebarOpen(false)} className="text-white block hover:text-red-500 transition-colors duration-200">Leaderboard</Link>

                        <div className="relative">
                            <button
                                onClick={toggleEvents}
                                className="text-white flex items-center justify-between w-full hover:text-red-500 transition-colors duration-200"
                            >
                                Events
                                <motion.div
                                    animate={{ rotate: eventsOpen ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown size={16} />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {eventsOpen && (
                                    <motion.div
                                        variants={eventsVariants}
                                        initial="closed"
                                        animate="open"
                                        exit="closed"
                                        className="overflow-hidden"
                                    >
                                        <div className="pl-4 space-y-2 mt-2">
                                            <Link to="/events/2024" onClick={() => { setSidebarOpen(false); setEventsOpen(false) }} className="text-white block hover:text-red-500 transition-colors duration-200">2024</Link>
                                            <Link to="/events/2021" onClick={() => { setSidebarOpen(false); setEventsOpen(false) }} className="text-white block hover:text-red-500 transition-colors duration-200">2021</Link>
                                            <Link to="/events/2020" onClick={() => { setSidebarOpen(false); setEventsOpen(false) }} className="text-white block hover:text-red-500 transition-colors duration-200">2020</Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <Link to="/team" onClick={() => setSidebarOpen(false)} className="text-white block hover:text-red-500 transition-colors duration-200">Team</Link>


                        <hr className="border-gray-700"/>
                        {Global.user ? (
                            <>
                                <Link to={`/profile/${Global.user.githubId}`} className="text-white block hover:text-red-500 transition-colors duration-200" onClick={() => setSidebarOpen(false)}>
                                    Profile
                                </Link>
                                <button onClick={handleLogout} className="text-white block hover:text-red-500 transition-colors duration-200 w-full text-left">Logout</button>
                            </>
                        ) : (
                            <Button onClick={handleGithubLogin} className="text-white bg-red-500 hover:bg-red-600 transition-colors duration-200 block w-full">Continue with GitHub</Button>
                        )}
                    </nav>
                </div>
            </motion.div>

            <div className={sidebarOpen ? "blur-sm":""}>
                <Outlet />
            </div>
        </>
    );
};

export default Navbar;
