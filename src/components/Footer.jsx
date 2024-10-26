import React from "react";
import { Link } from "react-router-dom";
import {
  FaDiscord,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import logo from "@/assets/logo.jpeg";
import { useState } from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    { icon: FaGithub, url: "https://github.com/clubgamma", label: "GitHub" },
    {
      icon: FaInstagram,
      url: "https://instagram.com/club_gamma",
      label: "Instagram",
    },
    {
      icon: FaLinkedin,
      url: "https://linkedin.com/company/clubgamma",
      label: "LinkedIn",
    },
    {
      icon: FaTwitter,
      url: "https://twitter.com/club_gamma",
      label: "Twitter",
    },
    { icon: FaDiscord, url: "https://discord.gg/CgMRHtXjrf", label: "Discord" },
  ];

  const [mail, setMail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation for security
    if (!mail || !subject || !message) {
      setError("All fields are required, including the rating.");
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
    // Write a Backend API Here...
    //   const response = await fetch(`${API_URL}/api/contact`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ mail, subject, message }),
    //   });

      console.log("mail : ", mail);
      console.log("subject : ", subject);
      console.log("message : ", message);

      setSubmitted(true);
      setTimeout(() => {
        setMail('');
        setSubject('');
        setMessage('');
        setSubmitted(false);
      }, 3000);
    } catch (error) {
      setError("An error occurred while sending Mail...");
      console.error("Mail sending failed : ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="relative py-8 md:py-12 text-white bg-gradient-to-br from-[#1e1e1e] to-[#2d2424]">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="flex flex-col items-center md:flex-row md:justify-evenly space-y-8 md:space-y-0 font-dm-sans">
          {/* Left Section - Logo & Description */}
          <div className="flex flex-col items-center md:items-start space-y-4 md:w-1/3 text-center md:text-left">
            <div className="flex items-center gap-2">
              <div className="overflow-hidden rounded-full">
                <img
                  className="w-12 h-12 transition-transform duration-500 transform hover:scale-110"
                  src={logo}
                  alt="Logo"
                />
              </div>
              <Link
                to="/"
                className="text-2xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-200"
              >
                Club Gamma
              </Link>
            </div>
            <p className="text-lg font-medium text-red-300 max-w-md">
              Empowering students through technology and innovation
            </p>
            <p className="text-gray-300 max-w-md">
              Join our community of passionate developers and creators
            </p>

            {/* Contact Info */}
            <div className="pt-4 flex flex-col gap-y-3">
              <div className="flex items-center space-x-3 text-gray-300 group mt-5">
                <FaMapMarkerAlt className="text-red-500 group-hover:scale-110 transition-transform duration-300" />
                <span>Charusat University, Gujarat</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 group">
                <FaEnvelope className="text-red-500 group-hover:scale-110 transition-transform duration-300" />
                <a
                  href="mailto:info.clubgamma@gmail.com"
                  className="hover:text-red-400 transition-colors duration-300"
                >
                  info.clubgamma@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 group">
                <FaPhone className="text-red-500 group-hover:scale-110 transition-transform duration-300" />
                <span>+91 1234567890</span>
              </div>
            </div>
          </div>

          {/* Mail us */}
          <div className="flex flex-col items-center md:items-start space-y-3 md:w-1/3 text-center md:text-left">
            <div className="w-11/12 bg-red-900/10 rounded-xl p-3 mt-5 h-fit">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="mail"
                    id="mail"
                    value={mail}
                    placeholder="Email ID"
                    onChange={(e) => setMail(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 text-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004D43] focus:border-[#004D43]"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 text-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004D43] focus:border-[#004D43]"
                  />
                </div>
                <div>
                  <textarea
                    id="message"
                    placeholder="Write your message..."
                    rows="6"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="mt-1 block w-full border border-gray-300 text-black rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[#004D43] focus:border-[#004D43] resize-none"
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-red-900/50 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004D43]"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Send Mail"}
                  </button>
                </div>
              </form>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10, display: "none", height: 0 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    display: "block",
                    height: "auto",
                  }}
                  className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded"
                >
                  Thank you, We will reply you soon...
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded"
                >
                  {error}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center pt-9 justify-center">
          <div className="grid grid-cols-5 md:grid-cols-5 gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 transition-all duration-300 rounded-lg bg-red-900/50 hover:bg-red-800 group"
                aria-label={social.label}
              >
                <social.icon
                  size={24}
                  className="transition-transform duration-300 text-white/90 group-hover:text-white group-hover:scale-110"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col font-dm-sans mb-16 md:mb-0 md:flex-row items-center justify-between pt-8 mt-8 space-y-4 md:space-y-0 border-t border-red-900/30">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} Club Gamma. All rights reserved.
          </p>
          <Link
            to="/code-of-conduct"
            className="text-sm transition-all duration-300 text-red-400 hover:text-red-300"
          >
            Code of Conduct
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
