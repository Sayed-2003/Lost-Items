const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxlength: 100
    },

    description: {
        type: String,
        required: true,
        maxlength: 500
    },

    category: {
        type: String,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    type: {
        type: String,
        enum: ['Lost', 'Found'],
        required: true
    },
    image:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        default:false
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item