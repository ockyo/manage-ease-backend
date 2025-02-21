const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: { type: String, required: [true, 'Please provide a name'] },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
    status: { type: Boolean, default: true }
}, { timestamps: true });
module.exports = mongoose.model('User', UserSchema);