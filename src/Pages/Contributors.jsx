import Global from '@/Global';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ContributorsPage = () => {
  const { repoName } = useParams();
  const [contributors, setContributors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);

    const fetchContributors = async () => {
        try {
          const response = await Global.httpGet(`/projects/contributors/${repoName}`);
            setContributors(response);
        } catch (error) {
            setError("Error fetching contributors")
            console.error('Error fetching contributors:', error);
        }
    };

    fetchContributors();
}, [repoName]);

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-[#1e1e1e] to-[#4e3535] flex flex-col items-center mt-16">
      <div className="bg-gradient-to-br from-[#6d5858] to-[#655050] text-white shadow-lg rounded-lg p-6 w-full max-w-3xl flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">{repoName}</h1>
          <span className="text-white">Total Contributors: {contributors.length}</span>
        </div>
      </div>

      <div className="bg-gradient-to-br from-[#6d5858] to-[#655050] text-white shadow-lg rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4">Contributors</h2>
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : contributors.length === 0 ? (
          <p className="text-center text-white">No contributors found.</p>
        ) : (
          <div className="flex flex-col space-y-4">
            {contributors.map((contributor, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between bg-neutral-700 text-white p-4 rounded-lg shadow-md transition-all duration-300 transform hover:shadow-lg hover:translate-y-[-2px]"
              >
                <div className="flex items-center">
                  <img 
                    src={contributor.avatarUrl} 
                    alt={`${contributor.name}'s profile`} 
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <span className="text-lg font-semibold">{contributor.name}</span>
                </div>
                <a 
                  href={contributor.profileUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 hover:text-blue-600 font-semibold transition duration-300"
                >
                  View Profile
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContributorsPage;
