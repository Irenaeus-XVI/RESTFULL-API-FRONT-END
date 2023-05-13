//NOTE - Defines that JavaScript code should be executed in "strict mode".
"use strict";


//NOTE - code imports:
let table = document.querySelector("#table_row");
let updateBtn;
let deleteBtn;
let nameInput;
let ageInput;
let genderInput;
let emailInput;
let saveChanges = document.querySelector("#saveChanges");
let id;
let searchInput = document.querySelector("#searchInput");
let searchBtn = document.querySelector("#searchBtn");
let addBtn = document.querySelector("#addBtn");
let addPersonBtn = document.querySelector("#addPersonBtn");
let addPersonForm = document.querySelector("#addPersonForm");
let nameAddInput = document.querySelector("#nameAddInput");
let ageAddInput = document.querySelector("#ageAddInput");
let genderAddInput = document.querySelector("#genderAddInput");
let emailAddInput = document.querySelector("#emailAddInput");
let closeFormBtn = document.querySelector("#closeFormBtn");
let errorBadge = document.querySelector("#errorBadge");
//NOTE - getData from the backend display it .
async function getData(Person) {
  let Api = await fetch(`http://localhost:8000/persons/${Person ? Person : ``}`);
  let response = await Api.json();
  console.log(response.length);
  displayData(response);
  console.log("saker");
}

getData();



//NOTE - Update specific person by id 
async function updatePerson(updatedPersonObject, id) {
  console.log("hello from updatePerson");
  let updatedApi = await fetch(`http://localhost:8000/persons/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    }, body: JSON.stringify(updatedPersonObject)
  });
  let response = await updatedApi.json();
  console.log(response);
  getData()
}


//NOTE - Add Person
async function addPerson(addedPerson) {
  let Api = await fetch(`http://localhost:8000/persons`, {
    method: "POST",
    headers: {
      "content-type": "application/json"
    }, body: JSON.stringify(addedPerson)
  })
  getData();
}


//NOTE - displayData according to the response array size 
function displayData(response) {
  console.log(response.length, "asd");
  //NOTE - Handle empty response
  if (response.length == 27) {
    table.innerHTML = response;
    return;
  }

  let Persons = `
    <thead class="table-light">
    <tr >
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col">Gender</th>
      <th scope="col">Email</th>
      <th scope="col">Id</th>
    
      <th scope="col">Action</th>


    </tr>
  </thead>`;


  for (let i = 0; i < response.length; i++) {
    Persons += `
       <tbody>
       <tr>
           <th scope="row">${i}</th>
           <td>${response[i].name}</td>
           <td>${response[i].age}</td>
           <td>${response[i].gender}</td>
           <td>${response[i].email}</td>
           <td>${response[i].id}</td>
           <td class="d-flex justify-content-end">
           <button class="btn btn-primary mx-2" id="updateBtn" data-bs-toggle="modal"
           data-bs-target="#exampleModal" data-id-person=${response[i].id}>UPDATE</button>
           <button class="btn btn-danger" id="deleteBtn">DELETE</button></td>
         </tr> 
       </tbody>
     `

    table.innerHTML = Persons;

    updateBtn = document.querySelectorAll("#updateBtn")

    deleteBtn = document.querySelector("#deleteBtn");



  }


  for (let i = 0; i < updateBtn.length; i++) {
    updateBtn[i].addEventListener("click", () => {
      id = response[i].id;
      console.log(id);
    })

  }
}


//NOTE - handleInputValue 
function handleInputValue(flag) {
  flag ? nameInput = document.querySelector("#nameInput").value : nameInput = document.querySelector("#nameInput").value = "";
  flag ? ageInput = document.querySelector("#ageInput").value : ageInput = document.querySelector("#ageInput").value = "";
  flag ? genderInput = document.querySelector("#genderInput").value : genderInput = document.querySelector("#genderInput").value = "";
  flag ? emailInput = document.querySelector("#emailInput").value : emailInput = document.querySelector("#emailInput").value = "";
}

//NOTE - handleAddPersonValue 
function handleAddPersonValue(flag) {
  flag ? nameAddInput = document.querySelector("#nameAddInput").value : nameAddInput = document.querySelector("#nameAddInput").value = "";
  flag ? ageAddInput = document.querySelector("#ageAddInput").value : ageAddInput = document.querySelector("#ageAddInput").value = "";
  flag ? genderAddInput = document.querySelector("#genderAddInput").value : genderAddInput = document.querySelector("#genderAddInput").value = "";
  flag ? emailAddInput = document.querySelector("#emailAddInput").value : emailAddInput = document.querySelector("#emailAddInput").value = "";
}

//NOTE - toggleDisplay
function toggleDisplay() {
  table.classList.remove("d-none");
  addPersonForm.classList.replace("d-block", "d-none");
}



//NOTE - Handle modal saveChanges Button
saveChanges.addEventListener("click", () => {
  console.log("hello from click ", id);

  handleInputValue(true);

  let updatedPersonObject = {
    "name": nameInput,
    "age": ageInput,
    "gender": genderInput,
    "email": emailInput
  }
  updatePerson(updatedPersonObject, id);
  console.log(updatedPersonObject);
  handleInputValue(false);

});

//NOTE - Get specific person
searchBtn.addEventListener("click", () => {
  let searchValue = searchInput.value;
  getData(searchValue);
  searchInput.value = "";
});


//NOTE - addButton 
addBtn.addEventListener("click", () => {
  table.classList.add("d-none");
  addPersonForm.classList.replace("d-none", "d-block");

});

//NOTE - addPersonBtn 
addPersonBtn.addEventListener("click", () => {
  if (nameAddInput.value != "" && ageAddInput.value != "" && genderAddInput.value != "" && emailAddInput.value != "") {
    let nameAddInputValue = nameAddInput.value;
    let ageAddInputValue = ageAddInput.value;
    let genderAddInputValue = genderAddInput.value;
    let emailAddInputValue = emailAddInput.value;
    console.log(nameAddInputValue, ageAddInputValue, genderAddInputValue, emailAddInputValue);
    let addedPersonObject = {
      "name": nameAddInputValue,
      "age": ageAddInputValue,
      "gender": genderAddInputValue,
      "email": emailAddInputValue
    }
    addPerson(addedPersonObject);
    handleInputValue(false);
    toggleDisplay();
    handleAddPersonValue(false);
    errorBadge.classList.replace("d-block", "d-none");

  }
  else {
    errorBadge.classList.replace("d-none", "d-block");
  }

});


//NOTE - closeFormBtn
closeFormBtn.addEventListener("click", () => {
  toggleDisplay();
})



