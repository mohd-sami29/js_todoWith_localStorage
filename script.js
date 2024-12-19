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

// On window reload or refresh getFromLocalStorage and displayDate function called

window.onload = () => {
  getFromLocalStorage();

  displayDate();
};

// Add event listener on add task button

add.addEventListener("click", (e) => {
  e.preventDefault();

  addToLocalStorage(inputBox);

  getFromLocalStorage();
});

let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];

// Add list items to localstorage

const addToLocalStorage = (inputBox) => {
  itemsArray.push(inputBox.value);

  localStorage.setItem("items", JSON.stringify(itemsArray));

  console.log(itemsArray);
};

// Get list items from localstorage

const getFromLocalStorage = () => {
  itemsArray.forEach((item, index) => {
    let li = document.createElement("li");

    li.id = index;

    let divTag = document.createElement("div");

    let span = document.createElement("span");

    span.textContent = item;

    divTag.appendChild(span);

    li.appendChild(divTag);

    let div = document.createElement("div");

    let editBtn = document.createElement("button");

    editBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';

    div.appendChild(editBtn);

    let deleteBtn = document.createElement("button");

    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    div.appendChild(deleteBtn);

    li.appendChild(div);

    list.appendChild(li);

    inputBox.value = "";

    let inputField = document.createElement("input");

    let saveBtn = document.createElement("button");

    saveBtn.textContent = "Save";

    let cancelBtn = document.createElement("button");

    cancelBtn.textContent = "Cancel";

    // Add event listener on edit button

    editBtn.addEventListener("click", (e) => {
      e.preventDefault();

      let temp = span.textContent;

      li.textContent = "";

      li.appendChild(inputField);

      inputField.value = temp;

      inputField.focus();

      li.appendChild(saveBtn);

      li.appendChild(cancelBtn);
    });

    // Add event listner on delete button

    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      deleteItem(index);
    });

    let deleteItem = (id) => {
      let result = itemsArray.filter((index) => {
       return index == id
      });
      console.log("items",itemsArray);
      console.log("result",result);
      console.log("id",id);
      console.log("index",index);

    };

    // Add event listener on save button

    saveBtn.addEventListener("click", (e) => {
      e.preventDefault();

      li.textContent = "";

      span.textContent = inputField.value;

      li.appendChild(span);

      div.appendChild(editBtn);

      div.appendChild(deleteBtn);

      li.appendChild(div);
    });

    // Add event listener on cancel button

    cancelBtn.addEventListener("click", (e) => {
      e.preventDefault();

      let temp = inputField.value;

      li.textContent = "";

      span.textContent = temp;

      li.appendChild(span);

      div.appendChild(editBtn);

      div.appendChild(deleteBtn);

      li.appendChild(div);
    });
  });
};
