import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const QandA = () => {
  const [activeStep, setActiveStep] = useState(0);

  const qaData = [
    {
      title: "How Club Gamma is going to celebrate Hacktoberfest?",
      content: (
        <div className="space-y-4">
          <p>
            Club Gamma is the community which aims to work together and grow
            together. We are going to celebrate the Hacktoberfest this year with
            great enthusiasm.
          </p>
          <p>
            We will put <span className="text-red-500 font-semibold">projects</span> on
            different fields like{" "}
            <span className="text-red-500 font-semibold">
              MERN Stack Development, AI/ML, Core C++ Project
            </span>
            , etc. We will initialize some{" "}
            <span className="text-red-500 font-semibold">GitHub Repo</span> and make them
            open-source. Anyone can contribute to any of those projects during
            Hacktoberfest and avail the{" "}
            <span className="text-red-500 font-semibold">cool prizes</span> by DigitalOcean
            and GitHub.
          </p>
        </div>
      )
    },
    {
      title: "How can I participate?",
      content: (
        <ol className="list-decimal list-inside space-y-3 ml-4">
          <li className="pl-2">
            Go to{" "}
            <a href="https://hacktoberfest.com/"
              className="text-red-500 underline hover:text-red-400 transition-colors">
              Hacktoberfest
            </a>{" "}
            to learn about the event and its mission.
          </li>
          <li className="pl-2">
            <span className="text-red-500 font-semibold">Register</span> there using your{" "}
            <span className="text-red-500 font-semibold">GitHub account</span> to
            officially participate.
          </li>
          <li className="pl-2">
            Go to the{" "}
            <span className="text-red-500 font-semibold">Club Gamma website</span> to find
            projects that need contributors.
          </li>
          <li className="pl-2">
            <span className="text-red-500 font-semibold">Continue with GitHub</span> by
            logging in to access repositories.
          </li>
          <li className="pl-2">
            Start <span className="text-red-500 font-semibold">contributing</span> by choosing
            an issue and submitting your pull request!
          </li>
        </ol>
      )
    },
    {
      title: "What are the rules?",
      content: (
        <ol className="list-decimal list-inside space-y-3 ml-4">
          <li className="pl-2">
            <span className="text-red-500 font-semibold">Register on the official website</span> during the event period.
          </li>
          <li className="pl-2">
            Make <span className="text-red-500 font-semibold">four valid pull requests</span> between{" "}
            <span className="text-red-500 font-semibold">October 1–31</span>.
          </li>
          <li className="pl-2">
            Pull requests must contain <span className="font-semibold">your own</span> meaningful contributions.
          </li>
          <li className="pl-2">
            <span className="text-red-500 font-semibold">Spam or invalid</span> pull requests will{" "}
            <span className="text-red-500 font-semibold">not count</span>.
          </li>
          <li className="pl-2">
            Follow the project's <span className="text-red-500 font-semibold">code of conduct</span>.
          </li>
        </ol>
      )
    },
    {
      title: "What are the standards for a pull request?",
      content: (
        <ol className="list-decimal list-inside space-y-3 ml-4">
          <li className="pl-2">
            PRs must be <span className="text-red-500 font-semibold">manually created</span>, not automated.
          </li>
          <li className="pl-2">
            Contributions should be <span className="text-red-500 font-semibold">constructive</span>, not disruptive.
          </li>
          <li className="pl-2">
            PRs marked as a <span className="text-red-500 font-semibold">hindrance</span> won't count.
          </li>
          <li className="pl-2">
            Avoid making PRs just to increase your <span className="text-red-500 font-semibold">count</span>.
          </li>
          <li className="pl-2">
            Quality over quantity: focus on <span className="text-red-500 font-semibold">meaningful contributions</span>.
          </li>
        </ol>
      )
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 text-white">
      <div className="relative space-y-4 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-white">
          Hacktoberfest{" "}
          <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent hover:from-red-400 hover:to-red-500 transition-colors duration-300">
            Q&A
          </span>
        </h1>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {qaData.map((item, index) => (
          <AccordionItem
            key={index}
            value={`item-${index}`}
            className="bg-gradient-to-br from-[#3d2828] to-[#2a2a2a] rounded-lg border border-[#4e3535]/30 overflow-hidden"
          >
            <AccordionTrigger className="px-6 py-4 hover:no-underline group">
              <div className="flex items-center justify-between w-full">
                <h2 className="text-lg md:text-xl font-semibold text-left">
                  {item.title}
                </h2>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-gray-200">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-8 text-center text-sm text-gray-400">
        <p>Click on any question to expand the answer</p>
      </div>
    </div>
  );
};

export default QandA;