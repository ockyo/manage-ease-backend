const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/UserRepository');

const authService = {
    async login(username, password) {
        const user = await userRepository.getUserByUsername(username);
        if (!user) {
            throw new Error('User not found');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid password');
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        return token;
    },
    async register(data) {
        const existingUser = await userRepository.getUserByUsername(data.username);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await userRepository.createUser({
            ...data,
            password: hashedPassword
        });
        return user;
    }
}

module.exports = authService;