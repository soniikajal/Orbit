'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import Button from '../ui/Button';
import SignInButton from '../auth/SignInButton';
import SignOutButton from '../auth/SignOutButton';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const { data: session, status } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [survivalKitOpen, setSurvivalKitOpen] = useState(false);
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const survivalKitRef = useRef<HTMLDivElement>(null);
  const quickLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

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
    <header className={`w-full bg-header-background1 rounded-[30px] p-4 sm:p-6 lg:p-8 mt-8 sm:mt-12 md:mt-16 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'} ${className}`}>
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-0">
          {/* Logo */}
          <div className={`w-full lg:w-auto flex justify-center lg:justify-start transition-all duration-800 ease-out delay-200 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <img 
              src="/images/img_orbit_1.png" 
              alt="NSUT Logo" 
              className="w-[120px] h-[73px] sm:w-[150px] sm:h-[91px] md:w-[180px] md:h-[109px] lg:w-[200px] lg:h-[122px] hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Center Navigation */}
          <nav className={`${menuOpen ? 'block' : 'hidden'} lg:block w-full lg:w-auto transition-all duration-800 ease-out delay-400 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 xl:gap-10">
              {/* Home Menu Item with Active State */}
              <div className="flex flex-col items-center group">
                <button 
                  role="menuitem"
                  className="text-base sm:text-lg md:text-xl font-space-grotesk font-normal text-global-text2 hover:text-global-text3 transition-all duration-300 hover:scale-105"
                >
                  Home
                </button>
                <div className="h-[1px] w-[54px] bg-[#facc6b] mt-1 transition-all duration-300 group-hover:w-[60px]"></div>
              </div>

              <button 
                role="menuitem"
                className="text-base sm:text-lg md:text-xl font-space-grotesk font-normal text-global-text2 hover:text-global-text3 transition-all duration-300 hover:scale-105"
              >
                Navigation
              </button>

              {/* Survival Kit Dropdown */}
              <div className="relative" ref={survivalKitRef}>
                <button 
                  role="menuitem"
                  className="text-base sm:text-lg md:text-xl font-space-grotesk font-normal text-global-text2 hover:text-global-text3 transition-all duration-300 flex items-center gap-1 hover:scale-105"
                  onClick={() => setSurvivalKitOpen(!survivalKitOpen)}
                >
                  Survival Kit
                  <svg 
                    className={`w-4 h-4 transition-all duration-300 ${survivalKitOpen ? 'rotate-180 scale-110' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                {survivalKitOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
                    <div className="py-1">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-all duration-200 hover:translate-x-1"
                        onClick={() => {
                          setSurvivalKitOpen(false);
                          // Add navigation logic here
                        }}
                      >
                        Campus Map
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-all duration-200 hover:translate-x-1"
                        onClick={() => {
                          setSurvivalKitOpen(false);
                          // Add navigation logic here
                        }}
                      >
                        Study Resources
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-all duration-200 hover:translate-x-1"
                        onClick={() => {
                          setSurvivalKitOpen(false);
                          // Add navigation logic here
                        }}
                      >
                        Events
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Links Dropdown */}
              <div className="relative" ref={quickLinksRef}>
                <button 
                  role="menuitem"
                  className="text-base sm:text-lg md:text-xl font-space-grotesk font-normal text-global-text2 hover:text-global-text3 transition-all duration-300 flex items-center gap-1 hover:scale-105"
                  onClick={() => setQuickLinksOpen(!quickLinksOpen)}
                >
                  Quick Links
                  <svg 
                    className={`w-4 h-4 transition-all duration-300 ${quickLinksOpen ? 'rotate-180 scale-110' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* Dropdown Menu */}
                {quickLinksOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
                    <div className="py-1">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-all duration-200 hover:translate-x-1"
                        onClick={() => {
                          setQuickLinksOpen(false);
                          // Add navigation logic here
                        }}
                      >
                        Societies and Clubs
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-all duration-200 hover:translate-x-1"
                        onClick={() => {
                          setQuickLinksOpen(false);
                          // Add navigation logic here
                        }}
                      >
                        CUMS Website
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-all duration-200 hover:translate-x-1"
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
                className="text-base sm:text-lg md:text-xl font-space-grotesk font-normal text-global-text2 hover:text-global-text3 transition-all duration-300 hover:scale-105"
              >
                About Us
              </button>
            </div>
          </nav>

          {/* Auth Buttons - Positioned at extreme right */}
          <div className="lg:ml-auto mt-4 lg:mt-0">
            {status === 'loading' ? (
              <div className="px-6 py-4 text-base font-space-grotesk text-global-text2">
                Loading...
              </div>
            ) : session ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-global-text2 hidden sm:block">
                  Welcome, {session.user?.name?.split(' ')[0]}!
                </span>
                <SignOutButton className="px-4 py-2 text-sm" />
              </div>
            ) : (
              <SignInButton className="px-6 py-4 text-base bg-transparent text-black border border-black font-normal hover:bg-gray-50 transition-all duration-300 hover:scale-105" />
            )}
          </div>

          {/* Hamburger Menu Icon (Mobile only) */}
          <button 
            className="block lg:hidden p-3 text-global-text2 absolute top-4 right-4" 
            aria-label="Open menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
