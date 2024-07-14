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
    SELECT p.id, p.fecha_pedido, u.nombre, u.email
    FROM pedidos p
    JOIN usuarios u ON p.usuario_id = u.id
    WHERE p.estado = 'pendiente'
  `;

  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log('Pedidos pendientes con información de usuario:');
    console.log(results);
    connection.end();
  });
});