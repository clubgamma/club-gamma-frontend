import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaDiscord,
    FaLinkedin,
    FaGithub,
    FaInstagram,
    FaTwitter,
    FaMapMarkerAlt,
    FaEnvelope,
    FaPhone
} from 'react-icons/fa';
import logo from '@/assets/logo.jpeg';

const Footer = () => {
    const socialLinks = [
        { icon: FaGithub, url: 'https://github.com/clubgamma', label: 'GitHub' },
        { icon: FaInstagram, url: 'https://instagram.com/club_gamma', label: 'Instagram' },
        { icon: FaLinkedin, url: 'https://linkedin.com/company/clubgamma', label: 'LinkedIn' },
        { icon: FaTwitter, url: 'https://twitter.com/club_gamma', label: 'Twitter' },
        { icon: FaDiscord, url: 'https://discord.gg/CgMRHtXjrf', label: 'Discord' }
    ];

    return (
        <footer className="relative py-8 md:py-12 text-white bg-gradient-to-br from-[#1e1e1e] to-[#2d2424]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center md:flex-row md:justify-evenly md:space-y-0 space-y-8 font-dm-sans">
                    {/* Left Section - Logo & Description */}
                    <div className="flex flex-col  items-center md:items-start space-y-4 md:w-1/3 text-center md:text-left">
                        <div className="flex items-center gap-2">
                            <div className="overflow-hidden rounded-full">
                                <img
                                    className="w-12 h-12 transition-transform duration-500 transform hover:scale-110"
                                    src={logo}
                                    alt="Logo"
                                />
                            </div>
                            <Link
                                to='/'
                                className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-200"
                            >
                                Club Gamma
                            </Link>
                        </div>
                        <p className="text-lg font-medium text-red-300 max-w-md">
                            Empowering students through technology and innovation
                        </p>
                        <p className="text-gray-300 max-w-md">
                            Join our community of passionate developers and creators
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="flex flex-col  items-center md:items-start space-y-3 md:w-1/3 text-center md:text-left">
                        <div className="flex items-center space-x-3 text-gray-300 group">
                            <FaMapMarkerAlt className="text-red-500 group-hover:scale-110 transition-transform duration-300" />
                                <a 
                                    href="https://maps.google.com/?q=CHARUSAT+University,Changa+Gujarat" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="hover:text-red-400 transition-colors duration-300"
                                >
                                    <span>Charusat University, Gujarat</span>
                                </a>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-300 group">
                            <FaEnvelope className="text-red-500 group-hover:scale-110 transition-transform duration-300" />
                            <a href="mailto:info.clubgamma@gmail.com" className="hover:text-red-400 transition-colors duration-300">
                                info.clubgamma@gmail.com
                            </a>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-300 group">
                            <FaPhone className="text-red-500 group-hover:scale-110 transition-transform duration-300" />
                            <span>+91 1234567890</span>
                        </div>
                    </div>

                    {/* Right Section - Social Links */}
                </div>
                <div className="flex flex-col items-center pt-5  justify-center ">
                    <div className="grid  grid-cols-5 md:grid-cols-5 gap-4">
                        {socialLinks.map((social) => (
                            <a
                                key={social.label}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 transition-all duration-300 rounded-lg bg-red-900/50 hover:bg-red-800 group"
                                aria-label={social.label}
                            >
                                <social.icon
                                    size={24}
                                    className="transition-transform duration-300 text-white/90 group-hover:text-white group-hover:scale-110"
                                />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col font-dm-sans mb-16 md:mb-0 md:flex-row items-center justify-between pt-8 mt-8 space-y-4 md:space-y-0 border-t border-red-900/30">
                    <p className="text-sm text-gray-300">
                        © {new Date().getFullYear()} Club Gamma. All rights reserved.
                    </p>
                    <Link
                        to="/code-of-conduct"
                        className="text-sm transition-all duration-300 text-red-400 hover:text-red-300"
                    >
                        Code of Conduct
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
