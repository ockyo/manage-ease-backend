const authService = require('../services/authService');

const authController = {
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const token = await authService.login(username, password);
            res.json({ token });
        } catch (error) {
            res.status(401).json({ error: error.message });
        }
    },
    async register(req, res) {
        try {
            const user = await authService.register(req.body);
            res.json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
module.exports = authController;