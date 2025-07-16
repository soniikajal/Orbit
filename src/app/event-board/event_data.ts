export interface EventBoardEvent {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  organizer: string;
  venue?: string;
  time?: string;
  registrationRequired: boolean;
  registrationLink?: string;
  contactEmail?: string;
  maxParticipants?: number;
  currentParticipants?: number;
  tags?: string[];
  imageUrl?: string;
  dateCreated: string;
}

export const eventBoardEvents: EventBoardEvent[] = [
  {
    id: "1",
    title: "Summer Coding Bootcamp",
    date: "2025-07-20",
    category: "Workshop",
    description: "Intensive 3-day coding bootcamp covering modern web development technologies including React, Node.js, and MongoDB. Perfect for beginners looking to kickstart their programming journey.",
    organizer: "Computer Science Department",
    venue: "Lab Complex A",
    time: "9:00 AM",
    registrationRequired: true,
    registrationLink: "https://nsut.ac.in/summer-bootcamp",
    contactEmail: "cs@nsut.ac.in",
    maxParticipants: 80,
    currentParticipants: 67,
    tags: ["coding", "web-development", "bootcamp"],
    dateCreated: "10-07-25"
  },
  {
    id: "2",
    title: "Career Guidance Seminar",
    date: "2025-07-22",
    category: "Seminar",
    description: "Industry experts share insights on career opportunities in tech, placement preparation strategies, and skill development roadmap for engineering students.",
    organizer: "Training & Placement Cell",
    venue: "Main Auditorium",
    time: "2:00 PM",
    registrationRequired: true,
    registrationLink: "https://nsut.ac.in/career-seminar",
    contactEmail: "placement@nsut.ac.in",
    maxParticipants: 400,
    currentParticipants: 234,
    tags: ["career", "placement", "guidance"],
    dateCreated: "12-07-25"
  },
  {
    id: "3",
    title: "Inter-College Debate Competition",
    date: "2025-07-25",
    category: "Competition",
    description: "Annual debate competition with participants from various colleges across Delhi. Topics cover current affairs, technology impact, and social issues.",
    organizer: "Literary Society",
    venue: "Seminar Hall",
    time: "11:00 AM",
    registrationRequired: true,
    registrationLink: "https://nsut.ac.in/debate-competition",
    contactEmail: "literary@nsut.ac.in",
    maxParticipants: 60,
    currentParticipants: 45,
    tags: ["debate", "competition", "inter-college"],
    dateCreated: "08-07-25"
  },
  {
    id: "4",
    title: "Innovation Expo 2025",
    date: "2025-07-28",
    category: "Technical Fest",
    description: "Showcase of innovative projects by NSUT students across all departments. Featuring robotics demonstrations, app launches, and research presentations.",
    organizer: "Innovation Cell",
    venue: "Exhibition Hall",
    time: "10:00 AM",
    registrationRequired: false,
    contactEmail: "innovation@nsut.ac.in",
    tags: ["innovation", "expo", "projects", "research"],
    dateCreated: "05-07-25"
  },
  {
    id: "5",
    title: "Mental Health Awareness Workshop",
    date: "2025-07-30",
    category: "Workshop",
    description: "Interactive workshop on stress management, mindfulness techniques, and maintaining mental well-being during academic pressure. Led by professional counselors.",
    organizer: "Student Welfare Committee",
    venue: "Counseling Center",
    time: "4:00 PM",
    registrationRequired: true,
    registrationLink: "https://nsut.ac.in/mental-health-workshop",
    contactEmail: "welfare@nsut.ac.in",
    maxParticipants: 50,
    currentParticipants: 32,
    tags: ["mental-health", "wellness", "counseling"],
    dateCreated: "14-07-25"
  },
  {
    id: "6",
    title: "TechWeek",
    date: "2025-08-01",
    category: "Technical Fest",
    description: "Access curated study materials, notes, and resources from seniors and faculty. Find everything you need to excel in your academics. Access curated study materials, notes, and resources from seniors and faculty.",
    organizer: "NSUT Tech Society",
    venue: "Main Auditorium",
    time: "10:00 AM",
    registrationRequired: true,
    registrationLink: "https://nsut.ac.in/techweek-registration",
    contactEmail: "techweek@nsut.ac.in",
    maxParticipants: 500,
    currentParticipants: 342,
    tags: ["technology", "competition", "workshops"],
    dateCreated: "15-07-25"
  },
  {
    id: "7",
    title: "Independence Day Celebration",
    date: "2025-08-14",
    category: "Cultural Fest",
    description: "Access curated study materials, notes, and resources from seniors and faculty. Find everything you need to excel in your academics. Access curated study materials, notes and resources from seniors and faculty.",
    organizer: "NSUT Cultural Committee",
    venue: "College Campus",
    time: "9:00 AM",
    registrationRequired: false,
    contactEmail: "cultural@nsut.ac.in",
    tags: ["patriotic", "cultural", "flag-hoisting"],
    dateCreated: "10-07-25"
  },
  {
    id: "8",
    title: "Data Science Workshop",
    date: "2025-08-05",
    category: "Workshop",
    description: "Hands-on workshop covering machine learning fundamentals, data analysis techniques, and practical implementation using Python. Perfect for beginners and intermediate learners.",
    organizer: "Data Science Club",
    venue: "Computer Lab 2",
    time: "2:00 PM",
    registrationRequired: true,
    registrationLink: "https://nsut.ac.in/datascience-workshop",
    contactEmail: "datascienceclub@nsut.ac.in",
    maxParticipants: 50,
    currentParticipants: 38,
    tags: ["data-science", "python", "machine-learning"],
    dateCreated: "12-07-25"
  },
  {
    id: "9",
    title: "Annual Sports Meet",
    date: "2025-08-20",
    category: "Sports Event",
    description: "Inter-departmental sports competition featuring cricket, football, basketball, badminton, and track events. Prizes for winners and runners-up in each category.",
    organizer: "Sports Committee",
    venue: "Sports Complex",
    time: "8:00 AM",
    registrationRequired: true,
    registrationLink: "https://nsut.ac.in/sports-meet",
    contactEmail: "sports@nsut.ac.in",
    maxParticipants: 300,
    currentParticipants: 145,
    tags: ["sports", "competition", "inter-department"],
    dateCreated: "08-07-25"
  },
  {
    id: "10",
    title: "Startup Pitch Competition",
    date: "2025-08-10",
    category: "Competition",
    description: "Present your startup ideas to industry experts and investors. Opportunity to win funding and mentorship for promising ventures. Open to all students with innovative business ideas.",
    organizer: "Entrepreneurship Cell",
    venue: "Seminar Hall",
    time: "11:00 AM",
    registrationRequired: true,
    registrationLink: "https://nsut.ac.in/startup-pitch",
    contactEmail: "ecell@nsut.ac.in",
    maxParticipants: 30,
    currentParticipants: 22,
    tags: ["entrepreneurship", "startup", "pitch", "funding"],
    dateCreated: "05-07-25"
  },
  {
    id: "11",
    title: "Photography Exhibition",
    date: "2025-08-18",
    category: "Cultural Fest",
    description: "Showcase of stunning photography by NSUT students and faculty. Theme: 'Campus Life Through the Lens'. Voting for People's Choice Award and expert jury evaluation.",
    organizer: "Photography Club",
    venue: "Art Gallery",
    time: "6:00 PM",
    registrationRequired: false,
    contactEmail: "photoclub@nsut.ac.in",
    tags: ["photography", "exhibition", "art", "campus-life"],
    dateCreated: "11-07-25"
  },
  {
    id: "12",
    title: "AI & Robotics Seminar",
    date: "2025-08-25",
    category: "Seminar",
    description: "Guest lecture by industry professionals on the latest trends in artificial intelligence and robotics. Discussion on career opportunities and future technologies.",
    organizer: "Robotics Society",
    venue: "Conference Hall",
    time: "3:00 PM",
    registrationRequired: true,
    registrationLink: "https://nsut.ac.in/ai-robotics-seminar",
    contactEmail: "robotics@nsut.ac.in",
    maxParticipants: 150,
    currentParticipants: 89,
    tags: ["ai", "robotics", "technology", "career"],
    dateCreated: "13-07-25"
  },
  {
    id: "13",
    title: "Blood Donation Camp",
    date: "2025-08-28",
    category: "Social Impact",
    description: "Annual blood donation drive in collaboration with local hospitals. Help save lives by donating blood. Medical checkup and refreshments provided to all donors.",
    organizer: "NSS Unit",
    venue: "Medical Center",
    time: "10:00 AM",
    registrationRequired: false,
    contactEmail: "nss@nsut.ac.in",
    tags: ["blood-donation", "social-service", "healthcare"],
    dateCreated: "14-07-25"
  }
];

// Function to add new event
export const addEvent = (event: Omit<EventBoardEvent, 'id' | 'dateCreated'>): EventBoardEvent => {
  const newEvent: EventBoardEvent = {
    ...event,
    id: Date.now().toString(),
    dateCreated: new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    })
  };
  eventBoardEvents.push(newEvent);
  return newEvent;
};

// Function to get events with filtering and pagination
export const getEvents = (
  page: number = 1, 
  limit: number = 8,
  category?: string,
  month?: number,
  year?: number
) => {
  let filteredEvents = [...eventBoardEvents];
  
  // Filter by category
  if (category && category !== 'all') {
    filteredEvents = filteredEvents.filter(event => 
      event.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  // Filter by month and year
  if (month !== undefined && year !== undefined) {
    filteredEvents = filteredEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getMonth() === month && eventDate.getFullYear() === year;
    });
  }
  
  // Sort by date (upcoming events first)
  filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    events: filteredEvents.slice(startIndex, endIndex),
    totalEvents: filteredEvents.length,
    hasMore: endIndex < filteredEvents.length,
    totalPages: Math.ceil(filteredEvents.length / limit)
  };
};

// Function to get events by month/year
export const getEventsByMonth = (month: number, year: number) => {
  return eventBoardEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === month && eventDate.getFullYear() === year;
  });
};

// Function to get event categories
export const getEventCategories = () => {
  const categories = Array.from(new Set(eventBoardEvents.map(event => event.category)));
  return categories.sort();
};
