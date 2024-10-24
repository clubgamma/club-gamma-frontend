import React from 'react'
import { AlertTriangle, Home, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Lottie from 'lottie-react'
import errorAnimation from '@/assets/error.json'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e1e] to-[#4e3535] flex items-center justify-center sm:p-4 ">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-center md:text-left -mt-5 sm:mt-0">
          <div className="flex items-center gap-3 justify-center md:justify-start mb-4">
            <AlertTriangle className="w-16 h-16 text-red-500 mt-3" />
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              Error
            </h1>
          </div>
          
          <p className="text-2xl md:text-3xl text-gray-400 mb-8">
            We apologize, but it seems like Club Gamma's system encountered an unexpected error.
          </p>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-8">
            <p className="text-red-400 font-mono text-lg">
              {error.message || 'An unexpected error occurred while processing your request.'}
            </p>
          </div>

          <p className="text-xl md:text-2xl text-gray-400 mb-8">
            Please try again and if the problem persists, please send a screenshot of the error to {" "}
            <a 
              href="mailto:info.clubgamma@gmail.com" 
              className="text-red-400 hover:text-red-300 underline decoration-dotted"
            >
              info.clubgamma@gmail.com
            </a>
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-5">
            <Button
              onClick={resetErrorBoundary}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-lg h-12"
            >
              <RotateCcw className="w-6 h-6" />
              <span>Try Again</span>
            </Button>
            <Button
              onClick={() => window.location.href = '/'}
              variant="outline"
              className="bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-lg h-12"
            >
              <Home className="w-6 h-6" />
              <span>Home Page</span>
            </Button>
          </div>
        </div>

        <div className="md:w-3/5 max-w-2xl h-full md:-mt-20 md:pl-36 -mt-9">
            <div className="w-full mt-10">
              <Lottie animationData={errorAnimation} loop={true} />
            </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorFallback