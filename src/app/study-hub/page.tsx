'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import EditText from '@/components/ui/EditText';

interface SemesterOption {
  id: number;
  label: string;
  value: number;
  available: boolean;
}

interface StudyMaterial {
  id: string;
  name: string;
  description: string;
  url?: string;
  icon: string;
}

const StudyHubPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(1);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set(prev).add(entry.target.id));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const sections = document.querySelectorAll('[data-animate-on-scroll]');
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    // Handle scroll-to-top arrow visibility
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const semesterOptions: SemesterOption[] = [
    { id: 1, label: 'Semester 1', value: 1, available: true },
    { id: 2, label: 'Semester 2', value: 2, available: true },
    { id: 3, label: 'Semester 3', value: 3, available: false },
    { id: 4, label: 'Semester 4', value: 4, available: false },
    { id: 5, label: 'Semester 5', value: 5, available: false },
    { id: 6, label: 'Semester 6', value: 6, available: false },
    { id: 7, label: 'Semester 7', value: 7, available: false },
    { id: 8, label: 'Semester 8', value: 8, available: false },
  ];

  const studyMaterials: StudyMaterial[] = [
    {
      id: 'gyansutra',
      name: 'Gyansutra',
      description: 'Comprehensive study materials, notes, and resources curated by seniors and faculty for foundational engineering subjects.',
      url: '/GYANSUTRA.pdf',
      icon: '📚'
    },
    {
      id: 'ieee',
      name: 'IEEE NSUT Resources',
      description: 'Technical papers, research materials, and engineering resources from IEEE specifically curated for NSUT students.',
      url: '/IEEE NSUT Resources for the Batch of 2028.pdf',
      icon: '⚡'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSemesterSelect = (semester: number) => {
    console.log('Semester selected:', semester);
    setSelectedSemester(semester);
  };

  const handleMaterialClick = (material: StudyMaterial) => {
    if (material.url) {
      // Open PDF in new tab for viewing/downloading
      window.open(material.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleNewsletterEmailChange = (value: string | React.ChangeEvent<HTMLInputElement>) => {
    const stringValue = typeof value === 'string' ? value : value.target.value;
    setNewsletterEmail(stringValue);
  };

  const handleNewsletterSubmit = () => {
    console.log('Newsletter subscription:', newsletterEmail);
    setNewsletterEmail('');
  };

  return (
    <div className="w-full flex flex-col justify-start items-end">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-start items-center">
        {/* Hero Section */}
        <div className={`w-full flex flex-col justify-start items-start mt-8 sm:mt-12 md:mt-16 transition-all duration-1500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="w-full flex flex-col justify-start items-start">
            {/* Header Section */}
            <div 
              id="study-hub-header"
              data-animate-on-scroll
              className={`w-full flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-[40px] justify-start items-start transition-all duration-1000 ease-out ${visibleSections.has('study-hub-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              {/* Page Title */}
              <div className="w-full flex flex-col justify-start items-start gap-6 sm:gap-8 md:gap-10 lg:gap-[30px]">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-[97px] text-left text-global-text2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>
                  Study Hub
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[48px] font-normal leading-8 sm:leading-9 md:leading-10 lg:leading-[58px] text-left text-global-text2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Your <span className="text-[#F45B69]">academic companion</span> for success
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-[28px] text-left text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Access curated study materials, notes, and resources from seniors and faculty. Find everything you need to excel in your academics, organized by semester and subject.
                </p>
              </div>
            </div>

            {/* Semester Selection Section */}
            <div 
              id="semester-selection"
              data-animate-on-scroll
              className={`w-full flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-[40px] justify-start items-start mt-20 sm:mt-24 md:mt-28 lg:mt-[120px] transition-all duration-1000 ease-out ${visibleSections.has('semester-selection') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              {/* Section Header */}
              <div className="w-full flex flex-col justify-start items-start gap-6 sm:gap-8 md:gap-10 lg:gap-[30px]">
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-bold leading-8 sm:leading-10 md:leading-12 lg:leading-[73px] text-left text-global-text2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>
                  Select Your <span className="text-[#F45B69]">Semester</span>
                </h3>
                <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-[28px] text-left text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Choose your current semester to access relevant study materials and resources.
                </p>
              </div>

              {/* Semester Grid */}
              <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-[24px]">
                {semesterOptions.map((semester, index) => (
                  <div
                    key={semester.id}
                    className={`w-full flex flex-col justify-center items-center border rounded-[20px] p-4 sm:p-6 md:p-8 lg:p-[32px] cursor-pointer transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl ${
                      selectedSemester === semester.value 
                        ? 'bg-[#F45B69] border-[#F45B69] text-white shadow-lg' 
                        : 'bg-global-background5 border-global-text2 hover:border-[#F45B69] hover:bg-white'
                    } ${visibleSections.has('semester-selection') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: visibleSections.has('semester-selection') ? `${index * 100}ms` : '0ms' }}
                    onClick={() => handleSemesterSelect(semester.value)}
                  >
                    <h4 className={`text-xl sm:text-2xl md:text-3xl lg:text-[28px] font-bold leading-6 sm:leading-7 md:leading-8 lg:leading-[34px] text-center mb-2 ${
                      selectedSemester === semester.value ? 'text-white' : 'text-global-text2'
                    }`} style={{ fontFamily: 'Inter, sans-serif' }}>
                      {semester.value}
                    </h4>
                    <p className={`text-sm sm:text-base md:text-lg lg:text-[14px] font-medium leading-4 sm:leading-5 md:leading-6 lg:leading-[18px] text-center ${
                      selectedSemester === semester.value ? 'text-white' : 'text-global-text2'
                    }`} style={{ fontFamily: 'Inter, sans-serif' }}>
                      Semester
                    </p>
                    {!semester.available && (
                      <span className={`text-xs sm:text-sm md:text-base lg:text-[12px] font-normal leading-3 sm:leading-4 md:leading-5 lg:leading-[15px] text-center mt-2 ${
                        selectedSemester === semester.value ? 'text-white/80' : 'text-gray-500'
                      }`} style={{ fontFamily: 'Inter, sans-serif' }}>
                        Coming Soon
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Study Materials Section */}
            {selectedSemester && (
              <div 
                id="study-materials"
                data-animate-on-scroll
                className={`w-full flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-[40px] justify-start items-start mt-20 sm:mt-24 md:mt-28 lg:mt-[120px] transition-all duration-1000 ease-out ${visibleSections.has('study-materials') ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'}`}
              >
                {/* Section Header */}
                <div className="w-full flex flex-col justify-start items-start gap-6 sm:gap-8 md:gap-10 lg:gap-[30px]">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-bold leading-8 sm:leading-10 md:leading-12 lg:leading-[73px] text-left text-global-text2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>
                    Semester {selectedSemester} <span className="text-[#F45B69]">Materials</span>
                  </h3>
                </div>

                {/* Materials Content */}
                {selectedSemester === 1 || selectedSemester === 2 ? (
                  /* Semester 1 & 2 Materials */
                  <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-[32px]">
                    {studyMaterials.map((material, index) => (
                      <div
                        key={material.id}
                        className={`w-full flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[20px] justify-start items-start bg-global-background5 border border-global-text2 rounded-[20px] p-6 sm:p-8 md:p-10 lg:p-[40px] cursor-pointer transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl hover:border-[#F45B69] opacity-100 translate-y-0`}
                        style={{ transitionDelay: visibleSections.has('study-materials') ? `${index * 200}ms` : '0ms' }}
                        onClick={() => handleMaterialClick(material)}
                      >
                        {/* Material Icon */}
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-[60px] lg:h-[60px] bg-[#F45B69] rounded-full flex items-center justify-center">
                          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[32px]">
                            {material.icon}
                          </span>
                        </div>
                        
                        {/* Material Info */}
                        <div className="w-full flex flex-col gap-2 sm:gap-3 md:gap-4 lg:gap-[12px]">
                          <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-[28px] font-bold leading-6 sm:leading-7 md:leading-8 lg:leading-[34px] text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {material.name}
                          </h4>
                          <p className="text-sm sm:text-base md:text-lg lg:text-[16px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[24px] text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {material.description}
                          </p>
                        </div>

                        {/* Access Button */}
                        <div className="w-full flex justify-start items-center mt-2">
                          <Button
                            variant="secondary"
                            className="px-4 sm:px-5 md:px-6 lg:px-[24px] py-2 sm:py-2.5 md:py-3 lg:py-[8px] text-sm sm:text-base md:text-lg lg:text-[14px] font-medium leading-4 sm:leading-5 md:leading-6 lg:leading-[18px] text-center text-white hover:scale-105 transition-all duration-300"
                            style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#F45B69', borderRadius: '20px', border: 'none' }}
                          >
                            Download PDF →
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Coming Soon for Semesters 3-8 */
                  <div className={`w-full flex flex-col justify-center items-center bg-global-background5 border border-global-text2 rounded-[20px] p-8 sm:p-10 md:p-12 lg:p-[60px] transition-all duration-700 ease-out opacity-100 translate-y-0`}>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[80px] lg:h-[80px] bg-[#FACC6B] rounded-full flex items-center justify-center mb-6">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12,6 12,12 16,14"></polyline>
                      </svg>
                    </div>
                    <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bold leading-7 sm:leading-8 md:leading-9 lg:leading-[44px] text-center text-global-text2 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Coming Soon!
                    </h4>
                    <p className="text-base sm:text-lg md:text-xl lg:text-[16px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[24px] text-center text-global-text2 max-w-lg mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                      We're working hard to bring you comprehensive study materials for Semester {selectedSemester}. Stay tuned for updates!
                    </p>
                    <div className="mt-4">
                      <Button
                        variant="secondary"
                        className="px-6 sm:px-7 md:px-8 lg:px-[32px] py-2 sm:py-2.5 md:py-3 lg:py-[10px] text-sm sm:text-base md:text-lg lg:text-[14px] font-medium leading-4 sm:leading-5 md:leading-6 lg:leading-[18px] text-center text-black hover:scale-105 transition-all duration-300"
                        style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#FACC6B', borderRadius: '20px', border: 'none' }}
                        onClick={() => setSelectedSemester(1)}
                      >
                        View Available Materials
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Features Section */}
            <div 
              id="features"
              data-animate-on-scroll
              className={`w-full flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-[40px] justify-start items-start mt-20 sm:mt-24 md:mt-28 lg:mt-[120px] transition-all duration-1000 ease-out ${visibleSections.has('features') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              {/* Section Header */}
              <div className="w-full flex flex-col justify-start items-start gap-6 sm:gap-8 md:gap-10 lg:gap-[30px]">
                <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-bold leading-8 sm:leading-10 md:leading-12 lg:leading-[73px] text-left text-global-text2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>
                  Why Choose <span className="text-[#F45B69]">Study Hub?</span>
                </h3>
              </div>

              {/* Features Grid */}
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-[40px]">
                {/* Curated Content */}
                <div className={`w-full flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[20px] justify-start items-start bg-global-background5 border border-global-text2 rounded-[30px] p-6 sm:p-8 md:p-10 lg:p-[40px] transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl ${visibleSections.has('features') ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-8'}`}>
                  <div className="w-12 h-12 bg-[#114B5F] rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-[24px] font-bold leading-6 sm:leading-7 md:leading-8 lg:leading-[29px] text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Curated Content
                  </h4>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[16px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[24px] text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Handpicked study materials from top performers and experienced faculty members.
                  </p>
                </div>

                {/* Organized by Semester */}
                <div className={`w-full flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[20px] justify-start items-start bg-global-background5 border border-global-text2 rounded-[30px] p-6 sm:p-8 md:p-10 lg:p-[40px] transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl ${visibleSections.has('features') ? 'opacity-100 translate-y-0 delay-400' : 'opacity-0 translate-y-8'}`}>
                  <div className="w-12 h-12 bg-[#F45B69] rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-[24px] font-bold leading-6 sm:leading-7 md:leading-8 lg:leading-[29px] text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Organized Structure
                  </h4>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[16px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[24px] text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Materials systematically arranged by semester and subject for easy navigation.
                  </p>
                </div>

                {/* Regular Updates */}
                <div className={`w-full flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[20px] justify-start items-start bg-global-background5 border border-global-text2 rounded-[30px] p-6 sm:p-8 md:p-10 lg:p-[40px] transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl ${visibleSections.has('features') ? 'opacity-100 translate-y-0 delay-600' : 'opacity-0 translate-y-8'}`}>
                  <div className="w-12 h-12 bg-[#FACC6B] rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="23,6 13.5,15.5 8.5,10.5 1,18"></polyline>
                      <polyline points="17,6 23,6 23,12"></polyline>
                    </svg>
                  </div>
                  <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-[24px] font-bold leading-6 sm:leading-7 md:leading-8 lg:leading-[29px] text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Regular Updates
                  </h4>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[16px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[24px] text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Fresh content added regularly to keep you updated with the latest curriculum.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div 
          id="footer"
          data-animate-on-scroll
          className={`w-full flex flex-row justify-center items-center mt-28 sm:mt-32 md:mt-36 lg:mt-[140px] transition-all duration-1000 ease-out ${visibleSections.has('footer') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          <div className="w-full flex flex-col gap-10 sm:gap-12 md:gap-14 lg:gap-[50px] justify-center items-center bg-global-background1 rounded-t-[44px] p-10 sm:p-12 md:p-14 lg:p-[50px] mt-1 sm:mt-2 md:mt-3 lg:mt-[4px]">
            {/* Footer Content */}
            <div className="w-full flex flex-col gap-12 sm:gap-14 md:gap-16 lg:gap-[66px] justify-start items-center">
              {/* Social Icons */}
              <div className={`w-full flex flex-row justify-start items-center transition-all duration-800 ease-out delay-200 ${visibleSections.has('footer') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
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

        {/* Scroll to Top Arrow */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 w-14 h-14 bg-[#F45B69] hover:bg-[#e04856] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-500 ease-out transform hover:scale-110 z-50 flex items-center justify-center ${
            showScrollToTop 
              ? 'opacity-100 translate-y-0 pointer-events-auto' 
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          aria-label="Scroll to top"
        >
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="transition-transform duration-300 ease-out"
          >
            <polyline points="18,15 12,9 6,15"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default StudyHubPage;
