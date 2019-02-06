const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');

const app = express();

const api = require('./server/routes/api');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api)

// Return other routes to Angular index files
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Set port
const port = process.env.port || '3000';
app.set('port', port);

// Create the HTTP Server
const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
