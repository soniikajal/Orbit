'use client';
import React, { useState } from 'react';

const LaunchpadPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="w-full flex flex-col justify-start items-end">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-start items-center">
        <div className="w-full flex flex-col justify-start items-start mt-2 sm:mt-3 md:mt-4">
          <main className="w-full py-2">
            {/* Page Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-[97px] text-left text-global-text2 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              Launch Pad
            </h1>

            {/* Search Bar */}
            <div className="w-full mb-[15px]">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search for projects, skills or keywords..."
                    className="w-full h-[56px] px-4 pl-6 pr-14 text-base rounded-[30px] focus:outline-none focus:ring-2 focus:ring-[#f4c430] focus:border-transparent transition-all duration-200"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', backgroundColor: 'white', borderColor: '#9ca3af', borderWidth: '1px' }}
                  />
                  <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </form>
            </div>

            {/* Add Project Button */}
            <div className="w-full flex justify-center items-center mt-[15px]">
              <button
                className="w-[278px] h-[54px] bg-[#F45B6A] text-white font-bold text-[20px] rounded-[30px] hover:opacity-90 transition-opacity duration-200"
                style={{ fontFamily: 'Inter, sans-serif' }}
                onClick={() => {
                  console.log('Add project clicked');
                }}
              >
                + ADD YOUR PROJECT
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LaunchpadPage;
