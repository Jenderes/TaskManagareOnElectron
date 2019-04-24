const mysql = require('mysql');

document.getElementById('Auntif').addEventListener('click',function () {
  let password = document.getElementById('password');
  let login = document.getElementById('login');
  document.getElementById('ErrorAut').textContent = '';
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
  let sql = `SELECT * FROM client where Login = "${login.value}"`
  connection.query(sql,(err,rows,fields) => {
      if (err) throw err;
      console.log('1 record inserted');
      if (rows.length !== 0) {
          console.log(rows); 
          sumt = rows[0].Password;
          if (rows[0].Password === password.value) {
            localStorage.setItem('MaxID',rows[0].IDClient);
              document.location.href = '../html/index.html';
          } else {
              console.log('Not correctly entered password')
              document.getElementById('ErrorAut').textContent = 'Incorrect Login or password';
          }
      } else {
          console.log('Not correctly entered login');
          document.getElementById('ErrorAut').textContent = 'Incorrect Login or password';
      }
      connection.end(() => {
        console.log('Connection succesfully closed');
      });
    });
});
