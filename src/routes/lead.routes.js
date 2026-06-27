const express = require('express');

const { getAllLeads, getHotLeads, getWarmLeads, getColdLeads, getLeadById, updateStatusOfLead, getLeadStat } = require('../controllers/lead.controller')

const router = express.Router();

router.get('/leads',getAllLeads)
router.get('/leads/:id',getLeadById)
router.get('/leads/hot',getHotLeads)
router.get('/leads/warm',getWarmLeads)
router.get('leads/cold',getColdLeads)
router.patch('/leads/:id/status',updateStatusOfLead,)
router.get('/leads/stats',getLeadStat)


module.exports = router