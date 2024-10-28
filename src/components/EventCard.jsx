import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { X, Calendar, Clock, AlertCircle, PlayCircle, CheckCircle } from 'lucide-react'
import axios from 'axios'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const EventModal = ({ event, onClose, open }) => {
    const [markdownContent, setMarkdownContent] = useState('')
    const [loading, setLoading] = useState(true)
    const [contentHeight, setContentHeight] = useState(0)

    useEffect(() => {
        const fetchMarkdown = async () => {
            if (!event?.filename || !open) return
            
            try {
                setLoading(true)
                const response = await axios.get(`https://raw.githubusercontent.com/clubgamma/club-gamma-frontend/refs/heads/main/JSON/markdowns/${event.filename}`)
                setMarkdownContent(response.data)
            } catch (error) {
                console.error('Error fetching markdown:', error)
                setMarkdownContent('Failed to load content. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        fetchMarkdown()
    }, [event, open])

    const calculateMinHeight = () => {
        if (loading) return 'min-h-[200px]'
        if (contentHeight < 300) return 'min-h-fit'
        return 'h-[90vh]'
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        })
    }

    const getEventStatus = () => {
        const now = new Date()
        
        // For single-day events
        if (event?.date) {
            const eventDate = new Date(event.date)
            const endOfDay = new Date(event.date)
            endOfDay.setHours(23, 59, 59, 999)
            
            if (now < eventDate) return 'Upcoming'
            if (now > endOfDay) return 'Completed'
            return 'Ongoing'
        }
        
        // For multi-day events
        const start = new Date(event?.start_date)
        const end = new Date(event?.end_date)
        
        if (now < start) return 'Upcoming'
        if (now > end) return 'Completed'
        return 'Ongoing'
    }

     const statusConfig = {
        Upcoming: {
            color: 'bg-[#3e2723] text-red-300',
            icon: AlertCircle,
        },
        Ongoing: {
            color: 'bg-[#6d4c41] text-orange-300',
            icon: PlayCircle,
        },
        Completed: {
            color: 'bg-[#795548] text-yellow-200',
            icon: CheckCircle,
        },
    }

    const status = getEventStatus()
    const { color, icon: StatusIcon } = statusConfig[status]

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent 
                className={`flex flex-col bg-[#2a2a2a] border-red-500/30 max-w-4xl w-[95vw] ${calculateMinHeight()} max-h-[90vh] p-0 overflow-hidden`}
            >
                <DialogHeader className="flex-none rounded-t-lg bg-[#4e3535] p-6 flex flex-col gap-4 border-b border-red-500/30">
                    <div className="flex justify-between items-start">
                        <DialogTitle className="text-3xl font-bold text-white text-left">
                            {event?.title}
                        </DialogTitle>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-red-500/10 rounded-full transition-colors"
                            aria-label="Close dialog"
                        >
                            <X className="h-6 w-6 text-red-400" />
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-red-400 bg-red-400/10 px-3 py-1.5 rounded-full">
                            <Calendar size={16} className="flex-shrink-0" />
                            <span className="font-medium">
                                {event?.start_date && event?.end_date
                                    ? `${formatDate(event.start_date)} - ${formatDate(event.end_date)}`
                                    : formatDate(event?.date)}
                            </span>
                        </div>
                        <div className="items-center gap-2 text-gray-400 bg-gray-400/10 px-3 py-1.5 rounded-full hidden sm:flex">
                            <Clock size={16} className="flex-shrink-0" />
                            <span className="font-medium">{event?.year}</span>
                        </div>
                         <div 
                            className={`flex items-center gap-2 ${color} px-3 py-1.5 rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-opacity-90`}
                        >
                            <StatusIcon size={16} className="flex-shrink-0" />
                            <span className="font-medium">{status}</span>
                        </div>
                    </div>
                </DialogHeader>

                <div 
                    className="flex-1 overflow-y-auto min-h-0"
                    ref={(el) => {
                        if (el && !loading) {
                            setContentHeight(el.scrollHeight)
                        }
                    }}
                >
                    <div className="px-6 pb-8 -mt-4">
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
                                            <h1 className="text-4xl font-bold text-red-400 mt-8 mb-6" {...props} />
                                        ),
                                        h2: ({ node, ...props }) => (
                                            <h2 className="text-2xl font-semibold text-white mt-6 mb-4" {...props} />
                                        ),
                                        h3: ({ node, ...props }) => (
                                            <h3 className="text-xl font-medium text-white mt-5 mb-3" {...props} />
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
                                                className="text-red-400 hover:text-red-300 underline transition-colors duration-200"
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
                                                className="border-l-4 border-red-500 pl-4 my-4 italic text-gray-400"
                                                {...props}
                                            />
                                        ),
                                        code: ({ node, inline, ...props }) => (
                                            inline ?
                                                <code className="bg-[#1e1e1e] px-1 py-0.5 rounded text-sm text-red-400" {...props} /> :
                                                <code className="block bg-[#1e1e1e] p-4 rounded-lg text-sm text-red-400 overflow-x-auto" {...props} />
                                        ),
                                        pre: ({ node, ...props }) => (
                                            <pre className="bg-[#1e1e1e] p-4 rounded-lg overflow-x-auto mb-4" {...props} />
                                        ),
                                        img: ({ node, ...props }) => (
                                            <img className="max-w-full h-auto rounded-lg my-4" {...props} alt={props.alt || 'Event image'} />
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
    )
}

export default EventModal