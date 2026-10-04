import { existsSync } from 'node:fs'
import { join } from 'node:path'

// Local development reads BACKEND/.env. Hosted environments inject the
// variables directly, so a missing file is not an error.
const envFile = join(import.meta.dirname, '..', '.env')
if (existsSync(envFile)) process.loadEnvFile(envFile)

const required = ['MONGODB_URI', 'CLIENT_URL']
const missing = required.filter((name) => !process.env[name]?.trim())

if (missing.length > 0) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`)
  console.error('Copy BACKEND/.env.example to BACKEND/.env and fill in the values.')
  process.exit(1)
}

const port = Number(process.env.PORT ?? 5000)

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error(`Invalid PORT: "${process.env.PORT}". Expected a number between 1 and 65535.`)
  process.exit(1)
}

const env = Object.freeze({
  nodeEnv: process.env.NODE_ENV ?? 'development',
  isProduction: process.env.NODE_ENV === 'production',
  port,
  mongoUri: process.env.MONGODB_URI.trim(),
  clientUrl: process.env.CLIENT_URL.trim().replace(/\/+$/, ''),
})

export default env
