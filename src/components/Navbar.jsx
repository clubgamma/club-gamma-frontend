import logo from '@/assets/logo.jpeg';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Global from '@/Global';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Calendar, ChevronDown, ChevronsUpDown, HelpCircle, Home, Info, LogOut, User, Users } from 'lucide-react';
import { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { RiMenu3Fill } from "react-icons/ri";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { ScrollArea } from './ui/scroll-area';

const HacktoberfestIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 300 300"
    width="1em"
    height="1em"
    fill="currentColor"
    {...props}
    >
        <polygon xmlns="http://www.w3.org/2000/svg" class="cls-1" points="134.53 199.52 134.53 67.19 101.45 67.19 101.45 100.28 67.81 100.28 67.81 133.36 101.45 133.36 101.45 199.52 67.81 199.52 67.81 232.6 167.06 232.6 167.06 199.52 134.53 199.52" />
        <polygon xmlns="http://www.w3.org/2000/svg" class="cls-1" points="233.11 199.58 233.11 100.33 200.03 100.33 200.03 133.42 166.95 133.42 166.95 166.5 200.03 166.5 200.03 232.66 233.11 232.66 266.19 232.66 266.19 199.58 233.11 199.58"/>
    <polygon
      className="cls-1"
      points="68.03 299.93 34.18 266.63 34.18 34.66 266.15 34.66 300 67.96 300 0 0 0 0 300 68.03 299.93"
    />
  </svg>
)

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

    const truncateName = (name) => {
        const firstName = name.split(' ')[0]
        if (firstName.length <= 13) {
            return firstName
        }
        return `${firstName.slice(0, 10)}...`
    }

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
            icon: Home
        },
        {
            label: "Hacktoberfest",
            path: "/hacktoberfest2024",
            scrollTo: "home",
            icon: HacktoberfestIcon
        },
        {
            label: "About Us",
            scrollTo: "about",
            path: "/",
            icon: Info
        },
        {
            label: "Events",
            scrollTo: "events",
            path: "/",
            icon: Calendar
        },
        {
            label: "Team",
            scrollTo: "team",
            path: "/",
            icon: Users
        },
        {
            label: "FAQs",
            scrollTo: "faqs",
            path: "/",
            icon: HelpCircle
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


                {/* User Menu / GitHub Login */}
                <div className="hidden font-dm-sans lg:flex items-center">
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
                            <DropdownMenuContent className="w-48 font-dm-sans bg-[rgba(36,21,21,0.95)] text-white border-none rounded-md shadow-lg" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal border-b border-gray-700 pb-2">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm font-medium leading-5">{Global.user.name}</p>
                                        <p className="text-xs leading-none text-gray-400">{Global.user.email}</p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuItem asChild className=" focus:bg-transparent focus:text-red-500 transition-colors duration-200 cursor-pointer">
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
                                <DropdownMenuItem onClick={handleLogout} className="focus:bg-transparent focus:text-red-500 transition-colors duration-200 cursor-pointer">
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
      className="fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-[#181717] font-dm-sans lg:hidden flex flex-col"
      variants={sidebarVariants}
      initial="closed"
      animate={sidebarOpen ? "open" : "closed"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 flex-shrink-0">
          <div 
            className="flex items-center hover:cursor-pointer" 
            onClick={() => {
              handleClick({ path: '/' });
              setSidebarOpen(false)
            }}
          >

              <img src={logo} alt="logo" className="w-12 h-12 rounded-full flex items-center justify-center mr-3" />
            <p className='font-bold text-white text-xl'>Club Gamma</p>
          </div>
        </div>
        <hr className="border-gray-700" />
        <div className='p-4'>
          <ScrollArea className="h-[31.5rem]">
          <nav className="space-y-1 text-white">
            {NavbarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => { handleClick(item); setSidebarOpen(false); }}
                className="flex items-center w-full py-2 px-3 text-left transition-colors duration-200 rounded-md hover:text-red-500 hover:bg-opacity-20 text-xl"
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            ))}
            </nav>
            </ScrollArea>
        </div>

        <div className="mt-auto p-4 border-t border-gray-700">
          {Global.user ? (
            <DropdownMenu>
<DropdownMenuTrigger asChild>
    <Button variant="ghost" className="w-full justify-between h-auto p-0 hover:bg-transparent group">
      <div className="flex items-center space-x-3 group-hover:text-red-500">
        <Avatar className="h-10 w-10 border-2 border-red-500">
          <AvatarImage src={`https://github.com/${Global.user.githubId}.png`} alt={Global.user.name} />
          <AvatarFallback>{Global.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-white group-hover:text-red-500 transition-colors duration-200">
            {Global.user.name}
          </span>
          <span className="text-xs text-gray-400 group-hover:text-red-500 transition-colors duration-200">
            Rank {Global.user.rank}
          </span>
        </div>
      </div>
      <ChevronsUpDown className="h-4 w-4 text-gray-400 group-hover:text-red-500 transition-colors duration-200" />
    </Button>
  </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-[#181717] text-white border-gray-800 rounded-md shadow-lg" align="end" forceMount>
                <DropdownMenuLabel className="font-normal border-b border-gray-700 pb-2">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-5">{Global.user.name}</p>
                    <p className="text-xs leading-none text-gray-400">{Global.user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuItem asChild className="focus:bg-opacity-20 focus:text-red-500 focus:bg-transparent transition-colors duration-200">
                    <Button className="flex items-center py-2" onClick={() => {
                        handleClick({ path: `/profile/${Global.user.githubId}` })
                        setSidebarOpen(false)                    
                  }}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Button>
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
                <DropdownMenuItem onClick={handleLogout} className="focus:bg-transparent focus:bg-opacity-20 focus:text-red-500 transition-colors duration-200">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={handleGithubLogin} className="w-full flex items-center justify-center bg-transparent text-white py-2 px-2 rounded-md font-bold shadow-lg hover:bg-trnasparent hover:text-red-500 transition-all duration-300">
              <svg className="w-6 h-6 mr-2" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z" />
              </svg>
              <span className='text-sm'>Continue with GitHub</span>
            </Button>
          )}
        </div>
      </div>
    </motion.div>

            <div className={cn({
                "blur-sm lg:blur-none": sidebarOpen,
            })}>
                <Outlet />
            </div>
        </>
    );
};

export default Navbar;