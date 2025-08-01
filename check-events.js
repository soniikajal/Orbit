// Simple script to check what events are in the database
const mongoose = require('mongoose');

// Event model
const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  venue: String,
  date: String,
  time: String,
  organizer: String,
  contactEmail: { type: String, required: true },
  additionalInfo: String,
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Event = mongoose.models.Event || mongoose.model('Event', EventSchema);

async function checkEvents() {
  try {
    // Connect to MongoDB (adjust connection string as needed)
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/nsut-orbit');
    console.log('Connected to MongoDB');
    
    // Get all events
    const events = await Event.find({});
    console.log(`Found ${events.length} events in database:`);
    
    events.forEach((event, index) => {
      console.log(`\n--- Event ${index + 1} ---`);
      console.log('Title:', event.title);
      console.log('Venue:', event.venue);
      console.log('Time:', event.time);
      console.log('Approved:', event.approved);
      console.log('All fields:', Object.keys(event.toObject()));
    });
    
    if (events.length === 0) {
      console.log('\n❌ No events found in database. This explains why you see "TBA".');
      console.log('You need to either:');
      console.log('1. Create new events through the form');
      console.log('2. Seed the database with sample data');
      console.log('3. Check if events are marked as approved: false');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

checkEvents();
