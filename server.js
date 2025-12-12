const express = require('express');
const next = require('next');
const connectDB = require('./config/db');

// SECURITY FIX: Default to Production mode (false) to prevent leaking stack traces 
// and to ensure security headers are active. Use true only if specifically explicitly enabled.
const dev = false; 
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
    // SECURITY FIX: Do not leak stack traces to client
    res.status(500).send('Internal Server Error');
  });

  // Hardcoded port
  const PORT = 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});