import mongoose, { Schema, models } from 'mongoose';

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  location: String,
  date: String, // in 'DD/MM/YY' format
  startTime: String,
  endTime: String,
  contactEmail: { type: String, required: true },
  approved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default models.Event || mongoose.model('Event', EventSchema);
