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
 
        // Add event listener
        window.addEventListener('keydown', handleEscPress);
 
        // Cleanup
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
                            h2: ({ node, ...props }) => (
                                <h2 className="text-2xl font-semibold text-white mt-5 mb-3" {...props} />
                            ),
                            h3: ({ node, ...props }) => (
                                <h3 className="text-xl font-medium text-white mt-4 mb-2" {...props} />
                            ),
                            p: ({ node, children, ...props }) => (
                                <p className="text-gray-300 mb-4 leading-relaxed" {...props}>
                                    {children}
                                </p>
                            ),
                            em: ({ node, ...props }) => (
                                <em className="italic text-gray-300" {...props} />
                            ),
                            a: ({ node, href, children, ...props }) => (
                                <a
                                    href={href}
                                    className="text-[#ff6b6b] hover:text-[#ff9b9b] underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    {...props}
                                >
                                    {children}
                                </a>
                            ),
                            ul: ({ node, ...props }) => (
                                <ul className="list-disc ml-6 mb-4 space-y-2 text-gray-300" {...props} />
                            ),
                            ol: ({ node, ...props }) => (
                                <ol className="list-decimal ml-6 mb-4 space-y-2 text-gray-300" {...props} />
                            ),
                            li: ({ node, ...props }) => (
                                <li className="text-gray-300" {...props} />
                            ),
                            blockquote: ({ node, ...props }) => (
                                <blockquote
                                    className="border-l-4 border-[#ff6b6b] pl-4 my-4 italic text-gray-400"
                                    {...props}
                                />
                            ),
                            code: ({ node, inline, ...props }) => (
                                inline ?
                                    <code className="bg-[#222] px-1 py-0.5 rounded text-sm text-[#ff6b6b]" {...props} /> :
                                    <code className="block bg-[#222] p-4 rounded-lg text-sm text-[#ff6b6b] overflow-x-auto" {...props} />
                            ),
                            pre: ({ node, ...props }) => (
                                <pre className="bg-[#222] p-4 rounded-lg overflow-x-auto mb-4" {...props} />
                            ),
                            img: ({ node, ...props }) => (
                                <img className="max-w-full h-auto rounded-lg my-4" {...props} />
                            ),
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
 
    const handleViewDetails = async () => {
        if (event.markdownUrl) {
            try {
                const response = await axios.get(event.markdownUrl);
                setModalContent(response.data);
                setIsModalOpen(true);
                document.body.style.overflow = 'hidden';
                // Apply blur to navbar
                const navbar = document.querySelector('nav');
                if (navbar) {
                    navbar.style.filter = 'blur(5px)';
                }
            } catch (error) {
                console.error('Error fetching markdown content:', error);
            }
        } else {
            setModalContent(event.markdownContent);
            setIsModalOpen(true);
            document.body.style.overflow = 'hidden';
            // Apply blur to navbar
            const navbar = document.querySelector('nav');
            if (navbar) {
                navbar.style.filter = 'blur(5px)';
            }
        }
    };
 
    const handleCloseModal = () => {
        setIsModalOpen(false);
        document.body.style.overflow = '';
        // Remove blur from navbar
        const navbar = document.querySelector('nav');
        if (navbar) {
            navbar.style.filter = '';
        }
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