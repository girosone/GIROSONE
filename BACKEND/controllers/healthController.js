import mongoose from 'mongoose'
import env from '../config/env.js'

export const getHealth = (req, res) => {
  const databaseUp = mongoose.connection.readyState === mongoose.ConnectionStates.connected

  res.status(databaseUp ? 200 : 503).json({
    success: databaseUp,
    ...(databaseUp ? {} : { message: 'Database is not connected' }),
    data: {
      status: databaseUp ? 'ok' : 'degraded',
      database: databaseUp ? 'connected' : 'disconnected',
      environment: env.nodeEnv,
      uptime: Math.round(process.uptime()),
      timestamp: new Date().toISOString(),
    },
  })
}
