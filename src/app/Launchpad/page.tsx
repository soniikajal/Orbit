'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import EditText from '@/components/ui/EditText';
import TextArea from '@/components/ui/TextArea';
import Footer from '@/components/layout/Footer';
import { LaunchpadProject } from './launchpad_projects';


const LaunchpadPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showAddProjectForm, setShowAddProjectForm] = useState(false);
  const [projects, setProjects] = useState<LaunchpadProject[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
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

  // Animation setup
  useEffect(() => {
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

  // Prefill email when session loads
  useEffect(() => {
    if (session?.user?.email) {
      setProjectForm(prev => ({
        ...prev,
        contactEmail: session.user?.email || ''
      }));
    }
  }, [session]);

  // Load initial projects
  useEffect(() => {
    fetch(`/api/launchpad?page=1&limit=12`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProjects(data.projects)
          setTotalProjects(data.total)
          setTotalPages(Math.ceil(data.total / 12))
          setHasMore(data.total > 12)
        }
      })
  }, [])
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();  // Your existing function
      } else {
        // If cleared, reload first page normally
        fetch(`/api/launchpad?page=1&limit=12`)
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              setProjects(data.projects)
              setTotalProjects(data.total)
              setTotalPages(Math.ceil(data.total / 12))
              setHasMore(data.total > 12)
              setCurrentPage(1)
            }
          });
      }
    }, 400); // Adjust debounce delay as needed (ms)

  return () => clearTimeout(delayDebounce);
}, [searchQuery])
  // Load projects for specific page
  const loadPage = async (page: number) => {
    const res = await fetch(`/api/launchpad?page=${page}&limit=12`)
    const data = await res.json()
    if (data.success) {
      setProjects(data.projects)
      setCurrentPage(page)
      setHasMore(page * 12 < data.total)
    }
  }

  const loadMoreProjects = async () => {
    const nextPage = currentPage + 1
    const res = await fetch(`/api/launchpad?page=${nextPage}&limit=12`)
    const data = await res.json()
    if (data.success) {
      setProjects(prev => [...prev, ...data.projects])
      setCurrentPage(nextPage)
      setHasMore(nextPage * 12 < data.total)
    }
  }

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const res = await fetch(`/api/launchpad?search=${encodeURIComponent(searchQuery.trim())}&limit=100`);
    const data = await res.json();

    if (data.success) {
      setProjects(data.projects);
      setCurrentPage(1);
      setHasMore(false); // Search disables pagination
      setTotalProjects(data.projects.length);
      setTotalPages(1);
    }
  };

  const handleDelete = async (projectId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this project?');

    if (!confirmed) return;

    const res = await fetch('/api/launchpad', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: projectId })
    });

    const data = await res.json();

    if (data.success) {
      alert('Project deleted successfully.');
      setProjects(prev => prev.filter(p => p._id !== projectId));
    } else {
      alert(data.message || 'Failed to delete project.');
    }
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
    // Prevent changing the contact email if it's already set from session
    if (field === 'contactEmail' && session?.user?.email) {
      return; // Don't update the email field if user is logged in
    }
    
    setProjectForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProjectFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const skillsArray = projectForm.requiredSkills.split(',').map(s => s.trim()).filter(Boolean)
    const teamArray = projectForm.teamMembers.split(',').map(m => m.trim()).filter(Boolean)

    const newProjectData = {
      projectName: projectForm.projectName,
      category: projectForm.category,
      description: projectForm.description,
      requiredSkills: skillsArray,
      lookingFor: projectForm.lookingFor,
      teamMembers: teamArray,
      contactEmail: projectForm.contactEmail,
      additionalInfo: projectForm.additionalInfo
    }

    const res = await fetch('/api/launchpad', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProjectData)
    })

    const data = await res.json()

    if (data.success) {
      alert('Project submitted for review and will be visible once approved.')
      setShowAddProjectForm(false)
      setProjectForm({
        projectName: '',
        category: '',
        description: '',
        requiredSkills: '',
        lookingFor: '',
        teamMembers: '',
        contactEmail: session?.user?.email || '',
        additionalInfo: ''
      })
    } else {
      alert('Failed to submit project.')
    }
  }


  const handleCloseForm = () => {
    setShowAddProjectForm(false);
  };




  // Pagination helper functions
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      loadPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Smart pagination with ellipsis
      if (currentPage <= 3) {
        // Show first 3 pages + ellipsis + last page
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first page + ellipsis + last 3 pages
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Show first + ellipsis + current-1, current, current+1 + ellipsis + last
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  const getCategoryColor = (category: string) => {
    // Use yellowish color for all categories
    return '#FACC68';
  };

  return (
    <>
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .modal-scroll {
          scrollbar-width: thin;
          scrollbar-color: #e5e7eb #f9fafb;
        }
        .modal-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .modal-scroll::-webkit-scrollbar-track {
          background: #f9fafb;
          border-radius: 3px;
        }
        .modal-scroll::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 3px;
        }
        .modal-scroll::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
        
        /* Custom Scrollbar Styles - Only show when needed */
        .scrollbar-thin {
          scrollbar-width: thin;
          overflow-y: auto;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 3px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #e5e7eb;
          border-radius: 10px;
        }
        
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #d1d5db;
        }
        
        /* Hide scrollbar when content doesn't overflow */
        .scrollbar-thin:not(:hover)::-webkit-scrollbar {
          width: 0px;
        }
        
        .scrollbar-thin:hover::-webkit-scrollbar {
          width: 3px;
        }
      `}</style>
      <div className="w-full flex flex-col justify-start items-end">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-start items-center">
          <div className="w-full flex flex-col justify-start items-start mt-0 sm:mt-0 md:mt-0">
            <main className="w-full py-2">
              {/* Page Title */}
              <div 
                id="page-header"
                data-animate-on-scroll
                className={`transition-all duration-1000 ease-out ${visibleSections.has('page-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-[97px] text-left text-global-text2 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Launch Pad
                </h1>
              </div>

              {/* Search Bar */}
              <div 
                id="search-section"
                data-animate-on-scroll
                className={`w-full mb-[15px] transition-all duration-1000 ease-out delay-200 ${visibleSections.has('search-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
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
              <div 
                id="add-project-button"
                data-animate-on-scroll
                className={`w-full flex justify-center items-center mt-[15px] transition-all duration-1000 ease-out delay-400 ${visibleSections.has('add-project-button') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
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
            <div 
              id="projects-grid"
              data-animate-on-scroll
              className={`w-full mt-8 transition-all duration-1000 ease-out delay-600 ${visibleSections.has('projects-grid') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.map((project, index) => (
                  <div 
                    key={project.id} 
                    className={`w-full max-w-[280px] mx-auto h-[440px] bg-white rounded-[30px] px-4 py-5 shadow-sm border border-gray-100 flex flex-col relative overflow-hidden transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl ${
                      visibleSections.has('projects-grid')
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-8'
                    }`}
                    style={{ 
                      transitionDelay: visibleSections.has('projects-grid') ? `${index * 100}ms` : '0ms'
                    }}
                  >
                    {/* Date - Top Right */}
                    <div className="absolute top-5 right-4">
                      <span className="text-[12px] font-normal text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {project.dateCreated}
                      </span>
                    </div>

                    {/* Scrollable Content Area */}
                    <div className="flex flex-col flex-grow overflow-hidden">
                      {/* Category Tag */}
                      <div 
                        className="rounded-[30px] px-3 py-1 inline-block mb-2 w-fit max-w-[200px] flex-shrink-0"
                        style={{ backgroundColor: getCategoryColor(project.category) }}
                      >
                        <span className="text-[14px] font-bold text-black truncate block" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {project.category}
                        </span>
                      </div>

                      {/* Project Name */}
                      <h2 className="text-[22px] font-bold text-black mb-2 flex-shrink-0 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {project.projectName}
                      </h2>

                      {/* Project Description */}
                      <div className="mb-3 flex-shrink-0">
                        <div 
                          className="text-[13px] font-normal text-black pr-1 overflow-y-auto scrollbar-thin"
                          style={{ 
                            fontFamily: 'Inter, sans-serif',
                            maxHeight: '65px', // ~4 lines at 13px font + line height
                            minHeight: '52px'  // Ensure 4 lines are visible
                          }}
                        >
                          {project.description}
                        </div>
                      </div>

                      {/* Team Members */}
                      <div className="mb-3 flex-shrink-0">
                        <h3 className="text-[13px] font-bold text-black mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>
                          Team Members
                        </h3>
                        <div 
                          className="overflow-y-auto scrollbar-thin"
                          style={{ 
                            maxHeight: '45px',
                            minHeight: '24px'
                          }}
                        >
                          <div className="flex flex-wrap gap-1 pr-1">
                            {project.teamMembers.map((member, i) => (
                              <span key={i} className="text-[10px] bg-gray-100 px-2 py-1 rounded-full text-black flex-shrink-0" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {member}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Required Skills */}
                      <div className="flex-grow min-h-0">
                        <h3 className="text-[13px] font-bold text-black mb-1 flex-shrink-0" style={{ fontFamily: 'Playfair Display, serif' }}>
                          Required Skills
                        </h3>
                        <div 
                          className="overflow-y-auto scrollbar-thin h-full"
                          style={{ 
                            maxHeight: '65px', // ~4 lines at 13px font + line height
                            minHeight: '52px'  // Ensure 4 lines are visible
                          }}
                        >
                          <div className="space-y-1 pr-1">
                            {project.requiredSkills.map((skill, i) => (
                              <div key={i} className="text-[13px] font-normal text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Fixed Bottom Section */}
                    <div className="flex flex-col gap-2 pt-2 mt-2 border-t border-gray-100 bg-white flex-shrink-0">
                      {/* Looking For */}
                      <div className="w-full h-[24px] border border-black rounded-[30px] flex items-center justify-center">
                        <span className="text-[12px] font-bold text-black truncate px-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Looking for: {project.lookingFor}
                        </span>
                      </div>

                      {/* Contact Button */}
                      <a 
                        href={`mailto:${project.contactEmail}?subject=Interested in your project on Launchpad&body=Hi, I saw your project on Launchpad and I'm interested in collaborating.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-[150px] h-[36px] bg-[#F45B6A] rounded-[30px] text-white text-[13px] font-normal hover:opacity-90 transition-opacity duration-200 mx-auto flex items-center justify-center"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Contact the team
                      </a>
                      {session?.user?.email === project.contactEmail && (
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="w-[150px] h-[36px] bg-[#F45B6A] rounded-[30px] text-white text-[13px] font-normal hover:opacity-90 transition-opacity duration-200 mx-auto flex items-center justify-center"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          Delete Project
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div 
                id="pagination-section"
                data-animate-on-scroll
                className={`w-full flex flex-col items-center mt-12 space-y-6 transition-all duration-1000 ease-out delay-800 ${visibleSections.has('pagination-section') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                {/* Page Info */}
                <div className="text-[16px] text-global-text2 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Showing page {currentPage} of {totalPages} ({totalProjects} total projects)
                </div>

                {/* Pagination Buttons */}
                <div className="flex items-center space-x-3">
                  {/* Previous Button */}
                  <button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className={`px-6 py-3 text-[16px] font-medium rounded-[25px] transition-all duration-200 ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-global-background5 text-global-text2 border border-gray-300 hover:bg-gray-50 hover:shadow-md'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-2">
                    {getPageNumbers().map((page, index) => {
                      if (page === '...') {
                        return (
                          <span
                            key={`ellipsis-${index}`}
                            className="px-3 py-3 text-[16px] text-gray-500 font-medium"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            ...
                          </span>
                        );
                      }

                      const pageNum = page as number;
                      const isCurrentPage = pageNum === currentPage;

                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`min-w-[48px] h-[48px] text-[16px] font-medium rounded-[25px] transition-all duration-200 ${
                            isCurrentPage
                              ? 'bg-global-background3 text-global-text4 shadow-md'
                              : 'bg-global-background5 text-global-text2 border border-gray-300 hover:bg-gray-50 hover:shadow-md'
                          }`}
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-6 py-3 text-[16px] font-medium rounded-[25px] transition-all duration-200 ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-global-background5 text-global-text2 border border-gray-300 hover:bg-gray-50 hover:shadow-md'
                    }`}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    Next
                  </button>
                </div>

                {/* Quick Jump Input */}
                <div className="flex items-center space-x-3">
                  <span className="text-[16px] text-global-text2 font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Go to page:
                  </span>
                  <input
                    type="number"
                    min="1"
                    max={totalPages}
                    className="w-20 px-3 py-2 text-[16px] border-2 border-gray-300 rounded-[20px] text-center focus:outline-none focus:ring-2 focus:ring-global-background3 focus:border-transparent transition-all duration-200"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        const page = parseInt((e.target as HTMLInputElement).value);
                        if (page >= 1 && page <= totalPages) {
                          goToPage(page);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                    placeholder={currentPage.toString()}
                  />
                </div>
              </div>
            )}
            </main>

            {/* Add Project Form Modal */}
            {showAddProjectForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-[30px] w-full max-w-2xl max-h-[90vh] overflow-hidden">
                  <div className="max-h-[90vh] overflow-y-auto modal-scroll">
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
                          <option value = "Web Development">Web Development</option>
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
                            placeholder="Enter skills separated by commas (e.g., React, Node.js, Python, UI Design)"
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
                            placeholder="Enter team member names separated by commas (e.g., John, Sarah, Mike)"
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
                          disabled={!!session?.user?.email}
                          readOnly={!!session?.user?.email}
                          className={`w-full h-[50px] px-4 text-[14px] rounded-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B6A] focus:border-transparent transition-all duration-200 ${
                            session?.user?.email ? 'bg-gray-100 cursor-not-allowed' : ''
                          }`}
                          style={{ fontFamily: 'Inter, sans-serif' }}
                          placeholder={session?.user?.email ? "Email locked to your account" : "your.email@example.com"}
                        />
                        {session?.user?.email && (
                          <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Email is automatically set to your logged-in account
                          </p>
                        )}
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
              </div>
            )}

            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default LaunchpadPage;
