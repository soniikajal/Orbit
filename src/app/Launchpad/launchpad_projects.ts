export interface LaunchpadProject {
  id: string;
  projectName: string;
  category: string;
  description: string;
  requiredSkills: string[];
  lookingFor: string;
  teamMembers: string[];
  contactEmail: string;
  additionalInfo?: string;
  dateCreated: string;
}

export const launchpadProjects: LaunchpadProject[] = [
  {
    id: "1",
    projectName: "ECOTrack NSUT",
    category: "Web Development",
    description: "Access curated study materials, notes, and resources from seniors and faculty. Find everything you need to excel in your academics.",
    requiredSkills: ["Java/CSS", "Product Designing", "Motion Graphics", "Adobe Creative Suite"],
    lookingFor: "Backend Developer",
    teamMembers: ["Alice", "Bob", "Charlie", "Diana"],
    contactEmail: "ecotrack@nsut.ac.in",
    dateCreated: "12-01-25"
  },
  {
    id: "2",
    projectName: "Smart Campus IoT",
    category: "Technology & Software",
    description: "Developing an IoT-based smart campus management system to monitor energy consumption, security, and environmental conditions across NSUT facilities. This system will use multiple sensors and provide real-time analytics.",
    requiredSkills: ["Python", "IoT", "Raspberry Pi", "Node.js", "MongoDB", "Sensor Integration", "Data Analytics", "Real-time Systems"],
    lookingFor: "Hardware Engineer",
    teamMembers: ["Rohit", "Kavya", "Rajesh", "Priya", "Aman", "Sonia"],
    contactEmail: "smartcampus@nsut.ac.in",
    dateCreated: "10-01-25"
  },
  {
    id: "3",
    projectName: "NSUT Event Manager",
    category: "Events & Community",
    description: "A comprehensive platform for managing all university events, from registration to feedback collection. Streamlines event organization for students and faculty.",
    requiredSkills: ["React", "Express.js", "PostgreSQL", "UI/UX Design"],
    lookingFor: "Frontend Developer",
    teamMembers: ["Ananya", "Dev", "Riya", "Karan", "Sakshi"],
    contactEmail: "events@nsut.ac.in",
    dateCreated: "08-01-25"
  },
  {
    id: "4",
    projectName: "Digital Library System",
    category: "Education & Learning",
    description: "Creating a modern digital library interface with AI-powered book recommendations and collaborative study spaces.",
    requiredSkills: ["Vue.js", "Machine Learning", "Python", "Docker"],
    lookingFor: "ML Engineer",
    teamMembers: ["Vishnu", "Meera", "Siddharth"],
    contactEmail: "library@nsut.ac.in",
    dateCreated: "15-01-25"
  },
  {
    id: "5",
    projectName: "Green Energy Monitor",
    category: "Environment & Sustainability",
    description: "Monitor and optimize renewable energy usage across campus with real-time analytics.",
    requiredSkills: ["Arduino", "C++"],
    lookingFor: "Electrical Engineer",
    teamMembers: ["Amit"],
    contactEmail: "green@nsut.ac.in",
    dateCreated: "20-01-25"
  },
  {
    id: "6",
    projectName: "Student Marketplace",
    category: "Business & Entrepreneurship",
    description: "A peer-to-peer marketplace for students to buy, sell, and exchange books, electronics, and other essentials within the campus community.",
    requiredSkills: ["React Native", "Firebase", "Payment Integration", "UX Design"],
    lookingFor: "Mobile Developer",
    teamMembers: ["Tanvi", "Rahul", "Pooja", "Nikhil", "Shreya", "Aditya"],
    contactEmail: "marketplace@nsut.ac.in",
    dateCreated: "05-01-25"
  },
  {
    id: "7",
    projectName: "Mental Health Support Bot",
    category: "Health & Wellness",
    description: "An AI chatbot providing 24/7 mental health support and resources for students.",
    requiredSkills: ["Natural Language Processing", "Python", "TensorFlow", "Chat UI"],
    lookingFor: "AI Specialist",
    teamMembers: ["Dr. Sharma", "Neha"],
    contactEmail: "mentalhealth@nsut.ac.in",
    dateCreated: "18-01-25"
  },
  {
    id: "8",
    projectName: "Campus Food Tracker",
    category: "Food & Hospitality",
    description: "Track food quality, nutrition, and availability across all campus dining facilities with user reviews and recommendations.",
    requiredSkills: ["Flutter", "API Development", "Database Design"],
    lookingFor: "Full Stack Developer",
    teamMembers: ["Gaurav", "Simran", "Abhinav"],
    contactEmail: "foodtrack@nsut.ac.in",
    dateCreated: "22-01-25"
  },
  {
    id: "9",
    projectName: "Research Collaboration Platform",
    category: "Research & Innovation",
    description: "Connect researchers, professors, and students for collaborative research projects. Includes paper sharing, discussion forums, and project management tools.",
    requiredSkills: ["Angular", "Spring Boot", "Research Methodologies", "Academic Writing"],
    lookingFor: "Research Coordinator",
    teamMembers: ["Prof. Kumar", "Divya", "Shubham", "Rakesh", "Preeti"],
    contactEmail: "research@nsut.ac.in",
    dateCreated: "03-01-25"
  },
  {
    id: "10",
    projectName: "Campus Safety App",
    category: "Social Impact & NGO",
    description: "Emergency response and safety monitoring app for campus security with real-time location sharing and quick alert system.",
    requiredSkills: ["React Native", "GPS Integration", "Emergency Systems", "Security Protocols"],
    lookingFor: "Security Specialist",
    teamMembers: ["Vikram", "Anjali"],
    contactEmail: "safety@nsut.ac.in",
    dateCreated: "25-01-25"
  },
  {
    id: "11",
    projectName: "Virtual Art Gallery",
    category: "Arts & Entertainment",
    description: "Showcase student artwork and creative projects in an immersive virtual gallery experience.",
    requiredSkills: ["Three.js", "WebGL", "3D Modeling", "Creative Direction"],
    lookingFor: "3D Artist",
    teamMembers: ["Maya", "Aryan", "Zara"],
    contactEmail: "artgallery@nsut.ac.in",
    dateCreated: "30-01-25"
  },
  {
    id: "12",
    projectName: "Skill Exchange Network",
    category: "Education & Learning",
    description: "Platform where students can teach and learn skills from each other through video tutorials, live sessions, and peer-to-peer mentoring programs.",
    requiredSkills: ["Video Streaming", "WebRTC", "Content Management", "Gamification"],
    lookingFor: "Video Technology Expert",
    teamMembers: ["Harsh", "Naina", "Kabir", "Ishita"],
    contactEmail: "skillexchange@nsut.ac.in",
    dateCreated: "14-01-25"
  },
  {
    id: "13",
    projectName: "Skill Exchange Network",
    category: "Education & Learning",
    description: "Platform where students can teach and learn skills from each other through video tutorials, live sessions, and peer-to-peer mentoring programs.",
    requiredSkills: ["Video Streaming", "WebRTC", "Content Management", "Gamification"],
    lookingFor: "Video Technology Expert",
    teamMembers: ["Harsh", "Naina", "Kabir", "Ishita"],
    contactEmail: "skillexchange@nsut.ac.in",
    dateCreated: "14-01-25"
  },
  {
    id: "14",
    projectName: "Skill Exchange Network",
    category: "Education & Learning",
    description: "Platform where students can teach and learn skills from each other through video tutorials, live sessions, and peer-to-peer mentoring programs.",
    requiredSkills: ["Video Streaming", "WebRTC", "Content Management", "Gamification"],
    lookingFor: "Video Technology Expert",
    teamMembers: ["Harsh", "Naina", "Kabir", "Ishita"],
    contactEmail: "skillexchange@nsut.ac.in",
    dateCreated: "14-01-25"
  },
  {
    id: "15",
    projectName: "Skill Exchange Network",
    category: "Education & Learning",
    description: "Platform where students can teach and learn skills from each other through video tutorials, live sessions, and peer-to-peer mentoring programs.",
    requiredSkills: ["Video Streaming", "WebRTC", "Content Management", "Gamification"],
    lookingFor: "Video Technology Expert",
    teamMembers: ["Harsh", "Naina", "Kabir", "Ishita"],
    contactEmail: "skillexchange@nsut.ac.in",
    dateCreated: "14-01-25"
  },
  {
    id: "16",
    projectName: "Skill Exchange Network",
    category: "Education & Learning",
    description: "Platform where students can teach and learn skills from each other through video tutorials, live sessions, and peer-to-peer mentoring programs.",
    requiredSkills: ["Video Streaming", "WebRTC", "Content Management", "Gamification"],
    lookingFor: "Video Technology Expert",
    teamMembers: ["Harsh", "Naina", "Kabir", "Ishita"],
    contactEmail: "skillexchange@nsut.ac.in",
    dateCreated: "14-01-25"
  },
  {
    id: "17",
    projectName: "Skill Exchange Network",
    category: "Education & Learning",
    description: "Platform where students can teach and learn skills from each other through video tutorials, live sessions, and peer-to-peer mentoring programs.",
    requiredSkills: ["Video Streaming", "WebRTC", "Content Management", "Gamification"],
    lookingFor: "Video Technology Expert",
    teamMembers: ["Harsh", "Naina", "Kabir", "Ishita"],
    contactEmail: "skillexchange@nsut.ac.in",
    dateCreated: "14-01-25"
  },
  {
    id: "18",
    projectName: "Skill Exchange Network",
    category: "Education & Learning",
    description: "Platform where students can teach and learn skills from each other through video tutorials, live sessions, and peer-to-peer mentoring programs.",
    requiredSkills: ["Video Streaming", "WebRTC", "Content Management", "Gamification"],
    lookingFor: "Video Technology Expert",
    teamMembers: ["Harsh", "Naina", "Kabir", "Ishita"],
    contactEmail: "skillexchange@nsut.ac.in",
    dateCreated: "14-01-25"
  }

];

// Function to add new project
export const addProject = (project: Omit<LaunchpadProject, 'id' | 'dateCreated'>): LaunchpadProject => {
  const newProject: LaunchpadProject = {
    ...project,
    id: Date.now().toString(),
    dateCreated: new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    })
  };
  launchpadProjects.push(newProject);
  return newProject;
};

// Function to get projects with pagination
export const getProjects = (page: number = 1, limit: number = 12) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return {
    projects: launchpadProjects.slice(startIndex, endIndex),
    totalProjects: launchpadProjects.length,
    hasMore: endIndex < launchpadProjects.length
  };
};
