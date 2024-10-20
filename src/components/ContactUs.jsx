import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import links from "@/links";

const ContactUs = () => {
  return (
    <div className="flex flex-col items-center min-h-[40vh] p-4">
      <h1 className="text-4xl md:text-5xl font-bold text-white font-dm-sans mb-8">
        Contact Us
      </h1>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        <SocialIcon Icon={FaDiscord} color="#b7472a" name="discord" />
        <SocialIcon Icon={Twitter} color="#b7472a" name="twitter" />
        <SocialIcon Icon={Instagram} color="#b7472a" name="instagram" />
        <SocialIcon Icon={Github} color="#b7472a" name="github" />
        <SocialIcon Icon={Linkedin} color="#b7472a" name="linkedin" />
      </div>
    </div>
  );
};

export default ContactUs;

function SocialIcon({ Icon, color, name }) {
  return (
    <a
      href={links.socials[name]}
      target="_blank"
      className="rounded-full p-2 md:p-3 transition-transform hover:scale-110"
      style={{ backgroundColor: color }}
    >
      <Icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
    </a>
  );
}
