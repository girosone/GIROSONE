import mongoose from 'mongoose'
import env from './env.js'

const connectDB = async () => {
  try {
    // Fail fast with a clear message instead of hanging on an unreachable host.
    const { connection } = await mongoose.connect(env.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    })
    console.log(`MongoDB connected: ${connection.host}/${connection.name}`)
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
