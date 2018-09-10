// sliceItUp = () => {
//     const postPic = document.getElementById('Puzzle_img-js')
//     doTheFetch(postPic)   
//     console.log(postPic)
// } 

// doTheFetch = (arg) => {
//     fetch('http://localhost:4040/api/split', {
//         method: 'post',
//         body: JSON.stringify({
//             img: arg.src
//         }),
//         headers: {
//             "Content-Type": "application/json"
//         }
//       })
//       .then((res) => {
//         return res.json();
//       })
//       .catch(function (error) {  
//         console.log('Request failure: ', error);  
//       });
//     console.log(arg)
// }

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
        if((h4*i) <= h4) {
            y = 0 
        } else {
            y = -h4
        }
        

        canvas.width = w4;
        canvas.height = h4;
        console.log(w4, h4)

        ctx.drawImage(this, x, y, w4*4, h4*4)
        // ctx.drawImage(img, 20, 20, 200, 200)


        parts.push(canvas.toDataURL())

        let slicedImage = document.createElement('img')
        slicedImage.src = parts[i];
        let div = document.getElementById('Puzzle')

        div.appendChild(slicedImage)

        console.log(parts)

        console.log('x', x, 'y', y)
    }
}


// img.onload = split_16();
img.src = "./assets/img/wolf.jpg"