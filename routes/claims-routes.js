const router = require('express').Router()
const isSignedIn = require('../middleware/is-signed-in')
const Claim = require('../models/Claim')
const Item = require('../models/Item')

router.get('/create/:itemId', isSignedIn, async (req, res) => {
    try {
        const foundItem = await Item.findById(req.params.itemId)

        res.render('claims/create-claim.ejs', {item: foundItem})

    } catch (error) {
        console.log(error)
    }
})

router.post('/create/:itemId', isSignedIn, async (req, res) => {
    try {
        const foundItem = await Item.findById(req.params.itemId);

        const newClaim = await Claim.create({
            item: foundItem._id,
            claimant: req.session.user._id,
            message: req.body.message
        });

        res.redirect('/items/all-items')

    } catch (error) {
        console.log(error);
    }
});

router.get('/requests',isSignedIn, async (req, res) => {
    try {
        const foundClaim = await Claim.find({status: 'Pending'}).populate('claimant item')

        res.render('claims/user-claims.ejs', { Claim: foundClaim })

    } catch (error) {
        console.log(error)
    }
});

router.put('/:id', async(req,res)=>{
    const foundClaim = await Claim.findByIdAndUpdate(req.params.id,{
        status: 'Approved'
    })
    res.redirect('/claims/requests')
})


router.put('/:id', async(req,res)=>{
    const foundClaim = await Claim.findByIdAndUpdate(req.params.id,{
        status: 'Rejected'
    })
    res.redirect('/claims/requests')
})
module.exports = router