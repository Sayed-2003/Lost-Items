const router = require('express').Router()
const isSignedIn = require('../middleware/is-signed-in')
const Claim = require('../models/Claim')
const Item = require('../models/Item')

router.get('/create/:itemId', isSignedIn, async (req, res) => {
    try {

        const foundItem = await Item.findOne({
            _id: req.params.itemId,
            isDeleted: false
        })

        if (!foundItem) {
            return res.send('Item not found')
        }

        if (foundItem.owner.equals(req.session.user._id)) {
            return res.send('You cannot claim your own item')
        }

        const existingClaim = await Claim.findOne({
            item: foundItem._id,
            claimant: req.session.user._id
        })

        if (existingClaim) {
            return res.send('You have already claimed this item')
        }

        res.render('claims/create-claim.ejs', {
            item: foundItem
        })

    } catch (error) {
        console.log(error)
    }
})

router.post('/create/:itemId', isSignedIn, async (req, res) => {
    try {

        const foundItem = await Item.findOne({
            _id: req.params.itemId,
            isDeleted: false
        })

        if (!foundItem) {
            return res.send('Item not found')
        }

        if (foundItem.owner.equals(req.session.user._id)) {
            return res.send('You cannot claim your own item')
        }

        const approvedClaim = await Claim.findOne({
            item: foundItem._id,
            status: 'Approved'
        })

        if (approvedClaim) {
            return res.send('This item has already been claimed')
        }

        const existingClaim = await Claim.findOne({
            item: foundItem._id,
            claimant: req.session.user._id
        })

        if (existingClaim) {
            return res.send('You have already claimed this item')
        }

        const newClaim = await Claim.create({
            item: foundItem._id,
            claimant: req.session.user._id,
            message: req.body.message
        })

        res.redirect('/items/all-items')

    } catch (error) {
        console.log(error)
    }
})

router.get('/requests', isSignedIn, async (req, res) => {
    try {
        const foundClaim = await Claim.find({ status: 'Pending' }).populate('claimant item')

        const filteredClaims = foundClaim.filter((claim) => claim.item.owner == req.session.user._id)

        res.render('claims/user-claims.ejs', { Claim: filteredClaims, user: req.session.user._id })

    } catch (error) {
        console.log(error)
    }
});

router.put('/:id/accept', isSignedIn, async (req, res) => {
    try {
        await Claim.findByIdAndUpdate(req.params.id, { status: 'Approved' })

        res.redirect('/claims/requests')

    } catch (error) {
        console.log(error)
        res.redirect('/claims/requests')
    }
})


router.put('/:id/reject', isSignedIn, async (req, res) => {
    try {
        await Claim.findByIdAndUpdate(req.params.id, { status: 'Rejected' })

        res.redirect('/claims/requests')

    } catch (error) {
        console.log(error)
        res.redirect('/claims/requests')
    }
})

router.get('/my-claims', isSignedIn, async (req, res) => {
    try {
        const foundClaims = await Claim.find({ claimant: req.session.user._id }).populate('item')

        res.render('claims/my-claims.ejs', { Claim: foundClaims })

    } catch (error) {
        console.log(error)
    }
})

module.exports = router