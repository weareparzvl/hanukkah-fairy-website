import { site, book, cover, editions, people, sameAs } from "./book.js";

const id = (hash) => `${site.origin}/#${hash}`;
const slug = (name) => name.toLowerCase().replace(/[^a-z]+/g, "-");
const personId = (name) => id(`person-${slug(name)}`);
const coverUrl = `${site.origin}${cover.path}`;

const person = (name, jobTitle) => ({
  "@type": "Person",
  "@id": personId(name),
  name,
  jobTitle,
  ...(people[name] ? { sameAs: [people[name]] } : {}),
});

// Authors and illustrator are named entities on every page, so the book is tied to real people.
export const contributors = [
  ...book.authors.map((name) => person(name, "Author")),
  person(book.illustrator, "Illustrator"),
];

export const coverImage = {
  "@type": "ImageObject",
  "@id": id("cover"),
  url: coverUrl,
  contentUrl: coverUrl,
  width: cover.width,
  height: cover.height,
  encodingFormat: "image/jpeg",
  name: `${book.title} book cover`,
  caption: `Front cover of ${book.title}, a Hanukkah picture book by ${book.authors.join(" and ")}, illustrated by ${book.illustrator}.`,
  representativeOfPage: true,
  creator: { "@id": personId(book.illustrator) },
  creditText: book.authors.join(" and "),
  copyrightHolder: book.authors.map((name) => ({ "@id": personId(name) })),
  copyrightNotice: `© ${book.published.slice(0, 4)} ${book.authors.join(" and ")}`,
};

export const organization = {
  "@type": "Organization",
  "@id": id("organization"),
  name: book.publisher,
  alternateName: site.name,
  url: `${site.origin}/`,
  logo: {
    "@type": "ImageObject",
    "@id": id("logo"),
    url: `${site.origin}/icon-512.png`,
    width: 512,
    height: 512,
  },
  image: { "@id": id("cover") },
  sameAs: [site.instagram, site.shop],
};

export const website = {
  "@type": "WebSite",
  "@id": id("website"),
  url: `${site.origin}/`,
  name: site.name,
  description: `The official site of ${book.title}, the Hanukkah picture book by ${book.authors.join(" and ")}.`,
  inLanguage: "en",
  publisher: { "@id": id("organization") },
  about: { "@id": id("book") },
};

const audience = {
  "@type": "PeopleAudience",
  audienceType: "Children",
  suggestedMinAge: 3,
  suggestedMaxAge: 10,
};

export const bookNode = {
  "@type": "Book",
  "@id": id("book"),
  name: book.title,
  url: `${site.origin}/book`,
  mainEntityOfPage: `${site.origin}/book`,
  description:
    "A rhyming Hanukkah picture book for children ages 3 to 10 about belonging, kindness, courage and Jewish joy, with a hide-and-seek tradition for all eight nights.",
  author: book.authors.map((name) => ({ "@id": personId(name) })),
  illustrator: { "@id": personId(book.illustrator) },
  publisher: { "@id": id("organization") },
  copyrightHolder: book.authors.map((name) => ({ "@id": personId(name) })),
  copyrightYear: Number(book.published.slice(0, 4)),
  datePublished: book.published,
  inLanguage: "en",
  genre: ["Children's picture book", "Hanukkah fiction"],
  audience,
  typicalAgeRange: book.ageRange,
  numberOfPages: book.pages,
  image: { "@id": id("cover") },
  thumbnailUrl: coverUrl,
  about: ["Hanukkah", "Kindness", "Belonging"].map((name) => ({
    "@type": "Thing",
    name,
  })),
  sameAs,
  workExample: editions
    .filter((edition) => edition.schemaFormat)
    .map((edition) => ({
      "@type": edition.schemaType ?? "Book",
      "@id": id(`edition-${edition.id}`),
      name: `${book.title} (${edition.format})`,
      bookFormat: edition.schemaFormat,
      ...(edition.isbn ? { isbn: edition.isbn } : {}),
      ...(edition.asin
        ? { identifier: { "@type": "PropertyValue", propertyID: "ASIN", value: edition.asin } }
        : {}),
      inLanguage: "en",
      datePublished: edition.published ?? book.published,
      ...(edition.readBy ? { readBy: { "@type": "Person", name: edition.readBy } } : {}),
      ...(edition.duration ? { duration: edition.duration } : {}),
      author: book.authors.map((name) => ({ "@id": personId(name) })),
      illustrator: { "@id": personId(book.illustrator) },
      publisher: { "@id": id("organization") },
      audience,
      image: coverUrl,
      exampleOfWork: { "@id": id("book") },
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

// Every page says it is about the book; pages that show the cover name it as their main image.
export const page = (path, name, description, extra = {}) => ({
  "@type": "WebPage",
  "@id": `${site.origin}${path}#webpage`,
  url: `${site.origin}${path}`,
  name,
  description,
  isPartOf: { "@id": id("website") },
  about: { "@id": id("book") },
  inLanguage: "en",
  ...extra,
});

export const withCover = { primaryImageOfPage: { "@id": id("cover") }, image: { "@id": id("cover") } };
