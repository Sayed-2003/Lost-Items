const isAdmin = (req, res, next) => {

    if (!req.session.user) {
        return res.redirect('/auth/sign-in');
    }

    if (req.session.user.role !== 'admin') {
        return res.status(403).send('Access denied');
    }

    next();
};

module.exports = isAdmin;