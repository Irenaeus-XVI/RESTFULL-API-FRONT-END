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


//NOTE - getData from the backend display it .
async function getData(Person) {
  let Api = await fetch(`http://localhost:8000/persons/${Person ? Person : ``}`);
  let response = await Api.json();
  console.log(response.length);
  displayData(response);
}

getData();




//NOTE - Get specific person

searchBtn.addEventListener("click", () => {
  let searchValue = searchInput.value;
  getData(searchValue);
  searchInput.value = "";
});



//NOTE - displayData according to the response array size 
function displayData(response) {
  console.log(response.length);
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
    updateBtn[i].addEventListener("click", (e) => {
      id = response[i].id;
      console.log(id);
    })

  }
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

})


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



function handleInputValue(flag) {
  flag ? nameInput = document.querySelector("#nameInput").value : nameInput = document.querySelector("#nameInput").value = "";
  flag ? ageInput = document.querySelector("#ageInput").value : ageInput = document.querySelector("#ageInput").value = "";
  flag ? genderInput = document.querySelector("#genderInput").value : genderInput = document.querySelector("#genderInput").value = "";
  flag ? emailInput = document.querySelector("#emailInput").value : emailInput = document.querySelector("#emailInput").value = "";




}






