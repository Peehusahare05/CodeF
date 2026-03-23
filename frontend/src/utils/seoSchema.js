const SITE_NAME = "EcoTrack";
const SITE_URL = import.meta.env.VITE_SITE_URL || "https://ecotrack.app";

const normalizePath = (path = "/") => {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
};

const toAbsoluteUrl = (path = "/") => `${SITE_URL}${normalizePath(path)}`;

export const buildWebPageSchema = ({ title, description, path }) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url: toAbsoluteUrl(path),
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
});

export const buildBreadcrumbSchema = (items = []) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: toAbsoluteUrl(item.path),
  })),
});

export const buildFaqSchema = (faqs = []) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
});

export const buildArticleSchema = ({
  title,
  description,
  path,
  datePublished,
}) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  headline: title,
  description,
  datePublished,
  dateModified: datePublished,
  author: {
    "@type": "Person",
    name: "Ritik Sawarkar",
  },
  publisher: {
    "@type": "Organization",
    name: "EcoTrack",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/og-image.png`,
    },
  },
  mainEntityOfPage: toAbsoluteUrl(path),
  image: [`${SITE_URL}/og-image.png`],
});
