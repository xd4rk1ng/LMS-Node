const express = require('express');
const router = express.Router();
const profilesController = require('../controllers/profilesController');

router.post('/', profilesController.createProfile);
router.get('/:id', profilesController.getProfileById);

module.exports = router;
