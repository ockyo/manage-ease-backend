const Image = require('../models/Image')

exports.findBySection = async (section) => {
  return await Image.findOne({ section })
}

exports.createImage = async (section, url, public_id) => {
  return await Image.create({
    section,
    url,
    public_id,
    updatedAt: Date.now()
  })
}

exports.updateImage = async (existing, url, public_id) => {
  existing.url = url
  existing.public_id = public_id
  existing.updatedAt = Date.now()
  return await existing.save()
}

exports.getAllAsMap = async () => {
  const images = await Image.find({})
  const map = {}
  for (const img of images) {
    map[img.section] = img.url
  }
  return map
}
