import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { defaultMeta } from "./SEO";
import { injectSpeedInsights } from "@vercel/speed-insights";
import { inject } from "@vercel/analytics";
import links from "@/links";

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

  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/gamma.svg" type="image/x-icon" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={defaultMeta.siteName} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@club_gamma" />
        <meta name="twitter:creator" content="@club_gamma" />

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {children}

      {/* Google Analytics Script */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=G-22NV2DWVYG`}
      ></script>
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-22NV2DWVYG', {
          page_path: window.location.pathname,
        `}
      </script>
    </>
  );
};

