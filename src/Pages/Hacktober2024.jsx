import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ContactUs from '@/components/ContactUs';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import QandA from '@/components/HFQ&A';
import Stats from '@/components/Stat';


const Hacktober2024 = () => {
    const location = useLocation();
  

    useEffect(() => {
        window.scrollTo({
            top: 0,
        });
    }, []);

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
        <div className='bg-gradient-to-br overflow-x-hidden absolute from-[#1e1e1e] to-[#4e3535]'>
            <div id="hero" className='pt-4'>
                <Hero />
            </div>
            <div id="stat" className='pt-20'>
                <Stats />
            </div>
            <div id="projects" className='pt-20'>
                <Projects />
            </div>
            <div id="q&a" className='pt-20'>
                <QandA />
            </div>
            <div id="contact" className='pt-20'>
                <ContactUs />
            </div>
            <Footer />
        </div>
    );
};

export default Hacktober2024;
