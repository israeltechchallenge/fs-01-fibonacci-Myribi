const loader = document.getElementById("loader");
let btn = document.getElementById("btn");
let result = document.getElementById('result')

function callServer(number) {

  loader.classList.add("spinner-border");
    fetch(`http://localhost:5050/fibonacci/${number}`)
  
    .then ((response) => {
    
      if (!response.ok) {
        response.text()
        .then(erText => { 
          result.innerHTML= "Server Error:" + " " + erText
          result.classList.add("text-danger")
          loader.classList.remove("spinner-border");
        
        })
      } 
         return response.json();
      })
  
      .then(data => {
        result.innerHTML = data["result"]
        loader.classList.remove("spinner-border");
      })
      
      }
  
btn.addEventListener("click", function () {
  
  let nums= parseInt(document.getElementById("number").value);
  loader.classList.add("spinner-border");
  let inputField = document.querySelector("input");
  result.innerText = "";
  error.innerText="";
  error.classList.add("d-none");
  result.classList.remove("text-danger")

  if (inputField.classList.contains("text-danger", "border-danger")){
    inputField.classList.remove("text-danger", "border-danger")
  }
  
  if (nums > 50) {
    error.classList.add("error");
    error.classList.remove("d-none")
    error.innerText = "Can't be larger than 50"
    loader.classList.remove("spinner-border");
    inputField.classList.add("text-danger", "border-danger")
    

  } else {
    error.classList.remove("error");
    callServer(nums);
    
  }
  
}) 
