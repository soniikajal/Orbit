// src/app/navigation/fullmap/page.tsx
'use client';

import InteractiveMap from '@/components/map/InteractiveMap';

export default function FullMapPage() {
  return (
    <div className="h-screen w-screen fixed top-0 left-0 z-0">
      <InteractiveMap className="w-full h-full" showSearchBar={true} />
    </div>
  );
}
