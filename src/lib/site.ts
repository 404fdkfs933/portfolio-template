/**
 * Everything about YOU lives here. Change these values and the whole site
 * follows: header, hero, menu, footer, page titles, social previews.
 */
export const site = {
  /** Your name or studio name. Set huge on the home page and used everywhere else. */
  name: "Your Name",
  /**
   * How the name breaks on the home page, one entry per line. Leave empty to
   * put each word on its own line.
   */
  nameLines: [] as string[],
  /** Optional signature or logo image in /public, shown top-left instead of the name. Leave empty for the written name. */
  logo: "",
  /** A full-bleed photo of you (or a studio shot) in /public. The home page and About open on it. */
  portrait: "/portrait.jpg",
  /** What the portrait shows, for people who cannot see it. */
  portraitAlt: "Placeholder portrait: a soft grey gradient with the words replace me.",
  /** Two or three sentences for the About page opener, and for search engines. */
  intro: "I make paintings, prints and works on paper. This is a placeholder: say what you make, where you are, and what you are working on now.",
  /** Shown on the contact page and in the footer. */
  email: "hello@example.com",
  /** Optional postal address lines for the contact page. Leave empty to hide. */
  address: [] as string[],
  /** Where the site lives once deployed. Used for sitemap and social previews. */
  url: "https://art-portfolio-template.vercel.app",
  /** Short description for search engines and link previews. */
  description: "The portfolio of Your Name: paintings, prints and works on paper.",
  /** Optional. Leave the array empty to hide the block. */
  social: [
    { label: "Instagram", href: "https://instagram.com/yourhandle" },
  ],
};

/** The name as it stacks on the home page. */
export function nameLines(): string[] {
  return site.nameLines.length ? site.nameLines : site.name.split(/\s+/);
}
