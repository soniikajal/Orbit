import mongoose from 'mongoose'

let altConnection: typeof mongoose | null = null

export async function connectToAltDB() {
  if (altConnection) return altConnection

  try {
    altConnection = await mongoose.createConnection(process.env.ALT_MONGODB_URI!, {
      dbName: 'bugReports',
    }).asPromise()

    console.log('✅ Connected to alternate MongoDB cluster')
    return altConnection
  } catch (error) {
    console.error('❌ Alt MongoDB connection error:', error)
    throw new Error('Failed to connect to alternate MongoDB')
  }
}
