const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tienda_online'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');

  const query = `
    SELECT nombre, precio
    FROM productos
    WHERE precio > (SELECT AVG(precio) FROM productos)
  `;

  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log('Productos con precio superior al promedio:');
    console.log(results);
    connection.end();
  });
});