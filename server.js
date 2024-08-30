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
  connectionString: 'postgresql://mesenger_user:uazZFXAclDrRmmVrMkMhPSPC9c37VzYY@dpg-cr82gdrtq21c739ikcp0-a.oregon-postgres.render.com/mesenger',
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

app.post('/replies', (req, res) => {
  console.log('Request received:', req.body); // Debug log
  const { sender, receiver, text } = req.body;
  const sql = 'INSERT INTO replies (senders, message, receivers) VALUES ($1, $2, $3)';
  client.query(sql, [sender, text, receiver])
    .then(() => res.send('Message saved'))
    .catch(err => {
      console.error('Error saving message:', err);
      res.status(500).send('Error saving message');
    });
});


