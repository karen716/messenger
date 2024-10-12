const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(cors());
app.use(bodyParser.json());

// PostgreSQL client setup
const client = new Client({
  connectionString: 'postgresql://mesenger_j65l_user:ibFPErFsSVUrlkFpSlvX8z2YnzwlJCdq@dpg-cs53kj08fa8c73af5ba0-a:5432/mesenger_j65l',
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => console.log('PostgreSQL connected...'))
  .catch(err => console.error('Connection error', err.stack));

app.get('/', (req, res) => {
  res.json({ message: "Welcome to Messenger App" });
});

app.get('/messages', (req, res) => {
  const sql = 'SELECT * FROM chats';
  client.query(sql)
    .then(result => res.send(result.rows))
    .catch(err => {
      console.error('Error fetching messages:', err);
      res.status(500).send('Error fetching messages');
    });
});



