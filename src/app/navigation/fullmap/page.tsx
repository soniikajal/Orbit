// src/app/navigation/fullmap/page.tsx
'use client';

import InteractiveMap from '@/components/map/InteractiveMap';

export default function FullMapPage() {
  return (
    <div className="h-screen w-full">
      <InteractiveMap className="w-full h-full" />
    </div>
  );
}
