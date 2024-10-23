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
        <meta property="og:image" content={`${defaultMeta.baseUrl}/og_image.png`} />
        <meta property="og:image:secure_url" content={`${defaultMeta.baseUrl}/og_image.png`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Club Gamma" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@club_gamma" />
        <meta name="twitter:creator" content="@club_gamma" />
        <meta name="twitter:image" content={`${defaultMeta.baseUrl}/og_image.png`} />

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

