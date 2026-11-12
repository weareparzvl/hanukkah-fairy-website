// One fact set for the page text, JSON-LD and retailer links.
// Sources: reviews/benchmark-20261110/SEO.md (retailer pages read 2026-11-10).
export const site = {
  origin: "https://thehanukkahfairy.com",
  name: "The Hanukkah Fairy",
  gtm: "GTM-MPV9H7PZ",
  shop: "https://thehanukkahfairy.myshopify.com/",
  instagram: "https://www.instagram.com/thehanukkahfairy/",
};

export const book = {
  title: "The Hanukkah Fairy",
  authors: ["Elise Dykowsky", "Donny Dykowsky"],
  illustrator: "Tincho Schmidt",
  ages: "3 to 10",
  ageRange: "3-10",
  published: "2026-10-15",
  publishedText: "October 15, 2026",
  publisher: "The Hanukkah Fairy LLC",
  pages: 72,
  trim: "8.5 x 8.5 inches",
  language: "English",
};

const amazon = (asin) =>
  `https://www.amazon.com/dp/${asin}?tag=thehanukkahfa-20`;

export const editions = [
  {
    id: "hardcover",
    format: "Hardcover",
    schemaFormat: "https://schema.org/Hardcover",
    isbn: "9798998007903",
    isbnText: "979-8-9980079-0-3",
    links: [
      { retailer: "Amazon", url: amazon("B0HN6MZKP8") },
      {
        retailer: "Barnes & Noble",
        url: "https://www.barnesandnoble.com/w/the-hanukkah-fairy-elise-dykowsky/1151693795?ean=9798998007903",
      },
    ],
  },
  {
    id: "paperback",
    format: "Paperback",
    schemaFormat: "https://schema.org/Paperback",
    isbn: "9798998007910",
    isbnText: "979-8-9980079-1-0",
    links: [{ retailer: "Amazon", url: amazon("B0HLK3JFL7") }],
  },
  {
    id: "kindle",
    format: "Kindle",
    schemaFormat: "https://schema.org/EBook",
    links: [{ retailer: "Amazon", url: amazon("B0HMG4H8MN") }],
  },
  {
    id: "apple",
    format: "Apple Books",
    schemaFormat: "https://schema.org/EBook",
    links: [
      {
        retailer: "Apple Books",
        url: "https://books.apple.com/us/book/the-hanukkah-fairy/id6821099443",
      },
    ],
  },
  {
    id: "signed",
    format: "Signed paperback and tote",
    links: [
      {
        retailer: "The Fairy Gift Shop",
        url: "https://thehanukkahfairy.myshopify.com/products/the-hanukkah-fairy-signed-paperback-book-tour-tote-gift-set",
      },
    ],
  },
];

// The short list of buy buttons used across the site.
export const buyLinks = [
  { label: "Amazon", retailer: "amazon", edition: "hardcover", url: amazon("B0HN6MZKP8") },
  {
    label: "Apple Books",
    retailer: "apple-books",
    edition: "ebook",
    url: "https://books.apple.com/us/book/the-hanukkah-fairy/id6821099443",
  },
  {
    label: "Barnes & Noble",
    retailer: "barnes-noble",
    edition: "hardcover",
    url: "https://www.barnesandnoble.com/w/the-hanukkah-fairy-elise-dykowsky/1151693795?ean=9798998007903",
  },
];

export const sameAs = [
  "https://www.amazon.com/dp/B0HN6MZKP8",
  "https://www.amazon.com/dp/B0HLK3JFL7",
  "https://books.apple.com/us/book/the-hanukkah-fairy/id6821099443",
  "https://www.barnesandnoble.com/w/the-hanukkah-fairy-elise-dykowsky/1151693795",
  "https://www.goodreads.com/book/show/261273213-the-hanukkah-fairy",
  "https://openlibrary.org/works/OL46100052W",
];

// Hanukkah 2026 (Hebcal, per BEHAVIOR.md): first candle at sundown Friday, Dec 4.
export const hanukkah = {
  year: 2026,
  first: "Friday, December 4",
  last: "Friday, December 11",
  firstISO: "2026-12-04",
};

// Kit promises that depend on an email platform stay off until one is connected.
export const kit = {
  name: "The Fairy’s 8 Night Kit",
  file: "/kit/the-fairys-8-night-kit.pdf",
  nightlyNotes: false,
};
