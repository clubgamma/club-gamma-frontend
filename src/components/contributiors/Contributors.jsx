import { useEffect, useState } from 'react'
import axios from 'axios'
import Cards from './cards';

const Contributors = () => {
  const [ contributors, setContributors ] = useState([]);
  useEffect(() => {
    try{
        axios.get('https://api.github.com/repos/clubgamma/club-gamma-frontend/contributors')
        .then((response) => {
            console.log(response.data);
            setContributors(response.data);
        })
        .catch((error) => {
            console.error(error)
        })
    }
    catch (error) {
        console.error(error);
    }
  }, [])

  return (
    <div className="min-h-[70vh] py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
    <div className="max-w-7xl mx-auto text-center">
      <h1 className="text-4xl font-extrabold font-poppins text-white mb-12">Major Contributors 🧑‍💻</h1>
      <div className="w-full">
          <Cards data={contributors.slice(0, 3)} />
      </div>
    </div>
  </div>
  )
}

export default Contributors