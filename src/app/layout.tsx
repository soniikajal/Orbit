import React from 'react';
import '../styles/index.css';
import AuthProvider from '@/components/auth/AuthProvider';
import ClientLayout from '@/components/layout/ClientLayout';

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
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#fffcf9]">
      <body className="bg-[#fffcf9]">
        <AuthProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AuthProvider>
        <script type="module" src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fkajalsap2424back.builtwithrocket.new&_be=https%3A%2F%2Fapplication.rocket.new&_v=0.1.5"></script>
      </body>
    </html>
  );
}
