const registerLinkRepo = require('../repositories/registerLinkRepository')

exports.getRegisterLink = async () => {
  return await registerLinkRepo.getLatest()
}

exports.updateRegisterLink = async (url) => {
  return await registerLinkRepo.createOrUpdate(url)
}
