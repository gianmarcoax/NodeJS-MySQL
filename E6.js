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

  connection.beginTransaction((err) => {
    if (err) throw err;

    const pedido = {
      usuario_id: 2,
      estado: 'pendiente'
    };

    connection.query('INSERT INTO pedidos SET ?', pedido, (err, result) => {
      if (err) {
        return connection.rollback(() => {
          throw err;
        });
      }

      const pedidoId = result.insertId;
      const detallePedido = {
        pedido_id: pedidoId,
        producto_id: 2,
        cantidad: 1,
        precio_unitario: 499.99
      };

      connection.query('INSERT INTO detalles_pedido SET ?', detallePedido, (err, result) => {
        if (err) {
          return connection.rollback(() => {
            throw err;
          });
        }

        connection.commit((err) => {
          if (err) {
            return connection.rollback(() => {
              throw err;
            });
          }
          console.log('Transacción completada: pedido creado con ID', pedidoId);
          connection.end();
        });
      });
    });
  });
});