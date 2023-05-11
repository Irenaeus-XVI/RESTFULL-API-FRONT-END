//NOTE - Defines that JavaScript code should be executed in "strict mode".
"use strict";


//NOTE - code imports:
let table = document.querySelector("#table_row");


//NOTE - getData from the backend display it .
async function getData() {
    let Api = await fetch("http://localhost:8000/persons/");
    let response = await Api.json();
    console.log(response);
    displayData(response);
}

getData();


//NOTE - displayData according to the response array size 
function displayData(response) {
    let Persons = `
    <thead class="table-light">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Age</th>
      <th scope="col">Gender</th>
      <th scope="col">Email</th>
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
         </tr> 
       </tbody>
     `
        table.innerHTML = Persons;
    }
}


