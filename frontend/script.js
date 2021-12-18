function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function openForm1() {
  document.getElementById("myForm1").style.display = "block";
}

function closeForm1() {
  document.getElementById("myForm1").style.display = "none";
}


let allMedicines = [];
let btndone = document.querySelector(".medicine");
// console.log(btndone);
axios.get('/api/user/61bd8801ad9f194cc0e1921c').then(
  (res) => {
    // console.log(res.data);

    allMedicines = res.data.user.medicines;
    // console.log(allMedicines);
    for (let i = 0; i < allMedicines.length; i++) {
      let data = allMedicines[i];
      // console.log(data);
      if (data.alarmTime == undefined) {
        addRow(data);
      }
      else {
        addReminderRow(data);
      }
    }
  }
)

btndone.addEventListener("click", (e) => {
  e.preventDefault();
  let illnessName = document.querySelector(".illness").value;
  let name = document.querySelector(".medName").value;
  let startDate = document.querySelector(".startDate").value;
  let expiry = document.querySelector(".expiry").value;

  if (illnessName == '' || name == '' || startDate == undefined || startDate == '' || expiry == '' || expiry == undefined) {
    alert('please fill all values');
    return;
  }

  let userId = "61bd8801ad9f194cc0e1921c";

  axios.post("/api/medicine", {
    illnessName, name, startDate, expiry, userId
  }).then(
    (res) => {
      console.log(res.data);
      addRow(res.data.medicine);
      // allMedicines = res.data.newUser.medicines;
      // console.log(allMedicines);
    }
  )
});

let addRow = (data) => {
  let table = document.querySelector(".inventory");
  let tr = document.createElement("tr");
  tr.innerHTML = `
            <td>${data.illnessName}</td>
            <td>${data.name}</td>
            <td>${data.startDate}</td>
            <td>${data.expiry}</td>
    `;
  table.appendChild(tr);
}


// btn2 
let medicineAlarmBtn = document.querySelector(".reminder");

medicineAlarmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let illnessName = document.querySelector(".illnessNameReminder").value;
  let name = document.querySelector(".medNameReminder").value;
  let time = Number(document.querySelector(".time").value);
  let am = document.querySelector(".am").checked;

  if (illnessName == '' || name == '' || time == undefined || time == '') {
    alert('please fill all values');
    return;
  }
  // let pm = document.querySelector(".pm").checked;
  if (am == false && time != 12) {
    time += 12;
  } else if (am != false && time == 12) {
    time = 0;
  }

  let userId = "61bd8801ad9f194cc0e1921c";

  let obj = {
    illnessName, name, alarmTime: Number(time), userId
  }

  console.log(obj);

  axios.post("/api/medicine", obj).then(
    (res) => {
      console.log(res.data);
      addReminderRow(res.data.medicine);
      // allMedicines = res.data.newUser.medicines;
      // console.log(allMedicines);
    }
  )
});

let addReminderRow = (data) => {
  let table = document.querySelector(".reminderTable");
  let tr = document.createElement("tr");
  let alarm = Number(data.alarmTime);
  if (alarm == 0) {
    alarm = '12am'
  }
  else if (alarm > 12) {
    alarm = (alarm - 12) + 'pm'
  }
  else if(alarm==12){
    alarm+='pm'
  }
  else {
    alarm += 'am'
  }

  tr.innerHTML = `
          <td>${data.illnessName}</td>
          <td>${data.name}</td>
          <td>${alarm}</td>
          <td>EveryDay</td>
  `;
  table.appendChild(tr);
}