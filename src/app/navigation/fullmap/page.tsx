// src/app/navigation/fullmap/page.tsx
'use client';

import { useState } from 'react';
import InteractiveMap from '@/components/map/InteractiveMap';

export default function FullMapPage() {
  const [showQuickTip, setShowQuickTip] = useState(true);

  return (
    <div className="h-screen w-screen fixed top-0 left-0 z-0">
      <InteractiveMap className="w-full h-full" showSearchBar={true} />
      
      {/* Quick Tip Widget */}
      {showQuickTip && (
        <div className="absolute top-4 right-4 z-[999] w-[301px] h-[62px] bg-white/10 backdrop-blur-md rounded-[30px] border border-white/20 shadow-lg">
          <div className="flex items-center h-full px-4 gap-3">
            {/* Lightbulb Icon */}
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            {/* Text Content */}
            <div className="flex-1 min-w-0">
              <div className="text-black text-[14px] font-semibold leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                Quick Tip!
              </div>
              <div className="text-black/80 text-[12px] font-normal leading-tight" style={{ fontFamily: 'Inter, sans-serif' }}>
                Room codes are easy! For example, 6312 means Block 6, Floor 3, Room 12.
              </div>
            </div>
          </div>
          
          {/* Close Button */}
          <button
            onClick={() => setShowQuickTip(false)}
            className="absolute -top-2 -right-2 w-[22px] h-[22px] bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-lg flex items-center justify-center hover:bg-white/20 transition-colors duration-200"
          >
            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
