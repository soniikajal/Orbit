'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getEvents, getEventsByMonth, EventBoardEvent } from './event_data';

interface Event {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  organizer: string;
  venue?: string;
  time?: string;
  registrationRequired: boolean;
}

const EventBoardPage: React.FC = () => {
  const { data: session } = useSession();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState<EventBoardEvent[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const eventsPerPage = 8;

  // Load events when component mounts or when month/year changes
  useEffect(() => {
    loadEvents();
  }, [selectedMonth, selectedYear, currentPage]);

  const loadEvents = () => {
    const result = getEvents(currentPage, eventsPerPage, undefined, selectedMonth, selectedYear);
    setEvents(result.events);
    setTotalEvents(result.totalEvents);
    setTotalPages(result.totalPages);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentPage(1); // Reset to first page when changing month
    if (direction === 'prev') {
      if (selectedMonth === 0) {
        setSelectedMonth(11);
        setSelectedYear(selectedYear - 1);
      } else {
        setSelectedMonth(selectedMonth - 1);
      }
    } else {
      if (selectedMonth === 11) {
        setSelectedMonth(0);
        setSelectedYear(selectedYear + 1);
      } else {
        setSelectedMonth(selectedMonth + 1);
      }
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Technical Fest': '#FACC68',
      'Cultural Fest': '#F45B6A',
      'Sports Event': '#68CCFA',
      'Workshop': '#68FACC',
      'Seminar': '#CC68FA',
      'Competition': '#FA8668',
      'Social Impact': '#9ACD32',
    };
    return colors[category as keyof typeof colors] || '#FACC68';
  };

  const addToCalendar = (event: EventBoardEvent) => {
    // This would typically integrate with calendar apps
    console.log('Adding to calendar:', event);
    alert(`Event "${event.title}" added to calendar!`);
  };

  // Pagination functions
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
    <div className="w-full flex flex-col justify-start items-end">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-start items-center">
        <div className="w-full flex flex-col justify-start items-start mt-2 sm:mt-3 md:mt-4">
          <main className="w-full py-2">
            {/* Page Title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[80px] font-bold leading-10 sm:leading-12 md:leading-14 lg:leading-[97px] text-left text-global-text2 mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              Event Board
            </h1>

            {/* Month Navigation */}
            <div className="w-full flex justify-between items-center mb-8">
              <button
                onClick={() => navigateMonth('prev')}
                className="p-3 rounded-full bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="bg-global-background3 rounded-[30px] px-6 py-3">
                <span className="text-global-text4 text-[20px] font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {monthNames[selectedMonth]}, {selectedYear}
                </span>
              </div>

              <button
                onClick={() => navigateMonth('next')}
                className="p-3 rounded-full bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Event Cards Grid */}
            <div className="w-full mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-global-background1 rounded-[30px] p-6 text-global-text4 relative min-h-[400px] flex flex-col"
                  >
                    {/* Date Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-global-background5 text-global-text1 rounded-lg px-2 py-1">
                        <span className="text-[12px] font-medium" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {new Date(event.date).getDate()} {monthNames[new Date(event.date).getMonth()].slice(0, 3)}, {new Date(event.date).getFullYear()}
                        </span>
                      </div>
                    </div>

                    {/* Event Content */}
                    <div className="flex flex-col flex-grow mt-12">
                      {/* Title */}
                      <h3 className="text-[28px] font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {event.title}
                      </h3>

                      {/* Category Tag */}
                      <div 
                        className="rounded-[20px] px-3 py-1 mb-4 w-fit"
                        style={{ backgroundColor: getCategoryColor(event.category) }}
                      >
                        <span className="text-global-text1 text-[12px] font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {event.category}
                        </span>
                      </div>

                      {/* Description */}
                      <div className="flex-grow mb-4">
                        <p className="text-[14px] font-normal leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {event.description}
                        </p>
                      </div>

                      {/* Event Details */}
                      {event.venue && (
                        <div className="mb-2">
                          <span className="text-[12px] text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Venue: {event.venue}
                          </span>
                        </div>
                      )}

                      {event.time && (
                        <div className="mb-4">
                          <span className="text-[12px] text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Time: {event.time}
                          </span>
                        </div>
                      )}

                      {/* Add to Calendar Button */}
                      <button
                        onClick={() => addToCalendar(event)}
                        className="bg-global-background6 text-global-text1 rounded-[25px] px-4 py-2 text-[14px] font-medium hover:opacity-90 transition-opacity duration-200 flex items-center gap-2 w-fit"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <span>📅</span>
                        Add to calendar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="w-full flex justify-center items-center gap-4 mb-12">
                {/* Previous Button */}
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-global-background3 text-global-text4 hover:opacity-90'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Previous
                </button>

                {/* Page Numbers */}
                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === page
                          ? 'bg-global-background3 text-global-text4'
                          : 'bg-gray-200 text-global-text2 hover:bg-gray-300'
                      }`}
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === totalPages
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-global-background3 text-global-text4 hover:opacity-90'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Next
                </button>
              </div>
            )}

            {/* Want Your Event Listed Section */}
            <div className="w-full bg-gray-50 rounded-[30px] p-8 text-center">
              <h2 className="text-[48px] font-bold text-global-text1 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Want your event listed?
              </h2>
              <p className="text-[18px] text-gray-600 mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                Submit the form to get your event listed on the Event Board. (To be filled by Society POCs)
              </p>
              <button
                className="bg-global-background3 text-global-text4 rounded-[30px] px-8 py-4 text-[18px] font-medium hover:opacity-90 transition-opacity duration-200"
                style={{ fontFamily: 'Inter, sans-serif' }}
                onClick={() => {
                  // This would open a form or navigate to submission page
                  console.log('Submit event form');
                  alert('Event submission form would open here!');
                }}
              >
                Submit Event Form
              </button>
            </div>
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
                {/* Contact Info */}
                <div className="w-full flex flex-col lg:flex-row justify-start items-center gap-8 sm:gap-10 md:gap-12 lg:gap-0">
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

export default EventBoardPage;
