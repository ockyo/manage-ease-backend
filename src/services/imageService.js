
const cloudinary = require('../config/cloudinary')
const fs = require('fs')
const imageRepo = require('../repositories/imageRepository')

exports.uploadAndSave = async (section, file) => {
  if (!file) throw new Error('File rỗng')

  const uploadRes = await cloudinary.uploader.upload(file.path, {
    folder: 'your_project_images'
  })

  fs.unlinkSync(file.path)

  const existing = await imageRepo.findBySection(section)
  if (existing) {
    if (existing.public_id) {
      await cloudinary.uploader.destroy(existing.public_id)
    }
    await imageRepo.updateImage(existing, uploadRes.secure_url, uploadRes.public_id)
  } else {
    await imageRepo.createImage(section, uploadRes.secure_url, uploadRes.public_id)
  }

  return `✅ Ảnh đã được cập nhật cho ${section}`
}

exports.getImagesMap = async () => {
  return await imageRepo.getAllAsMap()
}

