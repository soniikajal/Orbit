'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
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

  return (
    <div className={phonebookStyles.container}>
      <div className={phonebookStyles.innerContainer}>
        <div className={phonebookStyles.contentWrapper}>
          <main className={phonebookStyles.mainContent}>
            {/* Page Title */}
            <h1 className={phonebookStyles.pageTitle} style={{ fontFamily: fonts.heading }}>
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
                      <div className="mb-4">
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
        </div>
      </div>
    </div>
  );
};

export default PhonebookPage;
