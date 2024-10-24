// EventToggle.js
import React from 'react';

const EventToggle = ({ onToggle, activeTab }) => {
  return (
    <div className="flex justify-center mb-8">
      <button
        className={`px-4 py-2 rounded-l-lg ${activeTab === 'upcoming' ? 'bg-[#ff6b6b] text-white' : 'bg-gray-700 text-gray-300'}`}
        onClick={() => onToggle('upcoming')}
      >
        Upcoming Events
      </button>
      <button
        className={`px-4 py-2 rounded-r-lg ${activeTab === 'past' ? 'bg-[#ff6b6b] text-white' : 'bg-gray-700 text-gray-300'}`}
        onClick={() => onToggle('past')}
      >
        Past Events
      </button>
    </div>
  );
};

export default EventToggle;