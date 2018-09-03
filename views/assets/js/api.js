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

const canvas = document.createElement('canvas'),
ctx = canvas.getContext('2d'),
parts = [];
let img = new Image();



split_16 = () => {
    const w4 = img.width / 4
    const h4 = img.height / 4

    for (let i=0; i<16; i++){
        const x = (-w4*i) % (w4*4)
        const y = (-h4*i) <= h4 ? 0 : -h4

        canvas.width = w4;
        canvas.height = h4;

        ctx.drawImage(this, x, y, w4*4, h4*4)

        parts.push(canvas.toDataURL())

        const slicedImage = document.createElement('img')
        slicedImage.src = parts[i];
        const div = document.getElementById('Puzzle')

        div.appendChild(slicedImage)

        console.log(parts)

        // console.log('x', x, 'y', y)
    }

}

img.src = "../views/assets/img/pikachuNaruto.png"
console.log(img)

img.onload = split_16();