const registerLinkService = require('../services/registerLinkService')

exports.getRegisterLink = async (req, res) => {
  try {
    const link = await registerLinkService.getRegisterLink()
    if (!link) return res.status(404).json({ url: '' })
    res.json({ url: link.url })
  } catch (err) {
    console.error('getRegisterLink error:', err)
    res.status(500).json({ error: 'Server error' })
  }
}

exports.updateRegisterLink = async (req, res) => {
  try {
    const { url } = req.body
    if (!url) return res.status(400).json({ error: 'Missing url' })
    const updated = await registerLinkService.updateRegisterLink(url)
    res.json({ message: 'Updated', data: updated })
  } catch (err) {
    console.error('updateRegisterLink error:', err)
    res.status(500).json({ error: 'Server error' })
  }
}

console.log('registerLinkService:', registerLinkService)

