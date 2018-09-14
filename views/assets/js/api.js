
doTheFetch = (arg) => {
    fetch('http://localhost:4040/api/split', {
        method: 'post',
        body: JSON.stringify({
            partsArr: arg
        }),
        headers: {
            "Content-Type": "application/json"
        }
      })
      .then((imgParts) => {
          console.log(res.json(imgParts))
        // res.json();
      })
      .catch(function (error) {  
        console.log('Request failure: ', error);  
      });
    // console.log(arg)
}

const canvas = document.createElement('canvas')


// const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let parts = [];
let img = new Image();
// puzz.appendChild(canvas)


// ctx.drawImage(img, 20, 20, 200, 200)


// img.width = 1000;
// img.height = 1000;
// console.log(img)


img.onload = function() {
    
// ctx.drawImage(img, 20, 20, 400, 400)
        // const div = document.getElementById('Puzzle')

        // div.appendChild(canvas)


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
        console.log(w4, h4)

        ctx.drawImage(this, x, y, w4*4, h4*4)


        parts.push(canvas.toDataURL())

        let slicedImage = document.createElement('img')
        slicedImage.src = parts[i];
        let div = document.getElementById('Puzzle')

        if(i%4 === 0) {
            slicedImage.classList.add('new-line')
        }

        div.appendChild(slicedImage)

        // console.log(parts)

        console.log('x', x, 'y', y)
    }
}


// img.onload = split_16();
img.src = "./assets/img/wolf.jpg"

sliceItUp = () => {
    // doTheFetch(parts)   
    doTheFetch([1, 2, 3, 4, 5, 6, 7, 8])   

} 
