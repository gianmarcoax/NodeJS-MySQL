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
    SELECT usuario_id, COUNT(*) as total_pedidos
    FROM pedidos
    GROUP BY usuario_id
    HAVING total_pedidos > 1
  `;

  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log('Usuarios con más de un pedido:');
    console.log(results);
    connection.end();
  });
});