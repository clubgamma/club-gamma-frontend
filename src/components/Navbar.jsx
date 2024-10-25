import logo from '@/assets/logo.jpeg';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Global from '@/Global';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, User } from 'lucide-react';
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { RiMenu3Fill } from "react-icons/ri";
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';


const Navbar = () => {
    const navigate = useNavigate();

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

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const sidebarVariants = {
        open: { x: 0 },
        closed: { x: "-100%" },
    };

    const NavbarItems = [
        {
            label: "Home",
            scrollTo: "hero",
            path: "/",
        },
        {
            label: "Hactoberfest",
            path: "/hacktoberfest2024",
            scrollTo: "home",
        },
        {
            label: "About Us",
            scrollTo: "about",
            path: "/",
        },
        {
            label: "Events",
            scrollTo: "events",
            path: "/",
        },
        {
            label: "Team",
            scrollTo: "team",
            path: "/",
        },
        {
            label: "FAQs",
            scrollTo: "faqs",
            path: "/",
        },
    ];

    const handleClick = (item) => {
        if (item.path === "/") {
            navigate("/", { state: { scrollTo: item.scrollTo } });
        } else {
            navigate(item.path);
        }
    };



    return (
        <>
            {/* Navbar */}
            <nav className="bg-[rgba(30,30,30,0.8)] backdrop-blur-lg p-4 fixed top-0 left-0 right-0 z-50 flex justify-between items-center shadow-lg">
                <div className="flex items-center">
                    <img className="w-10 h-10 mr-4 transition-transform duration-300 ease-in-out rounded-full hover:scale-110" src={logo} alt="Logo" />
                    <a href="/" className="text-2xl font-bold tracking-wide text-red-500 font-dm-sans">Club Gamma</a>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-10 font-montserrat text-[1rem]">
                  
                    {
                        NavbarItems.map((item, index) => (
                            <button key={index} onClick={() => handleClick(item)} className="text-white transition-all duration-300 cursor-pointer hover:text-red-500">
                                {item.label}
                            </button>
                        ))
                    }
                </div>

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
                    <button className="bg-transparent border-none text-white" onClick={toggleSidebar}>
                        {sidebarOpen ? <IoMdClose size={24} /> : <RiMenu3Fill size={24} />}
                    </button>
                </div>
            </nav>

            <motion.div className="fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto  bg-[#181717]  font-dm-sans lg:hidden"
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
                        {
                            NavbarItems.map((item, index) => (
                                <button key={index} onClick={() => { handleClick(item); setSidebarOpen(false); }} className="block w-full text-center cursor-pointer hover:text-red-500">
                                    {item.label}
                                </button>
                            ))
                        }
                        <hr className="border-gray-700" />
                        {Global.user ? (
                            <>
                                <Link to={`/profile/${Global.user.githubId}`} className="block text-center hover:text-red-500">Profile</Link>
                                <button onClick={handleLogout} className="block w-full text-center hover:text-red-500">Logout</button>
                            </>
                        ) : (
                            <Button onClick={handleGithubLogin} className="block w-full bg-red-500 hover:bg-red-600">Continue with GitHub</Button>
                        )}
                    </nav>
                </div>
            </motion.div>

            <Outlet />
        </>
    );
};

export default Navbar;