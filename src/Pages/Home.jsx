import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, BrainCog, Code, Cpu, Lightbulb, Rocket, Sparkles, Star, Target, Terminal, Trophy, Users } from 'lucide-react';
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from 'react';
import BackToTop from '@/components/backToTop';
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EventsSection from "./Events";
import Team from "./Team";
import FAQs from '@/components/FAQs';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';

const Card = ({ title, description, buttonText }) => {
    return (
        <motion.div 
            whileHover={{ y: -5 }}
            className="flex flex-col items-center p-6 transition-all duration-300 bg-white rounded-lg shadow-md hover:shadow-xl"
        >
            <h3 className="mb-4 text-2xl font-bold">{title}</h3>
            <p className="mb-4 text-gray-600">{description}</p>
            <Button className="px-4 py-2 text-white bg-[#D8183A] rounded-lg hover:bg-[#B01331] transition-colors duration-300">
                {buttonText}
            </Button>
        </motion.div>
    );
};

Card.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
};

function FeatureCard({ icon: Icon, title, description }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-br font-dm-sans from-[#2a2a2a] to-[#3a2a2a] rounded-lg p-6 flex flex-col items-center w-72 relative group overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-red-500/5 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10">
                <Icon className="h-12 w-12 mb-4 text-red-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-white relative z-10 group-hover:text-red-400 transition-colors">
                {title}
            </h3>
            <p className="text-sm text-gray-400 text-center relative z-10 group-hover:text-gray-300 transition-colors">
                {description}
            </p>
        </motion.div>
    );
}

const Home = () => {
    const location = useLocation();
    const aboutRef = useRef(null);
    const eventsRef = useRef(null);
    const teamRef = useRef(null);
    const faqsRef = useRef(null);
    const heroRef = useRef(null);

    useEffect(() => {
        const scrollToSection = () => {
            if (location.state?.scrollTo) {
                const refs = {
                    'hero': heroRef,
                    'about': aboutRef,
                    'events': eventsRef,
                    'team': teamRef,
                    'faqs': faqsRef
                };

                const targetRef = refs[location.state.scrollTo];
                if (targetRef?.current) {
                    setTimeout(() => {
                        targetRef.current.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 50);
                }

                window.history.replaceState({}, document.title);
            }
        };

        scrollToSection();
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
            icon: <Trophy className="w-6 h-6" />,
            title: "Hackathons",
            description: "Competitive coding events with amazing prizes"
        }
    ];

    return (
        <>
            <SEO title="Home" />
            <div className="min-h-screen text-black bg-white">
                {/* Hero Section */}
                <section ref={heroRef} id="hero" className="relative overflow-hidden pt-10 bg-gradient-to-br from-[#1e1e1e] to-[#4e3535] text-white min-h-screen">
                    <div className="absolute inset-0 opacity-10">
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-20 left-10 w-20 h-20 border-2 border-red-400 rounded-full"
                        />
                        <motion.div 
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute top-40 right-20 w-16 h-16 border-2 border-red-300 rounded-full"
                        />
                        <motion.div 
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute bottom-20 left-1/4 w-24 h-24 border-2 border-red-500 rounded-full"
                        />
                    </div>
                    <div className="container mx-auto font-dm-sans px-4 py-16 sm:py-24 relative z-10">
                        <div className="text-center">
                            <motion.h1 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 relative inline-block"
                            >
                                Welcome to Club Gamma
                                <Sparkles className="absolute -top-6 right-2 sm:-right-6 text-yellow-400 h-8 w-8 animate-spin" />
                            </motion.h1>
                            <motion.p 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto text-gray-300"
                            >
                                Empowering students to innovate, collaborate, and excel in the digital age
                            </motion.p>
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-wrap justify-center gap-6 mb-12"
                            >
                                {[
                                    { icon: Rocket, title: "Tech Innovations", description: "Explore cutting-edge technologies" },
                                    { icon: Users, title: "Collaborative Networks", description: "Connect with like-minded peers" },
                                    { icon: Lightbulb, title: "Idea Incubator", description: "Nurture and develop your concepts" }
                                ].map((feature, index) => (
                                    <FeatureCard key={index} icon={feature.icon} title={feature.title} description={feature.description} />
                                ))}
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <Link 
                                    to="/hacktoberfest2024" 
                                    className="group relative inline-flex items-center px-9 py-3 text-xl font-semibold text-red-400 border-2 border-red-400 rounded-xl overflow-hidden"
                                >
                                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                                        Hacktoberfest
                                    </span>
                                    <motion.div
                                        whileHover={{ x: 5 }}
                                        className="relative z-10 group-hover:text-white transition-colors duration-300"
                                    >
                                        <ArrowRight className="w-6 h-6 ml-2 mt-1" />
                                    </motion.div>
                                    <div className="absolute inset-0 bg-rose-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                </section>

                {/* About Section */}
                <section ref={aboutRef} id="about" className="bg-gradient-to-br from-[#1e1e1e] to-[#4e3535] py-24 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10">
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-20 left-10 w-16 h-16 border-2 border-red-400 rounded-full"
                        />
                        <motion.div 
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute top-40 right-20 w-16 h-16 border-2 border-red-300 rounded-full"
                        />
                        <motion.div 
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute bottom-16 left-1/4 w-24 h-24 border-2 border-red-500 rounded-full"
                        />
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
                                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0" />
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
                            whileHover={{ y: -5 }}
                            className="group relative"
                            >
                            <div className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-red-500/20 rounded-xl blur-sm transform group-hover:scale-105 transition-transform duration-300" />
                            <div className="relative bg-[#2a2a2a]/40 border border-red-200/10 p-8 rounded-xl h-full hover:border-red-500/30 transition-colors">
                                <div className="text-red-500 mb-4">
                                {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                                {feature.title}
                                </h3>
                                <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                                {feature.description}
                                </p>
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
                            <h2 className="text-3xl font-bold font-dm-sans text-white mb-12 relative inline-block">
                                Why Join Club Gamma?
                                
                                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0" />
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {activities.map((activity, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ y: -5 }}
                                        className="group relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-red-400/5 to-red-500/5 rounded-lg transform group-hover:scale-105 transition-transform duration-300" />
                                        <div className="p-6 bg-gradient-to-br font-dm-sans from-[#3a3a3a]/30 to-[#6c6c6c]/30 rounded-lg border border-red-500/10 backdrop-blur-sm relative z-10 h-full transition-all duration-300 group-hover:border-red-500/30">
                                            <motion.div
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                                className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-red-500/10 text-red-500 mb-4"
                                            >
                                                {activity.icon}
                                            </motion.div>
                                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">
                                                {activity.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">
                                                {activity.description}
                                            </p>
                                            <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                </section>

                {/* Events Section */}
                <section ref={eventsRef} id="events" className='relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1e1e1e] to-[#4e3535]'>
                    <EventsSection />
                </section>

                {/* Team Section */}
                <section ref={teamRef} id="team" className="relative min-h-screen py-20 overflow-hidden bg-gradient-to-br from-[#1e1e1e] to-[#4e3535]">
                    <div className="absolute inset-0">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute w-96 h-96 bg-red-600/10 rounded-full -top-20 -left-20 blur-3xl"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="absolute w-96 h-96 bg-red-800/5 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl"
                        />
                        <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute w-96 h-96 bg-gray-800/20 rounded-full -bottom-20 -right-20 blur-3xl"
                        />
                    </div>

                    <div className="relative container px-6 mx-auto">
                        <Team seo={false} />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                </section>

                {/* FAQ Section */}
                <section ref={faqsRef} id="faqs" className="bg-gradient-to-br from-[#1e1e1e] to-[#4e3535] py-24 relative overflow-hidden">
                    <FAQs />
                </section>

                {/* scroll to the top  */}
                <BackToTop id={"hero"} />


                {/* Footer Section */}
                <Footer />
            </div>
        </>
    );
};

export default Home;