'use client';
import React from 'react';

const NavigationPage: React.FC = () => {
  return (
    <div className="w-full flex flex-col justify-start items-end">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-start items-center">
        <div className="w-full flex flex-col justify-start items-start mt-8 sm:mt-12 md:mt-16">
          <main className="w-full py-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-[97px] text-left text-global-text2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Navigate through the campus
            </h1>
            {/* Your navigation content here */}
          </main>
        </div>
      </div>
    </div>
  );
};

export default NavigationPage;