const express = require('express');

const { getOutreachMessage,updateOutreachStatus, regenerateOutreachMessage } = require('../controllers/outreach.controller');
// const { generateOutreachMessage } = require('../services/outreachGenerator/outreachGenerator.service');

const router = express.Router();


router.get('/outreach/:id',getOutreachMessage);
router.patch('/outreach/:id/status',updateOutreachStatus);
router.post('/outreach/:id/regenerate',regenerateOutreachMessage);

module.exports = router;