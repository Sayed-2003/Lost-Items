const express = require('express');

const router = express.Router();

const isSignedIn = require('../middleware/is-signed-in');
const isAdmin = require('../middleware/is-admin');

router.get('/dashboard', isSignedIn, isAdmin, (req, res) => {

    res.send('Admin Dashboard');

});

module.exports = router;