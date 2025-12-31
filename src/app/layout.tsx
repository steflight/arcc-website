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
    default: "ARCC - Association des Ressortissants Camerounais au Canada",
    template: "%s | ARCC"
  },
  description: "ARCC unit, soutient et accompagne la communauté camerounaise au Canada. Établissement des nouveaux arrivants, support juridique, mentorat, réseautage professionnel et intervention de crise.",
  keywords: [
    "ARCC",
    "Association des Ressortissants Camerounais au Canada",
    "Communauté camerounaise",
    "Camerounais au Canada",
    "Établissement nouveaux arrivants",
    "Support juridique",
    "Mentorat",
    "Réseautage professionnel",
    "Intervention de crise",
    "Répertoire des compétences",
    "Montréal",
    "Québec",
    "Canada",
    "Immigration",
    "Intégration"
  ],
  authors: [{ name: "ARCC Team" }],
  creator: "ARCC",
  publisher: "ARCC",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://camercanada.com'),
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
    url: 'https://camercanada.com',
    siteName: 'ARCC',
    title: 'ARCC - Association des Ressortissants Camerounais au Canada',
    description: 'Unir, soutenir et accompagner la communauté camerounaise au Canada. Établissement, support juridique, mentorat et réseautage professionnel.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'ARCC - Association des Ressortissants Camerounais au Canada',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ARCC - Association des Ressortissants Camerounais au Canada',
    description: 'Unir, soutenir et accompagner la communauté camerounaise au Canada.',
    images: ['/logo.png'],
    creator: '@ARCC',
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
