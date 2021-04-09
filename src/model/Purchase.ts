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
    }
});

module.exports = mongoose.model('Purchase', purchaseSchema);
