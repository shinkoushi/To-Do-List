const inputBox = document.getElementById("input-box");
const inputTime = document.getElementById("inputTime");
const inputDay = document.getElementById("day");
const listContainer = document.getElementById("list-container");
const info = document.getElementById("info")

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
    icon.classList.add('icon'); // Add a class to the icon element
    icon.innerHTML = `<i class="fa-solid fa-calendar-days"></i>`;
    span.appendChild(icon)
    
    
    let dayElement = document.createElement("p");
    dayElement.classList.add('day'); // Add a class to the day element
    dayElement.innerHTML = inputDay.value;
    icon.appendChild(dayElement);
    
    let timeElement = document.createElement("hp");
    timeElement.classList.add('time'); // Add a class to the time element
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
