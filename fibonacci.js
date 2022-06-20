let x;
let y;
const title = document.getElementById('title')

function calcFib(x, y) {
    title.innerHTML = `The Fibonacci of ${x} is ${y}`;
}

calcFib(13,233)
