import { connectToAltDB } from '@/lib/altMongoose'

export default async function getAltContactModel() {
  const altDB = await connectToAltDB()

  const ContactSchema = new altDB.Schema({
    name: String,
    email: { type: String, required: true },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ['askQuery', 'leaveFeedback', 'reportBug'],
      required: true,
    },
    screenshot: {
      type: String,
      required: function (this: any) {
        return this.type === 'reportBug'
      },
    },
    status: { type: String, default: 'pending' },
    timestamp: { type: Date, default: Date.now },
  })

  return altDB.models.Contact || altDB.model('Contact', ContactSchema)
}
