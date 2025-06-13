const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/UserRepository');

const mailer = require("../utils/mailer");
const crypto = require("crypto");
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
    },

    async forgotPassword(email) {
        const user = await userRepository.getUserByEmail(email);
        if (!user) throw new Error("Email không tồn tại!");
        const token = crypto.randomBytes(32).toString("hex");
        const expires = Date.now() + 30 * 60 * 1000; // 30 phút
        await userRepository.saveResetToken(user._id, token, expires);

        const resetUrl = `http://localhost:5173/reset-password?token=${token}`;
        await mailer.sendResetPasswordEmail(user.email, resetUrl);

        return { message: "Đã gửi email đặt lại mật khẩu nếu email hợp lệ!" };
    },

    async resetPassword(token, password) {
        const user = await userRepository.findByResetToken(token);
        if (!user) throw new Error("Token không hợp lệ hoặc đã hết hạn!");
        const hash = await bcrypt.hash(password, 10);
        await userRepository.updatePasswordAndClearToken(user._id, hash);
        return { message: "Đổi mật khẩu thành công!" };
    }
}

module.exports = authService;