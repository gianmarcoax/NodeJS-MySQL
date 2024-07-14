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

  const nuevoUsuario = {
    nombre: 'Ana López',
    email: 'ana@example.com',
    contraseña: 'clave789'
  };

  const query = 'INSERT INTO usuarios SET ?';
  connection.query(query, nuevoUsuario, (err, result) => {
    if (err) throw err;
    console.log('Nuevo usuario insertado con ID:', result.insertId);
    connection.end();
  });
});