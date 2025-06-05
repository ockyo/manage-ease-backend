const RegisterLink = require('../models/RegisterLink')

exports.getLatest = async () => {
  return await RegisterLink.findOne().sort({ updatedAt: -1 })
}

exports.createOrUpdate = async (url) => {
  const latest = await RegisterLink.findOne().sort({ updatedAt: -1 })
  if (latest) {
    latest.url = url
    latest.updatedAt = new Date()
    return await latest.save()
  } else {
    const newLink = new RegisterLink({ url })
    return await newLink.save()
  }
}
