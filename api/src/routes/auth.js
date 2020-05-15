const express = require('express');
const router = express.Router();
const names = require('../names');
const token = require('../auth_helper').token;
const random = require('../number_helper').random;
const roles = require('../constants').roles;

const getName = () => {
    return names[(random(names.length))];
};

router.post('/signin', (req, res) => {
    const request = req.body;
    const name = getName();
    const role = request.isAdmin ? roles.admin : roles.user;
    const payload = {id: random(4), firstName: name.firstName, lastName: name.lastName, role};
    res.json({token: token(payload), ...payload})
});

module.exports = router;