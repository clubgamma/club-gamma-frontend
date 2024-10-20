import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ContactUs from '@/components/ContactUs';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import QandA from '@/components/Q&A';
import Stat from '@/components/Stat';

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        // Check if we need to scroll to a section
        if (location.state?.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            element?.scrollIntoView({ behavior: 'smooth' });

            // Clear the state after scrolling
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    return (
        <div className='bg-gradient-to-br pt-4 overflow-x-hidden from-[#1e1e1e] to-[#4e3535]'>
            <div id="hero">
                <Hero/>
            </div>
            <div id="q&a" className='pt-20'>
                <QandA/>
            </div>
            <div id="stat" className='pt-20'>
                <Stat/>
            </div>
            <div id="project" className='pt-20'>
                <Projects/>
            </div>
            <div id="contact" className='pt-20'>
                <ContactUs/>
            </div>
            <Footer/>
        </div>
    );
};

export default Home;
