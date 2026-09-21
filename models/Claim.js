const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true
    },

    claimant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    message: {
        type: String,
        required: true,
        maxlength: 500
    },

    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    }
}, { timestamps: true})

const Claim = mongoose.model('Claim', claimSchema)

module.exports = Claim