const router = require('express').Router();
const path = require('path');
// const api = require('./api');

// router.use('/api', api)

// if no routes are hit, go to index
router.use((req, res) => {
    res.sendFile(path.join(__dirname, '../views'));
});

module.exports = router; 