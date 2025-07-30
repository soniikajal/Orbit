import mongoose from 'mongoose'

let isConnected = false

export async function connectToAltDB() {
  if (isConnected) return

  try {
    await mongoose.connect(process.env.ALT_MONGODB_URI!, {
      dbName: 'bugReports', // or any custom DB name you want
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as any)

    isConnected = true
    console.log('✅ Connected to alternate MongoDB cluster')
  } catch (error) {
    console.error('❌ Alt MongoDB connection error:', error)
    throw new Error('Failed to connect to alternate MongoDB')
  }
}
