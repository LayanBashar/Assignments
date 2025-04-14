//tab switch
function openPage(pageName, elmnt, color) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "#9c9c9ccb";
  }
  document.getElementById(pageName).style.display = "block";
  elmnt.style.backgroundColor = color;
}

//form

const form = document.querySelector("form");
const users = [];

const showError = (field, errorText) => {
  field.classList.add("error");
  const errorElement = document.createElement("small");
  errorElement.classList.add("error-text");
  errorElement.innerText = errorText;
  field.closest(".form-group").appendChild(errorElement);
};

const handleFormData = (e) => {
  e.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const addressInput = document.getElementById("address");
  const genderInput = document.getElementById("gender");
  const phonenumberInput = document.getElementById("phonenumber");

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const phonenumber = phonenumberInput.value.trim();
  const address = addressInput.value;
  const gender = genderInput.value;
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  document
    .querySelectorAll(".form-group .error")
    .forEach((field) => field.classList.remove("error"));
  document
    .querySelectorAll(".error-text")
    .forEach((errorText) => errorText.remove());

  // validation
  if (name === "") {
    showError(nameInput, "Enter your name");
  } else if (/\d/.test(name)) {
    showError(nameInput, "Enter only characters");
  }

  if (!emailPattern.test(email)) {
    showError(emailInput, "Enter a valid email address");
  }

  if (phonenumber === "") {
    showError(phonenumberInput, "Enter a number");
  } else if (!/^\d+$/.test(phonenumber)) {
    showError(phonenumberInput, "Enter a valid number");
  } else if (phonenumber.length !== 10) {
    showError(phonenumberInput, "Enter 10 digit number");
  }

  if (address === "") {
    showError(addressInput, "Enter your address");
  }

  if (gender === "") {
    showError(genderInput, "Select your gender");
  }

  const errorInputs = document.querySelectorAll(".form-group .error");
  if (errorInputs.length > 0) return;

  // إذا ما في أخطاء، أضف المستخدم
  class UserData {
    constructor(name, email, phonenumber, address, gender) {
      this.name = name;
      this.email = email;
      this.phonenumber = phonenumber;
      this.address = address;
      this.gender = gender;
    }
  }

  const newUser = new UserData(name, email, phonenumber, address, gender);
  users.push(newUser);

  addToTable(newUser);
  addCard(newUser);
  form.reset();

  alert("submitted successfully");
};

form.addEventListener("submit", handleFormData);

function addToTable(user) {
  var tableOfUsers = document.getElementById("tableOfUsers");
  var row = tableOfUsers.insertRow();
  let userarray = Object.values(user);

  for (let i = 0; i < userarray.length; i++) {
    var cell = row.insertCell(i);
    cell.innerHTML = userarray[i];
  }
}

function addCard(user) {
  const cardSection = document.getElementById("cardSection");

  const code = `
    <div class="col-sm-12">
      <div class="card text-center m-5">
        <h5 class="card-header">${user.name}</h5>
        <div class="card-body">
          <h5 class="card-title">Email</h5>
          <p class="card-text">${user.email}</p>
          <hr />
          <h5 class="card-title">Phone Number</h5>
          <p class="card-text">${user.phonenumber}</p>
          <hr />
          <h5 class="card-title">address</h5>
          <p class="card-text">${user.address}</p>
          <hr />
          <h5 class="card-title">Gender</h5>
          <p class="card-text">${user.gender}</p>
        </div>
      </div>
    </div>`;
  cardSection.innerHTML += code;
}

const table = document.getElementById("table");
const card = document.getElementById("card");

//toggle button
var display = 0;
const togglebtn = document.getElementById("toggleBtn");
card.style.display = "none";
function hideShow() {
  if (display == 1) {
    table.style.display = "block";
    card.style.display = "none";
    togglebtn.textContent = "Card View";
    display = 0;
  } else {
    table.style.display = "none";
    card.style.display = "block";
    togglebtn.textContent = "Table View";

    display = 1;
  }
}

document.getElementById("defaultOpen").click();
