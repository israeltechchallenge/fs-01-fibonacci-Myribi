const loader = document.getElementById("loader");
const loader2 = document.getElementById("loader2");
let btn = document.getElementById("btn");
let result = document.getElementById("result");
let checked = document.getElementById("flexCheckDefault");
let dropdown = document.querySelectorAll(".dropdown-item");
let history = document.getElementById("history");

function removeSpinner() {
  loader.classList.remove("spinner-border");
}
function removeSpinner2() {
  loader2.classList.remove("spinner-border");
}

function callServer(number) {
  fetch(`http://localhost:5050/fibonacci/${number}`)
    .then((response) => {
      if (!response.ok) {
        response.text().then((erText) => {
          result.innerHTML = "Server Error:" + " " + erText;
          result.classList.add("text-danger");
          removeSpinner();
          removeSpinner2();
        });
      } else {
        return response.json();
      }
    })
    .then((data) => {
      if (data) {
        result.innerHTML = data["result"];
      }
      removeSpinner();
      removeSpinner2();
    });
  callServerHistory();
}

btn.addEventListener("click", function () {
  let nums = parseInt(document.getElementById("number").value);
  loader.classList.add("spinner-border");
  loader2.classList.add("spinner-border");
  let inputField = document.querySelector("input");
  result.innerText = "";
  error.innerText = "";
  error.classList.add("d-none");
  result.classList.remove("text-danger");
  let checkbox = document.getElementById("checkbox");

  if (inputField.classList.contains("text-danger", "border-danger")) {
    inputField.classList.remove("text-danger", "border-danger");
  }

  if (nums > 50) {
    error.classList.add("error");
    error.classList.remove("d-none");
    error.innerText = "Can't be larger than 50";
    removeSpinner();
    removeSpinner2();
    inputField.classList.add("text-danger", "border-danger");
    return;
  }
  if (checkbox.checked === false) {
    fibonacci();
    removeSpinner();
    removeSpinner2();
  } else {
    error.classList.remove("error");
    callServer(nums);
    callServerHistory();
  }
});

function callServerHistory(sort) {
  fetch("http://localhost:5050/getFibonacciResults")
    .then((response) => {
      return response.json();
    })

    .then((data) => {
           
      if (document.getElementById("historyList") !== null) {
        document.getElementById("historyList").remove();
      }

      if (sort) {
        sortBy(sort, data.results); 
      }

      displayList(data.results)
    });
}

callServerHistory();

function fibonacci() {
  let x = parseInt(document.getElementById("number").value);
  let m = 0;
  let y = 1;
  let z;
  let i = 0;

  for (let i = 2; i <= x; i++) {
    z = m + y;
    m = y;
    y = z;
  }
  result.innerHTML = `<strong><u>${y}</u></strong>`;
}

dropdown.forEach((item) => {
  item.addEventListener("click", (event) => {
    callServerHistory(event.target.innerText);
  });
});

function sortBy(innerText, arraySorted) {
  switch (innerText) {
    case "Number Asc":
      arraySorted.sort((a, b) => {
        return a.number - b.number;
      });
      break;

    case "Number Desc":
      arraySorted.sort(function (a, b) {
        return b.number - a.number;
      });
      break;

    case "Date Asc":
      arraySorted.sort(function (a, b) {
        return a.createdDate - b.createdDate;
      });
      break;

    case "Date Desc":
      arraySorted.sort(function (a, b) {
        return b.createdDate - a.createdDate;
      });
      break;
  }
}


function displayList(listeArr) {
  let ol = document.createElement("ol");

  ol.setAttribute("id", "historyList");
  history.innerHTML = "";
  for (let i of listeArr) {
    let li = document.createElement("li");
    var date = new Date(i["createdDate"]);
    li.innerHTML = `The Fibonacci of <b>${i["number"]}</b> is <b>${i["result"]}</b>. Calculated at: ${date}`;
    ol.appendChild(li);

    ol.classList.add("list-unstyled");
    li.classList.add("fs-5", "border-bottom", "py-2", "border-secondary");
    history.appendChild(ol)
  }
}