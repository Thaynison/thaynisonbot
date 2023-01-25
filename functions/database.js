const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: (require('./config').bancodedados.host),
    user: (require('./config').bancodedados.user),
    password: (require('./config').bancodedados.password),
    database: (require('./config').bancodedados.database),
});

function getDataFromDb() {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM usuarios', (err, rows, fields) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
}

module.exports = {
    getDataFromDb
};