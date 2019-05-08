const remote = require('electron').remote;
const mysql = require('mysql');
 
let ArrayPeople = [];
let ArrayPeopleList = [];
let MaxTaskNumber;
let Checked = false;
let Prior = 2;
function DateFull() {
  let DateNow = new Date();
  let Month =DateNow.getMonth() + 1 + "";
  let Day = DateNow.getDate()+ "";
  let DateChangeMonth = Month.length = 1 ? '0' + Month : Month;
  let DateChangeDay = Day.length = 1 ? '0' + Day : Day;
  return DateNow.getFullYear() + '-' + DateChangeMonth + '-' + DateChangeDay;
}
$('#TaskExDate').val(DateFull());
$('#TaskExDate').attr({"min" : DateFull()});
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
$('#switch').on('click', () => {
  let HTmlAddedPeople = '';
  Checked = $("#switch").prop("checked");
  if(Checked) {
    HTmlAddedPeople = '';
  } else {
    HTmlAddedPeople = '<div class="InputPeople" id="InputPeople"><div class="TextName">Login:</div><div class="PeopleText" id="PeopleText"><input type="text"  id="LoginText"></div><div class="PeopleButton" id="PeopleButton"><img src="../image/add-user.svg" alt="AddedUser"></div><div class="ErroPeopleSearch" id="ErroPeopleSearch"></div></div><div class="ListPeople" id="ListPeople"><div class="Name">People:</div><div class="AllListPeople" id="AllListPeople"></div></div>';
  }
  $('.AddPeople').html(HTmlAddedPeople);
});
GetAllPeople((rows) => {
  rows.forEach(row => {
    ArrayPeople.push(row);
  });
});
  $(document).on('click', '#PeopleButton',function () {
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
  if (!Checked) {
    if (ArrayPeopleList.length != 0) {
      if (($('TextTaskName').val() != "") && ($('TextTaskName').val() != "Empty")) {
        let SQLTask = `INSERT INTO \`task\` (\`TaskText\`) VALUES ('${$('#TextTaskName').val()}')`;
        connection.query(SQLTask, (err, rows, fields) => {
          if (err) throw err;
        });
        setTimeout(function() {
          console.log(ArrayPeopleList);
        ArrayPeopleList.forEach(element => {
          let SQLInsertStack = `INSERT INTO \`databaseforapptask\`.\`stacktask\` (\`CientIDIn\`, \`CientIDOut\`, \`TaskID\`, \`DataStart\`, \`DataEnd\`, \`ImportntTask\`, \`OtchtTask\`) VALUES ('${element.IDClient}', '${localStorage.getItem('MaxID')}', (Select TaskID from task where TaskText = "${$('#TextTaskName').val()}"), '${DateFull()}', '${$('#TaskExDate').val()}', '${Prior}', '1')`;
          connection.query(SQLInsertStack, (err, rows, fields) => {
            if (err) throw err;
          });
          console.log(SQLInsertStack);
        });
        connection.end(function(err) {
          const win = remote.getCurrentWindow();
          win.close();
        });
      },200);
      } else {
        $('TextTaskName').val("Empty");
      }
    } else {
      $("#ErroPeopleSearch").html("Empty Count Login");
    } 
  } else {
    if (($('TextTaskName').val() != "") && ($('TextTaskName').val() != "Empty")) {
      let SQLTask = `INSERT INTO \`task\` (\`TaskText\`) VALUES ('${$('#TextTaskName').val()}')`;
      connection.query(SQLTask, (err, rows, fields) => {
        if (err) throw err;
      });
      console.log(SQLTask);
      let SQLInsertStack = `INSERT INTO \`databaseforapptask\`.\`stacktask\` (\`CientIDIn\`, \`CientIDOut\`, \`TaskID\`, \`DataStart\`, \`DataEnd\`, \`ImportntTask\`, \`OtchtTask\`) VALUES ('${localStorage.getItem('MaxID')}', '${localStorage.getItem('MaxID')}', (Select TaskID from task where TaskText = "${$('#TextTaskName').val()}"), '${DateFull()}', '${$('#TaskExDate').val()}', '${Prior}', '1')`;
      connection.query(SQLInsertStack, (err, rows, fields) => {
        if (err) throw err;
      });
      console.log(SQLInsertStack);
      connection.end(function(err) {
        const win = remote.getCurrentWindow();
        win.close();
      });
    } else {
      $('TextTaskName').val("Empty");
    }
  }
});
$('#switchProprety').on('click', () => {
  Prior = $("#switchProprety").prop("checked") ? 1 : 2;
  console.log(Prior);
});
$('#ButtonCencel').on('click', () => {
    const win = remote.getCurrentWindow();
    win.close();
  });