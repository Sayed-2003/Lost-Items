const express = require('express')
const router = express.Router()
const isSignedIn = require('../middleware/is-signed-in')
const isAdmin = require('../middleware/is-admin')


router.get('/dashboard', isSignedIn, isAdmin, (req, res) => {

    res.render('admin/dashboard.ejs')

})

router.get('/dashboard', isSignedIn, isAdmin, async (req, res) => {

    try {

        const totalUsers = await User.countDocuments();

        const totalItems = await Item.countDocuments({
            isDeleted: false
        });

        const totalClaims = await Claim.countDocuments();

        const pendingClaims = await Claim.countDocuments({
            status: 'Pending'
        });

        res.render('admin/dashboard.ejs', {
            totalUsers,
            totalItems,
            totalClaims,
            pendingClaims
        });

    } catch (error) {

        console.log(error);

        res.status(500).send('Something went wrong');

    }

});

module.exports = router;