'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '@/components/common/Header';
import Button from '@/components/ui/Button';
import EditText from '@/components/ui/EditText';
import TextArea from '@/components/ui/TextArea';

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
  const [contactForm, setContactForm] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [feedbackType, setFeedbackType] = useState<'sayHi' | 'feedback'>('sayHi');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

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

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Kajal Soni',
      position: 'CEO and Founder',
      experience: '10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy',
      image: '/images/img_picture.png'
    },
    {
      id: '2',
      name: 'Manik Bhushan',
      position: 'Design Lead',
      experience: '7+ years of experience in project management and team leadership. Strong organizational and communication skills',
      image: '/images/img_picture.png'
    },
    {
      id: '3',
      name: 'Parkhi Mudgal',
      position: 'Design Lead',
      experience: '5+ years of experience in SEO and content creation. Proficient in keyword research and on-page optimization',
      image: '/images/img_picture.png'
    },
    {
      id: '4',
      name: 'Aastha Pandey',
      position: 'Content Lead',
      experience: '3+ years of experience in paid search advertising. Skilled in campaign management and performance analysis',
      image: '/images/img_picture.png'
    },
    {
      id: '5',
      name: 'Kushagra Kataria',
      position: 'Dev Lead',
      experience: '4+ years of experience in social media marketing. Proficient in creating and scheduling content, analyzing metrics, and building engagement',
      image: '/images/img_picture.png'
    },
    {
      id: '6',
      name: 'Sarah Kim',
      position: 'Content Creator',
      experience: '2+ years of experience in writing and editing\nSkilled in creating compelling, SEO-optimized content for various industries',
      image: '/images/img_picture.png'
    }
  ];

  const handleContactFormChange = (field: keyof ContactFormData, value: string) => {
    setContactForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactSubmit = () => {
    console.log('Contact form submitted:', contactForm);
    // Reset form
    setContactForm({ name: '', email: '', message: '' });
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

  const handleNewsletterEmailChange = (value: string | React.ChangeEvent<HTMLInputElement>) => {
    const stringValue = typeof value === 'string' ? value : value.target.value;
    setNewsletterEmail(stringValue);
  };

  const handleNewsletterSubmit = () => {
    console.log('Newsletter subscription:', newsletterEmail);
    setNewsletterEmail('');
  };

  return (
    <div className="w-full bg-[#fffcf9] flex flex-col justify-start items-end">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-start items-center">
        {/* Header */}
        <Header />
        {/* Hero Section */}
        <div className={`w-full flex flex-col justify-start items-start mt-8 sm:mt-12 md:mt-16 transition-all duration-1500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="w-full flex flex-col justify-start items-start">
            {/* Hero Content */}
            <div className="relative w-full h-auto flex flex-col justify-start items-start">
              <div className={`relative transition-all duration-2200 ease-elegant delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                <h1 className="text-[120px] sm:text-[160px] md:text-[200px] lg:text-[280px] xl:text-[320px] font-bold leading-[0.8] text-left text-black" style={{ fontFamily: 'Playfair Display, serif' }}>
                  NSUT
                </h1>
                <h2 className="absolute top-[80%] left-[15%] text-[40px] sm:text-[60px] md:text-[80px] lg:text-[100px] xl:text-[120px] font-normal leading-[0.8] text-[#F45B69] tracking-wide" style={{ fontFamily: 'Lost in South, cursive' }}>
                  SURVIVAL KIT
                </h2>
              </div>
              <p className={`text-lg sm:text-xl md:text-2xl lg:text-[25px] font-medium leading-6 sm:leading-7 md:leading-8 lg:leading-[30px] text-left text-black w-full max-w-2xl mt-8 sm:mt-12 md:mt-16 transition-all duration-1800 ease-elegant delay-1200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                Your complete guide to NSUT&apos;s campus. Access map, resources, events, and connect with fellow students all in one place
              </p>
            </div>
            {/* Get Started Button */}
            <Button
              variant="primary"
              className={`mt-8 sm:mt-10 md:mt-12 lg:mt-[40px] ml-0 px-12 sm:px-14 md:px-16 lg:px-[60px] py-3 sm:py-4 md:py-5 lg:py-[16px] text-xl sm:text-2xl md:text-3xl lg:text-[24px] font-bold leading-8 sm:leading-9 md:leading-10 lg:leading-[30px] text-black bg-[#f4c430] shadow-[0px_4px_0px_#000000] hover:shadow-[0px_8px_0px_#000000] hover:translate-y-[-4px] transition-all duration-500 ease-elegant hover:duration-200 ${isLoaded ? 'opacity-100 translate-y-0 delay-2000' : 'opacity-0 translate-y-8'}`}
              style={{ borderRadius: '9999px', fontFamily: 'Inter, sans-serif' }}
              onClick={() => console.log('Get Started clicked')}
            >
              Get Started    →
            </Button>
            {/* What We Offer Section */}
            <div 
              id="what-we-offer"
              data-animate-on-scroll
              className={`w-full flex flex-col gap-12 sm:gap-14 md:gap-16 lg:gap-[60px] justify-start items-center mt-16 sm:mt-20 md:mt-24 lg:mt-[130px] transition-all duration-1000 ease-out ${visibleSections.has('what-we-offer') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              {/* Section Header */}
              <div className="w-full flex flex-col sm:flex-row justify-start items-center gap-4 sm:gap-8 md:gap-12 lg:gap-[54px]">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-[97px] text-left text-global-text2" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 'bold' }}>
                  What we offer
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[22px] text-left text-global-text2 w-full sm:w-2/5 md:w-1/3 lg:w-[36%] font-space-grotesk">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque viverra tincidunt mauris.
                </p>
              </div>
              {/* Features Grid */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-[40px]">
                {/* Event Board */}
                <div className={`w-full flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[16px] justify-start items-center bg-global-background5 border border-global-text2 rounded-[30px] p-8 sm:p-10 md:p-12 lg:p-[46px] transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl ${visibleSections.has('what-we-offer') ? 'opacity-100 translate-y-0 delay-200' : 'opacity-0 translate-y-8'}`}>
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
                {/* Launch Pad */}
                <div className={`w-full flex flex-col justify-start items-center bg-global-background1 border border-global-text2 rounded-[30px] p-8 sm:p-10 md:p-12 lg:p-[46px] transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl ${visibleSections.has('what-we-offer') ? 'opacity-100 translate-y-0 delay-300' : 'opacity-0 translate-y-8'}`}>
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
                {/* Campus Navigation */}
                <div className={`w-full flex flex-col justify-start items-center bg-[#f45b6a] border border-global-text2 rounded-[30px] p-8 sm:p-10 md:p-12 lg:p-[46px] shadow-[0px_5px_1px_#000000] transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl ${visibleSections.has('what-we-offer') ? 'opacity-100 translate-y-0 delay-400' : 'opacity-0 translate-y-8'}`}>
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
                {/* Study Hub */}
                <div className={`w-full flex flex-col justify-start items-center bg-global-background5 border border-global-text2 rounded-[30px] p-8 sm:p-10 md:p-12 lg:p-[46px] shadow-[0px_5px_1px_#000000] transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl ${visibleSections.has('what-we-offer') ? 'opacity-100 translate-y-0 delay-500' : 'opacity-0 translate-y-8'}`}>
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
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-[97px] text-left text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Meet the team
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[21px] text-left text-global-text2 w-full sm:w-2/5 md:w-1/3 lg:w-[36%]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Meet the skilled and experienced team behind our successful digital marketing strategies
                  </p>
                </div>
                {/* Team Grid */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-[42px]">
                  {teamMembers.map((member, index) => (
                    <div
                      key={member.id}
                      className={`w-full flex flex-col gap-6 sm:gap-7 md:gap-8 lg:gap-[28px] justify-start items-center bg-global-background5 border border-global-text2 rounded-[44px] p-6 sm:p-7 md:p-8 lg:p-[34px] pt-8 sm:pt-9 md:pt-10 lg:pt-[40px] shadow-[0px_5px_1px_#191a23] transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl ${visibleSections.has('meet-the-team') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                      style={{ transitionDelay: visibleSections.has('meet-the-team') ? `${index * 100}ms` : '0ms' }}
                    >
                      {/* Member Info Row */}
                      <div className="w-full flex flex-row justify-center items-start gap-4 sm:gap-5 md:gap-6 lg:gap-[20px]">
                        <Image
                          src={member.image}
                          alt={member.name}
                          width={102}
                          height={102}
                          className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-[102px] lg:h-[102px] self-center"
                        />
                        <div className="flex flex-col justify-start items-start flex-1 self-end">
                          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-[20px] font-medium leading-6 sm:leading-7 md:leading-8 lg:leading-[26px] text-left text-global-text2 font-space-grotesk">
                            {member.name}
                          </h3>
                          <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[23px] text-left text-global-text2 font-space-grotesk">
                            {member.position}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 sm:gap-2.5 md:gap-3 lg:gap-[8px] items-center">
                          <button
                            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-[34px] lg:h-[34px] bg-global-background1 rounded-2xl p-1.5 sm:p-2 md:p-2.5 lg:p-[8px] flex items-center justify-center"
                            aria-label={`View ${member.name} LinkedIn profile`}
                          >
                            <i className="fa-brands fa-linkedin-in text-[#F45B6A] text-[16px]"></i>
                          </button>
                          <button
                            className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-[34px] lg:h-[34px] bg-global-background1 rounded-2xl p-1.5 sm:p-2 md:p-2.5 lg:p-[8px] flex items-center justify-center"
                            aria-label={`View ${member.name} Instagram profile`}
                          >
                            <i className="fa-brands fa-instagram text-[#F45B6A] text-[16px]"></i>
                          </button>
                        </div>
                      </div>
                      {/* Divider and Experience */}
                      <div className="w-full flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-[26px] justify-start items-center mb-5 sm:mb-6 md:mb-7 lg:mb-[26px]">
                        <div className="w-full h-[1px] bg-global-text2"></div>
                        <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[21px] text-left text-global-text2 w-full" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {member.experience}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* See All Team Button */}
                <div className={`w-full flex justify-end transition-all duration-700 ease-out ${visibleSections.has('meet-the-team') ? 'opacity-100 translate-x-0 delay-600' : 'opacity-0 translate-x-8'}`}>
                  <Button
                    variant="secondary"
                    className="px-6 sm:px-7 md:px-8 lg:px-[34px] py-2 sm:py-2.5 md:py-3 lg:py-[10px] text-sm sm:text-base md:text-lg lg:text-[14px] font-normal leading-4 sm:leading-5 md:leading-6 lg:leading-[17px] text-center text-white hover:scale-105 transition-all duration-300"
                    style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#262626', borderRadius: '14px' }}
                    onClick={() => console.log('See all team clicked')}
                  >
                    See all team
                  </Button>
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
                          onClick={() => setFeedbackType('sayHi')}
                          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-[28px] lg:h-[28px]"
                          aria-label="Say Hi option"
                        >
                          <Image
                            src="/images/img_radiobutton.svg"
                            alt="Radio Button"
                            width={28}
                            height={28}
                            className="w-full h-full"
                          />
                        </button>
                        <span className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[23px] text-left text-global-text1 font-space-grotesk">
                          Say Hi
                        </span>
                      </div>
                      <div className="flex flex-row justify-start items-center gap-3 sm:gap-4 md:gap-5 lg:gap-[14px]">
                        <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-[28px] lg:h-[28px] bg-global-background5 border border-global-text1 rounded-2xl"></div>
                        <span className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[23px] text-left text-global-text1 font-space-grotesk">
                          Leave a feedback
                        </span>
                      </div>
                    </div>
                    {/* Form Fields */}
                    <div className="w-full max-w-md flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-[24px] justify-start items-start">
                      {/* Name Field */}
                      <div className="w-full flex flex-col gap-1 sm:gap-1.5 md:gap-2 lg:gap-[6px] justify-center items-start">
                        <label className="text-sm sm:text-base md:text-lg lg:text-[16px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[21px] text-left text-global-text1 font-space-grotesk">
                          Name
                        </label>
                        <EditText
                          placeholder="Name"
                          value={contactForm.name}
                          onChange={handleNameChange}
                          className="w-full"
                        />
                      </div>
                      {/* Email Field */}
                      <div className="w-full flex flex-col gap-1 sm:gap-1.5 md:gap-2 lg:gap-[6px] justify-center items-start">
                        <label className="text-sm sm:text-base md:text-lg lg:text-[16px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[21px] text-left text-global-text1 font-space-grotesk">
                          Email*
                        </label>
                        <EditText
                          type="email"
                          placeholder="Email"
                          value={contactForm.email}
                          onChange={handleEmailChange}
                          required
                          className="w-full"
                        />
                      </div>
                      {/* Message Field */}
                      <div className="w-full flex flex-col gap-1 sm:gap-1.5 md:gap-2 lg:gap-[4px] justify-center items-start">
                        <label className="text-sm sm:text-base md:text-lg lg:text-[16px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[21px] text-left text-global-text1 font-space-grotesk">
                          Message*
                        </label>
                        <TextArea
                          placeholder="Message"
                          value={contactForm.message}
                          onChange={handleMessageChange}
                          required
                          rows={6}
                          className="w-full"
                        />
                      </div>
                      {/* Submit Button */}
                      <Button
                        variant="secondary"
                        className="w-full px-6 sm:px-7 md:px-8 lg:px-[34px] py-4 sm:py-5 md:py-6 lg:py-[20px] text-lg sm:text-xl md:text-2xl lg:text-[20px] font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-[26px] text-center text-white font-space-grotesk mt-4 sm:mt-5 md:mt-6 lg:mt-[20px] hover:scale-105 hover:shadow-lg transition-all duration-300"
                        style={{ backgroundColor: '#262626', borderRadius: '14px' }}
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
                        <span className="text-lg sm:text-xl md:text-2xl lg:text-[20px] font-medium leading-6 sm:leading-7 md:leading-8 lg:leading-[26px] text-left text-white font-space-grotesk">
                          Contact us:
                        </span>
                      </div>
                      <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[20px] justify-start items-start">
                        <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[23px] text-left text-global-text4 font-space-grotesk">
                          Email: nsutorbit@gmail.com
                        </p>
                        <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[23px] text-left text-global-text4 font-space-grotesk">
                          Phone: 7827044075
                        </p>
                        <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[22px] text-left text-global-text4 font-space-grotesk">
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
                          color: 'white'
                        }}
                      />
                      <Button
                        variant="danger"
                        className="w-full sm:w-auto px-6 sm:px-7 md:px-8 lg:px-[34px] py-3 sm:py-3.5 md:py-4 lg:py-[12px] text-lg sm:text-xl md:text-2xl lg:text-[18px] font-medium leading-6 sm:leading-7 md:leading-8 lg:leading-[22px] text-center text-black font-space-grotesk hover:scale-105 hover:shadow-lg transition-all duration-300"
                        style={{ 
                          backgroundColor: '#f45b6a', 
                          borderRadius: '8px',
                          border: 'none'
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
                    <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[23px] text-left text-global-text4 font-space-grotesk">
                      © 2025 Orbit.  All Rights Reserved.
                    </p>
                    <button className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[23px] text-left text-global-text4 underline font-space-grotesk self-end">
                      Privacy Policy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;