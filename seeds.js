const mongoose = require('mongoose');
const Listing = require('./models/Listing');
const express = require('express')
const { v4: uuidv4 } = require('uuid');
const reviews = require('./seeds/reviews');

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

const sample = array => array[Math.floor(Math.random() * array.length)];

const gen_username = () => {
    const user_id = Math.floor(Math.random() * 10000000000000)
    let a = user_id
    return `User #${user_id}`;
}

const seedDB = async () => {
    await Listing.deleteMany({})
    for(let i = 0; i < 20; i++){
        const rand_100 = Math.floor(Math.random() * 100)
        const loc_info = cities[rand_100];
        const loc_text = loc_info.city + ', ' + loc_info.admin_name;
        const location_lat = parseFloat(loc_info.lat);
        const location_lng = parseFloat(loc_info.lng);
        const complete_address = loc_info.city + ', ' + loc_info.admin_name + ', ' + loc_info.country;
        const newListing = new Listing({
            name: `${sample(descriptors)} ${sample(places)}`,
            uploader: gen_username(),
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At aliquam magni consectetur voluptate earum eum neque unde voluptas repellat placeat!',
            address: {
                addr: loc_text,
                lat: location_lat,
                lng: location_lng
            },

            date: new Date(),
            image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=v9JXRncyT4tkJ-MEv3FK4zQbjLaB7b8xmMz0xUnhjaI&auto=format&fit=crop&w=1470&q=80',

            reviews: {
                reviewId: uuidv4(),
                username: gen_username(),
                comment: "This is a comment",
            }
            
        });
        console.log(newListing)
        await newListing.save();
        console.log(sample(reviews))
    }
    const dbItemCount = await Listing.find().count();
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log("[SUCCESS] DB populated.")
});