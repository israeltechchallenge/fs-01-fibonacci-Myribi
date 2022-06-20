
const title = document.getElementById('title')

function fibo(x, y) {
    title.innerHTML = `The Fibonacci of ${x} is ${y}`;   
}


function fibonacci(num) {
    let x = 0
    let y = 1
    let z;
    let i = 0

    for (i=2; i<=num; i++) {
        z = x + y
        x = y
        y = z
    }
    return y;
}



let x = 12;
fibo(x,fibonacci(x))






















//function Xbonacci(sig,n) {
   // var result = [];
    //for (i=0; i<sig.length; i++) {
       // result.push(sig[i]);
   // }
    //for (j=0; j<(n-sig.length); j++) {
       // somme = 0
       // for(k=0; k<sig.length; k++) {

            //somme = somme + result[j+k]
       // }
    //result.push(somme)
  //  }
   // return result
//}


//var test = [1,1,1,1]
//var long =10
//console.log(Xbonacci(test,long))