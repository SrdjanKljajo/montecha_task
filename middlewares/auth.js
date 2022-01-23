const CustomApiError = require('../errors')
const { isTokenValid } = require('../utils')

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token

  if (!token) {
    throw new CustomApiError.UnauthenticatedError('Authentication Invalid')
  }

  try {
    const { name, userId, slug } = isTokenValid({ token })
    req.user = { name, userId, slug }
    next()
  } catch (error) {
    throw new CustomApiError.UnauthenticatedError('Authentication Invalid')
  }
}

module.exports = { authenticateUser }
