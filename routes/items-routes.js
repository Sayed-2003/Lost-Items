const router = require('express').Router()
const isSignedIn = require('../middleware/is-signed-in');
const Item =require("../models/Item")

router.get('/create', (req, res) => {
    res.render('items/create-item.ejs')
})

router.post('/create',isSignedIn, async (req, res) => {
    try {
        const{title,description,category,location,date,type,image} = req.body
        const createdItem = await Item.create({
            title: title,
            description: description,
            category: category,
            location: location,
            date: date,
            type: type,
            image: image,
            owner: req.session.user._id
        })

        console.log(createdItem);

        res.redirect('/items/create');

    } catch (error) {
        console.log(error);
    }
});

// display all items
router.get('/all-items', async (req, res) => {
    try {
        const foundItems = await Item.find().populate('owner');

        res.render('items/all-items.ejs', {
            items: foundItems
        });

    } catch (error) {
        console.log(error);
    }
});


// display each user item 
router.get('/:id', async (req, res) => {
    try {
        const foundItem = await Item.findById(req.params.id).populate('owner');

        res.render('items/item-details.ejs', {
            item: foundItem
        });

    } catch (error) {
        console.log(error);
    }
});

router.get('/:id/edit', isSignedIn, async (req, res) => {
    try {
        const foundItem = await Item.findById(req.params.id);

        res.render('items/edit-item.ejs', {
            item: foundItem
        });

    } catch (error) {
        console.log(error);
    }
});

module.exports = router