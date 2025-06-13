const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: { type: String, required: [true, 'Please provide a name'] },
    email: { type: String, required: [true, 'Please provide an email'], unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
    resetToken: { type: String, default: null },
    resetTokenExpires: { type: Date, default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
