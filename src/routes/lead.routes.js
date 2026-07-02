const express = require('express');

const { getAllLeads, getHotLeads, getWarmLeads, getColdLeads, getLeadById, updateStatusOfLead, getLeadStat,searchLeads } = require('../controllers/lead.controller')

const router = express.Router();

router.get('/leads',getAllLeads)

router.get('/leads/stats',getLeadStat)
router.get('/leads/search',searchLeads)


router.get('/leads/hot',getHotLeads)
router.get('/leads/warm',getWarmLeads)
router.get('/leads/cold',getColdLeads)

router.get('/leads/:id',getLeadById)
router.patch('/leads/:id/status',updateStatusOfLead,)



module.exports = router