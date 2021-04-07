import mongoose from 'mongoose';

const userSchema: mongoose.Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3
    }, 
    password: {
        type: String,
        required: true,
        min: 10
    }
});

module.exports = mongoose.model('User', userSchema);
