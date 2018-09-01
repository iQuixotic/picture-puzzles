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
ctx = canvas.getContext('2d')