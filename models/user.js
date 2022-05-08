const mongoose = require('mongoose');

// making user schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
}, {
    // created at: updated at:
    timestamps: true
}); 


const User = mongoose.model('User', userSchema);

// exporting
module.exports = User;