// Database seeding script to add test events with venue and time
const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  venue: { type: String, required: true },
  date: { type: String, required: true }, 
  time: { type: String },
  organizer: { type: String, required: true },
  contactEmail: { type: String, required: true },
  additionalInfo: { type: String },
  approved: { type: Boolean, default: false },
}, { 
  timestamps: true,
  strict: true 
});

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

const testEvents = [
  {
    title: "Tech Workshop 2025",
    description: "A comprehensive workshop on modern web development technologies including React, Next.js, and TypeScript.",
    category: "Workshop",
    venue: "Block 5/Computer Science/IT Block",
    date: "2025-08-15",
    time: "10:00",
    organizer: "Computer Science Department",
    contactEmail: "cs@nsut.ac.in",
    additionalInfo: "Bring your own laptop",
    approved: true // Make it approved so it shows up
  },
  {
    title: "Cultural Night",
    description: "Annual cultural event featuring music, dance, and drama performances by NSUT students.",
    category: "Cultural Fest",
    venue: "Admin Block/Main Audi (Second Floor)",
    date: "2025-08-20",
    time: "18:00",
    organizer: "Cultural Society",
    contactEmail: "cultural@nsut.ac.in",
    additionalInfo: "Open to all students",
    approved: true
  },
  {
    title: "Innovation Expo",
    description: "Showcase of innovative projects and research work by students and faculty.",
    category: "Technical Fest",
    venue: "Central Library",
    date: "2025-08-25",
    time: "09:00",
    organizer: "Innovation Cell",
    contactEmail: "innovation@nsut.ac.in",
    additionalInfo: "Free entry for all",
    approved: true
  },
  {
    title: "Sports Meet 2025",
    description: "Annual inter-department sports competition featuring various indoor and outdoor games.",
    category: "Sports Event",
    venue: "Basketball Court",
    date: "2025-08-30",
    time: "08:00",
    organizer: "Sports Committee",
    contactEmail: "sports@nsut.ac.in",
    additionalInfo: "Registration required",
    approved: true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://kush:6CoKisnyZyOjEYKn@orbit.ggl8heh.mongodb.net/');
    console.log('Connected to MongoDB');
    
    // Clear existing events (optional)
    await Event.deleteMany({});
    console.log('Cleared existing events');
    
    // Insert test events
    const results = await Event.insertMany(testEvents);
    console.log(`Inserted ${results.length} test events:`);
    
    results.forEach((event, index) => {
      console.log(`${index + 1}. ${event.title} - Venue: ${event.venue}, Time: ${event.time}`);
    });
    
    console.log('\n✅ Database seeded successfully!');
    console.log('You should now see events with proper venue and time data.');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };
