const router = require('express').Router()
const Item =require("../models/Item")

router.get('/create', (req, res) => {
    res.render('items/create-item.ejs')
})

module.exports = router