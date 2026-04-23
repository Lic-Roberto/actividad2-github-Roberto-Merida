const express = require('express');
const pool = require('./db');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.get('/alumno', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM alumno');
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al consultar alumno:', error);
    res.status(500).json({ error: 'Error al obtener los alumno' });
  }
});

app.post('/alumno', async (req, res) => {
  try {
    const { nombre, apellido, edad, correo } = req.body;

    if (!nombre || !apellido || !edad || !correo) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const resultado = await pool.query(
      'INSERT INTO alumno (nombre, apellido, edad, correo) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, apellido, edad, correo]
    );

    res.status(201).json({
      mensaje: 'Alumno insertado correctamente',
      alumno: resultado.rows[0]
    });
  } catch (error) {
    console.error('Error al insertar alumno:', error);
    res.status(500).json({ error: 'Error al insertar el alumno' });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

// Obtener todas las materias
app.get('/materias', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM materia ORDER BY id ASC');
        res.status(200).json(resultado.rows);
    } catch (error) {
        console.error("Error en GET /materias:", error.message);
        res.status(500).json({ error: "Error al obtener las materias" });
    }
});

// Insertar una nueva materia
app.post('/materias', async (req, res) => {
    const { nombre, semestre, creditos } = req.body;

    // Validación de campos obligatorios
    if (!nombre || !semestre || !creditos) {
        return res.status(400).json({ 
            error: "Faltan campos obligatorios: nombre, semestre y creditos son requeridos." 
        });
    }

    try {
        const nuevaMateria = await pool.query(
            'INSERT INTO materia (nombre, semestre, creditos) VALUES ($1, $2, $3) RETURNING *',
            [nombre, semestre, creditos]
        );
        res.status(201).json({
            mensaje: "Materia creada con éxito",
            materia: nuevaMateria.rows[0]
        });
    } catch (error) {
        console.error("Error en POST /materias:", error.message);
        res.status(500).json({ error: "Error al insertar la materia" });
    }
});

app.get('/alumno', async (req, res) => {
  // consulta general
});

app.get('/alumno', async (req, res) => {
  // consulta general
});

app.get('/alumno/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      'SELECT * FROM alumno WHERE id = $1',
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al consultar usuario:', error);
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
});

app.get('/materias/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      'SELECT * FROM materia WHERE id = $1',
      [id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al consultar materia:', error);
    res.status(500).json({ error: 'Error al obtener la materia' });
  }
});

if (isNaN(1)) {
  return res.status(400).json({ error: 'El id debe ser numérico' });
}

app.get('/alumno', async (req, res) => {
  // consulta todos los usuarios
});

app.get('/alumno/:id', async (req, res) => {
  // consulta un usuario por id
});

app.get('/materias', async (req, res) => {
  // consulta todas las materias
});

app.get('/materias/:id', async (req, res) => {
  // consulta una materia por id
});