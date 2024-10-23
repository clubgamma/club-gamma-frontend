import  { useEffect } from "react";

const defaultMeta = {
  siteName: "Club Gamma",
  baseUrl: "https://clubgamma.vercel.app",
  description:
    "Club Gamma is a dynamic tech community empowering students through open source, hands-on projects, and collaborative learning. Join us to grow your coding skills.",
  keywords:
    "Club Gamma, tech community, coding, programming, technology, learning, developer community, tech events, skill development",
};

const SEO = ({
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

  // Update meta tags at runtime
  useEffect(() => {
    // Update title
    document.title = seo.title;

    // Update meta tags
    updateMetaTag("description", seo.description);
    updateMetaTag("keywords", keywords);

    // Update Open Graph tags
    updateMetaTag("og:title", seo.title, "property");
    updateMetaTag("og:description", seo.description, "property");
    updateMetaTag("og:url", seo.url, "property");
    updateMetaTag("og:image", seo.image, "property");
    updateMetaTag("og:image:secure_url", seo.image, "property");

    // Update Twitter Card tags
    updateMetaTag("twitter:title", seo.title);
    updateMetaTag("twitter:description", seo.description);
    updateMetaTag("twitter:image", seo.image);

    // Update robots meta tag
    updateMetaTag("robots", noindex ? "noindex, nofollow" : "index, follow");

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', seo.url);
  }, [title, description, pathname, noindex, keywords, seo]);

  return null;
};

const updateMetaTag = (name, content, attributeName = "name") => {
  let meta = document.querySelector(`meta[${attributeName}="${name}"]`);
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attributeName, name);
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
};

export default SEO;