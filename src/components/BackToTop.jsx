import { useEffect, useState } from 'react'
import { TbArrowUp } from "react-icons/tb";

export const BackToTop = ({ id }) => {
    const [back2Top, setBack2Top] = useState()


    // Get the unique ID by appending the current path

    // back to top functions
    function scrollHandler() {
        if (window.scrollY >= 250) {
            setBack2Top(true);
        } else {
            setBack2Top(false);
        }
    }
    useEffect(() => {
        // Add scroll event listener
        window.addEventListener("scroll", scrollHandler);
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, []);

    return (
        <div>
            <div className="z-50 relative lg:m-16 mx-6 md:mx-8 bg-red-500/50 rounded-lg p-3">
                <a href={`#${id}`} className={!back2Top ? "hidden" :
                    " hover:text-3xl hover:scale-90 active:scale-90 fixed text-2xl animate-bounce rounded-full bottom-5 right-5 text-red-400 hover:text-white border p-2 border-red-500/50"} id={id}><TbArrowUp /></a>

            </div>
        </div>
    )
}


BackToTop.propTypes = {
    id: String
}



export default BackToTop