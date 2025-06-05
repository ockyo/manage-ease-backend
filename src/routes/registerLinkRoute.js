const express = require('express')
const router = express.Router()
const registerLinkController = require('../controllers/registerLinkController')

router.get('/', registerLinkController.getRegisterLink)
router.post('/update', registerLinkController.updateRegisterLink)

module.exports = router
