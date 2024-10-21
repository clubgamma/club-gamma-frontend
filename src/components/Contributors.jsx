import React from 'react';
import ContributorCard from './ContributorCard';

const contributors = [
    {
        username: 'MitM123',
        points: 36,
        profilePic: 'https://avatars.githubusercontent.com/u/141215405?v=4', 
    },
    {
        username: 'AyushKalathiya',
        points: 22,
        profilePic: 'https://avatars.githubusercontent.com/u/121330320?v=4',
    },
    {
        username: 'nandit27',
        points: 19,
        profilePic: 'https://avatars.githubusercontent.com/u/173247466?v=4',
    }
];

const Contributors = () => {
    return (
        <div className=" text-white py-10">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Major Contributors <span role="img" aria-label="laptop">👨‍💻</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {contributors.map((contributor, index) => (
                        <ContributorCard
                            key={index}
                            username={contributor.username}
                            points={contributor.points}
                            profilePic={contributor.profilePic}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Contributors;
