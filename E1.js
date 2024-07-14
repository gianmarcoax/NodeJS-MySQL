const mysql = require('mysql');

// Configuración de la conexión
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tienda_online'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');

  // Realizar una consulta
  const query = 'SELECT * FROM usuarios';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta:', err);
      return;
    }
    console.log('Usuarios encontrados:');
    console.log(results);

    // Cerrar la conexión
    connection.end((err) => {
      if (err) {
        console.error('Error al cerrar la conexión:', err);
        return;
      }
      console.log('Conexión cerrada correctamente');
    });
  });
});