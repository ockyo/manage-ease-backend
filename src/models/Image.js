// const mongoose = require('mongoose')

// const ImageSchema = new mongoose.Schema({
//   section: { type: String, required: true, unique: true },
//   url: { type: String, required: true },
//   public_id: { type: String },
//   updatedAt: { type: Date, default: Date.now }
// })

// module.exports = mongoose.model('Image', ImageSchema)


const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
  section: { type: String, required: true, unique: true },
  url: { type: String, required: true },        // URL ảnh
  public_id: { type: String },                   // Nếu dùng cloudinary hay tương tự
  fb: { type: String, default: '' },             // Link Facebook (có thể để trống)
  tiktok: { type: String, default: '' },         // Link TikTok (có thể để trống)
  instagram: { type: String, default: '' },      // Link Instagram (có thể để trống)
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Image', ImageSchema)
