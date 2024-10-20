import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, X } from 'lucide-react';
import axios from 'axios';

// Backdrop Component
const Backdrop = ({ onClick }) => (
    <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]"
        onClick={onClick}
    />
);

// Modal Component
const Modal = ({ content, onClose }) => {
    useEffect(() => {
        const handleEscPress = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        // Add event listener for Esc key
        window.addEventListener('keydown', handleEscPress);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener('keydown', handleEscPress);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] p-4">
            <div className="bg-[#2a2a2a] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-[#4e3535]">
                <div className="sticky top-0 bg-[#4e3535] p-4 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-white">Event Details</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[#5e4545] rounded-full transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-300" />
                    </button>
                </div>
                <div className="p-6 prose prose-invert max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            h1: ({ node, ...props }) => (
                                <h1 className="text-3xl font-bold text-white mt-6 mb-4" {...props} />
                            ),
                            // Other markdown component customizations...
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
};

const EventCard = ({ event }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    useEffect(() => {
        const handlePopState = (e) => {
            if (isModalOpen) {
                e.preventDefault();  // Prevent the back navigation
                setIsModalOpen(false);  // Close the modal instead
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [isModalOpen]);

    const handleViewDetails = async () => {
        if (event.markdownUrl) {
            try {
                const response = await axios.get(event.markdownUrl);
                setModalContent(response.data);
                openModal();
            } catch (error) {
                console.error('Error fetching markdown content:', error);
            }
        } else {
            setModalContent(event.markdownContent);
            openModal();
        }
    };

    const openModal = () => {
        setIsModalOpen(true);

        window.history.pushState({ modalOpen: true }, '');
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);

        window.history.back();
    };

    return (
        <>
            <Card className="w-full mb-8 bg-[#2a2a2a] text-white overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#4e3535]">
                <CardHeader className="p-6 bg-[#4e3535]">
                    <CardTitle className="text-3xl font-bold text-white mb-2">{event.title}</CardTitle>
                    <div className="flex items-center text-gray-300 space-x-4">
                        <span className="flex items-center">
                            <Calendar className="h-5 w-5 mr-2" />
                            {new Date(event.start_date || event.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                            <Clock className="h-5 w-5 mr-2" />
                            {event.time || "TBA"}
                        </span>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold mb-4 text-[#ff6b6b]">Event Overview</h3>
                            <p className="text-gray-300 mb-6">{event.description}</p>
                            <Button
                                onClick={handleViewDetails}
                                className="bg-[#ff6b6b] hover:bg-[#ff9b9b] text-white"
                            >
                                View Details
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {isModalOpen && (
                <>
                    <Backdrop onClick={handleCloseModal} />
                    <Modal content={modalContent} onClose={handleCloseModal} />
                </>
            )}
        </>
    );
};

export default EventCard;
