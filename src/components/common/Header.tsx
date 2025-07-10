'use client';
import React, { useState, useEffect, useRef } from 'react';
import Button from '../ui/Button';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [survivalKitOpen, setSurvivalKitOpen] = useState(false);
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  
  const survivalKitRef = useRef<HTMLDivElement>(null);
  const quickLinksRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (survivalKitRef.current && !survivalKitRef.current.contains(event.target as Node)) {
        setSurvivalKitOpen(false);
      }
      if (quickLinksRef.current && !quickLinksRef.current.contains(event.target as Node)) {
        setQuickLinksOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={`w-full bg-header-background1 rounded-[30px] p-4 sm:p-6 lg:p-8 mt-8 sm:mt-12 md:mt-16 ${className}`}>
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
          {/* Logo */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-start">
            <img 
              src="/images/img_orbit_1.png" 
              alt="NSUT Logo" 
              className="w-[120px] h-[73px] sm:w-[150px] sm:h-[91px] md:w-[180px] md:h-[109px] lg:w-[200px] lg:h-[122px]"
            />
          </div>

          {/* Hamburger Menu Icon (Mobile only) */}
          <button 
            className="block lg:hidden p-3 text-global-text2" 
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Navigation Menu */}
          <nav className={`${menuOpen ? 'block' : 'hidden'} lg:block w-full lg:w-auto`}>
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 xl:gap-10">
              {/* Main Navigation */}
              <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 xl:gap-10">
                {/* Home Menu Item with Active State */}
                <div className="flex flex-col items-center group">
                  <button 
                    role="menuitem"
                    className="text-base sm:text-lg md:text-xl font-space-grotesk font-normal text-global-text2 hover:text-global-text3 transition-colors duration-200"
                  >
                    Home
                  </button>
                  <div className="h-[1px] w-[54px] bg-[#facc6b] mt-1"></div>
                </div>

                <button 
                  role="menuitem"
                  className="text-base sm:text-lg md:text-xl font-space-grotesk font-normal text-global-text2 hover:text-global-text3 transition-colors duration-200"
                >
                  Navigation
                </button>

                {/* Survival Kit Dropdown */}
                <div className="relative" ref={survivalKitRef}>
                  <button 
                    role="menuitem"
                    className="text-base sm:text-lg md:text-xl font-space-grotesk font-normal text-global-text2 hover:text-global-text3 transition-colors duration-200 flex items-center gap-1"
                    onClick={() => setSurvivalKitOpen(!survivalKitOpen)}
                  >
                    Survival Kit
                    <svg 
                      className={`w-4 h-4 transition-transform duration-200 ${survivalKitOpen ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {survivalKitOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      <div className="py-2">
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-colors duration-200"
                          onClick={() => {
                            setSurvivalKitOpen(false);
                            // Add navigation logic here
                          }}
                        >
                          Study Hub
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-colors duration-200"
                          onClick={() => {
                            setSurvivalKitOpen(false);
                            // Add navigation logic here
                          }}
                        >
                          Event Board
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-colors duration-200"
                          onClick={() => {
                            setSurvivalKitOpen(false);
                            // Add navigation logic here
                          }}
                        >
                          Launchpad
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-colors duration-200"
                          onClick={() => {
                            setSurvivalKitOpen(false);
                            // Add navigation logic here
                          }}
                        >
                          Phonebook
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 xl:gap-10">
                  {/* Quick Links Dropdown */}
                  <div className="relative" ref={quickLinksRef}>
                    <button 
                      role="menuitem"
                      className="text-base sm:text-lg md:text-xl font-space-grotesk font-normal text-global-text2 hover:text-global-text3 transition-colors duration-200 flex items-center gap-1"
                      onClick={() => setQuickLinksOpen(!quickLinksOpen)}
                    >
                      Quick Links
                      <svg 
                        className={`w-4 h-4 transition-transform duration-200 ${quickLinksOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    
                    {/* Dropdown Menu */}
                    {quickLinksOpen && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                        <div className="py-2">
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-colors duration-200"
                            onClick={() => {
                              setQuickLinksOpen(false);
                              // Add navigation logic here
                            }}
                          >
                            Academic Calendar
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-colors duration-200"
                            onClick={() => {
                              setQuickLinksOpen(false);
                              // Add navigation logic here
                            }}
                          >
                            Societies and Clubs
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-colors duration-200"
                            onClick={() => {
                              setQuickLinksOpen(false);
                              // Add navigation logic here
                            }}
                          >
                            CUMS Website
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-colors duration-200"
                            onClick={() => {
                              setQuickLinksOpen(false);
                              // Add navigation logic here
                            }}
                          >
                            Time Table
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <button 
                    role="menuitem"
                    className="text-base sm:text-lg md:text-xl font-space-grotesk font-normal text-global-text2 hover:text-global-text3 transition-colors duration-200"
                  >
                    About Us
                  </button>
                </div>
              </div>

              {/* Login/Signup Button */}
              <div className="mt-4 lg:mt-0">
                <Button
                  variant="outline"
                  className="px-6 py-4 sm:px-7 sm:py-5 md:px-8 md:py-5 text-base sm:text-lg md:text-xl font-space-grotesk font-normal text-global-text2 border border-global-text2 rounded-xl sm:rounded-2xl hover:bg-global-background2 transition-all duration-200"
                >
                  Login/Signup
                </Button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;