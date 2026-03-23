import React from "react";
import { useEffect } from "react";

const SITE_NAME = "EcoTrack";
const SITE_URL = import.meta.env.VITE_SITE_URL || "https://ecotrack.app";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_DESCRIPTION =
    "EcoTrack by Ritik Sawarkar helps you track emissions, improve eco score, and get AI sustainability recommendations with a fast, modern analytics dashboard.";

const normalizePath = (path = "/") => {
    if (!path) return "/";
    return path.startsWith("/") ? path : `/${path}`;
};

const toAbsoluteUrl = (path = "/") => `${SITE_URL}${normalizePath(path)}`;

const SEO = ({
    title,
    description = DEFAULT_DESCRIPTION,
    path = "/",
    image = DEFAULT_IMAGE,
    type = "website",
    keywords = "Ritik Sawarkar, EcoTrack, sustainability dashboard, carbon footprint tracker, AI sustainability advisor, CO2 tracking, green analytics",
    structuredData = [],
}) => {
    const pageTitle = title
        ? `${title} | ${SITE_NAME}`
        : "EcoTrack | AI Sustainability Dashboard by Ritik Sawarkar";

    const canonical = toAbsoluteUrl(path);

    useEffect(() => {
        const upsertMeta = (attr, key, value) => {
            let node = document.head.querySelector(`meta[${attr}='${key}']`);
            if (!node) {
                node = document.createElement("meta");
                node.setAttribute(attr, key);
                document.head.appendChild(node);
            }
            node.setAttribute("content", value);
            return node;
        };

        const upsertLink = (rel, href) => {
            let node = document.head.querySelector(`link[rel='${rel}']`);
            if (!node) {
                node = document.createElement("link");
                node.setAttribute("rel", rel);
                document.head.appendChild(node);
            }
            node.setAttribute("href", href);
            return node;
        };

        document.title = pageTitle;

        upsertMeta("name", "description", description);
        upsertMeta("name", "keywords", keywords);
        upsertMeta("name", "author", "Ritik Sawarkar");
        upsertMeta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");

        upsertMeta("property", "og:title", pageTitle);
        upsertMeta("property", "og:description", description);
        upsertMeta("property", "og:type", type);
        upsertMeta("property", "og:url", canonical);
        upsertMeta("property", "og:image", image);
        upsertMeta("property", "og:site_name", SITE_NAME);

        upsertMeta("name", "twitter:card", "summary_large_image");
        upsertMeta("name", "twitter:title", pageTitle);
        upsertMeta("name", "twitter:description", description);
        upsertMeta("name", "twitter:image", image);

        upsertLink("canonical", canonical);

        const addedSchemas = structuredData.map((schema, index) => {
            const script = document.createElement("script");
            script.type = "application/ld+json";
            script.setAttribute("data-seo-schema", `${path}-${index}`);
            script.text = JSON.stringify(schema);
            document.head.appendChild(script);
            return script;
        });

        return () => {
            addedSchemas.forEach((node) => {
                if (node.parentNode) {
                    node.parentNode.removeChild(node);
                }
            });
        };
    }, [canonical, description, image, keywords, pageTitle, path, structuredData, type]);

    return null;
};

export default SEO;
