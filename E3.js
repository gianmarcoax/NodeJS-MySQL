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

  const actualizacion = {
    precio: 1099.99,
    stock: 15
  };

  const query = 'UPDATE productos SET ? WHERE id = ?';
  connection.query(query, [actualizacion, 1], (err, result) => {
    if (err) throw err;
    console.log('Producto actualizado. Filas afectadas:', result.affectedRows);
    connection.end();
  });
});