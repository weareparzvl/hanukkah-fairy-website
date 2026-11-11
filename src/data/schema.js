import { site, book, editions, sameAs } from "./book.js";

const id = (hash) => `${site.origin}/#${hash}`;
const person = (name) => ({ "@type": "Person", name });

export const organization = {
  "@type": "Organization",
  "@id": id("organization"),
  name: book.publisher,
  alternateName: site.name,
  url: `${site.origin}/`,
  logo: `${site.origin}/icon-512.png`,
  sameAs: [site.instagram, site.shop],
};

export const website = {
  "@type": "WebSite",
  "@id": id("website"),
  url: `${site.origin}/`,
  name: site.name,
  inLanguage: "en",
  publisher: { "@id": id("organization") },
};

export const bookNode = {
  "@type": "Book",
  "@id": id("book"),
  name: book.title,
  url: `${site.origin}/book`,
  description:
    "A rhyming Hanukkah picture book for children ages 3 to 10 about belonging, kindness, courage and Jewish joy, with a hide-and-seek tradition for all eight nights.",
  author: book.authors.map(person),
  illustrator: person(book.illustrator),
  publisher: { "@id": id("organization") },
  datePublished: book.published,
  inLanguage: "en",
  genre: "Children's picture book",
  typicalAgeRange: book.ageRange,
  numberOfPages: book.pages,
  image: `${site.origin}/assets/cover.webp`,
  about: ["Hanukkah", "Kindness", "Belonging"].map((name) => ({
    "@type": "Thing",
    name,
  })),
  sameAs,
  workExample: editions
    .filter((edition) => edition.schemaFormat)
    .map((edition) => ({
      "@type": "Book",
      name: `${book.title} (${edition.format})`,
      bookFormat: edition.schemaFormat,
      ...(edition.isbn ? { isbn: edition.isbn } : {}),
      inLanguage: "en",
      datePublished: book.published,
      url: edition.links[0].url.split("?tag=")[0],
    })),
};

export const breadcrumbs = (trail) => ({
  "@type": "BreadcrumbList",
  itemListElement: [["Home", "/"], ...trail].map(([name, path], index) => ({
    "@type": "ListItem",
    position: index + 1,
    name,
    item: `${site.origin}${path === "/" ? "/" : path}`,
  })),
});

export const page = (path, name, description, extra = {}) => ({
  "@type": "WebPage",
  "@id": `${site.origin}${path}#webpage`,
  url: `${site.origin}${path}`,
  name,
  description,
  isPartOf: { "@id": id("website") },
  inLanguage: "en",
  ...extra,
});
