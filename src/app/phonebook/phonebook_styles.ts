// Phonebook page styles and CSS classes

export const phonebookStyles = {
  // Main container styles
  container: "w-full flex flex-col justify-start items-end",
  innerContainer: "w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 flex flex-col justify-start items-center",
  contentWrapper: "w-full flex flex-col justify-start items-start mt-2 sm:mt-3 md:mt-4",
  mainContent: "w-full py-2",

  // Typography styles
  pageTitle: "text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold text-left text-global-text2 mb-6 sm:mb-8 md:mb-12",
  cardTitle: "text-[16px] sm:text-[18px] md:text-[20px] font-bold text-white mb-1",
  cardSubtitle: "text-[10px] sm:text-[11px] md:text-[12px] text-white opacity-90",
  sectionTitle: "text-[12px] sm:text-[13px] md:text-[14px] font-bold text-black mb-1",
  bodyText: "text-[10px] sm:text-[11px] md:text-[12px] text-gray-600",
  resultCount: "text-[12px] sm:text-[13px] md:text-[14px] text-gray-600",

  // Search and filter styles
  searchContainer: "w-full mb-6 sm:mb-8",
  searchWrapper: "bg-[#FFFCF9] rounded-[20px] sm:rounded-[25px] md:rounded-[30px] p-4 sm:p-5 md:p-6 mb-6 sm:mb-8",
  searchRow: "flex flex-col sm:flex-col lg:flex-row gap-3 sm:gap-4 items-stretch lg:items-center",
  searchInputContainer: "flex-1 relative",
  searchIcon: "absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none",
  searchInput: "w-full h-[44px] sm:h-[48px] md:h-[50px] pl-10 sm:pl-12 pr-3 sm:pr-4 text-[12px] sm:text-[13px] md:text-[14px] rounded-[20px] sm:rounded-[25px] md:rounded-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent transition-all duration-200",
  departmentContainer: "w-full lg:w-auto",
  departmentSelect: "w-full lg:w-[300px] h-[44px] sm:h-[48px] md:h-[50px] px-3 sm:px-4 text-[12px] sm:text-[13px] md:text-[14px] rounded-[20px] sm:rounded-[25px] md:rounded-[30px] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F45B69] focus:border-transparent transition-all duration-200",

  // Faculty card styles
  cardsGrid: "grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-8 sm:mb-10 md:mb-12",
  facultyCard: "bg-white rounded-[20px] sm:rounded-[22px] md:rounded-[25px] border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105",
  cardHeader: "bg-[#F45B69] p-4 sm:p-5 md:p-6 text-white",
  cardHeaderContent: "flex items-center gap-3 sm:gap-4",
  avatar: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center",
  avatarText: "text-lg sm:text-xl md:text-2xl font-bold text-white",
  cardHeaderText: "flex-1",
  cardBody: "p-4 sm:p-5 md:p-6",
  departmentBadge: "mb-3 sm:mb-4",
  departmentTag: "bg-[#FACC6B] rounded-[12px] sm:rounded-[13px] md:rounded-[15px] px-2 sm:px-3 py-1 w-fit",
  departmentText: "text-[9px] sm:text-[10px] md:text-[11px] font-bold text-black uppercase tracking-wide",

  // Contact information styles
  contactSection: "space-y-2 sm:space-y-3 mb-3 sm:mb-4",
  contactItem: "flex items-center gap-2 sm:gap-3",
  contactIcon: "w-3 h-3 sm:w-4 sm:h-4 text-[#F45B69] flex-shrink-0",
  contactLink: "text-[10px] sm:text-[11px] md:text-[12px] text-gray-600 hover:text-[#F45B69] transition-colors duration-200 break-all",
  contactText: "text-[10px] sm:text-[11px] md:text-[12px] text-gray-600",

  // No results styles
  noResults: "text-center py-8 sm:py-10 md:py-12",
  noResultsIcon: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-gray-400 mx-auto",
  noResultsTitle: "text-[20px] sm:text-[22px] md:text-[24px] font-bold text-gray-600 mb-2",
  noResultsText: "text-[14px] sm:text-[15px] md:text-[16px] text-gray-500",

  // Pagination styles
  pagination: "w-full flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12",
  paginationButton: "px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-[12px] sm:text-[14px] w-full sm:w-auto",
  paginationButtonDisabled: "bg-gray-200 text-gray-400 cursor-not-allowed",
  paginationButtonActive: "bg-[#F45B69] text-white hover:opacity-90",
  paginationNumbers: "flex gap-1 sm:gap-2 flex-wrap justify-center",
  pageNumber: "px-2 sm:px-3 py-2 rounded-lg font-medium transition-all duration-200 text-[12px] sm:text-[14px] min-w-[32px] sm:min-w-[36px]",
  pageNumberActive: "bg-[#F45B69] text-white",
  pageNumberInactive: "bg-gray-200 text-gray-700 hover:bg-gray-300",
};

// Font family constants
export const fonts = {
  heading: "Playfair Display, serif",
  body: "Inter, sans-serif",
};

// Color constants
export const colors = {
  primary: "#F45B69",
  secondary: "#FACC6B",
  background: "#FFFCF9",
  text: {
    primary: "#000000",
    secondary: "#gray-600",
    white: "#ffffff",
  },
  border: "#gray-300",
  hover: "#F45B69",
};

// Icon SVG paths
export const icons = {
  search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  email: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  phone: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
  location: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  noResults: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
};

// Responsive breakpoints
export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

// Animation durations
export const animations = {
  fast: "200ms",
  normal: "300ms",
  slow: "500ms",
};

// Layout constants
export const layout = {
  maxWidth: "7xl",
  padding: {
    sm: "px-4",
    md: "sm:px-6",
    lg: "lg:px-8",
  },
  margin: {
    section: "mb-8",
    card: "mb-12",
  },
  gap: {
    small: "gap-2",
    medium: "gap-4",
    large: "gap-6",
  },
};
