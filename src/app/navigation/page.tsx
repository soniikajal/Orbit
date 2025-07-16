// src/app/navigation/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import InteractiveMap from '@/components/map/InteractiveMap';
import Button from '@/components/ui/Button';
import EditText from '@/components/ui/EditText';

const NavigationPage: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [startLocation, setStartLocation] = useState('Your Location');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [buildings, setBuildings] = useState<any[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [routeQuery, setRouteQuery] = useState('');

  // Load buildings data for suggestions
  useEffect(() => {
    const loadBuildings = async () => {
      try {
        const response = await fetch('/markers.json');
        const data = await response.json();
        const buildingList = data.features.map((f: any) => ({
          name: f.properties.name,
          latlng: [f.geometry.coordinates[1], f.geometry.coordinates[0]]
        }));
        setBuildings(buildingList);
      } catch (error) {
        console.error('Error loading buildings:', error);
      }
    };
    loadBuildings();
  }, []);

  const handleNewsletterEmailChange = (value: string | React.ChangeEvent<HTMLInputElement>) => {
    const stringValue = typeof value === 'string' ? value : value.target.value;
    setNewsletterEmail(stringValue);
  };

  const handleNewsletterSubmit = () => {
    console.log('Newsletter subscription:', newsletterEmail);
    setNewsletterEmail('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      // Set route query to trigger routing on the map
      setRouteQuery(searchQuery);
      console.log('Searching for route from', startLocation, 'to', searchQuery);
    }
    setSuggestions([]);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedSuggestionIndex(-1); // Reset selection when typing
    
    // Generate suggestions based on input
    if (value.trim() !== '' && buildings.length > 0) {
      const filteredSuggestions = buildings
        .filter(building => 
          building.name.toLowerCase().includes(value.toLowerCase())
        )
        .map(building => building.name);
      
      // Add "Your Location" if it matches the search
      const allSuggestions = [];
      if ("Your Location".toLowerCase().includes(value.toLowerCase())) {
        allSuggestions.push("Your Location");
      }
      allSuggestions.push(...filteredSuggestions);
      
      setSuggestions(allSuggestions.slice(0, 6)); // Show max 6 suggestions
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(suggestions[selectedSuggestionIndex]);
        } else {
          handleSearch(e);
        }
        break;
      case 'Escape':
        setSuggestions([]);
        setIsSearchFocused(false);
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSuggestions([]);
    setIsSearchFocused(false);
    setSelectedSuggestionIndex(-1);
    // Trigger routing
    setRouteQuery(suggestion);
  };

  const handleLocationCardClick = (location: string) => {
    setSearchQuery(location);
    setSuggestions([]);
    setIsSearchFocused(false);
    setSelectedSuggestionIndex(-1);
    // Trigger routing
    setRouteQuery(location);
    console.log('Location card clicked:', location);
  };
  return (
    <div className="w-full flex flex-col justify-start items-end">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-start items-center">
        <div className="w-full flex flex-col justify-start items-start mt-2 sm:mt-3 md:mt-4">
          <main className="w-full py-2">
            {/* Page Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-[97px] text-left text-global-text2 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              Navigate through the campus
            </h1>

            {/* Search Bar */}
            <div className="w-full mb-[15px] relative">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => {
                      // Delay hiding suggestions to allow clicks
                      setTimeout(() => {
                        setIsSearchFocused(false);
                        setSelectedSuggestionIndex(-1);
                      }, 200);
                    }}
                    placeholder="Search for classrooms, labs or blocks..."
                    className="w-full h-[56px] px-4 pl-6 pr-14 text-base rounded-[30px] focus:outline-none focus:ring-2 focus:ring-[#f4c430] focus:border-transparent transition-all duration-200"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', backgroundColor: 'white', borderColor: '#9ca3af', borderWidth: '1px' }}
                  />
                  <button
                    type="submit"
                    className="absolute inset-y-0 right-0 pr-5 flex items-center cursor-pointer hover:scale-110 transition-transform duration-200"
                  >
                    <svg className="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
              
              {/* Suggestions Dropdown */}
              {isSearchFocused && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-[20px] shadow-lg z-[1000] mt-2 max-h-48 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`px-6 py-3 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors duration-150 first:rounded-t-[20px] last:rounded-b-[20px] ${
                        index === selectedSuggestionIndex 
                          ? 'bg-blue-50 border-blue-200' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex items-center gap-3">
                        <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-[14px] font-normal text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {suggestion}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Most searched for */}
            <div className="w-full mb-[10px]">
              <div className="flex justify-between items-center pl-[20px] pr-[20px]">
                <p className="text-black font-medium text-[14px] text-left" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Most searched for
                </p>
                <p className="text-[14px] text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  To set different start location, view{' '}
                  <button 
                    onClick={() => window.open('/navigation/fullmap', '_blank')}
                    className="text-blue-600 hover:text-blue-800 underline transition-colors duration-200 font-medium"
                  >
                    full map
                  </button>
                </p>
              </div>
            </div>

            {/* Location Cards */}
            <div className="w-full mb-[8px] pl-[20px] pr-[20px]">
              <div className="flex flex-wrap gap-4 justify-center">
                <button 
                  onClick={() => handleLocationCardClick('Computer Centre (CC)')}
                  className="h-[40px] px-4 bg-white rounded-[30px] border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
                >
                  <span className="text-[14px] font-normal text-black whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Computer Centre (CC)
                  </span>
                </button>
                <button 
                  onClick={() => handleLocationCardClick('Student Activity Centre (SAC)')}
                  className="h-[40px] px-4 bg-white rounded-[30px] border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
                >
                  <span className="text-[14px] font-normal text-black whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Student Activity Centre (SAC)
                  </span>
                </button>
                <button 
                  onClick={() => handleLocationCardClick('Main Auditorium')}
                  className="h-[40px] px-4 bg-white rounded-[30px] border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
                >
                  <span className="text-[14px] font-normal text-black whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Main Auditorium
                  </span>
                </button>
                <button 
                  onClick={() => handleLocationCardClick('Training & Placement Cell (TNP)')}
                  className="h-[40px] px-4 bg-white rounded-[30px] border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
                >
                  <span className="text-[14px] font-normal text-black whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Training & Placement Cell (TNP)
                  </span>
                </button>
                <button 
                  onClick={() => handleLocationCardClick('Connecting Block')}
                  className="h-[40px] px-4 bg-white rounded-[30px] border border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
                >
                  <span className="text-[14px] font-normal text-black whitespace-nowrap" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Connecting Block
                  </span>
                </button>
              </div>
            </div>

            {/* Map Container */}
            <div className="w-full mb-0 flex justify-center">
              <div className="w-full max-w-[1240px] h-[650px] bg-gray-100 rounded-[30px] border border-gray-200 relative">
                {/* Interactive Map */}
                <div className="absolute inset-0 rounded-[30px] overflow-hidden">
                  <InteractiveMap 
                    className="w-full h-full"
                    searchQuery={routeQuery}
                    onLocationSelect={(location) => {
                      if (location === "Your Location") {
                        setStartLocation("Your Location");
                      } else {
                        setSearchQuery(location);
                      }
                    }}
                    showSearchBar={false}
                  />
                </div>

                {/* View Full Map Button */}
                <div className="absolute bottom-4 right-4 z-[999]">
                  <button 
                    onClick={() => window.open('/navigation/fullmap', '_blank')}
                    className="px-4 py-2 bg-gray-800/90 hover:bg-gray-700/90 text-white rounded-[30px] backdrop-blur-sm transition-colors duration-200 flex items-center gap-2 shadow-lg"
                    style={{ fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 'normal' }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Full Map
                  </button>
                </div>
              </div>
            </div>
          </main>

          {/* Footer */}
          <div className="w-full flex flex-row justify-center items-center mt-28 sm:mt-32 md:mt-36 lg:mt-[140px]">
            <div className="w-full flex flex-col gap-10 sm:gap-12 md:gap-14 lg:gap-[50px] justify-center items-center bg-global-background1 rounded-t-[44px] p-10 sm:p-12 md:p-14 lg:p-[50px] mt-1 sm:mt-2 md:mt-3 lg:mt-[4px]">
              {/* Footer Content */}
              <div className="w-full flex flex-col gap-12 sm:gap-14 md:gap-16 lg:gap-[66px] justify-start items-center">
                {/* Social Icons */}
                <div className="w-full flex flex-row justify-start items-center">
                  <div className="w-full flex flex-row justify-start items-center gap-4 sm:gap-5 md:gap-6 lg:gap-[20px]">
                    {/* Instagram Button */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[60px] lg:h-[60px] bg-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300">
                      <button
                        className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-[40px] lg:h-[40px] flex items-center justify-center rounded-full hover:opacity-80 transition-opacity duration-200"
                        aria-label="Instagram"
                      >
                        <i className="fa-brands fa-instagram text-black text-[30px]"></i>
                      </button>
                    </div>
                    {/* LinkedIn Button */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[60px] lg:h-[60px] bg-white rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300">
                      <button
                        className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-[40px] lg:h-[40px] flex items-center justify-center rounded-full hover:opacity-80 transition-opacity duration-200"
                        aria-label="LinkedIn"
                      >
                        <i className="fa-brands fa-linkedin-in text-black text-[30px]"></i>
                      </button>
                    </div>
                  </div>
                </div>
                {/* Contact Info and Newsletter */}
                <div className="w-full flex flex-col lg:flex-row justify-start items-center gap-8 sm:gap-10 md:gap-12 lg:gap-0">
                  {/* Contact Info */}
                  <div className="w-full lg:w-2/5 flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-[26px] justify-start items-start">
                    <div className="bg-[#f45b6a] rounded-lg px-3 sm:px-4 md:px-5 lg:px-[16px] py-2 sm:py-2.5 md:py-3 lg:py-[8px] inline-block">
                      <span className="text-lg sm:text-xl md:text-2xl lg:text-[20px] font-medium leading-6 sm:leading-7 md:leading-8 lg:leading-[26px] text-left text-white" style={{ borderRadius: '30px', fontFamily: 'Inter, sans-serif' }}>
                        Contact us:
                      </span>
                    </div>
                    <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[20px] justify-start items-start">
                      <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[23px] text-left text-global-text4 " style={{ fontFamily: 'Inter, sans-serif' }}>
                        Email: nsutorbit@gmail.com
                      </p>
                      <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[23px] text-left text-global-text4 " style={{ fontFamily: 'Inter, sans-serif' }}>
                        Phone: 7827044075
                      </p>
                      <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[22px] text-left text-global-text4 " style={{ fontFamily: 'Inter, sans-serif' }}>
                        NSUT, Sector 3, Dwarka,<br />New Delhi - 110078
                      </p>
                    </div>
                  </div>
                  {/* Newsletter Signup */}
                  <div className="w-full lg:flex-1 flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-[20px] justify-center items-center p-8 sm:p-10 md:p-12 lg:p-[40px]">
                    <EditText
                      type="email"
                      placeholder="Email"
                      value={newsletterEmail}
                      onChange={handleNewsletterEmailChange}
                      className="w-full bg-transparent border-2 border-white text-white placeholder:text-white/70 rounded-lg px-4 py-3"
                      style={{ 
                        backgroundColor: 'transparent',
                        borderColor: 'white',
                        color: 'white',
                        borderRadius: '30px'
                      }}
                    />
                    <Button
                      variant="danger"
                      className="w-full sm:w-auto px-6 sm:px-7 md:px-8 lg:px-[34px] py-3 sm:py-3.5 md:py-4 lg:py-[12px] text-lg sm:text-xl md:text-2xl lg:text-[18px] font-medium leading-6 sm:leading-7 md:leading-8 lg:leading-[22px] text-center text-black hover:scale-105 hover:shadow-lg transition-all duration-300"
                      style={{ 
                        backgroundColor: '#f45b6a', 
                        borderRadius: '30px',
                        border: 'none',
                        fontFamily: 'Inter, sans-serif'
                      }}
                      onClick={handleNewsletterSubmit}
                    >
                      Subscribe to news
                    </Button>
                  </div>
                </div>
              </div>
              {/* Footer Bottom */}
              <div className="w-full flex flex-col gap-10 sm:gap-11 md:gap-12 lg:gap-[48px] justify-start items-center">
                <div className="w-full h-[1px] bg-global-text4"></div>
                <div className="w-full flex flex-col sm:flex-row justify-start items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[40px]">
                  <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[23px] text-left text-global-text4" style={{ fontFamily: 'Inter, sans-serif' }}>
                    © 2025 Orbit | All Rights Reserved.
                  </p>
                  <button className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[23px] text-left text-global-text4 underline self-end" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Privacy Policy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationPage;
