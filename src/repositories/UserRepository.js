const User = require('../models/User');
class UserRepository {
    async getAllUsers() {
        return await User.find();
    }
    async getUserById(id) {
        return await User.findById(id);
    }
    async getUserByUsername(username) {
        return await User.findOne({ username });
    }
    async createUser(data) {
        return await User.create(data);
    }
    async updateUser(id, data) {
        return await User.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }
    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }
    async getUserByEmail(email) {
        return await User.findOne({ email });
    }
    // --- Forgot/Reset password functions ---
    async saveResetToken(userId, token, expires) {
        return User.findByIdAndUpdate(userId, {
            resetToken: token,
            resetTokenExpires: expires
        });
    }
    async findByResetToken(token) {
        return User.findOne({
            resetToken: token,
            resetTokenExpires: { $gt: Date.now() }
        });
    }
    async updatePasswordAndClearToken(userId, hash) {
        return User.findByIdAndUpdate(userId, {
            password: hash,
            resetToken: null,
            resetTokenExpires: null
        });
    }
}
module.exports = new UserRepository();