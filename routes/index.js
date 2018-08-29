const router = require('express').Router();
const path = require('path')
const external = require('../controllers/external')

// if no routes are hit, go to index
router.use((req, res) => {
    res.sendFile(path.join(__dirname, '../views'));
});

module.exports = router;