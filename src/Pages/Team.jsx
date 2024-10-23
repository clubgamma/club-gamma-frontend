import { useEffect, useState } from "react";
import TeamCard from "@/components/TeamCard";
import Loader from "@/components/Loader";
import SEO from "@/components/SEO";

const Team = () => {
    const [teamData, setTeamData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch("https://raw.githubusercontent.com/clubgamma/club-gamma-frontend/refs/heads/main/JSON/team.json");
                if (!response.ok) {
                    throw new Error('Failed to fetch team data');
                }
                const result = await response.json();

                setTeamData(result.teams);
            } catch (error) {
                console.error(error);
                setError('Failed to load team data');
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <Loader size='80' />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-white">{error}</div>
            </div>
        );
    }

    return (
        <>
            <SEO title="Team" pathname="/team"
                description="Meet the talented team behind Club Gamma. Discover the people driving our mission and making things happen!"
                keywords="Club Gamma, team, developers, open source, contributors, leadership, tech team"
            />

            <section className="pt-24 min-h-screen">
                <div className="container mx-auto px-4 pb-24">
                    <div className="relative py-16 text-center">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 right-1/4 w-64 h-64 bg-gradient-to-br from-red-500/10 to-transparent rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-gradient-to-tr from-red-600/10 to-transparent rounded-full blur-3xl" />

                        <div className="relative space-y-4">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                                Meet Team{" "}
                                <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent hover:from-red-400 hover:to-red-500 transition-colors duration-300">
                                    Gamma
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
                                These are the fine folks behind Club Gamma!
                            </p>
                        </div>
                    </div>

                    {teamData.map((group, index) => (
                        <div key={index} className="mb-16 last:mb-0">
                            <div className={`grid gap-8 w-full ${group.length === 1
                                ? "grid-cols-1 max-w-md mx-auto"
                                : group.length === 2
                                    ? "grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto"
                                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
                                }`}>
                                {group.map((member) => (
                                    <div key={member.name} className="w-full max-w-sm mx-auto">
                                        <TeamCard member={member} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Team;