
// variables 
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d');
let parts = [];
let img = new Image();
let elemDragStart, elemDragEnd, glass, results;
let referenceImageUsing = false;
let timerOn = false;
let min = 0;
let sec = 0;
const resultsDiv = document.getElementById('results');

// takes an image and preakes it up into 16 pieces
img.onload = function() {

    let w4 = img.width / 4
    let h4 = img.height / 4

    for (let i=0; i<16; i++){
        let x = (-w4*i) % (w4*4)
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

        canvas.width = w4;
        canvas.height = h4;
        canvas.imageSmoothingEnabled = false;

        ctx.drawImage(this, x, y, w4*4, h4*4)
        parts.push({
            _tag: `${i}`,
            mySrc: canvas.toDataURL()
        })
    }
    shuffle(parts)
    printToPage(parts)
} 
let puzzleChoice = 'castle.jpg'

setPuzzle = (arg) => {

    // resultsDiv.remove(results)
    results = '';
    resultsDiv.innerHTML = results;
    min = (00).toString();
    sec= (00).toString();
    seconds.innerHTML = '00';
    if(referenceImageUsing) {
        showRef(img)
    }
    let puzzle = document.getElementById('Puzzle');
    let brokenImgs = document.getElementsByClassName('Puzzle_broken-img');
    for(let i=15; i>=0; i--) {
        puzzle.removeChild(brokenImgs[i]);        
    }
    // brokenImgs.forEach(elem => {
    // puzzle.removeChild(this);
    // });
    puzzleChoice = arg;
    img.src = `./assets/img/${puzzleChoice}`;
    parts = [];
}
img.src = `./assets/img/${puzzleChoice}`;

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
    for(let i=0; i<arr.length; i++){
        winstate = arr._tag;
    }
    
    return arr;
}

// displays an array of pictures
printToPage = (arr) => {
    arr.forEach(elem => {

        let slicedImage = document.createElement('div');
    
        slicedImage.style.background += 'url(' + elem.mySrc + ') no-repeat';
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
    glass = {
        background: elemDragStart.style.background.toString(),
        id: e.target.id.toString()
    }
}


dragOver = (e) => {
    e.preventDefault();
}

drop = (e) => {
    elemDragEnd = e.target;
    elemDragStart.style.background = elemDragEnd.style.background;
    elemDragStart.id = elemDragEnd.id;

    elemDragEnd.style.background = glass.background;
    elemDragEnd.id = glass.id;
    parts[e.target.id]._tag = glass.id;   

    if(!timerOn) {
        timerOn = true;
        startTimer();
    }
}

checkForWin = () => {
    let correct = 0, wrong = 0;
    // let hold = [];
    let puzzle = document.getElementById('Puzzle');
    for(let i=0; i<16; i++) {
    // console.log(puzzle.children[i].id)

        if(i.toString() === puzzle.children[i].id) {
            blink(puzzle.children[i], 'green');
            correct++;
            // console.log(i, 'peepo')
        } else {
            blink(puzzle.children[i], 'red')
            wrong++;
            // console.log(i, 'elsa')
        }        
        stopTimer();
    }
    results = `You got <span class="bold">${correct.toString()}/16</span> correct in  
    <span class="bold">${min.toString()}</span> minutes and <span class="bold">
    ${sec.toString()}</span> seconds !!!`;
    resultsDiv.innerHTML = results;
}

showRef = (arg) => {    
    let pictureReferenceDiv = document.getElementById('image-ref-div')

    if(!referenceImageUsing) {
        pictureReferenceDiv.appendChild(arg)
        arg.classList = 'image-ref';
        referenceImageUsing = true;
    } else {
        pictureReferenceDiv.removeChild(arg);        
        referenceImageUsing = false;
    }

}

blink = (arg, color) => {
    let backgroungOn = true;
    const imgBackground = arg.style.background.toString();
    setInterval(() => { 
        if(backgroungOn) {  
            arg.style.background = 'none';
            arg.style.backgroundColor = color;     
        } else {
            arg.style.background = imgBackground;     
        }     
    backgroungOn = !backgroungOn;
    }, 1000);
}

startTimer = () => {
    const seconds = document.getElementById('seconds');
    const minutes = document.getElementById('minutes');
    setInterval(() => {
        if(timerOn) {
            if(sec<59) {
                sec++;
            } else {
                sec = 0;
                min++;
            }
            if(sec<10) {
                seconds.innerHTML = '0' + sec.toString();
            } else {
                seconds.innerHTML = sec;
            }        
            if(min<10) {
                minutes.innerHTML = '0' + min.toString();
            } else {
                minutes.innerHTML = min;
            }
        }
    }, 1000);
}

stopTimer = () => {
    timerOn = false;
}