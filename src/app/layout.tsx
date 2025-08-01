import React from 'react';
import '../styles/index.css';
import AuthProvider from '@/components/auth/AuthProvider';
import ClientLayout from '@/components/layout/ClientLayout';
import { Analytics } from '@vercel/analytics/next';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  title: 'Orbit - NSUT Survival Kit',
  description: 'Your complete guide to NSUT campus. Access maps, resources, events, and connect with fellow students all in one place.',
  icons: {
    icon: [
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
  },
  openGraph: {
    title: 'Orbit - NSUT Survival Kit',
    description: 'Your complete guide to NSUT campus. Access maps, resources, events, and connect with fellow students all in one place.',
    url: 'https://nsutorbit.tech',
    siteName: 'Orbit - NSUT Survival Kit',
    images: [
      {
        url: 'https://nsutorbit.tech/images/ogimg.png',
        width: 1200,
        height: 630,
        alt: 'Orbit - NSUT Survival Kit',
        type: 'image/png',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Orbit - NSUT Survival Kit',
    description: 'Your complete guide to NSUT campus. Access maps, resources, events, and connect with fellow students all in one place.',
    images: ['https://nsutorbit.tech/images/ogimg.png'],
    creator: '@orbit_nsut',
  },
  metadataBase: new URL('https://nsutorbit.tech'),
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#fffcf9]">
      <head>
        {/* Additional OpenGraph tags for better compatibility */}
        <meta property="og:title" content="Orbit - NSUT Survival Kit" />
        <meta property="og:description" content="Your complete guide to NSUT campus. Access maps, resources, events, and connect with fellow students all in one place." />
        <meta property="og:image" content="https://nsutorbit.tech/images/ogimg.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:url" content="https://nsutorbit.tech" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Orbit - NSUT Survival Kit" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Orbit - NSUT Survival Kit" />
        <meta name="twitter:description" content="Your complete guide to NSUT campus. Access maps, resources, events, and connect with fellow students all in one place." />
        <meta name="twitter:image" content="https://nsutorbit.tech/images/ogimg.png" />
        
        {/* WhatsApp specific tags */}
        <meta property="og:image:secure_url" content="https://nsutorbit.tech/images/ogimg.png" />
        <meta name="theme-color" content="#fffcf9" />
      </head>
      <body className="bg-[#fffcf9]">
        <AuthProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AuthProvider>
        <Analytics />
        <script type="module" src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fkajalsap2424back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.5"></script>
      </body>
    </html>
  );
}
