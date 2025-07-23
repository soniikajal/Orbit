'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import EditText from '@/components/ui/EditText';
import Button from '@/components/ui/Button';
import Footer from '@/components/layout/Footer';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  branch?: string;
  image?: string;
  linkedin?: string;
  instagram?: string;
}

type TeamCategory = 'development' | 'creative' | 'marketing' | 'academic';

const AboutPage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [activeTeamCategory, setActiveTeamCategory] = useState<TeamCategory>('development');

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

  const teamMembers: Record<TeamCategory, TeamMember[]> = {
    development: [
      {
        id: '0',
        name: 'Kajal Soni',
        position: 'Founder | Full Stack Developer',
        branch: "ICE",
        linkedin: 'www.linkedin.com/in/kajalsoni2006',
        instagram: 'https://www.instagram.com/rustic.reverie_/'
      },
      {
        id: '1',
        name: 'Bhavya Goel',
        position: 'Backend Developer',
        branch: "CSAI",
        linkedin: 'www.linkedin.com/in/bhavya-goel-796848264'
      },
      {
        id: '2',
        name: 'Darshdeep',
        position: 'Backend Developer',
        branch: "IT",
        linkedin: 'https://www.linkedin.com/in/darshdeep-singh-b09678321/',
        instagram: 'https://www.instagram.com/darshdeep101/'
      },
      {
        id: '3',
        name: 'Kushagra Kataria',
        position: 'Full Stack Developer',
        branch: "CSDS",
        linkedin: 'https://www.linkedin.com/in/kushagrakataria',
        instagram: 'https://www.instagram.com/katariakuxh'
      },
      {
        id: '4',
        name: 'Yash Goel',
        position: 'Frontend Developer',
        branch: 'ICE'
      }
    ],
    creative: [
      {
        id: '5',
        name: 'Manik Bhushan',
        position: 'Creative Head',
        branch: 'Mechanical',
        linkedin: 'https://www.linkedin.com/in/manik-bhushan/',
        instagram: 'https://www.instagram.com/maeniikkk/'
      },
      {
        id: '6',
        name: 'Parkhi Mudgal',
        position: 'Graphic Designer',
        branch: 'ICE',
        linkedin: 'Parkhi Mudgal - NSUT\'28 (ICE) | LinkedIn',
        instagram: 'https://www.instagram.com/p_mudgal26/profilecard/?igsh=MWJjN2t3czVzZTVqeA=='
      },
      {
        id: '7',
        name: 'Sakshi Sahu',
        position: 'Graphic Designer',
        branch: 'Mechanical'
      },
      {
        id: '8',
        name: 'Akshat Kashyap',
        position: 'Graphic Designer',
        branch: 'CSDS',
        linkedin: 'https://www.linkedin.com/in/akshatkashyap13/',
        instagram: 'https://www.instagram.com/akshattkashyap'
      },
      {
        id: '9',
        name: 'Ishit Papnai',
        position: 'Video Editor',
        branch: 'ICE',
        linkedin: 'https://www.linkedin.com/in/ishit-papnai-44218b320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
        instagram: 'https://www.instagram.com/papnaishit?igsh=MXJsZnFybDBpajAzZQ=='
      },
      {
        id: '10',
        name: 'Disha',
        position: 'Content Curator',
        branch: 'Biotech',
        linkedin: 'https://www.linkedin.com/in/dishashukla2/',
        instagram: 'https://www.instagram.com/dishaa_shuklaa_/'
      },
      {
        id: '11',
        name: 'Tisha Bansal',
        position: 'Content Curator',
        branch: 'MAC',
        linkedin: 'https://www.linkedin.com/in/tisha-bansal-00322031b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
        instagram: 'https://www.instagram.com/_tishaa_bansal_?igsh=MmhoMHQ4a2g2cnJ6&utm_source=qr'
      },
      {
        id: '12',
        name: 'Aastha Pandey',
        position: 'Content Curator',
        branch: 'ICE'
      }
    ],
    marketing: [
      {
        id: '13',
        name: 'Nikhil Suresh',
        position: 'Marketing Lead',
        branch: 'Mechanical',
        linkedin: 'https://www.linkedin.com/in/nikhil-suresh-ae',
        instagram: 'https://www.instagram.com/nikhilsureshh?igsh=N2syZzU3czdkbDRn&utm_source=qr'
      },
      {
        id: '14',
        name: 'Janvi Agrawal',
        position: 'Marketing',
        branch: 'ECE',
        linkedin: 'www.linkedin.com/in/janvi-agrawal-07b330310',
        instagram: 'https://www.instagram.com/jan.agrawal/'
      }
    ],
    academic: [
      {
        id: '15',
        name: 'N Bahuli Naidu',
        position: 'Academic',
        branch: 'EE',
        instagram: 'https://www.instagram.com/b__ahuli?igsh=NDA4MGRhMXVseGg3'
      },
      {
        id: '16',
        name: 'Saanvi',
        position: 'Academic',
        branch: 'ECE',
        linkedin: 'www.linkedin.com/in/saanvi-s-5504b1352/'
      },
      {
        id: '17',
        name: 'Nandita Mandava',
        position: 'Academic',
        branch: 'CSDS',
        linkedin: 'https://www.linkedin.com/in/nandita-mandava-483253316?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
        instagram: 'https://www.instagram.com/spoutingnansense?igsh=cnUxZGF1N3p3MW12&utm_source=qr'
      },
      {
        id: '18',
        name: 'Phalguni Kaushik',
        position: 'Academic',
        branch: 'Design',
        instagram: 'https://www.instagram.com/phalguni__k/'
      }
    ]
  };
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full flex flex-col justify-start items-end">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-start items-center">
        {/* Hero Section */}
        <div className={`w-full flex flex-col justify-start items-start mt-8 sm:mt-12 md:mt-16 transition-all duration-1500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="w-full flex flex-col justify-start items-start">
            {/* Who are we? Section */}
            <div 
              id="who-are-we"
              data-animate-on-scroll
              className={`w-full flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-[40px] justify-start items-start transition-all duration-1000 ease-out ${visibleSections.has('who-are-we') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              {/* Section Header */}
              <div className="w-full flex flex-col justify-start items-start gap-6 sm:gap-8 md:gap-10 lg:gap-[40px]">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-[97px] text-left text-global-text2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>
                  Who are we?
                </h2>
                <div className="w-full bg-global-background5 border border-global-text2 rounded-[30px] p-8 sm:p-10 md:p-12 lg:p-[50px]">
                  <div className="flex flex-col gap-6 text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-[28px] text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <p>
                      We're just a bunch of NSUT students who started out like everyone else — wide-eyed, slightly terrified, and constantly typing <span className="text-[#F45B69] font-medium">"bhai yeh kaha hota hai?"</span> into group chats at 2 AM.
                    </p>
                    <p>
                      We were hyped about college life... until we actually had to navigate it.
                    </p>
                    <p>
                      Lecture halls were a maze. Tutorials made zero sense. Every senior had a different version of what happens in labs. Notes? Scattered across ten random Google Drives. Societies? A mysterious multiverse. Campus map? Might as well have been a treasure hunt. And those late-night brainwaves? Often discarded — not for lack of passion, but because we couldn't find teammates to build with.
                    </p>
                    <p>
                      Basically, being a fresher felt like a full-blown survival game.
                    </p>
                    <p>
                      So in 2025, somewhere between missed lectures, chai breaks, and chaotic group chats, a few slightly sleep-deprived but deeply motivated students decided:
                    </p>
                    <p className="text-[#F45B69] font-medium text-lg sm:text-xl md:text-2xl lg:text-[20px]">
                      "Let's just build what we wish we had in first year."
                    </p>
                    <p>
                      What started as a simple idea (and a lot of overthinking) turned into something bigger — NSUT Orbit — a one-stop platform to help freshers not just survive, but thrive.
                    </p>
                    <p>
                      It's not just a tool. It's your digital campus buddy — bringing together everything from maps and study resources to lab info, society guides, events, and even Launchpad — a space to find like-minded folks who actually want to brainstorm, build, and vibe with your vision.
                    </p>
                    <p className="font-medium">Born out of chaos.</p>
                    <p className="font-medium">Built with love.</p>
                    <p className="font-medium">Powered by students.</p>
                    <p>
                      And now — here to make your NSUT journey <span className="text-[#F45B69] font-medium">a little less "wtf?" and a lot more "got this."</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Mission Section */}
            <div 
              id="our-mission"
              data-animate-on-scroll
              className={`w-full flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-[40px] justify-start items-start mt-20 sm:mt-24 md:mt-28 lg:mt-[120px] transition-all duration-1000 ease-out ${visibleSections.has('our-mission') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              {/* Section Header */}
              <div className="w-full flex flex-col justify-start items-start gap-6 sm:gap-8 md:gap-10 lg:gap-[40px]">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-[97px] text-left text-global-text2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>
                  Our Mission
                </h2>
                <div className="w-full bg-global-background5 border border-global-text2 rounded-[30px] p-8 sm:p-10 md:p-12 lg:p-[50px]">
                  <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-[28px] text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Let's be honest: college is chaotic. From accidentally ending up in the wrong block to Googling "how to survive engineering without a mental breakdown?", college hits like a whirlwind. That's where we come in. At Orbit, our mission is to make sure you don't have to suffer like we did. We're here to simplify the mess, connect the dots, and be the all-in-one guide we wish we had when we first stepped onto campus.
                  </p>
                </div>
              </div>

              {/* Mission Points Grid */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-[40px] mt-8">
                {/* Simplify Navigation */}
                <div className={`w-full flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[16px] justify-start items-start bg-global-background5 border border-global-text2 rounded-[30px] p-6 sm:p-8 md:p-10 lg:p-[40px] transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl ${visibleSections.has('our-mission') ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-8'}`}>
                  <div className="w-12 h-12 bg-[#F45B69] rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[28px] font-semibold leading-7 sm:leading-8 md:leading-9 lg:leading-[34px] text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Simplify Navigation
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[16px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[24px] text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Lost? Finding your way at NSUT shouldn't feel like solving a maze. We help you locate your classes, labs, chai spots — and yes, even that one obscure seminar hall everyone keeps mentioning.
                  </p>
                </div>

                {/* Support Learning */}
                <div className={`w-full flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[16px] justify-start items-start bg-global-background5 border border-global-text2 rounded-[30px] p-6 sm:p-8 md:p-10 lg:p-[40px] transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl ${visibleSections.has('our-mission') ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-8'}`}>
                  <div className="w-12 h-12 bg-[#FACC6B] rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[28px] font-semibold leading-7 sm:leading-8 md:leading-9 lg:leading-[34px] text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Support Learning
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[16px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[24px] text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Study, but make it make sense. Get access to curated notes, previous year papers, toppers' secrets (maybe), and study hacks.
                  </p>
                </div>

                {/* Find Your People */}
                <div className={`w-full flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[16px] justify-start items-start bg-global-background5 border border-global-text2 rounded-[30px] p-6 sm:p-8 md:p-10 lg:p-[40px] transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl ${visibleSections.has('our-mission') ? 'opacity-100 translate-y-0 delay-400' : 'opacity-0 translate-y-8'}`}>
                  <div className="w-12 h-12 bg-[#114B5F] rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[28px] font-semibold leading-7 sm:leading-8 md:leading-9 lg:leading-[34px] text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Find Your People
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[16px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[24px] text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    From societies to secret jam rooms, we help you discover where you fit in. Whether you're an introvert, extrovert, or just here for the memes, there's a space for you.
                  </p>
                </div>

                {/* Foster Innovation */}
                <div className={`w-full flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[16px] justify-start items-start bg-global-background5 border border-global-text2 rounded-[30px] p-6 sm:p-8 md:p-10 lg:p-[40px] transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl ${visibleSections.has('our-mission') ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-8'}`}>
                  <div className="w-12 h-12 bg-[#E4FDE1] border border-global-text2 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-[28px] font-semibold leading-7 sm:leading-8 md:leading-9 lg:leading-[34px] text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Foster Innovation
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg lg:text-[16px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[24px] text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Big ideas need more than caffeine. We're building platforms (like Launchpad) where student entrepreneurs, builders, and dreamers can create magic — supported by resources and mentorship.
                  </p>
                </div>
              </div>
            </div>

            {/* Meet the Team Section */}
            <div 
              id="meet-the-team"
              data-animate-on-scroll
              className={`w-full flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-[50px] justify-center items-center mt-20 sm:mt-24 md:mt-28 lg:mt-[120px] transition-all duration-1000 ease-out ${visibleSections.has('meet-the-team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              {/* Section Header */}
              <div className="w-full flex flex-col justify-start items-start gap-6 sm:gap-8 md:gap-10 lg:gap-[30px]">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-[97px] text-left text-global-text2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>
                  Meet the <span className="text-[#F45B69]">Team</span>
                </h2>
              </div>

              {/* Team Category Buttons */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-[20px]">
                <button
                  onClick={() => setActiveTeamCategory('development')}
                  className={`px-6 sm:px-8 md:px-10 lg:px-[40px] py-3 sm:py-4 md:py-5 lg:py-[16px] text-base sm:text-lg md:text-xl lg:text-[18px] font-medium leading-6 sm:leading-7 md:leading-8 lg:leading-[22px] rounded-full transition-all duration-300 ${
                    activeTeamCategory === 'development'
                      ? 'bg-[#F45B69] text-white shadow-[0px_4px_0px_#000000]'
                      : 'bg-global-background5 text-global-text2 border border-global-text2 hover:bg-[#F45B69] hover:text-white'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Development Team
                </button>
                <button
                  onClick={() => setActiveTeamCategory('creative')}
                  className={`px-6 sm:px-8 md:px-10 lg:px-[40px] py-3 sm:py-4 md:py-5 lg:py-[16px] text-base sm:text-lg md:text-xl lg:text-[18px] font-medium leading-6 sm:leading-7 md:leading-8 lg:leading-[22px] rounded-full transition-all duration-300 ${
                    activeTeamCategory === 'creative'
                      ? 'bg-[#F45B69] text-white shadow-[0px_4px_0px_#000000]'
                      : 'bg-global-background5 text-global-text2 border border-global-text2 hover:bg-[#F45B69] hover:text-white'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Creative Team
                </button>
                <button
                  onClick={() => setActiveTeamCategory('marketing')}
                  className={`px-6 sm:px-8 md:px-10 lg:px-[40px] py-3 sm:py-4 md:py-5 lg:py-[16px] text-base sm:text-lg md:text-xl lg:text-[18px] font-medium leading-6 sm:leading-7 md:leading-8 lg:leading-[22px] rounded-full transition-all duration-300 ${
                    activeTeamCategory === 'marketing'
                      ? 'bg-[#F45B69] text-white shadow-[0px_4px_0px_#000000]'
                      : 'bg-global-background5 text-global-text2 border border-global-text2 hover:bg-[#F45B69] hover:text-white'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Marketing Team
                </button>
                <button
                  onClick={() => setActiveTeamCategory('academic')}
                  className={`px-6 sm:px-8 md:px-10 lg:px-[40px] py-3 sm:py-4 md:py-5 lg:py-[16px] text-base sm:text-lg md:text-xl lg:text-[18px] font-medium leading-6 sm:leading-7 md:leading-8 lg:leading-[22px] rounded-full transition-all duration-300 ${
                    activeTeamCategory === 'academic'
                      ? 'bg-[#F45B69] text-white shadow-[0px_4px_0px_#000000]'
                      : 'bg-global-background5 text-global-text2 border border-global-text2 hover:bg-[#F45B69] hover:text-white'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Academic Resources
                </button>
              </div>

              {/* Team Members Grid */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-[30px] mt-8">
                {teamMembers[activeTeamCategory].map((member, index) => (
                  <div
                    key={member.id}
                    className={`w-full flex flex-col justify-start items-center bg-white border border-gray-300 rounded-[20px] p-6 transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Member Image */}
                    <div className="w-full aspect-square bg-gray-200 rounded-[15px] mb-4 overflow-hidden">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                      )}
                    </div>
                    
                    {/* Member Info */}
                    <div className="w-full text-center">
                      <h4 className="text-lg font-bold text-black mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {member.name} | <span className="text-gray-600 font-normal">{member.branch}</span>
                      </h4>
                      <p className="text-sm text-gray-700 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {member.position}
                      </p>
                      
                      {/* Social Media Links - LinkedIn and Instagram only */}
                      <div className="flex justify-center gap-3">
                        {member.linkedin && (
                          <a
                            href={member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                          </a>
                        )}
                        {member.instagram && (
                          <a
                            href={member.instagram.startsWith('http') ? member.instagram : `https://${member.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <Footer />
          </div>
        </div>

        {/* Scroll to Top Arrow */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 w-12 h-12 bg-[#f4c430] hover:bg-[#e6b52a] text-black rounded-full shadow-lg hover:shadow-xl transition-all duration-500 ease-out transform hover:scale-110 z-50 flex items-center justify-center ${
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

export default AboutPage;
