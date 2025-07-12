'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/common/Header';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  
  // Auth pages should render without the header and container layout
  const isAuthPage = pathname?.startsWith('/auth/');
  
  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="w-full bg-[#fffcf9] min-h-screen">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}
