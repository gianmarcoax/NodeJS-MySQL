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

  // Primero, creamos el procedimiento almacenado
  const createProcedure = `
    CREATE PROCEDURE IF NOT EXISTS obtener_pedidos_usuario(IN usuario_id INT)
    BEGIN
      SELECT p.id, p.fecha_pedido, p.estado, dp.producto_id, dp.cantidad, dp.precio_unitario
      FROM pedidos p
      JOIN detalles_pedido dp ON p.id = dp.pedido_id
      WHERE p.usuario_id = usuario_id;
    END
  `;

  connection.query(createProcedure, (err) => {
    if (err) throw err;
    console.log('Procedimiento almacenado creado');

    // Ahora llamamos al procedimiento
    const call = 'CALL obtener_pedidos_usuario(?)';
    connection.query(call, [2], (err, results) => {
      if (err) throw err;
      console.log('Pedidos del usuario:');
      console.log(results[0]);
      connection.end();
    });
  });
});