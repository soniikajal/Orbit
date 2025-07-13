'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import EditText from '@/components/ui/EditText';
import TextArea from '@/components/ui/TextArea';

const LaunchpadPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [projectForm, setProjectForm] = useState({
    projectName: '',
    category: '',
    description: '',
    requiredSkills: '',
    lookingFor: '',
    teamMembers: '',
    contactEmail: '',
    additionalInfo: ''
  });

  // Prefill email when session loads
  useEffect(() => {
    if (session?.user?.email) {
      setProjectForm(prev => ({
        ...prev,
        contactEmail: session.user?.email || ''
      }));
    }
  }, [session]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const handleNewsletterEmailChange = (value: string | React.ChangeEvent<HTMLInputElement>) => {
    const stringValue = typeof value === 'string' ? value : value.target.value;
    setNewsletterEmail(stringValue);
  };

  const handleNewsletterSubmit = () => {
    console.log('Newsletter subscription:', newsletterEmail);
    setNewsletterEmail('');
  };

  const handleAddProjectClick = () => {
    if (!session) {
      // Redirect to signin with callbackUrl to return to launchpad
      router.push('/auth/signin?callbackUrl=' + encodeURIComponent('/Launchpad'));
      return;
    }
    setShowAddProjectForm(true);
  };

  const handleProjectFormChange = (field: string, value: string) => {
    setProjectForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProjectFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Project submitted:', projectForm);
    // Here you would typically send the data to your backend
    alert('Project submitted successfully!');
    setShowAddProjectForm(false);
    setProjectForm({
      projectName: '',
      category: '',
      description: '',
      requiredSkills: '',
      lookingFor: '',
      teamMembers: '',
      contactEmail: '',
      additionalInfo: ''
    });
  };

  const handleCloseForm = () => {
    setShowAddProjectForm(false);
  };

  return (
    <div className="w-full flex flex-col justify-start items-end">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-start items-center">
        <div className="w-full flex flex-col justify-start items-start mt-2 sm:mt-3 md:mt-4">
          <main className="w-full py-2">
            {/* Page Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-[97px] text-left text-global-text2 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              Launch Pad
            </h1>

            {/* Search Bar */}
            <div className="w-full mb-[15px]">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    placeholder="Search for projects, skills or keywords..."
                    className="w-full h-[56px] px-4 pl-6 pr-14 text-base rounded-[30px] focus:outline-none focus:ring-2 focus:ring-[#f4c430] focus:border-transparent transition-all duration-200"
                    style={{ fontFamily: 'Space Grotesk, sans-serif', backgroundColor: 'white', borderColor: '#9ca3af', borderWidth: '1px' }}
                  />
                  <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </form>
            </div>

            {/* Add Project Button */}
            <div className="w-full flex justify-center items-center mt-[15px]">
              <button
                className="w-[278px] h-[54px] bg-[#F45B6A] text-white font-bold text-[20px] rounded-[30px] hover:opacity-90 transition-opacity duration-200"
                style={{ fontFamily: 'Inter, sans-serif' }}
                onClick={handleAddProjectClick}
              >
                + ADD YOUR PROJECT
              </button>
            </div>

            {/* Add Filter Button */}
            {/* <div className="w-full flex justify-start items-center -mt-4">
              <button
                className="w-[99px] h-[26px] bg-white text-black font-bold text-[14px] border border-black rounded-[30px] hover:bg-gray-50 transition-colors duration-200"
                style={{ fontFamily: 'Inter, sans-serif' }}
                onClick={() => {
                  console.log('Add filter clicked');
                }}
              >
                Add filter
              </button>
            </div> */}

            {/* Project Cards */}
            <div className="w-full mt-8">
              {/* Row 1 */}
              <div className="flex justify-between mb-6 gap-4">
              {[...Array(4)].map((_, cardIndex) => (
                <div key={`row1-${cardIndex}`} className="w-[280px] h-[440px] bg-white rounded-[30px] px-4 py-5 shadow-sm border border-gray-100 flex flex-col justify-center items-start relative">
                  {/* Date - Top Right */}
                  <div className="absolute top-5 right-4">
                    <span className="text-[12px] font-normal text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                      12-01-25
                    </span>
                  </div>

                  {/* Category Tag */}
                  <div className="bg-[#FACC68] rounded-[30px] px-3 py-1 inline-block mb-1">
                    <span className="text-[14px] font-bold text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Web Development
                    </span>
                  </div>

                  {/* Project Name */}
                  <h2 className="text-[24px] font-bold text-black" style={{ fontFamily: 'Playfair Display, serif' }}>
                    ECOTrack NSUT
                  </h2>

                  {/* Project Description */}
                  <p className="text-[14px] font-normal text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Access curated study materials, notes, and resources from seniors and faculty. Find everything you need to excel in your academics.
                  </p>

                  {/* Team Members */}
                  <h3 className="text-[14px] font-bold text-black mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Team Members
                  </h3>
                  <div className="flex gap-2 mb-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-[24.97px] h-[24.97px] bg-gray-300 rounded-full"></div>
                    ))}
                  </div>

                  {/* Required Skills */}
                  <h3 className="text-[14px] font-bold text-black" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Required Skills
                  </h3>
                  <div className="text-[14px] font-normal text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Java/CSS<br />
                    Product Designing<br />
                    Motion Graphics<br />
                    Adobe Creative Suite
                  </div>

                  {/* Looking For */}
                  <div className="w-[248px] h-[25.94px] border border-black rounded-[30px] flex items-center justify-center mb-2 mx-auto">
                    <span className="text-[14px] font-bold text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Looking for: Backend Developer
                    </span>
                  </div>

                  {/* Contact Button */}
                  <button className="w-[158.06px] h-[39.95px] bg-[#F45B6A] rounded-[30px] text-white text-[14px] font-normal hover:opacity-90 transition-opacity duration-200 mx-auto"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    onClick={() => console.log('Contact team clicked')}
                  >
                    Contact the team
                  </button>
                </div>
              ))}
              </div>

              {/* Row 2 */}
              <div className="flex justify-between mb-6 gap-4">
              {[...Array(4)].map((_, cardIndex) => (
                <div key={`row2-${cardIndex}`} className="w-[280px] h-[440px] bg-white rounded-[30px] px-4 py-5 shadow-sm border border-gray-100 flex flex-col justify-center items-start relative">
                  {/* Date - Top Right */}
                  <div className="absolute top-5 right-4">
                    <span className="text-[12px] font-normal text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                      12-01-25
                    </span>
                  </div>

                  {/* Category Tag */}
                  <div className="bg-[#FACC68] rounded-[30px] px-3 py-1 inline-block mb-1">
                    <span className="text-[14px] font-bold text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Web Development
                    </span>
                  </div>

                  {/* Project Name */}
                  <h2 className="text-[24px] font-bold text-black" style={{ fontFamily: 'Playfair Display, serif' }}>
                    ECOTrack NSUT
                  </h2>

                  {/* Project Description */}
                  <p className="text-[14px] font-normal text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Access curated study materials, notes, and resources from seniors and faculty. Find everything you need to excel in your academics.
                  </p>

                  {/* Team Members */}
                  <h3 className="text-[14px] font-bold text-black mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Team Members
                  </h3>
                  <div className="flex gap-2 mb-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-[24.97px] h-[24.97px] bg-gray-300 rounded-full"></div>
                    ))}
                  </div>

                  {/* Required Skills */}
                  <h3 className="text-[14px] font-bold text-black" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Required Skills
                  </h3>
                  <div className="text-[14px] font-normal text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Java/CSS<br />
                    Product Designing<br />
                    Motion Graphics<br />
                    Adobe Creative Suite
                  </div>

                  {/* Looking For */}
                  <div className="w-[248px] h-[25.94px] border border-black rounded-[30px] flex items-center justify-center mb-2 mx-auto">
                    <span className="text-[14px] font-bold text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Looking for: Backend Developer
                    </span>
                  </div>

                  {/* Contact Button */}
                  <button className="w-[158.06px] h-[39.95px] bg-[#F45B6A] rounded-[30px] text-white text-[14px] font-normal hover:opacity-90 transition-opacity duration-200 mx-auto"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    onClick={() => console.log('Contact team clicked')}
                  >
                    Contact the team
                  </button>
                </div>
              ))}
              </div>

              {/* Row 3 */}
              <div className="flex justify-between mb-6 gap-4">
              {[...Array(4)].map((_, cardIndex) => (
                <div key={`row3-${cardIndex}`} className="w-[280px] h-[440px] bg-white rounded-[30px] px-4 py-5 shadow-sm border border-gray-100 flex flex-col justify-center items-start relative">
                  {/* Date - Top Right */}
                  <div className="absolute top-5 right-4">
                    <span className="text-[12px] font-normal text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                      12-01-25
                    </span>
                  </div>

                  {/* Category Tag */}
                  <div className="bg-[#FACC68] rounded-[30px] px-3 py-1 inline-block mb-1">
                    <span className="text-[14px] font-bold text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Web Development
                    </span>
                  </div>

                  {/* Project Name */}
                  <h2 className="text-[24px] font-bold text-black" style={{ fontFamily: 'Playfair Display, serif' }}>
                    ECOTrack NSUT
                  </h2>

                  {/* Project Description */}
                  <p className="text-[14px] font-normal text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Access curated study materials, notes, and resources from seniors and faculty. Find everything you need to excel in your academics.
                  </p>

                  {/* Team Members */}
                  <h3 className="text-[14px] font-bold text-black mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Team Members
                  </h3>
                  <div className="flex gap-2 mb-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-[24.97px] h-[24.97px] bg-gray-300 rounded-full"></div>
                    ))}
                  </div>

                  {/* Required Skills */}
                  <h3 className="text-[14px] font-bold text-black" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Required Skills
                  </h3>
                  <div className="text-[14px] font-normal text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Java/CSS<br />
                    Product Designing<br />
                    Motion Graphics<br />
                    Adobe Creative Suite
                  </div>

                  {/* Looking For */}
                  <div className="w-[248px] h-[25.94px] border border-black rounded-[30px] flex items-center justify-center mb-2 mx-auto">
                    <span className="text-[14px] font-bold text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Looking for: Backend Developer
                    </span>
                  </div>

                  {/* Contact Button */}
                  <button className="w-[158.06px] h-[39.95px] bg-[#F45B6A] rounded-[30px] text-white text-[14px] font-normal hover:opacity-90 transition-opacity duration-200 mx-auto"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    onClick={() => console.log('Contact team clicked')}
                  >
                    Contact the team
                  </button>
                </div>
              ))}
              </div>
            </div>

            {/* Show More Button */}
            <div className="w-full flex justify-center items-center mt-5">
              <button
                className="w-[158.24px] h-[40px] bg-[#262626] text-white font-normal text-[14px] rounded-[30px] hover:opacity-90 transition-opacity duration-200"
                style={{ fontFamily: 'Inter, sans-serif' }}
                onClick={() => {
                  console.log('Show more results clicked');
                }}
              >
                Show more results
              </button>
            </div>
          </main>

          {/* Add Project Form Modal */}
          {showAddProjectForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-[30px] w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                  {/* Form Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[32px] font-bold text-black" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Add Your Project
                    </h2>
                    <button 
                      onClick={handleCloseForm}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleProjectFormSubmit} className="space-y-6">
                    {/* Project Name */}
                    <div>
                      <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Project Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={projectForm.projectName}
                        onChange={(e) => handleProjectFormChange('projectName', e.target.value)}
                        className="w-full h-[50px] px-4 text-[14px] rounded-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B6A] focus:border-transparent transition-all duration-200"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        placeholder="Enter your project name"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Category *
                      </label>
                      <select
                        required
                        value={projectForm.category}
                        onChange={(e) => handleProjectFormChange('category', e.target.value)}
                        className="w-full h-[50px] px-4 text-[14px] rounded-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B6A] focus:border-transparent transition-all duration-200"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <option value="">Select a category</option>
                        <option value="Technology & Software">Technology & Software</option>
                        <option value="Business & Entrepreneurship">Business & Entrepreneurship</option>
                        <option value="Creative & Design">Creative & Design</option>
                        <option value="Research & Innovation">Research & Innovation</option>
                        <option value="Social Impact & NGO">Social Impact & NGO</option>
                        <option value="Education & Learning">Education & Learning</option>
                        <option value="Health & Wellness">Health & Wellness</option>
                        <option value="Finance & Investment">Finance & Investment</option>
                        <option value="Marketing & Sales">Marketing & Sales</option>
                        <option value="Content & Media">Content & Media</option>
                        <option value="Events & Community">Events & Community</option>
                        <option value="Sports & Fitness">Sports & Fitness</option>
                        <option value="Environment & Sustainability">Environment & Sustainability</option>
                        <option value="Food & Hospitality">Food & Hospitality</option>
                        <option value="Fashion & Lifestyle">Fashion & Lifestyle</option>
                        <option value="Travel & Tourism">Travel & Tourism</option>
                        <option value="Arts & Entertainment">Arts & Entertainment</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Project Description *
                      </label>
                      <textarea
                        required
                        value={projectForm.description}
                        onChange={(e) => handleProjectFormChange('description', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 text-[14px] rounded-[20px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B6A] focus:border-transparent transition-all duration-200 resize-none"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        placeholder="Describe your project, its goals, and what you're trying to achieve..."
                      />
                    </div>

                    {/* Looking For */}
                    <div>
                      <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Looking For *
                      </label>
                      <input
                        type="text"
                        required
                        value={projectForm.lookingFor}
                        onChange={(e) => handleProjectFormChange('lookingFor', e.target.value)}
                        className="w-full h-[50px] px-4 text-[14px] rounded-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B6A] focus:border-transparent transition-all duration-200"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        placeholder="What role are you looking for? (e.g., Frontend Developer, Designer, etc.)"
                      />
                    </div>

                    {/* Required Skills and Team Members */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Required Skills *
                        </label>
                        <textarea
                          required
                          value={projectForm.requiredSkills}
                          onChange={(e) => handleProjectFormChange('requiredSkills', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 text-[14px] rounded-[20px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B6A] focus:border-transparent transition-all duration-200 resize-none"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                          placeholder="List the skills required for this project (e.g., React, Node.js, Python, etc.)"
                        />
                      </div>
                      <div>
                        <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Team Members
                        </label>
                        <textarea
                          value={projectForm.teamMembers}
                          onChange={(e) => handleProjectFormChange('teamMembers', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-3 text-[14px] rounded-[20px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B6A] focus:border-transparent transition-all duration-200 resize-none"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                          placeholder="List current team members and their roles (e.g., John - Frontend Developer, Sarah - UI Designer)"
                        />
                      </div>
                    </div>

                    {/* Contact Email */}
                    <div>
                      <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Contact Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={projectForm.contactEmail}
                        onChange={(e) => handleProjectFormChange('contactEmail', e.target.value)}
                        className="w-full h-[50px] px-4 text-[14px] rounded-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B6A] focus:border-transparent transition-all duration-200"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        placeholder="your.email@example.com"
                      />
                    </div>

                    {/* Additional Info */}
                    <div>
                      <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Additional Information (Optional)
                      </label>
                      <textarea
                        value={projectForm.additionalInfo}
                        onChange={(e) => handleProjectFormChange('additionalInfo', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 text-[14px] rounded-[20px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B6A] focus:border-transparent transition-all duration-200 resize-none"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        placeholder="Any additional details about your project..."
                      />
                    </div>

                    {/* Form Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        type="button"
                        onClick={handleCloseForm}
                        className="w-full sm:w-auto px-8 py-3 text-[16px] font-medium text-black border-2 border-black rounded-[30px] hover:bg-gray-50 transition-colors duration-200"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-3 text-[16px] font-medium text-white bg-[#F45B6A] rounded-[30px] hover:opacity-90 transition-opacity duration-200"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Submit Project
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="w-full flex flex-row justify-center items-center mt-28 sm:mt-32 md:mt-36 lg:mt-[140px]">
            <div className="w-full flex flex-col gap-10 sm:gap-12 md:gap-14 lg:gap-[50px] justify-center items-center bg-global-background1 rounded-t-[44px] p-10 sm:p-12 md:p-14 lg:p-[50px] mt-1 sm:mt-2 md:mt-3 lg:mt-[4px]">
              {/* Footer Content */}
              <div className="w-full flex flex-col gap-12 sm:gap-14 md:gap-16 lg:gap-[66px] justify-start items-center">
                {/* Social Icons */}
                <div className="w-full flex flex-row justify-start items-center">
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
        </div>
      </div>
    </div>
  );
};

export default LaunchpadPage;
