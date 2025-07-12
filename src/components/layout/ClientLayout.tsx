'use client';

import React from 'react';
import Header from '@/components/common/Header';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
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
