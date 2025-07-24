'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import EditText from '@/components/ui/EditText';
import TextArea from '@/components/ui/TextArea';
import Footer from '@/components/layout/Footer';

interface TeamMember {
  id: string;
  name: string;
  position: string;
  experience: string;
  image: string;
}

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const HomePage: React.FC = () => {
  const { data: session } = useSession();
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [feedbackType, setFeedbackType] = useState<'askQuery' | 'leaveFeedback' | 'reportBug'>('askQuery');
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [showBackground, setShowBackground] = useState(true);
  const [backgroundOpacity, setBackgroundOpacity] = useState(1);

  // Effect to prefill form when session loads
  useEffect(() => {
    if (session?.user) {
      setContactForm(prev => ({
        ...prev,
        name: session.user?.name || '',
        email: session.user?.email || ''
      }));
    }
  }, [session]);

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
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setShowBackground(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(heroSection);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleFade = () => {
      const heroSection = document.querySelector('.hero-section');
      if (!heroSection) return;
      const rect = heroSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Fade out as the bottom of hero section moves above 0
      const fadeStart = 0; // start fading when bottom is at window top
      const fadeEnd = windowHeight * 0.7; // fully faded when bottom is 70% from top (more gradual)
      const bottom = rect.bottom;
      let opacity = 1;
      if (bottom < fadeEnd) {
        // Use ease-out curve for smoother fade
        const t = Math.max(0, Math.min(1, (bottom - fadeStart) / (fadeEnd - fadeStart)));
        opacity = t * t; // quadratic ease-out
      }
      setBackgroundOpacity(opacity);
    };
    window.addEventListener('scroll', handleFade);
    handleFade(); // initial
    return () => window.removeEventListener('scroll', handleFade);
  }, []);

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Kajal Soni',
      position: 'Founder | Full Stack Developer',
      experience: 'ICE Branch - Founder and Full Stack Developer with expertise in web development and project leadership',
      image: '/images/img_picture.png'
    },
    {
      id: '2',
      name: 'Manik Bhushan',
      position: 'Creative Head',
      experience: 'Mechanical Branch - Creative Head with expertise in design and visual content creation',
      image: '/images/img_picture.png'
    },
    {
      id: '3',
      name: 'Kushagra Kataria',
      position: 'Full Stack Developer',
      experience: 'CSDS Branch - Full Stack Developer with expertise in both frontend and backend development',
      image: '/images/img_picture.png'
    },
    {
      id: '4',
      name: 'Bhavya Goel',
      position: 'Backend Developer',
      experience: 'CSAI Branch - Backend Developer with expertise in server-side development and database management',
      image: '/images/img_picture.png'
    },
    {
      id: '5',
      name: 'Ishit Papnai',
      position: 'Video Editor',
      experience: 'ICE Branch - Video Editor with expertise in video editing and multimedia content creation',
      image: '/images/img_picture.png'
    }
  ];

  const handleContactFormChange = (field: keyof ContactFormData, value: string) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactSubmit = async () => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...contactForm,
          type: feedbackType === 'askQuery' ? 'askQuery' :
                feedbackType === 'leaveFeedback' ? 'leaveFeedback' :
                'reportBug'
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert('Your message has been sent!');
        setContactForm({ name: '', email: '', message: '' });
      } else {
        alert('Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Network error.');
    }
  };


  const handleNameChange = (value: string | React.ChangeEvent<HTMLInputElement>) => {
    const stringValue = typeof value === 'string' ? value : value.target.value;
    handleContactFormChange('name', stringValue);
  };

  const handleEmailChange = (value: string | React.ChangeEvent<HTMLInputElement>) => {
    const stringValue = typeof value === 'string' ? value : value.target.value;
    handleContactFormChange('email', stringValue);
  };

  const handleMessageChange = (value: string | React.ChangeEvent<HTMLTextAreaElement>) => {
    const stringValue = typeof value === 'string' ? value : value.target.value;
    handleContactFormChange('message', stringValue);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToWhatWeOffer = () => {
    const element = document.getElementById('what-we-offer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // Outer-most container: relative to contain fixed elements, occupies full width.
    <div className="relative w-full min-h-screen overflow-hidden">
      {/* Background SVG - positioned as fixed to cover the entire viewport */}
      {showBackground && (
        <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none" style={{ opacity: backgroundOpacity, transition: 'opacity 0.6s cubic-bezier(0.4,0,0.2,1)' }}>
          <Image
            src="/images/background.svg"
            alt="Background Illustration with Rocket"
            layout="fill"
            objectFit="cover"
            objectPosition="calc(100% + 178px) top"
            quality={100}
          />
        </div>
      )}

      {/* Main content wrapper with max-width and horizontal padding */}
      {/* This div will contain all your visible page content and keep it centered */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-start items-center">
        {/* Hero Section */}
        <div className={`hero-section w-full flex flex-col justify-start items-start transition-all duration-1500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative w-full flex flex-col justify-start items-start">
            {/* Hero Content - Adjusted top padding to account for navbar */}
            <div className="relative w-full h-auto flex flex-col justify-start items-start pt-[100px] pb-40 lg:pb-60"> {/* Added more top padding for content below fixed navbar */}
              <div className={`relative transition-all duration-2200 ease-elegant delay-100 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                <h1 className="text-[120px] sm:text-[160px] md:text-[200px] lg:text-[280px] xl:text-[320px] font-bold leading-[0.8] text-left text-black" style={{ fontFamily: 'Playfair Display, serif' }}>
                  <span style={{ fontSize: '230px', lineHeight: 0.8, display: 'block', marginTop:'30px', marginLeft:'-32px'  }}>NSUT</span>
                </h1>
                <h2 className="absolute top-[80%] left-[12%] font-normal leading-[0.8] text-[#F45B69] tracking-wide" style={{ fontFamily: 'Lost in South, cursive', fontSize: '90px',  marginLeft:'-32px'}}>
                  SURVIVAL KIT
                </h2>
              </div>
              <p className={`text-lg sm:text-xl md:text-2xl lg:text-[25px] font-medium leading-6 sm:leading-7 md:leading-8 lg:leading-[30px] text-left text-black w-full max-w-2xl mb-0 transition-all duration-1800 ease-elegant delay-150 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ fontFamily: 'Inter, sans-serif', fontSize: '20px', marginTop: '60px', marginLeft:'-32px' }}>
                Your complete guide to NSUT&apos;s campus. Access map, resources,<br></br> events, and connect with fellow students all in one place
              </p>
            </div>
            {/* Get Started / View Dashboard Button */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6" style={{ marginTop: '-220px', marginBottom: '120px' ,  marginLeft:'-32px'}}>
              {session ? (
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <Link href="/dashboard">
                    <Button
                      variant="primary"
                      className={`mt-8 sm:mt-10 md:mt-12 lg:mt-[40px] ml-0 px-12 sm:px-14 md:px-16 lg:px-[60px] py-3 sm:py-4 md:py-5 lg:py-[16px] text-xl sm:text-2xl md:text-3xl lg:text-[24px] font-bold leading-8 sm:leading-9 md:leading-10 lg:leading-[30px] text-black bg-[#f4c430] shadow-[0px_4px_0px_#000000]  transition-all duration-500 ease-elegant hover:duration-200 ${isLoaded ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-8'}`}
                      style={{ borderRadius: '9999px', fontFamily: 'Inter, sans-serif' }}
                    >
                      View Dashboard →
                    </Button>
                  </Link>
                  
                  {/* Admin Dashboard Button (only for admin users) */}
                  {session.user?.role === 'admin' && (
                    <Link href="/admin">
                      <Button
                        variant="primary"
                        className={`mt-8 sm:mt-10 md:mt-12 lg:mt-[40px] ml-0 px-12 sm:px-14 md:px-16 lg:px-[60px] py-3 sm:py-4 md:py-5 lg:py-[16px] text-xl sm:text-2xl md:text-3xl lg:text-[24px] font-bold leading-8 sm:leading-9 md:leading-10 lg:leading-[30px] text-white bg-[#f45b6a] shadow-[0px_4px_0px_#000000] hover:shadow-[0px_8px_0px_#000000] hover:translate-y-[-4px] transition-all duration-500 ease-elegant hover:duration-200 ${isLoaded ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-8'}`}
                        style={{ borderRadius: '9999px', fontFamily: 'Inter, sans-serif' }}
                      >
                        Admin Panel →
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <Button
                  variant="primary"
                  className={`mt-8 sm:mt-10 md:mt-12 lg:mt-[40px] ml-0 px-12 sm:px-14 md:px-16 lg:px-[60px] py-3 sm:py-4 md:py-5 lg:py-[16px] text-xl sm:text-2xl md:text-3xl lg:text-[24px] font-bold leading-8 sm:leading-9 md:leading-10 lg:leading-[30px] text-black bg-[#f4c430] shadow-[0px_4px_0px_#000000] hover:shadow-[0px_8px_0px_#000000] hover:translate-y-[-4px] transition-all duration-500 ease-elegant hover:duration-200 ${isLoaded ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-8'}`}
                  style={{ borderRadius: '9999px', fontFamily: 'Inter, sans-serif' }}
                  onClick={scrollToWhatWeOffer}
                >
                  Get Started →
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* What We Offer Section */}
        <div 
          id="what-we-offer"
          data-animate-on-scroll
          className={`w-full flex flex-col gap-12 sm:gap-14 md:gap-16 lg:gap-[60px] justify-start items-center mt-16 sm:mt-20 md:mt-24 lg:mt-[130px] transition-all duration-1000 ease-out ${visibleSections.has('what-we-offer') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          {/* Section Header */}
          <div className="w-full flex flex-col sm:flex-row justify-start items-center gap-4 sm:gap-8 md:gap-12 lg:gap-[54px]">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-[97px] text-left text-global-text2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>
              What we offer
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[22px] text-left text-global-text2 w-full sm:w-2/5 md:w-1/3 lg:w-[36%]" style={{ fontFamily: 'Inter, sans-serif' }}>
              From finding your next class to finding your next project team—we've got everything to help you settle in, grow, and thrive.
            </p>
          </div>
          {/* Features Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-[40px]">
            {/* Event Board */}
            <Link href="/event-board" className="block">
              <div className={`w-full flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[16px] justify-start items-center bg-global-background5 border border-global-text2 rounded-[30px] p-8 sm:p-10 md:p-12 lg:p-[46px] transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl cursor-pointer ${visibleSections.has('what-we-offer') ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-8'}`}>
                <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-[14px] justify-start items-start">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold leading-10 sm:leading-12 md:leading-14 lg:leading-[49px] text-left text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Event Board
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl lg:text-[20px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[24px] text-left text-global-text2 w-full sm:w-4/5 md:w-3/5 lg:w-[58%]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Stay updated with campus events, workshops, seminars, and competitions. Never miss an opportunity to grow and network.
                  </p>
                </div>
                <div className="w-full flex flex-row justify-start items-center gap-2 sm:gap-3 md:gap-4 lg:gap-[10px] mb-2 sm:mb-3 md:mb-4 lg:mb-[10px]">
                  <Image
                    src="/images/img_icon.svg"
                    alt="View Events Icon"
                    width={40}
                    height={40}
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-[40px] lg:h-[40px]"
                  />
                  <span className="text-base sm:text-lg md:text-xl lg:text-[20px] font-semibold leading-5 sm:leading-6 md:leading-7 lg:leading-[25px] text-left text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    View Events
                  </span>
                </div>
              </div>
            </Link>
            {/* Launch Pad */}
            <Link href="/Launchpad" className="block">
              <div className={`w-full flex flex-col justify-start items-center bg-global-background1 border border-global-text2 rounded-[30px] p-8 sm:p-10 md:p-12 lg:p-[46px] transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl cursor-pointer ${visibleSections.has('what-we-offer') ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-8'}`}>
                <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-[16px] justify-start items-start">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold leading-10 sm:leading-12 md:leading-14 lg:leading-[49px] text-left text-global-text4" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Launch Pad
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl lg:text-[20px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[24px] text-left text-global-text4 w-full sm:w-4/5 md:w-3/5 lg:w-[58%]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Connect with seniors, join study groups, and get help from the NSUT community. We&apos;re here to support your journey.
                  </p>
                </div>
                <div className="w-full flex flex-row justify-start items-center gap-2 sm:gap-3 md:gap-4 lg:gap-[10px] mt-8 sm:mt-10 md:mt-12 lg:mt-[48px]">
                  <Image
                    src="/images/img_icon_orange_200.svg"
                    alt="Explore Projects Icon"
                    width={40}
                    height={40}
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-[40px] lg:h-[40px]"
                  />
                  <span className="text-base sm:text-lg md:text-xl lg:text-[20px] font-semibold leading-5 sm:leading-6 md:leading-7 lg:leading-[25px] text-left text-global-text4" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Explore Projects
                  </span>
                </div>
              </div>
            </Link>
            {/* Campus Navigation */}
            <Link href="/navigation" className="block">
              <div className={`w-full flex flex-col justify-start items-center bg-[#f45b6a] border border-global-text2 rounded-[30px] p-8 sm:p-10 md:p-12 lg:p-[46px] shadow-[0px_5px_1px_#000000] transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl cursor-pointer ${visibleSections.has('what-we-offer') ? 'opacity-100 translate-y-0 delay-400' : 'opacity-0 translate-y-8'}`}>
                <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-[16px] justify-start items-start">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold leading-10 sm:leading-12 md:leading-14 lg:leading-[49px] text-left text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Campus Navigation
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl lg:text-[20px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[24px] text-left text-global-text2 w-full sm:w-4/5 md:w-3/5 lg:w-[58%]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Navigate the campus with ease using our interactive maps. Find classrooms, labs, hostels and important buildings quickly.
                  </p>
                </div>
                <div className="w-full flex flex-row justify-start items-center gap-2 sm:gap-3 md:gap-4 lg:gap-[10px] mt-8 sm:mt-10 md:mt-12 lg:mt-[48px]">
                  <Image
                    src="/images/img_icon.svg"
                    alt="Explore Campus Icon"
                    width={40}
                    height={40}
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-[40px] lg:h-[40px]"
                  />
                  <span className="text-base sm:text-lg md:text-xl lg:text-[20px] font-semibold leading-5 sm:leading-6 md:leading-7 lg:leading-[25px] text-left text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Explore Campus
                  </span>
                </div>
              </div>
            </Link>
            {/* Study Hub */}
            <Link href="/study-hub" className="block">
              <div className={`w-full flex flex-col justify-start items-center bg-global-background5 border border-global-text2 rounded-[30px] p-8 sm:p-10 md:p-12 lg:p-[46px] shadow-[0px_5px_1px_#000000] transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl cursor-pointer ${visibleSections.has('what-we-offer') ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-8'}`}>
                <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-[16px] justify-start items-start">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold leading-10 sm:leading-12 md:leading-14 lg:leading-[49px] text-left text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Study Hub
                  </h3>
                  <p className="text-base sm:text-lg md:text-xl lg:text-[20px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[24px] text-left text-global-text2 w-full sm:w-4/5 md:w-3/5 lg:w-[64%]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Access curated study materials, notes, and resources from seniors and faculty. Find everything you need to excel in your academics.
                  </p>
                </div>
                <div className="w-full flex flex-row justify-start items-center gap-2 sm:gap-3 md:gap-4 lg:gap-[10px] mt-8 sm:mt-10 md:mt-12 lg:mt-[48px]">
                  <Image
                    src="/images/img_icon.svg"
                    alt="Explore Resources Icon"
                    width={40}
                    height={40}
                    className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-[40px] lg:h-[40px]"
                  />
                  <span className="text-base sm:text-lg md:text-xl lg:text-[20px] font-semibold leading-5 sm:leading-6 md:leading-7 lg:leading-[25px] text-left text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Explore Resources
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
        {/* Meet the Team Section */}
        <div 
          id="meet-the-team"
          data-animate-on-scroll
          className={`w-full flex flex-col justify-start items-center mt-20 sm:mt-24 md:mt-28 lg:mt-[114px] transition-all duration-1000 ease-out ${visibleSections.has('meet-the-team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          {/* Section Header */}
          <div className="w-full flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-[36px] justify-start items-center">
            <div className="w-full flex flex-col sm:flex-row justify-start items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[38px]">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-[97px] text-left text-global-text2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>
                Meet the team
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[21px] text-left text-global-text2 w-full sm:w-2/5 md:w-1/3 lg:w-[36%]" style={{ fontFamily: 'Inter, sans-serif' }}>
                Meet the students who’ve lived it, struggled through it, and now want to fix it.
              </p>
            </div>
            {/* Team Grid - Show only first 5 members */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 lg:gap-[20px]">
              {teamMembers.slice(0, 5).map((member, index) => (
                <div
                  key={member.id}
                  className={`w-full flex flex-col justify-start items-center bg-white border border-gray-300 rounded-[15px] p-4 transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl ${visibleSections.has('meet-the-team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: visibleSections.has('meet-the-team') ? `${index * 100}ms` : '0ms' }}
                >
                  {/* Member Image */}
                  <div className="w-full aspect-square bg-gray-200 rounded-[12px] mb-3 overflow-hidden">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={150}
                        height={150}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Member Info */}
                  <div className="w-full text-center">
                    <h4 className="text-base font-bold text-black mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {member.name}
                    </h4>
                    <p className="text-xs text-gray-700 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {member.position}
                    </p>
                    
                    {/* Social Media Links - LinkedIn and Instagram only */}
                    <div className="flex justify-center gap-2">
                      <a
                        href={(() => {
                          const linkedinUrls: { [key: string]: string } = {
                            'Kajal Soni': 'https://www.linkedin.com/in/kajalsoni2006/',
                            'Manik Bhushan': 'https://www.linkedin.com/in/manik-bhushan/',
                            'Parkhi Mudgal': 'https://www.linkedin.com/in/parkhi-mudgal-9a4285323/',
                            'Aastha Pandey': 'https://www.linkedin.com/in/aastha-pandey/',
                            'Kushagra Kataria': 'https://www.linkedin.com/in/kushagra-kataria/',
                            'Sarah Kim': 'https://www.linkedin.com/in/sarah-kim/'
                          };
                          return linkedinUrls[member.name] || '#';
                        })()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-6 h-6 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      </a>
                      <a
                        href={(() => {
                          const instagramUrls: { [key: string]: string } = {
                            'Kajal Soni': 'https://www.instagram.com/rustic.reverie_/',
                            'Manik Bhushan': 'https://www.instagram.com/iammvnik/',
                            'Parkhi Mudgal': 'https://www.instagram.com/p_mudgal26/',
                            'Aastha Pandey': 'https://www.instagram.com/aastha.pandey/',
                            'Kushagra Kataria': 'https://www.instagram.com/katariakuxh/',
                            'Sarah Kim': 'https://www.instagram.com/sarah.kim/'
                          };
                          return instagramUrls[member.name] || '#';
                        })()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-6 h-6 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-all duration-300"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* See All Team Button - Links to About Page */}
            <div className={`w-full flex justify-end transition-all duration-700 ease-out ${visibleSections.has('meet-the-team') ? 'opacity-100 translate-x-0 delay-600' : 'opacity-0 translate-x-8'}`}>
              <Link href="/about#meet-the-team">
                <Button
                  variant="secondary"
                  className="px-6 sm:px-7 md:px-8 lg:px-[34px] py-2 sm:py-2.5 md:py-3 lg:py-[10px] text-sm sm:text-base md:text-lg lg:text-[14px] font-normal leading-4 sm:leading-5 md:leading-6 lg:leading-[17px] text-center text-white hover:scale-105 transition-all duration-300"
                  style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#262626', borderRadius: '30px' }}
                >
                  See all team
                </Button>
              </Link>
            </div>
          </div>
        </div>
        {/* Contact Section */}
        <div 
          id="contact"
          data-animate-on-scroll
          className={`relative w-full mt-24 sm:mt-28 md:mt-32 lg:mt-[154px] transition-all duration-1000 ease-out ${visibleSections.has('contact') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        >
          {/* Extended Grey Background */}
          <div className="w-full bg-global-background2 rounded-[44px] py-14 sm:py-16 md:py-18 lg:py-[60px] px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="max-w-7xl mx-auto relative">
              {/* Contact Form - Left Side */}
              <div className={`w-full lg:w-1/2 flex flex-col gap-8 sm:gap-9 md:gap-10 lg:gap-[40px] justify-start items-start pl-8 sm:pl-12 md:pl-16 lg:pl-[60px] transition-all duration-800 ease-out delay-200 ${visibleSections.has('contact') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                {/* Radio Buttons */}
                <div className="w-full flex flex-col sm:flex-row justify-start items-start gap-4 sm:gap-6 md:gap-8 lg:gap-[40px]">
                  <div className="flex flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-[14px] justify-start items-center">
                    <button
                      onClick={() => setFeedbackType('askQuery')}
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-[28px] lg:h-[28px]"
                      aria-label="Ask a Query option"
                    >
                      <div className={`w-full h-full ${feedbackType === 'askQuery' ? 'bg-white' : 'bg-global-background5'} border border-global-text1 rounded-2xl flex items-center justify-center`}>
                        {feedbackType === 'askQuery' && <div className="w-3 h-3 bg-[#f45b6a] rounded-full"></div>}
                      </div>
                    </button>
                    <span className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[23px] text-left text-global-text1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Ask a Query
                    </span>
                  </div>
                  <div className="flex flex-row justify-start items-center gap-3 sm:gap-4 md:gap-5 lg:gap-[14px]">
                    <button
                      onClick={() => setFeedbackType('leaveFeedback')}
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-[28px] lg:h-[28px]"
                      aria-label="Leave a Feedback option"
                    >
                      <div className={`w-full h-full ${feedbackType === 'leaveFeedback' ? 'bg-white' : 'bg-global-background5'} border border-global-text1 rounded-2xl flex items-center justify-center`}>
                        {feedbackType === 'leaveFeedback' && <div className="w-3 h-3 bg-[#f45b6a] rounded-full"></div>}
                      </div>
                    </button>
                    <span className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[23px] text-left text-global-text1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Leave a Feedback
                    </span>
                  </div>
                  <div className="flex flex-row justify-start items-center gap-3 sm:gap-4 md:gap-5 lg:gap-[14px]">
                    <button
                      onClick={() => setFeedbackType('reportBug')}
                      className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-[28px] lg:h-[28px]"
                      aria-label="Report a Bug option"
                    >
                      <div className={`w-full h-full ${feedbackType === 'reportBug' ? 'bg-white' : 'bg-global-background5'} border border-global-text1 rounded-2xl flex items-center justify-center`}>
                        {feedbackType === 'reportBug' && <div className="w-3 h-3 bg-[#f45b6a] rounded-full"></div>}
                      </div>
                    </button>
                    <span className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[23px] text-left text-global-text1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Report a Bug
                    </span>
                  </div>
                </div>
                {/* Form Fields */}
                <div className="w-full max-w-md flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-[24px] justify-start items-start">
                  {/* Name Field */}
                  <div className="w-full flex flex-col gap-1 sm:gap-1.5 md:gap-2 lg:gap-[6px] justify-center items-start">
                    <label className="text-sm sm:text-base md:text-lg lg:text-[16px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[21px] text-left text-global-text1 " style={{ fontFamily: 'Inter, sans-serif' }}>
                      Name
                    </label>
                    <EditText
                      placeholder="Name"
                      value={contactForm.name}
                      onChange={handleNameChange}
                      disabled={!!session?.user}
                      className={`w-full ${session?.user ? 'opacity-75 cursor-not-allowed' : ''}`}
                      style={{ borderRadius: '30px' }}
                    />
                  </div>
                  {/* Email Field */}
                  <div className="w-full flex flex-col gap-1 sm:gap-1.5 md:gap-2 lg:gap-[6px] justify-center items-start">
                    <label className="text-sm sm:text-base md:text-lg lg:text-[16px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[21px] text-left text-global-text1 " style={{ fontFamily: 'Inter, sans-serif' }}>
                      Email*
                    </label>
                    <EditText
                      type="email"
                      placeholder="Email"
                      value={contactForm.email}
                      onChange={handleEmailChange}
                      disabled={!!session?.user}
                      required
                      className={`w-full ${session?.user ? 'opacity-75 cursor-not-allowed' : ''}`}
                      style={{ borderRadius: '30px' }}
                    />
                  </div>
                  {/* Message Field */}
                  <div className="w-full flex flex-col gap-1 sm:gap-1.5 md:gap-2 lg:gap-[4px] justify-center items-start">
                    <label className="text-sm sm:text-base md:text-lg lg:text-[16px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[21px] text-left text-global-text1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Message*
                    </label>
                    <TextArea
                      placeholder="Message"
                      value={contactForm.message}
                      onChange={handleMessageChange}
                      required
                      rows={6}
                      className="w-full"
                      style={{ borderRadius: '30px' }}
                    />
                  </div>
                  {/* Submit Button */}
                  <Button
                    variant="secondary"
                    className="w-full px-6 sm:px-7 md:px-8 lg:px-[34px] py-4 sm:py-5 md:py-6 lg:py-[20px] text-lg sm:text-xl md:text-2xl lg:text-[20px] font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-[26px] text-center text-white mt-4 sm:mt-5 md:mt-6 lg:mt-[20px] hover:scale-105 hover:shadow-lg transition-all duration-300"
                    style={{ backgroundColor: '#262626', borderRadius: '30px', fontFamily: 'Inter, sans-serif' }}
                    onClick={handleContactSubmit}
                  >
                    Send Message
                  </Button>
                </div>
              </div>
              {/* Illustration - Right Side */}
              <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 lg:w-2/5 flex items-center justify-end pr-8 sm:pr-12 md:pr-16 lg:pr-[60px] hidden lg:flex transition-all duration-1000 ease-out delay-400 ${visibleSections.has('contact') ? 'opacity-100 translate-x-0 rotate-0' : 'opacity-0 translate-x-12 rotate-6'}`}>
                <Image
                  src="/images/img_illustration.png"
                  alt="Contact Illustration"
                  width={466}
                  height={648}
                  className="w-3/4 h-auto max-w-xs max-h-full object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <Footer />
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
  );
};

export default HomePage;