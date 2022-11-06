const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate')
const path = require('path');
const Listing = require('./models/Listing');
const cities = require('./seeds/cities');
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


gen_username = () => {
    const user_id = Math.floor(Math.random() * 10000000000000)
    let a = user_id
    return `User #${user_id}`;
}

//Create new listing
app.get('/listings/new', (req, res) => {
    const city_list = JSON.stringify(cities);
    res.render('listings/new', {city_list});
})

app.post('/listings', async (req, res) => {
    const newListRequest = req.body;
    const newListingRequest = new Listing(req.body);
    console.log(req.body);

    const newListing = Object.assign(newListingRequest, 
        {
            uploader: gen_username(),    
            address: {
                addr: `${newListRequest.address}`, 
                lat: newListRequest.lat, 
                lng: newListRequest.lng 
        }, 
            date: new Date(), 
            image: `https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=v9JXRncyT4tkJ-MEv3FK4zQbjLaB7b8xmMz0xUnhjaI&auto=format&fit=crop&w=1470&q=80`
        })

    await newListing.save();
    console.log("[INFO] "+newListing)
    res.redirect(`/listings/${newListing._id}`)
})

//View all listings
app.get('/listings', async (req, res) => {
    const lists = await Listing.find({})
    if(lists.length == 0){
        res.render('listings/empty')
    }

    res.render('listings/index', {lists})
})

//View specific listing
app.get('/listings/:id', async (req, res) => {
    const {id} = req.params;
    const list_item = await Listing.findById(id);
    console.log(list_item)
    res.render('listings/show_list', {list_item})

})

//Route user to Edit Page
app.get('/listings/:id/edit', async (req, res) => {
    const {id} = req.params
    const list_item = await Listing.findById(id);
    const city_list = JSON.stringify(cities);
    res.render('listings/edit', {list_item, city_list})
})

//Update listing or list item
app.put('/listings/:id', async (req, res) => {
    const {id} = req.params
    const editListRequest = req.body
    console.log(editListRequest)
    const editRequest = Object.assign(editListRequest, 
        {
            address: {
                addr: `${editListRequest.address}`, 
                lat: editListRequest.lat, 
                lng: editListRequest.lng 
            }, 
                date: new Date(), 
                image: `https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=v9JXRncyT4tkJ-MEv3FK4zQbjLaB7b8xmMz0xUnhjaI&auto=format&fit=crop&w=1470&q=80`
            })

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