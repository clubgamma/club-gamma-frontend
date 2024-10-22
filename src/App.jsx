import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import '@/App.css'
import Global from '@/Global'
import Home from '@/Pages/Home'
import LeaderBoard from '@/Pages/LeaderBoard'
import Profile from '@/Pages/Profile'
import Navbar from '@/components/Navbar'
import RedirectPage from "@/Pages/Redirect"
import Events from './Pages/Events'
import { infinity } from "ldrs";
import Teams from './Pages/Team'
import PointSystem from './Pages/PointSystem'
import Lenis from '@studio-freight/lenis'
infinity.register()

function App() {
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (section) => {
        if (location.pathname !== '/') {
            navigate('/', { state: { scrollTo: section } });
        } else {
            const element = document.getElementById(section);
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        const initializeUser = async () => {
            try {
                if (location.pathname !== '/redirect') {
                    await Global.getUser();
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoaded(true);
            }
        };

        initializeUser();
    }, [location.pathname]);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 0.1,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
            wheelMultiplier: 1.2,
        });
      
        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
      
        requestAnimationFrame(raf);
        return () => {
            lenis.destroy();
        };
    }, []);

    if (!loaded && location.pathname !== '/redirect') {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#1e1e1e] to-[#4e3535]">
                <l-infinity
                    size="80"
                    stroke="4"
                    stroke-length="0.15"
                    bg-opacity="0.1"
                    speed="1.3"
                    color="white"
                />
            </div>
        )
    }

    return (
        <Routes>
            <Route path="/" element={
                <Navbar
                    onHeroClick={() => handleNavigation('hero')}
                    onContactClick={() => handleNavigation('contact')}
                    onQandAClick={() => handleNavigation('q&a')}
                    onStatusClick={() => handleNavigation('stat')}
                    onProjectsClick={() => handleNavigation('project')}
                />
            }>
                <Route index element={<Home />} />
                <Route path="leaderboard" element={<LeaderBoard />} />
                <Route path="events/:year" element={<Events />} />
                <Route path="profile/:username" element={<Profile />} />
                <Route path='/team' element={<Teams />} />
                <Route path='/point-system' element={<PointSystem />} />
            </Route>
            <Route path="/redirect" element={<RedirectPage />} />
        </Routes>
    )
}

export default App;
