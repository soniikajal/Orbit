import mongoose from 'mongoose'

const LaunchpadProjectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  requiredSkills: { type: [String], required: true },
  lookingFor: { type: String, required: true },
  teamMembers: { type: [String], default: [] },
  contactEmail: { type: String, required: true },
  additionalInfo: { type: String },
  dateCreated: { type: String },
  approved: { type: Boolean, default: false } // for admin approval
})

// Avoid model overwrite error in dev
export default mongoose.models.LaunchpadProject ||
  mongoose.model('LaunchpadProject', LaunchpadProjectSchema)
