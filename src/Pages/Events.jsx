import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EventCard from '@/components/EventCard';
import { infinity } from 'ldrs'
infinity.register()

const Events = () => {
  const { year } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/clubgamma/club-gamma-frontend/refs/heads/main/JSON/events.json");
        const data = await response.json();
        const filteredEvents = data[year] || [];

        const eventsWithMarkdown = await Promise.all(filteredEvents.map(async (event) => {
          const filename = event.filename || `${event.title.replace(/\s+/g, '_').toLowerCase()}.md`;
          const markdownResponse = await fetch(`https://raw.githubusercontent.com/clubgamma/club-gamma-frontend/refs/heads/main/JSON/markdowns/${filename}`);
          const markdownContent = await markdownResponse.text();

          return {
            ...event,
            markdownContent,
          };
        }));

        setEvents(eventsWithMarkdown);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [year]);



  return (
    <div className="min-h-screen font-dm-sans bg-[#1e1e1e] text-white p-8 pt-28">
      <h1 className="text-4xl md:text-5xl font-bold mb-8 md:mb-12 text-center">
        <span className="text-[#ff6b6b]">
          Club gamma
        </span>
        <span className="text-white"> Events {year && `${year}`}</span>
      </h1>
      {loading ? (
        <p className="text-center text-gray-300">
          <l-infinity
            size="55"
            stroke="4"
            stroke-length="0.15"
            bg-opacity="0.1"
            speed="1.3"
            color="white"
          ></l-infinity></p>
      ) : events.length > 0 ? (
        <div className="max-w-7xl mx-auto">
          {events.map((event) => (
            <EventCard key={event.title} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-300">No events found for the year {year}.</p>
      )}
    </div>
  );
};

export default Events;