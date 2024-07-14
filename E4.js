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

  const pedidoId = 1; // ID del pedido que queremos eliminar

  // Primero, eliminamos los detalles del pedido
  connection.query('DELETE FROM detalles_pedido WHERE pedido_id = ?', [pedidoId], (err, result) => {
    if (err) throw err;
    console.log('Detalles del pedido eliminados. Filas afectadas:', result.affectedRows);

    // Luego, eliminamos el pedido
    connection.query('DELETE FROM pedidos WHERE id = ?', [pedidoId], (err, result) => {
      if (err) throw err;
      console.log('Pedido eliminado. Filas afectadas:', result.affectedRows);
      connection.end();
    });
  });
});