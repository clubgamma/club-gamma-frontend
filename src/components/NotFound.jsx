import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Lottie from 'lottie-react'
import notFoundAnimation from '@/assets/404-animation.json'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const navigate = useNavigate()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e1e] to-[#4e3535] flex items-center justify-center sm:p-4">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-center md:text-left -mt-5 sm:mt-0">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-2xl md:text-3xl text-gray-400 mb-8">
            Looks like you've ventured into uncharted territory. Even in Club Gamma, some pages remain undiscovered!
          </p>
          <p className="text-xl md:text-2xl text-gray-400 mb-8">
            Don't worry, our community of tech explorers is always here to guide you back.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-5">
            <Button
              onClick={() => navigate('/')}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-lg h-10"
            >
              <Home className="w-6 h-6" />
              <span>Back to Home</span>
            </Button>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-lg h-10"
            >
              <ArrowLeft className="w-6 h-6" />
              <span>Go Back</span>
            </Button>
          </div>
        </div>
        <div className="md:w-3/5 max-w-2xl h-full -mt-20">
          <Lottie animationData={notFoundAnimation} loop={true} />
        </div>
      </div>
    </div>
  )
}