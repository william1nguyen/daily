const express = require('express');
const {
  signUp,
  signIn,
} = require('../controllers/users.controller');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', signUp);
router.post('/signin', signIn);

module.exports = router;
