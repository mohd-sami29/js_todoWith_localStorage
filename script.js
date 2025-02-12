let inputBox = document.querySelector("input");
let add = document.querySelector(".add-btn");
let list = document.querySelector(".list-items");
let currentDate = document.querySelector(".date");

// Display current date
const displayDate = () => {
  let date = new Date();
  date = date.toDateString();
  currentDate.textContent = date;
};

// Load local storage items on page load
window.onload = () => {
  displayDate();
  getFromLocalStorage();
};

let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

// Add task to local storage (Prevents duplicate tasks)
const addToLocalStorage = () => {
  let task = inputBox.value.trim();

  if (!task) {
    alert("Please enter a valid task!");
    return;
  }

  if (itemsArray.includes(task)) {
    alert("This task already exists!");
    return;
  }

  itemsArray.push(task);
  localStorage.setItem("items", JSON.stringify(itemsArray));
  inputBox.value = "";
  getFromLocalStorage();
};

// Fetch tasks from local storage and display them
const getFromLocalStorage = () => {
  list.innerHTML = ""; // Clear list before appending new items
  itemsArray.forEach((item, index) => {
    let li = document.createElement("li");
    li.id = index;

    let divTag = document.createElement("div");
    let span = document.createElement("span");
    span.textContent = item;
    divTag.appendChild(span);
    li.appendChild(divTag);

    let div = document.createElement("div");

    // Create edit button
    let editBtn = document.createElement("button");
    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    editBtn.classList.add("edit-btn");

    // Create delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteBtn.classList.add("delete-btn");

    div.appendChild(editBtn);
    div.appendChild(deleteBtn);
    li.appendChild(div);
    list.appendChild(li);

    // Edit task functionality
    editBtn.addEventListener("click", () => {
      let inputField = document.createElement("input");
      inputField.type = "text";
      inputField.value = span.textContent;
      li.innerHTML = "";
      li.appendChild(inputField);

      let saveBtn = document.createElement("button");
      saveBtn.textContent = "Save";
      saveBtn.classList.add("save-btn");

      let cancelBtn = document.createElement("button");
      cancelBtn.textContent = "Cancel";
      cancelBtn.classList.add("cancel-btn");

      li.appendChild(saveBtn);
      li.appendChild(cancelBtn);

      // Save edited task
      saveBtn.addEventListener("click", () => {
        let newValue = inputField.value.trim();

        if (!newValue) {
          alert("Task cannot be empty!");
          return;
        }

        if (itemsArray.includes(newValue)) {
          alert("This task already exists!");
          return;
        }

        itemsArray[index] = newValue;
        localStorage.setItem("items", JSON.stringify(itemsArray));
        getFromLocalStorage();
      });

      // Cancel editing
      cancelBtn.addEventListener("click", () => {
        getFromLocalStorage();
      });
    });

    // Delete task functionality
    deleteBtn.addEventListener("click", () => {
      itemsArray.splice(index, 1);
      localStorage.setItem("items", JSON.stringify(itemsArray));
      getFromLocalStorage();
    });
  });
};

// Add event listener to the Add Task button
add.addEventListener("click", (e) => {
  e.preventDefault();
  addToLocalStorage();
});
