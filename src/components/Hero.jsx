import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import lottie from '@/assets/lottie.json';

const Hero = () => {
    const headingVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
    };

    const buttonVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, scale: 1, transition: { delay: 0.3, duration: 0.5, ease: 'easeOut' } }
    };

    const lottieVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { delay: 0.1, duration: 0.5, ease: 'easeOut' } }
    };

    return (
        <div className='w-full'>
            <section className="w-full flex flex-col-reverse lg:flex-row min-h-screen items-center px-4 lg:px-10 py-8">
                <motion.div
                    className="w-full lg:w-[50%] z-10 p-6 text-center lg:text-left"
                    initial="hidden"
                    animate="visible"
                    variants={headingVariants}
                >
                    <h1 className="text-white text-4xl lg:text-[3rem] font-bold font-dm-sans mb-6 leading-tight">
                        Club Gamma Represents <br />
                        <span className="text-red-500 font-extrabold relative after:block after:bg-red-600 after:w-full after:h-1 after:absolute after:bottom-[-4px] after:left-0 after:transform scale-x-0 after:transition-transform hover:after:scale-x-100">
                            &lt; HackToberFest /&gt;
                        </span>
                        for students who are looking for Open source contribution
                    </h1>
                    <motion.button
                        className="relative font-poppins inline-block text-white py-3 px-8 border-2 border-red-500 rounded-xl font-bold hover:bg-red-500 hover:text-black transition-all duration-300 hover:scale-[0.97] shadow-lg hover:shadow-none"
                        onClick={() => window.open("https://hacktoberfest.com/auth", "_blank")}
                        variants={buttonVariants}
                    >
                        Register
                    </motion.button>
                </motion.div>
                <motion.div
                    className='w-full lg:w-[50%] flex justify-center'
                    initial="hidden"
                    animate="visible"
                    variants={lottieVariants}
                >
                    <div className='w-[80%] h-[80%] mx-auto'>
                        <Lottie animationData={lottie} loop={true} />
                    </div>
                </motion.div>
            </section>
        </div>
    );
}
export default Hero;