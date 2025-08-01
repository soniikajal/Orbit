'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import EditText from '@/components/ui/EditText';
import { EventBoardEvent } from './event_data';
import { getAvailableVenues, navigateToVenue, VenueLocation } from '@/utils/venues';

interface Event {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  organizer: string;
  venue?: string;
  time?: string;
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
  const [showEventForm, setShowEventForm] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [availableVenues, setAvailableVenues] = useState<VenueLocation[]>([]);
  const [filteredVenues, setFilteredVenues] = useState<VenueLocation[]>([]);
  const [showVenueDropdown, setShowVenueDropdown] = useState(false);
  const [venueSearchQuery, setVenueSearchQuery] = useState('');
  const [showOrganizerDropdown, setShowOrganizerDropdown] = useState(false);
  const [isOrganizerOther, setIsOrganizerOther] = useState(false);
  const [isCategoryOther, setIsCategoryOther] = useState(false);
  const [eventDates, setEventDates] = useState<string[]>(['']);
  const [eventForm, setEventForm] = useState({
    eventName: '',
    category: '',
    description: '',
    venue: '',
    date: '',
    time: '',
    organizer: '',
    contactEmail: '',
    additionalInfo: ''
  });
  const eventsPerPage = 8;

  // Organizer suggestions
  const organizerSuggestions = [
    'Ashwamedh',
    'Crescendo',
    'Junoon',
    'Mirage',
    'Spic Macay',
    'IEEE',
    'Enactus',
    'FES',
    'E-Cell',
    'TEDxNSIT',
    'The Alliance',
    'Crosslinks',
    'DebSOC',
    'Other'
  ];

  // Load available venues when component mounts
  useEffect(() => {
    const loadVenues = async () => {
      try {
        const venues = await getAvailableVenues();
        console.log('Loaded venues:', venues.length);
        setAvailableVenues(venues);
        setFilteredVenues(venues);
      } catch (error) {
        console.error('Error loading venues:', error);
      }
    };
    loadVenues();
  }, []);

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

  // Handle click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Close organizer dropdown if clicking outside
      if (showOrganizerDropdown && !target.closest('.organizer-dropdown-container')) {
        setShowOrganizerDropdown(false);
      }
      
      // Close venue dropdown if clicking outside
      if (showVenueDropdown && !target.closest('.venue-dropdown-container')) {
        setShowVenueDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showOrganizerDropdown, showVenueDropdown]);

  const loadEvents = async () => {
    try {
      const res = await fetch(`/api/event-board?page=${currentPage}&limit=${eventsPerPage}&month=${selectedMonth}&year=${selectedYear}`);
      const data = await res.json();
      setEvents(Array.isArray(data.events) ? data.events : []);
      setTotalEvents(typeof data.totalEvents === 'number' ? data.totalEvents : 0);
      setTotalPages(typeof data.totalPages === 'number' ? data.totalPages : 1);
    } catch (err) {
      console.error('Failed to load events:', err);
    }
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
    const date = new Date(event.date);
    const endDate = new Date(date);
    endDate.setHours(date.getHours() + 1); // Default 1 hour event

    const formatDate = (d: Date) =>
      d.toISOString().replace(/-|:|\.\d\d\d/g, '').slice(0, 15) + 'Z';

    const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      event.title
    )}&dates=${formatDate(date)}/${formatDate(
      endDate
    )}&details=${encodeURIComponent(
      event.description
    )}&location=${encodeURIComponent(event.venue || '')}`;

    window.open(calendarUrl, '_blank');
  };

  const handleEventFormChange = (field: string, value: string | boolean) => {
    // Prevent changes to contactEmail field - it should remain locked to user's session email
    if (field === 'contactEmail') {
      return;
    }
    setEventForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVenueSearch = (query: string) => {
    setVenueSearchQuery(query);
    setEventForm(prev => ({ ...prev, venue: query }));
    
    if (query.trim() === '') {
      setFilteredVenues(availableVenues);
    } else {
      const filtered = availableVenues.filter(venue =>
        venue.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredVenues(filtered);
    }
    setShowVenueDropdown(true);
  };

  const handleOrganizerSelect = (organizer: string) => {
    if (organizer === 'Other') {
      setIsOrganizerOther(true);
      setEventForm(prev => ({ ...prev, organizer: '' }));
    } else {
      setIsOrganizerOther(false);
      setEventForm(prev => ({ ...prev, organizer }));
    }
    setShowOrganizerDropdown(false);
  };

  const handleCategoryChange = (category: string) => {
    if (category === 'Other') {
      setIsCategoryOther(true);
      setEventForm(prev => ({ ...prev, category: '' }));
    } else {
      setIsCategoryOther(false);
      setEventForm(prev => ({ ...prev, category }));
    }
  };

  const addEventDate = () => {
    setEventDates(prev => [...prev, '']);
  };

  const removeEventDate = (index: number) => {
    if (eventDates.length > 1) {
      setEventDates(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateEventDate = (index: number, date: string) => {
    setEventDates(prev => prev.map((d, i) => i === index ? date : d));
    // Update the main form date with the first date for backward compatibility
    if (index === 0) {
      setEventForm(prev => ({ ...prev, date }));
    }
  };

  const handleVenueSelect = (venueName: string) => {
    setEventForm(prev => ({ ...prev, venue: venueName }));
    setVenueSearchQuery(venueName);
    setShowVenueDropdown(false);
  };

  const handleVenueInputFocus = () => {
    setShowVenueDropdown(true);
    if (venueSearchQuery.trim() === '') {
      setFilteredVenues(availableVenues);
    }
  };

  const handleVenueInputBlur = () => {
    // Delay hiding dropdown to allow for click selection
    setTimeout(() => {
      setShowVenueDropdown(false);
    }, 300);
  };

  const handleEventFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Filter out empty dates and sort them
    const validDates = eventDates.filter(date => date.trim() !== '').sort();

    const eventData = {
      title: eventForm.eventName,
      category: eventForm.category,
      description: eventForm.description,
      venue: eventForm.venue || undefined, // Send undefined if empty
      date: validDates[0] || eventForm.date, // Use first date as primary date
      additionalDates: validDates.length > 1 ? validDates.slice(1) : [], // Additional dates for multi-day events
      time: eventForm.time || undefined, // Send undefined if empty
      organizer: eventForm.organizer,
      contactEmail: session?.user?.email || '',
      additionalInfo: eventForm.additionalInfo,
    };

    try {
      const res = await fetch('/api/event-board', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });

      const data = await res.json();

      if (data.success) {
        alert('Event submitted successfully!');
        setShowEventForm(false);
        loadEvents();
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
          additionalInfo: '',
        });
        setEventDates(['']);
        setVenueSearchQuery('');
        setFilteredVenues(availableVenues);
        setShowOrganizerDropdown(false);
        setIsOrganizerOther(false);
        setIsCategoryOther(false);
      } else {
        alert(data.message || 'Submission failed.');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting event');
    }
  };


  const handleCloseEventForm = () => {
    setShowEventForm(false);
    // Reset form to default values with locked email
    setEventForm({
      eventName: '',
      category: '',
      description: '',
      venue: '',
      date: '',
      time: '',
      organizer: '',
      contactEmail: session?.user?.email || '',
      additionalInfo: ''
    });
    setEventDates(['']);
    setVenueSearchQuery('');
    setFilteredVenues(availableVenues);
    setShowOrganizerDropdown(false);
    setIsOrganizerOther(false);
    setIsCategoryOther(false);
    setShowVenueDropdown(false);
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
            <div 
              id="page-header"
              data-animate-on-scroll
              className={`transition-all duration-1000 ease-out ${visibleSections.has('page-header') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <h1 className="text-[clamp(32px,8vw,80px)] font-bold leading-tight text-left text-global-text2 mb-6 sm:mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
                Event Board
              </h1>
            </div>

            {/* Month Navigation */}
            <div 
              id="month-navigation"
              data-animate-on-scroll
              className={`w-full flex justify-center sm:justify-start items-center mb-8 sm:mb-12 transition-all duration-1000 ease-out delay-200 ${visibleSections.has('month-navigation') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <button
                onClick={() => navigateMonth('prev')}
                className="mr-3 sm:mr-4 hover:opacity-70 transition-opacity duration-200 p-1"
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-black font-bold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>

              <div className="bg-[#F45B69] rounded-[20px] sm:rounded-[25px] px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
                </svg>
                <span className="text-white text-[14px] sm:text-[18px] font-bold" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {monthNames[selectedMonth]}, {selectedYear}
                </span>
              </div>

              <button
                onClick={() => navigateMonth('next')}
                className="ml-3 sm:ml-4 hover:opacity-70 transition-opacity duration-200 p-1"
              >
                <svg className="w-6 h-6 sm:w-8 sm:h-8 text-black font-bold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                </svg>
              </button>
            </div>

            {/* Event Cards Horizontal Scroll */}
            <div 
              id="events"
              data-animate-on-scroll 
              className="w-full mb-8 sm:mb-12 relative transition-all duration-1000 ease-out" 
              style={{ 
                opacity: visibleSections.has('events') ? 1 : 0,
                transform: visibleSections.has('events') ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: '0.5s'
              }}
            >
              {/* Carousel Navigation Buttons - Visible on desktop */}
              <button
                className="hidden sm:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#FACC6B] rounded-full p-3 hover:bg-[#F4C430] transition-colors duration-200 -ml-16"
                onClick={() => {
                  const container = document.getElementById('event-cards-container');
                  if (container) {
                    const isAtStart = container.scrollLeft <= 10; // 10px tolerance

                    if (isAtStart) {
                      navigateMonth('prev');
                    } else {
                      container.scrollBy({ left: -300, behavior: 'smooth' });
                    }
                  }
                }}
              >
                <svg className="w-6 h-6 text-black font-bold" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                </svg>
              </button>

              <button
                className="hidden sm:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-[#FACC6B] rounded-full p-3 hover:bg-[#F4C430] transition-colors duration-200 -mr-16"
                onClick={() => {
                  const container = document.getElementById('event-cards-container');
                  if (container) {
                    const isAtEnd =
                      container.scrollLeft + container.offsetWidth >= container.scrollWidth - 10; // 10px tolerance

                    if (isAtEnd) {
                      navigateMonth('next');
                    } else {
                      container.scrollBy({ left: 300, behavior: 'smooth' });
                    }
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
                className="flex gap-1 sm:gap-2 lg:gap-1 xl:gap-2 overflow-x-auto scrollbar-hide pb-4 items-start"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="bg-[#262626] rounded-[20px] sm:rounded-[25px] p-3 sm:p-4 text-white relative flex flex-col flex-shrink-0 self-start overflow-hidden w-[calc(80vw-16px)] sm:w-[calc(45vw-16px)] lg:w-[calc(20vw-2px)] xl:w-[calc(19vw-1px)]"
                    style={{ 
                      minWidth: '200px',
                      maxWidth: '280px'
                    }}
                  >
                    {/* Date Badge */}
                    <div className="absolute top-3 sm:top-5 right-3 sm:right-5 max-w-[100px] sm:max-w-[120px]">
                      <span className="text-[#FACC6B] text-[10px] sm:text-[12px] font-bold break-words text-right block" style={{ 
                        fontFamily: 'Inter, sans-serif',
                        wordWrap: 'break-word',
                        lineHeight: '1.2'
                      }}>
                        {new Date(event.date).getDate()} {monthNames[new Date(event.date).getMonth()].slice(0, 3)}, {new Date(event.date).getFullYear()}
                      </span>
                    </div>

                    {/* Event Content */}
                    <div className="flex flex-col mt-3 sm:mt-4 pt-2 min-h-0 flex-1">
                      {/* Title */}
                      <h3 className="text-[22px] sm:text-[28px] font-bold mb-2 sm:mb-3 text-white leading-tight pr-12 sm:pr-16 break-words overflow-hidden" style={{ 
                        fontFamily: 'Playfair Display, serif',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        wordWrap: 'break-word',
                        hyphens: 'auto'
                      }}>
                        {event.title}
                      </h3>

                      {/* Category Tag */}
                      <div className="mb-3 sm:mb-4 w-fit border border-[#FACC6B] rounded-[12px] sm:rounded-[15px] px-2 sm:px-3 py-1 flex-shrink-0">
                        <span className="text-[#FACC6B] text-[9px] sm:text-[11px] font-bold uppercase tracking-wide break-words" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {event.category}
                        </span>
                      </div>

                      {/* Description */}
                      <div className="mb-4 sm:mb-6 flex-1 min-h-0">
                        <p className="text-[12px] sm:text-[14px] font-normal leading-relaxed text-gray-300 break-words" style={{ 
                          fontFamily: 'Inter, sans-serif',
                          wordWrap: 'break-word',
                          hyphens: 'auto'
                        }}>
                          {event.description}
                        </p>
                      </div>

                      {/* Event Details */}
                      <div className="mb-3 sm:mb-4 flex-shrink-0">
                        <div className="mb-1">
                          <span className="text-[10px] sm:text-[12px] text-gray-400 break-words block" style={{ 
                            fontFamily: 'Inter, sans-serif',
                            wordWrap: 'break-word',
                            hyphens: 'auto'
                          }}>
                            <span className="font-bold text-[#FACC6B]">Venue:</span>{' '}
                            {event.venue ? (
                              availableVenues.some(venue => venue.name === event.venue || venue.originalName === event.venue) ? (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    console.log('Navigating to venue:', event.venue);
                                    navigateToVenue(event.venue!);
                                  }}
                                  className="text-gray-400 hover:text-gray-300 underline transition-colors duration-200 cursor-pointer inline-flex items-center gap-1"
                                  title="Click to navigate to this location"
                                >
                                  {event.venue}
                                  <svg className="w-2 h-2 sm:w-3 sm:h-3 opacity-70" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                                  </svg>
                                </button>
                              ) : (
                                <span className="text-gray-400">{event.venue}</span>
                              )
                            ) : (
                              'TBA'
                            )}
                          </span>
                        </div>

                        <div className="mb-2">
                          <span className="text-[10px] sm:text-[12px] text-gray-400 break-words block" style={{ 
                            fontFamily: 'Inter, sans-serif',
                            wordWrap: 'break-word'
                          }}>
                            <span className="font-bold text-[#FACC6B]">Time:</span> {event.time || 'TBA'}
                          </span>
                        </div>

                        <div className="mb-2">
                          <span className="text-[10px] sm:text-[12px] text-gray-400 break-words block" style={{ 
                            fontFamily: 'Inter, sans-serif',
                            wordWrap: 'break-word',
                            hyphens: 'auto'
                          }}>
                            <span className="font-bold text-[#FACC6B]">Organizer:</span> {event.organizer || 'TBA'}
                          </span>
                        </div>
                      </div>

                      {/* Add to Calendar Button */}
                      <button
                        onClick={() => addToCalendar(event)}
                        className="flex items-center gap-2 sm:gap-3 w-fit hover:opacity-90 transition-opacity duration-200 flex-shrink-0 mt-auto"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                      >
                        <div className="bg-[#FACC6B] rounded-full p-1.5 sm:p-2 flex items-center justify-center flex-shrink-0">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-black" fill="currentColor" viewBox="0 0 24 24" style={{ transform: 'rotate(315deg)' }}>
                            <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z"/>
                          </svg>
                        </div>
                        <span className="text-white text-[12px] sm:text-[14px] font-bold whitespace-nowrap">Add to calendar</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div 
                id="pagination"
                data-animate-on-scroll 
                className="w-full flex justify-center items-center gap-2 sm:gap-4 mb-8 sm:mb-12 transition-all duration-1000 ease-out px-4" 
                style={{ 
                  opacity: visibleSections.has('pagination') ? 1 : 0,
                  transform: visibleSections.has('pagination') ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: '0.7s'
                }}
              >
                {/* Previous Button */}
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                    currentPage === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-global-background3 text-global-text4 hover:opacity-90'
                  }`}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                >
                  Prev
                </button>

                {/* Page Numbers */}
                <div className="flex gap-1 sm:gap-2 overflow-x-auto scrollbar-hide max-w-[200px] sm:max-w-none">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`px-2 sm:px-3 py-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base flex-shrink-0 ${
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
                  className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
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
            <div 
              id="event-form-cta"
              data-animate-on-scroll 
              className="w-full bg-[#FFFCF9] rounded-[20px] sm:rounded-[30px] p-6 sm:p-8 text-center transition-all duration-1000 ease-out" 
              style={{ 
                opacity: visibleSections.has('event-form-cta') ? 1 : 0,
                transform: visibleSections.has('event-form-cta') ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: '0.9s'
              }}
            >
              <h2 className="text-[clamp(28px,6vw,48px)] font-bold text-global-text1 mb-3 sm:mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                Want your event listed?
              </h2>
              <p className="text-[14px] sm:text-[18px] text-[#262626] mb-4 sm:mb-6 leading-relaxed px-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                Submit the form to get your event listed on the Event Board. (To be filled by Society POCs)
              </p>
              <button
                className="bg-global-background3 text-global-text4 rounded-[20px] sm:rounded-[30px] px-6 sm:px-8 py-3 sm:py-4 text-[16px] sm:text-[18px] font-medium hover:opacity-90 transition-opacity duration-200"
                style={{ fontFamily: 'Inter, sans-serif' }}
                onClick={handleAddEventClick}
              >
                Submit Event Form
              </button>
            </div>
          </main>

          {/* Event Submission Form Modal */}
          {showEventForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4">
              <div className="bg-white rounded-[20px] sm:rounded-[30px] w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
                <div className="max-h-[95vh] sm:max-h-[90vh] overflow-y-auto modal-scroll">
                  <div className="p-4 sm:p-8">
                  {/* Form Header */}
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h2 className="text-[24px] sm:text-[32px] font-bold text-black" style={{ fontFamily: 'Playfair Display, serif' }}>
                      Submit Your Event
                    </h2>
                    <button 
                      onClick={handleCloseEventForm}
                      className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleEventFormSubmit} className="space-y-4 sm:space-y-6">
                    {/* Event Name */}
                    <div>
                      <label className="block text-[14px] sm:text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Event Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={eventForm.eventName}
                        onChange={(e) => handleEventFormChange('eventName', e.target.value)}
                        className="w-full h-[45px] sm:h-[50px] px-4 text-[14px] rounded-[20px] sm:rounded-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent transition-all duration-200"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        placeholder="Enter your event name"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Category *
                      </label>
                      {!isCategoryOther ? (
                        <select
                          required
                          value={eventForm.category}
                          onChange={(e) => handleCategoryChange(e.target.value)}
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
                      ) : (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            required
                            value={eventForm.category}
                            onChange={(e) => handleEventFormChange('category', e.target.value)}
                            className="flex-1 h-[50px] px-4 text-[14px] rounded-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent transition-all duration-200"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                            placeholder="Enter custom category"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setIsCategoryOther(false);
                              setEventForm(prev => ({ ...prev, category: '' }));
                            }}
                            className="h-[50px] px-4 text-[12px] rounded-[30px] border border-gray-300 hover:bg-gray-50 transition-all duration-200"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            Choose from list
                          </button>
                        </div>
                      )}
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
                      <div className="relative venue-dropdown-container">
                        <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Venue
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={venueSearchQuery}
                            onChange={(e) => handleVenueSearch(e.target.value)}
                            onFocus={handleVenueInputFocus}
                            onBlur={handleVenueInputBlur}
                            className="w-full h-[50px] px-4 pr-10 text-[14px] rounded-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent transition-all duration-200"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                            placeholder="Search for a venue (optional)..."
                            autoComplete="off"
                          />
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>
                        
                        {/* Dropdown */}
                        {showVenueDropdown && filteredVenues.length > 0 && (
                          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-[20px] shadow-lg max-h-60 overflow-y-auto">
                            {filteredVenues.map((venue, index) => (
                              <button
                                key={venue.name}
                                type="button"
                                onMouseDown={(e) => {
                                  e.preventDefault();
                                  handleVenueSelect(venue.name);
                                }}
                                className={`w-full text-left px-4 py-3 hover:bg-gray-100 transition-colors duration-200 text-[14px] ${
                                  index === 0 ? 'rounded-t-[20px]' : ''
                                } ${
                                  index === filteredVenues.length - 1 ? 'rounded-b-[20px]' : ''
                                }`}
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              >
                                {venue.name}
                              </button>
                            ))}
                          </div>
                        )}
                        
                        {/* No results message */}
                        {showVenueDropdown && filteredVenues.length === 0 && venueSearchQuery.trim() !== '' && (
                          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-[20px] shadow-lg p-4">
                            <p className="text-[14px] text-gray-500 text-center" style={{ fontFamily: 'Inter, sans-serif' }}>
                              No venues found matching "{venueSearchQuery}"
                            </p>
                          </div>
                        )}
                        
                        <p className="mt-1 text-[12px] text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Only campus locations available for navigation
                        </p>
                      </div>
                      <div>
                        <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Event Date(s) *
                        </label>
                        <div className="space-y-2">
                          {eventDates.map((date, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <input
                                type="date"
                                required={index === 0}
                                value={date}
                                onChange={(e) => updateEventDate(index, e.target.value)}
                                className="flex-1 h-[50px] px-4 text-[14px] rounded-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent transition-all duration-200"
                                style={{ fontFamily: 'Inter, sans-serif' }}
                              />
                              {eventDates.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeEventDate(index)}
                                  className="h-[50px] w-[50px] rounded-full border border-red-300 text-red-500 hover:bg-red-50 transition-all duration-200 flex items-center justify-center"
                                  title="Remove date"
                                >
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              )}
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={addEventDate}
                            className="w-full h-[40px] border-2 border-dashed border-gray-300 rounded-[20px] text-gray-500 hover:border-[#F45B69] hover:text-[#F45B69] transition-colors duration-200 flex items-center justify-center gap-2"
                            style={{ fontFamily: 'Inter, sans-serif' }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add another date (for multi-day events)
                          </button>
                        </div>
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
                      <div className="relative organizer-dropdown-container">
                        <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                          Organizer *
                        </label>
                        {!isOrganizerOther ? (
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setShowOrganizerDropdown(!showOrganizerDropdown)}
                              className="w-full h-[50px] px-4 text-[14px] rounded-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent transition-all duration-200 text-left bg-white flex items-center justify-between"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              <span className={eventForm.organizer ? 'text-black' : 'text-gray-500'}>
                                {eventForm.organizer || 'Select organizing body/society'}
                              </span>
                              <svg 
                                className={`w-4 h-4 transition-transform duration-200 ${showOrganizerDropdown ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                            
                            {showOrganizerDropdown && (
                              <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-[20px] shadow-lg max-h-60 overflow-y-auto">
                                {organizerSuggestions.map((organizer, index) => (
                                  <button
                                    key={index}
                                    type="button"
                                    onClick={() => handleOrganizerSelect(organizer)}
                                    className="w-full px-4 py-3 text-left text-[14px] hover:bg-gray-50 transition-colors duration-200 first:rounded-t-[20px] last:rounded-b-[20px]"
                                    style={{ fontFamily: 'Inter, sans-serif' }}
                                  >
                                    {organizer}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              required
                              value={eventForm.organizer}
                              onChange={(e) => handleEventFormChange('organizer', e.target.value)}
                              className="flex-1 h-[50px] px-4 text-[14px] rounded-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent transition-all duration-200"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                              placeholder="Enter organizing body/society"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setIsOrganizerOther(false);
                                setEventForm(prev => ({ ...prev, organizer: '' }));
                              }}
                              className="h-[50px] px-4 text-[12px] rounded-[30px] border border-gray-300 hover:bg-gray-50 transition-all duration-200"
                              style={{ fontFamily: 'Inter, sans-serif' }}
                            >
                              Choose from list
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Contact Email */}
                    <div>
                      <label className="block text-[16px] font-bold text-black mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Contact Email *
                        <span className="ml-2 text-[12px] font-normal text-gray-600">(Locked to your account email)</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={eventForm.contactEmail}
                        readOnly
                        disabled
                        className="w-full h-[50px] px-4 text-[14px] rounded-[30px] border border-gray-300 bg-gray-100 text-gray-700 cursor-not-allowed"
                        style={{ fontFamily: 'Inter, sans-serif' }}
                        placeholder="your.email@example.com"
                      />
                      <p className="mt-1 text-[12px] text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Contact email is automatically set to your logged-in account email
                      </p>
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
        </div>
      </div>
    </div>
  );
};

export default EventBoardPage;
