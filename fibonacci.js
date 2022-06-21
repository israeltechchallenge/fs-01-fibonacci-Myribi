// function fibonacciRecursive(num) {
//   if (num <= 1) return num;
//   return fibonacciRecursive(num - 1) + fibonacciRecursive(num - 2);
// }

function callServer(number) {
  fetch(`http://localhost:5050/fibonacci/${number}`)
  .then((response) => response.json())
    .then(data => {
      document.getElementById("result").innerHTML = data["result"]
    });
}



function inputChange() {
  callServer(document.getElementById("number").value)
}


 



 