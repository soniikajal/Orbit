import { Schema } from 'mongoose'
import { connectToAltDB } from '@/lib/altMongoose'

const ContactSchema = new Schema({
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

export default async function getAltContactModel() {
  const altConnection = await connectToAltDB()
  return altConnection.models.Contact || altConnection.model('Contact', ContactSchema)
}
