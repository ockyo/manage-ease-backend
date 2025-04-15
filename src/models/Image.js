const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
  section: { type: String, required: true, unique: true },
  url: { type: String, required: true },
  public_id: { type: String },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Image', ImageSchema)
