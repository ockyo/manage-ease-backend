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
}
module.exports = new UserRepository();