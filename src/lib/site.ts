/**
 * Everything about YOU lives here. Change these values and the whole site
 * follows: header, hero, footer, page titles, social previews.
 */
export const site = {
  /** Your name or studio name, as it appears in the header and footer. */
  name: "Your Name",
  /** The one-line statement in the hero. `accent` is the phrase set in gold. */
  statement: {
    before: "Paintings, prints and the occasional",
    accent: "wall-sized mistake",
    after: ".",
  },
  /** One or two sentences under the statement. */
  intro: "Work from the last few years, grouped by series. Everything here is for sale or already sold, and I am always taking commissions.",
  /** Shown on the contact page and in the footer. */
  email: "hello@example.com",
  /** Where the site lives once deployed. Used for sitemap and social previews. */
  url: "https://your-portfolio.vercel.app",
  /** Short description for search engines and link previews. */
  description: "The portfolio of Your Name: paintings, prints and works on paper.",
  /** Optional. Leave the array empty to hide the block. */
  social: [
    { label: "Instagram", href: "https://instagram.com/yourhandle" },
  ],
} as const;
