const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'messenger'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL connected...');
});

app.get('/messages', (req, res) => {
  let sql = 'SELECT * FROM chats';
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post('/replies', (req, res) => {
  console.log('Request received:', req.body); // Debug log
  const { sender, receiver, text } = req.body;
  const sql = 'INSERT INTO replies (senders, message, receivers) VALUES (?, ?, ?)';
  db.query(sql, [sender, text, receiver], (err, result) => {
    if (err) {
      res.status(500).send('Error saving message');
      return;
    }
    res.send('Message saved');
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
