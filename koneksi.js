var mysql = require('mysql');

//create connection

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : '',
    database: 'rest-api'
});

conn.connect((err)=>{
    if(err) throw err;
    console.log('Mysql Terkoneksi');
})

module.exports = conn;