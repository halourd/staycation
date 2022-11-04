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

const gen_username = () => {
    const user_id = Math.floor(Math.random() * 10000000000000)
    let a = user_id
    return `User #${user_id}`;
}

const seedDB = async () => {
    await Listing.deleteMany({})
    for(let i = 0; i < 10; i++){
        const rand_100 = Math.floor(Math.random() * 1000)
        const newListing = new Listing({
            name: `${sample(descriptors)} ${sample(places)}`,
            uploader: gen_username(),
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At aliquam magni consectetur voluptate earum eum neque unde voluptas repellat placeat!',
            address: `${cities[rand_100].city}, ${cities[rand_100].admin_name}`,
            date: new Date(),
            image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=v9JXRncyT4tkJ-MEv3FK4zQbjLaB7b8xmMz0xUnhjaI&auto=format&fit=crop&w=1470&q=80'
        });
        await newListing.save();
    }
    const dbItemCount = await Listing.find().count();
    console.log(dbItemCount)
}

seedDB().then(() => {
    mongoose.connection.close();
});