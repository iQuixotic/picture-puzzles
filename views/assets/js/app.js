
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
        console.log(w4*4)
        // let x=0;
        if(x === -0){
            x=0;
        }
        let y;
        if(i<4) {
            y = 0 
        } else if(i<8) {
            y = -h4
        } else if(i<12) {
            y = -(h4 * 2)
        } else {
            y = -(h4 * 3)
        }        
        console.log('x: ', i.toString(), x)
        console.log('y: ', i.toString(),  y)

        canvas.width = w4;
        canvas.height = h4;

        ctx.drawImage(this, x, y, w4*4, h4*4)
        parts.push({
            _tag: `${i}`,
            mySrc: canvas.toDataURL()
        })
    }
    // shuffle(parts)
    printToPage(parts)
} 

img.src = "./assets/img/pikachuNaruto.png"

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
        // console.log(elem)
        // console.log(arr[elem._tag]._tag)
    });
}

dragStart = (e) => {
    elemDragStart = e.target;    
    glass = {
        background: elemDragStart.style.background.toString(),
        id: e.target.id.toString()
    }
    // console.log(elemDragStart.id)
}


dragOver = (e) => {
    e.preventDefault();
}

drop = (e) => {
    
    console.log('was', e.target.id)
    elemDragEnd = e.target;
    elemDragStart.style.background = elemDragEnd.style.background;
    elemDragStart.id = elemDragEnd.id;

    // console.log(glass)

    elemDragEnd.style.background = glass.background;
    elemDragEnd.id = glass.id;
    parts[e.target.id]._tag = glass.id;

    // console.log('parts', parts[e.target.id]._tag)
    console.log('is', elemDragEnd.id)

    // console.log(glass, elemDragStart.style.background, elemDragEnd.style.background)
   
}

checkForWin = () => {
    let correct = 0, wrong = 0;
    for(let i=0; i<16; i++) {
        // winCheckableArr.push(i)
        // console.log(winCheckableArr)
        // console.log(parts)

        // console.log(elemDragEnd.style.background)
        if(i === parseInt(parts[i]._tag)) {
            correct++;
            console.log(i, 'peepo')
        } else {
            wrong++;
            console.log(i, 'elsa')
        }        // parts[i]._tag = 
        // console.log('i', parts[i]._tag)
        // if(parts[i]._tag === )
    }
    
    console.log('you got ' + correct + ' correct and '+ wrong + ' wrong')
}