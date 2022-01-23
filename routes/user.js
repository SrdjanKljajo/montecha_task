const express = require('express')
const router = express.Router()

const { authenticateUser } = require('../middlewares/auth')

const {
  deleteUserProfile,
  getAllUserProfiles,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/user')

router.use(authenticateUser)

router.route('/').get(getAllUserProfiles)
router
  .route('/:slug')
  .get(getUserProfile)
  .put(updateUserProfile)
  .delete(deleteUserProfile)

module.exports = router
