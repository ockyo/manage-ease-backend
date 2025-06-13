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
    },

    async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            const result = await authService.forgotPassword(email);
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async resetPassword(req, res) {
        try {
            const { token, password } = req.body;
            const result = await authService.resetPassword(token, password);
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}
module.exports = authController;