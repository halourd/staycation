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
        addr: {
            type: String,
            require: true
        },
        lat: {
            type: Number,
            require: true
        },
        lng: {
            type: Number,
            require: true
        }
    },
    date: {
        type: Date,
        require: true
    },

    image: String,

    reviews: {
        type: Array,
        default: [],
        require: false
    }

})

const Listing = mongoose.model('Listing', listingSchema)

module.exports = Listing;