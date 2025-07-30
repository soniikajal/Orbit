// models/Contact.ts
import mongoose from 'mongoose'

const ContactSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ['askQuery', 'leaveFeedback', 'reportBug'],
    required: true
  },
  screenshot: {
    type: String,
    required: function (this: any) {
      return this.type === 'reportBug'
    }
  },
  status: { type: String, default: 'pending' },
  timestamp: { type: Date, default: Date.now }
})

export default mongoose.models.Contact || mongoose.model('Contact', ContactSchema)
