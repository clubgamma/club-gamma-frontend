import '@/App.css'
import Global from '@/Global'
import Home from '@/Pages/Home'
import LeaderBoard from '@/Pages/LeaderBoard'
import Profile from '@/Pages/Profile'
import { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import RedirectPage from "@/Pages/Redirect"
import NotFound from '@/components/NotFound'
import Toaster from '@/components/Toaster'
import { infinity } from "ldrs"
import ContributorsPage from './Pages/Contributors'
import Events from './Pages/Events'
import Hacktober2024 from './Pages/Hacktober2024'
import PointSystem from './Pages/PointSystem'
import Teams from './Pages/Team'
import Docks from './components/Dock'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import { SEOLayout } from './components/SEOLayout'
import CodeOfConduct from './Pages/CodeOfConduct'
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

    // Navigate to /hacktoberfest2024 when Register button is clicked
    const handleRegisterClick = () => {
        navigate('/hacktoberfest2024');
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
                <Loader size='80' />
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
                    <Route path="/" element={<Navbar />}>
                        <Route index element={<Home />} />
                        <Route path="leaderboard" element={<LeaderBoard />} />
                        <Route path="events/:year" element={<Events />} />
                        <Route path="profile/:username" element={<Profile />} />
                        <Route path='/team' element={<Teams />} />
                        <Route path='/point-system' element={<PointSystem />} />
                        <Route path='/code-of-conduct' element={<CodeOfConduct />} />
                    </Route>

                    <Route path='/hacktoberfest2024' element={
                        <>
                            <Navbar dockon={true} />
                        </>}>
                        <Route index element={<Hacktober2024 />} />
                        <Route path="contributors/:repoName" element={<ContributorsPage />} />
                        <Route path='leaderboard' element={<LeaderBoard />} />
                        <Route path='point-system' element={<PointSystem />} />
                    </Route>

                    <Route path="/redirect" element={<RedirectPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </div>
        </SEOLayout >
    )
}

export default App;
