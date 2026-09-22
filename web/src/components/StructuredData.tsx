import { brand, projectS, seo } from "@/content/site";

/**
 * Schema.org JSON-LD: tells search engines this is a game studio (the
 * Organization), what the site is (WebSite), and that it is making a game
 * called Project S (VideoGame). Nodes reference each other by @id.
 *
 * Only facts that are already public are stated. No release date, price or
 * rating: add those once they exist, or Google may treat the markup as
 * misleading. Validate after changes at https://search.google.com/test/rich-results
 */
const orgId = `${brand.url}/#organization`;

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": orgId,
      name: brand.name,
      url: brand.url,
      logo: `${brand.url}/icon.png`,
      email: brand.email,
      description: seo.description,
      parentOrganization: { "@type": "Organization", name: brand.parent },
    },
    {
      "@type": "WebSite",
      "@id": `${brand.url}/#website`,
      url: brand.url,
      name: brand.name,
      description: seo.description,
      inLanguage: "en",
      publisher: { "@id": orgId },
    },
    {
      "@type": "VideoGame",
      "@id": `${brand.url}/#project-s`,
      name: projectS.title,
      url: `${brand.url}/#project-s`,
      description: projectS.body[0],
      image: encodeURI(`${brand.url}${projectS.poster}`),
      genre: ["Adventure", "Atmospheric", "2.5D"],
      gamePlatform: "PC",
      operatingSystem: "Windows",
      applicationCategory: "Game",
      keywords: "Tamil folklore, South Indian myth, atmospheric adventure",
      author: { "@id": orgId },
      publisher: { "@id": orgId },
    },
  ],
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // `<` escaped so no string inside the JSON can close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
