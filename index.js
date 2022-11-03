const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Listing = require('./models/Listing');

mongoose.connect('mongodb://localhost:27017/staycation')
    .then(() => {
        console.log("=> Connected to DB.")
    })
    .catch(err => {
        console.log("=> Ooops, there was an error: \n")
        console.log(err)
    });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))

//View all listings

app.get('/listings', async (req, res) => {
    const lists = await Listing.find({})
    res.render('listings/index', {lists})
})

//View specific listing

//Edit or update a listing


app.get('/', (req, res) => {
    res.send("Homepage!")
})

//Listen at 3000 for any connections
app.listen(3000, () => {
    console.log("[INFO] Listening on port 3000")
})