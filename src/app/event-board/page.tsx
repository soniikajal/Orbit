'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import EditText from '@/components/ui/EditText';
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
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [events, setEvents] = useState<EventBoardEvent[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [showEventForm, setShowEventForm] = useState(false);
  const [eventForm, setEventForm] = useState({
    eventName: '',
    category: '',
    description: '',
    venue: '',
    date: '',
    time: '',
    organizer: '',
    contactEmail: '',
    registrationRequired: false,
    additionalInfo: ''
  });
  const eventsPerPage = 8;

  // Prefill email when session loads
  useEffect(() => {
    if (session?.user?.email) {
      setEventForm(prev => ({
        ...prev,
        contactEmail: session.user?.email || ''
      }));
    }
  }, [session]);

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
      'Technical Fest': '#FACC6B',
      'Cultural Fest': '#F45B69',
      'Sports Event': '#68CCFA',
      'Workshop': '#68FACC',
      'Seminar': '#CC68FA',
      'Competition': '#FA8668',
      'Social Impact': '#9ACD32',
    };
    return colors[category as keyof typeof colors] || '#FACC6B';
  };

  const addToCalendar = (event: EventBoardEvent) => {
    // This would typically integrate with calendar apps
    console.log('Adding to calendar:', event);
    alert(`Event "${event.title}" added to calendar!`);
  };

  const handleNewsletterEmailChange = (value: string | React.ChangeEvent<HTMLInputElement>) => {
    const stringValue = typeof value === 'string' ? value : value.target.value;
    setNewsletterEmail(stringValue);
  };

  const handleNewsletterSubmit = () => {
    console.log('Newsletter subscription:', newsletterEmail);
    setNewsletterEmail('');
  };

  const handleEventFormChange = (field: string, value: string | boolean) => {
    setEventForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEventFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Event submission:', eventForm);
    
    // Here you would typically send the data to your backend
    const eventData = {
      ...eventForm,
      submittedBy: session?.user?.email || eventForm.contactEmail,
      submittedAt: new Date().toISOString(),
      status: 'pending'
    };
    
    console.log('Event data to be submitted:', eventData);
    alert('Event submitted successfully! It will be reviewed and added to the board.');
    setShowEventForm(false);
    
    // Reset form
    setEventForm({
      eventName: '',
      category: '',
      description: '',
      venue: '',
      date: '',
      time: '',
      organizer: '',
      contactEmail: session?.user?.email || '',
      registrationRequired: false,
      additionalInfo: ''
    });
  };

  const handleCloseEventForm = () => {
    setShowEventForm(false);
  };

  const handleAddEventClick = () => {
    if (!session) {
      // Redirect to signin with callbackUrl to return to event board
      router.push('/auth/signin?callbackUrl=' + encodeURIComponent('/event-board'));
      return;
    }
    setShowEventForm(true);
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
      <style jsx global>{`
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
      `}</style>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-start items-center">
        <div className="w-full flex flex-col justify-start items-start mt-2 sm:mt-3 md:mt-4">
          <main className="w-full py-2">
            {/* Page Title */}
            <h1 className="text-4xl sm:text-5xl md:text-[64px] font-bold text-left text-global-text2 mb-12" style={{ fontFamily: 'Playfair Display, serif' }}>
              Event Board
            </h1>

            {/* Month Navigation */}
            <div className="w-full flex justify-start items-center mb-12">
              <button
                onClick={() => navigateMonth('prev')}
                className="mr-4 hover:opacity-70 transition-opacity duration-200"
              >
                <svg className="w-8 h-8 text-black font-bold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>

              <div className="bg-[#F45B69] rounded-[25px] px-6 py-3 flex items-center gap-3">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
                <span className="text-white text-[18px] font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {monthNames[selectedMonth]}, {selectedYear}
                </span>
              </div>

              <button
                onClick={() => navigateMonth('next')}
                className="ml-4 hover:opacity-70 transition-opacity duration-200"
              >
                <svg className="w-8 h-8 text-black font-bold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>
            </div>

            {/* Event Cards Horizontal Scroll */}
            <div className="w-full mb-12 relative">
              {/* Carousel Navigation Buttons */}
              <button
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#FACC6B] rounded-full p-3 hover:bg-[#F4C430] transition-colors duration-200 -ml-16"
                onClick={() => {
                  const container = document.getElementById('event-cards-container');
                  if (container) {
                    container.scrollBy({ left: -300, behavior: 'smooth' });
                  }
                }}
              >
                <svg className="w-6 h-6 text-black font-bold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>

              <button
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#FACC6B] rounded-full p-3 hover:bg-[#F4C430] transition-colors duration-200 -mr-16"
                onClick={() => {
                  const container = document.getElementById('event-cards-container');
                  if (container) {
                    container.scrollBy({ left: 300, behavior: 'smooth' });
                  }
                }}
              >
                <svg className="w-6 h-6 text-black font-bold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>

              {/* Scrollable Cards Container */}
              <div 
                id="event-cards-container"
                className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 items-start"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-[#262626] rounded-[25px] p-6 text-white relative flex flex-col flex-shrink-0 self-start"
                    style={{ 
                      width: 'calc(25% - 12px)',
                      minWidth: '260px'
                    }}
                  >
                    {/* Date Badge */}
                    <div className="absolute top-5 right-5">
                      <span className="text-[#FACC6B] text-[12px] font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {new Date(event.date).getDate()} {monthNames[new Date(event.date).getMonth()].slice(0, 3)}, {new Date(event.date).getFullYear()}
                      </span>
                    </div>

                    {/* Event Content */}
                    <div className="flex flex-col mt-4 pt-8">
                      {/* Title */}
                      <h3 className="text-[28px] font-bold mb-3 text-white leading-tight pr-16" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {event.title}
                      </h3>

                      {/* Category Tag */}
                      <div className="mb-4 w-fit border border-[#FACC6B] rounded-[15px] px-3 py-1">
                        <span className="text-[#FACC6B] text-[11px] font-bold uppercase tracking-wide" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {event.category}
                        </span>
                      </div>

                      {/* Description */}
                      <div className="mb-6">
                        <p className="text-[14px] font-normal leading-relaxed text-gray-300" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {event.description}
                        </p>
                      </div>

                      {/* Event Details */}
                      {event.venue && (
                        <div className="mb-1">
                          <span className="text-[12px] text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Venue: {event.venue}
                          </span>
                        </div>
                      )}

                      {event.time && (
                        <div className="mb-4">
                          <span className="text-[12px] text-gray-400" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Time: {event.time}
                          </span>
                        </div>
                      )}

                      {/* Add to Calendar Button */}
                      <button
                        onClick={() => addToCalendar(event)}
                        className="flex items-center gap-3 w-fit hover:opacity-90 transition-opacity duration-200"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <div className="bg-[#FACC6B] rounded-full p-2 flex items-center justify-center">
                          <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(315deg)' }}>
                            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                          </svg>
                        </div>
                        <span className="text-white text-[14px] font-bold">Add to calendar</span>
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
            <div className="w-full bg-[#FFFCF9] rounded-[30px] p-8 text-center">
              <h2 className="text-[48px] font-bold text-global-text1 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Want your event listed?
              </h2>
              <p className="text-[18px] text-[#262626] mb-6" style={{ fontFamily: 'Inter, sans-serif' }}>
                Submit the form to get your event listed on the Event Board. (To be filled by Society POCs)
              </p>
              <button
                className="bg-global-background3 text-global-text4 rounded-[30px] px-8 py-4 text-[18px] font-medium hover:opacity-90 transition-opacity duration-200"
                style={{ fontFamily: 'Inter, sans-serif' }}
                onClick={handleAddEventClick}
              >
                Submit Event Form
              </button>
            </div>
          </main>

          {/* Event Submission Form Modal */}
          {showEventForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-[30px] w-full max-w-2xl max-h-[90vh] overflow-hidden">
                <div className="max-h-[90vh] overflow-y-auto modal-scroll">
                  <div className="p-8">
                  {/* Form Header */}
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-[32px] font-bold text-black" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Submit Your Event
                    </h2>
                    <button 
                      onClick={handleCloseEventForm}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleEventFormSubmit} className="space-y-6">
                    {/* Event Name */}
                    <div>
                      <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Event Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={eventForm.eventName}
                        onChange={(e) => handleEventFormChange('eventName', e.target.value)}
                        className="w-full h-[50px] px-4 text-[14px] rounded-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent transition-all duration-200"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        placeholder="Enter your event name"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Category *
                      </label>
                      <select
                        required
                        value={eventForm.category}
                        onChange={(e) => handleEventFormChange('category', e.target.value)}
                        className="w-full h-[50px] px-4 text-[14px] rounded-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent transition-all duration-200"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <option value="">Select a category</option>
                        <option value="Technical Fest">Technical Fest</option>
                        <option value="Cultural Fest">Cultural Fest</option>
                        <option value="Sports Event">Sports Event</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Seminar">Seminar</option>
                        <option value="Competition">Competition</option>
                        <option value="Social Impact">Social Impact</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Event Description *
                      </label>
                      <textarea
                        required
                        value={eventForm.description}
                        onChange={(e) => handleEventFormChange('description', e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 text-[14px] rounded-[20px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent transition-all duration-200 resize-none"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        placeholder="Describe your event, its purpose, and what attendees can expect..."
                      />
                    </div>

                    {/* Venue and Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Venue *
                        </label>
                        <input
                          type="text"
                          required
                          value={eventForm.venue}
                          onChange={(e) => handleEventFormChange('venue', e.target.value)}
                          className="w-full h-[50px] px-4 text-[14px] rounded-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent transition-all duration-200"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                          placeholder="Event venue"
                        />
                      </div>
                      <div>
                        <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Date *
                        </label>
                        <input
                          type="date"
                          required
                          value={eventForm.date}
                          onChange={(e) => handleEventFormChange('date', e.target.value)}
                          className="w-full h-[50px] px-4 text-[14px] rounded-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent transition-all duration-200"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        />
                      </div>
                    </div>

                    {/* Time and Organizer */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Time
                        </label>
                        <input
                          type="time"
                          value={eventForm.time}
                          onChange={(e) => handleEventFormChange('time', e.target.value)}
                          className="w-full h-[50px] px-4 text-[14px] rounded-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent transition-all duration-200"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                        />
                      </div>
                      <div>
                        <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Organizer *
                        </label>
                        <input
                          type="text"
                          required
                          value={eventForm.organizer}
                          onChange={(e) => handleEventFormChange('organizer', e.target.value)}
                          className="w-full h-[50px] px-4 text-[14px] rounded-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent transition-all duration-200"
                          style={{ fontFamily: 'Inter, sans-serif' }}
                          placeholder="Organizing body/society"
                        />
                      </div>
                    </div>

                    {/* Contact Email */}
                    <div>
                      <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Contact Email *
                        {session?.user?.email && (
                          <span className="ml-2 text-[12px] font-normal text-blue-600">(Default: {session.user.email})</span>
                        )}
                      </label>
                      <input
                        type="email"
                        required
                        value={eventForm.contactEmail}
                        onChange={(e) => handleEventFormChange('contactEmail', e.target.value)}
                        className="w-full h-[50px] px-4 text-[14px] rounded-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent transition-all duration-200"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        placeholder="your.email@example.com"
                      />
                      {session?.user?.email && eventForm.contactEmail !== session.user.email && (
                        <p className="mt-1 text-[12px] text-orange-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Using different email than your account
                        </p>
                      )}
                    </div>

                    {/* Registration Required */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="registrationRequired"
                        checked={eventForm.registrationRequired}
                        onChange={(e) => handleEventFormChange('registrationRequired', e.target.checked)}
                        className="w-4 h-4 text-[#F45B69] border border-gray-300 rounded focus:ring-[#F45B69] focus:ring-2"
                      />
                      <label htmlFor="registrationRequired" className="text-[16px] font-bold text-black" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Registration Required
                      </label>
                    </div>

                    {/* Additional Info */}
                    <div>
                      <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Additional Information (Optional)
                      </label>
                      <textarea
                        value={eventForm.additionalInfo}
                        onChange={(e) => handleEventFormChange('additionalInfo', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 text-[14px] rounded-[20px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent transition-all duration-200 resize-none"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        placeholder="Any additional details about your event..."
                      />
                    </div>

                    {/* Form Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        type="button"
                        onClick={handleCloseEventForm}
                        className="w-full sm:w-auto px-8 py-3 text-[16px] font-medium text-black border-2 border-black rounded-[30px] hover:bg-gray-50 transition-colors duration-200"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-3 text-[16px] font-medium text-white bg-[#F45B69] rounded-[30px] hover:opacity-90 transition-opacity duration-200"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        Submit Event
                      </button>
                    </div>
                  </form>
                  </div>
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
                    <div className="bg-[#F45B69] rounded-lg px-3 sm:px-4 md:px-5 lg:px-[16px] py-2 sm:py-2.5 md:py-3 lg:py-[8px] inline-block">
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
                        backgroundColor: '#F45B69', 
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

export default EventBoardPage;
