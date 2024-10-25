import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { X } from 'lucide-react';
import axios from 'axios';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const EventModal = ({ event, onClose, open }) => {
    const [markdownContent, setMarkdownContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
        const fetchMarkdown = async () => {
            if (!event?.filename || !open) return;
            
            try {
                setLoading(true);
                const response = await axios.get(`https://raw.githubusercontent.com/clubgamma/club-gamma-frontend/refs/heads/main/JSON/markdowns/${event.filename}`);
                setMarkdownContent(response.data);
            } catch (error) {
                console.error('Error fetching markdown:', error);
                setMarkdownContent('Failed to load content. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMarkdown();
    }, [event, open]);

    // Calculate minimum height based on content
    const calculateMinHeight = () => {
        if (loading) return 'min-h-[200px]';
        if (contentHeight < 300) return 'min-h-fit';
        return 'h-[90vh]';
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent 
                className={`flex flex-col bg-[#2a2a2a] border-[#4e3535] max-w-4xl w-[95vw] ${calculateMinHeight()} max-h-[90vh] p-0`}
            >
                <DialogHeader className="flex-none bg-[#4e3535] p-4 flex flex-row justify-between items-center border-b border-[#4e3535]">
                    <DialogTitle className="text-xl font-bold text-white">
                        {event?.title}
                    </DialogTitle>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-[#5e4545] rounded-full transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-300" />
                    </button>
                </DialogHeader>

                <div 
                    className="flex-1 overflow-y-auto min-h-0"
                    ref={(el) => {
                        if (el && !loading) {
                            setContentHeight(el.scrollHeight);
                        }
                    }}
                >
                    <div className="p-6">
                        {loading ? (
                            <div className="flex justify-center items-center h-32">
                                <div className="animate-spin rounded-full h-8 w-8 border-2 border-red-500 border-t-transparent"></div>
                            </div>
                        ) : (
                            <div className="prose prose-invert max-w-none">
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
                                    {markdownContent}
                                </ReactMarkdown>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EventModal;