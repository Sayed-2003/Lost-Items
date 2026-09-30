const router = require('express').Router()
const isSignedIn = require('../middleware/is-signed-in')
const Item = require("../models/Item")
const upload = require('../middleware/upload')
const Claim = require('../models/Claim')
const generateItemPDF = require('../utils/generateItemPDF')

router.get('/', (req, res) => {
    res.redirect('/items/all-items')
});

router.get('/create',isSignedIn, (req, res) => {
    res.render('items/create-item.ejs')
})

router.post('/create', isSignedIn,upload.single('image'), async (req, res) => {
    try {
        const { title, description, category, location, date, type, image } = req.body
        const createdItem = await Item.create({
            title,
            description,
            category,
            location,
            date,
            type,
            image: `/uploads/${req.file.filename}`,
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

        res.render('items/all-items.ejs', { items: foundItems})

    } catch (error) {
        console.log(error)
    }
});

// generate a PDF for a single item
router.get('/:id/pdf', async (req, res) => {
    try {
        const foundItem = await Item.findOne({
            _id: req.params.id,
            isDeleted: false
        }).populate('owner')

        if (!foundItem) {
            return res.send('Item not found')
        }

        const doc = generateItemPDF(foundItem)

        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="item-${foundItem._id}.pdf"`
        )

        doc.pipe(res)
        doc.end()

    } catch (error) {
        console.log(error)
        res.status(500).send('Something went wrong generating the PDF')
    }
})

// display each user item 
router.get('/:id',isSignedIn, async (req, res) => {
    try {
        const foundItem = await Item.findOne({ _id: req.params.id, isDeleted: false }).populate('owner')

         if (!foundItem) {
            return res.send('Item not found')
        }

        const isClaimed = await Claim.findOne({item:foundItem._id, status:'Approved' })
        
        res.render('items/item-details.ejs', { item: foundItem, isClaimed })

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

router.put('/:id', isSignedIn, upload.single('image'), async (req, res) => {
    try {
        const { title, description, category, location, date, type } = req.body
        const { id } = req.params

        const updateData = { title, description, category, location, date, type }

        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`
        }

        await Item.findByIdAndUpdate(id, updateData, { new: true })

        res.redirect('/items')
    } catch (error) {
        console.log(error)
        res.status(500).send('Something went wrong')
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