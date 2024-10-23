import Lottie from 'lottie-react';
import lottie from '@/assets/lottie.json';

const Hero = () => {
    return (
        <div className="relative w-full min-h-screen">
            <section className="w-full flex flex-col-reverse lg:flex-row min-h-screen items-center px-4 lg:px-10 py-8">
                <div className="w-full lg:w-[50%]  z-10 p-6 text-center lg:text-left">
                    <h1 className="text-white   text-4xl  lg:text-[3rem] font-bold font-dm-sans mb-6 leading-tight">
                        Club Gamma Represents <br />
                        <span className="text-red-500 font-extrabold relative after:block after:bg-red-600 after:w-full after:h-1 after:absolute after:bottom-[-4px] after:left-0 after:transform scale-x-0 after:transition-transform hover:after:scale-x-100">
                            &lt; HackToberFest /&gt;
                        </span>
                        for students who are looking for Open source contribution
                    </h1>
                    <button
                        className="relative font-poppins inline-block text-white py-3 px-8 border-2 border-red-500 rounded-xl font-bold hover:bg-red-500 hover:text-black transition-all duration-300 hover:scale-[0.97] shadow-lg hover:shadow-none"
                        onClick={() => window.open("https://hacktoberfest.com/auth", "_blank")}
                    >
                        Register
                    </button>
                </div>

                <div className='w-full lg:w-[50%] flex justify-center'>
                    <div className='w-[80%] h-[80%] mx-auto'>
                        <Lottie animationData={lottie} loop={true} />
                    </div>
                </div>
            </section>
        </div>
    );
}
export default Hero;