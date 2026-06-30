const express = require('express');
const { getSummary, getRecent, getBusinessType, getCity, getMonthlyData,  getDigitalPresence } = require('../controllers/dashboard.controller')
const router = express.Router();

router.get('/dashboard/summary',getSummary)
router.get('/dashboard/recent',getRecent)
router.get('/dashboard/business-types',getBusinessType)
router.get('/dashboard/cities',getCity)
router.get('/dashboard/monthly-growth',getMonthlyData)
router.get('/dashboard/digital-presence', getDigitalPresence)

module.exports = router