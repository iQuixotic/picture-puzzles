
// variables 
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d');
let parts = [];
let img = new Image();
let elemDragStart, elemDragEnd, glass;

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
            mySrc: canvas.toDataURL()
        })
    }
    shuffle(parts)
    printToPage(parts)
} 

img.src = "./assets/img/pikachu.png"

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

        // let slicedImage = document.createElement('img')
        let slicedImage = document.createElement('div');
    
        // slicedImage.src = elem.imageSlice;
        slicedImage.style.background += 'url(' + parts[elem._tag].mySrc + ') no-repeat';
        slicedImage.classList += 'Puzzle_broken-img';
        slicedImage.style.backgroundSize = ' cover';
        slicedImage.draggable = true;
        slicedImage.id = elem._tag;

        // add event listeners
        slicedImage.addEventListener('dragstart', dragStart)
        slicedImage.addEventListener('dragover', dragOver)
        slicedImage.addEventListener('drop', drop)

        let div = document.getElementById('Puzzle')
        div.appendChild(slicedImage)
    });
}

dragStart = (e) => {
    elemDragStart = e.target;    
    glass = elemDragStart.style.background.toString();
    console.log(elemDragStart.id)
}


dragOver = (e) => {
    e.preventDefault();
}

drop = (e) => {
    elemDragEnd = e.target;
    elemDragStart.style.background = elemDragEnd.style.background;
    console.log(glass)

    elemDragEnd.style.background = glass;
    console.log(glass, elemDragStart.style.background, elemDragEnd.style.background)
   
}

// checkForWin = () => {
//     for(let i=0; i<16; 1++) {
//         console.log('i', i)
//     }
// }