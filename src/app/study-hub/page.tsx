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
  // Search bar state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [selectedSemester, setSelectedSemester] = useState<number | null>(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.semester-dropdown')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const yearOptions = [
    { id: 1, label: 'Year 1', value: 1, available: true },
    { id: 2, label: 'Year 2', value: 2, available: true },
  ];

  const branchOptions = [
    { id: 'cse', label: 'CSE' },
    { id: 'ece', label: 'ECE' },
    { id: 'it', label: 'IT' },
    { id: 'me', label: 'Mechanical' },
    { id: 'ce', label: 'Civil' },
    { id: 'ee', label: 'Electrical' },
    // Add more branches as needed
  ];

  const [selectedYear, setSelectedYear] = useState<number>(1);
  const [selectedBranch, setSelectedBranch] = useState<string>('cse');

  // Example: Per-semester and per-subject materials (expand as needed)
  // Materials by year and branch (expand as needed)
  const allMaterials: Record<number, Record<string, StudyMaterial[]>> = {
    1: {
      all: [
        { id: 'IEEE', name: 'IEEE pdf', description: 'by IEEE', url: '/IEEE NSUT Resources for the Batch of 2028.pdf', icon: '📝' },
        { id: 'gyansutra', name: 'Gyansutra', description: 'by Nakshatra', url: '/GYANSUTRA.pdf', icon: '📚' },
        { id: 'asme', name: 'ASME', description: 'by ASME', url: 'https://drive.google.com/drive/folders/1PCfGdEsdT8CoA1DjoAbodPdUIIxRXc_o?usp=share_link', icon: '🧮' },
      ]
    },
    2: {
      cse: [
        { id: 'CAO', name: 'CAO', description: ' ', url: 'https://drive.google.com/drive/folders/1WxM_6hWh7-bVbnKn1WedspM2GhKSv-FK?usp=share_link', icon: '🧮' },
        { id: 'daa', name: 'DAA', description: ' ', url: 'https://drive.google.com/drive/folders/1Kn9y7WQVZvmCjtyvYVxukeQLjIVYB5wN?usp=share_link', icon: '�' },
        { id: 'dbms', name: 'DBMS', description: ' ', url: 'https://drive.google.com/drive/folders/12DGCRTRTHmZxsF-jUHFpk95_ugpPm3iA?usp=share_link', icon: '�‍💻' },
        { id: 'os', name: 'OS', description: ' ', url: 'https://drive.google.com/drive/folders/1v-dmD2L03R6o8g7AYwQEe0pyY6206fQk?usp=share_link', icon: '🧮' },
        { id: 'prob', name: 'Stats & Prob', description: ' ', url: 'https://drive.google.com/drive/folders/1kdBap-ebgDR1tmZgq2_QBbBnrg05MxT3?usp=share_link', icon: '�' },
      ],
      me: [
        { id: 'asmesem3', name: 'ASME Sem 3', description: '', url: 'https://drive.google.com/drive/folders/1u4RNW4oVDQ0gj8PiO1v2oqZfeuuEfHsl?usp=share_link', icon: '🧮' },
        { id: 'mpae3', name: 'MPAE Sem 3', description: ' ', url: 'https://drive.google.com/drive/folders/1u78vxUKbzSBPECT8pYh8nvbjnEh5XB26?usp=share_link', icon: '💡' },
        { id: 'mpae4', name: 'MPAE Sem 4', description: ' ', url: 'https://drive.google.com/drive/folders/17u-mSGYUyyWFhj_GBrwPOtkOa6eZV5l0?usp=share_link', icon: '📡' },
      ],
      // Add more branches as needed
    }
  };


  // Contribute Material form state
  const [contributeLink, setContributeLink] = useState('');
  const [contributeDesc, setContributeDesc] = useState('');
  const [contributeSubmitted, setContributeSubmitted] = useState(false);

  // Materials for selected year/branch
  const yearMaterials = selectedYear === 1
    ? allMaterials[1].all
    : (allMaterials[2][selectedBranch] || []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const handleYearSelect = (year: number) => {
    setSelectedYear(year);
    // Reset branch to default when switching year
    if (year === 1) setSelectedBranch('cse');
    // Reset contribute form state
    setContributeLink('');
    setContributeDesc('');
    setContributeSubmitted(false);
  };

  useEffect(() => {
    // Reset contribute form state when branch changes (for Year 2)
    setContributeLink('');
    setContributeDesc('');
    setContributeSubmitted(false);
  }, [selectedBranch]);

  const handleMaterialClick = (material: StudyMaterial) => {
    if (material.url) {
      // Open PDF in new tab for viewing/downloading
      window.open(material.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="w-full flex flex-col justify-start items-end">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-start items-center">
        {/* Hero Section */}
        <div className={`w-full flex flex-col justify-start items-start mt-0 sm:mt-0 md:mt-0 transition-all duration-1500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="w-full flex flex-col justify-start items-start">
            {/* Header Section */}
            <div 
              id="study-hub-header"
              data-animate-on-scroll
              className={`w-full flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-[40px] justify-start items-start transition-all duration-1000 ease-out ${visibleSections.has('study-hub-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              {/* Page Title */}
              <div className="w-full flex flex-col justify-start items-start gap-6 sm:gap-8 md:gap-10 lg:gap-[30px]">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-[97px] text-left text-global-text2 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Study Hub
                </h1>
                {/* Year Selector */}
                <div className="w-full flex flex-row gap-4 mb-4">
                  {yearOptions.map(option => (
                    <button
                      key={option.id}
                      className={`px-6 py-3 rounded-[20px] font-bold text-lg transition-all duration-200 border-2 ${selectedYear === option.value ? 'bg-[#F45B69] text-white border-[#F45B69]' : 'bg-white text-[#F45B69] border-[#F45B69]'}`}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                      onClick={() => handleYearSelect(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {/* Branch Selector (Year 2 only) */}
                {selectedYear === 2 && (
                  <div className="w-full flex flex-wrap gap-2 sm:gap-3 md:gap-4 mb-4">
                    {branchOptions.map(branch => (
                      <button
                        key={branch.id}
                        className={`px-3 sm:px-4 md:px-5 py-2 rounded-[16px] font-medium text-sm sm:text-base transition-all duration-200 border-2 whitespace-nowrap ${selectedBranch === branch.id ? 'bg-[#FACC6B] text-black border-[#FACC6B]' : 'bg-white text-[#F45B69] border-[#F45B69]'}`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        onClick={() => setSelectedBranch(branch.id)}
                      >
                        {branch.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Study Materials Section with Semester Selection */}
            <div 
              id="study-materials"
              data-animate-on-scroll
              className={`w-full flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-[40px] justify-start items-start mt-2 sm:mt-24 md:mt-2 lg:mt-[120px] transition-all duration-1000 ease-out ${visibleSections.has('study-materials') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
           
            
              {/* Materials Grid/Content for all years/branches */}
              {yearMaterials.length > 0 ? (
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-[32px]">
                  {yearMaterials.map((material, index) => (
                    <div
                      key={material.id}
                      className={`w-full flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[20px] justify-start items-start bg-global-background5 border border-global-text2 rounded-[20px] p-6 sm:p-8 md:p-10 lg:p-[40px] cursor-pointer transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl hover:border-[#F45B69] opacity-100 translate-y-0`}
                      style={{ transitionDelay: `${index * 200}ms` }}
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
                        <h5 className="text-xl sm:text-2xl md:text-3xl lg:text-[28px] font-bold leading-6 sm:leading-7 md:leading-8 lg:leading-[34px] text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {material.name}
                        </h5>
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
                          {material.url?.includes('drive.google.com') ? 'Open in Drive →' : 'Download PDF →'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={`w-full flex flex-col justify-center items-center bg-global-background5 border border-global-text2 rounded-[20px] p-8 sm:p-10 md:p-12 lg:p-[60px] transition-all duration-700 ease-out opacity-100 translate-y-0`}>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-[80px] lg:h-[80px] bg-[#FACC6B] rounded-full flex items-center justify-center mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                  </div>
                  <h5 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bold leading-7 sm:leading-8 md:leading-9 lg:leading-[44px] text-center text-global-text2 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>
                    No materials found!
                  </h5>
                  <p className="text-base sm:text-lg md:text-xl lg:text-[16px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[24px] text-center text-global-text2 max-w-lg mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Try another branch or check back later for updates.
                  </p>
                  {/* Contribute Material Form */}
                  <div className="w-full max-w-md mt-8 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col items-center shadow-md">
                    <h6 className="text-lg font-bold mb-2 text-[#F45B69]">Contribute Material</h6>
                    <p className="text-sm text-gray-600 mb-4 text-center">Have useful notes, PDFs, or Drive links for this branch? Share them with the community!</p>
                    <form
                      className="w-full flex flex-col gap-4"
                      onSubmit={e => {
                        e.preventDefault();
                        if (contributeLink && contributeDesc) {
                          setContributeSubmitted(true);
                          setContributeLink('');
                          setContributeDesc('');
                        }
                      }}
                    >
                      <input
                        type="url"
                        required
                        placeholder="Google Drive Link"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#F45B69]"
                        value={contributeLink}
                        onChange={e => setContributeLink(e.target.value)}
                      />
                      <textarea
                        required
                        placeholder="Short description (e.g. subject, type, etc.)"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-[#F45B69]"
                        value={contributeDesc}
                        onChange={e => setContributeDesc(e.target.value)}
                        rows={2}
                      />
                      <button
                        type="submit"
                        className="w-full bg-[#F45B69] text-white font-semibold py-2 rounded-lg hover:bg-[#e04856] transition-all duration-200"
                      >
                        Share Material
                      </button>
                    </form>
                    {contributeSubmitted && (
                      <div className="w-full mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center text-sm">
                        Thank you for contributing! Your link has been submitted for review.
                      </div>
                    )}
                  </div>
                </div>
              )}
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
