const mongoose = require('mongoose');
const Listing = require('./models/Listing');
const { v4: uuidv4 } = require('uuid');

//Seeds
const cities = require('./seeds/cities')
const {places, descriptors} = require('./seeds/seedHelpers')

mongoose.connect('mongodb://localhost:27017/staycation')
    .then(() => {
        console.log('[Seeds.js] Connection open')
    })
    .catch(err => {
        console.log('[ERROR] Something wrong happened.')
        console.log(err)
    })

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Listing.deleteMany({})
    for(let i = 0; i < 30; i++){
        const rand_100 = Math.floor(Math.random() * 1000)
        const newListing = new Listing({
            name: `House No. ${i + 1}: ${sample(descriptors)} ${sample(places)}`,
            uploader: uuidv4(),
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At aliquam magni consectetur voluptate earum eum neque unde voluptas repellat placeat!',
            address: `${cities[rand_100].city}, ${cities[rand_100].admin_name}`,
            date: new Date()
        });
        await newListing.save();
    }
    const dbItemCount = await Listing.find().count();
    console.log(dbItemCount)
}

seedDB().then(() => {
    mongoose.connection.close();
});