import mongoose, { Schema, models } from 'mongoose';

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  venue: { type: String, required: true }, // Made required
  date: { type: String, required: true }, 
  time: { type: String }, // Optional but defined
  organizer: { type: String, required: true },
  contactEmail: { type: String, required: true },
  additionalInfo: { type: String },
  approved: { type: Boolean, default: false },
}, { 
  timestamps: true,
  // Ensure MongoDB doesn't add extra fields that might interfere
  strict: true 
});

// Add index for better query performance
EventSchema.index({ date: 1, approved: 1 });

export default models.Event || mongoose.model('Event', EventSchema);
