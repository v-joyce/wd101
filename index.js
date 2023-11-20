let inputForm = document.getElementById("user-form");
const enteredDOB = document.getElementById("dob");
const dateToday = new Date().toISOString().slice(4, 10);
const current_year = new Date().getFullYear();
enteredDOB.min = `${current_year - 55}${dateToday}`;
enteredDOB.max = `${current_year - 18}${dateToday}`;
const getEntries = () => {
  let inputData = localStorage.getItem("user-entries");
  if (inputData) {
    inputData = JSON.parse(inputData);
  } else {
    inputData = [];
  }
  return inputData;
};
let inputEntries = getEntries();
const displayEntries = () => {
  const inputData = getEntries();
  const tableEntries = inputData
    .map((entry) => {
      const nameCell = `<td>${entry.name}</td>`;
      const emailCell = `<td>${entry.email}</td>`;
      const passwordCell = `<td>${entry.password}</td>`;
      const dobCell = `<td>${entry.dob}</td>`;
      const acceptTermsCell = `<td>${entry.acceptTermsAndConditions}</td>`;
      const row = `<tr >${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${acceptTermsCell}</tr>`;
      return row;
    })
    .join("\n");
  const table = `<table border = 10px><tr>
    <th>Name</th>
    <th>Email Address</th>
    <th>Password</th>
    <th>Dob</th>
    <th>Accepted terms?</th>
    </tr>${tableEntries} </table>`;
  /*const table = `<table>${tableEntries}</table>`;*/
  let details = document.getElementById("user-entries");
  details.innerHTML = table;
};
const saveInputForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTermsAndConditions = document.getElementById("tick_mark").checked;
  const inputData = {
    name,
    email,
    password,
    dob,
    acceptTermsAndConditions,
  };
  inputEntries.push(inputData);
  localStorage.setItem("user-entries", JSON.stringify(inputEntries));
  displayEntries();
};
inputForm.addEventListener("submit", saveInputForm);
displayEntries();
