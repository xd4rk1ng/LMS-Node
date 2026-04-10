const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/:id', usersController.getUserById);
router.post('/', usersController.createUser);
router.post('/:id/profile', usersController.createUserProfile);
router.delete('/:id/profile', usersController.deleteUserProfile);

module.exports = router;
