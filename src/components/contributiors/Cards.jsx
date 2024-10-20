// /* eslint-disable react/prop-types */
import { motion } from 'framer-motion'
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { FaGithub } from "react-icons/fa";


function ContributorCard  ({contributor}) {
  const [isHovered, setIsHovered] = useState(false)
  const isMobile = window.innerWidth <= 768;

  const { ref, inView } = useInView({
    triggerOnce: true, // animation triggers only once
    threshold: 0.2,    // starts animating when 20% of the card is in view
  });

  console.log("contributor")
  console.log(contributor)

  return (
    <motion.div
      ref={ref}
      key={contributor.id}
      className=" flex flex-col justify-center items-center p-5 max-w-sm rounded-lg overflow-hidden font-dm-sans shadow-lg bg-gradient-to-br from-[#644f4f] to-[#5e4545] transition-all duration-150 ease-in-out transform"
      initial={{ scale: 0 }}
      animate={inView ? { scale: 1 } : { scale: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className='w-full'>
        <img
          src={contributor.avatar_url || '#' }
          alt={contributor.login || ' ' }
          className="w-24 h-24 rounded-full mx-auto"
        />
      </div>
      <div className="p-6">
        <motion.h2
          className="text-2xl font-bold mb-2 text-white"
          initial={{ y: 0 }}
          animate={{ y: isHovered ? -5 : 0 }}
          transition={{ duration: 0.3 }}
        >
          Username: {contributor.login  || ' '}
        </motion.h2>
        <motion.p
          className="text-gray-300 mb-4"
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovered ? 0.7 : 1 }}
          transition={{ duration: 0.3 }}
        >
          {contributor.contributions || ' ' } contributions
        </motion.p>
        <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className='w-full flex justify-center items-center'
          >
            <a
              href={contributor.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold py-2 px-4 rounded-md transition-colors duration-300"
            >
              <FaGithub size={24} color='white' />
            </a>
          </motion.div>
      </div>
    </motion.div>
  )
}

const Cards = ({data}) => {

  console.log("###############################################");
  console.log(data);
  
  return (
    <div  className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-3 gap-8">
        {
            data.map((contributor, index) => (<ContributorCard key={index} contributor={contributor} />))
        }
    </div>
  )
}

export default Cards