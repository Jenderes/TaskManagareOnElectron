const remote = require('electron').remote;
const mysql = require('mysql');

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

$('#closeds').on('click', () => {
    const win = remote.getCurrentWindow();
    win.close();
  });