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

  const page = 1; // Página que queremos obtener
  const limit = 2; // Número de elementos por página
  const offset = (page - 1) * limit;

  const query = 'SELECT * FROM productos LIMIT ? OFFSET ?';
  connection.query(query, [limit, offset], (err, results) => {
    if (err) throw err;
    console.log(`Productos (Página ${page}):`);
    console.log(results);
    connection.end();
  });
});