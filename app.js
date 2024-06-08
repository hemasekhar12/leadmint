// app.js
const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const jwt = require('jsonwebtoken');
const db = require('./config/db');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
  ws.on('message', async (message) => {
    try {
      const { token, roomId, content } = JSON.parse(message);
      const decoded = jwt.verify(token, 'your_jwt_secret');
      const userId = decoded.userId;

      // Save message to database
      await db.query('INSERT INTO messages (roomId, userId, message) VALUES (?, ?, ?)', [roomId, userId, content]);

      // Broadcast message to all clients in the room
      wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ roomId, userId, content }));
        }
      });
    } catch (error) {
      console.error('WebSocket error:', error);
    }
  });
});

server.listen(3000, () => console.log('Server running on port 3000'));
// app.js
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const chatroomRoutes = require('./routes/chatroomRoutes');
const inviteRoutes = require('./routes/inviteRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(bodyParser.json());

app.use(authRoutes);
app.use(chatroomRoutes);
app.use(inviteRoutes);
app.use(userRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
