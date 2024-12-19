let inputBox = document.querySelector("input");
let add = document.querySelector(".add-btn");
let list = document.querySelector(".list-items");
let currentDate = document.querySelector(".date");

// Display current date
const displayDate = () => {
  const date = new Date().toDateString();
  currentDate.textContent = date;
};

// Initialize and Load from LocalStorage
const init = () => {
  displayDate();
  const items = JSON.parse(localStorage.getItem("items")) || [];
  items.forEach((item) => addListItem(item));
};

// Add Task to LocalStorage and DOM
const addTask = (task) => {
  if (!task.trim()) {
    alert("Task cannot be empty!");
    return;
  }
  
  const items = JSON.parse(localStorage.getItem("items")) || [];
  if (items.includes(task)) {
    alert("Task already exists!");
    return;
  }
  
  items.push(task);
  localStorage.setItem("items", JSON.stringify(items));
  addListItem(task); // Add to DOM
};

// Create and Add a List Item
const addListItem = (task) => {
  const li = document.createElement("li");
  
  // Task Display
  const divTag = document.createElement("div");
  divTag.id = "dtag";
  const span = document.createElement("span");
  span.textContent = task;
  divTag.appendChild(span);
  li.appendChild(divTag);
  
  // Buttons
  const actionDiv = document.createElement("div");
  const editBtn = document.createElement("button");
  editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  
  actionDiv.appendChild(editBtn);
  actionDiv.appendChild(deleteBtn);
  li.appendChild(actionDiv);
  list.appendChild(li);
  
  // Event Listeners
  editBtn.addEventListener("click", () => editTask(li, task));
  deleteBtn.addEventListener("click", () => deleteTask(li, task));
};

// Edit Task
const editTask = (li, oldTask) => {
  const inputField = document.createElement("input");
  inputField.value = oldTask;
  const saveBtn = document.createElement("button");
  saveBtn.textContent = "Save";
  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "Cancel";
  
  li.innerHTML = "";
  li.appendChild(inputField);
  li.appendChild(saveBtn);
  li.appendChild(cancelBtn);
  
  saveBtn.addEventListener("click", () => {
    const newTask = inputField.value.trim();
    if (!newTask) {
      alert("Task cannot be empty!");
      return;
    }
    
    const items = JSON.parse(localStorage.getItem("items")) || [];
    const index = items.indexOf(oldTask);
    items[index] = newTask;
    localStorage.setItem("items", JSON.stringify(items));
    
    li.innerHTML = "";
    addListItem(newTask);
  });
  
  cancelBtn.addEventListener("click", () => {
    li.innerHTML = "";
    addListItem(oldTask);
  });
};

// Delete Task
const deleteTask = (li, task) => {
  const items = JSON.parse(localStorage.getItem("items")) || [];
  const updatedItems = items.filter((item) => item !== task);
  localStorage.setItem("items", JSON.stringify(updatedItems));
  li.remove();
};

// Event Listeners
add.addEventListener("click", (e) => {
  e.preventDefault();
  addTask(inputBox.value);
  inputBox.value = ""; // Clear input
});

// Initialize the application
init();
