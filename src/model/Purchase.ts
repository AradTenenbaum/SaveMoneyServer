import mongoose from 'mongoose';

const purchaseSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    price: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Purchase', purchaseSchema);
