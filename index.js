const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate')
const path = require('path');
const Listing = require('./models/Listing');
const methodOverride = require('method-override')


mongoose.connect('mongodb://localhost:27017/staycation')
    .then(() => {
        console.log("[SUCCESS] Connected to DB.")
    })
    .catch(err => {
        console.log("=> Ooops, there was an error: \n")
        console.log("[ERROR] " + err)
    });

app.engine('ejs', ejsMate)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))


//Create new listing
app.get('/listings/new', (req, res) => {
    res.render('listings/new');
})

app.post('/listings', async (req, res) => {
    const newListingRequest = new Listing(req.body);
    const newListing = Object.assign(newListingRequest, {date: new Date(), image: `https://images.unsplash.com/photo-1416339306562-f3d12fefd36f`})
    await newListing.save();
    console.log("[INFO] "+newListing)
    res.redirect(`/listings/${newListing._id}`)
})

//View all listings
app.get('/listings', async (req, res) => {
    const lists = await Listing.find({})
    res.render('listings/index', {lists})
})

//View specific listing
app.get('/listings/:id', async (req, res) => {
    const {id} = req.params;
    const list_item = await Listing.findById(id);
    res.render('listings/show_list', {list_item})

})

//Route user to Edit Page
app.get('/listings/:id/edit', async (req, res) => {
    const {id} = req.params
    const list_item = await Listing.findById(id);
    res.render('listings/edit', {list_item})
})

//Update listing or list item
app.put('/listings/:id', async (req, res) => {
    const {id} = req.params
    const editListRequest = req.body
    const editRequest = Object.assign(editListRequest, {date: new Date(), image: `https://images.unsplash.com/photo-1416339306562-f3d12fefd36f`})
    // const dataDeleted = id;
    const list_item = await Listing.findByIdAndUpdate(id, editRequest, {runValidators: true, new: true});
    console.log("[MODIFY] "+list_item)
    res.redirect(`/listings/${list_item._id}`);
})

//Delete listing
app.delete('/listings/:id', async (req, res) => {
    const { id } = req.params;
    const deleteListing = await Listing.findByIdAndDelete(id);
    res.redirect('/listings');
})


app.get('/', (req, res) => {
    res.redirect('/listings')
})

//Listen at 3000 for any connections
app.listen(3000, () => {
    console.log("[INFO] Listening on port 3000")
})