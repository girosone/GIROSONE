import env from '../config/env.js'

// Express identifies error middleware by its four arguments.
const errorHandler = (err, req, res, next) => {
  // ApiError sets statusCode; Express/body-parser errors set status.
  const candidate = err.statusCode ?? err.status
  const statusCode = Number.isInteger(candidate) && candidate >= 400 && candidate < 600 ? candidate : 500
  const isServerError = statusCode >= 500

  if (isServerError) console.error(err)

  const body = {
    success: false,
    message: isServerError && env.isProduction ? 'Internal server error' : err.message || 'Internal server error',
  }

  if (err.errors && !isServerError) body.errors = err.errors

  res.status(statusCode).json(body)
}

export default errorHandler
