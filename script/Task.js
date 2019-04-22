const mysql = require('mysql');
// let prior = '<img src="../image/crown.svg" alt="Preoritet">'
// let strt = `<div class="Task" id="Task"><div class="StanTask" id="StandTask"><div class="CheckPrir" id="CheckPrir">${prior||none}</div><div class="TaskText" id="taskText">${TaskText}</div><div class="TaskComp" id="TaskComp"><img src="../image/checked.svg" alt="Compl"></div><div class="TaskDel" id="TaskDel"><img src="../image/delete.svg" alt="Delete"></div><div class="OpenDop" id="OpenDop"><img src="../image/menu.svg" alt="Menu"></div></div><div class="DopTask" id="DopTask"><div class="From" id="From">From:</div><div class="NameFrom" id="NameFrom">${FromName}</div><div class="ExDate" id="ExDate">ExDate:</div><div class="DataEnd" id="DataEnd">${DataEnd}</div></div></div>`
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
      let Qtxt = 'Select * FROM client';
      connection.query(Qtxt, (err, rows, fields) => {
          if (err) throw err;
          callback(rows);
      });
}
getAllTask( (rows) => {
    rows.forEach((row) => {
        ArrayAllTask.push(row);
    });
})
console.log(ArrayAllTask);
$(document).on('click', '.ChooseMenu div', function () {
    let ImgArray = ['../image/AllTask.jpg','../image/Prioritet.jpg','../image/MyTask.jpg','../image/TaskForMe.jpg','../image/TaskFromMe.jpg']
    $(`#TaskManage`).css('backgroundImage', `url(${ImgArray[$(this).index()]})`);
    $('.ChooseMenu div').css('background','');
    $(this).css('background','rgb(107, 107, 107,0.2)');
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
$(".OpenDop").click(function () {
    const tov = $(this).parents('#Task').index() + 1;
    if (array[tov - 1]) {
        let str = `<div class="From" id="From">From:</div><div class="NameFrom" id="NameFrom">${ArrName[tov - 1].name}</div><div class="ExDate" id="ExDate">ExDate:</div><div class="DataEnd" id="DataEnd">${ArrName[tov - 1].date}</div>`;
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