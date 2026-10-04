import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import env from './config/env.js'
import connectDB from './config/db.js'
import healthRoutes from './routes/healthRoutes.js'
import notFound from './middleware/notFound.js'
import errorHandler from './middleware/errorHandler.js'

const app = express()

app.disable('x-powered-by')

// credentials: the frontend Axios instance sends cookies (httpOnly JWT, Phase 6).
app.use(cors({ origin: env.clientUrl, credentials: true }))
app.use(express.json())

app.use('/api/health', healthRoutes)

app.use(notFound)
app.use(errorHandler)

await connectDB()

const server = app.listen(env.port, () => {
  console.log(`GIROSONE API running on http://localhost:${env.port} (${env.nodeEnv})`)
})

server.on('error', (error) => {
  console.error(
    error.code === 'EADDRINUSE'
      ? `Port ${env.port} is already in use. Stop the other process or change PORT.`
      : `Server failed to start: ${error.message}`,
  )
  process.exit(1)
})

const shutdown = (signal) => {
  console.log(`${signal} received, shutting down.`)
  server.close(async () => {
    await mongoose.disconnect()
    process.exit(0)
  })
}

process.on('SIGINT', () => shutdown('SIGINT'))
process.on('SIGTERM', () => shutdown('SIGTERM'))
