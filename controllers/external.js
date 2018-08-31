const imageToSlices = require('image-to-slices');
const canvas = require('canvas')
const shuffle = require('shuffle-array');

module.exports = {

    // READ all accounts from the database
    sliceImage: (req, res) => {
        console.log(req.body.img)
        var lineXArray = [100, 200];
        var lineYArray = [100, 200];
        var source = req.body.img; 

        imageToSlices(source, lineXArray, lineYArray, {
            saveToDir: req.body.img
        }, function () {
            console.log('the source image has been sliced into 9 sections!');
        });
    }

}