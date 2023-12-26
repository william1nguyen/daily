const express = require('express');
const router = express.Router();
const { authorization } = require('../middlewares/authorization');
const {
  signUp,
  signIn,
  getMe,
} = require('../controllers/users.controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/me', authorization, getMe);

module.exports = router;
