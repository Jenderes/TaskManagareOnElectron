const mysql = require('mysql');
// let prior = '<img src="../image/crown.svg" alt="Preoritet">'
// let strt = `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir">${prior||none}</div><div class="TaskText" id="taskText">${TaskText}</div><div class="TaskComp" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="TaskDel" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"><div class="From" id="From">From:</div><div class="NameFrom" id="NameFrom">${FromName}</div><div class="ExDate" id="ExDate">ExDate:</div><div class="DataEnd" id="DataEnd">${DataEnd}</div></div></div>`
// let dop = `<div class="DopTask" id="DopTask"><div class="From" id="From">From:</div><div class="NameFrom" id="NameFrom">${FromName}</div><div class="ExDate" id="ExDate">ExDate:</div><div class="DataEnd" id="DataEnd">${DataEnd}</div>`;
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
let ArrayAllTask = [];
function getAllTask(callback) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rosq1921',
        database: 'databasefortask'
      });
    
      connection.connect(err => {
        if (err) throw err;

      });
      let sql = `SELECT t.IDTask,TaskText ,CientIDOut, c.FirstName, c.LastName, DataStart,DataEnd, ImportntTask, OtchtTask FROM stacktask s, task t, client c where s.TaskID = t.IDTask and c.IDClient = s.CientIDOut and (CientIDIn = '${localStorage.getItem('MaxID')}' OR CientIDOut = '${localStorage.getItem('MaxID')}')`;
      connection.query(sql, (err, rows, fields) => {
          if (err) throw err;
          callback(rows);
      });
}
getAllTask( (rows) => {
    rows.forEach((row) => {
        ArrayAllTask.push(row);
    });
})
let ArrayPriorTask = [];
function GetTaskFor(callback) {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rosq1921',
        database: 'databasefortask'
      });
    
      connection.connect(err => {
        if (err) throw err;

      });
      let sql = `SELECT t.IDTask,TaskText ,CientIDIn, c.FirstName, c.LastName, DataStart,DataEnd, ImportntTask, OtchtTask FROM stacktask s, task t, client c where s.TaskID = t.IDTask and c.IDClient = s.CientIDIn and CientIDOut = '${localStorage.getItem('MaxID')}'`;
      connection.query(sql, (err, rows, fields) => {
          if (err) throw err;
          callback(rows);
      });
}
let ArrayFromTask = [];
GetTaskFor( (rows) => {
    rows.forEach((row) => {
        ArrayFromTask.push(row);
    });
})
console.log(ArrayAllTask);
console.log(ArrayFromTask);
$(document).on('click', '.ChooseMenu div', function () {
    let ImgArray = ['../image/AllTask.jpg','../image/Prioritet.jpg','../image/MyTask.jpg','../image/TaskForMe.jpg','../image/TaskFromMe.jpg']
    $(`#TaskManage`).css('backgroundImage', `url(${ImgArray[$(this).index()]})`);
    $('.ChooseMenu div').css('background','');
    $(this).css('background','rgb(107, 107, 107,0.2)');
});
$(document).on('click', '#TaskAll', () => {
    let HtmlTask = '';
    ArrayAllTask.forEach((row) => {
    if (row.ImportntTask === 1) {
        HtmlTask += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"><img src="../image/crown.svg" alt="Preoritet"></div><div class="TaskText" id="taskText">${row.TaskText}</div><div class="TaskComp" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="TaskDel" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
    } else {
        HtmlTask += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"></div><div class="TaskText" id="taskText">${row.TaskText}</div><div class="TaskComp" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="TaskDel" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
    }
});
$('#AllTask').html(HtmlTask);
  });
$(document).on('click', '#PriorTask', function(e) {
    let HtmlTask = '';
    ArrayAllTask.forEach((row) => {
    if (row.ImportntTask === 1) {
        HtmlTask += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"><img src="../image/crown.svg" alt="Preoritet"></div><div class="TaskText" id="taskText">${row.TaskText}</div><div class="TaskComp" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="TaskDel" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
    }
});
$('#AllTask').html(HtmlTask);
  });
  $(document).on('click', '#MyTask', function(e) {
    let HtmlTask = '';
    ArrayFromTask.forEach((row) => {
        if (row.CientIDIn === parseInt(localStorage.getItem('MaxID'))) {
            if (row.ImportntTask === 1) {
                HtmlTask += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"><img src="../image/crown.svg" alt="Preoritet"></div><div class="TaskText" id="taskText">${row.TaskText}</div><div class="TaskComp" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="TaskDel" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
            } else {
                HtmlTask += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"></div><div class="TaskText" id="taskText">${row.TaskText}</div><div class="TaskComp" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="TaskDel" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
            }   
        }
});
$('#AllTask').html(HtmlTask);
  });
  $(document).on('click', '#TaskFor', function(e) {
    let HtmlTask = '';
    ArrayAllTask.forEach((row) => {
        // console.log(row.CientIDOut);
        // console.log(parseInt(localStorage.getItem('MaxID')));
        // console.log('--------');
        if (row.CientIDOut !== parseInt(localStorage.getItem('MaxID'))) {
            if (row.ImportntTask === 1) {
                HtmlTask += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"><img src="../image/crown.svg" alt="Preoritet"></div><div class="TaskText" id="taskText">${row.TaskText}</div><div class="TaskComp" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="TaskDel" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
            } else {
                HtmlTask += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"></div><div class="TaskText" id="taskText">${row.TaskText}</div><div class="TaskComp" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="TaskDel" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
            }   
        }
});
$('#AllTask').html(HtmlTask);
  });
  $(document).on('click', '#TaskFrom', function(e) {
    let HtmlTask = '';
    ArrayFromTask.forEach((row) => {
        if(row.CientIDIn !== parseInt(localStorage.getItem('MaxID'))) {
            if (row.ImportntTask === 1) {
                HtmlTask += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"><img src="../image/crown.svg" alt="Preoritet"></div><div class="TaskText" id="taskText">${row.TaskText}</div><div class="TaskComp" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="TaskDel" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
            } else {
                HtmlTask += `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir"></div><div class="TaskText" id="taskText">${row.TaskText}</div><div class="TaskComp" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="TaskDel" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"></div></div>`;
            }   
        }
});
$('#AllTask').html(HtmlTask);
  });
let flag = true;
let array = [];
let ArrName = [{name:'Boris Cvelodubov', date:'11.03.2019'},{name:'Din Potemkin', date:'20.04.2019'},{name:'Sergey Gaag', date:'15.05.2019'}];
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
        let str = `<div class="From" id="From">From:</div><div class="NameFrom" id="NameFrom">${ArrayAllTask[tov - 1].FirstName} ${ArrayAllTask[tov - 1].LastName}</div><div class="ExDate" id="ExDate">ExDate:</div><div class="DataEnd" id="DataEnd">${ArrayAllTask[tov - 1].date}</div>`;
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