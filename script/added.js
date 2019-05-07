const remote = require('electron').remote;
const mysql = require('mysql');
 
let ArrayPeople = [];
let ArrayPeopleList = [];
let MaxTaskNumber;
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rosq1921',
  database: 'databaseforapptask'
});
connection.connect((err) => {
  if (err) {
    return console.log(err.stack);
  }
});
function GetAllPeople(callback) {
    let sql = `SELECT IDClient,Login,FirstName,LastName FROM client where IDClient != ${localStorage.getItem('MaxID')}`;
    connection.query(sql, (err, rows, fields) => {
        if (err) throw err;
        callback(rows);
    });
}
// function GetMaxNumber(callback) {
//   let sql = `SELECT Max(TaskID) As MaxTask from task;`;
//   connection.query(sql, (err, rows, fields) => {
//       if (err) throw err;
//       callback(rows);
//   });
// }
// GetMaxNumber((rows) => {
//   rows[0].MaxTask;
// });
GetAllPeople((rows) => {
  rows.forEach(row => {
    ArrayPeople.push(row);
  });
});
$('#PeopleButton').on('click', () => {
  console.log(ArrayPeople);
  let HtmlListPeople = '';
  let ArraySearch = ArrayPeople.filter((row) => {
    return row.Login == $('#LoginText').val();
  });
  if (ArraySearch.length == 0) {
    $("#ErroPeopleSearch").html("Incorrectly Login");
  } else {
    ArrayPeopleList.push(ArraySearch[0]);
    $("#ErroPeopleSearch").html("");
    $('#LoginText').val("");
  }
  console.log(ArrayPeopleList);
  ArrayPeopleList.forEach(row => {
    HtmlListPeople += `<div class="People" id="People"><div class="PeopleName" id="PeopleName">${row.FirstName} ${row.LastName}</div><div class="DeletePeople" id="DeletePeople"><img src="../image/x-button.svg" alt="delete"></div></div>`;
  });
  $('#AllListPeople').html(HtmlListPeople);
});
$(document).on('click', '#DeletePeople',function () {
  const ind = $(this).parents('#People').index();
  let HtmlListPeople = '';
  ArrayPeopleList.splice(ind,1);
  ArrayPeopleList.forEach(row => {
    HtmlListPeople += `<div class="People" id="People"><div class="PeopleName" id="PeopleName">${row.FirstName} ${row.LastName}</div><div class="DeletePeople" id="DeletePeople"><img src="../image/x-button.svg" alt="delete"></div></div>`;
  });
  $('#AllListPeople').html(HtmlListPeople);
});
$('#ButtonAcept').on('click', () => {
  if (ArrayPeopleList.length != 0) {
    if ($('TextTaskName').val() != "") {
      let SQLInsertStack = 'SELECT CientIDIn,CientIDOut from stacktask where TaskID = (Select TaskID from task where TaskText = "Hi Amy! Your mum sent me a text.")';
      let SQLTask = '';
      
    } else {
      $('TextTaskName').val("Empty");
    }
  } else {
    $("#ErroPeopleSearch").html("Empty Count Login");
  }
});
$('#ButtonCencel').on('click', () => {
    const win = remote.getCurrentWindow();
    win.close();
  });