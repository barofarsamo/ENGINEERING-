require('dotenv').config();
const express = require('express');
const next = require('next');
const connectDB = require('./config/db');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Connect to Database
  connectDB();

  // Middleware
  server.use(express.json());

  // API Routes
  server.use('/api/students', require('./routes/api/students'));
  server.use('/api/courses', require('./routes/api/courses'));
  server.use('/api/enroll', require('./routes/api/enroll'));

  // Handle all other requests with Next.js
  server.all('*', (req, res) => {
    return handle(req, res);
  });
  
  // Custom Error Handling Middleware
  server.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });


  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
