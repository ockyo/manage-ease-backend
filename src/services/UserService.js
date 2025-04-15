const UserRepository = require('../repositories/UserRepository');
class UserService {
    async getAllUsers() {
        const users = await UserRepository.getAllUsers();
        if(!users) {
            throw new Error('No users found');
        }
        return users;
    }
    async getUserById(id) {
        return await UserRepository.getUserById(id);
    }
    async createUser(data) {
        const existingUser = await UserRepository.getUserByUsername(data.username);
        if (existingUser) {
            throw new Error('Email already exists');
        }
        return await UserRepository.createUser(data);
    }
    async updateUser(id, data) {
        return await UserRepository.updateUser(id, data);
    }
    async deleteUser(id) {
        return await UserRepository.deleteUser(id);
    }
}
module.exports = new UserService();