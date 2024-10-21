import React from 'react';

const ContributorCard = ({ username, points, profilePic }) => {
    return (
        <a 
            href={`https://github.com/${username}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-4 flex items-center text-gray-400 hover:text-white"
        >
            <div className="bg-gradient-to-br from-[#644f4f] to-[#5e4545] text-white rounded-lg shadow-md p-6 flex flex-col items-center w-full">
                <img 
                    src={profilePic} 
                    alt={`${username}'s profile`} 
                    className="w-24 h-24 rounded-full mb-4" 
                />
                <h3 className="text-lg font-semibold">Username: {username}</h3>
                <p className="text-sm text-gray-400">{points} points</p>
                <span>GitHub</span>
            </div>
        </a>
    );
};

export default ContributorCard;
