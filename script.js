const inputBox = document.getElementById("input-box");
const inputTime = document.getElementById("inputTime");
const inputDay = document.getElementById("day");
const listContainer = document.getElementById("list-container");
const info = document.getElementById("info")
const countElement = document.getElementById("keterangan"); // added this line to select the countElement


function countLetters(str) {
  return str.trim().replace(/[^a-zA-Z\s]/g, '').replace(/\s+/g, '').length;
}

function AddTask() {
  if (inputBox.value == "" ) {
    Swal.fire({
      icon: "error",
      text: "kamu belum menulis tugas mu !",
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

    if (countLetters(li.innerHTML) > 35 && window.innerWidth <= 480) {
      icon.style.top = "5px";
  }else if(countLetters(li.innerHTML) > 60 && window.innerWidth <= 480) {
    icon.style.top = "12px";


   } else if (countLetters(li.innerHTML) > 30 && window.innerWidth <= 400) {
      icon.style.top = "8px";
  } else if (countLetters(li.innerHTML) > 55 && window.innerWidth <= 400) {
    icon.style.top = "15px";
}
  else if (countLetters(li.innerHTML) > 25 && window.innerWidth <= 380) {
      icon.style.top = "8px";
  }else if (countLetters(li.innerHTML) > 45 && window.innerWidth <= 380) {
    icon.style.top = "15px";
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

    showUncheckedLiCount(); // added this line to update the countElement after adding a new task
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
      showUncheckedLiCount();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
      showUncheckedLiCount();
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
  showUncheckedLiCount();
}
showTask();

function countUncheckedLi() {
  const liElements = listContainer.getElementsByTagName("li");
  let count = 0;
  for (let i = 0; i < liElements.length; i++) {
    if (!liElements[i].classList.contains("checked")) {
      count++;
    }
  }
  return count;
}

function showUncheckedLiCount() {
  const uncheckedCount = countUncheckedLi();
  countElement.innerHTML = `Kamu memiliki <span id="jumlah">${uncheckedCount} tugas  </span>  yang belum diselesaikan`;
}
