import { useEffect, useState } from "react";
import TeamCard from "@/components/TeamCard";

const Team = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://raw.githubusercontent.com/clubgamma/club-gamma-frontend/refs/heads/main/JSON/team.json");
                const result = await response.json();
                setData(result.teams);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <section className="bg-gradient-to-br overflow-y-scroll from-[#1e1e1e] to-[#4e3535] pt-24 min-h-screen">
            <div className="mx-auto w-[80%] px-4">
                <h2 className="text-4xl font-bold text-center font-dm-sans text-white mb-12">Our Team</h2>
                {data.map((team, index) => (
                    <div key={index} className="mb-12 w-full flex justify-center">
                        <div
                            className={`w-full grid gap-8 ${team.length === 1
                                ? "grid-cols-1 place-items-center"
                                : team.length === 2
                                    ? "lg:grid-cols-2 grid-cols-1 max-w-[700px] place-items-center"
                                    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center"
                                }`}
                        >
                            {team.map((member) => (
                                <div key={member.name} className="max-w-[300px]  w-full">
                                    <TeamCard member={member} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>



    );
};

export default Team;
