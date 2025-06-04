const Image = require('../models/Image')

exports.findBySection = async (section) => {
  return await Image.findOne({ section })
}

// Thêm các param fb, tiktok, instagram với default rỗng
exports.createImage = async (section, url, public_id, fb = '', tiktok = '', instagram = '') => {
  return await Image.create({
    section,
    url,
    public_id,
    fb,
    tiktok,
    instagram,
    updatedAt: Date.now()
  })
}

// Update thêm 3 trường mạng xã hội
exports.updateImage = async (existing, url, public_id, fb = '', tiktok = '', instagram = '') => {
  existing.url = url
  existing.public_id = public_id
  existing.fb = fb
  existing.tiktok = tiktok
  existing.instagram = instagram
  existing.updatedAt = Date.now()
  return await existing.save()
}

// Trả về object map: section => object chứa url + các link
exports.getAllAsMap = async () => {
  const images = await Image.find({})
  const map = {}
  for (const img of images) {
    map[img.section] = {
      img: img.url,
      fb: img.fb || '',
      tiktok: img.tiktok || '',
      instagram: img.instagram || ''
    }
  }
  return map
}


// const Image = require('../models/Image')

// exports.findBySection = async (section) => {
//   return await Image.findOne({ section })
// }

// exports.createImage = async (section, url, public_id) => {
//   return await Image.create({
//     section,
//     url,
//     public_id,
//     updatedAt: Date.now()
//   })
// }

// exports.updateImage = async (existing, url, public_id) => {
//   existing.url = url
//   existing.public_id = public_id
//   existing.updatedAt = Date.now()
//   return await existing.save()
// }

// exports.getAllAsMap = async () => {
//   const images = await Image.find({})
//   const map = {}
//   for (const img of images) {
//     map[img.section] = img.url
//   }
//   return map
// }
