const inputBox = document.getElementById("input-box");
const inputTime = document.getElementById("inputTime");
const inputDay = document.getElementById("day");
const listContainer = document.getElementById("list-container");
const info = document.getElementById("info")


function countWords(str) {
  return str.trim().split(/\s+/).length;
}

function AddTask() {
  if (inputBox.value == "" ) {
    Swal.fire({
      icon: "error",
      text: "kamu belum menulis pekerjaan mu !",
  });
  
  }else if(inputTime.value == ""){
    Swal.fire({
      icon: "error",
      text: "kamu belum memilih jam !",
  });
  }else if( inputDay.value == ""){
    Swal.fire({
      icon: "error",
      text: "kamu belum memilih hari !",
  });
  } else{
    info.style.display = "none"

    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);


    let icon = document.createElement("i");
    icon.classList.add('icon'); 
    icon.innerHTML = `<i class="fa-solid fa-calendar-days"></i>`;
    
    if (countWords(li.innerHTML) > 8 && window.innerWidth <= 600) {
      icon.style.top = "10px";
     
    } else if (countWords(li.innerHTML) > 4 && window.innerWidth <= 400) {
      icon.style.top = "8px";
    }

    span.appendChild(icon);


    let dayElement = document.createElement("p");
    dayElement.classList.add('day'); 
    dayElement.innerHTML = inputDay.value;
    icon.appendChild(dayElement);
    
    let timeElement = document.createElement("hp");
    timeElement.classList.add('time'); 
    timeElement.innerHTML = inputTime.value;
    dayElement.appendChild(timeElement)
 
  }
  inputBox.value = "";
  inputTime.value = "";
  inputDay.value = "";

  info.style.display = "none"
  saveData();
  
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      e.target.classList.toggle("coret");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
  if (listContainer.getElementsByTagName("li").length > 0) {
    info.style.display = "none";
  }
}
showTask();
