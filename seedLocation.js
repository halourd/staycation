const mongoose = require('mongoose');
const Location = require('./models/Location');
const { v4: uuidv4 } = require('uuid');

//Seeds
const cities = require('./seeds/cities')
const {places, descriptors} = require('./seeds/seedHelpers')

mongoose.connect('mongodb://localhost:27017/staycation')
    .then(() => {
        console.log('[seeds.js] Connection open')
    })
    .catch(err => {
        console.log('[ERROR] Something wrong happened.')
        console.log(err)
    })


const seedDb_Location = async () => {
    await Location.deleteMany({})
    for(let i=0; i < cities.length; i++){
        const newLocation = new Location({
            name: cities[i].city,
            country: cities[i].country,
            admin_name: cities[i].admin_name,
            latitude: cities[i].lat,
            longitude: cities[i].lng
        })

        await newLocation.save();
        console.log(await Location.find().count())
    }

}

seedDb_Location().then(() => {
    mongoose.connection.close();
    console.log("[SUCCESS] DB populated with Locations.")
})
