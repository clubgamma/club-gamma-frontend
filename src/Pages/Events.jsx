import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventCard from '@/components/EventCard';
import Loader from '@/components/Loader';
import SEO from '@/components/SEO';
import EventToggle from '../components/EventToggle';
import RegistrationForm from '../components/RegistrationForm';

const Events = () => {
  const { year } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isRegistering, setIsRegistering] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleToggle = (tab) => {
    setActiveTab(tab);
  };

  const handleRegisterClick = (event) => {
    setSelectedEvent(event);
    setIsRegistering(true);
  };

  const closeRegistration = () => {
    setIsRegistering(false);
    setSelectedEvent(null);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/clubgamma/club-gamma-frontend/refs/heads/main/JSON/events.json");
        const data = await response.json();
        
        // Filter events based on the selected year
        const filteredEvents = data[year] ? data[year].map(event => ({
          ...event,
          date: event.start_date || event.date, // Ensure we have a date field
        })) : [];
  
        console.log("Fetched Events for year " + year + ":", JSON.stringify(filteredEvents, null, 2));
        setEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, [year]);

  // Separate upcoming and past events based on current date
  const currentDate = new Date();
console.log("Current Date:", currentDate.toISOString());

const upcomingEvents = events.filter(event => {
  const startDate = new Date(event.start_date || event.date);
  console.log(`Checking Event: ${event.title}, Start Date: ${startDate.toISOString()}`);
  return startDate >= currentDate;
});

const pastEvents = events.filter(event => {
  const endDate = new Date(event.end_date || event.date);
  return endDate < currentDate;
});

console.log("Upcoming Events:", upcomingEvents);
console.log("Past Events:", pastEvents);
return (
  <>
    <SEO
      title={`Events ${year && `${year}`}`}
      pathname={`/events/${year}`}
      description="Explore Club Gamma's tech events, workshops, and community initiatives for hands-on learning and networking in the tech world."
      keywords="Club Gamma events, tech workshops, developer networking, tech community, coding, programming, technology, learning, developer community, tech events, skill development"
    />
    <div className="min-h-screen font-dm-sans bg-[#1e1e1e] text-white p-8 pt-28">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-center">
        <span className="text-[#ff6b6b]">Club Gamma</span>
        <span className="text-white"> Events {year}</span>
      </h1>
      
      {year === '2024' && <EventToggle onToggle={setActiveTab} activeTab={activeTab} />}

      {loading ? (
        <div className="flex flex-col items-center justify-center">
          <Loader size='80' />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          {(year === '2024' ? (activeTab === 'upcoming' ? upcomingEvents : pastEvents) : events).map((event, index) => (
            <div key={index} className="mb-8">
              <EventCard event={event} />
              {year === '2024' && activeTab === 'upcoming' && (
                <button
                  onClick={() => handleRegisterClick(event)}
                  className="mt-4 bg-[#ff6b6b] hover:bg-[#ff9b9b] text-white py-2 px-4 rounded transition-colors duration-300"
                >
                  Register
                </button>
              )}
            </div>
          ))}
          {year === '2024' && activeTab === 'upcoming' && upcomingEvents.length === 0 && (
            <p className="text-center text-lg">No upcoming events found.</p>
          )}
          {year === '2024' && activeTab === 'past' && pastEvents.length === 0 && (
            <p className="text-center text-lg">No past events found.</p>
          )}
        </div>
      )}
      
      {isRegistering && (
        <RegistrationForm
          event={selectedEvent}
          onClose={() => setIsRegistering(false)}
        />
      )}
    </div>
    </>
  );
};

export default Events;
