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
import { 
  phonebookStyles, 
  fonts, 
  colors, 
  icons 
} from './phonebook_styles';

const PhonebookPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
  const [filteredFaculty, setFilteredFaculty] = useState<FacultyMember[]>(facultyData);
  const [currentPage, setCurrentPage] = useState(1);
  const [facultyPerPage] = useState(6);
  const [newsletterEmail, setNewsletterEmail] = useState('');

  // Filter faculty based on search query and department
  useEffect(() => {
    const filtered = searchFaculty(searchQuery, selectedDepartment);
    setFilteredFaculty(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedDepartment]);

  // Pagination
  const indexOfLastFaculty = currentPage * facultyPerPage;
  const indexOfFirstFaculty = indexOfLastFaculty - facultyPerPage;
  const currentFaculty = filteredFaculty.slice(indexOfFirstFaculty, indexOfLastFaculty);
  const totalPages = Math.ceil(filteredFaculty.length / facultyPerPage);

  const handleSearchChange = (value: string | React.ChangeEvent<HTMLInputElement>) => {
    const stringValue = typeof value === 'string' ? value : value.target.value;
    setSearchQuery(stringValue);
  };

  const handleDepartmentChange = (department: string) => {
    setSelectedDepartment(department);
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
        <div className="w-full flex flex-col justify-start items-start mt-2 sm:mt-3 md:mt-4">
          <main className="w-full py-2">
            {/* Page Title */}
            <h1 className="text-4xl sm:text-5xl md:text-[64px] font-bold text-left text-global-text2 mb-12" style={{ fontFamily: 'Playfair Display, serif' }}>
              PhoneBook
            </h1>

            {/* Search and Filter Section */}
            <div className={phonebookStyles.searchContainer}>
              <div className={phonebookStyles.searchWrapper}>
                <div className={phonebookStyles.searchRow}>
                  {/* Search Input */}
                  <div className={phonebookStyles.searchInputContainer}>
                    <div className={phonebookStyles.searchIcon}>
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icons.search} />
                      </svg>
                    </div>
                    <input
                      type="text"
                      placeholder="Search faculty by name, department, designation, or specialization..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className={phonebookStyles.searchInput}
                      style={{ fontFamily: fonts.body }}
                    />
                  </div>

                  {/* Department Filter */}
                  <div className={phonebookStyles.departmentContainer}>
                    <select
                      value={selectedDepartment}
                      onChange={(e) => handleDepartmentChange(e.target.value)}
                      className={phonebookStyles.departmentSelect}
                      style={{ fontFamily: fonts.body }}
                    >
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Results Count */}
                <div className={`mt-4 ${phonebookStyles.resultCount}`} style={{ fontFamily: fonts.body }}>
                  Showing {currentFaculty.length} of {filteredFaculty.length} faculty members
                </div>
              </div>
            </div>

            {/* Faculty Cards Grid */}
            <div className={phonebookStyles.cardsGrid}>
              {currentFaculty.map((faculty) => (
                <div
                  key={faculty.id}
                  className={phonebookStyles.facultyCard}
                >
                  {/* Faculty Card Header */}
                  <div className={phonebookStyles.cardHeader}>
                    <div className={phonebookStyles.cardHeaderContent}>
                      {/* Avatar Placeholder */}
                      <div className={phonebookStyles.avatar}>
                        <span className={phonebookStyles.avatarText} style={{ fontFamily: fonts.body }}>
                          {faculty.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className={phonebookStyles.cardHeaderText}>
                        <h3 className={phonebookStyles.cardTitle} style={{ fontFamily: fonts.heading }}>
                          {faculty.name}
                        </h3>
                        <p className={phonebookStyles.cardSubtitle} style={{ fontFamily: fonts.body }}>
                          {faculty.designation}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Faculty Card Body */}
                  <div className={phonebookStyles.cardBody}>
                    {/* Department */}
                    <div className={phonebookStyles.departmentBadge}>
                      <div className={phonebookStyles.departmentTag}>
                        <span className={phonebookStyles.departmentText} style={{ fontFamily: fonts.body }}>
                          {faculty.department}
                        </span>
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className={phonebookStyles.contactSection}>
                      {faculty.email && faculty.email !== '{empty}' && (
                        <div className={phonebookStyles.contactItem}>
                          <svg className={phonebookStyles.contactIcon} fill="currentColor" viewBox="0 0 24 24">
                            <path d={icons.email}/>
                          </svg>
                          <a 
                            href={`mailto:${faculty.email}`}
                            className={phonebookStyles.contactLink}
                            style={{ fontFamily: fonts.body }}
                          >
                            {faculty.email}
                          </a>
                        </div>
                      )}

                      {faculty.phone && faculty.phone !== '{empty}' && (
                        <div className={phonebookStyles.contactItem}>
                          <svg className={phonebookStyles.contactIcon} fill="currentColor" viewBox="0 0 24 24">
                            <path d={icons.phone}/>
                          </svg>
                          <a 
                            href={`tel:${faculty.phone}`}
                            className={phonebookStyles.contactLink}
                            style={{ fontFamily: fonts.body }}
                          >
                            {faculty.phone}
                          </a>
                        </div>
                      )}

                      {faculty.office && faculty.office !== '{empty}' && (
                        <div className={phonebookStyles.contactItem}>
                          <svg className={phonebookStyles.contactIcon} fill="currentColor" viewBox="0 0 24 24">
                            <path d={icons.location}/>
                          </svg>
                          <span className={phonebookStyles.contactText} style={{ fontFamily: fonts.body }}>
                            Office: {faculty.office}
                          </span>
                        </div>
                      )}

                      {(!faculty.email || faculty.email === '{empty}') && 
                       (!faculty.phone || faculty.phone === '{empty}') && 
                       (!faculty.office || faculty.office === '{empty}') && (
                        <div className={phonebookStyles.contactItem}>
                          <span className={phonebookStyles.contactText} style={{ fontFamily: fonts.body, color: '#9CA3AF' }}>
                            Contact information not available
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Qualification */}
                    {faculty.qualification && faculty.qualification !== '{empty}' && (
                      <div className="mb-3 sm:mb-4">
                        <h4 className={phonebookStyles.sectionTitle} style={{ fontFamily: fonts.body }}>
                          Qualification
                        </h4>
                        <p className={phonebookStyles.bodyText} style={{ fontFamily: fonts.body }}>
                          {faculty.qualification}
                        </p>
                      </div>
                    )}

                    {/* Specialization */}
                    {faculty.specialization && faculty.specialization !== '{empty}' && (
                      <div>
                        <h4 className={phonebookStyles.sectionTitle} style={{ fontFamily: fonts.body }}>
                          Specialization
                        </h4>
                        <p className={phonebookStyles.bodyText} style={{ fontFamily: fonts.body }}>
                          {faculty.specialization}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* No Results Message */}
            {filteredFaculty.length === 0 && (
              <div className={phonebookStyles.noResults}>
                <div className="mb-4">
                  <svg className={phonebookStyles.noResultsIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={icons.noResults} />
                  </svg>
                </div>
                <h3 className={phonebookStyles.noResultsTitle} style={{ fontFamily: fonts.heading }}>
                  No Faculty Found
                </h3>
                <p className={phonebookStyles.noResultsText} style={{ fontFamily: fonts.body }}>
                  Try adjusting your search criteria or department filter.
                </p>
              </div>
            )}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className={phonebookStyles.pagination}>
                {/* Previous Button */}
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`${phonebookStyles.paginationButton} ${
                    currentPage === 1
                      ? phonebookStyles.paginationButtonDisabled
                      : phonebookStyles.paginationButtonActive
                  }`}
                  style={{ fontFamily: fonts.body }}
                >
                  Previous
                </button>

                {/* Page Numbers */}
                <div className={phonebookStyles.paginationNumbers}>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`${phonebookStyles.pageNumber} ${
                        currentPage === page
                          ? phonebookStyles.pageNumberActive
                          : phonebookStyles.pageNumberInactive
                      }`}
                      style={{ fontFamily: fonts.body }}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`${phonebookStyles.paginationButton} ${
                    currentPage === totalPages
                      ? phonebookStyles.paginationButtonDisabled
                      : phonebookStyles.paginationButtonActive
                  }`}
                  style={{ fontFamily: fonts.body }}
                >
                  Next
                </button>
              </div>
            )}

          </main>

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

export default PhonebookPage;
