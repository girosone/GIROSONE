// An expected, client-facing error. The error handler sends its message as-is.
class ApiError extends Error {
  constructor(statusCode, message, errors) {
    super(message)
    this.name = 'ApiError'
    this.statusCode = statusCode
    this.errors = errors
  }
}

export default ApiError
