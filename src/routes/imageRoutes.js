const express = require('express')
const router = express.Router()
const multer = require('multer')
const imageController = require('../controllers/imageController')

const upload = multer({ dest: 'temp/' })

router.get('/', imageController.getAllImages)
router.post('/upload', upload.single('image'), imageController.uploadImage)

module.exports = router
