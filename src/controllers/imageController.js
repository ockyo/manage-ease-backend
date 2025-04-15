const imageService = require('../services/imageService')

exports.getAllImages = async (req, res) => {
    try {
        const map = await imageService.getImagesMap()
        res.json(map)
    } catch (err) {
        console.error('❌ getAllImages error:', err)
        res.status(500).json({ error: 'Lỗi lấy danh sách ảnh' })
    }
}
exports.uploadImage = async (req, res) => {
    try {
        const section = req.body.section
        const file = req.file
        const result = await imageService.uploadAndSave(section, file)
        res.send(result)
    } catch (err) {
        console.error('❌ uploadImage error:', err)
        res.status(500).send('❌ Upload thất bại.')
    }
}
