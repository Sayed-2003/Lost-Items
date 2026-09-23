const router = require('express').Router()
const isSignedIn = require('../middleware/is-signed-in')
const Item = require("../models/Item")

router.get('/', (req, res) => {
    res.redirect('/items/all-items')
});

router.get('/create', (req, res) => {
    res.render('items/create-item.ejs')
})

router.post('/create', isSignedIn, async (req, res) => {
    try {
        const { title, description, category, location, date, type, image } = req.body
        const createdItem = await Item.create({
            title,
            description,
            category,
            location,
            date,
            type,
            image,
            owner: req.session.user._id
        })

        console.log(createdItem);

        res.redirect('/items/all-items')

    } catch (error) {
        console.log(error)
    }
});

// display all items
router.get('/all-items', async (req, res) => {
    try {
        const foundItems = await Item.find({ isDeleted: false }).populate('owner')

        res.render('items/all-items.ejs', { items: foundItems })

    } catch (error) {
        console.log(error)
    }
});


// display each user item 
router.get('/:id', async (req, res) => {
    try {
        const foundItem = await Item.findOne({ _id: req.params.id, isDeleted: false }).populate('owner')

        res.render('items/item-details.ejs', { item: foundItem })

    } catch (error) {
        console.log(error)
    }
});

router.get('/:id/edit', isSignedIn, async (req, res) => {
    try {
        const { id } = req.params
        const foundItem = await Item.findById(id)

        if (!foundItem.owner.equals(req.session.user._id)) {
            return res.send('You are not the owner')
        }

        res.render('items/edit-item.ejs', { item: foundItem })

    } catch (error) {
        console.log(error)
    }
});

router.put('/:id', isSignedIn, async (req, res) => {
    try {
        const { title, description, category, location, date, type, image } = req.body
        const { id } = req.params

        if (!foundItem.owner.equals(req.session.user._id)) {
            return res.send('You are not the owner')
        }

        const updatedItem = await Item.findByIdAndUpdate(id,
            {
                title,
                description,
                category,
                location,
                date,
                type,
                image
            }, { new: true }
        )

        console.log(updatedItem);

        res.redirect('/items')

    } catch (error) {
        console.log(error)
    }
})

router.delete('/:id', isSignedIn, async (req, res) => {

    const { id } = req.params

    const foundItem = await Item.findById(id)

    if (!foundItem) {
        return res.send('Item not found')
    }

    if (!foundItem.owner.equals(req.session.user._id)) {
        return res.send('You are not the owner')
    }

    const deletedItem = await Item.findByIdAndUpdate(id, { isDeleted: true })

    console.log(deletedItem)

    res.redirect('/items')

})


module.exports = router