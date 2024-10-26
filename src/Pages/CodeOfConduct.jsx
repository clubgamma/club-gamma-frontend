import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const CodeOfConduct = () => {
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('./CODE_OF_CONDUCT.md')
      .then((response) => response.text())
      .then((text) => {
        setMarkdownContent(text);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error loading markdown:', error);
        setIsLoading(false);
      });
  }, []);

  const components = {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold mb-8 text-white bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-200 tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mb-6 mt-8 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-200">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mb-4 mt-6 text-gray-100 border-l-4 border-red-500 pl-3">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mb-6 text-gray-300 leading-relaxed hover:text-gray-200 transition-colors duration-200">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="list-none pl-6 mb-6 text-gray-300 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-6 text-gray-300 space-y-2">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="flex items-start space-x-2">
        <span className="text-red-400 mt-1">•</span>
        <span>{children}</span>
      </li>
    ),
    a: ({ href, children }) => (
      <a 
        href={href} 
        className="text-red-400 hover:text-red-300 relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-red-400 after:transition-transform after:duration-300 hover:after:scale-x-100" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-red-500/50 pl-4 my-6 text-gray-300 italic bg-white/5 py-3 pr-4 rounded-r backdrop-blur-sm">
        {children}
      </blockquote>
    ),
  };

  return (
    <div className="min-h-screen font-dm-sans  bg-gradient-to-br from-[#1e1e1e] to-[#4e3535] py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 relative">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-200 mb-4">
            Club Gamma Code of Conduct
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-red-500 to-red-200 mx-auto rounded-full" />
        </div>
        <div className="backdrop-blur-sm bg-black/20 p-8 rounded-2xl shadow-xl border border-white/10">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-t-2 border-b-2 border-red-500 animate-spin"></div>
                <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-2 border-b-2 border-pink-500 animate-spin delay-150"></div>
              </div>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]} 
                components={components}
              >
                {markdownContent}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeOfConduct;