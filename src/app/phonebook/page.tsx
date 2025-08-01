'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  FacultyMember, 
  facultyData
} from './faculty_data';

interface DepartmentInfo {
  name: string;
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
  const [facultyPerPage, setFacultyPerPage] = useState(12);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Create department cards with only the 3 specified colors
  const getDepartmentCards = (): DepartmentInfo[] => {
    const uniqueDeps = new Set<string>();
    facultyData.forEach(faculty => {
      uniqueDeps.add(faculty.department.trim());
    });

    const colors = ['#0C3745', '#FACC6B', '#F45B69'];
    
    // Department-specific emoji mapping
    const getDepartmentIcon = (deptName: string): string => {
      const normalizedName = deptName.toLowerCase();
      
      if (normalizedName.includes('computer science') || normalizedName.includes('computer')) return '💻';
      if (normalizedName.includes('information technology') || normalizedName.includes('it')) return '🖥️';
      if (normalizedName.includes('electrical') || normalizedName.includes('electronics')) return '⚡';
      if (normalizedName.includes('mechanical')) return '⚙️';
      if (normalizedName.includes('civil')) return '🏗️';
      if (normalizedName.includes('chemical') || normalizedName.includes('chemistry')) return '⚗️';
      if (normalizedName.includes('biological') || normalizedName.includes('biology') || normalizedName.includes('bio')) return '🧬';
      if (normalizedName.includes('physics')) return '🔬';
      if (normalizedName.includes('mathematics') || normalizedName.includes('math')) return '🔢';
      if (normalizedName.includes('management') || normalizedName.includes('business')) return '📊';
      if (normalizedName.includes('instrumentation') || normalizedName.includes('control')) return '🎛️';
      if (normalizedName.includes('physical education') || normalizedName.includes('sports')) return '🏃';
      if (normalizedName.includes('communication')) return '📡';
      
      // Default icon for unknown departments
      return '🏛️';
    };
    
    return Array.from(uniqueDeps).map((deptName, index) => {
      const facultyCount = facultyData.filter(f => f.department.trim() === deptName).length;
      return {
        name: deptName,
        facultyCount,
        color: colors[index % colors.length],
        icon: getDepartmentIcon(deptName)
      };
    }).filter(dept => dept.facultyCount > 0);
  };

  const [departmentCards] = useState<DepartmentInfo[]>(getDepartmentCards());

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Faculty filtering logic
  useEffect(() => {
    if (selectedDepartment) {
      const departmentFaculty = facultyData.filter(faculty => 
        faculty.department.trim() === selectedDepartment.trim()
      );
      
      if (searchQuery && searchQuery.length >= 2) {
        const filtered = departmentFaculty.filter(faculty =>
          faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faculty.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faculty.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (faculty.specialization && faculty.specialization.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredFaculty(filtered);
      } else {
        setFilteredFaculty(departmentFaculty);
      }
    } else if (searchQuery && searchQuery.length >= 2) {
      const filtered = facultyData.filter(faculty =>
        faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faculty.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (faculty.specialization && faculty.specialization.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredFaculty(filtered);
    } else {
      setFilteredFaculty([]);
    }
    setCurrentPage(1);
  }, [searchQuery, selectedDepartment]);

  // Pagination
  const indexOfLastFaculty = currentPage * facultyPerPage;
  const indexOfFirstFaculty = indexOfLastFaculty - facultyPerPage;
  const currentFaculty = filteredFaculty.slice(indexOfFirstFaculty, indexOfLastFaculty);
  const totalPages = Math.ceil(filteredFaculty.length / facultyPerPage);

  const handleDepartmentSelect = (departmentName: string) => {
    setSelectedDepartment(departmentName);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleBackToDepartments = () => {
    setSelectedDepartment(null);
    setSearchQuery('');
    setCurrentPage(1);
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

  const handlePerPageChange = (newPerPage: number) => {
    setFacultyPerPage(newPerPage);
    setCurrentPage(1);
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
        // Show first 4 pages + ellipsis + last page
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Show first page + ellipsis + last 4 pages
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Show first + ellipsis + current-1, current, current+1 + ellipsis + last
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <>
      <div className="w-full flex flex-col justify-start items-end">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-start items-center">
          <div className={`w-full flex flex-col justify-start items-start transition-all duration-1500 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <main className="w-full py-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold text-left text-global-text2 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                PhoneBook
              </h1>

              {!selectedDepartment ? (
                <>
                  
                  
                  <div className="w-full mb-[15px]">
                    <form className="relative">
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

                  {searchQuery && searchQuery.length >= 2 && (
                    <div className="w-full mb-12">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Search Results ({filteredFaculty.length})
                        </h3>
                      </div>
                      
                      {filteredFaculty.length > 0 ? (
                        <>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentFaculty.map((faculty, index) => (
                              <div
                                key={faculty.id}
                                className="bg-global-background5 border border-global-text2 rounded-[20px] p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-[#F45B69]"
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
                                    <a 
                                      href={`mailto:${faculty.email}`}
                                      className="text-sm text-global-text2 hover:text-[#F45B69] transition-colors block truncate"
                                      style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                      {faculty.email}
                                    </a>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Pagination Controls */}
                          {totalPages > 1 && (
                            <div className="flex flex-col items-center gap-6 mt-10">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  onClick={goToPreviousPage}
                                  disabled={currentPage === 1}
                                  className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-[#F45B69] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                  style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                  </svg>
                                </button>
                                
                                {getPageNumbers().map((page, index) => (
                                  page === '...' ? (
                                    <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                                      ...
                                    </span>
                                  ) : (
                                    <button
                                      key={page}
                                      onClick={() => goToPage(page as number)}
                                      className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200 ${
                                        currentPage === page
                                          ? 'bg-[#F45B69] text-white border-[#F45B69] shadow-md'
                                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-[#F45B69]'
                                      }`}
                                      style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                      {page}
                                    </button>
                                  )
                                ))}

                                <button
                                  onClick={goToNextPage}
                                  disabled={currentPage === totalPages}
                                  className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-[#F45B69] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                  style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </button>
                              </div>
                              
                              <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                                <span style={{ fontFamily: 'Inter, sans-serif' }}>
                                  Showing {indexOfFirstFaculty + 1}-{Math.min(indexOfLastFaculty, filteredFaculty.length)} of {filteredFaculty.length} results
                                </span>
                                <div className="flex items-center gap-2">
                                  <span style={{ fontFamily: 'Inter, sans-serif' }}>Items per page:</span>
                                  {[6, 12, 24].map((perPage) => (
                                    <button
                                      key={perPage}
                                      onClick={() => handlePerPageChange(perPage)}
                                      className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                                        facultyPerPage === perPage
                                          ? 'bg-[#F45B69] text-white shadow-md'
                                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                      }`}
                                      style={{ fontFamily: 'Inter, sans-serif' }}
                                    >
                                      {perPage}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-8">
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

                  {(!searchQuery || searchQuery.length < 2) && (
                    <div className="w-full">
                      <div className="flex flex-col gap-6 mb-8">
                        <div className="flex items-center justify-between">
                          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bold text-left text-global-text2" style={{ fontFamily: 'Playfair Display, serif' }}>
                            Browse by <span className="text-[#F45B69]">Departments</span>
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                            <span>{facultyData.length} Total Faculty</span>
                            <span>•</span>
                            <span>{departmentCards.length} Departments</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {departmentCards.map((dept, index) => (
                          <div
                            key={dept.name}
                            className="bg-global-background5 border border-global-text2 rounded-[20px] p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-[#F45B69] group"
                            onClick={() => handleDepartmentSelect(dept.name)}
                          >
                            <div className="flex items-start gap-4 mb-4">
                              <div 
                                className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                style={{ backgroundColor: dept.color }}
                              >
                                <span className="text-2xl">{dept.icon}</span>
                              </div>
                              <div className="flex-1">
                                <h4 className="text-lg font-bold text-global-text2 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                                  {dept.name}
                                </h4>
                                <span 
                                  className="px-3 py-1 rounded-full text-xs font-medium text-white"
                                  style={{ backgroundColor: dept.color }}
                                >
                                  Department
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-sm text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                                  <span className="font-semibold">{dept.facultyCount}</span> Faculty Members
                                </p>
                              </div>
                              <svg className="w-5 h-5 text-[#F45B69] transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full">
                  <button
                    onClick={handleBackToDepartments}
                    className="flex items-center gap-2 text-[#F45B69] hover:text-[#e04856] transition-colors duration-300 mb-6"
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Departments
                  </button>
                  
                  <div className="mb-8">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[36px] font-bold text-global-text2 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {selectedDepartment}
                    </h3>
                    <p className="text-base text-global-text2" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {filteredFaculty.length} Faculty Members
                    </p>
                  </div>

                  <div className="w-full mb-[15px]">
                    <form className="relative">
                      <div className="relative">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onFocus={() => setIsSearchFocused(true)}
                          onBlur={() => setIsSearchFocused(false)}
                          placeholder="Search within this department..."
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

                  {currentFaculty.length > 0 ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentFaculty.map((faculty, index) => (
                          <div
                            key={faculty.id}
                            className="bg-global-background5 border border-global-text2 rounded-[20px] p-6 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-[#F45B69]"
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
                              {faculty.email && faculty.email !== '{empty}' && (
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                                    <path d="m18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                                  </svg>
                                  <a 
                                    href={`mailto:${faculty.email}`}
                                    className="text-sm text-global-text2 hover:text-[#F45B69] transition-colors truncate"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                    title={faculty.email}
                                  >
                                    {faculty.email.length > 25 ? `${faculty.email.substring(0, 22)}...` : faculty.email}
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pagination Controls */}
                      {totalPages > 1 && (
                        <div className="flex flex-col items-center gap-6 mt-10">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={goToPreviousPage}
                              disabled={currentPage === 1}
                              className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-[#F45B69] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                              </svg>
                            </button>
                            
                            {getPageNumbers().map((page, index) => (
                              page === '...' ? (
                                <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-500" style={{ fontFamily: 'Inter, sans-serif' }}>
                                  ...
                                </span>
                              ) : (
                                <button
                                  key={page}
                                  onClick={() => goToPage(page as number)}
                                  className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-200 ${
                                    currentPage === page
                                      ? 'bg-[#F45B69] text-white border-[#F45B69] shadow-md'
                                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-[#F45B69]'
                                  }`}
                                  style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                  {page}
                                </button>
                              )
                            ))}

                            <button
                              onClick={goToNextPage}
                              disabled={currentPage === totalPages}
                              className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-[#F45B69] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                          
                          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                            <span style={{ fontFamily: 'Inter, sans-serif' }}>
                              Showing {indexOfFirstFaculty + 1}-{Math.min(indexOfLastFaculty, filteredFaculty.length)} of {filteredFaculty.length} results
                            </span>
                            <div className="flex items-center gap-2">
                              <span style={{ fontFamily: 'Inter, sans-serif' }}>Items per page:</span>
                              {[6, 12, 24].map((perPage) => (
                                <button
                                  key={perPage}
                                  onClick={() => handlePerPageChange(perPage)}
                                  className={`px-3 py-1 text-sm rounded-md transition-colors duration-200 ${
                                    facultyPerPage === perPage
                                      ? 'bg-[#F45B69] text-white shadow-md'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  }`}
                                  style={{ fontFamily: 'Inter, sans-serif' }}
                                >
                                  {perPage}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <h3 className="text-xl font-bold text-global-text2 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                        No Faculty Found
                      </h3>
                      <p className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        No faculty members found in {selectedDepartment}.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhonebookPage;