const mongoose = require('mongoose')

const listingSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    uploader: {
        type: String,
        require: true
    },

    description: {
        type: String,
        require: true
    },

    address: {
        type: String,
        require: true
    },

    date: {
        type: Date,
        require: true
    }
})

const Listing = mongoose.model('Listing', listingSchema)

module.exports = Listing;