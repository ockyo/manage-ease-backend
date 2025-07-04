exports.uploadAndSave = async (section, file, fb = '', tiktok = '', instagram = '') => {
  let uploadRes = null

  if (file) {
    uploadRes = await cloudinary.uploader.upload(file.path, {
      folder: 'your_project_images'
    })

    fs.unlinkSync(file.path)
  }

  const existing = await imageRepo.findBySection(section)

  if (existing) {
    // Xóa ảnh cũ nếu có và upload ảnh mới
    if (file && existing.public_id) {
      await cloudinary.uploader.destroy(existing.public_id)
    }

    // Update record với url mới nếu có, hoặc giữ url cũ, và cập nhật link mạng xã hội
    await imageRepo.updateImage(existing,
      uploadRes ? uploadRes.secure_url : existing.url,
      uploadRes ? uploadRes.public_id : existing.public_id,
      fb,
      tiktok,
      instagram
    )
  } else {
    // Tạo mới với url ảnh hoặc '' nếu không upload ảnh lần này
    await imageRepo.createImage(
      section,
      uploadRes ? uploadRes.secure_url : '',
      uploadRes ? uploadRes.public_id : '',
      fb,
      tiktok,
      instagram
    )
  }

  return `✅ Ảnh đã được cập nhật cho ${section}`
}

const cloudinary = require('../config/cloudinary')
const fs = require('fs')
const imageRepo = require('../repositories/imageRepository')

// exports.uploadAndSave = async (section, file) => {
//   if (!file) throw new Error('File rỗng')

//   const uploadRes = await cloudinary.uploader.upload(file.path, {
//     folder: 'your_project_images'
//   })

//   fs.unlinkSync(file.path)

//   const existing = await imageRepo.findBySection(section)
//   if (existing) {
//     if (existing.public_id) {
//       await cloudinary.uploader.destroy(existing.public_id)
//     }
//     await imageRepo.updateImage(existing, uploadRes.secure_url, uploadRes.public_id)
//   } else {
//     await imageRepo.createImage(section, uploadRes.secure_url, uploadRes.public_id)
//   }

//   return `✅ Ảnh đã được cập nhật cho ${section}`
// }

exports.getImagesMap = async () => {
  return await imageRepo.getAllAsMap()
}

