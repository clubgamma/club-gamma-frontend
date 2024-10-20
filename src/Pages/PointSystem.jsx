import { ArrowLeft, ChevronRight, Github, Info } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useLocation, useNavigate } from "react-router-dom"



const pointSystem = [
  { type: "Documentation ", points: 1 },
  { type: "Bug fix ", points: 2 },
  { type: "Level 1 contribution ", points: 3 },
  { type: "Level 2 contribution ", points: 5 },
  { type: "Level 3 contribution ", points: 8 },
]

export default function PointSystem({onProjectClick}) { 

  const navigate = useNavigate();
  const location = useLocation();

  const handleProjectNavigation = () => {
    // If not on home page, navigate to home
    if (location.pathname !== '/') {
      // Using timeout to ensure navigation completes before scrolling
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('project');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    // If already on home page, just scroll
    const element = document.getElementById('project');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e1e] to-[#4e3535] text-white font-sans">

      <main className="container px-4 py-12 pt-20 mx-15 auto">

      <Button
        variant="ghost"
        onClick={() => navigate(-1)}  // '-1' simulates history.goBack()
        className="mt-5 mb-4 text-white hover:text-[#ff3e3e]  items-center"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Leaderboard
      </Button>


        <h1 className="mb-12 text-4xl font-bold text-center text-white md:text-5xl drop-shadow-lg">
          Hacktoberfest Point System
        </h1>


        <div className="grid gap-8 md:grid-cols-2">
          <Card className="bg-[#2a2a2a] border-[#444] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-[#ff3e3e] flex items-center justify-between">
                Contribution Points
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="h-5 w-5 text-[#ff3e3e]" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Points are awarded based on contribution complexity</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-[#444]">
                    <TableHead className="text-left text-white">Contribution Type</TableHead>
                    <TableHead className="text-right text-white">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pointSystem.map((item, index) => (
                    <TableRow key={index} className="border-b border-[#444] last:border-b-0 hover:bg-[#3a3a3a] transition-colors duration-200">
                      <TableCell className="py-3 text-white">{item.type}</TableCell>
                      <TableCell className="text-right text-[#ff3e3e] font-bold py-3">{item.points}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="bg-[#2a2a2a] border-[#444] shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-[#ff3e3e]">About the Point System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg leading-relaxed text-gray-300">
                The Hacktoberfest point system is designed to <span className="text-[#ff3e3e] font-semibold">encourage </span> and <span className="text-[#ff3e3e] font-semibold">reward </span> different types of contributions. Points are allocated based on the <span className="text-[#ff3e3e] font-semibold">complexity </span> and <span className="text-[#ff3e3e] font-semibold">impact </span> of the contribution. This system helps in <span className="text-[#ff3e3e] font-semibold">recognizing </span> and <span className="text-[#ff3e3e] font-semibold">appreciating </span> the efforts of all participants, from those making their first documentation update to experienced developers tackling complex issues.
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 transition-shadow duration-300 bg-[#2a2a2a] border-gray-700 shadow-lg hover:shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-[#ff3e3e]">Did you know? 🤔</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg italic leading-relaxed text-gray-300">
              Hacktoberfest is a <span className="text-[#ff3e3e] font-semibold">month-long celebration</span> of open source software. It's a great opportunity to <span className="text-[#ff3e3e] font-semibold">contribute</span> to projects you use and love, or to <span className="text-[#ff3e3e] font-semibold">get started </span> with open source development!
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-col items-center justify-center mt-12 space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
          
          <Button
            className="w-full sm:w-auto px-6 py-3 bg-[#ff3e3e] text-white font-bold rounded-full hover:bg-[#e63636] transition-colors duration-300 shadow-md hover:shadow-lg"
            onClick={handleProjectNavigation}
          >
            Start Contributing
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
          
          <Button
            variant="outline"
            className="w-full sm:w-auto px-6 py-3 border-[#ff3e3e] text-[#ff3e3e] font-bold rounded-full hover:bg-[#ff3e3e] hover:text-white transition-colors duration-300 shadow-md hover:shadow-lg"
            onClick={() => window.open('https://github.com/clubgamma', '_blank')}
          >
            <Github className="w-4 h-4 mr-2" />
            Explore GitHub Projects
          </Button>
        </div>
      </main>
    </div>
  )
}