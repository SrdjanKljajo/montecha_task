const { User } = require('../models')
const { StatusCodes } = require('http-status-codes')
const CustomApiError = require('../errors')
const { attachCookiesToResponse, createTokenUser } = require('../utils')

// @desc    Register a new user
// @route   POST /api/v1/auth/signup
// @access  Public

const signUp = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    throw new CustomApiError.BadRequestError('Passwords dont match')
  }

  const user = await User.create({ name, email, password })
  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })
  res.status(StatusCodes.CREATED).json({
    status: 'success',
    msg: `User ${name} seccessfuly created`,
    user: tokenUser,
  })
}

// @desc    Login user
// @route   POST /api/vi/auth/signin
// @access  Public

const signIn = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    throw new CustomApiError.BadRequestError(
      'Please provide email and password'
    )

  const user = await User.findOne({ where: { email } })

  if (!user)
    throw new CustomApiError.UnauthenticatedError('Invalid Credentials')

  const isPasswordCorrect = await user.validPassword(password)
  if (!isPasswordCorrect)
    throw new CustomApiError.UnauthenticatedError('Invalid Credentials')

  const tokenUser = createTokenUser(user)
  attachCookiesToResponse({ res, user: tokenUser })

  res.status(StatusCodes.OK).json({
    status: 'success',
    user: tokenUser,
  })
}

module.exports = { signUp, signIn }
