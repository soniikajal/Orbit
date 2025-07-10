'use client';
import React, { useState } from 'react';
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

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'John Smith',
      position: 'CEO and Founder',
      experience: '10+ years of experience in digital marketing. Expertise in SEO, PPC, and content strategy',
      image: '/images/img_picture.png'
    },
    {
      id: '2',
      name: 'Jane Doe',
      position: 'Director of Operations',
      experience: '7+ years of experience in project management and team leadership. Strong organizational and communication skills',
      image: '/images/img_picture.png'
    },
    {
      id: '3',
      name: 'Michael Brown',
      position: 'Senior SEO Specialist',
      experience: '5+ years of experience in SEO and content creation. Proficient in keyword research and on-page optimization',
      image: '/images/img_picture.png'
    },
    {
      id: '4',
      name: 'Emily Johnson',
      position: 'PPC Manager',
      experience: '3+ years of experience in paid search advertising. Skilled in campaign management and performance analysis',
      image: '/images/img_picture.png'
    },
    {
      id: '5',
      name: 'Brian Williams',
      position: 'Social Media Specialist',
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
        <div className="w-full flex flex-col justify-start items-start mt-8 sm:mt-12 md:mt-16">
          <div className="w-full flex flex-col justify-start items-start">
            {/* Hero Content */}
            <div className="relative w-full sm:w-4/5 md:w-3/5 h-auto flex flex-col justify-end items-center">
              <h1 className="text-[120px] sm:text-[200px] md:text-[250px] lg:text-[300px] font-bold leading-[160px] sm:leading-[260px] md:leading-[320px] lg:leading-[400px] text-left text-global-text2 font-['Playfair_Display_SC']">
                NSUT
              </h1>
              <h2 className="text-[60px] sm:text-[80px] md:text-[100px] lg:text-[120px] font-normal leading-[58px] sm:text-[78px] md:leading-[98px] lg:leading-[117px] text-left text-[#f45b69] font-['Lost_in_South'] mb-8 sm:mb-12 md:mb-16 lg:mb-[118px] ml-4 sm:ml-8 md:ml-12 lg:ml-[105px]">
                Survival Kit
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-[25px] font-medium leading-6 sm:leading-7 md:leading-8 lg:leading-[30px] text-left text-global-text2 w-full font-inter ml-2 sm:ml-4 md:ml-6 lg:ml-[9px]">
                Your complete guide to NSUT&apos;s campus. Access map, resources, events, and connect with fellow students all in one place
              </p>
            </div>
            {/* Get Started Button */}
            <Button
              variant="primary"
              className="mt-6 sm:mt-7 md:mt-8 lg:mt-[28px] ml-2 sm:ml-4 md:ml-6 lg:ml-[8px] px-6 sm:px-7 md:px-8 lg:px-[34px] py-2 sm:py-2.5 md:py-3 lg:py-[8px] text-xl sm:text-2xl md:text-3xl lg:text-[30px] font-bold leading-8 sm:leading-9 md:leading-10 lg:leading-[37px] text-global-text2 bg-global-background6 rounded-[30px] font-inter"
              onClick={() => console.log('Get Started clicked')}
            >
              Get Started
            </Button>
            {/* What We Offer Section */}
            <div className="w-full flex flex-col gap-12 sm:gap-14 md:gap-16 lg:gap-[60px] justify-start items-center mt-16 sm:mt-20 md:mt-24 lg:mt-[130px]">
              {/* Section Header */}
              <div className="w-full flex flex-col sm:flex-row justify-start items-center gap-4 sm:gap-8 md:gap-12 lg:gap-[54px]">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-[97px] text-left text-global-text2 font-inter">
                  What we offer
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[22px] text-left text-global-text2 w-full sm:w-2/5 md:w-1/3 lg:w-[36%] font-space-grotesk">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque viverra tincidunt mauris.
                </p>
              </div>
              {/* Features Grid */}
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-[40px]">
                {/* Event Board */}
                <div className="w-full flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[16px] justify-start items-center bg-global-background5 border border-global-text2 rounded-[30px] p-8 sm:p-10 md:p-12 lg:p-[46px]">
                  <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-[14px] justify-start items-start">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold leading-10 sm:leading-12 md:leading-14 lg:leading-[49px] text-left text-global-text2 font-inter">
                      Event Board
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl lg:text-[20px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[24px] text-left text-global-text2 w-full sm:w-4/5 md:w-3/5 lg:w-[58%] font-inter">
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
                    <span className="text-base sm:text-lg md:text-xl lg:text-[20px] font-semibold leading-5 sm:leading-6 md:leading-7 lg:leading-[25px] text-left text-global-text2 font-inter">
                      View Events
                    </span>
                  </div>
                </div>
                {/* Launch Pad */}
                <div className="w-full flex flex-col justify-start items-center bg-global-background1 border border-global-text2 rounded-[30px] p-8 sm:p-10 md:p-12 lg:p-[46px]">
                  <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-[16px] justify-start items-start">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold leading-10 sm:leading-12 md:leading-14 lg:leading-[49px] text-left text-global-text4 font-inter">
                      Launch Pad
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl lg:text-[20px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[24px] text-left text-global-text4 w-full sm:w-4/5 md:w-3/5 lg:w-[58%] font-inter">
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
                    <span className="text-base sm:text-lg md:text-xl lg:text-[20px] font-semibold leading-5 sm:leading-6 md:leading-7 lg:leading-[25px] text-left text-global-text4 font-inter">
                      Explore Projects
                    </span>
                  </div>
                </div>
                {/* Campus Navigation */}
                <div className="w-full flex flex-col justify-start items-center bg-[#f45b6a] border border-global-text2 rounded-[30px] p-8 sm:p-10 md:p-12 lg:p-[46px] shadow-[0px_5px_1px_#000000]">
                  <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-[16px] justify-start items-start">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold leading-10 sm:leading-12 md:leading-14 lg:leading-[49px] text-left text-global-text2 font-inter">
                      Campus Navigation
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl lg:text-[20px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[24px] text-left text-global-text2 w-full sm:w-4/5 md:w-3/5 lg:w-[58%] font-inter">
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
                    <span className="text-base sm:text-lg md:text-xl lg:text-[20px] font-semibold leading-5 sm:leading-6 md:leading-7 lg:leading-[25px] text-left text-global-text2 font-inter">
                      Explore Campus
                    </span>
                  </div>
                </div>
                {/* Study Hub */}
                <div className="w-full flex flex-col justify-start items-center bg-global-background5 border border-global-text2 rounded-[30px] p-8 sm:p-10 md:p-12 lg:p-[46px] shadow-[0px_5px_1px_#000000]">
                  <div className="w-full flex flex-col gap-3 sm:gap-4 md:gap-5 lg:gap-[16px] justify-start items-start">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-semibold leading-10 sm:leading-12 md:leading-14 lg:leading-[49px] text-left text-global-text2 font-inter">
                      Study Hub
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl lg:text-[20px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[24px] text-left text-global-text2 w-full sm:w-4/5 md:w-3/5 lg:w-[64%] font-inter">
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
                    <span className="text-base sm:text-lg md:text-xl lg:text-[20px] font-semibold leading-5 sm:leading-6 md:leading-7 lg:leading-[25px] text-left text-global-text2 font-inter">
                      Explore Resources
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Meet the Team Section */}
            <div className="w-full flex flex-col justify-start items-center mt-20 sm:mt-24 md:mt-28 lg:mt-[114px]">
              {/* Section Header */}
              <div className="w-full flex flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-[36px] justify-start items-end">
                <div className="w-full flex flex-col sm:flex-row justify-start items-center gap-4 sm:gap-6 md:gap-8 lg:gap-[38px]">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-[97px] text-left text-global-text2 font-inter">
                    Meet the team
                  </h2>
                  <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[21px] text-left text-global-text2 w-full sm:w-2/5 md:w-1/3 lg:w-[36%] font-inter">
                    Meet the skilled and experienced team behind our successful digital marketing strategies
                  </p>
                </div>
                {/* Team Grid */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 lg:gap-[42px] mr-0 sm:mr-16 md:mr-20 lg:mr-[90px]">
                  {teamMembers.map((member, index) => (
                    <div
                      key={member.id}
                      className="w-full flex flex-col gap-6 sm:gap-7 md:gap-8 lg:gap-[28px] justify-start items-center bg-global-background5 border border-global-text2 rounded-[44px] p-6 sm:p-7 md:p-8 lg:p-[34px] pt-8 sm:pt-9 md:pt-10 lg:pt-[40px] shadow-[0px_5px_1px_#191a23]"
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
                        <button
                          className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-[34px] lg:h-[34px] bg-global-background1 rounded-2xl p-1.5 sm:p-2 md:p-2.5 lg:p-[8px] ml-2 sm:ml-3 md:ml-4 lg:ml-[8px]"
                          aria-label={`View ${member.name} profile`}
                        >
                          <Image
                            src="/images/img_social_icon.svg"
                            alt="Social Icon"
                            width={34}
                            height={34}
                            className="w-full h-full"
                          />
                        </button>
                      </div>
                      {/* Divider and Experience */}
                      <div className="w-full flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-[26px] justify-start items-center mb-5 sm:mb-6 md:mb-7 lg:mb-[26px]">
                        <div className="w-full h-[1px] bg-global-text2"></div>
                        <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[21px] text-left text-global-text2 w-full font-inter">
                          {member.experience}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* See All Team Button */}
                <Button
                  variant="secondary"
                  className="px-6 sm:px-7 md:px-8 lg:px-[34px] py-2 sm:py-2.5 md:py-3 lg:py-[10px] text-sm sm:text-base md:text-lg lg:text-[14px] font-normal leading-4 sm:leading-5 md:leading-6 lg:leading-[17px] text-center text-global-text4 bg-global-background1 rounded-2xl font-inter mr-20 sm:mr-24 md:mr-28 lg:mr-[124px]"
                  onClick={() => console.log('See all team clicked')}
                >
                  See all team
                </Button>
              </div>
            </div>
            {/* Contact Section */}
            <div className="relative w-full flex justify-center items-center mt-24 sm:mt-28 md:mt-32 lg:mt-[154px] h-auto">
              {/* Contact Form */}
              <div className="bg-global-background2 rounded-[44px] p-12 sm:p-14 md:p-16 lg:p-[60px] pt-14 sm:pt-16 md:pt-18 lg:pt-[60px] pb-14 sm:pb-16 md:pb-18 lg:pb-[60px] pl-16 sm:pl-20 md:pl-24 lg:pl-[100px] pr-12 sm:pr-14 md:pr-16 lg:pr-[56px] mr-16 sm:mr-20 md:pr-24 lg:mr-[100px]">
                <div className="flex flex-col gap-8 sm:gap-9 md:gap-10 lg:gap-[40px] justify-start items-start w-full max-w-lg">
                  {/* Radio Buttons */}
                  <div className="w-full flex flex-col sm:flex-row justify-start items-center gap-4 sm:gap-6 md:gap-8 lg:gap-0 pr-0 sm:pr-4 md:pr-6 lg:pr-[16px]">
                    <div className="flex flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-[14px] justify-center items-center">
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
                      <span className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[23px] text-left text-global-text1 font-space-grotesk self-start">
                        Say Hi
                      </span>
                    </div>
                    <div className="flex flex-row justify-start items-center flex-1 px-0 sm:px-2 md:px-3 lg:px-[16px]">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-[28px] lg:h-[28px] bg-global-background5 border border-global-text1 rounded-2xl"></div>
                      <span className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[23px] text-left text-global-text1 font-space-grotesk self-start ml-3 sm:ml-4 md:ml-5 lg:ml-[14px]">
                        Leave a feedback
                      </span>
                    </div>
                  </div>
                  {/* Form Fields */}
                  <div className="w-full flex flex-col gap-8 sm:gap-9 md:gap-10 lg:gap-[40px] justify-start items-center">
                    <div className="w-full flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-[24px] justify-start items-center">
                      {/* Name Field */}
                      <div className="w-full flex flex-col gap-1 sm:gap-1.5 md:gap-2 lg:gap-[6px] justify-center items-start">
                        <label className="text-sm sm:text-base md:text-lg lg:text-[16px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[21px] text-left text-global-text1 font-space-grotesk">
                          Name
                        </label>
                        <EditText
                          placeholder="Name"
                          value={contactForm.name}
                          onChange={(value) => handleContactFormChange('name', value)}
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
                          onChange={(value) => handleContactFormChange('email', value)}
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
                          onChange={(value) => handleContactFormChange('message', value)}
                          required
                          rows={6}
                          className="w-full"
                        />
                      </div>
                    </div>
                    {/* Submit Button */}
                    <Button
                      variant="secondary"
                      fullWidth
                      className="px-6 sm:px-7 md:px-8 lg:px-[34px] py-4 sm:py-5 md:py-6 lg:py-[20px] text-lg sm:text-xl md:text-2xl lg:text-[20px] font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-[26px] text-center text-global-text4 bg-global-background1 rounded-2xl font-space-grotesk"
                      onClick={handleContactSubmit}
                    >
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>
              {/* Illustration */}
              <div className="absolute right-0 top-12 sm:top-14 md:top-16 lg:top-[62px] w-1/3 sm:w-2/5 md:w-1/3 lg:w-[34%]">
                <Image
                  src="/images/img_illustration.png"
                  alt="Contact Illustration"
                  width={466}
                  height={648}
                  className="w-full h-auto"
                />
              </div>
            </div>
            {/* Footer */}
            <div className="w-full flex flex-row justify-center items-center mt-28 sm:mt-32 md:mt-36 lg:mt-[140px]">
              <div className="w-full flex flex-col gap-10 sm:gap-12 md:gap-14 lg:gap-[50px] justify-center items-center bg-global-background1 rounded-t-[44px] p-10 sm:p-12 md:p-14 lg:p-[50px] mt-1 sm:mt-2 md:mt-3 lg:mt-[4px]">
                {/* Footer Content */}
                <div className="w-full flex flex-col gap-12 sm:gap-14 md:gap-16 lg:gap-[66px] justify-start items-center">
                  {/* Social Icons */}
                  <div className="w-full flex flex-row justify-start items-center">
                    <div className="w-full flex flex-row justify-start items-center">
                      <button
                        className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-[30px] lg:h-[30px] bg-global-background5 rounded-2xl p-1 sm:p-1.5 md:p-2 lg:p-[6px]"
                        aria-label="Social media link"
                      >
                        <Image
                          src="/images/img_social_icon_black_900.svg"
                          alt="Social Icon"
                          width={30}
                          height={30}
                          className="w-full h-full"
                        />
                      </button>
                      <Image
                        src="/images/img_social_icon_white_a700.svg"
                        alt="Social Icon"
                        width={30}
                        height={30}
                        className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-[30px] lg:h-[30px] ml-4 sm:ml-5 md:ml-6 lg:ml-[20px]"
                      />
                      <button
                        className="w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-[30px] lg:h-[30px] bg-global-background5 rounded-2xl p-1 sm:p-1.5 md:p-2 lg:p-[6px] ml-4 sm:ml-5 md:ml-6 lg:ml-[20px]"
                        aria-label="Social media link"
                      >
                        <Image
                          src="/images/img_social_icon_black_900_30x30.svg"
                          alt="Social Icon"
                          width={30}
                          height={30}
                          className="w-full h-full"
                        />
                      </button>
                    </div>
                  </div>
                  {/* Contact Info and Newsletter */}
                  <div className="w-full flex flex-col lg:flex-row justify-start items-center gap-8 sm:gap-10 md:gap-12 lg:gap-0">
                    {/* Contact Info */}
                    <div className="w-full lg:w-2/5 flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-[26px] justify-start items-start">
                      <div className="bg-[#f45b6a] rounded-md px-1 sm:px-1.5 md:px-2 lg:px-[6px] py-1 sm:py-1.5 md:py-2 lg:py-[6px]">
                        <span className="text-lg sm:text-xl md:text-2xl lg:text-[20px] font-medium leading-6 sm:leading-7 md:leading-8 lg:leading-[26px] text-left text-global-text1 font-space-grotesk">
                          Contact us:
                        </span>
                      </div>
                      <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[20px] justify-start items-start">
                        <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[23px] text-left text-global-text4 font-space-grotesk">
                          Email: info@positivus.com
                        </p>
                        <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[23px] text-left text-global-text4 font-space-grotesk">
                          Phone: 555-567-8901
                        </p>
                        <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-5 sm:leading-6 md:leading-7 lg:leading-[22px] text-left text-global-text4 font-space-grotesk">
                          Address: 1234 Main St<br />Moonstone City, Stardust State 12345
                        </p>
                      </div>
                    </div>
                    {/* Newsletter Signup */}
                    <div className="w-full lg:flex-1 flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 lg:gap-[20px] justify-center items-center bg-global-background1 rounded-2xl p-8 sm:p-10 md:p-12 lg:p-[40px]">
                      <EditText
                        type="email"
                        placeholder="Email"
                        value={newsletterEmail}
                        onChange={setNewsletterEmail}
                        className="w-full border-global-text4 text-global-text4 placeholder:text-global-text4"
                      />
                      <Button
                        variant="danger"
                        className="w-full sm:w-auto px-6 sm:px-7 md:px-8 lg:px-[34px] py-4 sm:py-5 md:py-6 lg:py-[20px] text-lg sm:text-xl md:text-2xl lg:text-[20px] font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-[26px] text-center text-global-text1 bg-[#f45b6a] rounded-2xl font-space-grotesk"
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
                      © 2023 Positivus. All Rights Reserved.
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