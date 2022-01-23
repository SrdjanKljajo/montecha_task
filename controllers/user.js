const { StatusCodes } = require('http-status-codes')
const { User } = require('../models')
const CustomApiError = require('../errors')

// @desc      Get users
// @route     GET /api/v1/users
// @access    Private
const getAllUserProfiles = async (req, res) => {
  const users = await User.findAll({})
  res.status(StatusCodes.OK).json({
    status: 'success',
    users,
    count: users.length,
  })
}

// @desc      Get single user
// @route     GET /api/v1/users/:slug
// @access    Private
const getUserProfile = async (req, res) => {
  const slug = req.params.slug
  const user = await User.findOne({ where: { slug } })

  if (!user) throw new CustomApiError.NotFoundError(`User ${slug} not found`)

  res.status(StatusCodes.OK).json({
    status: 'success',
    user,
  })
}

// @desc      Update user
// @route     PUT /api/v1/users/:slug
// @access    Private
const updateUserProfile = async (req, res) => {
  const slug = req.params.slug
  const { name, password } = req.body
  const user = await User.findOne({ where: { slug } })

  if (!user) throw new CustomApiError.NotFoundError(`User ${slug} not found`)

  user.name = name
  user.password = password
  await user.save()

  res.status(StatusCodes.OK).json({
    status: 'success',
    msg: `User ${name} updated`,
    user,
  })
}

// @desc      Delete user
// @route     DELETE /api/v1/users/:slug
// @access    Private
const deleteUserProfile = async (req, res) => {
  const slug = req.params.slug
  const user = await User.findOne({ where: { slug } })

  if (!user) throw new CustomApiError.NotFoundError(`User ${slug} not found`)

  await user.destroy()
  res.status(StatusCodes.NO_CONTENT).send()
}

module.exports = {
  deleteUserProfile,
  getAllUserProfiles,
  updateUserProfile,
  getUserProfile,
}
