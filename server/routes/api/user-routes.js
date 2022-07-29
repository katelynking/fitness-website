const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveExercise,
  deleteExercise,
  login,
  saveExercise,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveExercise);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/exercises/:exerciseId').delete(authMiddleware, deleteExercise);

module.exports = router;
