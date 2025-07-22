'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import EditText from '@/components/ui/EditText';
import { 
  FacultyMember, 
  facultyData, 
  departments, 
  searchFaculty, 
  getFacultyStats 
} from './faculty_data';

interface DepartmentInfo {
  name: string;
  campus: string;
  facultyCount: number;
  color: string;
  icon: string;
}

const PhonebookPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [filteredFaculty, setFilteredFaculty] = useState<FacultyMember[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [facultyPerPage] = useState(12);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Department information with campus locations and colors
  const departmentInfo: DepartmentInfo[] = [
    { name: 'Biological Sciences Engineering', campus: 'Main Campus', facultyCount: 0, color: '#114B5F', icon: '🧬' },
    { name: 'Chemistry', campus: 'East Campus', facultyCount: 0, color: '#0C3745', icon: '⚗️' },
    { name: 'Civil Engineering', campus: 'West Campus', facultyCount: 0, color: '#FACC6B', icon: '🏗️' },
    { name: 'Chemistry', campus: 'Main Campus', facultyCount: 0, color: '#0C3745', icon: '⚗️' },
    { name: 'Computer Science & Engineering', campus: 'East Campus', facultyCount: 0, color: '#F45B69', icon: '💻' },
    { name: 'Computer Science & Engineering', campus: 'Main Campus', facultyCount: 0, color: '#F45B69', icon: '💻' },
    { name: 'Electrical Engineering', campus: 'Main Campus', facultyCount: 0, color: '#262626', icon: '⚡' },
    { name: 'Electronics and Communication Engineering', campus: 'East Campus', facultyCount: 0, color: '#114B5F', icon: '📡' },
    { name: 'Electronics and Communication Engineering', campus: 'Main Campus', facultyCount: 0, color: '#114B5F', icon: '📡' },
    { name: 'Humanities and Social Sciences', campus: 'East Campus', facultyCount: 0, color: '#E4FDE1', icon: '📚' },
    { name: 'Humanities and Social Sciences', campus: 'Main Campus', facultyCount: 0, color: '#E4FDE1', icon: '📚' },
    { name: 'Information Technology', campus: 'Main Campus', facultyCount: 0, color: '#0C3745', icon: '🖥️' },
    { name: 'Instrumentation & Control Engineering', campus: 'Main Campus', facultyCount: 0, color: '#FACC6B', icon: '🎛️' },
    { name: 'Management Studies', campus: 'Main Campus', facultyCount: 0, color: '#FFFCF9', icon: '📊' },
    { name: 'Mathematics', campus: 'Main Campus', facultyCount: 0, color: '#262626', icon: '🔢' },
    { name: 'Mechanical Engineering', campus: 'Main Campus', facultyCount: 0, color: '#F45B69', icon: '⚙️' },
    { name: 'Mechanical Engineering', campus: 'West Campus', facultyCount: 0, color: '#F45B69', icon: '⚙️' },
    { name: 'Physics', campus: 'Main Campus', facultyCount: 0, color: '#114B5F', icon: '🔬' },
    { name: 'Physical Education', campus: 'Main Campus', facultyCount: 0, color: '#E4FDE1', icon: '�‍♂️' },
    { name: 'Design', campus: 'Main Campus', facultyCount: 0, color: '#FACC6B', icon: '🎨' },
    { name: 'Architecture and Planning', campus: 'Main Campus', facultyCount: 0, color: '#262626', icon: '🏛️' },
    { name: 'Innovation, Entrepreneurship, and Venture Development (IEV)', campus: 'Main Campus', facultyCount: 0, color: '#F45B69', icon: '💡' },
    { name: 'Geoinformatics', campus: 'West Campus', facultyCount: 0, color: '#0C3745', icon: '🌍' }
  ];

  // Update department info with actual faculty counts
  departmentInfo.forEach(dept => {
    dept.facultyCount = facultyData.filter(faculty => {
      const deptMatch = faculty.department.toLowerCase().includes(dept.name.toLowerCase());
      // For campus matching, we'll use department names as proxy since campusLocation isn't in the interface
      return deptMatch;
    }).length;
  });

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

  // Filter faculty based on search query and selected department
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (selectedDepartment) {
        const deptInfo = departmentInfo.find(d => `${d.name} (${d.campus})` === selectedDepartment);
        if (deptInfo) {
          let filtered = facultyData.filter(faculty => {
            const deptMatch = faculty.department.toLowerCase().includes(deptInfo.name.toLowerCase());
            return deptMatch;
          });
          
          if (searchQuery) {
            filtered = filtered.filter(faculty =>
              faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faculty.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faculty.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faculty.specialization?.toLowerCase().includes(searchQuery.toLowerCase())
            );
          }
          
          setFilteredFaculty(filtered);
        }
      } else {
        // Global search across all departments - only show results when searching
        if (searchQuery && searchQuery.length >= 2) {
          const filtered = facultyData.filter(faculty =>
            faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faculty.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faculty.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faculty.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faculty.specialization?.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredFaculty(filtered);
        } else {
          setFilteredFaculty([]);
        }
      }
      setCurrentPage(1);
    }, 400); // Debounce delay

    return () => clearTimeout(delayDebounce);
  }, [searchQuery, selectedDepartment]);

  // Pagination
  const indexOfLastFaculty = currentPage * facultyPerPage;
  const indexOfFirstFaculty = indexOfLastFaculty - facultyPerPage;
  const currentFaculty = filteredFaculty.slice(indexOfFirstFaculty, indexOfLastFaculty);
  const totalPages = Math.ceil(filteredFaculty.length / facultyPerPage);

  const handleDepartmentSelect = (department: string) => {
    setSelectedDepartment(department);
  };

  const handleBackToDepartments = () => {
    setSelectedDepartment(null);
    setSearchQuery('');
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
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
        <div className={`w-full flex flex-col justify-start items-start mt-8 sm:mt-12 md:mt-16 transition-all duration-1500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Page Header */}
          <div 
            id="phonebook-header"
            data-animate-on-scroll
            className={`w-full flex flex-col gap-6 justify-start items-start transition-all duration-1000 ease-out ${visibleSections.has('phonebook-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-[97px] text-left text-global-text2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>
              Faculty Directory
            </h1>
            <p className="text-base sm:text-lg md:text-xl lg:text-[18px] font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-[28px] text-left text-global-text2 max-w-2xl" style={{ fontFamily: 'Inter, sans-serif' }}>
              Connect with our distinguished faculty members across all departments and campuses.
            </p>
          </div>

          {/* Main Search Bar */}
          <div 
            id="main-search"
            data-animate-on-scroll
            className={`w-full flex flex-col gap-6 mt-16 sm:mt-20 md:mt-24 lg:mt-[120px] transition-all duration-1000 ease-out ${visibleSections.has('main-search') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
          >
            <div className="w-full flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bold leading-7 sm:leading-8 md:leading-9 lg:leading-[44px] text-left text-global-text2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>
                  Search Faculty
                </h3>
                {/* Quick Stats */}
                <div className="hidden md:flex items-center gap-4 text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span>{facultyData.length} Total Faculty</span>
                  <span>•</span>
                  <span>{departmentInfo.filter(d => d.facultyCount > 0).length} Departments</span>
                </div>
              </div>
              
              <div className="w-full mb-[15px]">
                <form onSubmit={(e) => e.preventDefault()} className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      placeholder="Search for faculty by name, department, designation..."
                      className="w-full h-[56px] px-4 pl-6 pr-14 text-base rounded-[30px] focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent transition-all duration-200"
                      style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'white', borderColor: '#9ca3af', borderWidth: '1px' }}
                    />
                    <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </form>
              </div>
              
              {/* Search Tips */}
              {!searchQuery && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Quick search tips:
                  </span>
                  {['Professor', 'Computer Science', 'PhD', 'Mathematics'].map((tip) => (
                    <button
                      key={tip}
                      onClick={() => setSearchQuery(tip)}
                      className="text-xs px-2 py-1 bg-gray-100 hover:bg-[#F45B69] hover:text-white rounded-md transition-colors duration-200"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {tip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {!selectedDepartment ? (
            // Department Cards View
            <div 
              id="departments-grid"
              data-animate-on-scroll
              className={`w-full flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-[40px] mt-16 sm:mt-20 md:mt-24 lg:mt-[80px] transition-all duration-1000 ease-out ${visibleSections.has('departments-grid') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              <div className="w-full flex flex-col gap-4">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bold leading-7 sm:leading-8 md:leading-9 lg:leading-[44px] text-left text-global-text2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>
                  Browse by <span className="text-[#F45B69]">Department</span>
                </h3>
                <p className="text-base sm:text-lg md:text-xl lg:text-[16px] font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-[24px] text-left text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Explore faculty members organized by departments and campus locations.
                </p>
              </div>

              {/* Global Search Results */}
              {searchQuery && searchQuery.length >= 2 && (
                <div className="w-full mb-8">
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-[24px] font-bold leading-6 sm:leading-7 md:leading-8 lg:leading-[29px] text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Search Results ({filteredFaculty.length})
                    </h4>
                    {filteredFaculty.length > 12 && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Show results per page:
                        </span>
                        <select
                          value={facultyPerPage}
                          onChange={(e) => {
                            const newPerPage = parseInt(e.target.value);
                            // Note: facultyPerPage is readonly, but we could make it state if needed
                          }}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <option value={12}>12</option>
                          <option value={24}>24</option>
                          <option value={48}>48</option>
                        </select>
                      </div>
                    )}
                  </div>
                  
                  {filteredFaculty.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {currentFaculty.map((faculty, index) => (
                          <div
                            key={faculty.id}
                            className={`bg-global-background5 border border-global-text2 rounded-[20px] p-6 transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl hover:border-[#F45B69] opacity-100 translate-y-0`}
                            style={{ transitionDelay: `${index * 50}ms` }}
                          >
                            <div className="flex items-center gap-3 mb-4">
                              <div className="w-12 h-12 bg-[#F45B69] rounded-full flex items-center justify-center">
                                <span className="text-lg font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                                  {faculty.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <h5 className="text-lg font-bold text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                                  {faculty.name}
                                </h5>
                                <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                                  {faculty.designation}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-[#F45B69]" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {faculty.department}
                              </p>
                              {faculty.email && faculty.email !== '{empty}' && (
                                <p className="text-sm text-global-text2 truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                                  {faculty.email}
                                </p>
                              )}
                              {faculty.specialization && faculty.specialization !== '{empty}' && (
                                <p className="text-xs text-gray-600 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                                  {faculty.specialization}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Pagination for global search */}
                      {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-8">
                          <button
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                              currentPage === 1
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-[#F45B69] text-white hover:bg-[#e04856]'
                            }`}
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            Previous
                          </button>
                          
                          <div className="flex gap-2">
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                              let pageNum;
                              if (totalPages <= 5) {
                                pageNum = i + 1;
                              } else if (currentPage <= 3) {
                                pageNum = i + 1;
                              } else if (currentPage >= totalPages - 2) {
                                pageNum = totalPages - 4 + i;
                              } else {
                                pageNum = currentPage - 2 + i;
                              }
                              
                              return (
                                <button
                                  key={pageNum}
                                  onClick={() => goToPage(pageNum)}
                                  className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                                    currentPage === pageNum
                                      ? 'bg-[#F45B69] text-white'
                                      : 'bg-gray-100 text-global-text2 hover:bg-gray-200'
                                  }`}
                                  style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                  {pageNum}
                                </button>
                              );
                            })}
                          </div>
                          
                          <button
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                              currentPage === totalPages
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-[#F45B69] text-white hover:bg-[#e04856]'
                            }`}
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-global-text2 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                        No Results Found
                      </h3>
                      <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Try different keywords or browse by department below.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {searchQuery && searchQuery.length < 2 && (
                <div className="w-full mb-8 text-center py-4">
                  <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Please enter at least 2 characters to search
                  </p>
                </div>
              )}

              {/* Department Cards Grid */}
              <div className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-base sm:text-lg md:text-xl lg:text-[16px] font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-[24px] text-left text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Explore faculty members organized by departments and campus locations.
                  </p>
                  <div className="hidden lg:flex items-center gap-2 text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <span>Sort by:</span>
                    <select
                      className="border border-gray-300 rounded px-2 py-1"
                      onChange={(e) => {
                        const sortType = e.target.value;
                        if (sortType === 'name') {
                          departmentInfo.sort((a, b) => a.name.localeCompare(b.name));
                        } else if (sortType === 'faculty') {
                          departmentInfo.sort((a, b) => b.facultyCount - a.facultyCount);
                        } else if (sortType === 'campus') {
                          departmentInfo.sort((a, b) => a.campus.localeCompare(b.campus));
                        }
                      }}
                    >
                      <option value="name">Department Name</option>
                      <option value="faculty">Faculty Count</option>
                      <option value="campus">Campus</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10 lg:gap-[32px]">
                  {departmentInfo.filter(dept => dept.facultyCount > 0).map((dept, index) => (
                    <div
                      key={`${dept.name}-${dept.campus}`}
                      className={`bg-global-background5 border border-global-text2 rounded-[20px] p-6 sm:p-8 md:p-10 lg:p-[32px] cursor-pointer transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl hover:border-[#F45B69] opacity-100 translate-y-0 group`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                      onClick={() => handleDepartmentSelect(`${dept.name} (${dept.campus})`)}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div 
                          className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                          style={{ backgroundColor: dept.color }}
                        >
                          <span className="text-2xl">{dept.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg sm:text-xl md:text-2xl lg:text-[20px] font-bold leading-6 sm:leading-7 md:leading-8 lg:leading-[24px] text-global-text2 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {dept.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span 
                              className="px-3 py-1 rounded-full text-xs font-medium text-white"
                              style={{ backgroundColor: dept.color }}
                            >
                              {dept.campus}
                            </span>
                            {dept.facultyCount > 10 && (
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                                Large Dept.
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                          <p className="text-sm sm:text-base md:text-lg lg:text-[14px] font-normal text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                            <span className="font-semibold">{dept.facultyCount}</span> Faculty Members
                          </p>
                          {dept.facultyCount > 5 && (
                            <p className="text-xs text-gray-500 mt-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                              Click to browse all
                            </p>
                          )}
                        </div>
                        <svg className="w-5 h-5 text-[#F45B69] transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Show message if no departments found */}
                {departmentInfo.filter(dept => dept.facultyCount > 0).length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-global-text2 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                      No Departments Available
                    </h3>
                    <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                      Faculty data is being updated. Please check back later.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            // Department Faculty View
            <div 
              id="department-faculty"
              data-animate-on-scroll
              className={`w-full flex flex-col gap-8 sm:gap-10 md:gap-12 lg:gap-[40px] mt-16 sm:mt-20 md:mt-24 lg:mt-[80px] transition-all duration-1000 ease-out ${visibleSections.has('department-faculty') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            >
              {/* Back Button and Department Header */}
              <div className="w-full flex flex-col gap-6">
                <button
                  onClick={handleBackToDepartments}
                  className="flex items-center gap-2 text-[#F45B69] hover:text-[#e04856] transition-colors duration-300"
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Departments
                </button>
                
                <div>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bold leading-7 sm:leading-8 md:leading-9 lg:leading-[44px] text-left text-global-text2 mb-2" style={{ fontFamily: 'Playfair Display, serif', fontWeight: 'bold' }}>
                    {selectedDepartment}
                  </h3>
                  <div className="flex items-center gap-4 text-base sm:text-lg md:text-xl lg:text-[16px] font-normal leading-6 sm:leading-7 md:leading-8 lg:leading-[24px] text-left text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    <span>{filteredFaculty.length} Faculty Members</span>
                    {filteredFaculty.length > 20 && (
                      <>
                        <span>•</span>
                        <span className="text-yellow-600">Large Department</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Department-specific Search */}
                <div className="w-full max-w-2xl mb-[15px]">
                  <form onSubmit={(e) => e.preventDefault()} className="relative">
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        placeholder="Search within this department..."
                        className="w-full h-[48px] px-4 pl-6 pr-14 text-base rounded-[30px] focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent transition-all duration-200"
                        style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'white', borderColor: '#9ca3af', borderWidth: '1px' }}
                      />
                      <div className="absolute inset-y-0 right-0 pr-5 flex items-center pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Faculty Grid */}
              {currentFaculty.length > 0 ? (
                <>
                  {/* Results Header with Controls */}
                  {filteredFaculty.length > 12 && (
                    <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4 text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        <span>Showing {indexOfFirstFaculty + 1}-{Math.min(indexOfLastFaculty, filteredFaculty.length)} of {filteredFaculty.length}</span>
                        <span>•</span>
                        <span>Page {currentPage} of {totalPages}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Per page:</span>
                        <select
                          value={facultyPerPage}
                          onChange={(e) => {
                            // For future implementation when facultyPerPage becomes state
                            console.log('Change items per page to:', e.target.value);
                          }}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        >
                          <option value={12}>12</option>
                          <option value={24}>24</option>
                          <option value={48}>48</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-10 lg:gap-[32px]">
                    {currentFaculty.map((faculty, index) => (
                      <div
                        key={faculty.id}
                        className={`bg-global-background5 border border-global-text2 rounded-[20px] p-6 transition-all duration-700 ease-out hover:scale-105 hover:shadow-xl hover:border-[#F45B69] opacity-100 translate-y-0 group`}
                        style={{ transitionDelay: `${index * 50}ms` }}
                      >
                        {/* Faculty Header */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-[#F45B69] rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <span className="text-lg font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {faculty.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="flex-1">
                            <h5 className="text-lg font-bold text-global-text2 leading-5" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {faculty.name}
                            </h5>
                            <p className="text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                              {faculty.designation}
                            </p>
                          </div>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-3">
                          {faculty.email && faculty.email !== '{empty}' && (
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                <path d="m18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                              </svg>
                              <a 
                                href={`mailto:${faculty.email}`}
                                className="text-sm text-global-text2 hover:text-[#F45B69] transition-colors duration-300 break-all"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                                title={faculty.email}
                              >
                                {faculty.email.length > 25 ? `${faculty.email.substring(0, 22)}...` : faculty.email}
                              </a>
                            </div>
                          )}

                          {faculty.phone && faculty.phone !== '{empty}' && (
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                              </svg>
                              <a 
                                href={`tel:${faculty.phone}`}
                                className="text-sm text-global-text2 hover:text-[#F45B69] transition-colors duration-300"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              >
                                {faculty.phone}
                              </a>
                            </div>
                          )}

                          {faculty.office && faculty.office !== '{empty}' && (
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                                <circle cx="12" cy="9" r="2.5"/>
                              </svg>
                              <span className="text-sm text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                                {faculty.office}
                              </span>
                            </div>
                          )}

                          {faculty.specialization && faculty.specialization !== '{empty}' && (
                            <div className="mt-4 pt-3 border-t border-gray-200">
                              <p className="text-xs text-gray-600 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                                Specialization
                              </p>
                              <p className="text-sm text-global-text2 line-clamp-3" style={{ fontFamily: 'Inter, sans-serif' }} title={faculty.specialization}>
                                {faculty.specialization.length > 100 ? `${faculty.specialization.substring(0, 97)}...` : faculty.specialization}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-8">
                      <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                          currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-[#F45B69] text-white hover:bg-[#e04856]'
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Previous
                      </button>
                      
                      <div className="flex gap-2">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <button
                              key={pageNum}
                              onClick={() => goToPage(pageNum)}
                              className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                                currentPage === pageNum
                                  ? 'bg-[#F45B69] text-white'
                                  : 'bg-gray-100 text-global-text2 hover:bg-gray-200'
                              }`}
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>
                      
                      <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                          currentPage === totalPages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-[#F45B69] text-white hover:bg-[#e04856]'
                        }`}
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                /* No Results */
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-global-text2 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                    No Faculty Found
                  </h3>
                  <p className="text-gray-600 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                    Try adjusting your search query or check back later for updates.
                  </p>
                </div>
              )}
            </div>
          )}

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
        </div>
      </div>
    </div>
  );
};

export default PhonebookPage;
