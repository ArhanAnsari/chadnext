import { type Metadata } from "next";
import Footer from "~/components/layout/footer";
import Header from "~/components/layout/header";
import ThemeProvider from "~/components/shared/theme-provider";
import { Toaster } from "~/components/ui/toaster";
import { siteConfig, siteUrl } from "~/config/site";
import { I18nProviderClient } from "~/locales/client";

type Props = {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = params.locale;
  const site = siteConfig(locale);

  const siteOgImage = `${siteUrl}/api/og?locale=${locale}`;

  return {
    title: {
      default: site.name,
      template: `%s - ${site.name}`,
    },
    description: site.description,
    keywords: [
      "Next.js",
      "Shadcn/ui",
      "LuciaAuth",
      "Prisma",
      "Vercel",
      "Tailwind",
      "Radix UI",
      "Stripe",
      "Internationalization",
      "Postgres",
    ],
    authors: [
      {
        name: "Arhan Ansari",
        url: "https://codewitharhan.infinityfreeapp.com",
      },
    ],
    creator: "Arhan Ansari",
    openGraph: {
      type: "website",
      locale: locale,
      url: site.url,
      title: site.name,
      description: site.description,
      siteName: site.name,
      images: [
        {
          url: siteOgImage,
          width: 1200,
          height: 630,
          alt: site.name,
        },
      ],
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon-16x16.png",
      apple: "/apple-touch-icon.png",
    },
    manifest: `${siteUrl}/manifest.json`,
    metadataBase: new URL(site.url),
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        fr: "/fr",
      },
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: site.name,
    },
  };
}

export const viewport = {
  width: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function SubLayout({
  children,
  loginDialog,
  params: { locale },
}: {
  children: React.ReactNode;
  loginDialog: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Header />
      <main>
        {children}
        {loginDialog}
      </main>
      <I18nProviderClient locale={locale}>
        <Footer />
      </I18nProviderClient>
      <Toaster />
    </ThemeProvider>
  );
}
