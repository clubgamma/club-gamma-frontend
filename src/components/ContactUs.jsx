import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import links from "@/links";

const ContactUs = () => {
  return (
    <div className="">
      <div className="flex flex-col items-center min-h-[25vh]">
        <div className="relative space-y-4 mb-8 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white">
            Contact{" "}
            <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent hover:from-red-400 hover:to-red-500 transition-colors duration-300">
              Us
            </span>
          </h1>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <SocialIcon Icon={FaDiscord} name="discord" />
          <SocialIcon Icon={Twitter} name="twitter" />
          <SocialIcon Icon={Instagram} name="instagram" />
          <SocialIcon Icon={Github} name="github" />
          <SocialIcon Icon={Linkedin} name="linkedin" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;

function SocialIcon({ Icon, name }) {
  return (
    <a
      href={links.socials[name]}
      target="_blank"
      className="bg-[#1e1e1e]/50 backdrop-blur-sm rounded-full p-2 md:p-3 transition-all duration-300 hover:scale-110 hover:bg-[#4e3535]/50"
    >
      <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
    </a>
  );
}