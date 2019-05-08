const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');
const url = require('url');
const mysql = require('mysql');
const { remote } = require('electron');

const { Menu, MenuItem } = remote;
const menu = new Menu();
// let prior = '<img src="../image/crown.svg" alt="Preoritet">'
// let strt = `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir">${prior||none}</div><div class="TaskText" id="taskText">${TaskText}</div><div class="TaskComp" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="TaskDel" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"><div class="From" id="From">From:</div><div class="NameFrom" id="NameFrom">${FromName}</div><div class="ExDate" id="ExDate">ExDate:</div><div class="DataEnd" id="DataEnd">${DataEnd}</div></div></div>`
// let dop = `<div class="DopTask" id="DopTask"><div class="From" id="From">From:</div><div class="NameFrom" id="NameFrom">${FromName}</div><div class="ExDate" id="ExDate">ExDate:</div><div class="DataEnd" id="DataEnd">${DataEnd}</div>`;
let ArrayPriorTask = [];
let ArrayAllTask = [];
let ArrayFromTask = [];
let ArrayMyTask = [];
let ArrayForTask = [];
let Name = [];
let NumberTask = 0;
let AllArrayTask = [];
let IDUser = parseInt(localStorage.getItem('MaxID'));
function NowDate(){
    let date = new Date();
    ArrayMonth = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return `${date.getDate()} ${ArrayMonth[date.getMonth()]} ${date.getFullYear()}`
}
$('.Date').html(NowDate());
function FormatDate(standate) {
    const stardate = `${standate}`;
    let SecondDat;
    const stdat = stardate.match(/\w{2,4}/gi);
    const ArrayMonth = [
      { month: 'Jan', number: '01' },
      { month: 'Feb', number: '02' },
      { month: 'Mar', number: '03' },
      { month: 'Apr', number: '04' },
      { month: 'May', number: '05' },
      { month: 'Jun', number: '06' },
      { month: 'Jul', number: '07' },
      { month: 'Aug', number: '08' },
      { month: 'Sep', number: '09' },
      { month: 'Oct', number: '10' },
      { month: 'Nov', number: '11' },
      { month: 'Dec', number: '12' },
    ];
    for (let i = 0; i < ArrayMonth.length; i += 1) {
      if (stdat[1] === ArrayMonth[i].month) {
        SecondDat = ArrayMonth[i].number;
      }
    }
    return `${stdat[3]}-${SecondDat}-${stdat[2]}`;
}
function getAllTask(callback) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rosq1921',
        database: 'databaseforapptask'
      });
    
      connection.connect(err => {
        if (err) throw err;

      });
      let sql = `SELECT t.TaskID,TaskText ,CientIDIn,CientIDOut, c.FirstName, c.LastName, DataStart,DataEnd, ImportntTask, OtchtTask FROM stacktask s, task t, client c where s.TaskID = t.TaskID and c.IDClient = s.CientIDOut and (CientIDIn = '${localStorage.getItem('MaxID')}' OR CientIDOut = '${localStorage.getItem('MaxID')}')`;
      connection.query(sql, (err, rows, fields) => {
          if (err) throw err;
          callback(rows);
      });
}
function GetTaskFor(callback) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rosq1921',
        database: 'databaseforapptask'
      });
    
      connection.connect(err => {
        if (err) throw err;

      });
      let sql = `SELECT t.TaskID,TaskText ,CientIDIn, c.FirstName, c.LastName, DataStart,DataEnd, ImportntTask, OtchtTask FROM stacktask s, task t, client c where s.TaskID = t.TaskID and c.IDClient = s.CientIDIn and CientIDOut = '${localStorage.getItem('MaxID')}'`;
      connection.query(sql, (err, rows, fields) => {
          if (err) throw err;
          callback(rows);
      });
}
function GetName (callback) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rosq1921',
        database: 'databaseforapptask'
      });
    
      connection.connect(err => {
        if (err) throw err;

      });
      let sql = `SELECT FirstName,LastName from client where IDClient = ${localStorage.getItem('MaxID')}`;
      connection.query(sql, (err, rows, fields) => {
          if (err) throw err;
          callback(rows);
      });
}

function CreateArraysTasks(){
    ArrayAllTask = [];
    ArrayPriorTask = [];
    ArrayMyTask = [];
    ArrayForTask = [];
    ArrayFromTask = [];
    Html = '';
    GetTaskFor( (rows) => {
        rows.forEach((row) => {
            if (row.CientIDIn !== parseInt(localStorage.getItem('MaxID'))) {
                ArrayFromTask.push(row);
            }
            if (row.CientIDIn === parseInt(localStorage.getItem('MaxID'))) {
                ArrayMyTask.push(row);
            }
        });
    })
    getAllTask( (rows) => {
        rows.forEach((row) => {
            ArrayAllTask.push(row);
            if((row.CientIDOut == IDUser) && (row.CientIDIn !== IDUser)) {
                if (row.ImportntTask === 1) {
                    Html += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"><img src="../image/crown.svg" alt="Preoritet"></div><div class="TaskTextFrom" id="taskText" data-title = "${row.TaskText}">${row.TaskText}</div><div class="TaskDelFrom" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
                } else {
                    Html += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"></div><div class="TaskTextFrom" id="taskText" data-title = "${row.TaskText}">${row.TaskText}</div><div class="TaskDelFrom" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
                }
            } else if ((row.CientIDOut === IDUser) && (row.CientIDIn === IDUser)){
                if (row.ImportntTask === 1) {
                    Html += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"><img src="../image/crown.svg" alt="Preoritet"></div><div class="TaskTextFrom" id="taskText" data-title = '${row.TaskText}'>${row.TaskText}</div><div class="TaskCompMy" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
                } else {
                    Html += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"></div><div class="TaskTextFrom" id="taskText" data-title = '${row.TaskText}'>${row.TaskText}</div><div class="TaskCompMy" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
                } 
            }
                else {
                    if (row.ImportntTask === 1) {
                        Html += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"><img src="../image/crown.svg" alt="Preoritet"></div><div class="TaskText" id="taskText" data-title = "${row.TaskText}">${row.TaskText}</div><div class="TaskComp" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="TaskDel" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
                    } else {
                        Html += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"></div><div class="TaskText" id="taskText" data-title = "${row.TaskText}">${row.TaskText}</div><div class="TaskComp" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="TaskDel" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
                    }
                }
            if (row.ImportntTask === 1) {
                ArrayPriorTask.push(row);
            }
            if (row.CientIDOut !== parseInt(localStorage.getItem('MaxID'))) {
                ArrayForTask.push(row);
            }
        });
    })
    GetName( (rows) => {
        rows.forEach((row) => {
            Name.push(row);
        });
        let stroka = Name[0].FirstName+ " "+Name[0].LastName;
        $('#LogName').html(stroka);
    })
    AllArrayTask = [ArrayAllTask,ArrayPriorTask,ArrayMyTask,ArrayForTask,ArrayFromTask];
    setTimeout(function() {
        $('#AllTask').html(Html);
        $(`#TaskManage`).css('backgroundImage', `url('../image/AllTask.jpg')`);
        $('.ChooseMenu div').css('background','');
        $('.ChooseMenu div:first-child').css('background','rgb(107, 107, 107,0.2)');
      }, 70);
}
function CreatePriorTask() {
    let HtmlTask = '';
    ArrayPriorTask.forEach((row) => {
        if((row.CientIDOut == IDUser) && (row.CientIDIn !== IDUser)) {
            HtmlTask += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"><img src="../image/crown.svg" alt="Preoritet"></div><div class="TaskTextFrom" id="taskText" data-title = "${row.TaskText}">${row.TaskText}</div><div class="TaskDelFrom" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
        } else if ((row.CientIDOut === IDUser) && (row.CientIDIn === IDUser)){
            HtmlTask += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"><img src="../image/crown.svg" alt="Preoritet"></div><div class="TaskTextFrom" id="taskText" data-title = '${row.TaskText}'>${row.TaskText}</div><div class="TaskCompMy" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
        } else{
            HtmlTask += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"><img src="../image/crown.svg" alt="Preoritet"></div><div class="TaskText" id="taskText" data-title = "${row.TaskText}">${row.TaskText}</div><div class="TaskComp" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="TaskDel" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
        }
});
$('#AllTask').html(HtmlTask);
}
function CreateMyTask(){
    let HtmlTask = '';
    ArrayMyTask.forEach((row) => {
            if (row.ImportntTask === 1) {
                HtmlTask += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"><img src="../image/crown.svg" alt="Preoritet"></div><div class="TaskTextFrom" id="taskText" data-title = '${row.TaskText}'>${row.TaskText}</div><div class="TaskCompMy" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
            } else {
                HtmlTask += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"></div><div class="TaskTextFrom" id="taskText" data-title = '${row.TaskText}'>${row.TaskText}</div><div class="TaskCompMy" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
            }   
});
$('#AllTask').html(HtmlTask);
}
function CreateTaskFor(){
    let HtmlTask = '';
    ArrayForTask.forEach((row) => {
            if (row.ImportntTask === 1) {
                HtmlTask += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"><img src="../image/crown.svg" alt="Preoritet"></div><div class="TaskText" id="taskText" data-title = '${row.TaskText}'>${row.TaskText}</div><div class="TaskComp" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="TaskDel" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
            } else {
                HtmlTask += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"></div><div class="TaskText" id="taskText" data-title = '${row.TaskText}'>${row.TaskText}</div><div class="TaskComp" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="TaskDel" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
            }   
});
$('#AllTask').html(HtmlTask);
}
function CreateFromTask(){
    let HtmlTask = '';
    ArrayFromTask.forEach((row) => {
        if (row.ImportntTask === 1) {
            HtmlTask += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"><img src="../image/crown.svg" alt="Preoritet"></div><div class="TaskTextFrom" id="taskText" data-title = "${row.TaskText}">${row.TaskText}</div><div class="TaskDelFrom" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
        } else {
            HtmlTask += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"></div><div class="TaskTextFrom" id="taskText" data-title = "${row.TaskText}">${row.TaskText}</div><div class="TaskDelFrom" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
        } 
});
$('#AllTask').html(HtmlTask);
}
CreateArraysTasks();
console.log(AllArrayTask);
// let stroka = Name[1].FirstName+ " "+Name[0].LastName;
// $('#LogName').html = stroka;
$(document).on('click', '.ChooseMenu div', function () {
    let ImgArray = ['../image/AllTask.jpg','../image/Prioritet.jpg','../image/MyTask.jpg','../image/TaskForMe.jpg','../image/TaskFromMe.jpg']
    $(`#TaskManage`).css('backgroundImage', `url(${ImgArray[$(this).index()]})`);
    $('.ChooseMenu div').css('background','');
    $(this).css('background','rgb(107, 107, 107,0.2)');
    NumberTask = $(this).index();
});
$(document).on('click', '#TaskAll', () => {
    CreateArraysTasks();
  });
$(document).on('click', '#PriorTask', function(e) {
    CreatePriorTask();
  });
  $(document).on('click', '#MyTask', function(e) {
    CreateMyTask();
  });
  $(document).on('click', '#TaskFor', function(e) {
    CreateTaskFor();
  });
  $(document).on('click', '#TaskFrom', function(e) {
    CreateFromTask();
  });
let flag = true;
let array = [];
for (let i = 0; i < $('.Task').length; i++) {
    array[i] = true;
}
document.getElementById('ExitButton').addEventListener('click', function () {
    document.location.href = '../html/LoginComp.html'
});
$(document).on('click', '#OpenDop',function () {
    const tov = $(this).parents('#Task').index() + 1;
    if(flag) {
    for (let i = 0; i < $('.Task').length; i++) {
        array[i] = true;
    }
    flag = false;
}
    if (array[tov - 1]) {
        let str = `<div class="From" id="From">From:</div><div class="NameFrom" id="NameFrom">${AllArrayTask[NumberTask][tov - 1].FirstName} ${AllArrayTask[NumberTask][tov - 1].LastName}</div><div class="ExDate" id="ExDate">ExDate:</div><div class="DataEnd" id="DataEnd">${FormatDate(AllArrayTask[NumberTask][tov - 1].DataEnd)}</div>`;
        $(`#Task:nth-child(${tov}) #DopTask`).html(str);
        $(`#Task:nth-child(${tov}) #DopTask`).css({
            "display": "flex",
            "height": "50%",
            "background": "#ffffff",
            "color": "#000",
            "font-size": "1.2em"
        });
        tr = tov;
        array[tov - 1] = false;
    } else {
        $(`#Task:nth-child(${tov}) #DopTask`).html("");
        $(`#Task:nth-child(${tov}) #DopTask`).css({
            "display": "",
            "height": "",
            "background": "",
            "color": "",
            "font-size": ""
        });
        array[tov - 1] = true;
    }
}) 
$(document).on('click', '#TaskDel',function () {
    const ind = $(this).parents('#Task').index();
    console.log(ind);
    if ((NumberTask === 0) || (NumberTask === 1)) {
        if((AllArrayTask[NumberTask][ind].CientIDOut == IDUser) && (AllArrayTask[NumberTask][ind].CientIDIn !== IDUser)) {
            sql = `UPDATE \`stacktask\` SET \`OtchtTask\` = '3' WHERE (\`TaskID\` = '${AllArrayTask[NumberTask][ind].TaskID}') and (\`CientIDIn\` = '${IDUser}') and (\`CientIDOut\` = '${AllArrayTask[NumberTask][ind].CientIDOut}')`;
            console.log(sql);
            // connection.query(sql, (err, rows, fields) => {
            //     if (err) throw err;
            //     callback(rows);
            // });
        } else{
            sql = `DELETE FROM \`stacktask\` WHERE (\`TaskID\` = '${AllArrayTask[NumberTask][ind].TaskID}') and (\`CientIDIn\` = '${IDUser}') and (\`CientIDOut\` = '${AllArrayTask[NumberTask][ind].CientIDOut}')`;
            console.log(sql);
            // connection.query(sql, (err, rows, fields) => {
            //     if (err) throw err;
            //     callback(rows);
            // });
        }
        if (NumberTask === 0) {
            CreateArraysTasks();
        } else {
            CreatePriorTask();
        }
    } else if (NumberTask === 3) {
        sql = `UPDATE \`stacktask\` SET \`OtchtTask\` = '3' WHERE (\`TaskID\` = '${AllArrayTask[NumberTask][ind].TaskID}') and (\`CientIDIn\` = '${IDUser}') and (\`CientIDOut\` = '${AllArrayTask[NumberTask][ind].CientIDOut}')`;
        console.log(sql);
        // connection.query(sql, (err, rows, fields) => {
        //     if (err) throw err;
        //     callback(rows);
        // });
        CreateTaskFor();
    } else if (NumberTask === 4 ){
        sql = `DELETE FROM \`stacktask\` WHERE (\`TaskID\` = '${AllArrayTask[NumberTask][ind].TaskID}') and (\`CientIDIn\` = '${AllArrayTask[NumberTask][ind].CientIDIn}') and (\`CientIDOut\` = '${IDUser}')`;
        console.log(sql);
        // connection.query(sql, (err, rows, fields) => {
        //     if (err) throw err;
        //     callback(rows);
        // });
        CreateFromTask();
    }
});
$(document).on('click', '#TaskComp',function () {
    const ind = $(this).parents('#Task').index();
    console.log(ind);
    if ((NumberTask === 0) || (NumberTask === 1)) {
        if ((AllArrayTask[NumberTask][ind].CientIDOut === IDUser) && (AllArrayTask[NumberTask][ind].CientIDIn === IDUser)) {
            sql = `DELETE FROM \`stacktask\` WHERE (\`TaskID\` = '${AllArrayTask[NumberTask][ind].TaskID}') and (\`CientIDIn\` = '${IDUser}') and (\`CientIDOut\` = '${IDUser}')`;
            console.log(sql);
            // connection.query(sql, (err, rows, fields) => {
            //     if (err) throw err;
            //     callback(rows);
            // });
        } else{
            sql = `DELETE FROM \`stacktask\` WHERE (\`TaskID\` = '${AllArrayTask[NumberTask][ind].TaskID}') and (\`CientIDIn\` = '${IDUser}') and (\`CientIDOut\` = '${AllArrayTask[NumberTask][ind].CientIDOut}')`;
            console.log(sql);
            // connection.query(sql, (err, rows, fields) => {
            //     if (err) throw err;
            //     callback(rows);
            // });
        }
        if (NumberTask === 0) {
            CreateArraysTasks();
        } else {
            CreatePriorTask();
        }
    } else if (NumberTask === 2) {
        sql = `DELETE FROM \`stacktask\` WHERE (\`TaskID\` = '${AllArrayTask[NumberTask][ind].TaskID}') and (\`CientIDIn\` = '${IDUser}') and (\`CientIDOut\` = '${IDUser}')`;
        console.log(sql);
        // connection.query(sql, (err, rows, fields) => {
        //     if (err) throw err;
        //     callback(rows);
        // });
        CreateMyTask();
    } else if (NumberTask === 3) {
        sql = `UPDATE \`stacktask\` SET \`OtchtTask\` = '3' WHERE (\`TaskID\` = '${AllArrayTask[NumberTask][ind].TaskID}') and (\`CientIDIn\` = '${IDUser}') and (\`CientIDOut\` = '${AllArrayTask[NumberTask][ind].CientIDOut}')`;
        console.log(sql);
        // connection.query(sql, (err, rows, fields) => {
        //     if (err) throw err;
        //     callback(rows);
        // });
        CreateTaskFor();
    }
    console.log('Hello');
});
$(document).on('click', '#NewTask',function () {
const mainWindowThird = new BrowserWindow({
    width: 600,
    height: 300,
    // minHeight:300,
    // maxHeight:300,
    // minWidth:600,
    // maxWidth:600,
    // frame: false,
  });
  mainWindowThird.loadURL(
    url.format({ 
      pathname: path.join(__dirname, '../html/added.html'),
      protocol: 'file',
      slashes: true,
    })
  );
});

// document.getElementById('OpenDop').addEventListener('click',function() {
//     console.log(flag);
//     if (flag) {
//         let str = `<div class="From" id="From">From:</div><div class="NameFrom" id="NameFrom">Boris Cvelodubov</div><div class="ExDate" id="ExDate">ExDate:</div><div class="DataEnd" id="DataEnd">20.03.2019</div>`;
//         let doc = document.getElementById('DopTask');
//         doc.innerHTML = str;
//         doc.style.display = 'flex';
//         doc.style.height = '50%';
//         doc.style.backgroundColor = '#ffffff';
//         doc.style.color = '#000';
//         doc.style.fontSize = '1.2em';
//         let task = document.getElementById('Task');
//         flag = false;
//     } else {
//         let doc = document.getElementById('DopTask');
//         doc.innerHTML = '';
//         doc.style.display = '';
//         doc.style.height = '';
//         doc.style.backgroundColor = '';
//         doc.style.color = '';
//         doc.style.fontSize = '';
//         flag = true
//     }
// });
// ArrayAllTask.forEach((row) => {
//     let task = document.createElement('div');
//     task.className = 'Task';
//     task.id = 'Task';
//     document.getElementById('AllTask').appendChild(task);
//     let StanTask = document.createElement('div');
//     StanTask.className = 'StanTask';
//     StanTask.id = 'StanTask';
//     $('Task:last-child').appendChild(StanTask);
//     let DopTask = document.createElement('div');
//     DopTask.className = 'DopTask';
//     DopTask.id = 'DopTask';
//     $('Task:last-child').appendChild(DopTask);
//     if (row.ImportntTask === 1) {
//         let CheckPrir = document.createElement('div');
//         CheckPrir.className = 'CheckPrir';
//         CheckPrir.id = 'CheckPrir'
//         CheckPrir.innerHTML = '<img src="../image/crown.svg" alt="Preoritet">';
//         $('#Task:last-child #DopTask').appendChild(CheckPrir);
//         let TaskText = document.createElement('div');
//         TaskText.className = 'TaskText';
//         TaskText.id = 'TaskText'
//         TaskText.innerHTML = ArrayAllTask.TaskText;
//         $('#Task:last-child #DopTask').appendChild(TaskText);
//         let TaskComp = document.createElement('div');
//         TaskComp.className = 'TaskComp';
//         TaskComp.id = 'TaskComp'
//         TaskComp.innerHTML = '<img src="../image/checked.svg" alt="Compl">';
//         $('#Task:last-child #DopTask').appendChild(TaskComp);
//         let TaskDel = document.createElement('div');
//         TaskDel.className = 'TaskDel';
//         TaskDel.id = 'TaskDel'
//         TaskDel.innerHTML = '<img src="../image/delete.svg" alt="Delete">';
//         $('#Task:last-child #DopTask').appendChild(TaskDel);
//         let OpenDop = document.createElement('div');
//         OpenDop.className = 'OpenDop';
//         OpenDop.id = 'OpenDop'
//         OpenDop.innerHTML = '<img src="../image/menu.svg" alt="Menu">';
//         $('#Task:last-child #DopTask').appendChild(OpenDop);
//     } else {
//         let CheckPrir = document.createElement('div');
//         CheckPrir.className = 'CheckPrir';
//         CheckPrir.id = 'CheckPrir'
//         $('#Task:last-child #DopTask').appendChild(CheckPrir);
//         let TaskText = document.createElement('div');
//         TaskText.className = 'TaskText';
//         TaskText.id = 'TaskText'
//         TaskText.innerHTML = ArrayAllTask.TaskText;
//         $('#Task:last-child #DopTask').appendChild(TaskText);
//         let TaskComp = document.createElement('div');
//         TaskComp.className = 'TaskComp';
//         TaskComp.id = 'TaskComp'
//         TaskComp.innerHTML = '<img src="../image/checked.svg" alt="Compl">';
//         $('#Task:last-child #DopTask').appendChild(TaskComp);
//         let TaskDel = document.createElement('div');
//         TaskDel.className = 'TaskDel';
//         TaskDel.id = 'TaskDel'
//         TaskDel.innerHTML = '<img src="../image/delete.svg" alt="Delete">';
//         $('#Task:last-child #DopTask').appendChild(TaskDel);
//         let OpenDop = document.createElement('div');
//         OpenDop.className = 'OpenDop';
//         OpenDop.id = 'OpenDop'
//         OpenDop.innerHTML = '<img src="../image/menu.svg" alt="Menu">';
//         $('#Task:last-child #DopTask').appendChild(OpenDop);
//     }
// });