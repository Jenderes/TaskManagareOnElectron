const mysql = require('mysql');
var GetArrayID = [];
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rosq1921',
  database: 'databaseforapptask',
});
connection.connect((err) => {
  if (err) {
    return console.log(err.stack);
  }
});
function Conseled(callback) {
  let sql = 'SELECT IDClient,Login FROM client';
  connection.query(sql, (err, rows) => {
    callback(rows);
  });
}
function refresh () {
Conseled((rows) => {
  rows.forEach(element => {
    GetArrayID.push(element);
  });
});
}
refresh();
document.getElementById('AuntifReg').addEventListener('click', function () {
  console.log(GetArrayID);
  let Login = document.getElementById('login');
  let FirstName = document.getElementById('first_name');
  let LastName = document.getElementById('last_name');
  let Email = document.getElementById('email');
  let Password = document.getElementById('password');
  if ((Login.value.length !== 0) && (FirstName.value.length !== 0) && (LastName.value.length !== 0) && (Email.value.length !== 0) && (Password.value.length !== 0)) {
    console.log(Login.value);
    let check = false;
    console.log(GetArrayID.length);
    for (let i = 0; i < GetArrayID.length; i++) {
      if (GetArrayID[i].Login === Login.value) {
        check = true;
      }
    }
    console.log(check);
    if (!check) {
      console.log(GetArrayID.length);
      let set = parseInt(GetArrayID[GetArrayID.length - 1].IDClient) + 1;
      localStorage.setItem('MaxID', set);
      sql = `INSERT INTO \`client\` (\`Login\`, \`FirstName\`, \`LastName\`, \`Email\`, \`Password\`) VALUES ('${Login.value}', '${FirstName.value}', '${LastName.value}', '${Email.value}', '${Password.value}')`;
      console.log(sql);
      connection.query(sql, (err, rows) => {
        if (err) throw err;
        connection.end(() => {
          console.log('Connection succesfully closed');
        });
      });
        document.getElementById('ErrorAut').textContent = '';
        document.location.href = '../html/index.html';
    } else {
      document.getElementById('ErrorAut').textContent = 'Login is Already Exists';
    }
  } else {
    document.getElementById('ErrorAut').textContent = 'Some fields are empety';
  }
});