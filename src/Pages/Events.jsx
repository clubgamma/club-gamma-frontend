import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import EventModal from '@/components/EventCard';

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [visibleEvents, setVisibleEvents] = useState(new Set());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/clubgamma/club-gamma-frontend/refs/heads/main/JSON/events.json");
        const data = await response.json();
        const allEvents = Object.entries(data)
          .flatMap(([year, yearEvents]) =>
            yearEvents.map(event => ({ ...event, year }))
          )
          .sort((a, b) => new Date(b.start_date || b.date) - new Date(a.start_date || a.date));
        setEvents(allEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVisibleEvents(prev => new Set([...prev, entry.target.dataset.eventIndex]));
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '50px'
      }
    );

    const cards = document.querySelectorAll('.event-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, [events]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-500"></div>
      </div>
    );
  }

  return (
    <div className="py-24 font-dm-sans relative overflow-hidden bg-gradient-to-br from-[#1e1e1e] to-[#4e3535]">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNGgLTJWMzJoMnYyem0wLTh2MmgtMnYtMmgyem0tOCA4aDJ2LTJoLTJ2MnptMC04aDJ2MmgtMnYtMnoiIGZpbGw9IiNmZmYiIG9wYWNpdHk9Ii4yIi8+PC9nPjwvc3ZnPg==')]"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white relative inline-block">
            Our <span className="text-red-500">Events</span>
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-red-500/0 via-red-500/50 to-red-500/0"></div>
          </h2>
          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our past and upcoming events designed to enhance your technical skills and connect with the community.
          </p>
        </div>

        <div className="grid gap-8 max-w-4xl mx-auto">
          {events.map((event, index) => (
            <div
              key={`${event.title}-${index}`}
              data-event-index={index}
              className={`event-card transform transition-all duration-700 ${visibleEvents.has(index.toString())
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
                }`}
            >
              <Card className="group relative bg-[#2a2a2a]/40 border border-red-200/10 hover:border-red-500/30 hover:bg-[#2a2a2a]/60 transition-all duration-300 overflow-hidden">
                {/* Animated gradient overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/5 to-red-500/0 animate-gradient"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,0,0,0.1)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                <div className="p-6 md:p-8 relative">
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 px-3 py-1.5 rounded-full">
                          <Calendar size={16} className="flex-shrink-0" />
                          <span className="font-medium">
                            {event.start_date && event.end_date
                              ? `${formatDate(event.start_date)} - ${formatDate(event.end_date)}`
                              : formatDate(event.date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 bg-gray-400/10 px-3 py-1.5 rounded-full">
                          <Clock size={16} className="flex-shrink-0" />
                          <span className="font-medium">{event.year}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-400 text-lg leading-relaxed">
                      {event.description}
                    </p>

                    <Button
                      variant="ghost"
                      className="self-start text-red-400 hover:text-red-300 hover:bg-red-400/10 p-0 h-auto group/btn"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <span className="mr-2 relative">
                        Learn more
                        <span className="absolute -bottom-px left-0 w-0 group-hover/btn:w-full h-px bg-red-400 transition-all duration-300"></span>
                      </span>
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
      {
        selectedEvent && (
          <EventModal
            event={selectedEvent}
            open={selectedEvent}
            onClose={() => setSelectedEvent(null)}
          />
        )
      }
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
    </div>
  );
};

export default EventsSection;