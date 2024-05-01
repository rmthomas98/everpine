const express = require('express');
const router = express.Router();

// we need to verify the token on every request
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})

// Get all users
// Path: /api/v1/user
router.get('/' ,(req, res) => {
  // call the controller
  console.log('get all users')
  res.send('Get all users')
})

// get user by id
router.get('/:id', (req, res) => {
  // call the controller
  res.send(req.params.id ? `Get user with id ${req.params.id}` : 'Get user by id')
})

module.exports = router;