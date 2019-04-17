const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'rosq1921',
    database: 'databasefortask',
  });
  connection.connect((err) => {
    if (err) {
      return console.log(err.stack);
    }
  });

document.getElementById('AuntifReg').addEventListener('click', function() {
      let Login = document.getElementById('login');
      let FirstName = document.getElementById('first_name');
      let LastName = document.getElementById('last_name');
      let Email = document.getElementById('email');
      let Password = document.getElementById('password');
      let sql = "SELECT MAX(IDClient) AS maximum FROM client";
      connection.query(sql, (err,rows) => { 
        localStorage.setItem('MaxID',rows[0].maximum);
        console.log(localStorage.getItem('MaxID'));
        connection.end(() => {
          console.log('Connection succesfully closed');
        });
      });
      sql = `INSERT INTO \`databasefortask\`.\`client\` (\`IDClient\`, \`Login\`, \`FirstName\`, \`LastName\`, \`Email\`, \`Password\`) VALUES ('${parseInt(localStorage.getItem('MaxID'))+1}', '${Login.value}', '${FirstName.value}', '${LastName.value}', '${Email.value}', '${Password.value}')`;
      console.log(sql);
      connection.query(sql, (err,rows) => { 
        connection.end(() => {
          console.log('Connection succesfully closed');
        });
      });
      localStorage.setItem('MaxID',0);
});