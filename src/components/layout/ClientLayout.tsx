'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/layout/Footer';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  
  // Auth pages should render without the header and container layout
  const isAuthPage = pathname?.startsWith('/auth/');
  
  // Full map page should render without the header and container layout
  const isFullMapPage = pathname === '/navigation/fullmap';
  
  // Admin pages should render without footer
  const isAdminPage = pathname?.startsWith('/admin/');
  
  if (isAuthPage || isFullMapPage) {
    return <>{children}</>;
  }

  return (
    <div className="w-full bg-[#fffcf9] min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <div className="w-full">
          {children}
        </div>
        {/* Add footer to all pages except admin */}
        {!isAdminPage && <Footer />}
      </div>
    </div>
  );
}
