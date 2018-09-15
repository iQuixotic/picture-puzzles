
// variables 
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d');
let parts = [];
let img = new Image();

// takes an image and preakes it up into 16 pieces
img.onload = function() {

    let w4 = img.width / 4
    let h4 = img.height / 4

    for (let i=0; i<16; i++){
        let x = (-w4*i) % (w4*4)
        let y;
        if(i<3) {
            y = 0 
        } else if(i<7) {
            y = -h4
        } else if(i<11) {
            y = -(h4 * 2)
        } else {
            y = -(h4 * 3)
        }
        

        canvas.width = w4;
        canvas.height = h4;

        ctx.drawImage(this, x, y, w4*4, h4*4)
        parts.push({
            _tag: `${i}`,
            imageSlice: canvas.toDataURL()
        })
    }
    shuffle(parts)
    printToPage(parts)
} 

img.src = "./assets/img/wolf.jpg"

// sliceItUp = () => {
//     console('hey')
// } 

// shuffles array of picture parts
shuffle = (arr) => { 
    let currentIndex = arr.length, 
    glass, 
    randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1;
        
        glass = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = glass;

    }
    return arr;
}

// displays an array of pictures
printToPage = (arr) => {
    arr.forEach(elem => {

        let slicedImage = document.createElement('img')
        slicedImage.src = elem.imageSlice;
        let div = document.getElementById('Puzzle')

        div.appendChild(slicedImage)
        console.log(arr)
    });
}

paneBuilder = () => {
    const attachDiv = document.getElementById('Puzzle_map') 
    console.log(attachDiv)
    for(let i=0; i<16; i++) {
        let baseDiv = document.createElement('div')       
        baseDiv.classList +=  'Puzzle_map-panel'
        attachDiv.appendChild(baseDiv)
        console.log(attachDiv)
    }
}

paneBuilder();