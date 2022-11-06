const mongoose = require('mongoose')

const locationSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },

    country: {
        type: String,
        require: true
    },

    admin_name: {
        type: String,
        require: true
    },

    latitude: {
        type: Number,
        require: true
    },

    longitude: {
        type: Number,
        require: true
    }


})

const Location = mongoose.model('Location', locationSchema)

module.exports = Location;