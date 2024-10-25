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
import Loader from '@/components/Loader'
import ContributorsPage from './Pages/Contributors'
import { SEOLayout } from '@/components/SEOLayout'
import NotFound from '@/components/NotFound'
import Toaster from '@/components/Toaster';
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

    if (!loaded && location.pathname !== '/redirect') {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br overflow-hidden from-[#1e1e1e] to-[#4e3535]">
                <Loader size='80'/>
            </div>
        )
    }

    return (
        <SEOLayout >
            <Toaster 
                expand={true}
                richColors
                closeButton
            />
            <div className="bg-gradient-to-br overflow-hidden from-[#1e1e1e] to-[#4e3535] min-h-screen">
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
                        <Route path="/contributors/:repoName" element={<ContributorsPage />} />
                        <Route path="leaderboard" element={<LeaderBoard />} />
                        <Route path="events/:year" element={<Events />} />
                        <Route path="profile/:username" element={<Profile />} />
                        <Route path='/team' element={<Teams />} />
                        <Route path='/point-system' element={<PointSystem />} />
                    </Route>
                    <Route path="/redirect" element={<RedirectPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </SEOLayout>
    )
}

export default App;
