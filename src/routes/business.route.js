const expess = require('express')
const {businessSearch} = require('../controllers/business.controller')

const router = expess.Router()

router.post('/business/search',businessSearch)

module.exports = router