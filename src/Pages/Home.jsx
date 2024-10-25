import { Button } from "../components/ui/button";
import { useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { FaGithub, FaLinkedinIn, FaInstagram, FaTwitter, FaFacebook, FaDiscord, FaYoutube, FaLinkedin } from 'react-icons/fa';
import logo from '@/assets/logo.jpeg';
import teamData from '../../JSON/team.json';
import { motion } from 'framer-motion';
import { Code, Users, Star, Cpu, BrainCog, Terminal } from 'lucide-react';
import { ArrowRight, Rocket, Lightbulb, Sparkles } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import FAQ from '../assets/FAQ.svg';



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
    const [openIndex, setOpenIndex] = useState(null);
    const location = useLocation();
    useEffect(() => {
        if (location.state?.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            element?.scrollIntoView({ behavior: 'smooth' });

            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.2
            }
        }
    };

    const teamcardVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        },
        hover: {
            y: -8,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 400
            }
        }
    };

    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };


    const mainFeatures = [
        {
            icon: <Code className="w-8 h-8" />,
            title: "Learn",
            description: "Expert-led workshops and hands-on coding sessions"
        },
        {
            icon: <Terminal className="w-8 h-8" />,
            title: "Build",
            description: "Create real-world projects in collaborative environments"
        },
        {
            icon: <Rocket className="w-8 h-8" />,
            title: "Grow",
            description: "Advance your skills through mentorship and peer learning"
        }
    ];

    const activities = [
        {
            icon: <Star className="w-6 h-6" />,
            title: "Workshops & Events",
            description: "Regular technical workshops and networking events"
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Community Projects",
            description: "Collaborate on innovative open-source initiatives"
        },
        {
            icon: <Cpu className="w-6 h-6" />,
            title: "Tech Talks",
            description: "Insights from industry experts and thought leaders"
        },
        {
            icon: <BrainCog className="w-6 h-6" />,
            title: "Hackathons",
            description: "Competitive coding events with amazing prizes"
        }
    ];

    const faqs = [
        { question: "What is Club Gamma?", answer: "Club Gamma is a developer community focused on learning, building, and growing together." },
        { question: "How can I join Club Gamma?", answer: "You can join by signing up on our website and becoming part of our community." },
        { question: "What activities does Club Gamma offer?", answer: "We offer coding workshops, hackathons, and networking events." },
        { question: "Is there a membership fee?", answer: "No, joining Club Gamma is completely free!" }
    ];

    return (
        <div className="min-h-screen text-black bg-white">
            {/* Hero Section */}
            <section id="hero" className="flex flex-col justify-center bg-[#D8183A]  text-center">
                <section className="relative overflow-hidden pt-10 bg-gradient-to-br from-[#1e1e1e] to-[#4e3535] text-white min-h-screen">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-red-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-40 right-20 w-16 h-16 border-2 border-red-300 rounded-full animate-ping"></div>
                        <div className="absolute bottom-20 left-1/4 w-24 h-24 border-2 border-red-500 rounded-full animate-bounce"></div>
                    </div>
                    <div className="container mx-auto font-dm-sans px-4 py-16 sm:py-24 relative z-10">
                        <div className="text-center">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 relative inline-block">
                                Welcome to Club Gamma
                                <Sparkles className="absolute -top-6 -right-6 text-yellow-400 h-8 w-8 animate-spin" />
                            </h1>
                            <p className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto text-gray-300">
                                Empowering students to innovate, collaborate, and excel in the digital age
                            </p>
                            <div className="flex flex-wrap justify-center gap-6 mb-12">
                                <FeatureCard icon={Rocket} title="Tech Innovations" description="Explore cutting-edge technologies" />
                                <FeatureCard icon={Users} title="Collaborative Networks" description="Connect with like-minded peers" />
                                <FeatureCard icon={Lightbulb} title="Idea Incubator" description="Nurture and develop your concepts" />
                            </div>
                            <div>
                                <Link to="/hacktoberfest2024" class="cursor-pointer font-dm-sans inline-flex  rounded-xl px-9 py-3 text-xl  font-semibold text-red-400 hover:text-white border-2 border-red-400
                                        hover:bg-rose-600 items-center transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-75  duration-300  focus:bg-transparent">
                                    Hacktoberfest <ArrowRight className="w-6 h-6 ml-2 mt-1" />
                                </Link>

                            </div>

                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                </section>
            </section>

            {/* About Section */}
            <section id="about" className=" bg-gradient-to-br from-[#1e1e1e] to-[#4e3535] py-20 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-16 h-16 border-2 border-red-400 rounded-full animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-16 h-16 border-2 border-red-300 rounded-full animate-ping"></div>
                    <div className="absolute bottom-16 left-1/4 w-24 h-24 border-2 border-red-500 rounded-full animate-bounce"></div>
                </div>

                <div className="container mx-auto px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h1 className="inline-block text-5xl font-dm-sans md:text-6xl font-bold text-white mb-6 relative">
                            About <span className="text-red-500">Club Gamma</span>
                            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0"></div>
                        </h1>
                        <p className="max-w-2xl font-montserrat mx-auto text-gray-300 text-lg">
                            An innovative tech community where passionate developers come together to learn,
                            build, and grow in the world of technology.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 font-dm-sans gap-8 mb-20">
                        {mainFeatures.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded-xl blur-sm  "></div>
                                <div className="relative bg-[#2a2a2a]/40 border border-red-200/10 p-8 rounded-xl ">
                                    <div className="text-red-500 mb-4">{feature.icon}</div>
                                    <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-400">{feature.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-bold font-dm-sans text-white mb-12">Why Join Club Gamma?</h2>
                        <div className="grid md:grid-cols-4 gap-6">
                            {activities.map((activity, index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-gradient-to-br font-dm-sans from-[#3a3a3a]/30 to-[#6c6c6c]/30 rounded-lg border border-red-500/10 backdrop-blur-sm"
                                >
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-red-500/10 text-red-500 mb-4">
                                        {activity.icon}
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">{activity.title}</h3>
                                    <p className="text-gray-400 text-sm">{activity.description}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
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
            <section id="team" className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-br from-[#1e1e1e] to-[#4e3535]">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute w-96 h-96 bg-red-600/10 rounded-full -top-20 -left-20 blur-3xl animate-pulse" />
                    <div className="absolute w-96 h-96 bg-red-800/5 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl animate-pulse delay-700" />
                    <div className="absolute w-96 h-96 bg-gray-800/20 rounded-full -bottom-20 -right-20 blur-3xl animate-pulse delay-1000" />
                </div>

                <div className="relative container px-6 mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center "
                    >
                        {/* Header section */}
                        <h1 className="inline-block text-5xl font-dm-sans md:text-6xl font-bold text-white mb-6 relative">
                            Meet Our <span className="text-red-500">Team</span>
                            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0"></div>
                        </h1>
                        <p
                            className="max-w-2xl font-montserrat mx-auto mb-16 text-lg text-gray-300/90"
                        >
                            Our team consists of passionate developers and community leaders dedicated to building a welcoming and inclusive environment.
                        </p>

                        {/* Team members grid */}
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {teamData.teams.flat().map((member, index) => (
                                <motion.div
                                    key={index}
                                    variants={teamcardVariants}
                                    whileHover="hover"
                                    className="group"
                                >
                                    <div className="relative p-6 font-dm-sans rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 shadow-xl overflow-hidden">
                                        {/* Card glow effect */}
                                        <div className="absolute inset-0 bg-gradient-to-b from-red-600/0 via-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                        {/* Member image with glow */}
                                        <div className="relative mb-6">
                                            <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-transparent rounded-full blur-xl transform group-hover:scale-125 transition-transform duration-500" />
                                            <img
                                                src={member.imageUrl || "/api/placeholder/128/128"}
                                                alt={member.name}
                                                className="relative w-32 h-32 mx-auto rounded-full object-cover border-2 border-red-600/30 group-hover:border-red-600/60 transition-all duration-300 shadow-lg"
                                            />
                                        </div>

                                        {/* Member details */}
                                        <h3 className="text-xl font-bold text-white mb-2 tracking-wide">
                                            {member.name}
                                        </h3>
                                        <div className="flex items-center justify-center">
                                            <p className="text-red-400 bg-red-600/30 rounded-full px-3 text-sm font-medium mb-3">
                                                {member.position}
                                            </p>
                                        </div>
                                        <p className="text-sm italic text-gray-400 mb-6">
                                            &#34;{member.tagline}&#34;
                                        </p>

                                        {/* Social media links */}
                                        <div className="flex justify-center space-x-4">
                                            {member.social.linkedin && (
                                                <a
                                                    href={member.social.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group/icon p-2 rounded-full bg-red-600/10 hover:bg-red-600/20 transform hover:scale-110 transition-all duration-300"
                                                >
                                                    <FaLinkedinIn className="text-red-500 group-hover/icon:text-red-400" size={20} />
                                                </a>
                                            )}
                                            {member.social.instagram && (
                                                <a
                                                    href={member.social.instagram}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group/icon p-2 rounded-full bg-red-600/10 hover:bg-red-600/20 transform hover:scale-110 transition-all duration-300"
                                                >
                                                    <FaInstagram className="text-red-500 group-hover/icon:text-red-400" size={20} />
                                                </a>
                                            )}
                                            {member.social.github && (
                                                <a
                                                    href={member.social.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group/icon p-2 rounded-full bg-red-600/10 hover:bg-red-600/20 transform hover:scale-110 transition-all duration-300"
                                                >
                                                    <FaGithub className="text-red-500 group-hover/icon:text-red-400" size={20} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>


            {/* FAQ Section */}
            <section id="faqs" className="bg-gradient-to-br from-[#1e1e1e]  to-[#4e3535] py-20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-16 h-16 border-2 border-red-400 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-16 left-1/4 w-24 h-24 border-2 border-red-500 rounded-full animate-bounce"></div>
                    <div className="absolute top-40 right-20 w-16 h-16 border-2 border-red-300 rounded-full animate-ping"></div>
                </div>
                <div className="container mx-auto  px-4 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                    
                        <h1 className="inline-block text-5xl font-dm-sans md:text-6xl font-bold text-white mb-6 relative">
                            FAQs
                            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0"></div>
                        </h1>
                        <div className="flex flex-col md:flex-row w-full">
                            <div className="font-dm-sans w-[60%] mx-auto space-y-4 p-7">
                                <Accordion type="single" collapsible className="w-full">
                                    {faqs.map((faq, index) => (
                                        <AccordionItem key={index} value={`item-${index}`} className="border-b mb-4 border-red-800/30">
                                            <AccordionTrigger
                                                className="text-left py-4 px-6 bg-red-900/20 hover:bg-red-800/30 rounded-t-lg hover:no-underline transition-colors duration-200"
                                            >
                                                <span className="text-lg font-semibold text-red-100">{faq.question}</span>
                                            </AccordionTrigger>
                                            <AccordionContent className="p-6 bg-red-950/40 rounded-b-lg">
                                                <p className="text-red-200">{faq.answer}</p>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </div>
                            <div className="w-[40%] p-5">
                                <img src={FAQ} alt="FAQs" className="w-full h-auto" />
                            </div>
                        </div>
                    </motion.div>
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


function FeatureCard({ icon: Icon, title, description }) {
    return (
        <div className="bg-gradient-to-br font-dm-sans from-[#2a2a2a] to-[#3a2a2a] rounded-lg p-6 flex flex-col items-center w-72 transform transition-transform hover:scale-105">
            <Icon className="h-12 w-12 mb-4 text-red-400" />
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-sm text-gray-400">{description}</p>
        </div>
    )
}