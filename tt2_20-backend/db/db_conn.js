var mysql = require('mysql2')

const conn = mysql.createConnection(
    {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'chanwei1997',
        database: 'insurancedata'
    }
)

module.exports = conn