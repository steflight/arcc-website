import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from '@/contexts/LanguageContext';
import GoogleTagManager from '@/components/GoogleTagManager';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kladriva - Solutions IA, Mentoring et Consulting pour Accélérer Votre Croissance",
    template: "%s | Kladriva"
  },
  description: "Kladriva vous aide à transformer l'IA en résultats mesurables en semaines, pas en mois. Consulting IA, mentoring et solutions sur mesure pour PME et startups.",
  keywords: [
    "Kladriva",
    "IA",
    "Intelligence Artificielle",
    "Consulting IA",
    "Mentoring",
    "Solutions sur mesure",
    "PME",
    "Startups",
    "Croissance business",
    "Transformation digitale",
    "Québec",
    "Montréal",
    "Canada"
  ],
  authors: [{ name: "Kladriva Team" }],
  creator: "Kladriva",
  publisher: "Kladriva",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kladriva.ca'),
  alternates: {
    canonical: '/',
    languages: {
      'fr': '/fr',
      'en': '/en',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_CA',
    url: 'https://kladriva.ca',
    siteName: 'Kladriva',
    title: 'Kladriva - Solutions IA, Mentoring et Consulting pour Accélérer Votre Croissance',
    description: 'Transformez l\'IA en résultats mesurables en semaines, pas en mois. Consulting IA, mentoring et solutions sur mesure.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Kladriva - Solutions IA et Consulting',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kladriva - Solutions IA, Mentoring et Consulting',
    description: 'Transformez l\'IA en résultats mesurables en semaines, pas en mois.',
    images: ['/logo.png'],
    creator: '@kladriva',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'REMPLACER_PAR_VOTRE_CODE_GOOGLE_SEARCH_CONSOLE',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleTagManager />
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
