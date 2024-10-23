import React from "react";
import { Helmet } from "react-helmet";

export const defaultMeta = {
  siteName: "Club Gamma",
  baseUrl: "https://clubgamma.vercel.app",
  description:
    "Club Gamma is a dynamic tech community empowering students through open source, hands-on projects, and collaborative learning. Join us to grow your coding skills.",
  keywords:
    "Club Gamma, tech community, coding, programming, technology, learning, developer community, tech events, skill development",
};

export const SEO = ({
  title,
  description = defaultMeta.description,
  pathname = "",
  noindex = false,
  keywords = defaultMeta.keywords,
}) => {
  const seo = {
    title: title ? `${title} | ${defaultMeta.siteName}` : defaultMeta.siteName,
    description: description,
    url: `${defaultMeta.baseUrl}${pathname}`,
    image: `${defaultMeta.baseUrl}/og_image.png`,
  };

  return (
    <>
      <Helmet>
        {/* Basic Meta Tags */}
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={keywords} />

        {/* Canonical URL */}
        <link rel="canonical" href={seo.url} />

        {/* Open Graph */}
        <meta property="og:url" content={seo.url} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:image" content={seo.image} />
        <meta property="og:image:secure_url" content={seo.image} />

        {/* Twitter Card */}
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        <meta name="twitter:image" content={seo.image} />

        {/* Robots */}
        <meta
          name="robots"
          content={noindex ? "noindex, nofollow" : "index, follow"}
        />
      </Helmet>
    </>
  );
};
