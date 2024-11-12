const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'angular'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

app.post('/register', (req, res) => {
  const { rollNo, email, name, password } = req.body;
  const query = 'INSERT INTO users (rollNo, email, name, password) VALUES (?, ?, ?, ?)';
  db.query(query, [rollNo, email, name, password], (err, result) => {
    if (err) throw err;
    res.json({
      status : "Successfully Regsitered !!!"
    })
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      console.log('Login successful');
      res.json({
        status : "login successful !"
      });
    } else {
      console.log('Invalid credentials');
      res.json({
        status : "invalid credencials !!!"
      });
    }
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
