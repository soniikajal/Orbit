'use client';
import React, { useState, useEffect, useRef, memo } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import SignInButton from '../auth/SignInButton';
import SignOutButton from '../auth/SignOutButton';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = memo(({ className = '' }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const router = useRouter();
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
      // Close mobile menu when clicking outside
      const target = event.target as HTMLElement;
      if (menuOpen && !target.closest('.mobile-menu-container') && !target.closest('button[aria-label="Open menu"]')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className={`w-full bg-header-background1 rounded-[30px] p-3 sm:p-4 md:p-6 lg:p-8 mt-2 sm:mt-2 md:mt-2 transition-all duration-1000 ease-out relative z-50 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'} ${className}`}>
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-row justify-between items-center min-h-[60px] sm:min-h-[70px] md:min-h-[80px]">
          {/* Logo - Always visible on left */}
          <div className={`flex-shrink-0 flex items-center gap-1 sm:gap-2 transition-all duration-800 ease-out delay-200 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <Link href="/">
              <img 
                src="/images/img_orbit_2.png" 
                alt="Orbit Logo" 
                className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] lg:w-[114px] lg:h-[114px] hover:scale-105 transition-transform duration-300 cursor-pointer" 
              />
            </Link>
            <Link href="/">
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 700,
                  fontSize: 'clamp(18px, 5vw, 35px)',
                  color: '#262626',
                  letterSpacing: 0
                }}
                className="select-none cursor-pointer hover:opacity-80 transition-opacity duration-300"
              >
                Orbit
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Menu - Hidden on mobile */}
          <nav className="hidden lg:flex flex-1 justify-center transition-all duration-800 ease-out delay-400" style={{ marginLeft: '30px', marginRight: '0px' }}>
            <div className="flex flex-row items-center gap-8 xl:gap-10">
              {/* Home Menu Item with Active State */}
              <div className="flex flex-col items-center group">
                <Link href="/">
                  <button 
                    role="menuitem"
                    className="text-[20px] font-space-grotesk font-normal text-global-text2 hover:text-global-text3 transition-all duration-300 hover:scale-105 items-center leading-[68px]"
                  >
                    Home
                  </button>
                </Link>
                <div className={`h-[1px] bg-[#facc6b] m-0 p-0 transition-all duration-300 group-hover:w-[60px] ${pathname === '/' ? 'w-[60px]' : 'w-0'}`}></div>
              </div>

              {/* Navigation Menu Item with Active State */}
              <div className="flex flex-col items-center group">
                <Link href="/navigation">
                  <button 
                    role="menuitem"
                    className="text-[20px] font-space-grotesk font-normal text-global-text2 hover:text-global-text3 transition-all duration-300 hover:scale-105 items-center leading-[68px]"
                  >
                    Navigation
                  </button>
                </Link>
                <div className={`h-[1px] bg-[#facc6b] m-0 p-0 transition-all duration-300 group-hover:w-[100px] ${pathname === '/navigation' ? 'w-[100px]' : 'w-0'}`}></div>
              </div>

              {/* Survival Kit Dropdown */}
              <div className="relative" ref={survivalKitRef}>
                <button 
                  role="menuitem"
                  className="text-[20px] font-space-grotesk font-normal text-global-text2 hover:text-global-text3 transition-all duration-300 flex items-center gap-1 hover:scale-105 leading-[68px]"
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
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[100] animate-in fade-in-0 zoom-in-95 duration-200">
                    <div className="py-2">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-all duration-200 hover:translate-x-1"
                        onClick={() => {
                          setSurvivalKitOpen(false);
                          router.push('/study-hub');
                        }}
                      >
                        Study Hub
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-all duration-200 hover:translate-x-1"
                        onClick={() => {
                          setSurvivalKitOpen(false);
                          router.push('/event-board');
                        }}
                      >
                        Event Board
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-all duration-200 hover:translate-x-1"
                        onClick={() => {
                          setSurvivalKitOpen(false);
                          router.push('/Launchpad');
                        }}
                      >
                        Launchpad
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-all duration-200 hover:translate-x-1"
                        onClick={() => {
                          setSurvivalKitOpen(false);
                          router.push('/phonebook');
                        }}
                      >
                        Phonebook
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Links Dropdown */}
              <div className="relative" ref={quickLinksRef}>
                <button 
                  role="menuitem"
                  className="text-[20px] font-space-grotesk font-normal text-global-text2 hover:text-global-text3 transition-all duration-300 flex items-center gap-1 hover:scale-105 leading-[68px]"
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
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[100] animate-in fade-in-0 zoom-in-95 duration-200">
                    <div className="py-2">
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-all duration-200 hover:translate-x-1"
                        onClick={() => {
                          setQuickLinksOpen(false);
                          window.open('http://nsut.ac.in/en/curriculam-information', '_blank');
                        }}
                      >
                        Course Curriculum
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-all duration-200 hover:translate-x-1"
                        onClick={() => {
                          setQuickLinksOpen(false);
                          window.open('/Academic calender .pdf', '_blank');
                        }}
                      >
                        Academic Calendar
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-all duration-200 hover:translate-x-1"
                        onClick={() => {
                          setQuickLinksOpen(false);
                          window.open('http://nsut.ac.in/en/for-students/existing-students/co-curricular-activities-societies-and-clubs', '_blank');
                        }}
                      >
                        Societies and Clubs
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-all duration-200 hover:translate-x-1"
                        onClick={() => {
                          setQuickLinksOpen(false);
                          window.open('https://www.imsnsit.org/imsnsit/', '_blank');
                        }}
                      >
                        CUMS Website
                      </button>
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-global-text2 hover:bg-gray-100 hover:text-global-text3 transition-all duration-200 hover:translate-x-1"
                        onClick={() => {
                          setQuickLinksOpen(false);
                          router.push('/timetable');
                        }}
                      >
                        Time Table
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* About Us Menu Item with Active State */}
              <div className="flex flex-col items-center group">
                <Link href="/about">
                  <button 
                    role="menuitem"
                    className={`text-[20px] font-space-grotesk font-normal transition-all duration-300 hover:scale-105 items-center leading-[68px] ${pathname === '/' ? 'text-white' : 'text-global-text2'} hover:text-global-text3`}
                  >
                    About Us
                  </button>
                </Link>
                <div className={`h-[1px] bg-[#facc6b] m-0 p-0 transition-all duration-300 group-hover:w-[80px] ${pathname === '/about' ? 'w-[80px]' : 'w-0'}`}></div>
              </div>
            </div>
          </nav>

          {/* Right side - Auth Button and Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {/* Auth Button - Always visible */}
            <div className="flex-shrink-0">
              {status === 'loading' ? (
                <div className="px-3 py-2 sm:px-4 sm:py-2 md:px-6 md:py-4 text-sm sm:text-base md:text-base font-space-grotesk text-global-text2">
                  Loading...
                </div>
              ) : session ? (
                <SignOutButton className="px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-4 text-sm sm:text-base md:text-base bg-white text-black border border-black font-normal hover:bg-gray-50 transition-all duration-300 hover:scale-105 rounded-[20px] sm:rounded-[25px] md:rounded-[30px]" />
              ) : (
                <SignInButton className={`px-4 py-2 sm:px-5 sm:py-3 md:px-8 md:py-4 lg:px-12 lg:py-5 text-sm sm:text-base md:text-lg lg:text-[20px] font-normal transition-all duration-300 rounded-[20px] sm:rounded-[25px] md:rounded-[30px] bg-transparent border min-w-[100px] sm:min-w-[120px] md:min-w-[160px] lg:min-w-[195px] text-center ${pathname === '/' ? 'text-white border-white hover:bg-white hover:text-black' : 'text-black border-[#262626] hover:bg-[#262626] hover:text-white'}`} />
              )}
            </div>

            {/* Hamburger Menu Icon (Mobile only) */}
            <button 
              className="flex lg:hidden p-2 text-global-text2 hover:bg-gray-100 rounded-lg transition-all duration-200" 
              aria-label="Open menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {menuOpen && (
          <div className="lg:hidden mt-4 p-4 bg-white border border-gray-200 rounded-xl shadow-lg mobile-menu-container animate-in fade-in-0 slide-in-from-top-2 duration-200">
            <nav className="flex flex-col gap-2">
              <Link href="/" onClick={() => setMenuOpen(false)}>
                <button className={`w-full text-left py-3 px-4 rounded-lg text-base font-space-grotesk transition-all duration-200 ${pathname === '/' ? 'bg-[#facc6b] text-black font-medium' : 'text-global-text2 hover:bg-gray-100'}`}>
                  Home
                </button>
              </Link>
              <Link href="/navigation" onClick={() => setMenuOpen(false)}>
                <button className={`w-full text-left py-3 px-4 rounded-lg text-base font-space-grotesk transition-all duration-200 ${pathname === '/navigation' ? 'bg-[#facc6b] text-black font-medium' : 'text-global-text2 hover:bg-gray-100'}`}>
                  Navigation
                </button>
              </Link>
              <Link href="/study-hub" onClick={() => setMenuOpen(false)}>
                <button className={`w-full text-left py-3 px-4 rounded-lg text-base font-space-grotesk transition-all duration-200 ${pathname === '/study-hub' ? 'bg-[#facc6b] text-black font-medium' : 'text-global-text2 hover:bg-gray-100'}`}>
                  Study Hub
                </button>
              </Link>
              <Link href="/event-board" onClick={() => setMenuOpen(false)}>
                <button className={`w-full text-left py-3 px-4 rounded-lg text-base font-space-grotesk transition-all duration-200 ${pathname === '/event-board' ? 'bg-[#facc6b] text-black font-medium' : 'text-global-text2 hover:bg-gray-100'}`}>
                  Event Board
                </button>
              </Link>
              <Link href="/Launchpad" onClick={() => setMenuOpen(false)}>
                <button className={`w-full text-left py-3 px-4 rounded-lg text-base font-space-grotesk transition-all duration-200 ${pathname === '/Launchpad' ? 'bg-[#facc6b] text-black font-medium' : 'text-global-text2 hover:bg-gray-100'}`}>
                  Launchpad
                </button>
              </Link>
              <Link href="/phonebook" onClick={() => setMenuOpen(false)}>
                <button className={`w-full text-left py-3 px-4 rounded-lg text-base font-space-grotesk transition-all duration-200 ${pathname === '/phonebook' ? 'bg-[#facc6b] text-black font-medium' : 'text-global-text2 hover:bg-gray-100'}`}>
                  Phonebook
                </button>
              </Link>
              <button 
                className="w-full text-left py-3 px-4 rounded-lg text-base font-space-grotesk text-global-text2 hover:bg-gray-100 transition-all duration-200"
                onClick={() => {
                  setMenuOpen(false);
                  window.open('http://nsut.ac.in/en/curriculam-information', '_blank');
                }}
              >
                Course Curriculum
              </button>
              <button 
                className="w-full text-left py-3 px-4 rounded-lg text-base font-space-grotesk text-global-text2 hover:bg-gray-100 transition-all duration-200"
                onClick={() => {
                  setMenuOpen(false);
                  window.open('/Academic calender .pdf', '_blank');
                }}
              >
                Academic Calendar
              </button>
              <button 
                className="w-full text-left py-3 px-4 rounded-lg text-base font-space-grotesk text-global-text2 hover:bg-gray-100 transition-all duration-200"
                onClick={() => {
                  setMenuOpen(false);
                  window.open('http://nsut.ac.in/en/for-students/existing-students/co-curricular-activities-societies-and-clubs', '_blank');
                }}
              >
                Societies and Clubs
              </button>
              <button 
                className="w-full text-left py-3 px-4 rounded-lg text-base font-space-grotesk text-global-text2 hover:bg-gray-100 transition-all duration-200"
                onClick={() => {
                  setMenuOpen(false);
                  window.open('https://www.imsnsit.org/imsnsit/', '_blank');
                }}
              >
                CUMS Website
              </button>
              <Link href="/timetable" onClick={() => setMenuOpen(false)}>
                <button className={`w-full text-left py-3 px-4 rounded-lg text-base font-space-grotesk transition-all duration-200 ${pathname === '/timetable' ? 'bg-[#facc6b] text-black font-medium' : 'text-global-text2 hover:bg-gray-100'}`}>
                  Time Table
                </button>
              </Link>
              <Link href="/about" onClick={() => setMenuOpen(false)}>
                <button className={`w-full text-left py-3 px-4 rounded-lg text-base font-space-grotesk transition-all duration-200 ${pathname === '/about' ? 'bg-[#facc6b] text-black font-medium' : 'text-global-text2 hover:bg-gray-100'}`}>
                  About Us
                </button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
});

Header.displayName = 'Header';

export default Header;