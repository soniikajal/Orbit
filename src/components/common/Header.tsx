'use client';
import React, { useState } from 'react';
import Button from '../ui/Button';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const [menuOpen, setMenuOpen] = useState(false);

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
                  <div className="h-[1px] w-[54px] bg-header-background1 mt-1"></div>
                </div>

                <button 
                  role="menuitem"
                  className="text-base sm:text-lg md:text-xl font-space-grotesk font-normal text-global-text2 hover:text-global-text3 transition-colors duration-200"
                >
                  Navigation
                </button>

                <button 
                  role="menuitem"
                  className="text-base sm:text-lg md:text-xl font-space-grotesk font-normal text-global-text2 hover:text-global-text3 transition-colors duration-200"
                >
                  Survival Kit ↓
                </button>

                <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8 xl:gap-10">
                  <button 
                    role="menuitem"
                    className="text-base sm:text-lg md:text-xl font-space-grotesk font-normal text-global-text2 hover:text-global-text3 transition-colors duration-200"
                  >
                    Quick Links ↓
                  </button>

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