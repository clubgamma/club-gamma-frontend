import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import links from "@/links";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

const ContactUs = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <div className="flex flex-col items-center min-h-[40vh] p-4">
      <motion.div
        variants={statVariants}
        animate={inView ? "visible" : "hidden"}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-white font-dm-sans mb-8">
          Contact Us
        </h1>
      </motion.div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className="flex flex-wrap justify-center gap-4 md:gap-6"
      >
        <SocialIcon Icon={FaDiscord} color="#b7472a" name="discord" />
        <SocialIcon Icon={Twitter} color="#b7472a" name="twitter" />
        <SocialIcon Icon={Instagram} color="#b7472a" name="instagram" />
        <SocialIcon Icon={Github} color="#b7472a" name="github" />
        <SocialIcon Icon={Linkedin} color="#b7472a" name="linkedin" />
      </motion.div>
    </div>
  );
};

export default ContactUs;

function SocialIcon({ Icon, color, name }) {
  return (
    <motion.div
      className="rounded-full"
      whileHover={{ scale: 1.1 }} 
      whileTap={{ scale: 0.9 }} 
      style={{ backgroundColor: color }} 
      variants={statVariants}
    >
      <a
        href={links.socials[name]}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center p-2 md:p-3 transition-transform"
      >
        <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
      </a>
    </motion.div>
  );
}
