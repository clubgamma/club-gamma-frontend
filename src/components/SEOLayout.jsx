import React, { useEffect } from "react";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { inject } from "@vercel/analytics";
import links from "@/links";

const defaultMeta = {
  siteName: "Club Gamma",
  baseUrl: "https://clubgamma.vercel.app",
  description:
    "Club Gamma is a dynamic tech community empowering students through open source, hands-on projects, and collaborative learning. Join us to grow your coding skills.",
  keywords:
    "Club Gamma, tech community, coding, programming, technology, learning, developer community, tech events, skill development",
};

export const SEOLayout = ({ children }) => {
  useEffect(() => {
    // Vercel Analytics
    inject();
    injectSpeedInsights();
  }, []);

  // Schema.org in JSONLD format
  const schema = {
    "@context": "http://schema.org",
    "@type": "WebSite",
    name: "Club Gamma",
    url: defaultMeta.baseUrl,
    description: defaultMeta.description,
    applicationCategory: "TechnologyCommunity",
    creator: {
      "@type": "Organization",
      name: "Club Gamma Team",
      sameAs: [
        links.socials.instagram,
        links.socials.github,
        links.socials.twitter,
        links.socials.linkedin,
        links.socials.discord,
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "Club Gamma",
      sameAs: [
        links.socials.instagram,
        links.socials.github,
        links.socials.twitter,
        links.socials.linkedin,
        links.socials.discord,
      ],
    },
    featureList: [
      "Tech Community",
      "Learning Resources",
      "Project Collaborations",
      "Tech Events",
      "Networking",
      "Skill Development",
    ],
  };

  useEffect(() => {
    // Add Schema.org JSON-LD
    const scriptTag = document.createElement('script');
    scriptTag.type = 'application/ld+json';
    scriptTag.text = JSON.stringify(schema);
    document.head.appendChild(scriptTag);

    // Google Analytics Setup
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = `https://www.googletagmanager.com/gtag/js?id=G-22NV2DWVYG`;
    document.head.appendChild(gaScript);

    const gaConfigScript = document.createElement('script');
    gaConfigScript.text = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-22NV2DWVYG', {
        page_path: window.location.pathname,
      });
    `;
    document.head.appendChild(gaConfigScript);

    // Cleanup
    return () => {
      document.head.removeChild(scriptTag);
      document.head.removeChild(gaScript);
      document.head.removeChild(gaConfigScript);
    };
  }, []);

  return <>{children}</>;
};