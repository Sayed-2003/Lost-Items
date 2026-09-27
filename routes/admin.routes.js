const express = require('express')
const router = express.Router()
const isSignedIn = require('../middleware/is-signed-in')
const isAdmin = require('../middleware/is-admin')
const User = require('../models/User.js')
const Item = require('../models/Item.js')
const Claim = require('../models/Claim.js')


router.get('/dashboard', isSignedIn, isAdmin, async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();

        const totalItems = await Item.countDocuments({ isDeleted: false })

        const totalClaims = await Claim.countDocuments();

        const pendingClaims = await Claim.countDocuments({
            status: 'Pending'
        })

        const pendingClaimsList = await Claim.find({
            status: 'Pending'
        })
            .populate('item')
            .populate('claimant')

        res.render('admin/dashboard.ejs', { totalUsers, totalItems, totalClaims, pendingClaims, pendingClaimsList });

    } catch (error) {

        console.log(error);

        res.status(500).send('Something went wrong');

    }

});

router.get('/users', isSignedIn, isAdmin, async (req, res) => {
    try {

        const users = await User.find()

        res.render('admin/users.ejs', { users })

    } catch (error) {

        console.log(error)
        res.status(500).send('Something went wrong')

    }
})

router.get('/items', isSignedIn, isAdmin, async (req, res) => {
    try {

        const items = await Item.find({
            isDeleted: false
        }).populate('owner')

        res.render('admin/items.ejs', {
            items
        })

    } catch (error) {

        console.log(error)
        res.status(500).send('Something went wrong')

    }
})

router.get('/claims', isSignedIn, isAdmin, async (req, res) => {
    try {

        const claims = await Claim.find()
            .populate('item')
            .populate('claimant')

        res.render('admin/claims.ejs', {
            claims
        })

    } catch (error) {

        console.log(error)
        res.status(500).send('Something went wrong')

    }
})

module.exports = router;