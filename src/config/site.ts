export const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://chadnext-five.vercel.app";

export const siteConfig = (locale?: string) => ({
  name: "ChadNext",
  url: siteUrl + "/" + locale,
  ogImage: `${siteUrl}/${locale}/opengraph-image`,
  description: "Quick Starter Template for your Next project.",
  links: {
    github: "https://github.com/ArhanAnsari/chadnext",
  },
});

export type SiteConfig = typeof siteConfig;
