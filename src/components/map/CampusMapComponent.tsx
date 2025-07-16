// src/components/map/CampusMapComponent.tsx
'use client';

import dynamic from 'next/dynamic';

const RoutingMap = dynamic(() => import('./RoutingMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center rounded-[30px]">
      <div className="text-center text-white">
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto mb-4 text-white/70 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Loading Campus Map...
        </h3>
        <p className="text-white/80 text-sm" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Initializing routing engine...
        </p>
      </div>
    </div>
  )
});

interface CampusMapComponentProps {
  searchQuery?: string;
  onLocationSelect?: (location: string) => void;
  showSearchBar?: boolean;
}

export default function CampusMapComponent({ searchQuery, onLocationSelect, showSearchBar }: CampusMapComponentProps) {
  return <RoutingMap className="w-full h-full" searchQuery={searchQuery} onLocationSelect={onLocationSelect} showSearchBar={showSearchBar} />;
}
