import logo from '@/assets/logo.jpeg';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCog, Code, Cpu, Lightbulb, Rocket, Sparkles, Star, Target, Terminal, Users } from 'lucide-react';
import PropTypes from "prop-types";
import { useEffect, useState } from 'react';
import { FaDiscord, FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from 'react-icons/fa';
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import EventsSection from "./Events";
import Team from "./Team";
import FAQs from '@/components/FAQs';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

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
    const location = useLocation();
    useEffect(() => {
        if (location.state?.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            element?.scrollIntoView({ behavior: 'smooth' });

            window.history.replaceState({}, document.title);
        }
    }, [location]);

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

    return (
        <>
        <SEO title="Home" />
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
                                <Sparkles className="absolute -top-6 right-2 sm:-right-6 text-yellow-400 h-8 w-8 animate-spin" />
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
                                <Link to="/hacktoberfest2024" className="cursor-pointer font-dm-sans inline-flex  rounded-xl px-9 py-3 text-xl  font-semibold text-red-400 hover:text-white border-2 border-red-400
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
            <section id="about" className=" bg-gradient-to-br from-[#1e1e1e] to-[#4e3535] py-24 relative overflow-hidden">
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
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
            </section>


            {/* Events Section */}
            {/* Events Section */}
            <section id="events" className='relative min-h-screen  overflow-hidden bg-gradient-to-br from-[#1e1e1e] to-[#4e3535]'>
                <EventsSection />
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
                    <Team seo={false}/>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
            </section>


            {/* FAQ Section */}
            <section id="faqs" className="bg-gradient-to-br from-[#1e1e1e]  to-[#4e3535] py-24 relative overflow-hidden">
                <FAQs />
            </section>


            {/* Footer Section */}
            <div>
                <Footer />
            </div>

            </div>
            </>
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